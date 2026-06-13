import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );

  const [inputType, setInputType] = useState(
    data?.inputType || 'Text'
  );

  return (
    <BaseNode
      title="📥 Input"
      outputs={[
        {
          id: `${id}-value`
        }
      ]}
    >
      <label>
        Name:
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          style={{
            width: '100%',
            padding: '6px',
            marginTop: '4px',
            borderRadius: '6px',
            border: '1px solid #666'
          }}
        />
      </label>

      <label>
        Type:
        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          style={{
            width: '100%',
            padding: '6px',
            marginTop: '4px',
            borderRadius: '6px'
          }}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};