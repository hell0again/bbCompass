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
export default class BbBoardSerializer {
    constructor() {
        this.map = 'dummy';
        this.buffer = new MyBuffer();
    }
    static createFromBase64(b64) {
        let bbs = new BbBoardSerializer();
        bbs.buffer.writeByteArray(MyBuffer.base64ToByteArray(b64));
        // try {
        //     bbs.map = bbs.readMap();
        // } catch(e) {
        //     console.error(e);
        //     alert("データ取り込み中にエラーが発生しました");
        //     bbs.map = 'dummy';
        // }
        return bbs;
    }
    static createFromMapAndObjects(map, objs) {
        let bbs = new BbBoardSerializer();
        bbs._writeMap(map);
        bbs._writeBoardObjects(objs);
        return bbs;
    }
    toBase64() {
        return this.buffer.toBase64();
    }

    readMap() {
        return this.map = this.buffer.readString255();
    }
    _writeMap(map) {
        this.map = map;
        this.buffer.writeString255(map);
    }
    _writeBoardObjects(objs) {
        for (let i = 0; i < objs.length; i++) {
            let obj = objs[i];
            this._writeBoardObject(obj);
        }
    }
    _writeBoardObject(obj) {
        let objType,
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
            let objBuff = new MyBuffer();
            let objName = obj._text;
            objBuff.writeInt16(objByteArray.length);
            objBuff.writeString255(objName);
            objBuff.writeInt8(objType);
            objBuff.writeByteArray(objByteArray);

            this.buffer.writeByteArray(objBuff.readByteArray());
        }
    }
    _readBoardObject(bb) {
        let buffer = this.buffer;
        let obj;
        try {
            let buffLen = buffer.readUint16();
            let objName = buffer.readString255();
            let objType = buffer.readUint8();
            let buff    = buffer.readByteArray(buffLen);
    
            let ObjClass = BoardObjectRegistry.getInstance().getByTypeCode(objType);
            obj = ObjClass.deserialize(buff, buffLen, objName, bb);
        } catch (e) {
            throw e;
        }
        return obj;
    }
    // オブジェクトを復元する
    readBoardObjects(bb) {
        let objs = new Array(),
            buffer = this.buffer;
        try {
            while (buffer._offset < buffer._buf.length) {
                let obj = this._readBoardObject(bb);
                if (obj == undefined) break; // TODO: throw事案
                objs.push(obj);
            }
            // TODO: bufferの末尾チェック
        } catch (e) {
            throw e;
            // console.error(e);
            // alert("データ取り込み中にエラーが発生しました");
        }
        return objs;
    }
}



