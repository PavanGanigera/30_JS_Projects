# 30 JavaScript Projects

This repository contains **30 JavaScript projects**, each in its own subfolder. All projects are hosted on **Netlify** and can be accessed via their respective URLs.

## Folder Structure

AllProjects/
├── Project1/
│ └── index.html
├── Project2/
│ └── index.html
├── Project3/
│ └── index.html

## Accessing Projects

- **Root Landing Page:** `https://<your-netlify-site>.netlify.app/`  
  - Displays links to all 30 projects.  
- **Individual Projects:**  
  - `https://<your-netlify-site>.netlify.app/Project1/`  
  - `https://<your-netlify-site>.netlify.app/Project2/`  
  - ... up to Project30

## Notes

1. Each project folder **must contain an `index.html`** file.  
2. If a project uses client-side routing (React, Vue, etc.), include `_redirects` with:  
to prevent 404 errors on inner routes.  
3. Keep folder names simple (no spaces, use `-` or `_`).  
4. The root `index.html` is recommended as a landing page linking all projects.

## Deployment on Netlify

1. Go to [Netlify](https://www.netlify.com/) and log in.  
2. Drag & drop the `AllProjects` folder to deploy.  
3. Set the **Publish directory** to the root folder (`AllProjects`).  
4. Verify all subfolder URLs work correctly.  
5. Optionally, use `_redirects` for SPA routing or root redirects.

---

Explore all projects and see JavaScript in action! 🚀