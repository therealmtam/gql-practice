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
  # add this to support the @shareable directive
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.1"
      import: ["@key", "@shareable"]
    )

  # shared type
  type VehicleUrl @shareable {
    name: String
  }

  type Film {
    id: ID!
    title: String
    episodeId: Int
    director: String
    characters: [Character!]!
  }

  # shared entity
  type Character @key(fields: "id") {
    id: ID!
    films: [Film!]!
  }

  # in a federated graph, the Query type is owned by the gateway and thus all subgraph gql servers just extend from it
  extend type Query {
    starwarsFilmById(id: ID!): Film
    vehicleUrlsByFilmId(id: ID!): [VehicleUrl!]!
  }
`;

const resolvers = {
  Character: {
    films: async (parent, args, context, info) => {},
  },
  Film: {
    characters: (parent, args, context, info) => {},
  },
  Query: {
    starwarsFilmById: async (parent, args, context, info) => {},
    vehicleUrlsByFilmId: async (parent, args, context, info) => {},
  },
};

// =================
// configure the server
// =================
const port = 4002;

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

// =================
// start / turn-on the server
// =================
startStandaloneServer(server, { listen: { port } }).then(({ url }) => {
  console.log(
    `The graphql server containing the Missions subgraph is ready at http://localhost:${port}`
  );
});
