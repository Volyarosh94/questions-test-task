import express from 'express';
import cors from 'cors';
import { AppDataSource } from './db/dataSource';
import { authRouter } from './routes/auth.router';
import { questionRouter } from './routes/question.router';

const app = express();
const port = 8080 || process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/questions', questionRouter);

(async () => {
  try {
    await AppDataSource.initialize()
    await app.listen(port);
    console.log(`Server is running on ${port}`);
    console.log('Connected with DB is OK!');
  } catch (error) {
    console.log(error);
    process.exit(1);
  };
})();

process.on('SIGINT', async () => {
  try {
    await AppDataSource.destroy();
    console.log('Disconnected from DB is OK!');
    process.exit(0);
  } catch (error) {
    console.log('Error during disconnection', error);
    process.exit(1);
  }
});
