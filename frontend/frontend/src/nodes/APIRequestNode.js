import { BaseNode } from './BaseNode';

export const APIRequestNode = ({ id }) => {
  return (
    <BaseNode
      title="API Request"
      inputs={[
        { id: `${id}-endpoint` }
      ]}
      outputs={[
        { id: `${id}-response` }
      ]}
    >
      <span>Calls external APIs.</span>
    </BaseNode>
  );
};