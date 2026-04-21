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