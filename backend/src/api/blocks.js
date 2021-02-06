import resource from 'resource-router-middleware';
import blockService from '../services/blocks';

export default ({ config, db }) =>
  resource({
    /** Property name to store preloaded entity on `request`. */
    id: 'block',

    load(req, id, callback) {
      blockService
        .getBlockByHash(id)
        .then((res) => {
          callback(null, JSON.parse(res.body));
        })
        .catch((err) => {
          callback({ Error: err.response.body }, null);
        });
    },

    /** GET / - List all entities */
    index({ query: { timestamp } }, res) {
      blockService
        .getBlocks(timestamp)
        .then((result) => {
          res.json(JSON.parse(result.body));
        })
        .catch((err) => {
          res.status(400).json({ Error: err.response.body });
        });
    },

    /** GET /:id - Return a given entity */
    read({ block }, res) {
      res.json(block);
    },

    // /** POST / - Create a new entity */
    // create({ body }, res) {
    //   body.id = facets.length.toString(36);
    //   facets.push(body);
    //   res.json(body);
    // },

    // /** PUT /:id - Update a given entity */
    // update({ facet, body }, res) {
    //   for (let key in body) {
    //     if (key !== 'id') {
    //       facet[key] = body[key];
    //     }
    //   }
    //   res.sendStatus(204);
    // },

    // /** DELETE /:id - Delete a given entity */
    // delete({ facet }, res) {
    //   facets.splice(facets.indexOf(facet), 1);
    //   res.sendStatus(204);
    // },
  });
