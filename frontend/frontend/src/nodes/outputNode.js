import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );

  const [outputType, setOutputType] = useState(
    data?.outputType || 'Text'
  );

  return (
    <BaseNode
      title="📤 Output"
      inputs={[
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
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          style={{
            width: '100%',
            padding: '6px',
            marginTop: '4px',
            borderRadius: '6px'
          }}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};