// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Post, CMImage, Gallery } = initSchema(schema);

export {
  Post,
  CMImage,
  Gallery
};