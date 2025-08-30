# Repository Guidelines

## Project Structure & Module Organization
- Root pages: `index.html`, `about.md`.
- Site config: `_config.yml` (plugins, nav, colors, SEO, analytics).
- Layouts: `_layouts/` (`default.html`, `post.html`).
- Blog posts: `_posts/` named `YYYY-MM-DD-title.md`.
- Assets: `assets/css/main.css`, `assets/js/` (add images under `assets/images/`).

## Build, Test, and Development Commands
- Install deps: `gem install bundler && bundle install`.
- Run locally: `bundle exec jekyll serve --livereload` (visit `http://localhost:4000`).
- Build site: `bundle exec jekyll build` (outputs to `_site/`).
- Sanity checks: `bundle exec jekyll doctor` (detects common issues).
- Production build: `JEKYLL_ENV=production bundle exec jekyll build`.

## Coding Style & Naming Conventions
- Indentation: 2 spaces for HTML, YAML, and Liquid.
- Filenames: kebab-case (e.g., `market-structure-notes.md`).
- Posts: include front matter (`layout: post`, `title`, optional `tags`, `category`).
- CSS: keep rules in `assets/css/main.css`; prefer small, composable classes; kebab-case for class names.
- YAML: keep keys lowercase with underscores; update `_config.yml` in cohesive commits.

## Testing Guidelines
- No formal test suite. Validate by building without errors/warnings and visually checking pages.
- Before PRs: run `bundle exec jekyll build` and open `_site/` in a browser; scan console for 404s.
- Optional: `bundle exec jekyll doctor` to catch config and permalink issues.

## Commit & Pull Request Guidelines
- Commits: short, imperative, and scoped. Examples:
  - `layout: adjust post meta styling`
  - `posts: add 2024-09-01-ai-microstructure.md`
  - `config: enable paginate and update nav`
- PRs: include a clear description, linked issues, and screenshots for UI changes.
- Checklist: site builds locally, pages render correctly, nav/links work, and `_config.yml` changes are documented.

## Security & Configuration Tips
- Do not commit secrets or tokens. Analytics ID lives in `_config.yml`.
- Large media: optimize before adding to `assets/` to keep build fast.
- Plugin set is controlled via `Gemfile` and `_config.yml`; avoid adding heavy plugins without discussion.
