import { useStore } from './store';

export const SubmitButton = () => {
    // Grab the global state directly from VectorShift's Zustand store
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Display the required metrics in a clean alert
            alert(
                `Pipeline Parsed Successfully!\n` +
                `---------------------------\n` +
                `Number of Nodes: ${data.num_nodes}\n` +
                `Number of Edges: ${data.num_edges}\n` +
                `Is a DAG? ${data.is_dag ? 'Yes ' : 'No '}`
            );

        } catch (error) {
            console.error("Error submitting pipeline:", error);
            alert("Failed to communicate with the backend. Ensure uvicorn is running.");
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
            <button 
                onClick={handleSubmit} 
                style={{ 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    padding: '10px 20px', 
                    border: 'none', 
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
};