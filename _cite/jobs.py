#!/usr/bin/env python3

"""
Fetch and filter job postings from Oxford CS department RSS feed.
Filters for positions mentioning "Namburete" and outputs as YAML for Jekyll.
"""

import requests
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
import yaml
from datetime import datetime, date
import re
import os
import sys
from pathlib import Path

# RSS feed URL
RSS_URL = "https://www.cs.ox.ac.uk/feeds/News-Vacancies-Research.xml"

# Manual jobs input file
MANUAL_JOBS_FILE = Path(__file__).parent.parent / '_data' / 'jobs_manual.yaml'

# Keywords to filter for (case-insensitive)
FILTER_KEYWORDS = ["namburete", "omni lab", "oxford machine learning neuroimaging"]

def fetch_rss_feed(url):
    """Fetch and parse RSS feed."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return ET.fromstring(response.content)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching RSS feed: {e}")
        return None
    except ET.ParseError as e:
        print(f"Error parsing RSS feed: {e}")
        return None

def fetch_job_details(url):
    """Fetch full job posting details from the job URL."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract the main content - adjust selectors based on actual page structure
        content_div = soup.find('div', {'class': 'content'}) or soup.find('main') or soup.find('article')
        
        if content_div:
            # Get all text content
            full_text = content_div.get_text(separator=' ', strip=True)
            return full_text
        else:
            # Fallback to body text
            body = soup.find('body')
            return body.get_text(separator=' ', strip=True) if body else ""
            
    except requests.exceptions.RequestException as e:
        print(f"Error fetching job details from {url}: {e}")
        return ""
    except Exception as e:
        print(f"Error parsing job details from {url}: {e}")
        return ""

def parse_date(date_str):
    """Parse publication date string."""
    try:
        return datetime.strptime(date_str, "%a, %d %b %Y %H:%M:%S %Z")
    except ValueError:
        return None

def parse_iso_date(date_str):
    """Parse an ISO-like date string (YYYY-MM-DD)."""
    if not date_str:
        return None
    try:
        return datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        return None

def parse_expiry_date(dcterms_valid):
    """Parse expiry date from dcterms:valid field."""
    if not dcterms_valid:
        return None
    
    # Extract date from format: "end=2025-09-29T00:00:00Z;scheme=W3C-DTF;"
    match = re.search(r'end=(\d{4}-\d{2}-\d{2})', dcterms_valid)
    if match:
        try:
            return datetime.strptime(match.group(1), "%Y-%m-%d")
        except ValueError:
            return None
    return None

def contains_filter_keywords(text):
    """Check if text contains any of the filter keywords."""
    text_lower = text.lower()
    return any(keyword.lower() in text_lower for keyword in FILTER_KEYWORDS)

def normalize_date_string(value):
    """Normalize a date value to YYYY-MM-DD string."""
    if isinstance(value, datetime):
        return value.strftime('%Y-%m-%d')
    if isinstance(value, date):
        return value.strftime('%Y-%m-%d')
    if isinstance(value, str):
        value = value.strip()
        if not value:
            return ''
        parsed = parse_iso_date(value)
        return parsed.strftime('%Y-%m-%d') if parsed else value
    return ''

def normalize_job_entry(job, source):
    """Normalize a job entry from manual or auto sources."""
    published = normalize_date_string(job.get('published', ''))
    expires = normalize_date_string(job.get('expires', ''))
    deadline = normalize_date_string(job.get('deadline', ''))

    active = job.get('active', None)
    if active is None:
        expiry_date = parse_iso_date(expires)
        if expiry_date:
            active = expiry_date > datetime.now()
        else:
            if source == 'manual':
                print("Warning: manual job is missing expires date; it will not auto-expire.")
            active = True

    normalized = {
        'title': (job.get('title', '') or '').strip(),
        'link': (job.get('link', '') or '').strip(),
        'job_id': (job.get('job_id', '') or '').strip(),
        'published': published,
        'deadline': deadline,
        'expires': expires,
        'active': bool(active),
        'description': (job.get('description', '') or '').strip(),
        'type': (job.get('type', '') or '').strip(),
        'contract': (job.get('contract', '') or '').strip(),
        'source': source
    }

    return normalized

def load_manual_jobs():
    """Load manual job postings from YAML file."""
    if not MANUAL_JOBS_FILE.exists():
        return []

    try:
        with open(MANUAL_JOBS_FILE, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f) or {}
    except Exception as e:
        print(f"Error loading manual jobs file: {e}")
        return []

    if isinstance(data, list):
        jobs = data
    else:
        jobs = data.get('jobs', []) if isinstance(data, dict) else []

    return [normalize_job_entry(job, 'manual') for job in jobs]

def process_job_postings():
    """Main function to process job postings."""
    print("Fetching RSS feed...")
    root = fetch_rss_feed(RSS_URL)
    
    if root is None:
        print("Failed to fetch RSS feed")
        return []
    
    jobs = []
    
    # Find all job items
    for item in root.findall('.//item'):
        title_elem = item.find('title')
        link_elem = item.find('link')
        description_elem = item.find('description')
        pubdate_elem = item.find('pubDate')
        dcterms_valid_elem = item.find('.//{http://purl.org/dc/terms/}valid')
        
        if title_elem is None or link_elem is None:
            continue
            
        title = title_elem.text.strip()
        link = link_elem.text.strip()
        job_id = description_elem.text.strip() if description_elem is not None else ""
        
        print(f"Processing: {title}")
        
        # Fetch full job details
        full_content = fetch_job_details(link)
        
        # Check if this job mentions our keywords
        if contains_filter_keywords(title) or contains_filter_keywords(full_content):
            print(f"✓ Found relevant job: {title}")
            
            # Parse dates
            pub_date = parse_date(pubdate_elem.text) if pubdate_elem is not None else None
            expiry_date = parse_expiry_date(dcterms_valid_elem.text) if dcterms_valid_elem is not None else None
            
            # Check if job is still active
            is_active = True
            if expiry_date:
                is_active = expiry_date > datetime.now()
            
            job_data = {
                'title': title,
                'link': link,
                'job_id': job_id,
                'published': pub_date.strftime('%Y-%m-%d') if pub_date else '',
                'expires': expiry_date.strftime('%Y-%m-%d') if expiry_date else '',
                'active': is_active,
                #'content_excerpt': full_content[:300] + '...' if len(full_content) > 300 else full_content
            }
            
            jobs.append(normalize_job_entry(job_data, 'auto'))
    
    return jobs

def sort_jobs(jobs):
    """Sort jobs by published date (newest first)."""
    def sort_key(job):
        parsed = parse_iso_date(job.get('published', ''))
        return parsed or datetime.min

    return sorted(jobs, key=sort_key, reverse=True)

def write_jobs_yaml(manual_jobs, auto_jobs):
    """Write jobs data to YAML file."""
    output_dir = Path(__file__).parent.parent / '_data'
    output_file = output_dir / 'jobs.yaml'
    
    # Ensure output directory exists
    output_dir.mkdir(exist_ok=True)
    
    # Sort jobs by publication date (newest first)
    manual_jobs = sort_jobs(manual_jobs)
    auto_jobs = sort_jobs(auto_jobs)
    merged_jobs = sort_jobs(manual_jobs + auto_jobs)
    
    # Add metadata
    output_data = {
        'last_updated': datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC'),
        'total_jobs_found': len(merged_jobs),
        'manual_jobs': manual_jobs,
        'auto_jobs': auto_jobs,
        'jobs': merged_jobs
    }
    
    # Write to YAML file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# Job postings automatically fetched from Oxford CS department\n")
        f.write("# Generated by _cite/jobs.py - do not edit manually\n")
        f.write(f"# Last updated: {output_data['last_updated']}\n\n")
        yaml.dump(output_data, f, default_flow_style=False, allow_unicode=True, sort_keys=False)
    
    print(f"✓ Written {len(merged_jobs)} job postings to {output_file}")

def main():
    """Main execution function."""
    print("=== Oxford CS Job Postings Fetcher ===")
    
    # Process job postings
    manual_jobs = load_manual_jobs()
    auto_jobs = process_job_postings()
    jobs = manual_jobs + auto_jobs
    
    if not jobs:
        print("No relevant job postings found")
        # Create empty jobs file
        write_jobs_yaml(manual_jobs, [])
        return
    
    print(f"\nFound {len(jobs)} relevant job posting(s)")
    
    # Write to YAML file
    write_jobs_yaml(manual_jobs, auto_jobs)
    
    print("\n=== Job fetching complete ===")

if __name__ == "__main__":
    main()
