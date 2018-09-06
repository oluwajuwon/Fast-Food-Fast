import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';
//  setting up the express application
const app = express();
const port = 8000;
//  parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
export default app;
