
import app from './app';

app.listen( (err: Error) => {
  if (err) return console.log(err);

  const port = process.env.PORT || 9001;
  return console.log(`server is listening on ${port}`);
})