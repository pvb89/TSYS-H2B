import express from 'express';
import cors from 'cors'
import { predictRouter } from './routes/predict.route';
import { dataRouter } from './routes/data.route';

const corsOptions = {
    origin: '*',
};

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('TSYS - H2B - Image Classifier');
})

app.use('/predict', predictRouter);
app.use('/data', dataRouter);

app.listen(PORT, () => {
    console.log(`Running server at http://localhost:${PORT}`);
})