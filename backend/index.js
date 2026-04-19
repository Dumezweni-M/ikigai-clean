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
    intensity: Int!
    pillar: String!   # Corrected case to lowercase 'p'
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
      interval: String!,
      duration: Int,
      targetDays: Int
    ): TaskItem!

    completeTask(taskId: String!, intensity: Int!): TaskCompletion!
  }
`;

// RESOLVERS ------------------------------------------------------------------
const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany();
    },

    taskItems: async () => {
      const items = await prisma.taskItem.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          completions: true,
        },
      });

      return items.map((item) => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
        completions: item.completions.map((c) => ({
          ...c,
          completedAt: c.completedAt.toISOString(),
        })),
      }));
    },

    taskCompletions: async () => {
      const completions = await prisma.taskCompletion.findMany();

      return completions.map((c) => ({
        ...c,
        completedAt: c.completedAt.toISOString(),
        // pillar is now handled directly by the DB field
      }));
    }
  },

  Mutation: {
    createTaskItem: async (_, { taskItem, pillar, intensity, interval, duration, targetDays }) => {
      try {
        const newItem = await prisma.taskItem.create({
          data: {
            taskItem,
            pillar,
            intensity,
            interval,
            duration,
            targetDays,
            isChecked: false,
          },
        });
        return {
          ...newItem,
          createdAt: newItem.createdAt.toISOString(),
          completions: [],
        };
      } catch (error) {
        console.error("Failed to create a task item:", error);
      }
    },

    completeTask: async (_, { taskId, intensity }) => {
      try {
        // 1. Fetch parent task to get the pillar name
        const parentTask = await prisma.taskItem.findUnique({
          where: { id: taskId }
        });

        if (!parentTask) throw new Error("Task not found");

        // 2. Create completion WITH the pillar field
        const completion = await prisma.taskCompletion.create({
          data: {
            taskId: taskId,
            intensity: intensity,
            pillar: parentTask.pillar, // This satisfies the DB requirement
          },
        });

        // 3. Mark the task as checked
        await prisma.taskItem.update({
          where: { id: taskId },
          data: { isChecked: true }
        });

        return {
          ...completion,
          completedAt: completion.completedAt.toISOString(),
        };
      } catch (error) {
        console.error("Mutation error:", error);
        throw error;
      }
    }
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