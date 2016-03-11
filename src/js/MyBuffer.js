import { Base64 as Base64 } from 'js-base64';
import pako from 'pako';

// this code is quoted from
// http://qiita.com/k_ui/items/e6c1661158bd584a4209
// canvasを利用して色情報をRGB値に変換する
var canvas = document.createElement('canvas');
canvas.width = 1;
canvas.height = 1;
var ctx = canvas.getContext('2d');

// バッファ arrayへの読み書き
export default class MyBuffer {
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
        var inflated = pako.inflateRaw(data);
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
        var bits = MyBuffer.floatToInt32Bits(floatNum);
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
        var b = new MyBuffer();
        b.writeInt8(intNum);
        return b._buf;
    }
    static int16ToByteArray(intNum) {
        var b = new MyBuffer();
        b.writeInt16(intNum);
        return b._buf;
    }
    static int32ToByteArray(intNum) {
        var b = new MyBuffer();
        b.writeInt32(intNum);
        return b._buf;
    }
    static string255ToByteArray(text) {
        var b = new MyBuffer();
        b.writeString255(text);
        return b._buf;
    }
    static float32ToByteArray(floatNum) {
        var b = new MyBuffer();
        b.writeFloat32(floatNum);
        return b._buf;
    }
    static pointToByteArray(point) {
        var b = new MyBuffer();
        b.writePoint(point);
        return b._buf;
    }
    static colorToByteArray(colorStr) {
        var b = new MyBuffer();
        b.writeColor(colorStr);
        return b._buf;
    }
}

