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
      createdAt
      completions {
        id
        completedAt
      }
    }
  }
`;