// Node structure
const Node = (data, left = null, right = null) => ({
    data,
    left,
    right}
);


const buildTree = (arr) => {
    // sort the array
    let sortedArr = sort(arr);

    // Recursive function to build the tree
    const buildBST = (sortedArr) => {
        if (sortedArr.length === 0) return null;
        
        // Find the middle element
        let mid = Math.floor(sortedArr.length / 2);
        let root = Node(sortedArr[mid]);
        
        // Recursively build the left and right subtree
        root.left = buildBST(sortedArr.slice(0, mid));
        root.right = buildBST(sortedArr.slice(mid + 1));
        
        return root;
    };
    
    return buildBST(sortedArr);
}

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

// Insert function to add a new value to the BST
const insertItem = (root, value) => {
    if (root === null) {
        return Node(value);
    }

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

// Example
let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = buildTree(array);
tree = insertItem(tree, 6);
tree = deleteItem(tree, 7);
tree = insertItem(tree, 10);
tree = deleteItem(tree, 67);
tree = insertItem(tree, 67);
tree = deleteItem(tree, 1038);
prettyPrint(tree);
