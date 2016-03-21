const objectCodeJson = require('../json/object-code.json');
let _instance = null;
export default class BoardObjectRegistry {
    constructor() {
        if (_instance !== null) {
            throw new Error('call #getInstance() !!');
        }
        if (_instance === null) {
            _instance = this;
        }
        return _instance;
    }
    static getInstance() {
        if (_instance === null) {
            _instance = new this.prototype.constructor();
            _instance.init();
        }
        return _instance;
    }
    // test時に呼び出して初期化
    init() {
        this._map = {};
        this.loadTypeCodeToLabelMapping();
    }
    // test時にoverrideで上書き
    loadTypeCodeToLabelMapping() {
        this._labelToTypeCode = objectCodeJson;
    }
    getTypeCodeFromLabel(label) {
        return this._labelToTypeCode[label];
    }
    addByLabel(label, obj) {
        let typeCode = this.getTypeCodeFromLabel(label);
        // TODO: should validate if interface implemented
        this._add(typeCode, obj);
    }
    getByTypeCode(typeCode) {
        return this._get(typeCode);
    }
    // static addByLabel(label, obj) {
    //     var that = BoardObjectRegistry.getInstance();
    //     var typeCode = that.getTypeCodeFromLabel(label);
    //     // TODO: should validate implemented interface
    //     that._add(typeCode, obj);
    // }
    // static getByTypeCode(typeCode) {
    //     var that = BoardObjectRegistry.getInstance();
    //     return that._get(typeCode);
    // }
    _add(key, obj) {
        this._map[key] = obj;
    }
    _get(key) {
        return this._map[key];
    }
}

