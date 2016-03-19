import test from 'ava';
import 'babel-register';

import MyBuffer from '../src/js/MyBuffer';

test('#toBase64/#base64ToByteArray', (t) => {
    let buff = new MyBuffer();
    t.ok(buff.toBase64() == "AwA=");
   
    let ba = MyBuffer.base64ToByteArray("AwA=");
    t.ok(ba.constructor.name == "Uint8Array" && ba.length == 0);
});
test('#writeByteArray/#readByteArray', (t) => {
    let buff = new MyBuffer();

    buff.writeByteArray([0x01, 0x02, 0x03]);
    let r = buff.readByteArray(3);
    t.ok(r[0] == 0x01 && r[1] == 0x02 && r[2] == 0x03);
});
test('read/write unit', (t) => {
    let buff = new MyBuffer();

    buff.writeUint8(0x04);
    t.ok(0x04 == buff.readUint8());

    buff.writeUint16(0x05);
    t.ok(0x05 == buff.readUint16());

    buff.writeUint32(0x06);
    t.ok(0x06 == buff.readUint32());
});
test('read/write unit with minus input', (t) => {
    let buff = new MyBuffer();

    buff.writeUint8(-1);
    t.ok(0xff == buff.readUint8());
    
    buff.writeUint16(-1);
    t.ok(0xffff == buff.readUint16());

    buff.writeUint32(-1);
    t.ok(0xffffffff == buff.readUint32());
});
test('read/write string', (t) => {
    let buff = new MyBuffer();

    buff.writeString255("ab");
    buff.writeString255("cd");
    t.ok("ab" == buff.readString255());
    t.ok("cd" == buff.readString255());
});
test('read/write string with long string', (t) => {
    let buff = new MyBuffer();

    let str32 = "1234567890abcdef1234567890abcdef";
    let str256 =
        str32 + str32 + str32 + str32 +
        str32 + str32 + str32 + str32;
    t.ok(str256.length == 256);

    t.throws( () => {
        buff.writeString255(str256)
    }, "String size error (too long)");
});
test('read/write float', (t) => {
    let buff = new MyBuffer();

    t.ok(MyBuffer.int32BitsToFloat(MyBuffer.floatToInt32Bits(3.14)) == 3.1399998664855957);

    buff.writeFloat32(3.14);
    t.ok(MyBuffer.int32BitsToFloat(MyBuffer.floatToInt32Bits(3.14)) == buff.readFloat32());
});
test('read/write point', (t) => {
    let buff = new MyBuffer();

    buff.writePoint({x: 25, y: -25});
    let p = buff.readPoint();
    t.ok(p.x == 25 && p.y == -25);
});
test('read/write point with min/max value', (t) => {
    let buff = new MyBuffer();

    buff.writePoint({x: 2047, y: -2047});
    let p12 = buff.readPoint();
    t.ok(p12.x == 2047 && p12.y == -2047);

    buff.writePoint({x: 2048, y: -2048});
    let border = buff.readPoint();
    t.ok(border.x == 0 && border.y == 0);

    buff.writePoint({x: 2049, y: -2049});
    let over = buff.readPoint();
    t.ok(over.x == 1 && over.y == -1);
});
test('read/write color', (t) => {
    let buff = new MyBuffer();

    buff.writeColor("red");
    t.ok("#ff0000" == buff.readColor());
});
test('static *To* function', (t) => {
    t.ok("255" == MyBuffer.uint8ToByteArray(0xff).join());
    t.ok("255,255" == MyBuffer.uint16ToByteArray(0xffff).join());
    t.ok("255,255,255,255" == MyBuffer.uint32ToByteArray(0xffffffff).join());
    t.ok("3,0,97,0,98,0,99" == MyBuffer.string255ToByteArray("abc").join());
    t.ok("0,16,3" == MyBuffer.pointToByteArray({x: 1, y:3}).join());
    t.ok("1,152,25" == MyBuffer.pointToByteArray({x: 25, y:-25}).join());
    t.ok("255,0,0" == MyBuffer.colorToByteArray("red").join());
});

