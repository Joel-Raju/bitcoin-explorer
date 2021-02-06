import React, { useEffect, useMemo, useState } from 'react';
import { Pagination, Card } from 'antd';
import { Transaction } from '../../types/Transaction';
import TransactionItem from './TransactionItem';

interface Props {
  transactions: Transaction.Transaction[];
  handleViewDetails: (transaction: Transaction.Transaction) => any;
}

const TX_PER_PAGE = 5;

const TransactionList: React.FC<Props> = ({
  transactions,
  handleViewDetails,
}) => {
  const [txToDisplay, setTxToDisplay] = useState<
    Array<Transaction.Transaction>
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageCount: number = useMemo(
    () => Math.ceil(transactions.length / TX_PER_PAGE),
    [transactions]
  );

  useEffect(() => {
    const startIndex =
      currentPage === 1 ? 0 : currentPage * TX_PER_PAGE - TX_PER_PAGE;
    const endIndex = currentPage ? currentPage * TX_PER_PAGE : TX_PER_PAGE;

    setTxToDisplay(transactions.slice(startIndex, endIndex));
  }, [transactions, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Card
        bordered
        style={{
          width: '75rem',
          marginBottom: '2rem',
          borderRadius: '4px',
          backgroundColor: 'rgba(255,255,255,0.8)',
        }}
      >
        {txToDisplay.map((tx) => (
          <TransactionItem
            key={tx.hash}
            transaction={tx}
            onClickView={() => handleViewDetails(tx)}
          />
        ))}
      </Card>

      <Pagination
        showSizeChanger={false}
        defaultCurrent={currentPage}
        total={pageCount}
        onChange={handlePageChange}
        pageSize={1}
      />
    </div>
  );
};

export default TransactionList;
