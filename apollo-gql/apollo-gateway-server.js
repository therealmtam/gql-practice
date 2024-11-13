const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');

// =================
// configure the server
// =================
const port = 4000;

// Initialize an ApolloGateway instance and pass it
// the supergraph schema as a string
const supergraphSdl = new IntrospectAndCompose({
  subgraphs: [
    { name: 'characters', url: 'http://localhost:4001' },
    { name: 'films', url: 'http://localhost:4002' },
  ],
});

const gateway = new ApolloGateway({
  supergraphSdl,
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,
});

// =================
// start / turn-on the server
// =================
startStandaloneServer(server, { listen: { port } }).then(({ url }) => {
  console.log(`🚀  The Apollo gateway server is ready at ${url}`);
});
