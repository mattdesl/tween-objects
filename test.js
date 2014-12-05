var Tween = require('./')
var test = require('tape').test

test("tween arrays of objects", function(t) {
    t.plan(3)

    var elements = [
        { foo: 0, y: 'str', z: [50, 100] },
        { foo: 1, y: 'foo' }
    ]
    var tween = Tween(elements, { duration: 1, foo: 0.5, y: 'foo', z: [100, 0] })
    tween.on('complete', function(ev) {
        t.equal(ev.target, elements, 'complete called once')
    })
    t.equal(elements, tween.target, 'target is same as input')
    tween.tick(0.5)
    t.deepEqual(elements, [ { foo: 0.25, y: 'str', z: [ 75, 50 ] }, { foo: 0.75, y: 'foo' } ])
    
    //tick forward a bunch 
    tween.tick(1)
    tween.tick(1)
    tween.tick(1)
    tween.tick(1)
})

test("tween object", function(t) {
    t.plan(2)

    var elements = { val: 10, pos: [0, 0, 0], multi: [[25, 15]] }
    var tween = Tween(elements, { duration: 2, val: -10, pos: [10, 50, 20] })
            .on('start', function(ev) {
                t.equal(ev.target, elements, 'started')
            })
    tween.tick(1)
    t.deepEqual(elements, { multi: [ [ 25, 15 ] ], pos: [ 5, 25, 10 ], val: 0 })
})