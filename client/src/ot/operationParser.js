const diff = require('diff');
const Operation = require('./operation');

function operationParser(oldStr, newStr) {
    const diffs = diff.diffChars(oldStr, newStr);
    const op = new Operation();

    diffs.forEach(({ count, added, removed, value }) => {
        if (!added && !removed) op.retain(count);
        else if (added) op.insert(value);
        else if (removed) op.delete(count);
    });

    return op.getOperation();
}

module.exports = operationParser;
