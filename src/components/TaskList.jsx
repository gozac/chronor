import React, { useState } from "react";
import { TaskService } from "../services/TaskService.ts";
import TaskForm from "./TaskForm";

export default function TaskList({ tasks, onTasksUpdated, onTaskDeleted, conflicts }) {
  const [editingTask, setEditingTask] = useState(null);

  const handleDelete = async (taskId) => {
    const res = await TaskService.delete(taskId);
    onTaskDeleted(taskId);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={conflicts.has(task.id) ? { color: 'red', fontWeight: 'semi-bold' } : {}}>
            User {task.user_id}: {new Date(task.start).toLocaleString()} -{" "}
            {new Date(task.end).toLocaleString()}
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>

            {editingTask && editingTask.id == task.id && (
              <TaskForm
                initialTask={editingTask}
                onTaskUpdated={(updatedTask) => {
                  onTasksUpdated(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
                  setEditingTask(null); // Quitte le mode édition
                }}
              />
            )}

          </li>
        ))}
      </ul>
    </div>
  );
}
