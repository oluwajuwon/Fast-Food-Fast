import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';
//  setting up the express application
const app = express();
// const port = 3000;
const PORT = process.env.PORT;
//  parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.use((req, res, next) => {
  res.status(404).send('404 page');
});
app.listen(PORT);
/*  app.listen(port, () => {
  console.log(`Server running on ${port}`);
}); */
export default app;
