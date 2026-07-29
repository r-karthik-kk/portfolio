# R Karthik — Portfolio

Personal portfolio website for **R Karthik**, Computer Science & AI Engineering student at MITS, showcasing education, technical skills, internships, projects, and achievements.

**Live Demo:** [Add your deployed link here]

---

## Preview

A clean, professional, fully responsive single-page portfolio with a desktop navigation bar that collapses into a slide-in hamburger menu on mobile.

---

## Features

- Fully responsive — desktop, tablet, and mobile layouts
- Sticky header with smooth-scroll navigation
- Mobile hamburger menu with slide-in panel and overlay
- Sections: Hero, Education (timeline), Skills, Experience, Projects, Achievements, Contact
- Accessible: keyboard-focus states, aria attributes, reduced-motion support
- No frameworks or build tools — plain HTML, CSS, and JavaScript

---

## Tech Stack

| Layer      | Technology                              |
|------------|------------------------------------------|
| Structure  | HTML5                                    |
| Styling    | CSS3 (custom properties, Grid, Flexbox)  |
| Behavior   | Vanilla JavaScript (ES6)                 |
| Fonts      | Space Grotesk, Inter, JetBrains Mono (Google Fonts) |

---

## Project Structure

```
portfolio/
├── index.html      # Page markup and content
├── style.css        # All styling and responsive rules
├── script.js         # Mobile menu, scroll effects, footer year
└── README.md
```

---

## Getting Started

### Run locally

1. Clone the repository
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```
2. Open `index.html` directly in your browser, or serve it locally:
   ```bash
   npx serve .
   ```

No build step, dependencies, or package manager required.

---

## Deployment

This site is static and can be hosted for free on any of the following:

**GitHub Pages**
1. Push this repo to GitHub
2. Go to Settings → Pages
3. Set source to the `main` branch (root folder)
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`

**Netlify / Vercel**
- Drag and drop the project folder into Netlify, or
- Import the GitHub repo into Vercel — no build command needed (static site)

---

## Customization

- **Content:** edit the text directly in `index.html`
- **Colors/fonts:** update the CSS custom properties at the top of `style.css` under `:root`
- **Links:** replace the `#` placeholders for GitHub, Portfolio, and LeetCode with your actual profile URLs
- **Contact info:** update the email and phone number in the hero, mobile menu, and contact sections

---

## Contact

- **Email:** 23691a3185@mits.ac.in
- **Phone:** +91 9949985138
- **Location:** Chittoor, Andhra Pradesh, India
- **GitHub:** [Add your GitHub link]
- **LeetCode:** [Add your LeetCode link]

---

## License

This project is open for personal reference. Feel free to fork it for your own portfolio, but please don't reuse the content (name, resume details, etc.) as-is.