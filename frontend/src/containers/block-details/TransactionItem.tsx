import React from 'react';
import { Row, Col, Typography, Divider, Button } from 'antd';
import { Transaction as TransactionType } from '../../types/Transaction';
import { getBTCFee, getFormattedTime } from '../../utils/format';

interface Props {
  transaction: TransactionType.Transaction;
  onClickView: () => any;
}

const TransactionItem: React.FC<Props> = ({ transaction, onClickView }) => {
  return (
    <div>
      <Row style={{ marginBottom: '1rem' }}>
        <Col span={2}>
          <Typography.Text>Hash</Typography.Text>
        </Col>
        <Col span={16}>
          <Typography.Text strong>{transaction.hash}</Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text>
            {getFormattedTime(transaction.time)}
          </Typography.Text>
        </Col>
      </Row>

      <Row>
        <Col span={2}>
          <Typography.Text>Fee</Typography.Text>
        </Col>
        <Col span={16}>
          <Typography.Text strong>
            {getBTCFee(transaction.fee)} BTC
          </Typography.Text>
        </Col>

        <Col span={6}>
          <Button type='primary' onClick={onClickView}>
            View details
          </Button>
        </Col>
      </Row>

      <Divider />
    </div>
  );
};

export default TransactionItem;
