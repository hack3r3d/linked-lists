// To use the package, assuming it is installed or linked locally:
// const { ListNode, LinkedList } = require('kk-linked-lists');
//
// Since we are running this in the same directory, we require the file directly:
const { ListNode, LinkedList } = require('./single');

console.log("--- Initializing List ---");

// 1. Create a new linked list instance
const list = new LinkedList();

list.append(10);
list.append(20);
list.append(30);
list.append(40);
list.append(50);

// 2. Print the initial list
list.printList(); // Expected: List contents: 10 -> 20 -> 30 -> 40 -> 50

// 3. Reverse the list
console.log("\n--- Reversing List ---");
list.reverse();

// 4. Print the reversed list
list.printList(); // Expected: List contents: 50 -> 40 -> 30 -> 20 -> 10

// 5. Demonstrating manual node creation (using ListNode)
const customNode = new ListNode("A");
const customList = new LinkedList(customNode, customNode);
customList.append("B");
customList.append("C");
customList.reverse();
console.log("\n--- Custom List ---");
customList.printList(); // Expected: List contents: A -> B
