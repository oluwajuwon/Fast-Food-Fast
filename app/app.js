import express from 'express';
import bodyParser from 'body-parser';
import indexRoute from './routes/indexRoute';
import orderRoute from './routes/orderRoute';
import foodRoute from './routes/foodRoute';
import userRoute from './routes/userRoute';
//  setting up the express application
const app = express();
const PORT = process.env.PORT || 3000;

//  parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(indexRoute);
app.use(orderRoute);
app.use(foodRoute);
app.use(userRoute);
app.use((request, response) => {
  response.status(404).send('404 page');
});
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
export default app;
