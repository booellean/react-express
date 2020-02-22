import express from 'express';
import {Request, Response} from "express";
//body Parser
import * as bodyParser from 'body-parser';
//Routes imported
// import { ApiRoutes } from './routes/apiRoutes';
// import { WebRoutes } from './routes/webRoutes';

class App {
  public app: express.Application;
//   public apiRoute: ApiRoutes = new ApiRoutes();
//   public webRoute: WebRoutes = new WebRoutes();

  constructor () {
    this.app = express();
    this.config();
    // this.apiRoute.apiRoutes(this.app);
    // this.webRoute.webRoutes(this.app);
  }

  // private mountRoutes (): void {
  //   const router = express.Router();
  //   this.app.use( express.static(__dirname + '/public'));

  //   router.get('/', (req: Request, res: Response) => {
  //     // res.json({
  //     //   message: 'Hello World!'
  //     // });
  //     res.sendFile('index.html', { root: __dirname + '/public' } );
  //   });
  //   this.app.use('/', router);
  // }

  private config(): void{
    this.app.use(express.static(__dirname + `/dist/public`));
    this.app.set('view engine', 'ejs');
    this.app.set('views', __dirname + `/views`);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
}

export default new App().app;