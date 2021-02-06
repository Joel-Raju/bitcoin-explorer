import React from 'react';
import { Card, Typography, Row, Col, Divider } from 'antd';
import { Block } from '../../types/Block';

interface Props {
  block: Block;
}

const BlockDetails: React.FC<Props> = ({ block }) => {
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
          <Typography.Text>Block Hash</Typography.Text>
        </Col>

        <Col span={16}>
          <Typography.Text strong>{block.hash}</Typography.Text>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={3}>
          <Typography.Text>Height</Typography.Text>
        </Col>

        <Col span={16}>
          <Typography.Text strong>{block.height}</Typography.Text>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={3}>
          <Typography.Text>Size</Typography.Text>
        </Col>

        <Col span={16}>
          <Typography.Text strong>{block.size} bytes</Typography.Text>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={3}>
          <Typography.Text>Block Index</Typography.Text>
        </Col>

        <Col span={16}>
          <Typography.Text strong>{block.block_index}</Typography.Text>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={3}>
          <Typography.Text>Previous Hash</Typography.Text>
        </Col>

        <Col span={16}>
          <Typography.Text strong>{block.prev_block}</Typography.Text>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={3}>
          <Typography.Text>Weight</Typography.Text>
        </Col>

        <Col span={16}>
          <Typography.Text strong>{block.weight}</Typography.Text>
        </Col>
      </Row>
    </Card>
  );
};

export default BlockDetails;
