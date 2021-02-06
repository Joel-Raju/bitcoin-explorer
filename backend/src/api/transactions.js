import resource from 'resource-router-middleware';
import transactionService from '../services/transactions';

export default ({ config, db }) =>
  resource({
    /** Property name to store preloaded entity on `request`. */
    id: 'transaction',

    /** For requests with an `id`, you can auto-load the entity.
     *  Errors terminate the request, success sets `req[id] = data`.
     */
    load(req, id, callback) {
      transactionService
        .getTransactionByHash(id)
        .then((res) => {
          callback(null, JSON.parse(res.body));
        })
        .catch((err) => {
          callback({ Error: err.response.body }, null);
        });
    },

    /** GET /:id - Return a given entity */
    read({ transaction }, res) {
      res.json(transaction);
    },

    // /** GET / - List all entities */
    // index({ params }, res) {},

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
