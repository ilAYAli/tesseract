"use strict";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let angle_x = 0.0;
let angle_y = 0.0;
let angle_z = 0.0;
let angle_w = 0.0;

let speed_x = 0.05;
let speed_y = 0.00;
let speed_z = 0.05;
let speed_w = 0.05;

const cube = [
    // x   y   z   w
    [ -1, -1, -1,  1 ], // 0
    [  1, -1, -1,  1 ], // 1
    [  1,  1, -1,  1 ], // 2
    [ -1,  1, -1,  1 ], // 3
    [ -1, -1,  1,  1 ], // 4
    [  1, -1,  1,  1 ], // 5
    [  1,  1,  1,  1 ], // 6
    [ -1,  1,  1,  1 ], // 7
    [ -1, -1, -1, -1 ], // 8
    [  1, -1, -1, -1 ], // 9
    [  1,  1, -1, -1 ], // 10
    [ -1,  1, -1, -1 ], // 11
    [ -1, -1,  1, -1 ], // 12
    [  1, -1,  1, -1 ], // 13
    [  1,  1,  1, -1 ], // 14
    [ -1,  1,  1, -1 ], // 15
];


function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const transX = canvas.width * 0.5;
    const transY = canvas.height * 0.5;
    ctx.translate(transX, transY);
}

function preload() {
    speed_x = 0.01;
    speed_y = 0.01;
    speed_z = 0.01;
    speed_w = 0.01;
}

window.onload = () => {
    preload();
    resize();
    draw();
}

window.addEventListener('resize', resize, false);
//------------------------------------------------------------------------------

function connect(obj, i, j, color = '#88c') {
    let v0 = obj[i];
    let v1 = obj[j];
    ctx.beginPath();
    ctx.moveTo(v0[0], v0[1]);
    ctx.lineTo(v1[0], v1[1]);

    ctx.lineCap = 'round';
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function connectLines(obj) {
    for (let i = 0; i < 4; i++) {
        //--[ cube # 0 ]-----------
        connect(obj, i,         (i + 1) % 4);
        connect(obj, i + 4,     4 + ((i + 1) % 4));
        connect(obj, i,         i + 4);
        //--[ cube # 1 ]-----------
        connect(obj, i + 8,     8 + ((i + 1) % 4));
        connect(obj, i + 12,    12 + (i + 1) % 4);
        connect(obj, i + 8,     i + 12);
        //--[ connect cubes ]------
        //connect(obj, i,         12 + (i + 2) % 4);
        //connect(obj, i + 4,     8 + (i + 2) % 4);
    }

    connect(obj, 0, 8);
    connect(obj, 1, 9);
    connect(obj, 4, 12);
    connect(obj, 5, 13);

    connect(obj, 2, 10);
    connect(obj, 3, 11);
    connect(obj, 6, 14);
    connect(obj, 7, 15);
}

function draw() {
    ctx.fillStyle = "#1a1a30";
    ctx.fillRect(-ctx.canvas.width/2, -ctx.canvas.height/2,
                 ctx.canvas.width, ctx.canvas.height);

    angle_x += speed_x;
    angle_y += speed_y;
    angle_z += speed_z;
    angle_w += speed_w;

    const distance = 2.0;

    let phase = structuredClone(cube);
    phase.forEach((v, i) => {
        // rotate:
        let rotated = matmul(v, rotate_xy(angle_z));
        rotated = matmul(rotated, rotate_zw(angle_w));
        rotated = matmul(rotated, rotate_x(Math.PI / 2));
        rotated = matmul(rotated, rotate_y(angle_y));
        rotated = matmul(rotated, rotate_x(angle_x));

        // scale:
        const scalar = canvas.width / 7;
        let scaled = matmul(rotated, scale_matrix(scalar));

        // project:
        const d = 1 / (distance - rotated[3]);
        let projected = matmul34v14(scaled, projection(d));

        // commit:
        phase[i] = projected;
    });

    // vertex emphasis:
    phase.forEach((v) => {
        ctx.beginPath();
        ctx.globalAlpha = 0.9;
        ctx.arc(v[0], v[1],
                Math.max(canvas.width / 200, 4), 0, 2 * Math.PI);
        ctx.fillStyle = '#88c';
        ctx.fill();
    });

    connectLines(phase);

    requestAnimationFrame(draw);
}

