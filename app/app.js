import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import indexRoute from './routes/index';
import orderRoute from './routes/orders';
import userRoute from './routes/users';
import foodRoute from './routes/food';
//  setting up the express application
const app = express();
const PORT = process.env.PORT || 3000;

//  parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  Initialize the express validator to validate the incoming requests
app.use(expressValidator());

app.use(indexRoute);
app.use(orderRoute);
app.use(userRoute);
app.use(foodRoute);
app.use((request, response) => {
  response.status(404).send('404 page');
});

//  Start the Server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
export default app;
