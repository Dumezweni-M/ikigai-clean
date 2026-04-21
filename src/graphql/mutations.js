import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask(
    $taskItem: String!, 
    $pillar: String!, 
    $intensity: Int!, 
    $interval: String!, 
    $duration: Int, 
    $targetDays: Int
  ) {
    createTaskItem(
      taskItem: $taskItem, 
      pillar: $pillar, 
      intensity: $intensity, 
      interval: $interval, 
      duration: $duration, 
      targetDays: $targetDays
    ) {
      id
      taskItem
      pillar
      interval
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTaskItem($id: ID!, $intensity: Int!, $isChecked: Boolean!) {
    updateTaskItem(id: $id, intensity: $intensity, isChecked: $isChecked) {
      id
      intensity
      isChecked
    }
  }
`;

export const COMPLETE_TASK = gql`
  mutation CompleteTask($taskId: String!, $intensity: Int) {
    completeTask(taskId: $taskId, intensity: $intensity) {
      id
      completedAt
      intensity
    }
  }
`;

