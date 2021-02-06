import http from '../utils/http';
import { Block } from '../types/Block';
import { HttpResult } from '../types/HttpResult';
import { RESOURCE_ENDPOINTS } from './constants';

export const getBlocks = (
  timestamp: number
): Promise<HttpResult<{ blocks: Block[] }>> => {
  return http(`${RESOURCE_ENDPOINTS.BLOCKS}?timestamp=${timestamp}`, {
    method: 'GET',
  });
};

export const getBlockByHash = (hash: string): Promise<HttpResult<Block>> => {
  return http(`${RESOURCE_ENDPOINTS.BLOCKS}/${hash}`, {
    method: 'GET',
  });
};
