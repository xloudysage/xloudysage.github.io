# s4ge | Software Engineering & Systems

Personal developer portfolio for **Sage** (`s4ge`), a Computer Science student and software developer exploring systems programming, software engineering, backend development, cybersecurity, reverse engineering, and low-level Linux software.

---

## 🧭 Purpose & Core Positioning

- **Personal Brand**: `s4ge` (Sage).
- **Core Positioning**: A student developer who learns by building, explores systems and security beneath the surface, and wants to contribute to real engineering work.
- **Design Philosophy**: Minimal, calm, refined black glassmorphism. Dominant color palette of pure black (`#080808`), charcoal (`#0D0D0D`), translucent grey glass panels (`rgba(255, 255, 255, 0.04)`), and subtle low-contrast borders (`rgba(255, 255, 255, 0.11)`). All gratuitous 3D scenes and continuous motion have been completely removed.
- **Authenticity**: Honest representations of public projects, coursework disclosures, and zero arbitrary skill bars or inflated percentages.

---

## 🔗 Verified Public Profiles

Centralised in [src/data/portfolioData.ts](src/data/portfolioData.ts):

* **GitHub**: [https://github.com/xloudysage](https://github.com/xloudysage)
* **LinkedIn**: [https://www.linkedin.com/in/shessaanand/](https://www.linkedin.com/in/shessaanand/)
* **Instagram**: [https://www.instagram.com/_.sheshu12._/](https://www.instagram.com/_.sheshu12._/)
* **X**: [https://x.com/xloudysage](https://x.com/xloudysage)

---

## 🛠 Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS v4 + Vanilla CSS custom properties (`index.css`)
- **Icons**: Lucide React + Official monochrome SVG icons
- **Typography**: Local system font fallbacks

---

## 📂 Project Architecture

```
portfolio/
├── index.html                   # HTML entry point with metadata
├── metadata.json                # Project identity descriptor
├── package.json                 # Dependencies and npm scripts
├── tsconfig.json                # TypeScript strict configuration
├── vite.config.ts               # Vite build configuration
├── src/
│   ├── main.tsx                 # React entry point
│   ├── App.tsx                  # Single-page application layout & sections
│   ├── index.css                # Black glass design tokens & typography styling
│   ├── components/
│   │   ├── SocialLinks.tsx      # Reusable social profile component
│   │   ├── ProjectModal.tsx     # Project details & source code modal
│   │   └── LegalPage.tsx        # Privacy, terms, and cookie policies
│   └── data/
│       └── portfolioData.ts     # Single source of truth for catalogue & profiles
```

---

## ⚙️ Project Catalogue Architecture

All project cards, descriptions, categories, and repository links are maintained exclusively in `APPROVED_PROJECTS` inside [src/data/portfolioData.ts](src/data/portfolioData.ts).

### Featured Projects
- `winweb-vm`: Experimental browser-based virtual machine using WebAssembly and JavaScript.
- `Music Search Engine`: C++ indexing and search core with a FastAPI backend and Vite interface.
- `KartoffelPure`: Lightweight browser experiment written in Rust with GTK and WebKit.
- `Stego Tool`: Steganography tool exploring digital media encoding and extraction in Python.

### Secondary Projects & Experiments
- `MusicDNA`: C++ Last.fm user listening taste comparison utility.
- `Last Sync`: Python Spotify & Last.fm real-time sync tool.
- `Snowflak3`: Discord Snowflake ID metadata inspection utility.
- `RISC-V Assembler Simulator`: Academic Computer Organization coursework project.
- `Delhi Metro Route Simulator`: Academic Introduction to Programming coursework project.
- `Bash Breakout`: Terminal arcade game implemented in pure shell scripting.
- `NumberGG`: Shell-only number guessing game.
- `Press Code`: Minimalist HTML exploration.

*Note: Only verified public repositories approved for Sage's developer portfolio are included in the catalogue. Unverified and private repositories are strictly excluded from the codebase.*

---

## 💻 Local Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ or 20+ recommended)
- `npm`

### Installation & Running Locally

1. Clone or navigate to the repository directory:
   ```bash
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

## 🔒 Privacy, Cookies & Legal Pages

The site currently has no analytics, advertising trackers, embedded third-party content,
cookies, or browser storage. Google-hosted fonts have been removed; the design uses local system
font fallbacks. The contact form only opens a prefilled email draft and does not send its values
to this website.

The static build includes `/privacy`, `/terms`, and `/cookies` pages. The privacy notice describes
the current behavior, but the owner should confirm the hosting provider's logs, retention and
transfer practices, the applicable jurisdiction, and the legal name/address required for the
deployment before relying on it as a compliance document.

---

## 🧪 Testing & Production Build

Run the TypeScript type check and compile the production bundle:

```bash
# Type check without emitting files
npm run lint

# Compile production bundle
npm run build

# Preview production build locally
npm run preview
```

The production assets will be generated in the `dist/` directory.

---

## 🚀 Deployment Instructions

The portfolio builds into a static client-side bundle ready for any static web host.

### GitHub Pages

1. Ensure your repository settings under **Settings > Pages** are configured to deploy from GitHub Actions or a `gh-pages` branch.
2. Build the project:
   ```bash
   npm run build
   ```
3. Deploy the `dist/` directory.

### Vercel / Netlify / Cloudflare Pages

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install --legacy-peer-deps`

---

## 📬 Contact & Opportunities

- **Primary Identity**: `s4ge` (Sage)
- **Profiles**: [GitHub](https://github.com/xloudysage) · [LinkedIn](https://www.linkedin.com/in/shessaanand/) · [Instagram](https://www.instagram.com/_.sheshu12._/) · [X](https://x.com/xloudysage)
- **Open to Opportunities**: Software engineering, systems programming, backend development, and security tooling internships.
