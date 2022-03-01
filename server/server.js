const { ApolloServer, gql } = require("apollo-server");
const { products } = require("./data/index");

// this defines how our query will look (schema)
const typeDefs = gql`
  type Query {
    hello: String
    products: [Product!]!
    product(id: ID!): Product
  }

  type Product {
    name: String!
    description: String!
    quantity: Int!
    image: String!
    price: Float!
    onSale: Boolean!
  }
`;

// this defines the resolvers. they are functions that simply return the data based on the particular query
const resolvers = {
  Query: {
    hello: () => "John",
    products: () => products,
    product: (parent, args, context) => {
      const productId = args.id;

      const product = products.find((product) => product.id === productId);

      if (!product) return null;

      return product;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`server is running at ${url}`);
});
