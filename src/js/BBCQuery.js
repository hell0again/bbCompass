import {
    Base64 as Base64
}
from 'js-base64';
import pako from 'pako';
/*global jc*/ //eslint
import 'jcscript';

// this code is quoted from
// http://qiita.com/k_ui/items/e6c1661158bd584a4209
// canvasを利用して色情報をRGB値に変換する
var canvas = document.createElement('canvas');
canvas.width = 1;
canvas.height = 1;
var ctx = canvas.getContext('2d');


// バッファ arrayへの読み書き
class BufferView {
    constructor(bytes = new Array()) {
        this._buf = bytes;
        this._offset = 0;
    }
    append(bytes) {
            this._buf = this._buf.cocnat(bytes);
        }
        // textToByteArray
    static setStr(text) {
            var ret = Array();
            var code;

            ret[0] = text.length;
            for (var i = 0; i < text.length; i++) {
                code = text.charCodeAt(i);
                if (code & 0xffff0000) {
                    ret.push((code & 0xff000000) >> 24, (code & 0x00ff0000) >> 16, (code & 0x0000ff00) >> 8, (code & 0x000000ff));
                } else {
                    ret.push((code & 0x0000ff00) >> 8, (code & 0x000000ff));
                }
            }
            return ret;
        }
        // int8ToByteArray
    static setInt8(value) {
            var ret = Array();
            ret[0] = value & 0x00ff
            return ret;
        }
        // int16ToByteArray
    static setInt16(value) {
            var ret = Array();
            ret[1] = value & 0x00ff
            ret[0] = (value >> 8) & 0x00ff
            return ret;
        }
        // floatToByteArray
    static floatToIntBits(f) {
        // this function is quoted from
        // http://stackoverflow.com/questions/3077718/converting-a-decimal-value-to-a-32bit-floating-point-hexadecimal

        var ret = Array();
        var NAN_BITS = 0 | 0x7FC00000;
        var INF_BITS = 0 | 0x7F800000;
        var ZERO_BITS = 0 | 0x00000000;
        var SIGN_MASK = 0 | 0x80000000;
        var EXP_MASK = 0 | 0x7F800000;
        var MANT_MASK = 0 | 0x007FFFFF;
        var MANT_MAX = Math.pow(2.0, 23) - 1.0;

        if (f != f)
            return NAN_BITS;
        var hasSign = f < 0.0 || (f == 0.0 && 1.0 / f < 0);
        var signBits = hasSign ? SIGN_MASK : 0;
        var fabs = Math.abs(f);

        if (fabs == Number.POSITIVE_INFINITY)
            return signBits | INF_BITS;

        var exp = 0,
            x = fabs;
        while (x >= 2.0 && exp <= 127) {
            exp++;
            x /= 2.0;
        }
        while (x < 1.0 && exp >= -126) {
            exp--;
            x *= 2.0;
        }
        var biasedExp = exp + 127;

        if (biasedExp == 255)
            return signBits | INF_BITS;
        if (biasedExp == 0) {
            var mantissa = x * Math.pow(2.0, 23) / 2.0;
        } else {
            var mantissa = x * Math.pow(2.0, 23) - Math.pow(2.0, 23);
        }

        var expBits = (biasedExp << 23) & EXP_MASK;
        var mantissaBits = mantissa & MANT_MASK;

        return signBits | expBits | mantissaBits;
    }
    static setFloat32(f) {
        var ret = new Array();
        var bits = BufferView.floatToIntBits(f);

        ret[0] = (bits >> 24) & 0x000000ff;
        ret[1] = (bits >> 16) & 0x000000ff;
        ret[2] = (bits >> 8) & 0x000000ff;
        ret[3] = bits & 0x000000ff;

        return ret;
    }
    static setPos(pos) {
        var ret = new Array(3);
        var xsign = (pos.x < 0) ? 0x80 : 0,
            ysign = (pos.y < 0) ? 0x08 : 0,
            absx = Math.abs(pos.x),
            absy = Math.abs(pos.y);

        ret[0] = ((absx & 0x07F0) >> 4) | xsign;
        ret[1] = ((absx & 0x000F) << 4) | ysign | ((absy & 0x0700) >> 8);
        ret[2] = (absy & 0x00FF);
        return ret;
    }

    getUint8() {
        if (this._buf.length < this._offset) {
            throw "Buffer size error (get Uint8)";
        }
        var b0 = this._buf[this._offset];

        this._offset += 1;
        return b0;
    }
    getUint16() {
        if (this._buf.length < this._offset + 1) {
            throw "Buffer size error (get Uint16)";
        }

        var b1 = this._buf[this._offset];
        var b0 = this._buf[this._offset + 1];

        this._offset += 2;
        return (b1 << 8) + b0;
    }
    getStr() {
        if (this._buf.length < this._offset) {
            throw "Buffer size error (get String length)";
        }

        var len = this.getUint8(),
            value = '';

        try {
            for (var i = 0; i < len; i++) {
                var char1 = this.getUint16();

                if ((0xD800 <= char1) && (char1 <= 0xD8FF)) {
                    var char2 = this.getUint16();
                    value += String.fromCharCode((char2 << 16) | char1)
                } else {
                    value += String.fromCharCode(char1);
                }
            }
        } catch (e) {
            console.error(e);
            throw "Buffer size error (get String data)";
        }

        var control_codes = /[\u0000-\u001F\u007F-\u009F]/g;
        value.replace(control_codes, "\uFFFD");
        return value;
    }
    getPos(buf, Offset) {
        if (this._buf.length < this._offset + 3) {
            throw "Buffer size error (get Position)";
        }

        var a = this.getUint8(),
            b = this.getUint8(),
            c = this.getUint8();

        var xsign = (a & 0x80) ? (-1) : 1;
        var ysign = (b & 0x08) ? (-1) : 1;

        return {
            x: xsign * (((a & 0x7F) << 4) | ((b & 0xF0) >> 4)),
            y: ysign * (((b & 0x07) << 8) | c)
        };
    }
    getFloat32() {
        if (this._buf.length < this._offset + 4) {
            throw "Buffer size error (get Float32)";
        }

        var b0 = this.getUint8(),
            b1 = this.getUint8(),
            b2 = this.getUint8(),
            b3 = this.getUint8();

        var sign = 1 - (2 * (b0 >> 7)),
            exponent = (((b0 << 1) & 0xff) | (b1 >> 7)) - 127,
            mantissa = ((b1 & 0x7f) << 16) | (b2 << 8) | b3;

        if (exponent === 128) {
            if (mantissa !== 0) {
                return NaN;
            } else {
                return sign * Infinity;
            }
        }

        if (exponent === -127) { // Denormalized
            return sign * mantissa * Math.pow(2, -126 - 23);
        }

        return sign * (1 + mantissa * Math.pow(2, -23)) * Math.pow(2, exponent);
    }
    getCol(buf, Offset) {
        if (this._buf.length < this._offset + 3) {
            throw "Buffer size error (get Color)";
        }

        var a = (this.getUint8()).toString(16),
            b = (this.getUint8()).toString(16),
            c = (this.getUint8()).toString(16),
            ret;

        ret = "#" + (a.length == 1 ? ("0" + a) : a) + (b.length == 1 ? ("0" + b) : b) + (c.length == 1 ? ("0" + c) : c);
        return ret;
    }
    static setCol(str) {
        ctx.fillStyle = str;
        ctx.fillRect(0, 0, 1, 1);

        var col = ctx.getImageData(0, 0, 1, 1).data;
        return [col[0], col[1], col[2]];
    }
}



export default class BBCQuery {
    constructor(bbobj, map) {
            this.bbobj = bbobj;
            this.map = map;
            this._bv = new BufferView(BufferView.setStr(map));
        }
        // setQueryString (str) {
    fromBase64(str) {
            var data = Base64.decode(str);
            this._bv = new BufferView(pako.inflateRaw(data));
            try {
                this.map = this._bv.getStr();
            } catch (e) {
                console.error(e);
                alert("データ取り込み中にエラーが発生しました");
                this._bv = new BufferView();

                return false;
            }
            return true;
        }
        // getQueryString () {
    toBase64() {
            var buf = this._bv._buf;
            var data = pako.deflateRaw(buf, {
                to: "string"
            });
            return Base64.encode(data);
        }
        // セットされているクエリパラメータからオブジェクトを復元する
        // setObjects
    applyObjects() {
            var i, j,
                objs = new Array(),
                buff = this._bv,
                bbobj = this.bbobj;

            try {
                while (buff.offset < buff.length) {
                    var obj,
                        objlen = buff.getUint16(),
                        objname = buff.getStr(),
                        objtype = buff.getUint8();

                    switch (objtype) {
                        case 0x01:
                            (function() { //circle
                                var color = buff.getCol(),
                                    rad = buff.getUint16(),
                                    pos = buff.getPos(),
                                    ptpos = buff.getPos();

                                obj = bbobj.add_circle(objname, rad, color,
                                    function() {
                                        this._ptpos = ptpos;
                                        this.moveTo(pos.x, pos.y)
                                            .redraw();
                                    });
                            }());
                            break;

                        case 0x02:
                            (function() { //line
                                var color = buff.getCol(),
                                    len = buff.getUint16(),
                                    pos = buff.getPos(),
                                    pt1pos = buff.getPos(),
                                    pt2pos = buff.getPos();

                                obj = bbobj.add_line(objname, len, color,
                                    function() {
                                        this._pt1pos = pt1pos;
                                        this._pt2pos = pt2pos;
                                        this.moveTo(pos.x, pos.y)
                                            .redraw();
                                    });
                            }());
                            break;

                        case 0x03:
                            (function() { //freehand
                                obj = bbobj.add_freehand(objname);
                                obj._step = buff.getUint8();
                                for (i = 1; i <= obj._step; i++) {
                                    obj._stepcol[i] = buff.getCol();
                                    var length = buff.getUint16(),
                                        points = new Array();
                                    for (j = 0; j < length; j++) {
                                        var point = buff.getPos();
                                        points.push([point.x, point.y]);
                                    }
                                    jc.line(points, obj._stepcol[i])
                                        .layer(obj.id).id(i).lineStyle({
                                            lineWidth: 3
                                        });
                                }
                            }());
                            break;

                        case 0x04:
                            (function() { //point
                                var color = buff.getCol(),
                                    align = buff.getUint8(),
                                    size = buff.getUint8(),
                                    pos = buff.getPos();

                                obj = bbobj.add_point(objname, size, color, align,
                                    function() {
                                        this.moveTo(pos.x, pos.y)
                                            .redraw();
                                    });
                            }());
                            break;

                        case 0x05:
                            (function() { //icon
                                var color = buff.getCol(),
                                    file = buff.getStr(),
                                    pos = buff.getPos();

                                obj = bbobj.add_icon(objname, file, color,
                                    function() {
                                        this.moveTo(pos.x, pos.y)
                                            .redraw();
                                    });
                            }());
                            break;

                        case 0x11:
                            (function() { //scout
                                var color = buff.getCol(),
                                    rad = buff.getUint16(),
                                    len = buff.getUint16(),
                                    duration = buff.getUint16(),
                                    pos = buff.getPos(),
                                    rotAngle = buff.getFloat32();

                                obj = bbobj.add_scout(objname, rad, len, duration, color,
                                    function() {
                                        this.moveTo(pos.x, pos.y)
                                            .rotateTo(rotAngle)
                                            .redraw();
                                    });
                            }());
                            break;

                        case 0x12:
                            (function() { //sensor
                                var color = buff.getCol(),
                                    rad = buff.getUint16(),
                                    pos = buff.getPos();

                                obj = bbobj.add_sensor(objname, rad, color,
                                    function() {
                                        this.moveTo(pos.x, pos.y)
                                            .redraw();
                                    });
                            }());
                            break;

                        case 0x13:
                            (function() { //radar
                                var color = buff.getCol(),
                                    rad = buff.getUint16(),
                                    angle = buff.getUint16(),
                                    pos = buff.getPos(),
                                    rotAngle = buff.getFloat32();

                                obj = bbobj.add_radar(objname, rad, angle, color,
                                    function() {
                                        this.moveTo(pos.x, pos.y)
                                            .rotateTo(rotAngle)
                                            .redraw();
                                    });
                            }());
                            break;

                        case 0x14:
                            (function() { //sonde
                                var color = buff.getCol(),
                                    rad1 = buff.getUint16(),
                                    rad2 = buff.getUint16(),
                                    pos = buff.getPos(),
                                    markpos = buff.getPos();

                                obj = bbobj.add_sonde(objname, rad1, rad2, color,
                                    function() {
                                        this._markerx = markpos.x;
                                        this._markery = markpos.y;
                                        this.moveTo(pos.x, pos.y)
                                            .redraw();
                                    });
                            }());
                            break;

                        case 0x15:
                            (function() { //ndsensor
                                var color = buff.getCol(),
                                    rad = buff.getUint16(),
                                    pos = buff.getPos(),
                                    rotAngle = buff.getFloat32();

                                obj = bbobj.add_ndsensor(objname, rad, color,
                                    function() {
                                        this.moveTo(pos.x, pos.y)
                                            .rotateTo(rotAngle)
                                            .redraw();
                                    });
                            }());
                            break;

                        case 0x16:
                            (function() { //bascout
                                var color = buff.getCol(),
                                    pos = buff.getPos(),
                                    rotAngle = buff.getFloat32();

                                obj = bbobj.add_bascout(objname, color,
                                    function() {
                                        this.moveTo(pos.x, pos.y)
                                            .rotateTo(rotAngle)
                                            .redraw();
                                    });
                            }());
                            break;

                        case 0x17:
                            (function() { //vsensor
                                var color = buff.getCol(),
                                    rada = buff.getUint16(),
                                    radb = buff.getUint16(),
                                    mode = buff.getUint8(),
                                    pos = buff.getPos();

                                if (mode == 0) {
                                    mode = 'A';
                                } else {
                                    mode = 'B';
                                }

                                obj = bbobj.add_vsensor(objname, rada, radb, color, mode,
                                    function() {
                                        this.moveTo(pos.x, pos.y)
                                            .redraw();
                                    });
                            }());
                            break;

                        case 0x21:
                            (function() { //howitzer
                                var color = buff.getCol(),
                                    rad1 = buff.getUint16(),
                                    rad2 = buff.getUint16(),
                                    rad3 = buff.getUint16(),
                                    pos = buff.getPos(),
                                    markpos = buff.getPos();

                                obj = bbobj.add_howitzer(objname, rad1, rad2, rad3, color,
                                    function() {
                                        this._markerx = markpos.x;
                                        this._markery = markpos.y;
                                        this.moveTo(pos.x, pos.y)
                                            .redraw();
                                    });
                            }());
                            break;

                        case 0x22:
                            (function() { //bunker
                                var color = buff.getCol(),
                                    pos = buff.getPos();

                                obj = bbobj.add_bunker(objname, color,
                                    function() {
                                        this.moveTo(pos.x, pos.y)
                                            .redraw();
                                    });
                            }());
                            break;

                        case 0x23:
                            (function() { //bomber
                                var color = buff.getCol(),
                                    pos = buff.getPos(),
                                    rotAngle = buff.getFloat32();

                                obj = bbobj.add_bomber(objname, color,
                                    function() {
                                        this.moveTo(pos.x, pos.y)
                                            .rotateTo(rotAngle)
                                            .redraw();
                                    });
                            }());
                            break;

                        case 0x24:
                            (function() { //sentry
                                var color = buff.getCol(),
                                    pos = buff.getPos(),
                                    rotAngle = buff.getFloat32();

                                obj = bbobj.add_sentry(objname, color,
                                    function() {
                                        this.moveTo(pos.x, pos.y)
                                            .rotateTo(rotAngle)
                                            .redraw();
                                    });
                            }());
                            break;

                        case 0x25:
                            (function() { //aerosentry
                                var color = buff.getCol(),
                                    pos = buff.getPos();

                                obj = bbobj.add_aerosentry(objname, color,
                                    function() {
                                        this.moveTo(pos.x, pos.y)
                                            .redraw();
                                    });
                            }());
                            break;

                        case 0x30:
                            (function() { //waft
                                var color = buff.getCol(),
                                    file = buff.getStr(),
                                    pos = buff.getPos(),
                                    rotAngle = buff.getFloat32();

                                obj = bbobj.add_waft(objname, file, color,
                                    function() {
                                        this.moveTo(pos.x, pos.y)
                                            .rotateTo(rotAngle)
                                            .redraw();
                                    });
                            }());
                            break;

                        default:
                            obj = undefined;
                            console.error("object type not supported (" + objtype + ")");
                            view.seek(view.tell() + objlen - 1);
                            break;
                    }
                    if (obj === undefined) break;
                    objs.push(obj);
                }
            } catch (e) {
                console.error(e);
                alert("データ取り込み中にエラーが発生しました");
            }

            return objs;
        }
        // // オブジェクト配列をバイナリ化してバイナリArrayを返す
        // getObjects (objs) {
        // オブジェクト配列を格納する
    fromObjects(objs) {
        var i, j;
        for (i = 0; i < objs.length; i++) {
            var obj = this.bbobj.object(objs[i]);
            var objdata = new Array();

            switch (obj.type) {
                case 'circle':
                    objdata.unshift(0x01);
                    objdata = objdata.concat(BufferView.setCol(obj._color));
                    objdata = objdata.concat(BufferView.setInt16(obj._radius));
                    objdata = objdata.concat(BufferView.setPos(obj.position()));
                    objdata = objdata.concat(BufferView.setPos(obj._ptpos));
                    break;

                case 'line':
                    objdata.unshift(0x02);
                    objdata = objdata.concat(BufferView.setCol(obj._color));
                    objdata = objdata.concat(BufferView.setInt16(obj._length));
                    objdata = objdata.concat(BufferView.setPos(obj.position()));
                    objdata = objdata.concat(BufferView.setPos(obj._pt1pos));
                    objdata = objdata.concat(BufferView.setPos(obj._pt2pos));
                    break;

                case 'freehand':
                    objdata.unshift(0x03);
                    objdata = objdata.concat(BufferView.setInt8(obj._step));
                    for (i = 1; i <= obj._step; i++) {
                        objdata = objdata.concat(BufferView.setCol(obj._stepcol[i]));
                        var points = jc("#" + i, {
                            canvas: this.bbobj.id,
                            layer: obj.id
                        }).points();
                        objdata = objdata.concat(BufferView.setInt16(points.length));
                        for (j = 0; j < points.length; j++) {
                            objdata = objdata.concat(BufferView.setPos({
                                x: (points[j])[0],
                                y: (points[j])[1]
                            }));
                        }
                    }
                    break;

                case 'point':
                    objdata.unshift(0x04);
                    objdata = objdata.concat(BufferView.setCol(obj._color));
                    objdata = objdata.concat(BufferView.setInt8(obj._align));
                    objdata = objdata.concat(BufferView.setInt8(obj._size));
                    objdata = objdata.concat(BufferView.setPos(obj.position()));
                    break;

                case 'icon':
                    objdata.unshift(0x05);
                    objdata = objdata.concat(BufferView.setCol(obj._color));
                    objdata = objdata.concat(BufferView.setStr(obj._file));
                    objdata = objdata.concat(BufferView.setPos(obj.position()));
                    break;

                case 'scout':
                    objdata.unshift(0x11);
                    objdata = objdata.concat(BufferView.setCol(obj._color));
                    objdata = objdata.concat(BufferView.setInt16(obj._radius));
                    objdata = objdata.concat(BufferView.setInt16(obj._length));
                    objdata = objdata.concat(BufferView.setInt16(obj._duration));
                    objdata = objdata.concat(BufferView.setPos(obj.position()));
                    objdata = objdata.concat(BufferView.setFloat32(obj.rotAngle()));
                    break;

                case 'sensor':
                    objdata.unshift(0x12);
                    objdata = objdata.concat(BufferView.setCol(obj._color));
                    objdata = objdata.concat(BufferView.setInt16(obj._radius));
                    objdata = objdata.concat(BufferView.setPos(obj.position()));
                    break;

                case 'radar':
                    objdata.unshift(0x13);
                    objdata = objdata.concat(BufferView.setCol(obj._color));
                    objdata = objdata.concat(BufferView.setInt16(obj._radius));
                    objdata = objdata.concat(BufferView.setInt16(obj._angle));
                    objdata = objdata.concat(BufferView.setPos(obj.position()));
                    objdata = objdata.concat(BufferView.setFloat32(obj.rotAngle()));
                    break;

                case 'sonde':
                    objdata.unshift(0x14);
                    objdata = objdata.concat(BufferView.setCol(obj._color));
                    objdata = objdata.concat(BufferView.setInt16(obj._radius1));
                    objdata = objdata.concat(BufferView.setInt16(obj._radius2));

                    objdata = objdata.concat(BufferView.setPos(obj.position()));
                    objdata = objdata.concat(BufferView.setPos({
                        x: obj._markerx,
                        y: obj._markery
                    }));
                    break;

                case 'ndsensor':
                    objdata.unshift(0x15);
                    objdata = objdata.concat(BufferView.setCol(obj._color));
                    objdata = objdata.concat(BufferView.setInt16(obj._radius));
                    objdata = objdata.concat(BufferView.setPos(obj.position()));
                    objdata = objdata.concat(BufferView.setFloat32(obj.rotAngle()));
                    break;

                case 'vsensor':
                    objdata.unshift(0x17);
                    objdata = objdata.concat(setCol(obj._color));
                    objdata = objdata.concat(setInt16(obj._radiusa));
                    objdata = objdata.concat(setInt16(obj._radiusb));
                    if (obj._mode == 'A') {
                        objdata = objdata.concat(setInt8(0));
                    } else {
                        objdata = objdata.concat(setInt8(1));
                    }
                    objdata = objdata.concat(setPos(obj.position()));
                    break;

                case 'howitzer':
                    objdata.unshift(0x21);
                    objdata = objdata.concat(BufferView.setCol(obj._color));
                    objdata = objdata.concat(BufferView.setInt16(obj._radius1));
                    objdata = objdata.concat(BufferView.setInt16(obj._radius2));
                    objdata = objdata.concat(BufferView.setInt16(obj._radius3));

                    objdata = objdata.concat(BufferView.setPos(obj.position()));
                    objdata = objdata.concat(BufferView.setPos({
                        x: obj._markerx,
                        y: obj._markery
                    }));
                    break;

                case 'bunker':
                    objdata.unshift(0x22);
                    objdata = objdata.concat(BufferView.setCol(obj._color));
                    objdata = objdata.concat(BufferView.setPos(obj.position()));
                    break;

                case 'bomber':
                    objdata.unshift(0x23);
                    objdata = objdata.concat(BufferView.setCol(obj._color));
                    objdata = objdata.concat(BufferView.setPos(obj.position()));
                    objdata = objdata.concat(BufferView.setFloat32(obj.rotAngle()));
                    break;

                case 'bascout':
                    objdata.unshift(0x16);
                    objdata = objdata.concat(BufferView.setCol(obj._color));
                    objdata = objdata.concat(BufferView.setPos(obj.position()));
                    objdata = objdata.concat(BufferView.setFloat32(obj.rotAngle()));
                    break;

                case 'sentry':
                    objdata.unshift(0x24);
                    objdata = objdata.concat(BufferView.setCol(obj._color));
                    objdata = objdata.concat(BufferView.setPos(obj.position()));
                    objdata = objdata.concat(BufferView.setFloat32(obj.rotAngle()));
                    break;

                case 'aerosentry':
                    objdata.unshift(0x25);
                    objdata = objdata.concat(BufferView.setCol(obj._color));
                    objdata = objdata.concat(BufferView.setPos(obj.position()));
                    break;

                case 'waft':
                    objdata.unshift(0x30);
                    objdata = objdata.concat(BufferView.setCol(obj._color));
                    objdata = objdata.concat(BufferView.setStr(obj._file));
                    objdata = objdata.concat(BufferView.setPos(obj.position()));
                    objdata = objdata.concat(BufferView.setFloat32(obj.rotAngle()));
                    break;

                default:
                    objdata = undefined;
                    console.error("object " + obj.type + " not supported");
                    break;
            }
            if (objdata !== undefined) {
                objdata.unshift.apply(objdata, BufferView.setStr(obj._text));
                objdata.unshift.apply(objdata, BufferView.setInt16(objdata.length));
                // this._buf = this._buf.concat(objdata);
                // NOTE: 追加ではなく上書きに変更
                this._bv = new BufferView(objdata);
            }
        }
    }
} // BBCQuery