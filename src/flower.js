#!/usr/bin/env node

"use strict";

var fs      = require("fs");
var jsdom   = require("jsdom");
var program = init_arguments(require("commander"));

var scripts = ["node_modules/snapsvg/dist/snap.svg-min.js"];
var html = `<svg id="paper" height="${program.height}" width="${program.width}" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>`;

jsdom.env(html, scripts, main);


//
// Declarations 
//

function main(error, window) {
    var paper    = window.Snap("#paper");
    var flower   = require("floweroflife");
    var palettes = JSON.parse(fs.readFileSync(__dirname + "/palettes.json"));

    var f = flower(
        program.height / 2, 
        program.width  / 2,
        program.radius,
        (program.disableMask) ? program.layers : program.layers + 3);
    draw_flower(f, paper, palettes[program.palette], program);

    fs.writeFileSync(program.out, paper.toString());
    window.close();
}

function draw_flower(flower, paper, palette, props) {
    var circles, layers, points;
    var mask_radius = props.radius * props.layers;

    if (props.reversePalette) palette.reverse();
    if (!props.disableBackground) {
        // Background
        paper.rect(0, 0, props.height, props.width).attr({ fill: props.bgColor});
    }

    if (!props.disableGlow && !props.disableMask) {
        // Glow
        for(let i = palette.length; i >= 0; i--) {
            paper.circle(
                props.height / 2,
                props.width  / 2,
                mask_radius + (i+1) * props.glowSize)
            .attr({ fill: palette[i], fillOpacity: props.glowOpacity });
        }
    }

    if (!props.disableMask) {
      // Masked circles background set to white
      paper.circle(props.height / 2, props.width / 2, mask_radius)
          .attr({ fill: "#fff" });
    }

    circles = paper.group();
    layers = flower.layers();
    points = flower.points();

    // Colored layers
    if (!props.disableColors)
    while (props.colorLayers--) {
        let cur_palette = (props.disableClone) ? palette : palette.slice();
        for (let layer of layers) {
            for (let point of layer) {
                let circle = paper.circle(point.x, point.y, props.radius);
                circle.attr({ fill: cur_palette[0], fillOpacity: 0.2 });
                circles.add(circle);
            }
            // Rotate the palette
            [].unshift.apply(cur_palette, cur_palette.splice(1, cur_palette.length));
        }
    }

    // Stroke lines
    if (!props.disableStroke)
    for (let point of points) {
        let circle = paper.circle(point.x, point.y, props.radius);
        circle.attr({ 
            fill: "#ff",
            stroke: props.strokeColor,
            strokeWidth: props.strokeWidth,
            fillOpacity: 0,
            strokeOpacity: props.strokeOpacity
        });
        circles.add(circle);
    }

    if (!props.disableMask) {
        // Mask final sturcure with a circle
        let mask = paper.circle(props.height / 2, props.width / 2, mask_radius);
  
        mask.attr({ fill: "#fff" });
        circles.attr({ mask: mask, style: ""});

        // outermoust border
        paper.circle(props.height / 2, props.width / 2, mask_radius).attr({
            fill: "#fff",
            stroke: props.strokeColor,
            strokeWidth: props.strokeWidth,
            fillOpacity: 0
        });
    }
}

function init_arguments(program) {
    // No validation here, you're on your own
    program
        .option("-o, --out,       <file>",  "Required: output filename")
        .option("-l, --layers     <n>",     "Required: layers above seed", parseInt)
        .option("-r, --radius     <n>",     "Required: circles radius",    parseInt)
        .option("-h, --height     <n>",     "image height")
        .option("-w, --width      <n>",     "image width")
        .option("-p, --palette    <name>",  "color palette name")
        .option("--color-layers   <n>",     "number of color layers")
        .option("--stroke-width   <n>",     "stroke lines width")
        .option("--stroke-color   <color>", "stroke lines color")
        .option("--bg-color       <color>", "background color")
        .option("--stroke-opacity <n>",     "stroke lines opacity")
        .option("--glow-opacity   <n>",     "glow effect opacity")
        .option("--glow-size      <n>",     "glow effect size")
        .option("--disable-glow",           "disable glow effect")
        .option("--disable-background",     "disable background")
        .option("--disable-stroke",         "disable stroke lines")
        .option("--disable-colors",         "disable coloring layers")
        .option("--disable-mask",           "disable circle mask")
        .option("--disable-clone",          "disable pallete array cloning")
        .option("--reverse-palette",        "reverse color palette")
        .parse(process.argv);

    // Check required arguments
    if (!program.out || !program.layers || !program.radius) {
        console.error("Panic!\tMissing required arguments");
        program.outputHelp();
        process.exit(1);
    }

    // Defaults for optional arguments
    program.height        = program.height        || 512;
    program.width         = program.width         || 512;
    program.palette       = program.palette       || "fire";
    program.colorLayers   = program.colorLayers   || 5;
    program.strokeWidth   = program.strokeWidth   || 1;
    program.strokeColor   = program.strokeColor   || "#000";
    program.bgColor       = program.bgColor       || "#000";
    program.strokeOpacity = program.strokeOpacity || 1;
    program.glowOpacity   = program.glowOpacity   || 0.2;
    program.glowSize      = program.glowSize      || 6;

    return program;
}
