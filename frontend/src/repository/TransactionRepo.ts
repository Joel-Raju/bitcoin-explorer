import { Transaction } from '../types/Transaction';
import { getTransactionByHash as getTransactionByHashRequest } from '../api/transactions';
import { HttpResult } from '../types/HttpResult';

export class TransactionRepo {
  private static instance: TransactionRepo;

  private transactions: { [txhash: string]: Transaction.Transaction } = {};

  public static getInstance(): TransactionRepo {
    if (!TransactionRepo.instance) {
      TransactionRepo.instance = new TransactionRepo();
    }

    return TransactionRepo.instance;
  }

  private setTransaction(transaction: Transaction.Transaction) {
    this.transactions[transaction.hash] = transaction;
  }

  public clear() {
    this.transactions = {};
  }

  public getTransactionByHash(
    hash: string
  ): Promise<HttpResult<Transaction.Transaction>> {
    return new Promise(async (resolve) => {
      if (this.transactions[hash]) {
        return resolve({ response: this.transactions[hash] });
      }

      const { error, response } = await getTransactionByHashRequest(hash);

      if (response && !error) {
        this.setTransaction(response);
      }

      resolve({ error, response });
    });
  }
}
