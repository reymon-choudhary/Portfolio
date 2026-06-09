# Reymon Choudhary — Portfolio Website

A highly responsive, interactive, and beautifully designed personal portfolio website built with pure vanilla technologies. 

## 🚀 Tech Stack

- **HTML5**: Structured markup.
- **CSS3 (Custom Styling & Themes)**:
  - Responsive layout using **CSS Grid**, **Flexbox**, and fluid typography (`clamp()`).
  - Core styling system using **CSS Variables** supporting 9 custom themes (Dark, Light, Aurora, Ember, Violet, Candy, Ocean, Sunset, and Multi).
  - Smooth visual animations and glassmorphism styling.
- **Vanilla JavaScript (Interactive Logic)**:
  - Physics-based floating particles using **HTML5 Canvas** which displace based on mouse pointer movements.
  - Interactive typewriter effect showcasing engineering domains.
  - Custom floating cursor tracking the mouse pointers.
  - Custom scrollbar indicators and staggered page reveals via the **Intersection Observer API**.
  - Persisted theme settings stored locally via `localStorage`.

---

## 📂 Project Directory Structure

We split the codebase into clean modules following the **Separation of Concerns** pattern:

```text
Project/
├── index.html        # Clean HTML markup containing layout structure
├── css/
│   └── style.css     # CSS custom variables, styling, themes and animations
├── js/
│   └── script.js     # JavaScript code for interactive cursor, themes, canvas, typewriter
└── README.md         # Project documentation (this file)
```

---

## 🛠️ Local Setup

Since this project uses vanilla HTML, CSS, and JS, you do not need any package installation or bundler.

1. **Clone/Download the project**:
   Clone this directory onto your local system.
2. **Open index.html**:
   Directly open `index.html` in any modern web browser.
3. *(Optional)* **Live Server**:
   If using VS Code, install the **Live Server** extension, right-click `index.html`, and select `Open with Live Server` for hot-reloading capability.

---

## 🌐 Deploy to GitHub Pages (Step-by-step Guide)

To host your portfolio website online for free using GitHub Pages:

### Step 1: Initialize Git Local Repository
Open your terminal inside this `Project/` folder and run:
```bash
git init
git add .
git commit -m "Initial commit: Restructured portfolio project"
```

### Step 2: Create a Repository on GitHub
1. Go to [github.com](https://github.com/) and click on **New** to create a repository.
2. Name it (e.g. `portfolio`).
3. Set the visibility to **Public**.
4. Leave other options unticked (don't add README, gitignore, or license). Click **Create repository**.

### Step 3: Link and Push Code to GitHub
Copy the commands shown on your GitHub repository page and run them in your terminal:
```bash
git branch -M main
git remote add origin https://github.com/<your-github-username>/<your-repo-name>.git
git push -u origin main
```
*(Make sure to replace `<your-github-username>` and `<your-repo-name>` with your actual credentials).*

### Step 4: Enable GitHub Pages
1. On your GitHub repository page, click on **Settings** (gear icon at the top).
2. On the left sidebar, click on **Pages**.
3. Under **Build and deployment**, select **Source** as `Deploy from a branch`.
4. In the **Branch** dropdown, change `None` to **`main`**. Keep the folder as `/ (root)`.
5. Click **Save**.
6. Wait 1-2 minutes. Refresh the page, and GitHub will provide your live website link (e.g., `https://<your-github-username>.github.io/<your-repo-name>/`).
