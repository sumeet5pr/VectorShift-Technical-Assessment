import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      title="LLM"
      inputs={[
        {
          id: `${id}-system`,
          style: { top: `${100 / 3}%` }
        },
        {
          id: `${id}-prompt`,
          style: { top: `${200 / 3}%` }
        }
      ]}
      outputs={[
        {
          id: `${id}-response`
        }
      ]}
    >
      <span>This is a LLM.</span>
    </BaseNode>
  );
};