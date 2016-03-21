import { Base64 as Base64 } from 'js-base64';
import pako from 'pako';
import Color from 'color';

// バッファ arrayへの読み書き
export default class MyBuffer {
    constructor(byteArray = new Array()) {
        this._buf = byteArray;
        this._offset = 0;
    }
    toBase64() {
        let buf = this._buf;
        let data = pako.deflateRaw(buf, {
            to: "string"
        });
        return Base64.encode(data); // Uint8Array
    }
    static base64ToByteArray(b64) {
        let data = Base64.decode(b64);
        let inflated = pako.inflateRaw(data);
        return inflated;
    }

    writeByteArray(byteArray) {
        this._buf = this._buf.concat(byteArray);
        return this;
    }
    writeUint8(intNum) {
        let bytes = Array();
        bytes[0] = intNum & 0xff;
        return this.writeByteArray(bytes);
    }
    writeUint16(intNum) {
        let bytes = Array();
        bytes[0] = (intNum >>> 8) & 0xff;
        bytes[1] = intNum & 0xff;
        return this.writeByteArray(bytes);
    }
    writeUint32(intNum) {
        let bytes = Array();
        bytes[0] = (intNum >> 24) & 0xff;
        bytes[1] = (intNum >> 16) & 0xff;
        bytes[2] = (intNum >> 8)  & 0xff;
        bytes[3] = (intNum >> 0)  & 0xff;
        return this.writeByteArray(bytes);
    }
    writeString255(text) {
        let bytes = Array();
        let code;
        bytes[0] = text.length;
        if (255 < text.length) {
            throw new Error("String size error (too long)");
        }
        for (let i = 0; i < text.length; i++) {
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

        // let ret = Array();
        let NAN_BITS = 0 | 0x7FC00000;
        let INF_BITS = 0 | 0x7F800000;
        let ZERO_BITS = 0 | 0x00000000;
        let SIGN_MASK = 0 | 0x80000000;
        let EXP_MASK = 0 | 0x7F800000;
        let MANT_MASK = 0 | 0x007FFFFF;
        let MANT_MAX = Math.pow(2.0, 23) - 1.0;

        if (floatNum != floatNum)
            return NAN_BITS;
        let hasSign = floatNum < 0.0 || (floatNum == 0.0 && 1.0 / floatNum < 0);
        let signBits = hasSign ? SIGN_MASK : 0;
        let fabs = Math.abs(floatNum);

        if (fabs == Number.POSITIVE_INFINITY)
            return signBits | INF_BITS;

        let exp = 0,
            x = fabs;
        while (x >= 2.0 && exp <= 127) {
            exp++;
            x /= 2.0;
        }
        while (x < 1.0 && exp >= -126) {
            exp--;
            x *= 2.0;
        }
        let biasedExp = exp + 127;

        if (biasedExp == 255)
            return signBits | INF_BITS;
        let mantissa;
        if (biasedExp == 0) {
            mantissa = x * Math.pow(2.0, 23) / 2.0;
        } else {
            mantissa = x * Math.pow(2.0, 23) - Math.pow(2.0, 23);
        }

        let expBits = (biasedExp << 23) & EXP_MASK;
        let mantissaBits = mantissa & MANT_MASK;

        return signBits | expBits | mantissaBits;
    }
    writeFloat32(floatNum) {
        let bits = MyBuffer.floatToInt32Bits(floatNum);
        return this.writeUint32(bits);
    }
    writePoint(point) {
        let bytes = new Array(3);
        let xsign = (point.x < 0) ? 0x80 : 0,
            ysign = (point.y < 0) ? 0x08 : 0,
            absx = Math.abs(point.x),
            absy = Math.abs(point.y);
        bytes[0] = ((absx & 0x07F0) >> 4) | xsign;
        bytes[1] = ((absx & 0x000F) << 4) | ysign | ((absy & 0x0700) >> 8);
        bytes[2] = (absy & 0x00FF);
        return this.writeByteArray(bytes);
    }
    writeColor(colorStr) {
        let rgb = Color(colorStr).rgb();
        return this.writeByteArray([rgb['r'], rgb['g'], rgb['b']]);
    }

    readByteArray(length = 0) {
        if (length == 0) {
            return this._buf;
        }
        if (this._buf.length < this._offset + length - 1) {
            throw "Buffer size error (readByteArray)";
        }
        let b = this._buf.slice(this._offset, this._offset + length);
        this._offset += length;
        return b;
    }
    readUint8() {
        if (this._buf.length < this._offset) {
            throw "Buffer size error (get Uint8)";
        }
        let b0 = this._buf[this._offset];
        this._offset += 1;
        return b0;
    }
    readUint16() {
        if (this._buf.length < this._offset + 1) {
            throw "Buffer size error (get Uint16)";
        }
        let b1 = this._buf[this._offset];
        let b0 = this._buf[this._offset + 1];
        this._offset += 2;
        return (b1 << 8) + b0;
    }
    // NOTE: jsのbit演算は32bitベース
    // そして <<, >> は signed 32bit integerを返す
    // >>> は unsigned 32bit integerを返す
    // see ECMA-262 5.1
    readUint32() {
        if (this._buf.length < this._offset + 3) {
            throw "Buffer size error (get Uint32)";
        }
        let b3 = this._buf[this._offset];
        let b2 = this._buf[this._offset + 1];
        let b1 = this._buf[this._offset + 2];
        let b0 = this._buf[this._offset + 3];
        this._offset += 4;
        return (b3 <<24 >>>0) +(b2 <<16) +(b1 <<8) +b0;
    }
    // stringは先頭8bitにバイナリlength＋バイナリの形で格納
    readString255() {
        let len = this.readUint8(),
            value = '';
        try {
            for (let i = 0; i < len; i++) {
                let char1 = this.readUint16();

                if ((0xD800 <= char1) && (char1 <= 0xD8FF)) {
                    let char2 = this.readUint16();
                    value += String.fromCharCode((char2 << 16) | char1)
                } else {
                    value += String.fromCharCode(char1);
                }
            }
        } catch (e) {
            console.error(e);
            throw "Buffer size error (get String data)";
        }
        let control_codes = /[\u0000-\u001F\u007F-\u009F]/g;
        value.replace(control_codes, "\uFFFD");
        return value;
    }
    readPoint() {
        let a = this.readUint8(),
            b = this.readUint8(),
            c = this.readUint8();
        let xsign = (a & 0x80) ? (-1) : 1;
        let ysign = (b & 0x08) ? (-1) : 1;
        return {
            x: xsign * (((a & 0x7F) << 4) | ((b & 0xF0) >> 4)),
            y: ysign * (((b & 0x07) << 8) | c)
        };
    }
    static int32BitsToFloat(int32Bits) {
        let b0 = int32Bits >>24 & 0xff,
            b1 = int32Bits >>16 & 0xff,
            b2 = int32Bits >>8  & 0xff,
            b3 = int32Bits >>0  & 0xff;
        let sign = 1 - (2 * (b0 >> 7)),
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
    readFloat32() {
        let b = this.readUint32();
        return MyBuffer.int32BitsToFloat(b);
    }
    readColor() {
        let a = this.readUint8().toString(16),
            b = this.readUint8().toString(16),
            c = this.readUint8().toString(16),
            ret;
        ret = "#" + (a.length == 1 ? ("0" + a) : a) + (b.length == 1 ? ("0" + b) : b) + (c.length == 1 ? ("0" + c) : c);
        return ret;
    }

    static uint8ToByteArray(intNum) {
        let b = new MyBuffer();
        b.writeUint8(intNum);
        return b._buf;
    }
    static uint16ToByteArray(intNum) {
        let b = new MyBuffer();
        b.writeUint16(intNum);
        return b._buf;
    }
    static uint32ToByteArray(intNum) {
        let b = new MyBuffer();
        b.writeUint32(intNum);
        return b._buf;
    }
    static string255ToByteArray(text) {
        let b = new MyBuffer();
        b.writeString255(text);
        return b._buf;
    }
    static float32ToByteArray(floatNum) {
        let b = new MyBuffer();
        b.writeFloat32(floatNum);
        return b._buf;
    }
    static pointToByteArray(point) {
        let b = new MyBuffer();
        b.writePoint(point);
        return b._buf;
    }
    static colorToByteArray(colorStr) {
        let b = new MyBuffer();
        b.writeColor(colorStr);
        return b._buf;
    }
}

