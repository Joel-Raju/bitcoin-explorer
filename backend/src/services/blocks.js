import got from 'got';
import { isValidTimestamp } from '../utils/validation';
import { BLOCKCHAIN_INFO_BASE_URL } from './constants';

const blockService = (function () {
  return {
    getBlocks: function (timestamp) {
      if (timestamp) {
        if (isValidTimestamp(timestamp)) {
          const ts = Number(timestamp) * 1000;
          return got(`${BLOCKCHAIN_INFO_BASE_URL}blocks/${ts}?format=json`);
        } else {
          throw new Error('Invalid Timestamp');
        }
      }

      return got(`${BLOCKCHAIN_INFO_BASE_URL}blocks?format=json`);
    },

    getBlockByHash: function (hash) {
      return got(`${BLOCKCHAIN_INFO_BASE_URL}/rawblock/${hash}`);
    },
  };
})();

export default blockService;
