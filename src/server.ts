import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import StudentResolver from "./graphql/resolvers/StudentResolver";
import GroupResolver from "./graphql/resolvers/GroupResolver";
import UnionResolver from "./graphql/resolvers/UnionResolver";

const PORT = process.env.PORT || 4000;

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [StudentResolver, GroupResolver, UnionResolver],
  });
  const apolloServer = new ApolloServer({ schema });
  const app = express();
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}/graphql`);
  });
};

bootstrap();
