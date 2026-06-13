from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Crucial: Allow the React frontend to communicate with this FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to localhost:3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the expected JSON payload from the frontend
class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: PipelineData):
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # --- DAG Validation Logic ---
    # 1. Build an adjacency list representation of the graph
    adj_list = {node['id']: [] for node in nodes}
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source in adj_list:
            adj_list[source].append(target)
            
    # 2. Use Depth-First Search (DFS) to detect cycles
    def is_cyclic(graph):
        visited = set()
        rec_stack = set() # Recursion stack to track the current path
        
        def dfs(node):
            visited.add(node)
            rec_stack.add(node)
            
            for neighbor in graph.get(node, []):
                # If the neighbor hasn't been visited, search it
                if neighbor not in visited:
                    if dfs(neighbor):
                        return True
                # If the neighbor is currently in the recursion stack, we found a cycle
                elif neighbor in rec_stack:
                    return True
                    
            rec_stack.remove(node)
            return False
            
        # Run DFS on all disconnected components of the graph
        for node in graph:
            if node not in visited:
                if dfs(node):
                    return True # Cycle detected
                    
        return False # No cycles found
        
    is_dag = not is_cyclic(adj_list)
    
    # Return the exact format requested by the prompt
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }