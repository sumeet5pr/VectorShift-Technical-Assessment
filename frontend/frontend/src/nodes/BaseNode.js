import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  title,
  children,
  inputs = [],
  outputs = []
}) => {
  return (
    <div
      style={{
        width: 220,
        minHeight: 100,
        border: '1px solid #444',
        borderRadius: '12px',
        padding: '12px',
        backgroundColor: '#1e1e2f',
        color: 'white',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        position: 'relative'
      }}
    >
      {/* Input Handles */}
      {inputs.map((input) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            background: '#555',
            ...input.style
          }}
        />
      ))}

      {/* Title */}
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '16px',
          textAlign: 'center',
          marginBottom: '12px'
        }}
      >
        {title}
      </div>

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        {children}
      </div>

      {/* Output Handles */}
      {outputs.map((output) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            background: '#555',
            ...output.style
          }}
        />
      ))}
    </div>
  );
};