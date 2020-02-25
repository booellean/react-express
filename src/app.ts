import express from 'express';
import {Request, Response} from 'express';
//body Parser
import * as bodyParser from 'body-parser';

// Import Api Routes
import { ApiController } from './routes/ApiRoutes';

// Import calls from dev.to
import call from './_helpers/devCalls';

class App {
  public app: express.Application;
  public router: express.Router;
  public api: ApiController = new ApiController();
  public url: string;

  constructor () {
    this.app = express();
    this.router = express.Router();
    // TODO: change this here?
    this.url = process.env.URL || 'http://localhost:9999/';

    this.config();
    this.mountRoutes();
  }

  private config(): void{
    this.app.use(express.static(__dirname + `/public`));
    this.app.set('view engine', 'pug');
    this.app.set('views', __dirname + `/public`);
    this.app.use(require('prerender-node'))
            .set('prerenderServiceUrl', this.url)
            .set('afterRender', function (err: Error, req: Request, res: Response) {
                console.log('URL: ', req.url);
            });
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.locals.title = 'Elle Pope Tech';
  }

  private mountRoutes (): void {
    // Mount our api routes first, and then declare seding any file to our React app!

    // NOTE: Put custom routes here. These will only make calls if the page loads here
    // For example, if you need to make an api call or gather DB data prior to sending request. 
    this.router.get('/blog/:id', async (req: Request, res: Response) => {
      return call.article(req.params.id)
      .then( (data: CustomObj) =>{
        return res.status(200).render(`index.pug`, { initialData: data });
      })
      .catch( (err: CustomObj) =>{
        return res.status(200).render(`index.pug`, { initialData: null, entry : null });
      })
    });

    this.router.get('/blog', async (req: Request, res: Response) => {
      console.log(req.query);
      return call.all()
      .then( (data: CustomObj) =>{
        return res.status(200).render(`index.pug`, { initialData : data });
      })
      .catch( (err: CustomObj) =>{
        return res.status(200).render(`index.pug`, { initialData : null });
      })
    });

    // Every route that doesn't need a call for state are taken care of here.
    this.router.get('*', (req: Request, res: Response) => {
      return res.status(200).render(`index.pug`, { initialData : null });
    });

    // Assign our API routes from earlier to avoid returning a 404
    this.api.routes(this.app);
    // Assign the router we created above!
    this.app.use('/', this.router);
  }
}

export default new App().app;