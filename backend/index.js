require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// TYPE DEFINITIONS -----------------------------------------------------------
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

  type Mutation {
    createTaskItem(
      taskItem: String!,
      pillar: String!,
      intensity: Int!,
      interval: String!
    ): TaskItem!
  }
`;

// RESOLVERS ------------------------------------------------------------------
const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany();
    },

    taskItems: async () => {
      // Matches 'model taskItems' in schema.prisma
      return prisma.taskItem.findMany({
        include: {
          completions: true,
        },
      });
    },

    taskCompletions: async () => {
      // Matches 'model taskCompletions' in schema.prisma
      return prisma.taskCompletion.findMany();
    }
  },

  Mutation: {
    createTaskItem: async (_, { taskItem, pillar, intensity, interval }) => {
        return prisma.taskItem.create({
        data: {
          taskItem,
          pillar,
          intensity,
          interval,
          isChecked: false,
        },
      });
    },
  }
};

// INITIALIZE AND START SERVER ------------------------------------------------ 
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 4000, host: '0.0.0.0' }).then(({ url }) => {
  console.log("🚀 GraphQL 🚀 running at " + url);
});