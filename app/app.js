import express from 'express';
import bodyParser from 'body-parser';
import indexRoute from './routes/index';
import orderRoute from './routes/orders';
//  setting up the express application
const app = express();
const PORT = process.env.PORT || 3000;

//  parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(indexRoute);
app.use(orderRoute);
app.use((request, response) => {
  response.status(404).send('404 page');
});
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
export default app;
