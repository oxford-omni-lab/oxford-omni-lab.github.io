# Omni Lab Website

This is the 1. Make your changes to the content, images, or configuration files. Use [TEMPLATE_member.md](TEMPLATE_member.md), [\_posts/TEMPLATE_post.md](./_posts/TEMPLATE_post.md), and [TEMPLATE_source.yaml](TEMPLATE_source.yaml) as templates for adding new members, posts, or pages.ebsite of the Oxford Machine Learning in NeuroImaging Lab (OMNI Lab).

This website is built using the [Lab Website Template](https://github.com/greenelab/lab-website-template).

It is licensed under BSD 3-Clause License. Copyright (c) 2020, Greene Laboratory All rights reserved. For more details see the license, visit the [original website] (https://github.com/greenelab/lab-website-template) or go to our about page in the websites footer.

## Intructions for Lab Members

### How to keep it up to date

**One time setup:**

1. Make sure you are a Maintainer of the project on GitHub.
2. Clone the repository:

```bash
git clone git@github.com:oxford-omni-lab/omni-website.git
cd omni-website
```

3. Check Prerequisites below and install them if you haven't already.

**Update Website**

1. Pull the latest changes from the main branch using `bash git pull origin main`
2. Make your changes to the content, images, or configuration files. Use [TEMPLATE_member.md](TEMPLATE_member.md), [\_posts/TEMPLATE_post.md](./_posts/TEMPLATE_post.md), and [TEMPLATE_source.yaml](TEMPLATE_source.yaml) as templates for adding new members, pubations, or posts. Add you personal page to [\_members](./_members) folder, a post to [\_posts](./_posts) or add the publication to [\_data/sources.yaml](./_data/sources.yaml).
3. To add images, add images to the gallery, the slider or to update the group picture, place them in the [images/gallery](images/gallery), [images/slider](images/slider) or [images/group](images/group) folder. Please follow the naming convention YYMMDD_name-and-title.jpg. The date will be used to sort the images, the image title will be used as subtitle. For example, an image named `240101_new-year-party.jpg` will be displayed as "New Year Party" in the gallery.
4. For member profile pictures, use the [images/members](images/members) folder. You have to add the links manually as in the template.
5. If you have added a new publication run `python _cite/cite.py` to update the publication list. **Do not change [./\_data/citations.yaml](./_data/citations.yaml) manually!**
6. To update job postings from the Oxford CS department, run `python _cite/jobs.py`. This will fetch current job adverts and filter for positions mentioning "Namburete" or "OMNI Lab". **Do not change [./\_data/jobs.yaml](./_data/jobs.yaml) manually!**
7. Add your new files to the git staging area using `git add .` or `git add <file>` for specific files.
8. Create a new branch for your changes:
   ```bash
   git checkout -b your-name/name-branch
   # Example: git checkout -b john/john-branch
   ```
9. Commit your changes with a descriptive message:
   ```bash
   git commit -am "Add detailed description of your changes"
   # Example: git commit -m "Add John's member profile and update team photo"
   ```
10. Push your branch to GitHub:

    ```bash
    git push
    ```

    For the first time:

    ```bash
    git push --set-upstream origin your-name/name-branch
    ```

11. Create a Pull Request (PR) on GitHub: - Go to the [repository on GitHub](https://github.com/oxford-omni-lab/omni-website) - Click "Compare & pull request" for your branch

- Make sure that the base branch is `main` and the compare branch is your new branch. **DO NOT PUSH TO THE TEMPLATE**. Ask someone if you are not sure.
- Add a clear title and description of your changes
- Request review from the PI or other maintainers

12. Present your changes in the next group meeting and explain what you've updated
13. Once the PI approves and merges the PR, your changes will automatically appear on the live website

**Important Notes:**

- Changes are only visible on the live website after being merged into the `main` branch
- GitHub Pages automatically deploys from the `main` branch, so approved changes go live immediately after merge
- Always create a new branch for each set of changes to keep them organized
- Use descriptive branch names like `firstname/what-you-changed`

### Prerequisites

- [Ruby 3.1.4](https://www.ruby-lang.org/en/documentation/installation/)
- [Bundler 2.5.6](https://bundler.io/)
- [Jekyll 4.3+](https://jekyllrb.com/docs/installation/)
- [Python](https://www.python.org/downloads/)

On macOS the easiest way to install them is via [homebrew](https://brew.sh). For macOS you can loosly follow these instructions:

##### Installing the Required Versions

**1. Install Ruby 3.1.4**

On macOS, we recommend using rbenv to manage Ruby versions:

```bash
# Install rbenv if you don't have it
brew install rbenv ruby-build

# Install Ruby 3.1.4
rbenv install 3.1.4

# Set it as your global version
rbenv global 3.1.4

# Add rbenv to your shell profile (if not already done)
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(rbenv init -)"' >> ~/.zshrc

# Reload your shell
source ~/.zshrc
```

**2. Install Bundler**

```bash
gem install bundler -v 2.5.6
```

**3. Install Jekyll and Dependencies**

Navigate to the project directory and install all dependencies:

```bash
cd /path/to/omni-website
bundle install
```

**4. Verify Installations**

Check if you have the right versions by running:

```bash
ruby -v        # Should show 3.1.4
bundler -v     # Should show 2.5.6
jekyll -v      # Should show 4.3+
```

**Troubleshooting:**

- If you get gem dependency errors, run `bundle install` to install missing gems
- If you have version conflicts, try `bundle update` to update to compatible versions
- On Apple Silicon Macs, you might need to run `bundle config set --local force_ruby_platform true` before `bundle install`uroImaging Lab.

### Setting up the server

To deploy locally for testing run

```bash
bundle exec jekyll serve
```

Then lick on the link or open [http://127.0.0.1:4000](http://127.0.0.1:4000) in your browser.

As soon as you save any images to files or save updated markdown files, the changes should be visible after refreshing the page. The server does not need to be restarted.

### Install Python environment to update the publications

To update publications automatically from sources like PubMed, ORCID, or Google Scholar, you need to set up a Python environment:

**1. Create a conda environment:**

```bash
# Navigate to the project directory
cd /path/to/omni-website

# Create a new conda environment
conda create -n omni-website

# Activate the environment
conda activate omni-website

# Install dependencies from requirements.txt
pip install -r _cite/requirements.txt
```

**2. Configure VS Code to use this environment:**

1. Open VS Code in the project directory
2. Press `Cmd+Shift+P` to open the command palette
3. Type "Python: Select Interpreter" and select it
4. Choose the conda environment: `~/miniconda3/envs/omni-website/bin/python` (or similar path)
5. Create a `.vscode/settings.json` file in the project root with:

```json
{
  "python.defaultInterpreterPath": "~/miniconda3/envs/omni-website/bin/python",
  "python.terminal.activateEnvironment": true
}
```

**3. Using the citation tools:**

```bash
# Activate the environment (if not already active)
conda activate omni-website

# Update citations from sources
python _cite/cite.py
```
