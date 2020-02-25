import * as express from 'express';
import {Request, Response} from "express";
import call from '../_helpers/devCalls';

// NOTE: Create your API calls here! (These will be the routes that react call to)

export class ApiController {
  public router: express.Router;

  constructor () {
    this.router = express.Router();
  }

  public routes(app: express.Application): void {
    // NOTE: Override your locals in the Route!

    app.route('/api/articles')
    .get( async (req: Request, res: Response) =>{
      return call.all()
                  .then( (data: CustomObj) =>{
                    return res.json({
                      articles : data
                    })
                  })
                  .catch( (err: CustomObj) =>{
                    return res.json({
                      error : err
                    })
                  })
    });

    app.route('/api/article/:id')
    .get( async (req: Request, res: Response) =>{
      return call.article(req.params.id)
                  .then( (data: CustomObj) =>{
                    return res.json({
                      article : data
                    })
                  })
                  .catch( (err: CustomObj) =>{
                    return res.json({
                      error : err
                    })
                  })
    })
  }
}