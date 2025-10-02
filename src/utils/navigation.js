// Unified navigation structure
// Organized by sections for better maintainability

// Header navigation items (used in Header component)
export const headerNavigationItems = [
  { path: '/', label: 'Home', icon: 'FaCode', group: 'main' },
  { path: '/documentation', label: 'Documentation', icon: 'FaBook', group: 'help' },
  { path: '/ContributorLeaderboard', label: 'Contributors', icon: 'FaUsers', group: 'community' },
  { path: '/quiz', label: 'Quiz', icon: 'FaBrain', group: 'test' },
];

// Main navbar navigation items (used in Navbar component)
export const navbarNavigationItems = [
  { path: "/", label: "Home", icon: "Home" },
  { path: "/learn", label: "Learn", icon: "BookOpen" }, // ← simple link now
  { path: "/quiz", label: "Quiz", icon: "Trophy" },
  { path: "/contributor-leaderboard", label: "Contributors", icon: "Users" },
  { path: "/data-structures", label: "Documentation", icon: "BookOpen" },
  { path: "/settings", label: "Settings", icon: "Settings" },
];

// Learn page sections organized by topic areas
export const learnSections = [
  // Data Structures section
  {
    heading: "Data Structures",
    items: [
      { path: "/data-structures", label: "Overview" },
      { path: "/data-structures/linked-list", label: "Linked List" },
      { path: "/data-structures/queue", label: "Queue visualization" },
      { path: "/data-structures/stack", label: "Stack visualization" },
      { path: "/data-structures/binary-tree", label: "Binary Tree visualization" },
    ],
  },
  
  // Sorting algorithms section
  {
    heading: "Sorting",
    items: [
      { path: "/sorting", label: "Overview" },
      { path: "/components/AlgorithmComparison", label: "Algorithm Comparison" },
    ],
  },
  
  // Searching algorithms section
  {
    heading: "Searching",
    items: [
      { path: "/searchingOverview", label: "Overview" },
      { path: "/searching", label: "Searching Algorithm" },
    ],
  },
  
  // Graph algorithms section
  {
    heading: "Graphs",
    items: [
      { path: "/graph", label: "Overview" },
      { path: "/graph/bfs", label: "BFS" },
      { path: "/graph/dfs", label: "DFS" },
      { path: "/graph/dijkstra", label: "Dijkstra" },
      { path: "/graph/comparison", label: "Graph Comparison" },
      { path: "/graph/cycleDetection", label: "Cycle Detection" },
    ],
  },
  
  // Algorithmic paradigms section
  {
    heading: "Paradigms",
    items: [
      { path: "/backtracking-overview", label: "Backtracking (Overview)" },
      { path: "/backtracking", label: "Backtracking Algorithms" },
      { path: "/dp-overview", label: "Dynamic Programming (Overview)" },
      { path: "/dp", label: "Dynamic Programming" },
      { path: "/greedy-overview", label: "Greedy (Overview)" },
      { path: "/greedy", label: "Greedy Algorithms" },
      { path: "/dc-overview", label: "Divide & Conquer (Overview)" },
      { path: "/dc", label: "Divide & Conquer" },
    ],
  },
  
  // Additional topics section
  {
    heading: "Other Topics",
    items: [
      { path: "/hashing-overview", label: "Hashing (Overview)" },
      { path: "/hashing", label: "Hashing Algorithms" },
      { path: "/tree-overview", label: "Trees (Overview)" },
      { path: "/tree", label: "Tree Algorithms" },
      { path: "/game-search-overview", label: "Game Search (Overview)" },
      { path: "/game-search", label: "Game Search Algorithms" },
      { path: "/branchbound-overview", label: "Branch & Bound (Overview)" },
      { path: "/branchbound", label: "Branch & Bound" },
    ],
  },
];