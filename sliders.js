"use strict";

// speed:
let xs = document.getElementById("xspeed");
xs.oninput = function() {
    speed_x = Number(xs.value) / 10000;
    console.log("speedx:", speed_x);
}
let ys = document.getElementById("yspeed");
ys.oninput = function() {
    speed_y = Number(ys.value) / 10000;
}
let zs = document.getElementById("zspeed");
zs.oninput = function() {
    speed_z = Number(zs.value) / 10000;
}
let ws = document.getElementById("wspeed");
ws.oninput = function() {
    speed_w = Number(ws.value) / 10000;
}

// angle:
let xa = document.getElementById("xangle");
xa.oninput = function() {
    angle_x = Number(xa.value);
}
let ya = document.getElementById("yangle");
ya.oninput = function() {
    angle_y = Number(ya.value);
}
let za = document.getElementById("zangle");
za.oninput = function() {
    angle_z = Number(za.value);
}
let wa = document.getElementById("wangle");
wa.oninput = function() {
    angle_w = Number(wa.value);
}
