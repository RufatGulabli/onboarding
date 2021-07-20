const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./graphql/typedefs");
const { resolvers } = require("./graphql/resolvers");

const app = express();
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
});

