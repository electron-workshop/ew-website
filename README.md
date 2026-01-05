# Electron Workshop Website

A static website for Electron Workshop, built with Eleventy (11ty) and Bootstrap. This site showcases initiatives, offerings, and community events.

## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ew-website.git
   cd ew-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   ./serve.sh
   ```
   This will start Eleventy in serve mode with live reload. The site will be available at `http://localhost:8080`.

4. Build the site for production:
   ```bash
   npm run build
   # or
   ./build.sh
   ```
   This generates the static files in the `_site` directory.

## Building and Deploying

- **Local Build**: Run `npm run build` to generate the site.
- **Netlify Deployment**: The site is configured for Netlify with the following settings:
  - Build command: `npx @11ty/eleventy && npx pagefind --site _site`
  - Publish directory: `_site`
- Pagefind is used for search functionality and is built automatically during the Netlify deploy process.

## Contributing to Design and Functionality

### Code Style and Guidelines
- Use semantic HTML and follow Bootstrap conventions.
- Write clean, readable Nunjucks templates.
- Ensure responsive design with Bootstrap classes.
- Test changes locally before submitting a pull request.

### Development Workflow
1. Create a new branch for your changes: `git checkout -b feature/your-feature-name`
2. Make your changes (code, templates, styles, etc.)
3. Test locally with `npm run dev`
4. Commit your changes: `git commit -m "Description of changes"`
5. Push to your branch: `git push origin feature/your-feature-name`
6. Open a pull request on GitHub

### Adding New Features
- For new pages: Create `.njk` files in `src/` and update navigation if needed.
- For new data: Add JSON files in `src/_data/` or update existing ones.
- For styles: Edit `src/assets/css/styles.css` or add new CSS files.
- For JavaScript: Add scripts in `src/assets/js/`.

### Netlify Functions
- Serverless functions are in `netlify/functions/`.
- Test functions locally using Netlify CLI if needed.

## Contributing Content

### Editing Existing Content
- **Home Cards**: Edit `src/_data/homeCards.json` to update cards on the homepage.
- **Offerings**: Modify `src/_data/offerings.json` for offerings section.
- **Initiatives**: Update `src/_data/initiatives.json` and related markdown files in `src/initiatives/`.
- **Navbar**: Change navigation links in `src/_data/navbar.json`.
- **Site Info**: Update global site data in `src/_data/site.json`.

### Adding New Content
- **Pages**: Create new `.njk` templates in `src/` and add routes via frontmatter.
- **Posts**: Add markdown files in `src/posts/` for blog-like content.
- **Images**: Place images in `src/assets/images/` and reference them in templates.
- **Events**: Add `.ics` files in `src/assets/events/` for calendar events.

### Content Guidelines
- Use clear, concise language.
- Ensure content is accessible and mobile-friendly.
- Test content changes locally to verify rendering.
- For markdown content, follow standard markdown syntax.

## Project Structure

```
ew-website/
├── netlify.toml          # Netlify configuration
├── package.json          # Node.js dependencies and scripts
├── src/                  # Source files
│   ├── _data/            # Data files (JSON/JS)
│   ├── _includes/        # Layouts and partials
│   ├── assets/           # CSS, JS, images
│   ├── posts/            # Blog posts
│   └── *.njk             # Page templates
├── netlify/              # Serverless functions
│   └── functions/        # Function files
└── _site/                # Generated site (after build)
```

## Technologies Used

- **Eleventy (11ty)**: Static site generator
- **Nunjucks**: Templating language
- **Bootstrap**: CSS framework
- **Pagefind**: Search functionality
- **Netlify**: Hosting and serverless functions

## Support

If you have questions or need help, please open an issue on GitHub or contact the maintainers.