// Test spec for microcache library
// The mocah, chai, sinon are injected as global variables. Use them without require.

describe('Microcache', function() {
    it('contains should return true', function() {
        var cache = new MicroCache();
        cache.set("user", "jeffrey")
        var result = cache.contains("user");
        result.should.equal(true);
    });
    it('get should return the value', function() {
        var cache = new MicroCache();
        cache.set("user", "jeffrey")
        var result = cache.get("user");
        result.should.equal("jeffrey");
    });
});
