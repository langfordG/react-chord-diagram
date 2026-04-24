# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-04-23

### Added
- New `exports` map in `package.json` for modern ESM/CJS resolution.
- CSS is now published as a standalone import: `import 'react-chord-diagram/style.css'`.

### Changed
- **Build tooling:** migrated from the deprecated `nwb` to Vite 8. The library
  is now emitted in ESM, CJS, and UMD formats (with source maps) to `dist/`.
- **Peer dependencies:** `react` and `react-dom` now support
  `^17.0.0 || ^18.0.0 || ^19.0.0`.
- **Dependencies:** bumped all runtime dependencies to current majors
  (`d3-array`, `d3-chord`, `d3-color`, `d3-format`, `d3-scale`, `d3-selection`,
  `d3-shape`, `prop-types`).
- **Internals:** `ChordDiagram` was rewritten as a functional component using
  `useState`/`useCallback`. Public API and behavior are unchanged.
- Source files containing JSX now use the `.jsx` extension (history preserved
  via `git mv`).

### Removed
- **Breaking:** the `componentId` prop has been removed. It was only used to
  build a non-referenced `id` attribute on an internal SVG `path` and had no
  effect on the rendered diagram or its interaction model. Consumers passing
  `componentId` should simply delete the prop.
- Deprecated `nwb` configuration and the legacy `.travis.yml` CI config.

### Migration
- Remove any `componentId={...}` props from `<ChordDiagram />` usages.
- If you were importing the stylesheet, update the path to
  `react-chord-diagram/style.css`.
- No other code changes are required.

[3.0.0]: https://github.com/langfordG/react-chord-diagram/releases/tag/v3.0.0
