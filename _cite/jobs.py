#!/usr/bin/env python3

"""
Fetch and filter job postings from Oxford CS department RSS feed.
Filters for positions mentioning "Namburete" and outputs as YAML for Jekyll.
"""

import requests
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
import yaml
from datetime import datetime
import re
import os
import sys
from pathlib import Path

# RSS feed URL
RSS_URL = "https://www.cs.ox.ac.uk/feeds/News-Vacancies-Research.xml"

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
            
            jobs.append(job_data)
    
    return jobs

def write_jobs_yaml(jobs):
    """Write jobs data to YAML file."""
    output_dir = Path(__file__).parent.parent / '_data'
    output_file = output_dir / 'jobs.yaml'
    
    # Ensure output directory exists
    output_dir.mkdir(exist_ok=True)
    
    # Sort jobs by publication date (newest first)
    jobs.sort(key=lambda x: x['published'], reverse=True)
    
    # Add metadata
    output_data = {
        'last_updated': datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC'),
        'total_jobs_found': len(jobs),
        'jobs': jobs
    }
    
    # Write to YAML file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# Job postings automatically fetched from Oxford CS department\n")
        f.write("# Generated by _cite/jobs.py - do not edit manually\n")
        f.write(f"# Last updated: {output_data['last_updated']}\n\n")
        yaml.dump(output_data, f, default_flow_style=False, allow_unicode=True, sort_keys=False)
    
    print(f"✓ Written {len(jobs)} job postings to {output_file}")

def main():
    """Main execution function."""
    print("=== Oxford CS Job Postings Fetcher ===")
    
    # Process job postings
    jobs = process_job_postings()
    
    if not jobs:
        print("No relevant job postings found")
        # Create empty jobs file
        write_jobs_yaml([])
        return
    
    print(f"\nFound {len(jobs)} relevant job posting(s)")
    
    # Write to YAML file
    write_jobs_yaml(jobs)
    
    print("\n=== Job fetching complete ===")

if __name__ == "__main__":
    main()
