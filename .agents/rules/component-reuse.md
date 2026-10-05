# Component reuse

- Consult the code index, then search and inspect current implementations before creating a component.
- Prefer direct reuse → existing variant/extension → composition → new component.
- Match tokens by meaning and value; record design-to-code differences instead of silently changing global tokens.
- Keep screen-specific layout local. Extract shared components when usage justifies it.
- Coordinate shared changes through the assigned owner; verify affected consumers after integration.
