import React from 'react';
import { Card, Row, Typography, Col, Divider } from 'antd';
import { Transaction } from '../../types/Transaction';
import { getBTCFee, getFormattedTime } from '../../utils/format';

interface Props {
  transaction: Transaction.Transaction;
}

const TransactionSummary: React.FC<Props> = ({ transaction }) => {
  return (
    <Card
      bordered
      style={{
        width: '75 rem',
        borderRadius: '4px',
        boxShadow:
          '0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)',
      }}
    >
      <Row>
        <Col span={3}>
          <Typography.Text>Hash</Typography.Text>
        </Col>

        <Col span={16}>
          <Typography.Text strong>{transaction.hash}</Typography.Text>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={3}>
          <Typography.Text>Size</Typography.Text>
        </Col>

        <Col span={16}>
          <Typography.Text strong>{transaction.size} bytes</Typography.Text>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={3}>
          <Typography.Text>Fee</Typography.Text>
        </Col>

        <Col span={16}>
          <Typography.Text strong>
            {getBTCFee(transaction.fee)} BTC
          </Typography.Text>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={3}>
          <Typography.Text>Received Time</Typography.Text>
        </Col>

        <Col span={16}>
          <Typography.Text strong>
            {getFormattedTime(transaction.time)}
          </Typography.Text>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={3}>
          <Typography.Text>Weight</Typography.Text>
        </Col>

        <Col span={16}>
          <Typography.Text strong>{transaction.weight}</Typography.Text>
        </Col>
      </Row>
    </Card>
  );
};

export default TransactionSummary;
