// a triply linked list
class Node {
	constructor (val, parent) {
		this.val = val;
		this.parent = parent;
		this.left = null;
		this.right = null;
	}
}

class BST {
	constructor () {
			this.rootNode = null;
	}

	search (val) {

	}

	insert (val) {
		if (this.rootNode) {
			let currentNode = this.rootNode;
			while (true) {
				if (currentNode.val > val) {
					if (!currentNode.left) {
						const node = new Node(val, currentNode);
						currentNode.left = node;
						return;
					} else {
						currentNode = currentNode.left;
					}
				} else {
					if (!currentNode.right) {
						const node = new Node(val, currentNode);
						currentNode.right = node;
						return;
					} else {
						currentNode = currentNode.right;
					}
				}
			}
		} else {
				this.rootNode = new Node(val);
		}
	}

	print () {
		const moveInner = (currentNode)  => {
			if (!currentNode) {
				return;
			}
			moveInner(currentNode.left)
			console.log(currentNode.val)
			moveInner(currentNode.right)
		}
		let currentNode = this.rootNode;
		moveInner(currentNode)
	}
	
}

const obj = new BST();

obj.insert(5)
obj.insert(4)
obj.insert(3)
obj.insert(7)
obj.insert(39)
obj.insert(42)
obj.print()



