import http from '../utils/http';
import { Transaction } from '../types/Transaction';
import { HttpResult } from '../types/HttpResult';
import { RESOURCE_ENDPOINTS } from './constants';

export const getTransactionByHash = (
  hash: string
): Promise<HttpResult<Transaction.Transaction>> => {
  return http(`${RESOURCE_ENDPOINTS.TRANSACTIONS}/${hash}`, {
    method: 'GET',
  });
};
