import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Typography, Skeleton } from 'antd';
import { BlockListRepo } from '../../repository/BlockListRepo';
import { Block } from '../../types/Block';
import { BlockList } from './BlockList';
import './style.css';

const TIME_INTERVAL_IN_HOURS = 2;

interface Pagination {
  current: number;
  pageSize: number;
  total?: number;
}

const Home: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const maxTs: number = useMemo(() => moment().subtract(1, 'day').unix(), []);
  const [currentTs, setCurrentTs] = useState(maxTs);
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 50,
  });

  useEffect(() => {
    async function fetchBlocks() {
      setLoading(true);
      const blockListRepo = BlockListRepo.getInstance();
      const { error, response } = await blockListRepo.getBlocks(currentTs);

      if (response && Array.isArray(response.blocks) && !error) {
        setBlocks((prevBlocks) => [...prevBlocks, ...response.blocks]);
      }

      setLoading(false);
    }

    fetchBlocks();
  }, [currentTs]);

  useEffect(() => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      total: blocks.length,
    }));
  }, [blocks]);

  const handleDecreaseTs = () => {
    const mDate = moment
      .unix(currentTs)
      .subtract(TIME_INTERVAL_IN_HOURS, 'hours');

    const newTs = mDate.unix();

    if (newTs < maxTs) {
      setCurrentTs(newTs);
    }
  };

  const handleBlockClick = (block: Block) => {
    history.push(`blocks/${block.hash}`);
  };

  const handlePageChange = (newPage: number, pageSize: number | undefined) => {
    const lastPage = Math.ceil(blocks.length / pagination.pageSize);

    if (newPage > lastPage - 2) {
      handleDecreaseTs();
    }

    setPagination((prevPagination) => ({
      ...prevPagination,
      current: newPage,
    }));
  };

  const renderLoader = () => {
    return (
      <>
        <Skeleton paragraph={{ rows: 8 }} />
        <Skeleton paragraph={{ rows: 8 }} />
      </>
    );
  };

  return (
    <div className='block-list-outer-wrapper'>
      <Row>
        <Col span={20}>
          <Typography.Title level={1}>LATEST BLOCKS</Typography.Title>
        </Col>
      </Row>

      {Array.isArray(blocks) && blocks.length ? (
        <BlockList
          pagination={pagination}
          blocks={blocks}
          onClick={handleBlockClick}
          handlePageChange={handlePageChange}
          isLoading={isLoading}
        />
      ) : (
        renderLoader()
      )}
    </div>
  );
};

export default Home;
