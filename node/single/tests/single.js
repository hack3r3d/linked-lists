const assert = require('assert');
const { LinkedList, ListNode } = require('../single');

// Serialize the list contents for easy comparison
const listToString = (list) => {
    let current = list.head;
    let result = '';
    while (current !== null) {
        result += current.val;
        if (current.next !== null) {
            result += ' -> ';
        }
        current = current.next;
    }
    return result;
};

// Mock console.log to suppress output during tests, but still allow testing side effects
let consoleOutput = [];
const mockConsoleLog = (message) => {
    consoleOutput.push(message);
};

describe('LinkedList (kk-linked-lists)', () => {
    beforeEach(() => {
        // Clear any console output before each test
        consoleOutput = [];
        
        // Store original methods
        originalConsoleLog = global.console.log;
        originalConsoleError = global.console.error;
        
        // Temporarily replace console.log and console.error to capture output
        global.console.log = mockConsoleLog;
        global.console.error = mockConsoleLog; // <-- MOCKING console.error
    });

    after(() => {
        // Restore original console methods after all tests are done
        global.console.log = originalConsoleLog;
        global.console.error = originalConsoleError;
    });

    describe('ListNode', () => {
        it('should initialize with a value and null next pointer by default', () => {
            const node = new ListNode(42);
            assert.strictEqual(node.val, 42);
            assert.strictEqual(node.next, null);
        });

        it('should initialize with a value and a specified next node', () => {
            const nextNode = new ListNode(100);
            const node = new ListNode(50, nextNode);
            assert.strictEqual(node.val, 50);
            assert.strictEqual(node.next, nextNode);
        });
    });

    describe('insertAt()', () => {
        let list;

        beforeEach(() => {
            list = new LinkedList();
            list.append(10);
            list.append(20);
            list.append(30); // List: 10 -> 20 -> 30
        });

        it('should insert at the head (position 0) and update the head pointer', () => {
            list.insertAt(5, 0); // List: 5 -> 10 -> 20 -> 30
            assert.strictEqual(listToString(list), '5 -> 10 -> 20 -> 30');
            assert.strictEqual(list.head.val, 5, 'Head must be the new value.');
            assert.strictEqual(list.tail.val, 30, 'Tail must remain the old tail.');
        });

        it('should insert in the middle of the list (position 1)', () => {
            list.insertAt(15, 1); // List: 10 -> 15 -> 20 -> 30
            assert.strictEqual(listToString(list), '10 -> 15 -> 20 -> 30');
            assert.strictEqual(list.head.next.val, 15, 'Value 15 should be at position 1.');
            assert.strictEqual(list.tail.val, 30, 'Tail must remain the old tail.');
        });

        it('should insert near the end of the list (position 2)', () => {
            list.insertAt(25, 2); // List: 10 -> 20 -> 25 -> 30
            assert.strictEqual(listToString(list), '10 -> 20 -> 25 -> 30');
            assert.strictEqual(list.head.next.next.val, 25, 'Value 25 should be at position 2.');
            assert.strictEqual(list.tail.val, 30, 'Tail must remain the old tail.');
        });
        
        it('should insert at the exact end of the list (position 3) and update the tail pointer', () => {
            list.insertAt(40, 3); // List: 10 -> 20 -> 30 -> 40
            assert.strictEqual(listToString(list), '10 -> 20 -> 30 -> 40');
            assert.strictEqual(list.tail.val, 40, 'Tail must be the new value.');
            assert.strictEqual(list.tail.next, null, 'New tail.next must be null.');
        });
        
        it('should append the node if the position is out of bounds (position 10)', () => {
            list.insertAt(50, 10); // List: 10 -> 20 -> 30 -> 50
            assert.strictEqual(listToString(list), '10 -> 20 -> 30 -> 50');
            assert.strictEqual(list.tail.val, 50, 'Tail must be the new value.');
            assert.strictEqual(list.tail.next, null, 'New tail.next must be null.');
        });

        it('should handle insertion into an initially empty list (position 0)', () => {
            const emptyList = new LinkedList();
            emptyList.insertAt('Start', 0);
            assert.strictEqual(listToString(emptyList), 'Start');
            assert.strictEqual(emptyList.head.val, 'Start');
            assert.strictEqual(emptyList.tail.val, 'Start');
        });

        it('should log an error and not modify the list for a negative position', () => {
            list.insertAt('Bad', -1);
            assert.strictEqual(listToString(list), '10 -> 20 -> 30');
            assert.deepStrictEqual(consoleOutput, ['Position must be a non-negative integer.']);
        });
    });

    describe('append()', () => {
        let list;

        beforeEach(() => {
            list = new LinkedList();
        });

        it('should handle appending to an empty list (setting the head and tail)', () => {
            list.append(1);
            assert.notStrictEqual(list.head, null);
            assert.notStrictEqual(list.tail, null);
            assert.strictEqual(list.head.val, 1);
            assert.strictEqual(list.tail.val, 1);
            assert.strictEqual(list.head.next, null);
        });

        it('should correctly append multiple values and update the tail', () => {
            list.append('A');
            list.append('B');
            list.append('C');

            assert.strictEqual(listToString(list), 'A -> B -> C');
            assert.strictEqual(list.tail.val, 'C', 'Tail should point to the last appended node.');
            assert.strictEqual(list.tail.next, null, 'Tail.next should be null.');
        });
    });

    describe('printList()', () => {
        let list;

        beforeEach(() => {
            list = new LinkedList();
        });

        it('should log "The list is empty." for an empty list', () => {
            list.printList();
            assert.deepStrictEqual(consoleOutput, ['The list is empty.']);
        });

        it('should correctly log the list contents for a non-empty list', () => {
            list.append(10);
            list.append(20);
            list.append(30);
            list.printList();
            assert.deepStrictEqual(consoleOutput, ['List contents: 10 -> 20 -> 30']);
        });
    });

    describe('reverse()', () => {
        it('should correctly reverse a list with multiple elements and update head/tail', () => {
            const list = new LinkedList();
            list.append(1);
            list.append(2);
            list.append(3);
            list.append(4);
            
            const originalHeadVal = list.head.val; // 1
            const originalTailVal = list.tail.val; // 4

            list.reverse();
            
            assert.strictEqual(listToString(list), '4 -> 3 -> 2 -> 1');
            assert.strictEqual(list.head.val, originalTailVal, 'New head must be the original tail.');
            assert.strictEqual(list.tail.val, originalHeadVal, 'New tail must be the original head.');
            assert.strictEqual(list.tail.next, null, 'New tail.next must be null.');
            assert.strictEqual(consoleOutput[0], 'List successfully reversed.');
        });

        it('should correctly reverse a list with one element (no change)', () => {
            const list = new LinkedList();
            list.append(100);

            const originalHead = list.head;

            list.reverse();
            assert.strictEqual(listToString(list), '100');
            assert.strictEqual(list.head, originalHead);
            assert.strictEqual(list.tail, originalHead);
        });

        it('should do nothing and log a message for an empty list', () => {
            const list = new LinkedList();

            list.reverse();
            assert.strictEqual(list.head, null);
            assert.strictEqual(list.tail, null);
            assert.deepStrictEqual(consoleOutput, ['Cannot reverse an empty list.']);
        });

        it('should handle reversing a list with 1,000,000 nodes efficiently', () => {
            const SIZE = 1_000_000; 

            const list = new LinkedList();
            
            // Build the list - O(1)
            for (let i = 1; i <= SIZE; i++) {
                list.append(i);
            }

            // Verify initial state
            assert.strictEqual(list.head.val, 1, 'Initial head should be 1');
            assert.strictEqual(list.tail.val, SIZE, 'Initial tail should be 100,000');

            // Reverse the list (O(n) operation)
            list.reverse();

            // Verify final state
            assert.strictEqual(list.head.val, SIZE, 'New head must be 10,000');
            assert.strictEqual(list.tail.val, 1, 'New tail must be 1');
            assert.strictEqual(list.tail.next, null, 'New tail.next must be null');

            // Quick check of the first and second elements after reversal
            assert.strictEqual(list.head.val, SIZE);
            assert.strictEqual(list.head.next.val, SIZE - 1);

            // Quick check of the second-to-last and last elements
            let current = list.head;
            for (let i = 0; i < SIZE - 2; i++) {
                current = current.next;
            }
            assert.strictEqual(current.val, 2);
            assert.strictEqual(current.next.val, 1);
        });
    });
});
