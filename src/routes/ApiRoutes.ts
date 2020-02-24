import * as express from 'express';
import {Request, Response} from "express";
import call from '../_helpers/devCalls';

export class ApiController {
  public router: express.Router;

  constructor () {
    this.router = express.Router();
  }

  public routes(app: express.Application): void {
    // NOTE: Override your locals in the Route!

    app.route('/api/articles')
    .get( async (req: Request, res: Response) =>{
      return call.published()
                        .then( (data: CustomObj) =>{
                          return res.json({
                            data
                          })
                        })
                        .catch( (err: CustomObj) =>{
                          return res.json({
                            err
                          })
                        })
    })
  }
}