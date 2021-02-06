import { version } from '../../package.json';
import { Router } from 'express';
import transactions from './transactions';
import blocks from './blocks';

export default ({ config, db }) => {
  let api = Router();

  api.use('/blocks', [blocks({ config, db })]);
  api.use('/transactions', [transactions({ config, db })]);

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
};
