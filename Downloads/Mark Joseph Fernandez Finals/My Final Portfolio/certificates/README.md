# Adding certificates

Place your certificate PDFs or images in this folder. Use simple filenames, for example `course-certificate.pdf`. Include only documents you want visitors to access.

Java (Basic) is already linked to Mark Joseph Fernandez's earned HackerRank certificate:

- Issuer: HackerRank
- Credential ID: `e9e61c761a2a`
- Completion month: October 2026
- Verification: https://www.hackerrank.com/certificates/e9e61c761a2a

Both portfolio pages use a direct verification link that opens in a new tab. Do not embed the HackerRank page in an iframe: its framing headers, authentication calls, and analytics can produce browser warnings and errors. To show a document preview later, use a downloaded certificate image or PDF in this folder instead.

In `portfolio/about.html`, find `id="certificates"`. Python and JavaScript remain placeholder cards; they do not claim an earned credential. Replace each `certificate-placeholder` article with its actual certificate card inside `certificate-grid`:

```html
<article class="certificate-card">
  <h3>Actual certificate title</h3>
  <p>Issuing organization</p>
  <time datetime="2026-10">October 2026</time>
  <a class="text-link" href="../certificates/course-certificate.pdf">
    View certificate <span aria-hidden="true">↗</span>
  </a>
</article>
```

Replace the example title, issuer, date, and filename with the certificate's actual details. Omit the date if it is unavailable. You can use an official verification URL instead of a local file.

For an image preview, add an `img` before the heading, using the actual file and descriptive alternative text:

```html
<img src="../certificates/course-certificate.jpg"
     alt="Certificate title issued to Mark Joseph Fernandez by the issuing organization"
     loading="lazy" decoding="async">
```

Cards automatically adjust to phone, tablet, and desktop widths. They require no JavaScript.

Matching summary cards appear in `portfolio/Home.html#certificates` and link to the About-page headings. When adding a certificate, update its homepage summary as well. Keep the About-page heading IDs (`java-certificate-title`, `python-certificate-title`, and `javascript-certificate-title`) so those links continue to work.
