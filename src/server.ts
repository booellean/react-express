
import app from './app';
import helmet from 'helmet';
import * as fs from 'fs';
import * as https from 'https';

const port = process.env.PORT || 80;
const options = {};
// const options = {
//     key: fs.readFileSync("/srv/www/keys/my-site-key.pem"),
//     cert: fs.readFileSync("/srv/www/keys/chain.pem")
// };

app.disable('x-powered-by');
app.use(helmet());

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});

// https.createServer(options, app).listen(port);