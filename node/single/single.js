/**
 * ListNode Class: Represents a single node in the linked list.
 * @param {*} val - The data value stored in the node.
 * @param {ListNode | null} next - A reference to the next node in the list.
 */
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * LinkedList Class: Manages the collection of nodes.
 */
class LinkedList {
    constructor(head = null, tail = null) {
        this.head = head;
        this.tail = tail;
    }

    /**
     * Inserts a new node at a specified position (0-indexed).
     * @param {*} val - The value of the new node.
     * @param {number} position - The 0-based index where the node should be inserted.
     * If position is out of bounds, the node is appended.
     */
    insertAt(val, position) {
        if (position < 0) {
            console.error("Position must be a non-negative integer.");
            return;
        }

        const newNode = new ListNode(val);

        // 1. Handle empty list or insertion at the head (position 0)
        if (this.head === null || position === 0) {
            newNode.next = this.head;
            this.head = newNode;

            // If the list was empty, this node is also the tail.
            if (this.tail === null) {
                this.tail = newNode;
            }
            return;
        }

        // 2. Traversal to find the preceding node
        // 'precede' is the node *before* the insertion point.
        // 'proceed' is the node *at* the insertion point (the one being skipped).

        // We start with the node at index 0 as the preceding node.
        let proceed = this.head;
        let precede = this.head.next;
        let index = 1;

        // Traverse until we reach the node *before* the insertion point (proceed)
        // or we reach the end of the list.
        while (precede !== null && index < position) {
            proceed = precede;
            precede = precede.next;
            index++;
        }

        // 3. Insert in the middle or at the end
        if (precede === null) {
            // If we reached the end, append the new node (position > list length).
            // 'proceed' is now the current tail.
            proceed.next = newNode;
            this.tail = newNode;
        } else {
            // Insertion in the middle.
            // newNode links to the node at the insertion point (precede).
            newNode.next = precede;

            // The preceding node (proceed) links to the new node.
            proceed.next = newNode;
        }
    }


    /**
     * Adds new node to the end of the list.
     * @param {*} val - The value of the new node.
     */
    append(val) {
        const newNode = new ListNode(val);
        // If there is no head, it's a new list, and this newNode become the head.
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
            return;
        }

        // This is O(1) because we jump directly to the end.
        this.tail.next = newNode;

        // 3. Update the tail to be the new node.
        this.tail = newNode;
    }

    /**
     * Prints the contents of the list in order to the console.
     */
    printList() {
        let current = this.head;
        let output = "";

        if (current === null) {
            console.log("The list is empty.");
            return;
        }

        while (current !== null) {
            output += current.val;
            if (current.next !== null) {
                output += " -> ";
            }
            current = current.next;
        }
        console.log("List contents: " + output);
    }

    /**
     * Reverses the linked list iteratively.
     * Changes the 'next' pointers of all nodes and updates the 'head'.
     * @returns {void}
     */
    reverse() {
        if (this.head === null) {
            console.log("Cannot reverse an empty list.");
            return;
        }

        // Reversing, the old head becomes the new tail, and vice versa.
        // Capture the old head to become the new tail after reversal.
        const oldHead = this.head;

        // 'prev' tracks the previous node (starts at null as the new tail).
        let prev = null;
        // 'current' tracks the node we are currently processing.
        let current = this.head;
        // 'next' temporarily stores the rest of the list before reversing the link.
        let next = null;

        while (current !== null) {
            // Store the next node before overwriting current.next
            next = current.next;
            // Reverse the link: current node's next pointer now points to the previous node
            current.next = prev;
            // Move 'prev' and 'current' one step forward
            prev = current;
            current = next;
        }
        // null the next as this becomes the new tail.
        oldHead.next = null;
        // The old head is now the tail.
        this.tail = oldHead;

        // When 'current' becomes null, 'prev' is the new head of the reversed list.
        this.head = prev;
        console.log("List successfully reversed.");
    }
}

// Export the classes for use in a Node.js package
module.exports = {
    ListNode,
    LinkedList
};

