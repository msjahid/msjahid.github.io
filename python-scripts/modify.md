# Remember that after complete your project then added the HTML file manually

1. Remove meta title and rename the only title one

2. Added the github, and favicon icons 
<link rel="icon" type="image/png" href="/favicon.png"/>
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<!-- Github Logo -->
<a href="https://github.com/msjahid/" class="github-corner" aria-label="View source on Github"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#2196f3; color:#fff; position: fixed; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" /><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm" /><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body" /></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>
    
-----------------------------------------------------------3 Step--------------------------------------------
3. Added header (#search <style type="text/css">) paste under the top

<header id="pageHeader">
    <br>
    <hr class="responsive-hr">
    <div id="1" class="section level1">
        <h1 style="text-align: center;" class="title">Canada Immigration Insights</h1>
        <h5 style="text-align: center;">
            <span class="author-name">Jahid Hasan</span> - 07 November 2024
        </h5>
    </div>
    <hr class="responsive-hr">
</header>

-------------------------------------------------------------------4 Step----------------------------------------
4. Add toc-title,image, author name, replace the date (#search <style type="text/css">) paste under the bottom

.toc-title {
  font-weight: bold;       /* Make the title bold */
  text-align: center;      /* Center-align the title */
  font-size: 18px;         /* Adjust font size as needed */
  margin-bottom: 15px;     /* Space between title and TOC list */
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
    width: 60%;               /* Default width */
    margin: 10px auto;        /* Center align with margin */
}

header#pageHeader {
    width: 100%;
    text-align: center;
    margin: 25px 10px 25px 10px;
}

------------------------------------------------------------------5 Step-----------------------------------------
<div class="col-xs-12 col-sm-4 col-md-3">
        <div id="TOC" class="tocify">
            <img src="brain_less.png" alt="TOC Image" class="toc-image" />
            <h4 class="toc-title">Index</h4>
        </div>
</div>

Remove h1 class under the code 

------------------------------------------------------6 Step---------------------------
4. Added footer paste the code bottom side (# search </body></html>) paste the top side

<hr style="width: 50%; margin: 0 auto; margin-bottom: 20px;">
  <p style="text-align: center;">A work by <a href="https://github.com/msjahid" target="_blank">Jahid Hasan</a></p>
  <p style="text-align: center;">
      <span style="color: #808080;">
          <em>
              <a href="mailto:msjahid.ai@gmail.com" class="email">msjahid.ai@gmail.com</a>
          </em>
      </span>
  </p>
<p style="text-align: center;">
  <a href="https://www.kaggle.com/msjahid" target="_blank" class="kaggle"><i class="fa-brands fa-kaggle"></i></a>
  <a href="https://www.linkedin.com/in/msjahid" target="_blank"><i class="bi bi-linkedin"></i></a>
  <a href="https://twitter.com/msjahids" target="_blank"><i class="bi bi-twitter-x"></i></a>
  <a href="https://www.github.com/msjahid" target="_blank"><i class="bi bi-github"></i></a>
  <a href="https://www.medium.com/@msjahid" target="_blank" class="medium"><i class="bi bi-medium"></i></a>
  <a href="https://msjahid.github.io/"  class="home"><i class="bi bi-house-fill"></i></a>
</p>


