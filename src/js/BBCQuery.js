import MyBuffer from './MyBuffer';
import BoardObjectRegistry from './BoardObjectRegistry';

/**
 * BbObjをシリアライズする。
 * シリアライズはbase64のみ用意。
 * 
 * マップとオブジェクト情報をbufferに詰め込む。
 * bufferは先頭から以下のようなバイト列。
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
// export default class BBCQuery {
export default class BbBoardSerializer {
    constructor() {
        this.map = 'dummy';
        this.buffer = new MyBuffer();
    }
    static createFromBase64(b64) {
        var bbc = new BbBoardSerializer();
        bbc.buffer.writeByteArray(MyBuffer.base64ToByteArray(b64));
        try {
            bbc.map = bbc._readMap();
        } catch(e) {
            console.error(e);
            alert("データ取り込み中にエラーが発生しました");
            bbc.map = 'dummy';
        }
        return bbc;
    }
    static createFromMapAndObjects(map, objs) {
        var bbc = new BbBoardSerializer();
        bbc._writeMap(map);
        bbc._writeObjects(objs);
        bbc.map = bbc._readMap();
        return bbc;
    }
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
        objType = obj.constructor.getLabel();
        objByteArray = obj.constructor.serialize(obj);
        /*
        switch (obj.type) {
            case 'circle':
                objType = 0x01;
                objByteArray = circleToByteArray(obj);
                break;
            ..
            default:
                console.error(`object ${obj.type} not supported`);
                break;
        }
        */
        if (objByteArray != undefined) {
            var objBuff = new MyBuffer();
            var objName = obj._text;
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
                var obj;
                var buffLen = buffer.readUint16();
                var objName = buffer.readString255();
                var objType = buffer.readUint8();
                var buff    = buffer.readByteArray(buffLen);

                var objClass = BoardObjectRegistry.getInstance().getByTypeCode(objType);
                obj = objClass.deserialize(buff, buffLen, objName, bbobj);
                /*
                switch (objtype) {
                    case 0x01:
                        obj = readCircle(buff, objlen, objname, bbobj);
                        break;
                    ..
                    default:
                        obj = undefined;
                        console.error(`object type not supported (${objtype})`);
                        // view.seek(view.tell() + objlen - 1);
                        break;
                }
                */
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






class BoardObject {
    // static getLabel()
    // static serialize(obj)
    // static deserialize(obj)
}



class BoardObjectLine extends BoardObject {
    static getLabel() {
        return "BoardObjectLine";
    }
    static serialize(obj) {
        var buffer = new MyBuffer();
    
        buffer.writeColor(obj._color);
        buffer.writeInt16(obj._length);
        buffer.writePoint(obj.position());
        buffer.writePoint(obj._pt1pos);
        buffer.writePoint(obj._pt2pos);
        return buffer.readByteArray();
    }
    static deserialize(buffer, length, name, bbobj) {
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
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectLine.getLabel(), BoardObjectLine);

class BoardObjectFreehand extends BoardObject {
    static getLabel() {
        return "BoardObjectFreehand";
    }
    static serialize(obj, opts) {
        var jc = opts.jc; //TODO: あとでなんとかする
        debugger;
        var buffer = new MyBuffer();
    
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
    static deserialize(buffer, length, name, bbobj, opts) {
        var jc = opts.jc; //TODO: あとでなんとかする
        debugger;
        var obj = bbobj.add_freehand(name);
        obj._step = buffer.readUint8();
        for (i = 1; i <= obj._step; i++) {
            obj._stepcol[i] = buffer.readColor();
            var length = buffer.readUint16(),
                points = new Array();
            for (j = 0; j < length; j++) {
                var point = buffer.readPoint();
                points.push([point.x, point.y]);
            }
            jc.line(points, obj._stepcol[i])
                .layer(obj.id).id(i).lineStyle({
                    lineWidth: 3
                });
        }
        return obj;
    }
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectFreehand.getLabel(), BoardObjectFreehand);

class BoardObjectPoint extends BoardObject {
    static getLabel() {
        return "BoardObjectPoint";
    }
    static serialize(obj) {
        var buffer = new MyBuffer();
    
        buffer.writeColor(obj._color);
        buffer.writeInt8(obj._align);
        buffer.writeInt8(obj._size);
        buffer.writePoint(obj.position());
        return buffer.readByteArray();
    }
    static deserialize(buffer, length, name, bbobj) {
        var color = buffer.readColor(),
            align = buffer.readUint8(),
            size  = buffer.readUint8(),
            pos   = buffer.readPoint();
    
        var obj = bbobj.add_point(name, size, color, align, function() {
            this.moveTo(pos.x, pos.y)
                .redraw();
        });
        return obj;
    }
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectPoint.getLabel(), BoardObjectPoint);

class BoardObjectIcon extends BoardObject {
    static getLabel() {
        return "BoardObjectIcon";
    }
    static serialize(obj) {
        var buffer = new MyBuffer();
    
        buffer.writeColor(obj._color);
        buffer.writeString255(obj._file);
        buffer.writePoint(obj.position());
        return buffer.readByteArray();
    }
    static deserialize(buffer, length, name, bbobj) {
        var color = buffer.readColor(),
            file  = buffer.readString255(),
            pos   = buffer.readPoint();
        var obj = bbobj.add_icon(name, file, color, function() {
            this.moveTo(pos.x, pos.y)
                .redraw();
        });
        return obj;
    }
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectIcon.getLabel(), BoardObjectIcon);

class BoardObjectScout extends BoardObject {
    static getLabel() {
        return "BoardObjectScout";
    }
    static serialize(obj) {
        var buffer = new MyBuffer();
    
        buffer.writeColor(obj._color);
        buffer.writeInt16(obj._radius);
        buffer.writeInt16(obj._length);
        buffer.writeInt16(obj._duration);
        buffer.writePoint(obj.position());
        buffer.writeFloat32(obj.rotAngle());
        return buffer.readByteArray();
    }
    static deserialize(buffer, length, name, bbobj) {
        var color    = buffer.readColor(),
            rad      = buffer.readUint16(),
            len      = buffer.readUint16(),
            duration = buffer.readUint16(),
            pos      = buffer.readPoint(),
            rotAngle = buffer.readFloat32();
        var obj = bbobj.add_scout(name, rad, len, duration, color, function() {
            this.moveTo(pos.x, pos.y)
                .rotateTo(rotAngle)
                .redraw();
        });
        return obj;
    }
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectScout.getLabel(), BoardObjectScout);

class BoardObjectSensor extends BoardObject {
    static getLabel() {
        return "BoardObjectSensor";
    }
    static serialize(obj) {
        var buffer = new MyBuffer();
    
        buffer.writeColor(obj._color);
        buffer.writeInt16(obj._radius);
        buffer.writePoint(obj.position());
        return buffer.readByteArray();
    }
    static deserialize(buffer, length, name, bbobj) {
        var color = buffer.readColor(),
            rad   = buffer.readUint16(),
            pos   = buffer.readPoint();
        var obj = bbobj.add_sensor(name, rad, color, function() {
            this.moveTo(pos.x, pos.y)
                .redraw();
        });
        return obj;
    }
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectSensor.getLabel(), BoardObjectSensor);

class BoardObjectRadar extends BoardObject {
    static getLabel() {
        return "BoardObjectRadar";
    }
    static serialize(obj) {
        var buffer = new MyBuffer();
    
        buffer.writeColor(obj._color);
        buffer.writeInt16(obj._radius);
        buffer.writeInt16(obj._angle);
        buffer.writePoint(obj.position());
        buffer.writeFloat32(obj.rotAngle());
        return buffer.readByteArray();
    }
    static deserialize(buffer, length, name, bbobj) {
        var color    = buffer.readColor(),
            rad      = buffer.readUint16(),
            angle    = buffer.readUint16(),
            pos      = buffer.readPoint(),
            rotAngle = buffer.readFloat32();
        var obj = bbobj.add_radar(name, rad, angle, color, function() {
            this.moveTo(pos.x, pos.y)
                .rotateTo(rotAngle)
                .redraw();
        });
        return obj;
    }
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectRadar.getLabel(), BoardObjectRadar);

class BoardObjectSonde extends BoardObject {
    static getLabel() {
        return "BoardObjectSonde";
    }
    static serialize(obj) {
        var buffer = new MyBuffer();
    
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
    static deserialize(buffer, length, name, bbobj) {
        var color   = buffer.readColor(),
            rad1    = buffer.readUint16(),
            rad2    = buffer.readUint16(),
            pos     = buffer.readPoint(),
            markpos = buffer.readPoint();
        var obj = bbobj.add_sonde(name, rad1, rad2, color, function() {
            this._markerx = markpos.x;
            this._markery = markpos.y;
            this.moveTo(pos.x, pos.y)
                .redraw();
        });
        return obj;
    }
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectSonde.getLabel(), BoardObjectSonde);

class BoardObjectNdSensor extends BoardObject {
    static getLabel() {
        return "BoardObjectNdSensor";
    }
    static serialize(obj) {
        var buffer = new MyBuffer();
    
        buffer.writeCcolor(obj._color);
        buffer.writeInt16(obj._radius);
        buffer.writePoint(obj.position());
        buffer.writeFloat32(obj.rotAngle());
        return buffer.readByteArray();
    }
    static deserialize(buffer, length, name, bbobj) {
        var color = buffer.readColor(),
            rad = buffer.readUint16(),
            pos = buffer.readPoint(),
            rotAngle = buffer.readFloat32();
        var obj = bbobj.add_ndsensor(name, rad, color, function() {
            this.moveTo(pos.x, pos.y)
                .rotateTo(rotAngle)
                .redraw();
        });
        return obj;
    }
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectNdSensor.getLabel(), BoardObjectNdSensor);

class BoardObjectBaScout extends BoardObject {
    static getLabel() {
        return "BoardObjectBaScout";
    }
    static serialize(obj) {
        var buffer = new MyBuffer();
    
        buffer.writeColor(obj._color);
        buffer.writePoint(obj.position());
        buffer.writeFloat32(obj.rotAngle());
        return buffer.readByteArray();
    }
    static deserialize(buffer, length, name, bbobj) {
        var color    = buffer.readColor(),
            pos      = buffer.readPoint(),
            rotAngle = buffer.readFloat32();
    
        var obj = bbobj.add_bascout(name, color, function() {
            this.moveTo(pos.x, pos.y)
                .rotateTo(rotAngle)
                .redraw();
        });
        return obj;
    }
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectBaScout.getLabel(), BoardObject);

class BoardObjectVSensor extends BoardObject {
    static getLabel() {
        return "BoardObjectVSensor";
    }
    static serialize(obj) {
        var buffer = new MyBuffer();
    
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
    static deserialize(buffer, length, name, bbobj) {
        var color = buffer.readColor(),
            rada  = buffer.readUint16(),
            radb  = buffer.readUint16(),
            mode  = buffer.readUint8(),
            pos   = buffer.readPoint();
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
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectVSensor.getLabel(), BoardObjectVSensor);

class BoardObjectHowitzer extends BoardObject {
    static getLabel() {
        return "BoardObjectHowitzer";
    }
    static serialize(obj) {
        var buffer = new MyBuffer();
    
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
    static deserialize(buffer, length, name, bbobj) {
        var color   = buffer.readColor(),
            rad1    = buffer.readUint16(),
            rad2    = buffer.readUint16(),
            rad3    = buffer.readUint16(),
            pos     = buffer.readPoint(),
            markpos = buffer.readPoint();
    
        var obj = bbobj.add_howitzer(name, rad1, rad2, rad3, color, function() {
            this._markerx = markpos.x;
            this._markery = markpos.y;
            this.moveTo(pos.x, pos.y)
                .redraw();
        });
        return obj;
    }
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectHowitzer.getLabel(), BoardObjectHowitzer);

class BoardObjectBunker extends BoardObject {
    static getLabel() {
        return "BoardObjectBunker";
    }
    static serialize(obj) {
        var buffer = new MyBuffer();
    
        buffer.writeColor(obj._color);
        buffer.writePoint(obj.position());
        return buffer.readByteArray();
    }
    static deserialize(buffer, length, name, bbobj) {
        var color = buffer.readColor(),
            pos   = buffer.readPoint();
    
        var obj = bbobj.add_bunker(name, color, function() {
            this.moveTo(pos.x, pos.y)
                .redraw();
        });
        return obj;
    }
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectBunker.getLabel(), BoardObjectBunker);

class BoardObjectBomber extends BoardObject {
    static getLabel() {
        return "BoardObjectBomber";
    }
    static serialize(obj) {
        var buffer = new MyBuffer();
    
        buffer.writeColor(obj._color);
        buffer.writePoint(obj.position());
        buffer.writeFloat32(obj.rotAngle());
        return buffer.readByteArray();
    }
    static deserialize(buffer, length, name, bbobj) {
        var color    = buffer.readColor(),
        pos      = buffer.readPoint(),
        rotAngle = buffer.readFloat32();

        var obj = bbobj.add_bomber(name, color, function() {
            this.moveTo(pos.x, pos.y)
                .rotateTo(rotAngle)
                .redraw();
        });
        return obj;
    }
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectBomber.getLabel(), BoardObjectBomber);

class BoardObjectSentry extends BoardObject {
    static getLabel() {
        return "BoardObjectSentry";
    }
    static serialize(obj) {
        var buffer = new MyBuffer();
    
        buffer.writeColor(obj._color);
        buffer.writePoint(obj.position());
        buffer.writeFloat32(obj.rotAngle());
        return buffer.readByteArray();
    }
    static deserialize(buffer, length, name, bbobj) {
        var color    = buffer.readColor(),
            pos      = buffer.readPoint(),
            rotAngle = buffer.readFloat32();
    
        var obj = bbobj.add_sentry(name, color, function() {
            this.moveTo(pos.x, pos.y)
                .rotateTo(rotAngle)
                .redraw();
        });
        return obj;
    }
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectSentry.getLabel(), BoardObjectSentry);

class BoardObjectAeroSentry extends BoardObject {
    static getLabel() {
        return "BoardObjectAeroSentry";
    }
    static serialize(obj) {
        var buffer = new MyBuffer();
    
        buffer.writeColor(obj._color);
        buffer.writePoint(obj.position());
        return buffer.readByteArray();
    }
    static deserialize(buffer, length, name, bbobj) {
        var color = buffer.readColor(),
            pos   = buffer.readPoint();
    
        var obj = bbobj.add_aerosentry(name, color, function() {
            this.moveTo(pos.x, pos.y)
                .redraw();
        });
        return obj;
    }
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectAeroSentry.getLabel(), BoardObjectAeroSentry);

class BoardObjectWaft extends BoardObject {
    static getLabel() {
        return "BoardObjectWaft";
    }
    static serialize(obj) {
        var buffer = new MyBuffer();

        buffer.writeColor(obj._color);
        buffer.writeString255(obj._file);
        buffer.writePoint(obj.position());
        buffer.writeFloat32(obj.rotAngle());
        return buffer.readByteArray();
    }
    static deserialize(buffer, length, name, bbobj) {
        var color    = buffer.readColor(),
            file     = buffer.readString255(),
            pos      = buffer.readPoint(),
            rotAngle = buffer.readFloat32();
    
        var obj = bbobj.add_waft(name, file, color, function() {
            this.moveTo(pos.x, pos.y)
                .rotateTo(rotAngle)
                .redraw();
        });
        return obj;
    }
}
BoardObjectRegistry.getInstance().addByLabel(BoardObjectWaft.getLabel(), BoardObjectWaft);


