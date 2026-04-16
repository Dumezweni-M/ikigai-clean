require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();





// TYPE DEFINITIONS ---------------------------------------------------------------------------------

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

 type TaskItem {
  id: ID!
  taskItem: String!
  pillar: String!
  intensity: Int!
  isChecked: Boolean!
  interval: String!
  createdAt: String!

  completions: [TaskCompletion!]!
}

  type TaskCompletion {
    id: ID!
    taskId: String!
    completedAt: String!
  }

  
  type Query {
    users: [User!]!
    taskItems: [TaskItem!]!
    taskCompletions: [TaskCompletion!]!

  }
`;


// RESOLVERS ---------------------------------------------------------------------------------

const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany();
    },

    taskItems: async () => {
      return prisma.taskItems.findMany({
        include: {
          completions: true,
        },
      });
    },

    taskCompletions: async () => {
      return prisma.taskCompletions.findMany();
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 4000, host:'0.0.0.0' }).then(({ url }) => {
  console.log("🚀 GraphQL 🚀 running at " + url);
});