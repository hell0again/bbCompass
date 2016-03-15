

/**
 * 後方互換性を保つため、クエリパラメータはクエリバージョンによってフォーマットが異なる。
 *
 * v=<version> が含まれていたら指定したバージョンとして扱う。なかったらversion0。
 */
class Util {
    static get currentVersion() {
        return 1
    }
    static get versionMapping() {
        return {
            0: QueryV0,
            1: QueryV1
        }
    }
    /**
     * クエリ文字列をパースしてクエリオブジェクトを返す。
     * バージョンはクエリ文字列から判断。
     */
    static parse(str) {
        let version
        if (true == QueryV0.canParse(str)) {
            version = 0
        } else {
            let kv = QueryV1.splitQuery(str)
            if (kv.hasOwnProperty("v")) {
                version = kv["v"]
            } else {
                throw new Error("invalid query")
            }
        }
        let versionMapping = Util.versionMapping
        if (false == versionMapping.hasOwnProperty(version)) {
            throw new Error("invalid query")
        }
        let Q = versionMapping[version]
        return Q.buildFromString(str)
    }
    static getCurrent() {
        return Util.versionMapping[Util.currentVersion]
    }
    /**
     * 最新バージョンに変換する
     */
    static convertToCurrentVersion(query) {
        while (true == query.canConvertToNextFormat()) {
            query = query.convertToNextFormat()
        }
        if (Util.currentVersion != query.version) {
            throw new Error("wrong query version")
        }
        return query
    }
}

/**
 * もっとも古いフォーマット。?の後に直接base64化したdataがくっつく。
 * ?<data>
 */
class QueryV0 {
    constructor() {
        this.version = 0
        return this
    }
    static get version() {
        return 0
    }
    // must have only "base64url" encoding
    static canParse(q) {
        return (q == "" || /^\?[a-zA-Z0-9/\%\-_]*$/.test(q));
        // return (q.match(/^\?[a-zA-Z0-9\=\+\/]+$/));
        // return /^\?[a-zA-Z0-9\%\-_]*$/.test(q);
    }
    static buildFromString(str) {
        let q = new QueryV0()
        q.original = {
            version: 0,
            type: "string",
            src: str,
        }
        q.data = str.substr(1)
        return q
    }
    static buildFromObject(obj) {
        let q = new QueryV0()
        if (obj.hasOwnProperty("original")) {
            q.original = obj.original
        } else {
            q.original = {
                version: 0,
                type: "object",
                src: obj,
            }
        }
        q.data = obj.data
        return q
    }
    toString() {
        let str = "?"
        str += this.data
        return str
    }
    canConvertToNextFormat() {return true}
    convertToNextFormat() {
        return QueryV1.buildFromObject(this)
    }
}
// ?key=value&.. の形式になった。
class QueryV1 {
    constructor() {
        this.version = 1
        return this
    }
    static get version() {
        return 1
    }
    get data() {
        return this._data || ""
    }
    set data(x) {
        this._data = x
    }
    get debug() {
        return this._debug || false
    }
    set debug(x) {
        this._debug =
            (x == "1")? true:
            (x == "0")? false:
            (x == "true")? true:
            (x == "false")? false:
            false;
    }
    static buildFromString(str) {
        let q = new QueryV1()
        q.original = {
            version: 1,
            type: "string",
            src: str,
        }
        let kv = QueryV1.splitQuery(str)
        q.data    = kv["d"]
        q.debug   = kv["debug"]
        // q.version = kv["v"]
        return q
    }
    static buildFromObject(obj) {
        let q = new QueryV1()
        if (obj.hasOwnProperty("original")) {
            q.original = obj.original
        } else {
            q.original = {
                version: 1,
                type: "object",
                src: obj,
            }
        }
        q.data    = obj.data
        q.debug   = obj.debug
        // q.version = obj.version
        return q
    }
    toString() {
        let str = "?"
        str += "v=" + this.version + "&"
        str += "d=" + this.data
        return str
    }
    canConvertToNextFormat() {return false}
    convertToNextFormat() {}
    static splitQuery (str) {
        if (false == str.match(/^\?/)) {
            throw new Error("invalid query")
        }
        str = str.substr(1)
        let qs = str.split("&")
        let o = {}
        for (let i=0; i<qs.length; i++) {
            let kv = qs[i].split("=")
            if (kv.length == 2) {
                o[kv[0]] = kv[1]
            } else {
                throw new Error("invalid query")
            }
        }
        return o
    }
}
export default {
    Util: Util,
    QueryV0: QueryV0,
    QueryV1: QueryV1,
}

