import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Col, Row, Skeleton, Typography } from 'antd';
import { Transaction } from '../../types/Transaction';
import { TransactionRepo } from '../../repository/TransactionRepo';
import TransactionSummary from './TransactionSummary';
import './style.css';
import InputList from './InputList';
import OutputList from './OutputList';

const TransactionDetailsPage: React.FC = () => {
  const { hash } = useParams<{ hash: string }>();
  const history = useHistory();
  const [transaction, setTransaction] = useState<Transaction.Transaction>();

  useEffect(() => {
    async function fetchTransactionDetails() {
      const transactionRepo = TransactionRepo.getInstance();
      const { response, error } = await transactionRepo.getTransactionByHash(
        hash
      );

      if (response && !error) {
        setTransaction(response);
      }
    }

    fetchTransactionDetails();
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

  const renderTransaction = () => {
    if (!transaction) {
      return;
    }

    return (
      <div>
        <div style={{ marginBottom: '4rem' }}>
          <Row>
            <Col span={20}>
              <Typography.Title level={1}>Transaction</Typography.Title>
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

          <TransactionSummary transaction={transaction} />
        </div>

        <div>
          <Row>
            <Typography.Title level={1}>Inputs </Typography.Title>
          </Row>

          <InputList inputs={transaction.inputs} />
        </div>

        <div>
          <Row>
            <Typography.Title level={1}>Outputs </Typography.Title>
          </Row>

          <OutputList outputs={transaction.out} />
        </div>
      </div>
    );
  };

  return (
    <div className='transaction-details-main-wrapper'>
      {transaction ? renderTransaction() : renderLoader()}
    </div>
  );
};

export default TransactionDetailsPage;
