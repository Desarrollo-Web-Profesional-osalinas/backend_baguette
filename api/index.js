import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import pedidoRoutes from '../src/routes/pedidoRoutes.js'; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error(err));

app.use('/api/v1', pedidoRoutes);

app.get('/', (req, res) => {
  res.send('Backend Baguette funcionando');
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Puerto: ${PORT}`);
  });
}

export default app;