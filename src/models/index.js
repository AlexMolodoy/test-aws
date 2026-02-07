// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Todo, User, Profile, Post } = initSchema(schema);

export {
  Todo,
  User,
  Profile,
  Post
};