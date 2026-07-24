# Noah Chen Portfolio

A responsive personal portfolio built with plain HTML, CSS, and JavaScript. It has no framework, build step, package manager, or backend.

## Open the site

1. Open this folder in Visual Studio Code.
2. Open `index.html`.
3. Either open the file directly in a browser or install the **Live Server** VS Code extension.
4. With Live Server installed, right-click `index.html` and choose **Open with Live Server**.

All asset paths are relative, so the site works locally and on GitHub Pages.

## Edit personal information

Search `index.html` for the existing name, email, GitHub URL, title, and location. Update every relevant occurrence, including the page description, contact section, footer, and `mailto:` address in `script.js`.

## Add or replace images

Place image files in `images/` using these names:

- `smart-tuner-schematic.jpg`
- `vocabforge-screenshot.jpg`
- `pyo-performance.jpg`
- `cello-performance.jpg`
- `strings-for-change-logo.png`
- `strings-for-change-performance.jpg`
- `library-3d-printing.jpg`
- `china-eastern-sfo-internship.jpg`

Keep the same filenames to replace an image without editing HTML. If a file is absent, JavaScript hides the broken image and displays a styled fallback. For good performance, resize photographs to roughly 1600–2000 pixels on their longest side and compress them before publishing.

## Edit projects and details

Project cards are in the `#projects` section of `index.html`. Each **View Details** button points to a `<template>` near the end of the file:

- `tuner-details`
- `vocabforge-details`

Edit the card for the short public summary and its matching template for the longer modal content. Keep the button’s `data-modal-open` value matched to the template `id`.

## Edit metrics

Metrics use a `<dl class="metrics">` structure:

```html
<div>
  <dt>48 / 48</dt>
  <dd>Tests passing</dd>
</div>
```

Change the value inside `<dt>` and its label inside `<dd>`. Do not publish projected results as completed results.

## Update the smart-tuner repository status

The tuner repository is currently represented by a non-clickable **Private Repository** label.

If the repository becomes public:

1. Replace that label in `index.html` with an `<a>` using the repository URL.
2. Use the `button button-secondary` classes.
3. Set `target="_blank"` and `rel="noopener noreferrer"`.
4. Update the project text only if the underlying facts have changed.

## Add future VocabForge features

Update both the VocabForge project card and the `vocabforge-details` template only after a feature is working and ready to describe publicly. Keep the current card limited to vocabulary flashcards and customizable vocabulary mock tests until then.

## Replace the hero image

The hero uses `images/hero_image.jpeg`. To replace it, overwrite that file with another optimized image using the same filename, or update the path and intrinsic `width` and `height` values in `index.html`. Keep the descriptive alt text accurate. The existing `data-fallback-image` behavior prevents a broken-image icon if the file is unavailable.

## Add a résumé later

The public site intentionally has no résumé link. If one is needed later:

1. Place the approved PDF in `documents/`.
2. Add a clearly labeled link in the contact section or navigation.
3. Use a relative path such as `documents/resume.pdf`.
4. Review the document for private information before deployment.

## Deploy with GitHub Pages

1. Create or choose a GitHub repository.
2. Commit `index.html`, `style.css`, `script.js`, `README.md`, and the required asset folders.
3. Push the files to the repository’s default branch.
4. On GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the default branch and the `/ (root)` folder, then save.
7. Wait for GitHub to publish the URL shown in the Pages settings.

Because the site has no build step and uses relative paths, no additional configuration is required.

## Connect a custom domain later

1. Purchase or use a domain you control.
2. In the repository’s **Settings → Pages**, enter the domain under **Custom domain**.
3. Add the DNS records GitHub specifies through the domain registrar.
4. Add a `CNAME` file containing the domain to the repository root if GitHub does not create it automatically.
5. After DNS validation completes, enable **Enforce HTTPS**.

DNS changes can take time to propagate. Follow the current GitHub Pages documentation and your registrar’s instructions when configuring records.
