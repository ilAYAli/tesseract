"use strict";

let fps = new Fps();

let opt_angle_x = 0.0;
let opt_angle_y = 0.0;
let opt_angle_z = 0.0;
let opt_angle_w = 0.0;

let opt_speed_x = 0.05;
let opt_speed_y = 0.00;
let opt_speed_z = 0.05;
let opt_speed_w = 0.05;

// speed:
let xs = document.getElementById("xspeed");
xs.oninput = function() {
    opt_speed_x = Number(xs.value) / 10000;
}
let ys = document.getElementById("yspeed");
ys.oninput = function() {
    opt_speed_y = Number(ys.value) / 10000;
}
let zs = document.getElementById("zspeed");
zs.oninput = function() {
    opt_speed_z = Number(zs.value) / 10000;
}
let ws = document.getElementById("wspeed");
ws.oninput = function() {
    opt_speed_w = Number(ws.value) / 10000;
}

// angle:
let xa = document.getElementById("xangle");
xa.oninput = function() {
    opt_angle_x = Number(xa.value);
}
let ya = document.getElementById("yangle");
ya.oninput = function() {
    opt_angle_y = Number(ya.value);
}
let za = document.getElementById("zangle");
za.oninput = function() {
    opt_angle_z = Number(za.value);
}
let wa = document.getElementById("wangle");
wa.oninput = function() {
    opt_angle_w = Number(wa.value);
}

let p_fps = document.getElementById("p_fps");
let p_xspeed = document.getElementById("p_xspeed");
let p_yspeed = document.getElementById("p_yspeed");
let p_zspeed = document.getElementById("p_zspeed");
let p_wspeed = document.getElementById("p_wspeed");

let p_xangle = document.getElementById("p_xangle");
let p_yangle = document.getElementById("p_yangle");
let p_zangle = document.getElementById("p_zangle");
let p_wangle = document.getElementById("p_wangle");
function controls_tick() {
    fps.count();

    p_fps.innerText = "fps: " + Math.floor(fps.frameRate());
    p_xspeed.innerText = "x speed: " + parseFloat(opt_speed_x).toFixed(2);
    p_yspeed.innerText = "y speed: " + parseFloat(opt_speed_y).toFixed(2);
    p_zspeed.innerText = "z speed: " + parseFloat(opt_speed_z).toFixed(2);
    p_wspeed.innerText = "w speed: " + parseFloat(opt_speed_w).toFixed(2);

    p_xangle.innerText = "x angle: " + parseFloat(opt_angle_x).toFixed(2);
    p_yangle.innerText = "y angle: " + parseFloat(opt_angle_y).toFixed(2);
    p_zangle.innerText = "z angle: " + parseFloat(opt_angle_z).toFixed(2);
    p_wangle.innerText = "w angle: " + parseFloat(opt_angle_w).toFixed(2);

}
