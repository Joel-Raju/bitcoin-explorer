import React from 'react';
import { Card, Divider } from 'antd';
import { Transaction } from '../../types/Transaction';
import InputItem from './InputItem';

interface Props {
  inputs: Transaction.Input[];
}

const InputList: React.FC<Props> = ({ inputs }) => {
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
      {inputs.map((input, index) => (
        <div key={input.script}>
          <InputItem input={input} />
          {index !== inputs.length - 1 && <Divider />}
        </div>
      ))}
    </Card>
  );
};

export default InputList;
