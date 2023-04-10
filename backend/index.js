import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import dalleRoutes from './routes/dalleRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDI8NjAmt1E6y7gOHcZMUzbyeGr170whoI',
  authDomain: 'alexis-ai-d2e7a.firebaseapp.com',
  projectId: 'alexis-ai-d2e7a',
  storageBucket: 'alexis-ai-d2e7a.appspot.com',
  messagingSenderId: '744319596242',
  appId: '1:744319596242:web:f9a0b08645933c5d4e9f0b',
};

const app2 = initializeApp(firebaseConfig);

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
