/*
-------------
Instructions:
-------------
- Create the following queries using the REST endpoints specified below.

query starwarsCharacterById(id: Int) {
  id
  name
  gender
  films {
    id
    title
    episodeId
    characters {
      id
      name
      gender
    }
  }
}

query starwarsFilmById(id: Int) {
  id
  title
  episodeId
  director
  characters {
    id
    name
    gender
  }
}

----------------------
REST datasources for to use:
----------------------
GET https://swapi.dev/api/films/1/
GET https://swapi.dev/api/people/1/
*/

const gql = require('graphql-tag');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

// here are 2 client libraries installed for your use
const axios = require('axios');
const fetch = require('node-fetch');

// =================
// type definitions and resolvers
// =================
const typeDefs = gql``;

const resolvers = {};

// =================
// configure the server
// =================
const port = 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// =================
// start / turn-on the server
// =================
startStandaloneServer(server, { listen: { port } }).then(({ url }) => {
  console.log(`The pure graphql server is ready at http://localhost:${port}`);
});
