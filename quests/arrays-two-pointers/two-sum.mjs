// Quest: Two Sum — Arrays & Two Pointers (easy)
// LeetCode 1: https://leetcode.com/problems/two-sum/
// Definition of done: explain · implement · test green (npm test) · measure · document trade-offs
// XP: 50 solved · 25 hinted · +100 recorded explain-back · +150 PHP SPL port

// Approach: one pass, hash map of value -> index. O(n) time, O(n) space.
// Trade-off: the two-pointer variant is O(1) space but needs a sorted array
// and loses the original indices — the hash map keeps them.
export function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  throw new Error('no two sum solution');
}
