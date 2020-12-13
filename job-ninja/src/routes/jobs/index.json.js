import { jobs } from './_data.js';

export function get(req, res, next) {
  /*
  Note:
    Like express:
      req = request info
      res = for response handling
      next = for the next middleware in the stack
  */

  // Query the database (or just query a file on the server...)

  res.end(JSON.stringify(jobs))
}