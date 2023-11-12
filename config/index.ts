import { config } from 'dotenv';

export const env = (): void => {
  switch (process.env.NODE_ENV) {
    case 'test':
      config({ path: '.env.test' });
      break;
    case 'production':
      config({ path: '.env.production' });
      break;
    case 'development':
      config({ path: '.env.development' });
      break;
    default:
      config();
  }
};
