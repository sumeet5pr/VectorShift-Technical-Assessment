# VectorShift Full-Stack Technical Assessment

This project is a modular, drag-and-drop pipeline builder that lets users create node workflows, map data flows dynamically, and run server-side validation to check if the layout forms a valid Directed Acyclic Graph (DAG). 

It uses React Flow on the frontend and a FastAPI backend.

---

## What I Built

### 1. Unified Node Abstraction
* **The Goal:** Avoid copying and pasting the same layout and handle code across multiple files.
* **The Solution:** I built a reusable `BaseNode.js` wrapper component. Now, adding a new node to the canvas takes seconds—you just pass its specific configuration (inputs, outputs, titles, and styles) into the base layer.
* **Custom Nodes:** Using this wrapper, I added 5 custom nodes (like Math, Email, and Delay nodes) to show how flexible the abstraction is.

### 2. Dynamic Handles & Self-Resizing Nodes
* **Variables on the Fly:** The Text Node listens to user input in real-time. If you type a variable inside double curly braces—like `{{ variable_name }}`—a custom regex rule catches it and instantly spawns a matching input handle on the left side of the node.
* **No Text Overflow:** I hooked up continuous resizing logic so the node automatically scales its width and height as you type, keeping the UI clean.

### 3. Full-Stack Integration & DAG Validation
* **State Management:** When you hit submit, the frontend grabs the active nodes and edges cleanly from the global Zustand store.
* **The Cycle Detector:** The backend receives this JSON payload, builds an adjacency list representation of your graph, and runs a Depth-First Search (DFS) algorithm to scan for infinite loops.
* **User Feedback:** The frontend catches the response and alerts the user with the final metrics: total node count, edge count, and whether the pipeline is a valid DAG or contains a cycle.

---

## Quick Start

### Backend (Python)
```bash
cd backend/backend
pip install -r requirements.txt
uvicorn main:app --reload
