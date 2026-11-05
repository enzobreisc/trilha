<h1 align="center">trilha</h1>

<p align="center">
  A personal desktop app to follow a study roadmap topic by topic, log your sessions and never miss a review.
</p>

<p align="center">
  <a href="https://github.com/enzobreisc/trilha/actions/workflows/tests.yml"><img src="https://github.com/enzobreisc/trilha/actions/workflows/tests.yml/badge.svg" alt="tests"></a>
  <img src="https://img.shields.io/badge/PHP-8.4-777BB4?logo=php&logoColor=white" alt="PHP 8.4">
  <img src="https://img.shields.io/badge/Laravel-13-FF2D20?logo=laravel&logoColor=white" alt="Laravel 13">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT license">
</p>

> **Status: v0.1.0, UI prototype.** Every screen is built and navigable, but they render bundled sample data. The Laravel side (models, actions, import logic) is still being written, so nothing is persisted yet.

## Features

- **Roadmaps from a file.** A roadmap is a `.json` with sections, groups and topics. The app validates it before saving, and can update an existing roadmap from a new file.
- **Several roadmaps at once.** Switch between them from the top bar, and see progress per roadmap.
- **Trail view.** Every topic with its status (to do, studying, to review, done), with filters and archived topics.
- **Topic page.** What to master, code signals, what to ask an AI and how to review its answer, an exercise without AI, notes, sources and a history tab.
- **Spaced reviews.** Finishing a topic schedules reviews at 7 and 30 days, collected in one queue across all roadmaps.
- **Study sessions.** Log time, activity and notes per topic, and browse the session history grouped by day.
- **Contribution graph** of your study days.
- **Keyboard first.** `⌘K` searches topics and actions, `?` lists the shortcuts, and `1`–`4` jump between sections.
- **Dark terminal look.** Monospace labels, dotted leaders, a key-hint bar and a status footer.
- **Bilingual interface** in Portuguese and English.

## Technical highlights

- **A Laravel app shipped as a native desktop app.** [NativePHP](https://nativephp.com) bundles PHP and the app into Electron, and an Inertia + React UI renders inside it.
- **i18n where the key is the source text.** Strings are written in Portuguese and translated in [`lang/en.json`](lang/en.json); the type check fails on a missing React key and a feature test fails on a missing PHP key.
- **Small, typed components.** Presentational components are separated from data-fetching ones, logic lives in hooks, and TypeScript runs with no `any`.
- **Design tokens in one place.** Colors, fonts and radii are Tailwind theme variables in [`resources/css/app.css`](resources/css/app.css), so screens use tokens instead of raw hex values.
- **Quality gates in CI.** Pest, PHPStan, Pint, Vite+ lint and format, and `tsc` run on every push.

## Stack

| Layer     | Choice                                   |
| --------- | ---------------------------------------- |
| Backend   | Laravel 13, PHP 8.4                      |
| Desktop   | NativePHP Desktop 2 (Electron)           |
| Database  | SQLite                                   |
| Front end | Inertia 3, React 19, TypeScript          |
| Styling   | Tailwind CSS 4                           |
| Quality   | Pest, PHPStan, Pint, Vite+ lint/fmt, tsc |

## Development

Requirements: PHP 8.4, Composer, Node 22+.

```bash
composer setup   # install dependencies, generate APP_KEY, migrate and build
composer dev     # start the development environment
```

| Command               | What it runs                  |
| --------------------- | ----------------------------- |
| `composer test`       | Pint, PHPStan and Pest        |
| `npm run check`       | front-end lint and formatting |
| `npm run types:check` | TypeScript type check         |

## Project structure

```
app/                    Laravel application
resources/js/
  pages/                one Inertia page per screen
  components/           UI, grouped by feature (home, roadmap, topic, reviews…)
  layouts/              app shell: top bar, key hints, status footer
  hooks/                extracted component logic
  lib/sample/           sample data used until the backend is ready
lang/en.json            English translations
tests/Feature/          behavior tests per feature
```

## License

[MIT](LICENSE)
