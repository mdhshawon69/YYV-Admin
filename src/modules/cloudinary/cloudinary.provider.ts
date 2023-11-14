import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return v2.config({
      cloud_name: 'dubokuvxt',
      api_key: '878276932114939',
      api_secret: 'BvmGyHMQP5XBKu9wd8lN5c97tDw',
    });
  },
};
