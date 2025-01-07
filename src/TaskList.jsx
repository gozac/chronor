import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TaskService } from "../services/TaskService";

const TaskList = ({ tasks }) => (
  <table>
    <thead>
      <tr>
        <th>Task</th>
        <th>User</th>
        <th>Start Date</th>
        <th>End Date</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map(task => (
        <tr key={task.id}>
          <td>{task.name}</td>
          <td>{task.userId}</td>
          <td>{task.startDate}</td>
          <td>{task.endDate}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default function TaskListContainer() {
  const { data: tasks = [], isLoading } = useQuery(["tasks"], TaskService.list);

  if (isLoading) return <p>Loading tasks...</p>;

  return <TaskList tasks={tasks} />;
}
