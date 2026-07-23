# Noah Chen Portfolio

This is a personal portfolio website built with plain HTML, CSS, and JavaScript. It works by opening index.html directly in a browser or by using the VS Code Live Server extension.

## Open the project in VS Code

1. Open the portfolio folder in VS Code.
2. Open index.html.
3. Use the Live Server extension if you want a local preview.
   - Right-click index.html and choose "Open with Live Server".
   - Or use the command palette and run "Live Server: Open with Live Server".

## Personal information to replace

Update the content directly in index.html:

- Name and title in the hero section
- About section text
- Project descriptions and statuses
- Music and experience entries
- Skill labels and levels
- Contact details in the contact section

## Where to add images

Place your own images in the images folder:

- images/profile-placeholder.jpg
- images/smart-tuner-placeholder.jpg
- images/robotics-placeholder.jpg
- images/cello-placeholder.jpg
- images/3d-printing-placeholder.jpg

The page uses those paths in the project and hero sections, and the layout will still look good even if files are missing.

## Where to place your résumé

Place your resume as a PDF at:

- documents/resume.pdf

The Download Résumé button already links to that path.

## How to update the project cards

Project content is defined in index.html inside the Projects section. Each card includes:

- title
- category
- summary
- technologies and status
- View Details modal content

The modal content is populated by the JavaScript object in script.js. If you want to change the details shown in the modal, edit the projectDetails object in script.js.

## Publish with GitHub Pages

1. Create a GitHub repository for the portfolio.
2. Push the project files to the repository.
3. In GitHub, open the repository Settings.
4. Go to Pages.
5. Choose the main branch and the root folder as the source.
6. GitHub Pages will publish the site and provide a URL.

## Notes

- The site uses no frameworks or build tools.
- The contact form opens the user’s email client using a mailto link rather than pretending to send data to a backend.
- The design is intended to feel polished and professional for college applications, internships, and engineering opportunities.
