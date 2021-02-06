import { Block } from '../types/Block';
import { getBlocks as getBlocksRequest } from '../api/blocks';
import { HttpResult } from '../types/HttpResult';

interface BlocksResponse {
  blocks: Array<Block>;
}

const TIME_INTERVAL_IN_SEC = 15 * 60; // 15 min

export class BlockListRepo {
  private static instance: BlockListRepo;

  private constructor() {}

  private blockList: { [timestamp: string]: BlocksResponse } = {};

  public static getInstance(): BlockListRepo {
    if (!BlockListRepo.instance) {
      BlockListRepo.instance = new BlockListRepo();
    }

    return BlockListRepo.instance;
  }

  private setBlock(timestamp: number, blockResp: BlocksResponse) {
    this.blockList[timestamp] = blockResp;
  }

  public clear() {
    this.blockList = {};
  }

  public getBlocks(
    timestamp: number
  ): Promise<
    HttpResult<{
      blocks: Block[];
    }>
  > {
    const tsList = Object.keys(this.blockList);
    const nearestTsList = tsList.filter(
      (ts) => Math.abs(Number(ts) - timestamp) < TIME_INTERVAL_IN_SEC
    );

    return new Promise(async (resolve) => {
      if (nearestTsList.length) {
        const [nearestTs] = nearestTsList;
        return resolve({ response: this.blockList[nearestTs] });
      }

      const { error, response } = await getBlocksRequest(timestamp);

      if (response && !error) {
        this.setBlock(timestamp, response);
      }

      resolve({ error, response });
    });
  }
}
