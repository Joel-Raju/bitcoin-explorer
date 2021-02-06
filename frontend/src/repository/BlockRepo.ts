import { Block } from '../types/Block';
import { getBlockByHash as getBlockByHashRequest } from '../api/blocks';
import { HttpResult } from '../types/HttpResult';

export class BlockRepo {
  private static instance: BlockRepo;

  private constructor() {}

  private blocks: { [hash: string]: Block } = {};

  public static getInstance(): BlockRepo {
    if (!BlockRepo.instance) {
      BlockRepo.instance = new BlockRepo();
    }

    return BlockRepo.instance;
  }

  private setBlock(block: Block) {
    this.blocks[block.hash] = block;
  }

  public clear() {
    this.blocks = {};
  }

  public getBlockByHash(hash: string): Promise<HttpResult<Block>> {
    return new Promise(async (resolve) => {
      if (this.blocks[hash]) {
        return resolve({ response: this.blocks[hash] });
      }

      const { error, response } = await getBlockByHashRequest(hash);

      if (response && !error) {
        this.setBlock(response);
      }

      resolve({ error, response });
    });
  }
}
