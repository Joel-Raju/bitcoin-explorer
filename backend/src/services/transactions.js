import got from 'got';
import { BLOCKCHAIN_INFO_BASE_URL } from './constants';

const transactionService = (function () {
  return {
    getTransactionByHash: function (hash) {
      return got(`${BLOCKCHAIN_INFO_BASE_URL}/rawtx/${hash}?format=json`);
    },
  };
})();

export default transactionService;
