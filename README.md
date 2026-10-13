# Ashneet Kaur Bhatia — Academic Portfolio

A responsive portfolio in plain HTML, CSS, and JavaScript. Open `index.html` in a browser to view it; no installation or build step is required.

- `index.html`: profile, navigation, and page content
- `style.css`: layout, colors, typography, and responsive styles
- `script.js`: tab navigation, resume data, and project dialogs
- `assets/Ashneet-Kaur-Bhatia-CV.pdf`: downloadable original CV

The profile portrait uses `assets/main-image.png`, with responsive cropping defined in `style.css`.

Content comes from the provided CV. The Blog tab contains two original student-perspective drafts inspired by the CV; they do not claim completed computational research. No external profile links have been invented. Google Fonts enhance the typography; system sans-serif fallbacks remain available offline.

## Adding a blog post

Add another `.blog-post` article inside `#blog-reader .blog-posts` in `index.html`. Give it a unique `data-slug`, a short `data-excerpt`, and `hidden`. Include a `.blog-cover` image, `.blog-meta` category/read time, an `h3` title with a unique ID, and the full article paragraphs. Set `aria-labelledby` to the title ID. JavaScript automatically creates its clickable preview card. Each article has a shareable `#blog/your-slug` URL, and browser Back returns to the previous view.

## Appearance, profile links, and QR code

The theme toggle remembers the visitor's choice in browser storage and otherwise follows the system preference. Edit `site-config.js` to set `googleScholarUrl`, `githubUrl`, and `homepageUrl`. Blank profile URLs leave the corresponding icon inactive. A blank homepage URL displays a pending message in the QR dialog. Once configured, the QR is generated locally with a four-module white border and links to the homepage's About view, regardless of the currently open article.

Bundled dependencies: qrcode-generator 1.4.4 (MIT; `assets/qrcode-LICENSE.txt`) and Simple Icons 13.21.0 Google Scholar/GitHub marks (`assets/simple-icons-LICENSE.md`).
