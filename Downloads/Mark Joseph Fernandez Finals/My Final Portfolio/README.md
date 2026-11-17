# Mark Joseph Fernandez — Portfolio

A responsive four-page portfolio built with HTML, CSS, and JavaScript. No build step or package installation is needed.

Open `index.html` in a browser, or serve this folder locally:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:4173`.

- `portfolio/Home.html`: introduction, project filters, image previews, expandable project descriptions, and certificate cards.
- `portfolio/about.html`: background, development toolkit, education, and certificates.
- `portfolio/blog.html`: searchable coursework notes.
- `portfolio/contact.html`: LinkedIn, GitHub, Instagram, and Facebook.
- `css/style.css` and `script/script.js`: shared design and interactions.

Update the HTML files to change content. The gallery uses optimized WebP images; the original images remain in `images/`. Fonts load from Google Fonts with local fallbacks. Navigation, project descriptions, and reading content remain usable without JavaScript. Animations respect reduced-motion preferences.

Certificate cards appear at `portfolio/Home.html#certificates` and `portfolio/about.html#certificates`. Java (Basic) is an earned HackerRank certificate (credential ID `e9e61c761a2a`), with verification links on both pages that open HackerRank in a new tab. HackerRank is not embedded, so its login, analytics, and framing behavior do not affect the portfolio. Python and JavaScript remain clearly labeled placeholders. Add further earned certificates using the instructions in `certificates/README.md`.
