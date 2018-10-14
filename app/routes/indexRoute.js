import express from 'express';

const router = express.Router();
router.get('/', (request, response) => {
  response.sendFile('/index.html');
});
router.get('/api/v1', (request, response) => {
  response.json({ hello: 'Welcome to Fast-Food-Fast API endpoints by Oluwajuwon Fagbohungbe, Please enjoy and give feedback!' });
});

export default router;
