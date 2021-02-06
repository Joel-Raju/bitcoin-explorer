# Bitcoin Explorer

Explore latest Bitcoin blocks and transaction details.

## Frontend

The frontend code is present in the `frontend` dir. Instructions to run it are in `frontend/README.md`.

### Overview

There are 3 main pages

- Block list page - This is the landing page and shows a list of blocks.
- Block details page - Clicking on a block in the landing page will show this page with block details
- Transaction details page - Clicking on **View Details** on the block details page will show this page

[Ant Design](https://ant.design/) is used for styling.

### Caching & optimisation

Data fetching is optimized by caching it in memory. For this, Repository pattern is implemented by creating Singleton classes for `BlockListRepo`, `BlockRepo` and `TransactionRepo`. Network request is only made when data is not found in the repository cached datasource.

## Backend

The backend code is present in the `backend` dir. Instructions to run it are in `backend/README.md`

### Overview

There are 3 main endpoints

- GET /api/blocks?timestamp=**${timestamp}** - Returns the list of blocks during this timestamp
- GET /api/blocks/**${blockhash}** - Returns the details of the block
- GET /api/transactions/**${txhash}** - Returns the details of the transaction

### Caching

**browser http caching**

`httpCache` middleware caches `GET` requests on the browser using the `Cache-Control` header

**in memory caching**

`cacheMiddleware` caches the response of `GET` requests with `url` as key. On subsequent requests, the data from the cache is returned if present.

### Tests

Basic tests for endpoints have been implemented using `chai`, `supertest` & `mocha`.
