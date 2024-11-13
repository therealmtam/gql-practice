const gql = require('graphql-tag');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { buildSubgraphSchema } = require('@apollo/subgraph');

// here are 2 client libraries installed for your use
const axios = require('axios');
const fetch = require('node-fetch');

// =================
// type definitions and resolvers
// =================

const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.1", import: ["@key", "@shareable"])

  # shared type
  type VehicleUrl @shareable {
    name: String
  }

  # shared entity
  type Character @key(fields: "id") {
    id: ID!
    name: String
    gender: String
  }

  type Query {
    starwarsCharacterById(id: ID!): Character
    vehicleUrlsByCharacterId(id: ID!): [VehicleUrl!]!
  }
`;

const resolvers = {
  Character: {
    __resolveReference: async (reference, context, info) => {},
  },
  Query: {
    starwarsCharacterById: async (parent, args, context, info) => {},
    vehicleUrlsByCharacterId: async (parent, args, context, info) => {},
  },
};

// =================
// configure the server
// =================
const port = 4001;

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

// =================
// start / turn-on the server
// =================
startStandaloneServer(server, { listen: { port } }).then(({ url }) => {
  console.log(`The graphql server containing the Character subgraph is ready at http://localhost:${port}`);
});
