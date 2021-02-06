import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Transaction } from '../../types/Transaction';

interface Props {
  input: Transaction.Input;
}

const InputItem: React.FC<Props> = ({ input }) => {
  return (
    <div>
      <Row style={{ marginBottom: '1rem' }}>
        <Col span={3}>
          <Typography.Text>Sequence</Typography.Text>
        </Col>

        <Col span={21}>
          <Typography.Text strong>{input.sequence}</Typography.Text>
        </Col>
      </Row>

      <Row style={{ marginBottom: '1rem' }}>
        <Col span={3}>
          <Typography.Text>Script</Typography.Text>
        </Col>

        <Col span={21}>
          <Typography.Text strong>{input.script}</Typography.Text>
        </Col>
      </Row>

      <Row style={{ marginBottom: '1rem' }}>
        <Col span={3}>
          <Typography.Text>Witness</Typography.Text>
        </Col>

        <Col span={21}>
          <Typography.Text strong>{input.witness || 'N/A'}</Typography.Text>
        </Col>
      </Row>
    </div>
  );
};

export default InputItem;
