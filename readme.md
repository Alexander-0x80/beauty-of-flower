
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
./flower.js --layers 4 --palette fire --radius 35 --out fire.svg 
```
will generate the following svg image:

![fire](examples/fire.svg?raw=true)

Tweaking some command line arguments will produce slightly different result

```bash
./flower.js --layers 4 --palette fire --radius 35 --out fire-custom.svg \ 
            --glow-opacity 1 --stroke-color "#F2B705" --stroke-width 2
```

 ![fire-custom](examples/fire-custom.svg?raw=true)

Other color palettes are also available:

![rainbow](examples/rainbow.svg?raw=true)

![love](examples/love.svg?raw=true)
