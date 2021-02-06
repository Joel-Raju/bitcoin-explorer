import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Transaction } from '../../types/Transaction';
import { getBTCFee } from '../../utils/format';

interface Props {
  output: Transaction.Output;
}

const OutputItem: React.FC<Props> = ({ output }) => {
  return (
    <div>
      <Row style={{ marginBottom: '1rem' }}>
        <Col span={3}>
          <Typography.Text>Index</Typography.Text>
        </Col>

        <Col span={21}>
          <Typography.Text strong>{output.tx_index}</Typography.Text>
        </Col>
      </Row>

      <Row style={{ marginBottom: '1rem' }}>
        <Col span={3}>
          <Typography.Text>Script</Typography.Text>
        </Col>

        <Col span={21}>
          <Typography.Text strong>{output.script}</Typography.Text>
        </Col>
      </Row>

      <Row style={{ marginBottom: '1rem' }}>
        <Col span={3}>
          <Typography.Text>Value</Typography.Text>
        </Col>

        <Col span={21}>
          <Typography.Text strong>
            {getBTCFee(output.value)} BTC
          </Typography.Text>
        </Col>
      </Row>
    </div>
  );
};

export default OutputItem;
