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


let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = buildTree(array);
prettyPrint(tree);