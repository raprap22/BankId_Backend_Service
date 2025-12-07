import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { Application } from 'express';

export function swaggerDocs(app: Application) {
  const filePath = path.join(process.cwd(), 'swagger.json');
  const swaggerData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerData));

  console.log('📄 Swagger running at /api-docs');
}
