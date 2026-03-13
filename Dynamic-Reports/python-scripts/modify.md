# Pretty Jupyter - Project Report

This project provides insights into Canadian immigration using Jupyter Notebooks, with a polished, interactive HTML report generated using **Pretty Jupyter**. After creating the initial report, additional HTML customizations are applied for an enhanced presentation.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation and Usage](#installation-and-usage)
- [Manual HTML Customization](#manual-html-customization)
- [License](#license)

## Project Overview

This project analyzes data on  demo Canadian immigration and presents insights through a Jupyter Notebook. Using **Pretty Jupyter**, we convert the notebook into a dynamic HTML report, followed by some manual styling enhancements.

## Installation and Usage

1. **Install Pretty Jupyter**  
   To begin, install the `pretty-jupyter` package:
   
   ```bash
   pip install pretty-jupyter
   ```

## Usage

**Convert Notebook to HTML**  
Use the following command to convert the Jupyter Notebook to HTML:



```bash
jupyter nbconvert --to html --template pj /path/to/your_notebook.ipynb
```

**Find the HTML Output**

The converted HTML file will appear in the same directory as the original notebook.

## Customizing the HTML

After generating the HTML file, open it in a text editor and apply the following modifications:

### Step 1: Edit the Meta Title

Remove duplicate `<title>` tags within the `<head>` section and ensure the title tag reflects the project’s title.

### Step 2: Add GitHub Link and Favicon

Add this code snippet inside the `<head>` section to include a GitHub link and favicon icon:

```bash
<link rel="icon" type="image/png" href="/favicon.png"/>
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<a href="https://github.com/msjahid/" class="github-corner" aria-label="View source on Github">
    <svg width="80" height="80" viewBox="0 0 250 250" style="fill:#2196f3; color:#fff; position: fixed; top: 0; border: 0; right: 0;" aria-hidden="true">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"/>
        <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 ..." fill="currentColor" class="octo-body"/>
    </svg>
</a>
```

### Step 3: Add Custom Header

Insert this code at the top of the HTML file to add a header: <code><style type="text/css"></code>



```bash
<header id="pageHeader">
    <hr class="responsive-hr">
    <div id="1" class="section level1">
        <h1 style="text-align: center;">Canada Immigration Insights</h1>
        <h5 style="text-align: center;">
            <span class="author-name">Jahid Hasan</span> - 07 November 2024
        </h5>
    </div>
    <hr class="responsive-hr">
</header>
```



### Step 4: Modify TOC and Add Index Image

Add this code to customize the table of contents section: <code>col-xs-12</code>



```bash
<div class="col-xs-12 col-sm-4 col-md-3">
    <div id="TOC" class="tocify">
        <img src="brain_less.png" alt="TOC Image" class="toc-image" />
        <h4 class="toc-title">Index</h4>
    </div>
</div>
```

Adjust the CSS styles if needed paste under: <code><style type="text/css"></code>



```bash
.toc-title {
 font-weight: bold; /* Make the title bold */
 text-align: center; /* Center-align the title */
 font-size: 18px; /* Adjust font size as needed */
 margin-bottom: 15px; /* Space between title and TOC list */
}

.toc-image {
 width: 100%; /* Make the image take the full width of the TOC */
 height: auto; /* Keep the aspect ratio */
 margin-bottom: 15px; /* Space between the image and TOC list */
 border-radius: 8px; /* Optional, for rounded corners */
}

h5 {
 font-size: 18px;
 color: #555;
 font-weight: normal;
 margin-top: 5px;
 font-style: italic; /* Makes entire h5 italic */
}

.author-name {
 color: #78b4a4; /* Color for "Jahid Hasan" */
 font-weight: bold; /* Optional: to make the name stand out more */
}

.responsive-hr {
 width: 60%; /* Default width */
 margin: 10px auto; /* Center align with margin */
}

header#pageHeader {
 width: 100%;
 text-align: center;
 margin: 25px 10px 25px 10px;
}
```

### Step 5: Add Footer

Remove h1 class under the code. Finally, insert the footer before the closing `</body></html>` tags:



```bash
<hr style="width: 50%; margin: 0 auto; margin-bottom: 20px;">
<p style="text-align: center;">A work by <a href="https://github.com/msjahid" target="_blank">Jahid Hasan</a></p>
<p style="text-align: center;">
    <span style="color: #808080;">
        <em><a href="mailto:msjahid.ai@gmail.com" class="email">msjahid.ai@gmail.com</a></em>
    </span>
</p>
<p style="text-align: center;">
    <a href="https://www.kaggle.com/msjahid" target="_blank" class="kaggle"><i class="fa-brands fa-kaggle"></i></a>
    <a href="https://www.linkedin.com/in/msjahid" target="_blank"><i class="bi bi-linkedin"></i></a>
    <a href="https://twitter.com/msjahids" target="_blank"><i class="bi bi-twitter-x"></i></a>
    <a href="https://www.github.com/msjahid" target="_blank"><i class="bi bi-github"></i></a>
    <a href="https://www.medium.com/@msjahid" target="_blank" class="medium"><i class="bi bi-medium"></i></a>
    <a href="https://msjahid.github.io/" class="home"><i class="bi bi-house-fill"></i></a>
</p>
```

### License

This project is open-source and available under the terms of the [MIT License](LICENSE).
