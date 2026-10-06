// DSA Quest OS — quest data. The generator (scripts/generate.mjs) emits
// quests/ and php/ from this file. Add a problem here, re-run generate.
export const patterns = [
  {
    id: 'arrays-two-pointers',
    name: 'Arrays & Two Pointers',
    summary: 'Scan a linear structure with two indices instead of nested loops. O(n²) → O(n) on sorted input.',
    triggers: ['sorted array + pair/triplet search', 'in-place reordering', 'max area / container optimisation'],
    php: 'plain arrays; two-index loops',
    problems: [
      {
        id: 'two-sum', title: 'Two Sum', leetcode: 1, slug: 'two-sum', difficulty: 'easy', kind: 'fn', fn: 'twoSum',
        description: 'Return the indices of the two numbers that add up to target.',
        tests: [
          { args: [[[2, 7, 11, 15], 9]], expected: [0, 1] },
          { args: [[[3, 2, 4], 6]], expected: [1, 2] },
          { args: [[[3, 3], 6]], expected: [0, 1] },
        ],
      },
      {
        id: 'three-sum', title: '3Sum', leetcode: 15, slug: '3sum', difficulty: 'medium', kind: 'fn', fn: 'threeSum', unordered: 'deep',
        description: 'Return all unique triplets that sum to 0. Each triplet sorted; no duplicate triplets.',
        tests: [
          { args: [[[-1, 0, 1, 2, -1, -4]]], expected: [[-1, -1, 2], [-1, 0, 1]] },
          { args: [[[0, 1, 1]]], expected: [] },
          { args: [[[0, 0, 0]]], expected: [[0, 0, 0]] },
        ],
      },
      {
        id: 'container-most-water', title: 'Container With Most Water', leetcode: 11, slug: 'container-with-most-water', difficulty: 'medium', kind: 'fn', fn: 'maxArea',
        description: 'Return the maximum water a container formed by two lines can hold.',
        tests: [
          { args: [[[1, 8, 6, 2, 5, 4, 8, 3, 7]]], expected: 49 },
          { args: [[[1, 1]]], expected: 1 },
          { args: [[[4, 3, 2, 1, 4]]], expected: 16 },
        ],
      },
    ],
  },
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    summary: 'A contiguous subarray window that expands/contracts in O(n). Replaces nested subarray loops.',
    triggers: ['contiguous subarray', 'longest/shortest substring with a property', 'fixed-size window aggregates'],
    php: 'SplDoublyLinkedList as the window',
    problems: [
      {
        id: 'longest-substring', title: 'Longest Substring Without Repeating Characters', leetcode: 3, slug: 'longest-substring-without-repeating-characters', difficulty: 'medium', kind: 'fn', fn: 'lengthOfLongestSubstring',
        description: 'Return the length of the longest substring without repeating characters.',
        tests: [
          { args: [['abcabcbb']], expected: 3 },
          { args: [['bbbbb']], expected: 1 },
          { args: [['pwwkew']], expected: 3 },
        ],
      },
      {
        id: 'max-sum-subarray-k', title: 'Maximum Sum Subarray of Size K', leetcode: null, slug: null, difficulty: 'easy', kind: 'fn', fn: 'maxSumSubarray', source: 'NeetCode',
        description: 'Return the maximum sum of any contiguous subarray of size k.',
        tests: [
          { args: [[[2, 1, 5, 1, 3, 2], 3]], expected: 9 },
          { args: [[[2, 3, 4, 1, 5], 2]], expected: 7 },
          { args: [[[1, 1, 1, 1], 4]], expected: 4 },
        ],
      },
      {
        id: 'min-window-substring', title: 'Minimum Window Substring', leetcode: 76, slug: 'minimum-window-substring', difficulty: 'hard', kind: 'fn', fn: 'minWindow',
        description: 'Return the smallest substring of s containing all characters of t (including duplicates). "" if none.',
        tests: [
          { args: [['ADOBECODEBANC', 'ABC']], expected: 'BANC' },
          { args: [['a', 'a']], expected: 'a' },
          { args: [['a', 'aa']], expected: '' },
        ],
      },
    ],
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    summary: 'Halve the search space each step. Works on sorted data and on monotonic answer spaces.',
    triggers: ['sorted array + lookup', 'minimise maximum / maximise minimum', 'answer space is monotonic'],
    php: '—',
    problems: [
      {
        id: 'binary-search', title: 'Binary Search', leetcode: 704, slug: 'binary-search', difficulty: 'easy', kind: 'fn', fn: 'search',
        description: 'Return the index of target in a sorted array, or -1.',
        tests: [
          { args: [[[-1, 0, 3, 5, 9, 12], 9]], expected: 4 },
          { args: [[[-1, 0, 3, 5, 9, 12], 2]], expected: -1 },
          { args: [[[5], 5]], expected: 0 },
        ],
      },
      {
        id: 'search-rotated', title: 'Search in Rotated Sorted Array', leetcode: 33, slug: 'search-in-rotated-sorted-array', difficulty: 'medium', kind: 'fn', fn: 'search',
        description: 'Return the index of target in a rotated sorted array with distinct values, or -1.',
        tests: [
          { args: [[[4, 5, 6, 7, 0, 1, 2], 0]], expected: 4 },
          { args: [[[4, 5, 6, 7, 0, 1, 2], 3]], expected: -1 },
          { args: [[[1], 0]], expected: -1 },
        ],
      },
      {
        id: 'koko-bananas', title: 'Koko Eating Bananas', leetcode: 875, slug: 'koko-eating-bananas', difficulty: 'medium', kind: 'fn', fn: 'minEatingSpeed',
        description: 'Return the minimum integer eating speed to finish all piles within h hours.',
        tests: [
          { args: [[[3, 6, 7, 11], 8]], expected: 4 },
          { args: [[[30, 11, 23, 4, 20], 5]], expected: 30 },
          { args: [[[30, 11, 23, 4, 20], 6]], expected: 23 },
        ],
      },
    ],
  },
  {
    id: 'stack',
    name: 'Stack',
    summary: 'LIFO for nesting, matching, and "next greater" problems. O(1) push/pop with monotone variants.',
    triggers: ['bracket/parenthesis matching', 'nested structure', 'next greater/smaller element', 'undo history'],
    php: 'SplStack',
    problems: [
      {
        id: 'valid-parentheses', title: 'Valid Parentheses', leetcode: 20, slug: 'valid-parentheses', difficulty: 'easy', kind: 'fn', fn: 'isValid',
        description: 'Return true if every bracket is closed in the correct order.',
        tests: [
          { args: [['()']], expected: true },
          { args: [['()[]{}']], expected: true },
          { args: [['(]']], expected: false },
        ],
      },
      {
        id: 'min-stack', title: 'Min Stack', leetcode: 155, slug: 'min-stack', difficulty: 'medium', kind: 'class', cls: 'MinStack',
        description: 'Design a stack with push, pop, top, and getMin — all O(1).',
        ops: ['MinStack', 'push', 'push', 'push', 'getMin', 'pop', 'top', 'getMin'],
        args: [[], [-2], [0], [-3], [], [], [], []],
        expected: [null, null, null, null, -3, null, 0, -2],
      },
      {
        id: 'next-greater-element', title: 'Next Greater Element I', leetcode: 496, slug: 'next-greater-element-i', difficulty: 'easy', kind: 'fn', fn: 'nextGreaterElement',
        description: 'For each element of nums1, return the first greater element to its right in nums2, else -1.',
        tests: [
          { args: [[[4, 1, 2], [1, 3, 4, 2]]], expected: [-1, 3, -1] },
          { args: [[[2, 4], [1, 2, 3, 4]]], expected: [3, -1] },
          { args: [[[1], [1, 2, 3]]], expected: [2] },
        ],
      },
    ],
  },
  {
    id: 'queue-deque',
    name: 'Queue & Deque',
    summary: 'FIFO for BFS and scheduling; deque for sliding-window maxima and double-ended scans.',
    triggers: ['level-order processing', 'task scheduling with cooldown', 'sliding max/min', 'first-in-first-out'],
    php: 'SplQueue, SplDoublyLinkedList',
    problems: [
      {
        id: 'implement-queue-stacks', title: 'Implement Queue using Stacks', leetcode: 232, slug: 'implement-queue-using-stacks', difficulty: 'easy', kind: 'class', cls: 'MyQueue',
        description: 'Implement a queue (push, pop, peek, empty) using only two stacks.',
        ops: ['MyQueue', 'push', 'push', 'peek', 'pop', 'empty'],
        args: [[], [1], [2], [], [], []],
        expected: [null, null, null, 1, 1, false],
      },
      {
        id: 'sliding-window-maximum', title: 'Sliding Window Maximum', leetcode: 239, slug: 'sliding-window-maximum', difficulty: 'hard', kind: 'fn', fn: 'maxSlidingWindow',
        description: 'Return the max of every contiguous subarray of size k. O(n) expected (deque).',
        tests: [
          { args: [[[1, 3, -1, -3, 5, 3, 6, 7], 3]], expected: [3, 3, 5, 5, 6, 7] },
          { args: [[[1], 1]], expected: [1] },
          { args: [[[1, -1], 1]], expected: [1, -1] },
        ],
      },
      {
        id: 'task-scheduler', title: 'Task Scheduler', leetcode: 621, slug: 'task-scheduler', difficulty: 'medium', kind: 'fn', fn: 'leastInterval',
        description: 'Return the fewest intervals to finish all tasks with cooldown n between same tasks.',
        tests: [
          { args: [[['A', 'A', 'A', 'B', 'B', 'B'], 2]], expected: 8 },
          { args: [[['A', 'C', 'A', 'B', 'D', 'B'], 1]], expected: 6 },
          { args: [[['A', 'A', 'A', 'B', 'B', 'B'], 3]], expected: 10 },
        ],
      },
    ],
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    summary: 'Pointer manipulation: reverse, merge, detect cycles. Fast/slow pointers find middles and cycles.',
    triggers: ['reversal', 'merge sorted sequences', 'cycle detection', 'middle node'],
    php: 'SplDoublyLinkedList',
    problems: [
      {
        id: 'reverse-linked-list', title: 'Reverse Linked List', leetcode: 206, slug: 'reverse-linked-list', difficulty: 'easy', kind: 'll', fn: 'reverseList',
        description: 'Reverse a singly-linked list and return the new head. Input/output as arrays.',
        tests: [
          { args: [[[1, 2, 3, 4, 5]]], expected: [5, 4, 3, 2, 1] },
          { args: [[[1, 2]]], expected: [2, 1] },
          { args: [[]], expected: [] },
        ],
      },
      {
        id: 'merge-two-lists', title: 'Merge Two Sorted Lists', leetcode: 21, slug: 'merge-two-sorted-lists', difficulty: 'easy', kind: 'll', fn: 'mergeTwoLists',
        description: 'Merge two sorted lists into one sorted list. Input/output as arrays.',
        tests: [
          { args: [[[1, 2, 4], [1, 3, 4]]], expected: [1, 1, 2, 3, 4, 4] },
          { args: [[[], []]], expected: [] },
          { args: [[[], [0]]], expected: [0] },
        ],
      },
      {
        id: 'linked-list-cycle', title: 'Linked List Cycle', leetcode: 141, slug: 'linked-list-cycle', difficulty: 'easy', kind: 'cycle', fn: 'hasCycle',
        description: 'Return true if the list has a cycle. Input: {list: [...], pos: index tail connects to, -1 = none}.',
        tests: [
          { args: [{ list: [3, 2, 0, -4], pos: 1 }], expected: true },
          { args: [{ list: [1, 2], pos: 0 }], expected: true },
          { args: [{ list: [1], pos: -1 }], expected: false },
        ],
      },
    ],
  },
  {
    id: 'trees-bfs',
    name: 'Trees & BFS',
    summary: 'Level-order via queue; BST invariants via bounds. Recursion with returned state beats globals.',
    triggers: ['level-order output', 'BST validation', 'ancestor queries', 'shortest path in a tree'],
    php: 'PHP classes + SplQueue for BFS',
    problems: [
      {
        id: 'level-order', title: 'Binary Tree Level Order Traversal', leetcode: 102, slug: 'binary-tree-level-order-traversal', difficulty: 'medium', kind: 'tree', fn: 'levelOrder', treeArgs: [0],
        description: 'Return level-by-level node values. Input tree as level-order array with nulls.',
        tests: [
          { args: [[[3, 9, 20, null, null, 15, 7]]], expected: [[3], [9, 20], [15, 7]] },
          { args: [[[1]]], expected: [[1]] },
          { args: [[]], expected: [] },
        ],
      },
      {
        id: 'validate-bst', title: 'Validate Binary Search Tree', leetcode: 98, slug: 'validate-binary-search-tree', difficulty: 'medium', kind: 'tree', fn: 'isValidBST', treeArgs: [0],
        description: 'Return true if the tree is a valid BST (left < node < right, strictly).',
        tests: [
          { args: [[[2, 1, 3]]], expected: true },
          { args: [[[5, 1, 4, null, null, 3, 6]]], expected: false },
          { args: [[[1, 1]]], expected: false },
        ],
      },
      {
        id: 'lca-bst', title: 'Lowest Common Ancestor of a BST', leetcode: 235, slug: 'lowest-common-ancestor-of-a-binary-search-tree', difficulty: 'medium', kind: 'tree', fn: 'lowestCommonAncestor', treeArgs: [0], expectedIsValue: true,
        description: 'Return the value of the lowest common ancestor of nodes p and q in a BST.',
        tests: [
          { args: [[[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 8]], expected: 6 },
          { args: [[[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 4]], expected: 2 },
          { args: [[[2, 1], 2, 1]], expected: 2 },
        ],
      },
    ],
  },
  {
    id: 'dfs-backtracking',
    name: 'DFS & Backtracking',
    summary: 'Explore choices recursively; undo on the way back. Subsets/permutations are the canonical forms.',
    triggers: ['all combinations/permutations/subsets', 'path existence', 'exhaustive search with pruning'],
    php: 'recursion; no SPL needed',
    problems: [
      {
        id: 'subsets', title: 'Subsets', leetcode: 78, slug: 'subsets', difficulty: 'medium', kind: 'fn', fn: 'subsets', unordered: 'deep',
        description: 'Return all possible subsets (the power set). No duplicates.',
        tests: [
          { args: [[[1, 2, 3]]], expected: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]] },
          { args: [[[0]]], expected: [[], [0]] },
        ],
      },
      {
        id: 'permutations', title: 'Permutations', leetcode: 46, slug: 'permutations', difficulty: 'medium', kind: 'fn', fn: 'permute', unordered: 'deep',
        description: 'Return all possible permutations of distinct integers.',
        tests: [
          { args: [[[1, 2, 3]]], expected: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] },
          { args: [[[0, 1]]], expected: [[0, 1], [1, 0]] },
          { args: [[[1]]], expected: [[1]] },
        ],
      },
      {
        id: 'word-search', title: 'Word Search', leetcode: 79, slug: 'word-search', difficulty: 'medium', kind: 'fn', fn: 'exist',
        description: 'Return true if the word exists in the grid by adjacent (non-repeating) cells.',
        tests: [
          { args: [[['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']].map(r => r.slice()), 'ABCCED'], expected: true },
          { args: [[['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']].map(r => r.slice()), 'SEE'], expected: true },
          { args: [[['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']].map(r => r.slice()), 'ABCB'], expected: false },
        ],
      },
    ],
  },
  {
    id: 'heap',
    name: 'Heap / Priority Queue',
    summary: 'O(log n) insert/extract for top-K and k-way merge problems. Min-heap by default.',
    triggers: ['top k', 'kth largest/smallest', 'merge k sorted streams', 'running median'],
    php: 'SplHeap / SplPriorityQueue',
    problems: [
      {
        id: 'top-k-frequent', title: 'Top K Frequent Elements', leetcode: 347, slug: 'top-k-frequent-elements', difficulty: 'medium', kind: 'fn', fn: 'topKFrequent', unordered: 'flat',
        description: 'Return the k most frequent elements. Any order.',
        tests: [
          { args: [[[1, 1, 1, 2, 2, 3], 2]], expected: [1, 2] },
          { args: [[[1], 1]], expected: [1] },
          { args: [[[4, 4, 4, 1, 1, 2, 2, 2, 3], 2]], expected: [4, 2] },
        ],
      },
      {
        id: 'kth-largest', title: 'Kth Largest Element in an Array', leetcode: 215, slug: 'kth-largest-element-in-an-array', difficulty: 'medium', kind: 'fn', fn: 'findKthLargest',
        description: 'Return the kth largest element (sorted order, not distinct).',
        tests: [
          { args: [[[3, 2, 1, 5, 6, 4], 2]], expected: 5 },
          { args: [[[3, 2, 3, 1, 2, 4, 5, 5, 6], 4]], expected: 4 },
          { args: [[[1], 1]], expected: 1 },
        ],
      },
      {
        id: 'merge-k-lists', title: 'Merge K Sorted Lists', leetcode: 23, slug: 'merge-k-sorted-lists', difficulty: 'hard', kind: 'll', fn: 'mergeKLists', multiList: true,
        description: 'Merge k sorted lists into one sorted list. Input: array of arrays; output: array.',
        tests: [
          { args: [[[[1, 4, 5], [1, 3, 4], [2, 6]]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] },
          { args: [[]], expected: [] },
          { args: [[[]]], expected: [] },
        ],
      },
    ],
  },
  {
    id: 'intervals',
    name: 'Intervals',
    summary: 'Sort by start, then merge or sweep. Overlap logic lives in the sort order.',
    triggers: ['meeting rooms', 'merge ranges', 'non-overlapping removals', 'timeline sweeps'],
    php: '—',
    problems: [
      {
        id: 'merge-intervals', title: 'Merge Intervals', leetcode: 56, slug: 'merge-intervals', difficulty: 'medium', kind: 'fn', fn: 'merge', comparator: 'intervals',
        description: 'Merge all overlapping intervals. Output sorted by start.',
        tests: [
          { args: [[[[1, 3], [2, 6], [8, 10], [15, 18]]]], expected: [[1, 6], [8, 10], [15, 18]] },
          { args: [[[[1, 4], [4, 5]]]], expected: [[1, 5]] },
          { args: [[[[1, 4], [0, 4]]]], expected: [[0, 4]] },
        ],
      },
      {
        id: 'non-overlapping', title: 'Non-overlapping Intervals', leetcode: 435, slug: 'non-overlapping-intervals', difficulty: 'medium', kind: 'fn', fn: 'eraseOverlapIntervals',
        description: 'Return the minimum number of intervals to remove to make the rest non-overlapping.',
        tests: [
          { args: [[[[1, 2], [2, 3], [3, 4], [1, 3]]]], expected: 1 },
          { args: [[[[1, 2], [1, 2], [1, 2]]]], expected: 2 },
          { args: [[[[1, 2], [2, 3]]]], expected: 0 },
        ],
      },
      {
        id: 'meeting-rooms-ii', title: 'Meeting Rooms II', leetcode: 253, slug: 'meeting-rooms-ii', difficulty: 'medium', kind: 'fn', fn: 'minMeetingRooms',
        description: 'Return the minimum number of conference rooms required.',
        tests: [
          { args: [[[[0, 30], [5, 10], [15, 20]]]], expected: 2 },
          { args: [[[[7, 10], [2, 4]]]], expected: 1 },
          { args: [[[[1, 5], [8, 9], [8, 9]]]], expected: 2 },
        ],
      },
    ],
  },
  {
    id: 'dp',
    name: 'Dynamic Programming',
    summary: 'Optimal substructure + overlapping subproblems. Define state, recurrence, base; bottom-up beats recursion.',
    triggers: ['counting ways', 'optimisation with choices', 'knapsack-like', 'Fibonacci-like recurrence'],
    php: '—',
    problems: [
      {
        id: 'climbing-stairs', title: 'Climbing Stairs', leetcode: 70, slug: 'climbing-stairs', difficulty: 'easy', kind: 'fn', fn: 'climbStairs',
        description: 'Return the number of distinct ways to climb n stairs taking 1 or 2 steps.',
        tests: [
          { args: [[2]], expected: 2 },
          { args: [[3]], expected: 3 },
          { args: [[10]], expected: 89 },
        ],
      },
      {
        id: 'house-robber', title: 'House Robber', leetcode: 198, slug: 'house-robber', difficulty: 'medium', kind: 'fn', fn: 'rob',
        description: 'Return the maximum loot without robbing two adjacent houses.',
        tests: [
          { args: [[[1, 2, 3, 1]]], expected: 4 },
          { args: [[[2, 7, 9, 3, 1]]], expected: 12 },
          { args: [[[2, 1, 1, 2]]], expected: 4 },
        ],
      },
      {
        id: 'coin-change', title: 'Coin Change', leetcode: 322, slug: 'coin-change', difficulty: 'medium', kind: 'fn', fn: 'coinChange',
        description: 'Return the fewest coins that make up amount, or -1.',
        tests: [
          { args: [[[1, 2, 5], 11]], expected: 3 },
          { args: [[[2], 3]], expected: -1 },
          { args: [[[1], 0]], expected: 0 },
        ],
      },
    ],
  },
  {
    id: 'greedy',
    name: 'Greedy',
    summary: 'Make the locally optimal choice with a provable exchange argument. Greedy = DP where one choice dominates.',
    triggers: ['can/can\'t reach', 'optimal jump', 'interval scheduling', 'fewest refuels/stops'],
    php: '—',
    problems: [
      {
        id: 'jump-game', title: 'Jump Game', leetcode: 55, slug: 'jump-game', difficulty: 'medium', kind: 'fn', fn: 'canJump',
        description: 'Return true if you can reach the last index from the first, where nums[i] is max jump length.',
        tests: [
          { args: [[[2, 3, 1, 1, 4]]], expected: true },
          { args: [[[3, 2, 1, 0, 4]]], expected: false },
          { args: [[[0]]], expected: true },
        ],
      },
      {
        id: 'gas-station', title: 'Gas Station', leetcode: 134, slug: 'gas-station', difficulty: 'medium', kind: 'fn', fn: 'canCompleteCircuit',
        description: 'Return the starting gas station index to complete the circuit, else -1.',
        tests: [
          { args: [[[1, 2, 3, 4, 5], [3, 4, 5, 1, 2]]], expected: 3 },
          { args: [[[2, 3, 4], [3, 4, 3]]], expected: -1 },
          { args: [[[5, 1, 2, 3, 4], [4, 4, 1, 5, 1]]], expected: 4 },
        ],
      },
      {
        id: 'assign-cookies', title: 'Assign Cookies', leetcode: 455, slug: 'assign-cookies', difficulty: 'easy', kind: 'fn', fn: 'findContentChildren',
        description: 'Return the max number of content children (greedy matching of greed factors to cookie sizes).',
        tests: [
          { args: [[[1, 2, 3], [1, 1]]], expected: 1 },
          { args: [[[1, 2], [1, 2, 3]]], expected: 2 },
          { args: [[[1, 2, 3], [3]]], expected: 1 },
        ],
      },
    ],
  },
  {
    id: 'graphs',
    name: 'Graphs',
    summary: 'BFS for shortest paths, DFS for connectivity, topo sort for dependencies. Pick the representation deliberately.',
    triggers: ['islands/connected components', 'clone/serialize', 'prerequisites/ordering', 'shortest path'],
    php: 'adjacency map in PHP arrays',
    problems: [
      {
        id: 'number-of-islands', title: 'Number of Islands', leetcode: 200, slug: 'number-of-islands', difficulty: 'medium', kind: 'fn', fn: 'numIslands',
        description: 'Return the number of islands (4-directional groups of "1"s) in the grid.',
        tests: [
          { args: [[['1', '1', '1', '1', '0'], ['1', '1', '0', '1', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '0', '0', '0']].map(r => r.slice())], expected: 1 },
          { args: [[['1', '1', '0', '0', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '1', '0', '0'], ['0', '0', '0', '1', '1']].map(r => r.slice())], expected: 3 },
          { args: [[['0']]], expected: 0 },
        ],
      },
      {
        id: 'clone-graph', title: 'Clone Graph', leetcode: 133, slug: 'clone-graph', difficulty: 'medium', kind: 'graph', fn: 'cloneGraph',
        description: 'Deep-clone an undirected graph given a reference node. Input/output as adjacency lists (1-indexed).',
        tests: [
          { args: [[[2, 4], [1, 3], [2, 4], [1, 3]]], expected: [[2, 4], [1, 3], [2, 4], [1, 3]] },
          { args: [[]], expected: [] },
          { args: [[[]]], expected: [[]] },
        ],
      },
      {
        id: 'course-schedule', title: 'Course Schedule', leetcode: 207, slug: 'course-schedule', difficulty: 'medium', kind: 'fn', fn: 'canFinish',
        description: 'Return true if all numCourses courses can be finished given prerequisite pairs.',
        tests: [
          { args: [[2, [[1, 0]]]], expected: true },
          { args: [[2, [[1, 0], [0, 1]]]], expected: false },
          { args: [[3, [[1, 0], [2, 0], [2, 1]]]], expected: true },
        ],
      },
    ],
  },
  {
    id: 'trie',
    name: 'Trie',
    summary: 'Prefix tree: O(L) insert/search. The wildcard variant adds DFS at the dot node.',
    triggers: ['prefix search', 'autocomplete', 'dictionary with wildcards', 'word search II'],
    php: 'nested PHP arrays',
    problems: [
      {
        id: 'implement-trie', title: 'Implement Trie (Prefix Tree)', leetcode: 208, slug: 'implement-trie-prefix-tree', difficulty: 'medium', kind: 'class', cls: 'Trie',
        description: 'Implement insert, search (exact), and startsWith (prefix).',
        ops: ['Trie', 'insert', 'search', 'search', 'startsWith'],
        args: [['apple'], ['apple'], ['app'], ['app']],
        expected: [null, true, false, true],
      },
      {
        id: 'word-search-ii', title: 'Word Search II', leetcode: 212, slug: 'word-search-ii', difficulty: 'hard', kind: 'fn', fn: 'findWords', unordered: 'flat',
        description: 'Return all words from the list that exist in the board by adjacent non-repeating cells.',
        tests: [
          { args: [[['o', 'a', 'a', 'n'], ['e', 't', 'a', 'e'], ['i', 'h', 'k', 'r'], ['i', 'f', 'l', 'v']].map(r => r.slice()), ['oath', 'pea', 'eat', 'rain']], expected: ['eat', 'oath'] },
          { args: [[['a', 'b'], ['c', 'd']].map(r => r.slice()), ['abcb']], expected: [] },
        ],
      },
      {
        id: 'design-add-search-words', title: 'Design Add and Search Words', leetcode: 211, slug: 'design-add-and-search-words-data-structure', difficulty: 'medium', kind: 'class', cls: 'WordDictionary',
        description: 'Support addWord and search where "." matches any single character.',
        ops: ['WordDictionary', 'addWord', 'addWord', 'addWord', 'search', 'search', 'search', 'search'],
        args: [['bad'], ['dad'], ['mad'], ['pad'], ['bad'], ['.ad'], ['b..']],
        expected: [null, null, null, null, false, true, true, true],
      },
    ],
  },
  {
    id: 'bit-manipulation',
    name: 'Bit Manipulation',
    summary: 'XOR cancels duplicates; shifts divide by two. Constant-space tricks for interviews.',
    triggers: ['single number', 'counting bits', 'power-of-two checks', 'xor properties'],
    php: '—',
    problems: [
      {
        id: 'single-number', title: 'Single Number', leetcode: 136, slug: 'single-number', difficulty: 'easy', kind: 'fn', fn: 'singleNumber',
        description: 'Return the number that appears once when every other appears twice. O(1) space expected.',
        tests: [
          { args: [[[2, 2, 1]]], expected: 1 },
          { args: [[[4, 1, 2, 1, 2]]], expected: 4 },
          { args: [[[1]]], expected: 1 },
        ],
      },
      {
        id: 'number-of-1-bits', title: 'Number of 1 Bits', leetcode: 191, slug: 'number-of-1-bits', difficulty: 'easy', kind: 'fn', fn: 'hammingWeight',
        description: 'Return the number of set bits in the unsigned 32-bit integer n.',
        tests: [
          { args: [[11]], expected: 3 },
          { args: [[128]], expected: 1 },
          { args: [[4294967293]], expected: 31 },
        ],
      },
      {
        id: 'counting-bits', title: 'Counting Bits', leetcode: 338, slug: 'counting-bits', difficulty: 'easy', kind: 'fn', fn: 'countBits',
        description: 'For each i in 0..n, return the number of 1-bits in i. O(n) expected.',
        tests: [
          { args: [[2]], expected: [0, 1, 1] },
          { args: [[5]], expected: [0, 1, 1, 2, 1, 2] },
          { args: [[0]], expected: [0] },
        ],
      },
    ],
  },
];
