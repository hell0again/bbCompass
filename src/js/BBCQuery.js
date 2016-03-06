import { Base64 as Base64 } from 'js-base64';
import pako from 'pako';
import jc from '../vendor/jcscript/jCanvaScript.1.5.18.min';

// this code is quoted from
// http://qiita.com/k_ui/items/e6c1661158bd584a4209
// canvasを利用して色情報をRGB値に変換する
var canvas = document.createElement('canvas');
canvas.width = 1;
canvas.height = 1;
var ctx = canvas.getContext('2d');

// バッファ arrayへの読み書き
class BufferView {
    constructor(byteArray = new Array()) {
        this._buf = byteArray;
        this._offset = 0;
    }
    toBase64() {
        var buf = this._buf;
        var data = pako.deflateRaw(buf, {
            to: "string"
        });
        return Base64.encode(data);
    }
    static base64ToByteArray(b64) {
        var data = Base64.decode(b64);
        var inflated = pako.inflateRaw(data));
        return inflated;
    }

    writeByteArray(byteArray) {
        this._buf = this._buf.concat(byteArray);
        return this;
    }
    writeInt8(intNum) {
        var bytes = Array();
        bytes[0] = intNum & 0x00ff;
        return this.writeByteArray(bytes);
    }
    writeInt16(intNum) {
        var bytes = Array();
        bytes[0] = (intNum >> 8) & 0x00ff;
        bytes[1] = intNum & 0x00ff;
        return this.writeByteArray(bytes);
    }
    writeInt32(intNum) {
        var bytes = Array();
        bytes[0] = (intNum >> 24) & 0x00ff;
        bytes[1] = (intNum >> 16) & 0x00ff;
        bytes[2] = (intNum >> 8)  & 0x00ff;
        bytes[3] = (intNum >> 0)  & 0x00ff;
        return this.writeByteArray(bytes);
    }
    writeString255(text) {
        var bytes = Array();
        var code;
        bytes[0] = text.length;
        if (255 < text.length) {
            throw "String size error (too long)";
        }
        for (var i = 0; i < text.length; i++) {
            code = text.charCodeAt(i);
            if (code & 0xffff0000) {
                bytes.push((code & 0xff000000) >> 24, (code & 0x00ff0000) >> 16, (code & 0x0000ff00) >> 8, (code & 0x000000ff));
            } else {
                bytes.push((code & 0x0000ff00) >> 8, (code & 0x000000ff));
            }
        }
        return this.writeByteArray(bytes);
    }
    static floatToInt32Bits(floatNum) {
        // this function is quoted from
        // http://stackoverflow.com/questions/3077718/converting-a-decimal-value-to-a-32bit-floating-point-hexadecimal

        // var ret = Array();
        var NAN_BITS = 0 | 0x7FC00000;
        var INF_BITS = 0 | 0x7F800000;
        var ZERO_BITS = 0 | 0x00000000;
        var SIGN_MASK = 0 | 0x80000000;
        var EXP_MASK = 0 | 0x7F800000;
        var MANT_MASK = 0 | 0x007FFFFF;
        var MANT_MAX = Math.pow(2.0, 23) - 1.0;

        if (floatNum != floatNum)
            return NAN_BITS;
        var hasSign = floatNum < 0.0 || (floatNum == 0.0 && 1.0 / floatNum < 0);
        var signBits = hasSign ? SIGN_MASK : 0;
        var fabs = Math.abs(floatNum);

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
        var mantissa;
        if (biasedExp == 0) {
            mantissa = x * Math.pow(2.0, 23) / 2.0;
        } else {
            mantissa = x * Math.pow(2.0, 23) - Math.pow(2.0, 23);
        }

        var expBits = (biasedExp << 23) & EXP_MASK;
        var mantissaBits = mantissa & MANT_MASK;

        return signBits | expBits | mantissaBits;
    }
    writeFloat32(floatNum) {
        var bits = BufferView.floatToInt32Bits(floatNum);
        return this.writeInt32(bits);
    }
    writePoint(point) {
        var bytes = new Array(3);
        var xsign = (point.x < 0) ? 0x80 : 0,
            ysign = (point.y < 0) ? 0x08 : 0,
            absx = Math.abs(point.x),
            absy = Math.abs(point.y);
        bytes[0] = ((absx & 0x07F0) >> 4) | xsign;
        bytes[1] = ((absx & 0x000F) << 4) | ysign | ((absy & 0x0700) >> 8);
        bytes[2] = (absy & 0x00FF);
        return this.writeByteArray(bytes);
    }
    writeColor(colorStr) {
        ctx.fillStyle = colorStr;
        ctx.fillRect(0, 0, 1, 1);
        var col = ctx.getImageData(0, 0, 1, 1).data;
        return this.writeByteArray([col[0], col[1], col[2]]);
    }

    readByteArray(length = 0) {
        if (length == 0) {
            return this._buf;
        }
        if (this._buf.length < this._offset + length - 1) {
            throw "Buffer size error (readByteArray)";
        }
        var b = this._buf.slice(this._offset, this._offset + length);
        this._offset += length;
        return b;
    }
    readUint8() {
        if (this._buf.length < this._offset) {
            throw "Buffer size error (get Uint8)";
        }
        var b0 = this._buf[this._offset];
        this._offset += 1;
        return b0;
    }
    readUint16() {
        if (this._buf.length < this._offset + 1) {
            throw "Buffer size error (get Uint16)";
        }
        var b1 = this._buf[this._offset];
        var b0 = this._buf[this._offset + 1];
        this._offset += 2;
        return (b1 << 8) + b0;
    }
    readUint32() {
        if (this._buf.length < this._offset + 3) {
            throw "Buffer size error (get Uint32)";
        }
        var b3 = this._buf[this._offset];
        var b2 = this._buf[this._offset + 1];
        var b1 = this._buf[this._offset + 2];
        var b0 = this._buf[this._offset + 3];
        this._offset += 4;
        return (b3 << 24) +(b2 << 16) +(b1 << 8) +b0;
    }
    // stringは先頭8bitにバイナリlength＋バイナリの形で格納
    readString255() {
        var len = this.readUint8(),
            value = '';
        try {
            for (var i = 0; i < len; i++) {
                var char1 = this.readUint16();

                if ((0xD800 <= char1) && (char1 <= 0xD8FF)) {
                    var char2 = this.readUint16();
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
    readPoint() {
        var a = this.readUint8(),
            b = this.readUint8(),
            c = this.readUint8();
        var xsign = (a & 0x80) ? (-1) : 1;
        var ysign = (b & 0x08) ? (-1) : 1;
        return {
            x: xsign * (((a & 0x7F) << 4) | ((b & 0xF0) >> 4)),
            y: ysign * (((b & 0x07) << 8) | c)
        };
    }
    readFloat32() {
        var b0 = this.readUint8(),
            b1 = this.readUint8(),
            b2 = this.readUint8(),
            b3 = this.readUint8();
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
    readColor() {
        var a = (this.readUint8()).toString(16),
            b = (this.readUint8()).toString(16),
            c = (this.readUint8()).toString(16),
            ret;
        ret = "#" + (a.length == 1 ? ("0" + a) : a) + (b.length == 1 ? ("0" + b) : b) + (c.length == 1 ? ("0" + c) : c);
        return ret;
    }

    static int8ToByteArray(intNum) {
        var b = new BufferView();
        b.writeInt8(intNum);
        return b._buf;
    }
    static int16ToByteArray(intNum) {
        var b = new BufferView();
        b.writeInt16(intNum);
        return b._buf;
    }
    static int32ToByteArray(intNum) {
        var b = new BufferView();
        b.writeInt32(intNum);
        return b._buf;
    }
    static string255ToByteArray(text) {
        var b = new BufferView();
        b.writeString255(text);
        return b._buf;
    }
    static float32ToByteArray(floatNum) {
        var b = new BufferView();
        b.writeFloat32(floatNum);
        return b._buf;
    }
    static pointToByteArray(point) {
        var b = new BufferView();
        b.writePoint(point);
        return b._buf;
    }
    static colorToByteArray(colorStr) {
        var b = new BufferView();
        b.writeColor(colorStr);
        return b._buf;
    }
}

/**
 * 先頭から以下のようなバイト列
 * - map名のバイト数: Int8
 * - map名: String255
 * - objectのバイト数: Int16
 * - objectの名前: String255
 * - objectのタイプコード: Int8
 * - object: objectごとのバイト列
 * - objectのバイト数: Int16
 * - objectの名前: String255
 * - objectのタイプコード: Int8
 * - object: objectごとのバイト列
 * ..
 *
 * ただしobjectのバイト数に名前とタイプコードは含めない
 */
export default class BBCQuery {
    constructor() {
        this.map = 'dummy';
        this.buffer = new BufferView();
    }
    static createFromBase64(b64) {
        var bbc = new BBCQuery();
        bbc.buffer.writeByteArray(BufferView.base64ToByteArray(b64));
        bbc.map = bbc._readMap();
        return bbc;
    }
    static createFromMapAndObjects(map, objs) {
        var bbc = new BBCQuery();
        bbc._writeMap(map);
        bbc._writeObjects(objs);
        bbc.map = bbc._readMap();
        return bbc;
    }
    // static createFromBase64(b64) {
    //     var buffer = new BufferView(BufferView.base64ToByteArray(b64));
    //     // var map;
    //     // try {
    //     //     map = buffer.readString255();
    //     // } catch (e) {
    //     //     console.error(e);
    //     //     alert("データ取り込み中にエラーが発生しました");
    //     //     map = 'dummy';
    //     // }
    //     var bbc = new BBCQuery();
    //     bbc.buffer = buffer;
    //     return bbc;
    // }
    toBase64() {
        return this.buffer.toBase64();
    }

    _readMap() {
        return this.buffer.readString255();
    }
    _writeMap(map) {
        this.buffer.writeString255(map);
    }
    _writeObjects(objs) {
        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i];
            this._writeObject(obj);
        }
    }
    _writeObject(obj) {
        var objType,
            objByteArray;
        switch (obj.type) {
            case 'circle':
                objType = 0x01;
                objByteArray = circleToByteArray(obj);
                break;
            case 'line':
                objType = 0x02;
                objByteArray = lineToByteArray(obj);
                break;
            case 'freehand':
                objType = 0x03;
                objByteArray = freehandToByteArray(obj);
                break;
            case 'point':
                objType = 0x04;
                objByteArray = pointToByteArray(obj);
                break;
            case 'icon':
                objType = 0x05;
                objByteArray = iconToByteArray(obj);
                break;
            case 'scout':
                objType = 0x11;
                objByteArray = scoutToByteArray(obj);
                break;
            case 'sensor':
                objType = 0x12;
                objByteArray = sensorToByteArray(obj);
                break;
            case 'radar':
                objType = 0x13;
                objByteArray = radarToByteArray(obj);
                break;
            case 'sonde':
                objType = 0x14;
                objByteArray = sondeToByteArray(obj);
                break;
            case 'ndsensor':
                objType = 0x15;
                objByteArray = ndSensorToByteArray(obj);
                break;
            case 'vsensor':
                objType = 0x17;
                objByteArray = vSensorToByteArray(obj);
                break;
            case 'howitzer':
                objType = 0x21;
                objByteArray = howitzerToByteArray(obj);
                break;
            case 'bunker':
                objType = 0x22;
                objByteArray = bunkerToByteArray(obj);
                break;
            case 'bomber':
                objType = 0x23;
                objByteArray = bomberToByteArray(obj);
                break;
            case 'bascout':
                objType = 0x16;
                objByteArray = baScoutToByteArray(obj);
                break;
            case 'sentry':
                objType = 0x24;
                objByteArray = sentryToByteArray(obj);
                break;
            case 'aerosentry':
                objType = 0x25;
                objByteArray = aeroSentryToByteArray(obj);
                break;
            case 'waft':
                objType = 0x30;
                objByteArray = waftToByteArray(obj);
                break;
            default:
                console.error(`object ${obj.type} not supported`);
                break;
        }
        if (objByteArray != undefined) {
            var objBuff = new BufferView();
            var objName = obj._text,
            var objlen;
            objBuff.writeInt16(objByteArray.length);
            objBuff.writeString255(objName);
            objBuff.writeInt8(objType);
            objBuff.writeByteArray(objByteArray);

            this.buffer.writeByteArray(objBuff.readByteArray());
        }
    }
    // オブジェクトを復元する
    applyObjects(bbobj) {
        var objs = new Array(),
            buffer = this.buffer;
        try {
            while (buffer._offset < buffer._buf.length) {
                var obj,
                var objlen  = buffer.readUint16();
                var objname = buffer.readString255();
                var objtype = buffer.readUint8();
                var buff    = buffer.readByteArray(objlen);
                switch (objtype) {
                    case 0x01:
                        obj = readCircle(buff, objlen, objname, bbobj);
                        break;
                    case 0x02:
                        obj = readLine(buff, objlen, objname, bbobj);
                        break;
                    case 0x03:
                        obj = readFreehand(buff, objlen, objname, bbobj);
                        break;
                    case 0x04:
                        obj = readPoint(buff, objlen, objname, bbobj);
                        break;
                    case 0x05:
                        obj = readIcon(buff, objlen, objname, bbobj);
                        break;
                    case 0x11:
                        obj = readScout(buff, objlen, objname, bbobj);
                        break;
                    case 0x12:
                        obj = readSensor(buff, objlen, objname, bbobj);
                        break;
                    case 0x13:
                        obj = readRadar(buff, objlen, objname, bbobj);
                        break;
                    case 0x14:
                        obj = readSonde(buff, objlen, objname, bbobj);
                        break;
                    case 0x15:
                        obj = readNdSensor(buff, objlen, objname, bbobj);
                        break;
                    case 0x16:
                        obj = readBaScout(buff, objlen, objname, bbobj);
                        break;
                    case 0x17:
                        obj = readVSensor(buff, objlen, objname, bbobj);
                        break;
                    case 0x21:
                        obj = readHowitzer(buff, objlen, objname, bbobj);
                        break;
                    case 0x22:
                        obj = readBunker(buff, objlen, objname, bbobj);
                        break;
                    case 0x23:
                        obj = readBomber(buff, objlen, objname, bbobj);
                        break;
                    case 0x24:
                        obj = readSentry(buff, objlen, objname, bbobj);
                        break;
                    case 0x25:
                        obj = readAeroSentry(buff, objlen, objname, bbobj);
                        break;
                    case 0x30:
                        obj = readWaft(buff, objlen, objname, bbobj);
                        break;
                    default:
                        obj = undefined;
                        console.error(`object type not supported (${objtype})`);
                        // view.seek(view.tell() + objlen - 1);
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
}


function readCircle(buffer, length, name, bbobj) {
    var color = buffer.readColor(),
        rad   = buffer.readUint16(),
        pos   = buffer.readPoint(),
        ptpos = buffer.readPoint();

    var obj = bbobj.add_circle(name, rad, color, function() {
        this._ptpos = ptpos;
        this.moveTo(pos.x, pos.y)
            .redraw();
    });
    return obj;
}
function circleToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeColor(obj._color);
    buffer.writeInt16(obj._radius);
    buffer.writePoint(obj.position());
    buffer.writePoint(obj._ptpos);
    return buffer.readByteArray();
}

function readLine(buffer, length, name, bbobj) {
    var color  = buffer.readColor(),
        len    = buffer.readUint16(),
        pos    = buffer.readPoint(),
        pt1pos = buffer.readPoint(),
        pt2pos = buffer.readPoint();

    var obj = bbobj.add_line(name, len, color, function() {
        this._pt1pos = pt1pos;
        this._pt2pos = pt2pos;
        this.moveTo(pos.x, pos.y)
            .redraw();
    });
    return obj;
}
function lineToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeColor(obj._color);
    buffer.writeInt16(obj._length);
    buffer.writePoint(obj.position());
    buffer.writePoint(obj._pt1pos);
    buffer.writePoint(obj._pt2pos);
    return buffer.readByteArray();
}

function readFreehand(buffer, length, name, bbobj) {
    var obj = bbobj.add_freehand(name);
    obj._step = buff.readUint8();
    for (i = 1; i <= obj._step; i++) {
        obj._stepcol[i] = buff.readColor();
        var length = buff.readUint16(),
            points = new Array();
        for (j = 0; j < length; j++) {
            var point = buff.readPoint();
            points.push([point.x, point.y]);
        }
        // TODO: jc はどこから？
        jc.line(points, obj._stepcol[i])
            .layer(obj.id).id(i).lineStyle({
                lineWidth: 3
            });
    }
    return obj;
}
function freehandToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeInt8(obj._step);
    for (i = 1; i <= obj._step; i++) {
        buffer.writeColor(obj._stepcol[i]);
        var points = jc("#" + i, {
            canvas: this.bbobj.id,
            layer: obj.id
        }).points();
        buffer.writeInt16(points.length);
        for (j = 0; j < points.length; j++) {
            buffer.writePoint({
                x: (points[j])[0],
                y: (points[j])[1]
            });
        }
    }
    return buffer.readByteArray();
}

function readPoint(buffer, length, name, bbobj) {
    var color = buff.readColor(),
        align = buff.readUint8(),
        size  = buff.readUint8(),
        pos   = buff.readPoint();

    var obj = bbobj.add_point(name, size, color, align, function() {
        this.moveTo(pos.x, pos.y)
            .redraw();
    });
    return obj;
}
function pointToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeColor(obj._color);
    buffer.writeInt8(obj._align);
    buffer.writeInt8(obj._size);
    buffer.writePoint(obj.position());
    return buffer.readByteArray();
}

function readIcon(buffer, length, name, bbobj) {
    var color = buff.readColor(),
        file  = buff.readString255(),
        pos   = buff.readPoint();
    var obj = bbobj.add_icon(name, file, color, function() {
        this.moveTo(pos.x, pos.y)
            .redraw();
    });
    return obj;
}
function iconToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeColor(obj._color);
    buffer.writeString255(obj._file);
    buffer.writePoint(obj.position());
    return buffer.readByteArray();
}

function readScout(buffer, length, name, bbobj) {
    var color    = buff.readColor(),
        rad      = buff.readUint16(),
        len      = buff.readUint16(),
        duration = buff.readUint16(),
        pos      = buff.readPoint(),
        rotAngle = buff.readFloat32();
    var obj = bbobj.add_scout(name, rad, len, duration, color, function() {
        this.moveTo(pos.x, pos.y)
            .rotateTo(rotAngle)
            .redraw();
    });
    return obj;
}
function scoutToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeColor(obj._color);
    buffer.writeInt16(obj._radius);
    buffer.writeInt16(obj._length);
    buffer.writeInt16(obj._duration);
    buffer.writePoint(obj.position());
    buffer.writeFloat32(obj.rotAngle());
    return buffer.readByteArray();
}

function readSensor(buffer, length, name, bbobj) {
    var color = buff.readColor(),
        rad   = buff.readUint16(),
        pos   = buff.readPoint();
    var obj = bbobj.add_sensor(name, rad, color, function() {
        this.moveTo(pos.x, pos.y)
            .redraw();
    });
    return obj;
}
function sensorToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeColor(obj._color);
    buffer.writeInt16(obj._radius);
    buffer.writePoint(obj.position());
    return buffer.readByteArray();
}

function readRadar(buffer, length, name, bbobj) {
    var color    = buff.readColor(),
        rad      = buff.readUint16(),
        angle    = buff.readUint16(),
        pos      = buff.readPoint(),
        rotAngle = buff.readFloat32();
    var obj = bbobj.add_radar(objname, rad, angle, color, function() {
        this.moveTo(pos.x, pos.y)
            .rotateTo(rotAngle)
            .redraw();
    });
    return obj;
}
function radarToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeColor(obj._color);
    buffer.writeInt16(obj._radius);
    buffer.writeInt16(obj._angle);
    buffer.writePoint(obj.position());
    buffer.writeFloat32(obj.rotAngle());
    return buffer.readByteArray();
}

function readSonde(buffer, length, name, bbobj) {
    var color   = buff.readColor(),
        rad1    = buff.readUint16(),
        rad2    = buff.readUint16(),
        pos     = buff.readPoint(),
        markpos = buff.readPoint();
    var obj = bbobj.add_sonde(name, rad1, rad2, color, function() {
        this._markerx = markpos.x;
        this._markery = markpos.y;
        this.moveTo(pos.x, pos.y)
            .redraw();
    });
    return obj;
}
function sondeToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeColor(obj._color);
    buffer.writeInt16(obj._radius1);
    buffer.writeInt16(obj._radius2);
    buffer.writePoint(obj.position());
    buffer.writePoint({
        x: obj._markerx,
        y: obj._markery
    });
    return buffer.readByteArray();
}

function readNdSensor(buffer, length, name, bbobj) {
    var color = buff.readColor(),
        rad = buff.readUint16(),
        pos = buff.readPoint(),
        rotAngle = buff.readFloat32();
    var obj = bbobj.add_ndsensor(name, rad, color, function() {
        this.moveTo(pos.x, pos.y)
            .rotateTo(rotAngle)
            .redraw();
    });
    return obj;
}
function ndSensorToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeCcolor(obj._color);
    buffer.writeInt16(obj._radius);
    buffer.writePoint(obj.position());
    buffer.writeFloat32(obj.rotAngle());
    return buffer.readByteArray();
}

function readVSensor(buffer, length, name, bbobj) {
    var color = buff.readColor(),
        rada  = buff.readUint16(),
        radb  = buff.readUint16(),
        mode  = buff.readUint8(),
        pos   = buff.readPoint();
    if (mode == 0) {
        mode = 'A';
    } else {
        mode = 'B';
    }
    var obj = bbobj.add_vsensor(name, rada, radb, color, mode, function() {
        this.moveTo(pos.x, pos.y)
            .redraw();
    });
    return obj;
}
function vSensorToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeColor(obj._color);
    buffer.writeInt16(obj._radiusa);
    buffer.writeInt16(obj._radiusb);
    if (obj._mode == 'A') {
        buffer.writeInt8(0);
    } else {
        buffer.writeInt8(1);
    }
    buffer.writePoint(obj.position());
    return buffer.readByteArray();
}

function readHowitzer(buffer, length, name, bbobj) {
    var color   = buff.readColor(),
        rad1    = buff.readUint16(),
        rad2    = buff.readUint16(),
        rad3    = buff.readUint16(),
        pos     = buff.readPoint(),
        markpos = buff.readPoint();

    var obj = bbobj.add_howitzer(name, rad1, rad2, rad3, color, function() {
        this._markerx = markpos.x;
        this._markery = markpos.y;
        this.moveTo(pos.x, pos.y)
            .redraw();
    });
    return obj;
}
function howitzerToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeColor(obj._color);
    buffer.writeInt16(obj._radius1);
    buffer.writeInt16(obj._radius2);
    buffer.writeInt16(obj._radius3);
    buffer.writePoint(obj.position());
    buffer.writePoint({
        x: obj._markerx,
        y: obj._markery
    });
    return buffer.readByteArray();
}

function readBunker(buffer, length, name, bbobj) {
    var color = buff.readColor(),
        pos   = buff.readPoint();

    var obj = bbobj.add_bunker(name, color, function() {
        this.moveTo(pos.x, pos.y)
            .redraw();
    });
    return obj;
}
function bunkerToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeColor(obj._color);
    buffer.writePoint(obj.position());
    return buffer.readByteArray();
}

function readBomber(buffer, length, name, bbobj) {
    var color    = buff.readColor(),
        pos      = buff.readPoint(),
        rotAngle = buff.readFloat32();

    var obj = bbobj.add_bomber(name, color, function() {
        this.moveTo(pos.x, pos.y)
            .rotateTo(rotAngle)
            .redraw();
    });
    return obj;
}
function bomberToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeColor(obj._color);
    buffer.writePoint(obj.position());
    buffer.writeFloat32(obj.rotAngle());
    return buffer.readByteArray();
}

function readBaScout(buffer, length, name, bbobj) {
    var color    = buff.readColor(),
        pos      = buff.readPoint(),
        rotAngle = buff.readFloat32();

    var obj = bbobj.add_bascout(name, color, function() {
        this.moveTo(pos.x, pos.y)
            .rotateTo(rotAngle)
            .redraw();
    });
    return obj;
}
function baScoutToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeColor(obj._color);
    buffer.writePoint(obj.position());
    buffer.writeFloat32(obj.rotAngle());
    return buffer.readByteArray();
}

function readSentry(buffer, length, name, bbobj) {
    var color    = buff.readColor(),
        pos      = buff.readPoint(),
        rotAngle = buff.readFloat32();

    var obj = bbobj.add_sentry(name, color, function() {
        this.moveTo(pos.x, pos.y)
            .rotateTo(rotAngle)
            .redraw();
    });
    return obj;
}
function sentryToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeColor(obj._color);
    buffer.writePoint(obj.position());
    buffer.writeFloat32(obj.rotAngle());
    return buffer.readByteArray();
}

function readAeroSentry(buffer, length, name, bbobj) {
    var color = buff.readColor(),
        pos   = buff.readPoint();

    var obj = bbobj.add_aerosentry(name, color, function() {
        this.moveTo(pos.x, pos.y)
            .redraw();
    });
    return obj;
}
function aeroSentryToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeColor(obj._color);
    buffer.writePoint(obj.position());
    return buffer.readByteArray();
}

function readWaft(buffer, length, name, bbobj) {
    var color    = buff.readColor(),
        file     = buff.readString255(),
        pos      = buff.readPoint(),
        rotAngle = buff.readFloat32();

    var obj = bbobj.add_waft(name, file, color, function() {
        this.moveTo(pos.x, pos.y)
            .rotateTo(rotAngle)
            .redraw();
    });
    return obj;
}
function waftToByteArray(obj) {
    var buffer = new BufferView();

    buffer.writeColor(obj._color);
    buffer.writeString255(obj._file);
    buffer.writePoint(obj.position());
    buffer.writeFloat32(obj.rotAngle());
    return buffer.readByteArray();
}







