# Vibelyte Product Automation

This repository contains the product management and automation tools for the **Vibelyte** platform. It utilizes AI to automate issue creation, acceptance criteria generation, and code reviews, streamlining the development workflow.

## Features

-   **Automated Issue Creation**: Parses the System Requirements Specification (SRS) to automatically create GitHub issues and subtasks.
-   **AI-Driven Acceptance Criteria**: Uses OpenAI (GPT-4) to generate detailed acceptance criteria for each story.
-   **Automated PR Reviews**: An AI agent reviews Pull Requests for code quality and best practices.
-   **Kanban Synchronization**: Keeps project boards in sync across repositories.

## Prerequisites

-   Node.js (v18+)
-   GitHub Personal Access Token (with `repo` scope)
-   OpenAI API Key

## Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/ManeetSri/vibelyte_product.git
    cd vibelyte_product
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables:
    Create a `.env` file in the root directory:
    ```env
    TOKEN=your_github_token
    API_KEY=your_openai_key
    ```

## Usage

### PM Agent
To run the Product Management agent, which parses the SRS and creates missing issues:

```bash
npm run pm
```

This script will:
1.  Read `docs/srs.md`.
2.  Check for existing issues to avoid duplicates.
3.  Create new issues with descriptions and AI-generated acceptance criteria.
4.  Create subtasks for each feature.

### Scripts Overview

-   `scripts/pm-agent.js`: Main entry point for the PM agent.
-   `scripts/create-issues.js`: Logic for creating GitHub issues from the SRS.
-   `scripts/parse-srs.js`: robust parser for the Markdown SRS document.
-   `scripts/ai-review.js`: Script used by GitHub Actions to review PRs.

## Workflows

This project includes GitHub Actions workflows located in `.github/workflows`:

-   **PM Agent**: Runs daily or manually to sync SRS with GitHub Issues.
-   **AI Review**: Runs on Pull Requests to provide automated feedback.
-   **Validate PR**: Ensures PRs meet basic quality standards.

## Project Structure

-   `docs/`: Contains the System Requirements Specification (`srs.md`).
-   `scripts/`: All automation scripts.
-   `.github/`: GitHub Actions workflows and templates.
