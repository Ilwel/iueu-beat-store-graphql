
import 'reflect-metadata'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import { relationResolvers } from "@generated/type-graphql";
import { buildSchema, NonEmptyArray } from 'type-graphql';
import { context } from './context'
import resolvers from './resolvers';

const app = async () => {

  const schema = await buildSchema({
    resolvers: [...resolvers, ...relationResolvers] as NonEmptyArray<Function>,
    validate: false,
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 8000 },
    context
  });

  return url;
}

app().then((url) => {

  console.log(`🚀  Server ready at: ${url}`);

})