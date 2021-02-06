export namespace Transaction {
  export interface Transaction {
    hash: string;
    ver: number;
    vin_sz: number;
    vout_sz: number;
    size: number;
    weight: number;
    fee: number;
    relayed_by: string;
    lock_time: number;
    tx_index: number;
    double_spend: boolean;
    result: number;
    balance: number;
    time: number;
    block_index: number;
    block_height: number;
    inputs: Array<Input>;
    out: Array<Output>;
  }

  export interface Input {
    hash: string;
    sequence: number;
    witness: string;
    script: string;
    index: number;
    prev_out: {
      hash: string;
      value: string;
      tx_index: string;
      n: string;
    };
  }

  export interface Output {
    hash: string;
    type: number;
    spent: boolean;
    value: number;
    spending_outpoints: Array<{
      tx_index: number;
      n: number;
    }>;
    n: number;
    addr: string;
    tx_index: number;
    script: string;
  }
}
