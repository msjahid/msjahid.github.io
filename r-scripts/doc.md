# epuRate - Custom R Markdown Template for Reports

## Overview

**epuRate** is a custom R Markdown template designed to create uncluttered reports. It comes with a clean layout and includes a footer for your contact details. This template is designed to streamline report generation, ensuring a simple yet professional presentation.

## Features

- Easy-to-use R Markdown template.
- Includes a Table of Contents (TOC) for easier navigation.
- Option to include your contact information and social media links in the footer.
- Customizable logo for display over the Table of Contents.
- Clean and minimal design for professional-looking reports.

## Installation

To use the **epuRate** template in your R Markdown documents, follow the steps below:

### Prerequisites

Make sure you have **R** and **RStudio** installed on your system. You will also need the `devtools` package to install from GitHub.

### Step 1: Install the epuRate Package

```r
# Install devtools if you don't have it yet
install.packages("devtools")

# Install epuRate from GitHub
devtools::install_github("holtzy/epuRate")
```

### Step 2: Create a New R Markdown File

1. Open **RStudio**.
2. Go to `File` -> `New File` -> `R Markdown`.
3. In the R Markdown template options, choose `epuRate`.

Alternatively, you can create a new `.rmd` file manually and specify the template in the YAML header.

### Step 3: Customize Your Document

In the YAML header, you can customize the document with your name, email address, and social media links. For example:



```bash
---
title: "Your Report Title"
author: "Your Name"
output: 
  epuRate::epuRate_html:
    toc: true
    toc_depth: 2
    toc_float: true
    fig_caption: true
logo: "path_to_your_logo.png"   # Optional: Add a logo image
email: "your.email@example.com"  # Your email address
github: "https://github.com/yourusername"  # Your GitHub profile URL
twitter: "https://twitter.com/yourusername"  # Your Twitter handle
linkedin: "https://linkedin.com/in/yourusername"  # Your LinkedIn profile URL
output:
  html_document:
    toc: true
    toc_depth: 2
    toc_float: true
---
```

### Step 4: Add Footer and Social Links

You can add contact information and social media links in the footer for easy reference. Here's an example of what to include at the end of your document:



```bash
<footer>
  <hr>
  <p>Contact: [your.email@example.com](mailto:your.email@example.com)</p>
  <p>Follow me on <a href="https://github.com/yourusername" target="_blank">GitHub</a>, <a href="https://twitter.com/yourusername" target="_blank">Twitter</a>, and <a href="https://linkedin.com/in/yourusername" target="_blank">LinkedIn</a>.</p>
  <hr>
</footer>
```

## Usage

After you have customized the template and added your content, you can render the report by knitting the R Markdown file in RStudio. This will generate a beautiful HTML document with the configured footer, Table of Contents, and any custom logos or images you've specified.



### Example

![image](https://github.com/user-attachments/assets/67b9a302-1204-4770-817c-0326abf3ed1c)

![image](https://github.com/user-attachments/assets/031ec05f-c048-4a21-9ec5-05e8a9f967ca)

```gcode
# Example of rendering a report
rmarkdown::render("path_to_your_report.Rmd")
```

## Acknowledgments

- The **epuRate** package was created by [holtzy](https://github.com/holtzy) as an easy-to-use reporting template for R Markdown.
- Thanks to RStudio for providing a fantastic environment for R Markdown documents.
