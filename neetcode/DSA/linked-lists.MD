# Time complexity of singly linked list operations

- Access/Search O(n) Requires traversing the list from the head to find the specific element, as there is no random access like in arrays.
  <br>
- Insertion at Beginning O(1) Only involves updating the head pointer and the new node's pointer, a constant number of operations.
  <br>
- Insertion at End O(n) Requires traversing the entire list to find the last node before appending the new node (unless a separate tail pointer is maintained).
  <br>
- Insertion at Specific Position O(n) Requires traversing the list to the node immediately before the desired position.
  <br>
- Deletion at Beginning O(1) Involves updating the head pointer to the second node, a constant-time operation.
  <br>
- Deletion at End O(n) Requires traversing to the second-to-last node to update its pointer to null.
  <br>
- Deletion at Specific Position O(n) Requires traversing to the node immediately before the one to be deleted to update pointers.
  <br>
- Traversal (Display) O(n) Involves visiting each of the n nodes once from head to tail.

# Time complexity of doubly linked list operations

- Access by Index O(n)
  <br>
- Search by Value O(n)
  <br>
- Insertion at Beginning O(1)
  <br>
- Insertion at End O(1) (if a tail pointer is maintained)
  <br>
- Insertion at Specific Position O(n) (requires traversal to the position)
  <br>
- Deletion at Beginning O(1)
  <br>
- Deletion at End O(1) (if a tail pointer is maintained)
  <br>
- Deletion at Specific Position O(n) (requires traversal to the position)
  <br>
- Traversal O(n)
