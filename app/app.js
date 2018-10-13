import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import cors from 'cors';
import indexRoute from './routes/indexRoute';
import orderRoute from './routes/orderRoute';
import userRoute from './routes/userRoute';
import foodRoute from './routes/foodRoute';
//  setting up the express application
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

//  parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  Initialize the express validator to validate the incoming requests
app.use(expressValidator());

app.use(indexRoute);
app.use(orderRoute);
app.use(userRoute);
app.use(foodRoute);
app.use(userRoute);
app.use((request, response) => {
  response.status(404).send('404 page');
});
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
export default app;
