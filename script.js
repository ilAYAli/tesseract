"use strict";

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


function setup() {
    ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
    opt_speed_x = 0.01;
    opt_speed_y = 0.01;
    opt_speed_z = 0.01;
    opt_speed_w = 0.01;
}

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
    ctx.clearRect(-ctx.canvas.width/2, -ctx.canvas.height/2,
                 ctx.canvas.width, ctx.canvas.height);

    opt_angle_x += opt_speed_x;
    opt_angle_y += opt_speed_y;
    opt_angle_z += opt_speed_z;
    opt_angle_w += opt_speed_w;

    const distance = 2.0;

    let phase = structuredClone(cube);
    phase.forEach((v, i) => {
        // rotate:
        let rotated = matmul(v, rotate_xy(opt_angle_z));
        rotated = matmul(rotated, rotate_zw(opt_angle_w));
        rotated = matmul(rotated, rotate_x(Math.PI / 2));
        rotated = matmul(rotated, rotate_y(opt_angle_y));
        rotated = matmul(rotated, rotate_x(opt_angle_x));

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

    controls_tick();
    requestAnimationFrame(draw);
}

