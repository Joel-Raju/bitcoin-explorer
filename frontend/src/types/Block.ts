import { Transaction } from './Transaction';

export interface Block {
  ver: number;
  next_block: Array<any>;
  time: number;
  bits: number;
  fee: number;
  nonce: number;
  n_tx: number;
  size: number;
  block_index: number;
  main_chain: boolean;
  height: number;
  weight: number;
  hash: string;
  prev_block: string;
  mrkl_root: string;
  tx: Array<Transaction.Transaction>;
}
