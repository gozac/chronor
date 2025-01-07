import React, { useState, useEffect } from "react";
import { TaskService } from "../services/TaskService.ts";

export default function TaskForm({
  initialTask = null,
  onTaskCreated,
  onTaskUpdated,
}) {
  const [task, setTask] = useState(
    initialTask || { user_id: "", start: "", end: "" }
  );

  useEffect(() => {
    if (initialTask) setTask(initialTask);
  }, [initialTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.id) {
      const updatedTask = await TaskService.put(task.id, {
        ...task,
        user_id: parseInt(task.user_id),
        start: new Date(task.start),
        end: new Date(task.end),
      });
      onTaskUpdated(updatedTask);
    } else {
      const newTask = await TaskService.post({
        ...task,
        user_id: parseInt(task.user_id),
        start: new Date(task.start),
        end: new Date(task.end),
      });
      onTaskCreated(newTask);
    }
    setTask({ user_id: "", start: "", end: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        id="user_id"
        value={task.user_id}
        onChange={handleChange}
        placeholder="User ID"
      />
      <input
        type="date"
        id="start"
        value={task.start}
        onChange={handleChange}
      />
      <input
        type="date"
        id="end"
        value={task.end}
        onChange={handleChange}
      />
      <button type="submit">{task.id ? "Update Task" : "Add Task"}</button>
    </form>
  );
}
