const { ApolloServer, gql } = require("apollo-server");

// this defines how our query will look (schema)
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// this defines the resolvers. they are functions that simply return the data based on the particular query
const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url, ...args }) => {
  console.log(args);
  console.log(`server is running at ${url}`);
});
