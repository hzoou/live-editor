const OPERATOR = {
    RETAIN: "retain",
    INSERT: "insert",
    DELETE: "delete"
};

class Operation {
    constructor() {
        this.operations = [];
    }

    retain(length) {
        this.newOperation({
            operator: OPERATOR.RETAIN,
            value: length
        });
    }

    insert(value) {
        this.newOperation({
            operator: OPERATOR.INSERT,
            value: value
        });
    }

    delete(length) {
        this.newOperation({
            operator: OPERATOR.DELETE,
            value: length
        });
    }

    newOperation(op) {
        this.operations.push(op);
    }

    getOperation() {
        if (this.operations[0].operator !== OPERATOR.RETAIN) {
            this.operations.unshift({
                operator: OPERATOR.RETAIN,
                value: 0
            });
        }
        if (this.operations[this.operations.length - 1].operator !== OPERATOR.RETAIN) {
            this.newOperation({
                operator: OPERATOR.RETAIN,
                value: 0
            });
        }
        return this.operations.slice();
    }
}

module.exports = Operation;