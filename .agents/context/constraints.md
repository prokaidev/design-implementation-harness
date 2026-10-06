# Constraints

Project inputs. Defaults below apply unless the project overrides them; record user-requested scope changes.

- Accessibility and browser support:
- Performance requirements:
- Dependency restrictions:
- Required routes, content, and component states:
- Supported viewport range:
- Other project-specific restrictions:

## Validation settings

Read by [responsive rules](../rules/responsive-design.md) and [visual validation](../workflows/visual-validation.md). The extractor copies widths, themes, stress states, and target DPR into the contract's `json matrix`; the [tools](../tools/README.md) read only that matrix.

- Intermediate widths (CSS px): `1440, 1200, 1024, 768, 600, 390, 375, 320`
- Severity pixel threshold: `4` (shift above it is major; 1 to it is minor)
- Target asset DPR: `2`
- Themes to capture: `light` (add `dark` etc. when the project has them)
- Stress cases: long strings (3× longest design text, unbroken word), empty and overflowing lists, RTL if supported
- Accessibility check: axe, see [commands](commands.md)
