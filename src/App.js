import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";
import TaskForm from "./components/TaskForm";
import { UserService } from "./services/UserService.ts";
import { TaskService } from "./services/TaskService.ts";
import GanttChart from "./components/GanttChart";

export default function App() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredUserId, setFilteredUserId] = useState(""); // Filtre utilisateur

  // Charger les utilisateurs
  useEffect(() => {
    UserService.list().then(setUsers);
  }, []);

  // Charger les tâches
  useEffect(() => {
    TaskService.list().then(setTasks);
  }, []);

  const checkConflicts = (tasks) => {
	  const conflicts = new Set();
	  tasks.forEach((task1) => {
	    tasks.forEach((task2) => {
	      if (
	        task1.id !== task2.id &&
	        task1.user_id === task2.user_id &&
	        ((new Date(task1.start) >= new Date(task2.start) &&
	          new Date(task1.start) < new Date(task2.end)) ||
	          (new Date(task2.start) >= new Date(task1.start) &&
	            new Date(task2.start) < new Date(task1.end)))
	      ) {
	        conflicts.add(task1.id);
	        conflicts.add(task2.id);
	      }
	    });
	  });
	  return conflicts;
	};

  const conflicts = checkConflicts(tasks);



  // Fonction pour filtrer les tâches
  const filteredTasks = filteredUserId
    ? tasks.filter((task) => task.user_id === parseInt(filteredUserId))
    : tasks;

  return (
    <div>
      <h1>Chronor</h1>
      <h2>Your team planning assistant</h2>
      <Filter users={users} onFilterChange={setFilteredUserId} />
      <TaskForm
		onTaskCreated={(newTask) => setTasks([...tasks, newTask])}
		onTaskUpdated={(updatedTask) =>
		  setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
		}
	  />
	  <GanttChart tasks={filteredTasks} users={users} conflicts={conflicts} />
      <TaskList
		tasks={filteredTasks}
		onTasksUpdated={(updatedTasks) => setTasks(updatedTasks)}
		onTaskDeleted={(taskId) =>
		  setTasks(tasks.filter((task) => task.id !== taskId))
		}
		conflicts={conflicts}
	  />
    </div>
  );
}
