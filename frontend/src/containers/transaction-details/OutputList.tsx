import React from 'react';
import { Card, Divider } from 'antd';
import { Transaction } from '../../types/Transaction';
import OutputItem from './OutputItem';

interface Props {
  outputs: Transaction.Output[];
}

const OutputList: React.FC<Props> = ({ outputs }) => {
  return (
    <Card
      bordered
      style={{
        width: '75rem',
        marginBottom: '2rem',
        borderRadius: '4px',
        backgroundColor: 'rgba(255,255,255,0.8)',
      }}
    >
      {outputs.map((output, index) => (
        <div key={output.script}>
          <OutputItem output={output} />
          {index !== outputs.length - 1 && <Divider />}
        </div>
      ))}
    </Card>
  );
};

export default OutputList;
