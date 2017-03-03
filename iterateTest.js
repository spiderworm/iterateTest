
var config = {
    echo: function(name, values) {}
};

function iterateTest(vals, test) {
    var funcs = [test];

    function tests() {
        var args = [].concat(arguments);
        var target = this;
        funcs.forEach(function(func) {
            Object.keys(vals).forEach(function(valSetName) {
                var valSet = vals[valSetName];
                if (typeof valSet === 'function') {
                    valSet = valSet();
                }
                if (typeof config.echo === 'function') {
                    config.echo(valSet, valSetName);
                }
                var thisArgs = [valSet, valSetName].concat(args);
                func.call(target, thisArgs);
            });
        });
    }

    return tests;
}

function updateConfig(update) {
    Object.assign(config, update);
}

iterateTest.config = updateConfig;

module.exports = iterateTest;
