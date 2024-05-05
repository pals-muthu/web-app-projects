
class Stack {
    arr = [];
    constructor() {
        console.log('calling constructor');
        this.arr = [];
    }

    isEmpty () {
        if (this.arr.length) {
            return false;
        }
        return true;
    }

    top () {
        return this.arr.slice(-1);
    }

    push (val) {
        this.arr.push(val);
    }

    pop () {
        this.arr = this.arr.slice(0, -1)
    }
}

const obj = new Stack();
console.log('1: ', obj.isEmpty());
obj.push('x');
obj.push('y');
console.log('2: ', obj.top());
console.log('3: ', obj.pop());
console.log('2: ', obj.top());
console.log('4: ', obj.isEmpty());
