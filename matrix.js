"use strict";

function rotate_zw(theta) {
    return [
        [ Math.cos(theta),  -Math.sin(theta),   0,                  0 ],
        [ Math.sin(theta),  Math.cos(theta),    0,                  0 ],
        [ 0,                0,                  1,                  0 ],
        [ 0,                0,                  0,                  1 ]
    ];
}

function rotate_yw(theta) {
    return [
        [ Math.cos(theta),  0,                  -Math.sin(theta),   0 ],
        [ 0,                1,                  0,                  0 ],
        [ Math.sin(theta),  0,                  Math.cos(theta),    0 ],
        [ 0,                0,                  0,                  1 ]
    ];
}

function rotate_yz(theta) {
    return [
        [ Math.cos(theta),  0,                  0,                  -Math.sin(theta) ],
        [ 0,                1,                  0,                  0 ],
        [ 0,                0,                  1,                  0 ],
        [ Math.sin(theta),  0,                  0,                  Math.cos(theta) ],
    ];
}

function rotate_xw(theta) {
    return [
        [ 1,                0,                  0,                  0 ],
        [ 0,                Math.cos(theta),    -Math.sin(theta),   0 ],
        [ 0,                Math.sin(theta),    Math.cos(theta),    0 ],
        [ 0,                0,                  0,                  1 ],
    ];
}

function rotate_xz(theta) {
    return [
        [ 1,                0,                  0,                  0 ],
        [ 0,                Math.cos(theta),    0,                  -Math.sin(theta) ],
        [ 0,                0,                  1,                  0 ],
        [ 0,                Math.sin(theta),    0,                  Math.cos(theta) ],
    ];
}

function rotate_xy(theta) {
    return [
        [ 1,                0,                  0,                  0 ],
        [ 0,                1,                  0,                  0 ],
        [ 0,                0,                  Math.cos(theta),    -Math.sin(theta) ],
        [ 0,                0,                  Math.sin(theta),    Math.cos(theta) ],
    ];
}


function rotate_x(theta)
{
    return [
        [ 1,                0,                  0,                  0 ],
        [ 0,                Math.cos(theta),    -Math.sin(theta),   0 ],
        [ 0,                Math.sin(theta),    Math.cos(theta),    0 ],
        [ 0,                0,                  0,                  1 ]
    ];
}

function rotate_y(theta)
{
    return [
        [  Math.cos(theta), 0,                  -Math.sin(theta),   0 ],
        [  0,               1,                  0,                  0 ],
        [  Math.sin(theta), 0,                  Math.cos(theta),    0 ],
        [ 0,                0,                  0,                  1 ]
    ];
}

function rotate_z(theta)
{
    return [
        [ Math.cos(theta),  -Math.sin(theta),   0,                  0 ],
        [ Math.sin(theta),  Math.cos(theta),    0,                  0 ],
        [ 0,                0,                  1,                  0 ],
        [ 0,                0,                  0,                  1 ]
    ];
}

function projection(d)
{
    return [
        [ d, 0, 0, 0 ],
        [ 0, d, 0, 0 ],
        [ 0, 0, d, 0 ],
    ];
}

function translation_matrix(x, y, z)
{
    return [
        [ 1, 0, 0, x ],
        [ 0, 1, 0, y ],
        [ 0, 0, 1, z ],
        [ 0, 0, 0, 1 ],
    ];
}


function scale_matrix(magnitude)
{
    return [
        [ magnitude,        0,                  0,                  0 ],
        [ 0,                magnitude,          0,                  0 ],
        [ 0,                0,                  magnitude,          0 ],
        [ 0,                0,                  0,                  1 ]
    ];
}

function transform_matrix(w, h)
{
    return [
        [ 1,                0,                  0,                  0 ],
        [ 0,                1,                  0,                  0 ],
        [ 0,                0,                  1,                  0 ],
        [ w / 2,            h / 2,              0,                  1 ]
    ];
}


function vec2mat(v) {
    switch (v.length) {
        case 2:
            return [
                [ v[0] ],
                [ v[1] ],
            ];
        case 3:
            return [
                [ v[0] ],
                [ v[1] ],
                [ v[2] ],
            ];
        case 4:
            return [
                [ v[0] ],
                [ v[1] ],
                [ v[2] ],
                [ v[3] ],
            ];
    }
}

function matmul34v14(v, m) {
    //console.assert(m.length == 3, "error, matrix columns != 3:", m.length);
    //console.assert(v.length == 4 && m[0].length == 4, "error, v rows(", v.length, ") must match m cols(", m.length, ")");
    return [
        [ v[0] * m[0][0] + v[1] * m[0][1] + v[2] * m[0][2] + v[3] * m[0][3] ],
        [ v[0] * m[1][0] + v[1] * m[1][1] + v[2] * m[1][2] + v[3] * m[1][3] ],
        [ v[0] * m[2][0] + v[1] * m[2][1] + v[2] * m[2][2] + v[3] * m[2][3] ],
       // [ v[0] * m[3][0] + v[1] * m[3][1] + v[2] * m[3][2] + v[3] * m[3][3] ],
    ];
}

function matmul(v, m) {
    if (v.length == 4 && m.length == 3 && m[0].length == 4)
        return matmul34v14(v, m);

    switch (v.length) {
        case 3:
            return [
                [ v[0] * m[0][0] + v[1] * m[1][0] + v[2] * m[2][0] + 1 * m[3][0] ],
                [ v[0] * m[0][1] + v[1] * m[1][1] + v[2] * m[2][1] + 1 * m[3][1] ],
                [ v[0] * m[0][2] + v[1] * m[1][2] + v[2] * m[2][2] + 1 * m[3][2] ],

                [ v[0] * m[0][3] + v[1] * m[1][3] + v[2] * m[2][3] + 1 * m[3][3] ],
            ];
        default:
            return [
                [ v[0] * m[0][0] + v[1] * m[1][0] + v[2] * m[2][0] + v[3] * m[3][0] ],
                [ v[0] * m[0][1] + v[1] * m[1][1] + v[2] * m[2][1] + v[3] * m[3][1] ],
                [ v[0] * m[0][2] + v[1] * m[1][2] + v[2] * m[2][2] + v[3] * m[3][2] ],
                [ v[0] * m[0][3] + v[1] * m[1][3] + v[2] * m[2][3] + v[3] * m[3][3] ],
            ];
    }
}

function matcmp(a, b) {
    if (a.length != b.length)
        return false;
    if (a[0].length != b[0].length)
        return false;
    for (let c = 0; c < a.length; c++) {
        for (let r = 0; r < a[0].length; r++) {
            if (a[c][r] != b[c][r])
                return false;
        }
    }
    return true;
}

function matrix_test() {
    {
        let v = [ 20, 30, 40, 50 ];
        let m = [
            [ 0, 1,  2,  3 ],
            [ 4, 5,  6,  7 ],
            [ 8, 9, 10, 11 ],
        ];

        console.log("test1:", matcmp(matmul34v14(v, m), [ [ 260 ], [ 820 ], [ 1380 ] ]));
    }
}
