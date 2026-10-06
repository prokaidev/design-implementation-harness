# Demo app

Static page used to exercise the [tools](../../tools/README.md) and as the subject of the [example screen](../screens/example/). Serve it with:

```bash
python3 -m http.server 4173 --directory .agents/examples/demo-app
```

`assets/thumb-1x.png` (300 × 200) is deliberately too small for DPR 2; the page uses `thumb-2x.png`. The example review shows the density failure it produces.
