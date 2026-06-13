import { useState, useMemo } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(
    data?.text || '{{input}}'
  );

  const variables = useMemo(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

    const matches = [...currText.matchAll(regex)];

    return matches.map((match, index) => ({
      id: `${id}-${match[1]}`,
      style: {
        top: `${((index + 1) * 100) / (matches.length + 1)}%`
      }
    }));
  }, [currText, id]);

  return (
    <BaseNode
      title="📝 Text"
      inputs={variables}
      outputs={[
        {
          id: `${id}-output`
        }
      ]}
    >
      <label>
        Template:
        <textarea
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          rows={4}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '4px',
            borderRadius: '8px',
            border: '1px solid #666',
            resize: 'vertical',
            fontFamily: 'monospace'
          }}
        />
      </label>
    </BaseNode>
  );
};