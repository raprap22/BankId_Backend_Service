import app from './app';
import dotenv from 'dotenv';
import { swaggerDocs } from './swagger';

dotenv.config();

const PORT = process.env.PORT || 3000;

swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
