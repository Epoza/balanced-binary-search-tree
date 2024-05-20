// Node structure
const Node = (data, left = null, right = null) => ({
    data,
    left,
    right}
);


const BinarySearchTree = (arr) => {
    // Sort and remove duplicates in the given array
    const sort = (arr) => {
        let n = arr.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
                if (arr[i] > arr[i + 1]) {
                    // Swap the elements
                    let temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
    
                    swapped = true;
                } else if (arr[i] === arr[i + 1]) {
                    // Remove duplicates
                    arr.splice(i + 1, 1);
                    n--;
                    i--;
                }
            }
            n--; // Reduce the range of the array to check
        } while (swapped);
        return arr;
    };

    // Recursive function to build the tree
    const buildTree = (sortedArr = sort(arr)) => {
        if (sortedArr.length === 0) return null;
        
        // Find the middle element
        let mid = Math.floor(sortedArr.length / 2);
        let root = Node(sortedArr[mid]);
        
        // Recursively build the left and right subtree
        root.left = buildTree(sortedArr.slice(0, mid));
        root.right = buildTree(sortedArr.slice(mid + 1));
        
        return root;
    };

    const sortedArr = sort(arr);
    let root = buildTree(sortedArr);

    // Insert function to add a new value to the BST
    const insertItem = (root, value) => {
        if (root === null) return Node(value);

        if (value < root.data) {
            root.left = insertItem(root.left, value);
        } else if (value > root.data) {
            root.right = insertItem(root.right, value);
        }
        return root;
    };

    const deleteItem = (root, value) => {
        // Base case: If the tree is empty
        if (root === null) {
            return root;
        }
        
        // check if value is in the tree
        if (value < root.data){
            root.left = deleteItem(root.left, value);
        } else if (value > root.data){
            root.right = deleteItem(root.right, value);
        } else {
            // node with one or no child
            if (root.left === null){
                return root.right;
            } else if (root.right === null){
                return root.left;
            }
    
            // node with two children, get the smallest value on right subtree
            root.data = minValue(root.right);
            root.right = deleteItem(root.right, root.data);
        }
        return root
    }

    // Helper function to find the smallest value in a subtree
    const minValue = (node) => {
        let current = node;
        // Loop down to find the leftmost leaf
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    };

    const find = (root, value) => {
        // Base case: If the tree is empty or value is found
        if (root === null || root.data === value) {
            return root;
        }
        // check if value is larger or smaller than root.data
        if(value < root.data){
            return find(root.left, value);
        } else {
            return find(root.right, value);
        }
    };
    
    // Function that traverses down each level from left to right
    const levelOrder = (root, callback = null) => {
        if (root === null) {
            return;
        }
    
        let queue = [root]; // Initialize the queue with the root node
        let order = []; // Store the order
    
        while (queue.length > 0) {
            let node = queue.shift(); // Dequeue the front node
            
            if (callback) {
                callback(node.data);
            } else {
                order.push(node.data)
            }
    
            // Enqueue left child
            if (node.left !== null) {
                queue.push(node.left);
            }
    
            // Enqueue right child
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
        // Print the order as an array
        if(!callback){
            return order;
        }
    };
    
    // Function that gets the nodes in order from least to greatest
    const inOrder = (root, callback = null) => {
        let order = []; // Store the correct order
    
        const traverse = (node) => {
            // Recursively go through each node until finished
            if (node !== null) {
                traverse(node.left); // Start at the bottom left node first
                if (callback) {
                    callback(node.data);
                } else {
                    order.push(node.data);
                }
                traverse(node.right);
            }
        };
        // Call the inner function
        traverse(root)
        // completed array
        return order;
    }
    
    // Function that goes through the left side and then the right side
    const preOrder = (root, callback = null) => {
        let order = []; // Store the correct order
    
        const traverse = (node) => {
            // Recursively go through each node until finished
            if (node !== null) {
                if (callback) {
                    callback(node.data);
                } else {
                    order.push(node.data);
                }
                traverse(node.left); // Get the left side first
                traverse(node.right);
            }
        };
        // Call the inner function
        traverse(root)
        // completed array
        return order;
    }
    
    // Function that goes from left subtree, right subtree, then root
    const postOrder = (root, callback = null) => {
        let order = []; // Store the correct order
    
        const traverse = (node) => {
            // Recursively go through each node until finished
            if (node !== null) {
                traverse(node.left); // Get the left side first
                traverse(node.right);
                if (callback) {
                    callback(node.data);
                } else {
                    order.push(node.data);
                }
            }
        };
        // Call the inner function
        traverse(root)
        // completed array
        return order;
    }
    
    const height = (root, value = null) => {
        let node = root;
        if (value !== null) {
            node = find(root, value);
        } 
    
        const heightOfNode = (node) => {
            if(node === null) return -1; // Since we add 1 this will become 0 for leaf nodes
            // Recursively find the height of each subtree
            const leftHeight = heightOfNode(node.left);
            const rightHeight = heightOfNode(node.right);
            
            // Find if right or left subtree is larger and add 1
            const max = leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
        
            return max;
        }
        return heightOfNode(node);
    }
    
    const depth = (root, value = root ? root.data : null) => {
        // Go from root through each node until specified value is found
        const findDepth = (node, value, currentDepth) => {
            if (node === null) return -1; // Value not found in the tree
            if (node.data === value) return currentDepth; // Count from root to the node value
            if (value < node.data) {
                return findDepth(node.left, value, currentDepth + 1);
            } else {
                return findDepth(node.right, value, currentDepth + 1);
            }
        };
        return findDepth(root, value, 0);
    };
    
    const isBalanced = (root) => {
        const checkBalance = (node) => {
            if (node === null) {
                return true;
            }
    
            const leftHeight = height(root, node.left);
            const rightHeight = height(root, node.right);
    
            if (leftHeight - rightHeight > 1) { // difference in height > 1
                return false;
            }
    
            return checkBalance(node.left) && checkBalance(node.right);
        };
    
        return checkBalance(root);
    };

    const rebalance = () => {
        // Perform in-order traversal to get the sorted array
        const sortedArray = inOrder(root);
        // Update the root variable && rebuild the balanced tree using the sorted array
        root = buildTree(sortedArray);
        return root;
    };
    
    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    return {
        root,
        insert: (value) => { root = insertItem(root, value); },
        delete: (value) => { root = deleteItem(root, value); },
        find: (value) => find(root, value),
        levelOrder: (callback = null) => levelOrder(root, callback),
        inOrder: (callback = null) => inOrder(root, callback),
        preOrder: (callback = null) => preOrder(root, callback),
        postOrder: (callback = null) => postOrder(root, callback),
        height: (value = null) => value === null ? height(root) : height(find(root, value)),
        depth: (value) => depth(root, value),
        isBalanced: () => isBalanced(root),
        rebalance: () => rebalance(),
        prettyPrint: () => prettyPrint(root)
    };
}




// Example usage
let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = BinarySearchTree(array);
tree.prettyPrint();
console.log("Is the tree balanced?", tree.isBalanced());

console.log("In-order traversal with callback:");
tree.inOrder((data) => {
    console.log(`Node value: ${data}`);
});
console.log("Pre-order traversal:", tree.preOrder());
console.log("Post-order traversal:", tree.postOrder());
console.log("Level-order traversal:", tree.levelOrder());

console.log("Height of the tree:", tree.height());
console.log("Depth of node 23:", tree.depth(23));
tree.insert(100);
tree.delete(8);
tree.delete(67);
tree.insert(2);
tree.insert(67);
console.log("Is the tree balanced?", tree.isBalanced())
tree.prettyPrint();
tree.rebalance();
console.log("Is the tree balanced?", tree.isBalanced())
tree.prettyPrint();