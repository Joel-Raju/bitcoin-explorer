import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Skeleton, Typography, Row, Col, Button } from 'antd';
import { Block } from '../../types/Block';
import { Transaction } from '../../types/Transaction';
import { BlockRepo } from '../../repository/BlockRepo';
import BlockDetails from './BlockDetails';
import TransactionList from './TransactionList';

import './styles.css';

const BlockDetailsPage: React.FC = () => {
  const { hash } = useParams<{ hash: string }>();
  const history = useHistory();
  const [block, setBlock] = useState<Block>();

  useEffect(() => {
    async function fetchBlockDetails() {
      const blockRepository = BlockRepo.getInstance();
      const { response, error } = await blockRepository.getBlockByHash(hash);

      if (response && !error) {
        setBlock(response);
      }
    }

    fetchBlockDetails();
  }, [hash]);

  const renderLoader = () => {
    return (
      <>
        <Skeleton paragraph={{ rows: 8 }} />
        <Skeleton paragraph={{ rows: 8 }} />
      </>
    );
  };

  const handleBackPress = () => {
    history.goBack();
  };

  const handleViewTxDetails = (transaction: Transaction.Transaction) => {
    history.push(`/transactions/${transaction.hash}`);
  };

  const renderBlock = () => {
    if (!block) {
      return;
    }

    return (
      <div>
        <div style={{ marginBottom: '4rem' }}>
          <Row>
            <Col span={20}>
              <Typography.Title level={1}>Block Summary</Typography.Title>
            </Col>
            <Col span={4}>
              <Button
                onClick={handleBackPress}
                style={{
                  backgroundColor: 'rgb(153, 127, 251)',
                  color: 'white',
                }}
              >
                Back
              </Button>
            </Col>
          </Row>

          <BlockDetails block={block} />
        </div>

        <div>
          <Row>
            <Typography.Title level={1}>Block Transactions </Typography.Title>
          </Row>

          <TransactionList
            transactions={block.tx}
            handleViewDetails={handleViewTxDetails}
          />
        </div>
      </div>
    );
  };

  return (
    <div className='block-details-main-wrapper'>
      {block ? renderBlock() : renderLoader()}
    </div>
  );
};

export default BlockDetailsPage;
