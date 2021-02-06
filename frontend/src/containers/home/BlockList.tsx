import React from 'react';
import { Card, Table, Typography } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { Block } from '../../types/Block';
import { getElapsedTime } from '../../utils/format';

interface Props {
  blocks: Block[];
  onClick: (block: Block) => any;
  handlePageChange: (page: number, pageSize?: number) => void;
  pagination: TablePaginationConfig;
  isLoading: boolean;
}

const columns = [
  {
    title: 'Height',
    dataIndex: 'height',
    key: 'height',
  },
  {
    title: 'Hash',
    dataIndex: 'hash',
    key: 'hash',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Mined',
    dataIndex: 'time',
    key: 'time',
    render: (time: number) => (
      <Typography.Text>{getElapsedTime(time)}</Typography.Text>
    ),
  },
];

export const BlockList: React.FC<Props> = ({
  blocks,
  onClick,
  handlePageChange,
  pagination,
  isLoading,
}) => {
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
      <Table
        rowKey='hash'
        columns={columns}
        dataSource={blocks}
        loading={isLoading}
        onRow={(block, index) => {
          return {
            onClick: () => onClick(block),
          };
        }}
        pagination={{
          ...pagination,
          showSizeChanger: false,
          onChange: handlePageChange,
        }}
      />
    </Card>
  );
};
