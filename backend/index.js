import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import dalleRoutes from './routes/dalleRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.send('hello from dall-e');
});

async function startServer() {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
