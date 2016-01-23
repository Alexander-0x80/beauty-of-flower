
Beauty of flower
=============

> This script generates beautiful flower of life patterns.

### Usage:

```bash
Usage: flower [options]

Options:

  -h, --help                output usage information
  -o, --out,       <file>   Required: output filename
  -l, --layers     <n>      Required: layers above seed
  -r, --radius     <n>      Required: circles radius
  -h, --height     <n>      image height
  -w, --width      <n>      image width
  -p, --palette    <name>   color palette name
  --color-layers   <n>      number of color layers
  --stroke-width   <n>      stroke lines width
  --stroke-color   <color>  stroke lines color
  --bg-color       <color>  background color
  --stroke-opacity <n>      stroke lines opacity
  --glow-opacity   <n>      glow effect opacity
  --glow-size      <n>      glow effect size
  --disable-glow            disable glow effect
  --disable-background      disable background
  --disable-stroke          disable stroke lines
  --disable-colors          disable coloring layers
  --disable-mask            disable circle mask
  --disable-clone           disable pallete array cloning
  --reverse-palette         reverse color palette
```
 
 Running this:
```bash
./flower.js --layers 4 --palette fire --radius 35 --out examples/fire.svg 
```
will generate the following svg image:

![fire](https://cdn.rawgit.com/Alexander-0x80/beauty-of-flower/master/examples/fire.svg)

Tweaking some command line arguments will produce slightly different result

```bash
./flower.js --layers 4 --palette fire --radius 35 --glow-opacity 1 \
            --stroke-color "#F2B705" --stroke-width 2 --reverse-palette \
            --bg-color "#F2B705" --out examples/fire-custom.svg
```

 ![fire-custom](https://cdn.rawgit.com/Alexander-0x80/beauty-of-flower/master/examples/fire-custom.svg)

Other color palettes are also available: fire, rainbow, ocean, vitamin, zen, leaf, sky and love.