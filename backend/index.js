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
    intensity: Int
    isChecked: Boolean!
    interval: String!
    duration: Int
    targetDays: Int
    createdAt: String!
    lastCompletedAt: String
    completions: [TaskCompletion!]!
  }

  type TaskCompletion {
    id: ID!
    taskId: String!
    completedAt: String!
    intensity: Int
    pillar: String!   
  }

  type Query {
    users: [User!]!
    taskItems: [TaskItem!]!
    taskCompletions: [TaskCompletion!]!
    achievedGoals: [AchievedGoal!]!
  }

  type Mutation {
    createTaskItem(
      taskItem: String!,
      pillar: String!,
      intensity: Int,
      interval: String!,
      duration: Int,
      targetDays: Int
    ): TaskItem!

    completeTask(taskId: String!, intensity: Int): TaskCompletion!
  }

  type AchievedGoal {
    id: ID!
    originalHabitId: String!
    title: String!
    pillar: String!
    finalCount: Int!
    targetDays: Int!
    avgIntensity: Float!
    startedAt: String!
    achievedAt: String!
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
          createdAt: 'desc',
        },
        include: {
          completions: {
            orderBy: {
              completedAt: 'desc',
            },
          },
        },
      });

      return items.map((item) => {
        const latestCompletionDate = item.lastCompletedAt || item.completions[0]?.completedAt;

        return {
          ...item,
          createdAt: item.createdAt.toISOString(),
          lastCompletedAt: latestCompletionDate ? latestCompletionDate.toISOString() : null,
          completions: item.completions.map((c) => ({
            ...c,
            completedAt: c.completedAt.toISOString(),
          })),
        };
      });
    },

    taskCompletions: async () => {
      const completions = await prisma.taskCompletion.findMany({
        orderBy: { completedAt: 'desc' },
      });

      return completions.map((c) => ({
        ...c,
        completedAt: c.completedAt.toISOString(),
      }));
    },

    achievedGoals: async () => {
  try {
    const goals = await prisma.achievedGoals.findMany({ 
      orderBy: { achievedAt: 'desc' },
    });

    return goals.map((g) => ({
      ...g,
      // Map 'originalHabitId' schema to 'originalTaskId' for GQL type
      originalTaskId: g.originalHabitId, 
      startedAt: g.startedAt.toISOString(),
      achievedAt: g.achievedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Query Error in achievedGoals:", error);
    throw new Error("Could not fetch archived goals");
  }
},
  },

  Mutation: {
    createTaskItem: async (_, { taskItem, pillar, intensity, interval, duration, targetDays }) => {
      try {
        const newItem = await prisma.taskItem.create({
          data: {
            taskItem,
            pillar,
            intensity: null,
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
        throw new Error(`Failed to create task: ${error.message}`);
      }
    },

    completeTask: async (_, { taskId, intensity }) => {
      try {
        // 1. Fetch task and its completion history to check progress
        const task = await prisma.taskItem.findUnique({
          where: { id: taskId },
          include: { completions: true },
        });

        if (!task) throw new Error("Task not found");

        const newIntensity = intensity ?? 1;
        const currentCount = task.completions.length + 1;

        // 2. ARCHIVE LOGIC: Check if targetDays is reached
        if (task.targetDays && currentCount >= task.targetDays) {
          // Calculate average intensity for the archive snapshot
          const allIntensities = [...task.completions.map((c) => c.intensity || 0), newIntensity];
          const avgIntensity = allIntensities.reduce((a, b) => a + b, 0) / allIntensities.length;

          // Execute as a transaction: Create Archive -> Delete Active
          return await prisma.$transaction(async (tx) => {
            await tx.achievedGoals.create({
              data: {
                originalHabitId: task.id,
                title: task.taskItem,
                pillar: task.pillar,
                finalCount: currentCount,
                targetDays: task.targetDays,
                avgIntensity: avgIntensity,
                avgFulfillment: 0, // Placeholder if you add fulfillment later
                startedAt: task.createdAt,
              },
            });

            await tx.taskItem.delete({
              where: { id: taskId },
            });

            // Return a virtual completion object for GQL type safety
            return {
              id: `ARCHIVED_${task.id}`,
              taskId: taskId,
              completedAt: new Date().toISOString(),
              intensity: newIntensity,
              pillar: task.pillar,
            };
          });
        }

        // 3. STANDARD LOGIC: Target not reached, just log completion
        const completion = await prisma.taskCompletion.create({
          data: {
            taskId: taskId,
            intensity: newIntensity,
            pillar: task.pillar,
          },
        });

        await prisma.taskItem.update({
          where: { id: taskId },
          data: { 
            isChecked: true,
            lastCompletedAt: new Date()
          },
        });

        return {
          ...completion,
          completedAt: completion.completedAt.toISOString(),
        };
      } catch (error) {
        console.error("Mutation error:", error);
        throw error;
      }
    },
  },
};

// INITIALIZE AND START SERVER ------------------------------------------------ 
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 4000, host: '0.0.0.0' }).then(({ url }) => {
  console.log("🚀 GraphQL 🚀 running at " + url);
});