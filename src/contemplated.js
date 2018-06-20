const { error, log } = console;

function Contemplated() {
    if (!(this instanceof Contemplated)) return new Contemplated();
}

Contemplated.prototype.run = function() {
  log('It runs!');
}

module.exports = Contemplated;

// Allow use of default import syntax in TypeScript
module.exports.defaults = Contemplated;
