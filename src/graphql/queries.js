import { gql } from "@apollo/client";


export const GET_TASKS = gql`
  query GetTasks {
    taskItems {
      id
      taskItem
      pillar
      intensity
      isChecked
      interval
      duration
      targetDays
      createdAt
      lastCompletedAt
      completions {
        id
        completedAt
      }
    }
  }
`;



export const GET_COMPLETIONS = gql`
  query GetCompletions {
    taskCompletions {
      id
      completedAt
      pillar
      intensity
    }
  }
`;


export const GET_ACHIEVED_GOALS = gql`
  query GetAchievedGoals {
    achievedGoals {
      id
      originalHabitId
      title
      pillar
      finalCount
      targetDays
      avgIntensity
      startedAt
      achievedAt
    }
  }
`;