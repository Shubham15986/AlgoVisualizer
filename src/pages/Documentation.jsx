import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Search,
  Database,
  BookOpen,
  Users,
  Star,
  GitBranch,
} from "lucide-react";
import "../styles/global-theme.css";

// ============================================================================
// 1. STATIC DATA & HELPERS
// ============================================================================

const algorithmDatabase = {
  sorting: {
    title: "Sorting Algorithms",
    icon: "🔄",
    color: "#66ccff",
    algorithms: [
      {
        name: "Bubble Sort",
        id: "bubbleSort",
        description:
          "Compares adjacent elements and swaps them if they are in wrong order. Simple but inefficient for large datasets.",
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)",
        stability: "Stable",
        inPlace: true,
        adaptivity: "Adaptive",
        implemented: true, 
      },
      {
        name: "Selection Sort",
        id: "selectionSort",
        description:
          "Finds the minimum element and places it at the beginning. Makes fewer swaps than bubble sort.",
        timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)",
        stability: "Unstable",
        inPlace: true,
        adaptivity: "Not Adaptive",
        implemented: true, 
      },
      {
        name: "Insertion Sort",
        id: "insertionSort",
        description:
          "Builds sorted array one element at a time. Efficient for small datasets and nearly sorted arrays.",
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)",
        stability: "Stable",
        inPlace: true,
        adaptivity: "Adaptive",
        implemented: true, 
      },
      {
        name: "Merge Sort",
        id: "mergeSort",
        description:
          "Divides array into halves, sorts recursively, and merges them. Now includes a note on stability.",
        timeComplexity: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n log n)",
        },
        spaceComplexity: "O(n)",
        stability: "Stable",
        inPlace: false,
        adaptivity: "Not Adaptive",
        implemented: true, 
      },
      {
        name: "Quick Sort",
        id: "quickSort",
        description:
          "Selects a pivot and partitions array around it. Fast average case but can degrade to O(n²).",
        timeComplexity: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n²)",
        },
        spaceComplexity: "O(log n)",
        stability: "Unstable",
        inPlace: true,
        adaptivity: "Not Adaptive",
        implemented: true, 
      },
      {
        name: "Tim Sort",
        id: "timSort",
        description: "Hybrid stable sorting algorithm combining Insertion Sort and Merge Sort. Detects natural runs, sorts them, and merges efficiently. Default in Python and Java.",
        timeComplexity: { best: "O(n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(n)",
        stability: "Stable",
        inPlace: false,
        adaptivity: "Adaptive (leverages existing runs)",
        implemented: true
      },
      {
        name: "Intro Sort",
        id: "introSort",
        description: "Hybrid sorting algorithm that begins with Quick Sort, switches to Heap Sort if recursion depth is too deep, and uses Insertion Sort for small partitions.",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(log n)",
        stability: "Unstable",
        inPlace: true,
        adaptivity: "Partially Adaptive",
        implemented: true
      },     
      {
        name: "Shell Sort",
        id: "shellSort",
        description: "In-place comparison-based sorting algorithm that generalizes insertion sort by allowing exchanges of elements that are far apart. It improves on insertion sort by breaking the original list into smaller sublists using a gap sequence, reducing the total number of moves.",
        timeComplexity: { best: "O(n log n)", average: "O(n(log n)^2)", worst: "O(n(log n)^2)" },
        spaceComplexity: "O(1)",
        stability: "Unstable",
        inPlace: true,
        adaptivity: "Not Adaptive",
        implemented: true
      }, 
    ],
  },
  searching: {
    title: "Search Algorithms",
    icon: "🔍",
    color: "#4ade80",
    algorithms: [
      {
        name: "Linear Search",
        id: "linearSearch",
        description:
          "Searches through array sequentially until target is found. Works on unsorted arrays.",
        timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
        spaceComplexity: "O(1)",
        dataRequirement: "None (works on unsorted data)",
        implemented: true, 
      },
      {
        name: "Binary Search",
        id: "binarySearch",
        description:
          "Searches sorted array by repeatedly dividing search interval in half. Updated to note efficiency.",
        timeComplexity: {
          best: "O(1)",
          average: "O(log n)",
          worst: "O(log n)",
        },
        spaceComplexity: "O(1)",
        dataRequirement: "Sorted array",
        implemented: true, 
      },
      {
        name: "Jump Search",
        id: "jumpSearch",
        description:
          "Searches sorted array by jumping ahead by fixed steps and then performing linear search within the block.",
        timeComplexity: {
          best: "O(1)",
          average: "O(√n)",
          worst: "O(√n)"
        },
        spaceComplexity: "O(1)",
        dataRequirement: "Sorted array",
        implemented: true
      },
      {
        name: "Exponential Search",
        id: "exponentialSearch",
        description:
          "Searches sorted array by finding a range where the element may exist using exponential jumps, then performing binary search within that range.",
        timeComplexity: {
          best: "O(1)",
          average: "O(log n)",
          worst: "O(log n)"
        },
        spaceComplexity: "O(1)",
        dataRequirement: "Sorted array",
        implemented: true
      },
      {
        name: "Ternary Search",
        id: "ternarySearch",
        description:
          "Searches sorted array by dividing it into three parts and determining which part contains the target element.",
        timeComplexity: {
          best: "O(1)",
          average: "O(log₃ n)",
          worst: "O(log₃ n)"
        },
        spaceComplexity: "O(1)",
        dataRequirement: "Sorted array",
        implemented: true
      },
    ],
  },
  dataStructures: {
    title: "Data Structures",
    icon: "🏗️",
    color: "#ffd93d",
    algorithms: [
      {
        name: "Linked List",
        id: "linkedList",
        description:
          "Linear data structure where elements are stored in nodes. Now includes traversal note.",
        timeComplexity: {
          insertion: "O(1)",
          deletion: "O(1)",
          search: "O(n)",
          access: "O(n)",
        },
        spaceComplexity: "O(n)",
        implemented: false, 
      },
      {
        name: "Stack",
        id: "stack",
        description: "Last-In-First-Out (LIFO) data structure.",
        timeComplexity: {
          push: "O(1)",
          pop: "O(1)",
          peek: "O(1)",
          search: "O(n)",
        },
        spaceComplexity: "O(n)",
        implemented: false, 
      },
      {
        name: "Queue",
        id: "queue",
        description: "First-In-First-Out (FIFO) data structure.",
        timeComplexity: {
          enqueue: "O(1)",
          dequeue: "O(1)",
          front: "O(1)",
          search: "O(n)",
        },
        spaceComplexity: "O(n)",
        implemented: false, 
      },
      {
        name: "Binary Tree",
        id: "binaryTree",
        description:
          "Hierarchical data structure where each node has at most two children.",
        timeComplexity: {
          insertion: "O(log n)",
          deletion: "O(log n)",
          search: "O(log n)",
          traversal: "O(n)",
        },
        spaceComplexity: "O(n)",
        implemented: false, 
      },
    ],
  },
  graph: {
    title: "Graph Algorithms",
    icon: "🧭",
    color: "#66ccff",
    algorithms: [
      {
        name: "Breadth-First Search (BFS)",
        id: "graphBFS",
        description:
          "Explores the graph level by level from a source, visiting all neighbors before moving deeper. Finds shortest paths by edges in unweighted graphs.",
        timeComplexity: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
        spaceComplexity: "O(V)",
        implemented: true,
        subType: "bfs",
      },
      {
        name: "Depth-First Search (DFS)",
        id: "graphDFS",
        description:
          "Explores as deep as possible along each branch before backtracking. Useful for cycle detection, topological sort, and connected components.",
        timeComplexity: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
        spaceComplexity: "O(V)",
        implemented: true,
        subType: "dfs",
      },
      {
        name: "Dijkstra's Algorithm",
        id: "graphDijkstra",
        description:
          "Computes shortest path distances from a source to all vertices in a weighted graph with non‑negative weights using a priority queue.",
        timeComplexity: { best: "O(E + V log V)", average: "O(E + V log V)", worst: "O(E + V log V)" },
        spaceComplexity: "O(V)",
        implemented: true,
        subType: "dijkstra",
      },
    ],
  },
  trees: {
    title: "Trees",
    icon: "🔍",
    color: "#4ade80",
    algorithms: [
{
name: "Postorder Traversal",
id: "postorder-traversal",
description: "Tree traversal method that visits the left subtree, then the right subtree, and finally the root node (Left → Right → Root).",
timeComplexity: {
best: "O(n)",
average: "O(n)",
worst: "O(n)"
},
spaceComplexity: "O(h) (where h is the height of the tree, O(n) in worst case for a skewed tree)",
implemented: true
},
{
name: "Inorder Traversal",
id: "inorder-traversal",
description: "Tree traversal method that visits the left subtree, then the root node, and finally the right subtree (Left → Root → Right).",
timeComplexity: {
best: "O(n)",
average: "O(n)",
worst: "O(n)"
},
spaceComplexity: "O(h) (where h is the height of the tree, O(n) in worst case for a skewed tree)",
implemented: true
},


    ],
  },
};


const getComplexityColor = (complexity) => {
  const colors = {
    "O(1)": "#4ade80",
    "O(log n)": "#66ccff",
    "O(n)": "#ffd93d",
    "O(n log n)": "#ff9500",
    "O(n²)": "#ff6b6b",
    "O(√n)": "#a78bfa",
  };
  return colors[complexity] || "#e0e6ed";
};

// ============================================================================
// 2. SUB-COMPONENTS
// ============================================================================

function AlgorithmCard({ algorithm }) {
  return (
    <div className="theme-card algorithm-card" title={algorithm.description}>
      <div className="card-header">
        <div className="card-title-group">
          <span className="card-icon">{algorithm.categoryIcon}</span>
          <h3 className="card-title">{algorithm.name}</h3>
        </div>
        {algorithm.implemented ? (
          <div className="status-badge implemented">Implemented</div>
        ) : (
          <div className="status-badge coming-soon">Coming Soon</div>
        )}
      </div>
      <p className="card-description">{algorithm.description}</p>
      <div className="card-category-badge">
        {algorithm.categoryTitle}
      </div>
    </div>
  );
}

// ============================================================================
// 3. MAIN COMPONENT
// ============================================================================

function AlgorithmDocumentation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredAlgorithms, setFilteredAlgorithms] = useState([]);
  const [graphSubcategory, setGraphSubcategory] = useState("all");

  const graphCounts = useMemo(() => {
    const list = algorithmDatabase.graph.algorithms;
    return {
      all: list.length,
      bfs: list.filter(a => a.subType === 'bfs').length,
      dfs: list.filter(a => a.subType === 'dfs').length,
      dijkstra: list.filter(a => a.subType === 'dijkstra').length,
    };
  }, []);

  const getAllAlgorithms = useCallback(() => {
  const seen = new Map();

  Object.entries(algorithmDatabase).forEach(([categoryKey, category]) => {
    category.algorithms.forEach((algo) => {
      if (!seen.has(algo.id)) {
        seen.set(algo.id, {
          ...algo,
          category: categoryKey,
          categoryTitle: category.title,
          categoryIcon: category.icon,
          categoryColor: category.color,
        });
      }
    });
  });

  return Array.from(seen.values());
}, []);


  useEffect(() => {
    let allAlgorithms = getAllAlgorithms();

    if (selectedCategory !== "all") {
      allAlgorithms = allAlgorithms.filter(
        (algo) => algo.category === selectedCategory
      );
    }

    if (selectedCategory === "graph" && graphSubcategory !== "all") {
      allAlgorithms = allAlgorithms.filter(
        (algo) => algo.subType === graphSubcategory
      );
    }

    if (searchTerm) {
      allAlgorithms = allAlgorithms.filter(
        (algo) =>
          algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          algo.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAlgorithms(allAlgorithms);
  }, [searchTerm, selectedCategory, graphSubcategory, getAllAlgorithms]);

  useEffect(() => {
    if (selectedCategory !== 'graph' && graphSubcategory !== 'all') {
      setGraphSubcategory('all');
    }
  }, [selectedCategory, graphSubcategory]);


  const categories = useMemo(
    () => [
      {
        key: "all",
        label: "All",
        icon: BookOpen,
        count: getAllAlgorithms().length,
      },
      {
        key: "sorting",
        label: "Sorting",
        icon: Users,
        count: algorithmDatabase.sorting.algorithms.length,
      },
      {
        key: "searching",
        label: "Searching",
        icon: Search,
        count: algorithmDatabase.searching.algorithms.length,
      },
      {
        key: "dataStructures",
        label: "Data Structures",
        icon: Database,
        count: algorithmDatabase.dataStructures.algorithms.length,
      },
      {
        key: "graph",
        label: "Graph",
        icon: GitBranch,
        count: algorithmDatabase.graph.algorithms.length,
      },
       
    ],
    [getAllAlgorithms]
  );


  return (
    <div className="theme-container">
      <h1 className="theme-title">Algorithm Documentation</h1>

      {/* Filters Section */}
      <div className="theme-card filters-section">
        {/* Search */}
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search algorithms..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>

        {/* Category Tabs */}
        <div className="category-filters overflow-x-auto whitespace-nowrap">
          {categories.map(category => {
            const IconComponent = category.icon;
            const isActive = selectedCategory === category.key;
            return (
              <button
                key={category.key}
                className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'} mx-1`}
                onClick={() => setSelectedCategory(category.key)}
              >
                <IconComponent size={16} className="mr-1" />
                {category.label}
                <span className="count-badge ml-1">{category.count}</span>
              </button>
            );
          })}
        </div>

        {/* Graph Sub-Tabs */}
        {selectedCategory === 'graph' && (
          <div className="category-filters mt-2 overflow-x-auto whitespace-nowrap">
            {[
              { key: 'all', label: 'All', count: graphCounts.all },
              { key: 'bfs', label: 'BFS', count: graphCounts.bfs },
              { key: 'dfs', label: 'DFS', count: graphCounts.dfs },
              { key: 'dijkstra', label: 'Dijkstra', count: graphCounts.dijkstra },
            ].map(sub => (
              <button
                key={sub.key}
                className={`btn ${graphSubcategory === sub.key ? 'btn-primary' : 'btn-secondary'} mx-1`}
                onClick={() => setGraphSubcategory(sub.key)}
                title={`Show ${sub.label} algorithms`}
              >
                <GitBranch size={16} className="mr-1" />
                {sub.label}
                <span className="count-badge ml-1">{sub.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Grid */}
      <div className="results-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {filteredAlgorithms.length > 0 ? (
          filteredAlgorithms.map(algorithm => (
            <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
          ))
        ) : (
          <div className="no-results-card theme-card text-center p-4">
            <Search size={48} className="mx-auto" />
            <h3>No algorithms found</h3>
            <p>Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}


export default AlgorithmDocumentation;
