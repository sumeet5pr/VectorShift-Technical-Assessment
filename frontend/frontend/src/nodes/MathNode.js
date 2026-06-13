import { BaseNode } from './BaseNode';

export const MathNode = ({ id }) => {
  return (
    <BaseNode
      title="Math"
      inputs={[
        { id: `${id}-a`, style: { top: '30%' } },
        { id: `${id}-b`, style: { top: '70%' } }
      ]}
      outputs={[
        { id: `${id}-result` }
      ]}
    >
      <span>Performs calculations.</span>
    </BaseNode>
  );
};