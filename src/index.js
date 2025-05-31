import {app} from './utils/app.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;


app.listen(port || 9000, () => {
  console.log(`Server is listening on port ${port || 9000}`);
});
