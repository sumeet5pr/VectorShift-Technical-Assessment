import { BaseNode } from './BaseNode';

export const EmailNode = ({ id }) => {
  return (
    <BaseNode
      title="Email"
      inputs={[
        { id: `${id}-message` }
      ]}
      outputs={[
        { id: `${id}-email` }
      ]}
    >
      <span>Sends email messages.</span>
    </BaseNode>
  );
};