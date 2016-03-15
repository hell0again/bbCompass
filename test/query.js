import query from '../src/js/query'
import test from 'ava'

/////////////////////////////////////////////////// version 0
test("v0 buildFromObject", (t) => {
    let q = query.QueryV0.buildFromObject({
        data: "testdata"
    })
    t.truthy(q.version == 0)
    t.truthy(q.data == "testdata")
})
test("v0 buildFromString", (t) => {
    let q = query.QueryV0.buildFromString("?testdata")
    t.truthy(q.version == 0)
    t.truthy(q.data == "testdata")
})
test("v0 toString", (t) => {
    let q = query.QueryV0.buildFromObject({
        data: "testdata"
    })
    t.truthy(q.toString() == "?testdata")
})
test("v0 canParse", (t) => {
    t.truthy(query.QueryV0.canParse("?Y2fDiGNIZShmw4gHw6J4woZkBm3CpsKiwpspw43CrMO/GRjDuBkyGXIZEhnDksKBw7LDukDDmTwgwr8Aw4jDlgPCknkMw6kaCUkMw7pMw7HDpsKdRSDDhcKCKMKKE8KBw4rCi8KBZClDDkMJTMKDw5rChyoA"))
})

/////////////////////////////////////////////////// version 1
test("v1 buildFromObject", (t) => {
    let q = query.QueryV1.buildFromObject({
        data: "testdata"
    })
    t.truthy(q.version == 1)
    t.truthy(q.data == "testdata")
})
test("v1 buildFromString", (t) => {
    let q = query.QueryV1.buildFromString("?v=1&d=testdata")
    t.truthy(q.version == 1)
    t.truthy(q.data == "testdata")
})
test("v1 toString", (t) => {
    let q = query.QueryV1.buildFromObject({
        data: "testdata"
    })
    t.truthy(q.toString() == "?v=1&d=testdata")
})

/////////////////////////////////////////////////// util

test("current version", (t) => {
    let Q = query.Util.getCurrent()
    t.truthy(Q.version == query.Util.currentVersion)
    t.truthy(Q.version == 1)
})
test("convertToCurrentVersion from v0", (t) => {
    let Util = query.Util
    let q = Util.parse("?testdata")
    let newQ = Util.convertToCurrentVersion(q)
    t.truthy(newQ.version == Util.currentVersion)
    t.truthy(newQ.data = "testdata")
    t.truthy(newQ.original.version == 0)
    t.truthy(newQ.original.type == "string")
    t.truthy(newQ.original.src == "?testdata")
})
test("parse v0", (t) => {
    let q = query.Util.parse("?testdata")
    t.truthy(q.version == 0)
    t.truthy(q.data == "testdata")
})
test("parse v1", (t) => {
    let q = query.Util.parse("?v=1&d=testdata")
    t.truthy(q.version == 1)
    t.truthy(q.data == "testdata")
})
test("parse none", (t) => {
    let q = query.Util.parse("")
    t.truthy(q.version == 0)
    t.truthy(q.data == "")
})
test("parse ?", (t) => {
    let q = query.Util.parse("?")
    t.truthy(q.version == 0)
    t.truthy(q.data == "")
})



