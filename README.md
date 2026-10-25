# Personal Portfolio Website — Premium UI

A modern, elegant, and responsive personal portfolio website designed for aspiring IT professionals and web developers. Built with clean semantic HTML5, modular Vanilla CSS, and lightweight Vanilla JavaScript.

---

## 🎨 Color Palette

This project features an attractive, high-contrast **Cyber Emerald & Mint Green** developer aesthetic:

| Color Role | Color Name | Hex Code | Purpose |
|---|---|---|---|
| **Deep Canvas Base** | Deep Cosmic Obsidian | `#080D12` | Dark foundations, body background, and section base |
| **Elevated Surface** | Dark Cyber Slate | `#14222B` / `#182935` | Sleek cards, frosted glass navbar, and dialogs |
| **Primary Accent (CTA)** | Cyber Emerald | `#10B981` | Primary CTA buttons, active states, and glowing badges |
| **Secondary Accent** | Radiant Mint Green | `#34D399` | Accent highlights, secondary glow, borders, and icons |
| **Crisp Typography** | Luminous White & Platinum | `#FFFFFF` / `#E0EBF0` | Crisp headlines and highly readable body text |

---

## 🖥️ Website Structure & Features

1. **Sticky Navigation Bar**
   - Personal logo monogram with sub-brand title
   - Smooth anchor navigation (`Home`, `About`, `Skills`, `Experience`, `Projects`, `Services`, `Contact`)
   - Highlighted "Let's Talk" CTA button
   - Full mobile slide-down drawer with accessible hamburger toggle
   - Automatic active section tracking on scroll

2. **Hero Section**
   - Live availability badge ("Available for Opportunities & Projects")
   - Editorial headline: *"Hi, I'm WASIM AKRAM"*
   - Professional title: *"Aspiring IT Professional | Web Developer"*
   - Dual action CTAs: "Explore My Work" and "Contact Me"
   - Stylized circular portrait presentation with glowing emerald ambient border
   - Quick statistics and credibility highlights (2 Years Experience, 3+ Projects, 87% Client Focus)

3. **About Me Section**
   - Narrative of educational background and engineering interests
   - Direct Resume PDF download (`assets/Resume/Wasim_Akram_IT_Resume-1.pdf`)
   - Highlight cards for Academic Foundation, Core Engineering Values (Cream surface), and Agile Collaboration

4. **Technical Skills Section**
   - Organized into clear competency groups:
     - **Languages & Frontend**: HTML & CSS, JavaScript (ES6+), Python, Java, C / C++
     - **Backend & Database**: Node.js, Express, MongoDB
     - **Workflow & Tools**: Git & GitHub, RESTful APIs, Responsive Design
   - Authentic SVG icons and capability tags (no fake percentage bars or invented certifications)

5. **Experience Section**
   - Timeline highlighting 2 Years of Practical Development Experience and Academic Foundation
   - Tech stack tags for key roles and achievements
   - Direct Resume download button

6. **Featured Projects Section**
   - Responsive project cards with custom SVG preview illustrations
   - Interactive Quick-View modal with full feature list and architecture details
   - Direct links for "Launch Live Demo" and "View Source on GitHub"

7. **Professional Services Section**
   - **Website Development**: Full-stack architecture, clean code, performant APIs
   - **Responsive Web Design**: Mobile-first fluid grids, cross-browser compatibility
   - **Portfolio Website Design**: Bespoke personal brand showcase
   - **UI/UX Design**: High-contrast accessibility, modern typography, micro-interactions

8. **Contact Section**
   - Direct email with instant copy-to-clipboard button
   - Social links (GitHub, LinkedIn, Email)
   - Interactive EmailJS contact form: delivers client details directly to `wasifwasim75@gmail.com` and automatically dispatches an acknowledgement reply to the client
   - Real-time field validation, duplicate submission prevention, and success toast feedback

9. **Footer**
   - Personal branding, navigational shortcuts, explore links, and social connections

---

## 🚀 Getting Started

### 1. Run Locally (Zero Dependencies)

Since this project uses native Node.js:

```bash
# Start the local server
npm start
# or
node server.js
```

Then open your browser at:
```
http://localhost:3000
```

### 2. Customization Guide

- **Change Name & Bio**: Open `index.html` to update text, title, and bio.
- **Update Social Links**: In `index.html`, locate the social links in the `#contact` section and footer to update your GitHub, LinkedIn, and personal email.
- **Add Your Own Projects**: In `js/projects.js`, edit the `PROJECTS_DATA` object with your own project titles, descriptions, live demo links, and GitHub repositories.
- **Add Your Own Resume**: Place your PDF file in `assets/Resume/` and update the download link in `index.html`.

---

## 📁 Project Directory Structure

```
d:/portfolio/
├── index.html            # Main semantic HTML structure
├── server.js             # Zero-dependency local static development server
├── package.json          # Project metadata and run scripts
├── README.md             # Documentation and guide
├── assets/
│   ├── images/           # Profile photo (profile.jpeg)
│   └── Resume/           # Resume PDF (Wasim_Akram_IT_Resume-1.pdf)
├── css/
│   ├── style.css         # Master stylesheet importer
│   ├── variables.css     # Colors, typography, spacing, and design tokens
│   ├── base.css          # Reset, typography, and layout utilities
│   ├── components.css    # Buttons, cards, navbar, modal, toast
│   ├── sections.css      # Section-specific styles (Hero, About, Skills, etc.)
│   └── responsive.css    # Media queries for tablet, mobile, and print
└── js/
    ├── main.js           # Navigation, scroll state, active link observer
    ├── projects.js       # Project modal quick-view
    ├── contact.js        # EmailJS integration, form validation & email clipboard copy
    └── animations.js     # Lightweight scroll intersection observer
```

---

## 🌐 Deployment

You can deploy this website anywhere in seconds:
- **GitHub Pages**: Push this repository to GitHub, go to Settings &rarr; Pages, and select the `main` branch.
- **Vercel / Netlify**: Drag and drop the folder or connect your Git repository. Zero build configuration required!
