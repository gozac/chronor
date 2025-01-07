import { Task } from "../types/Task";

const tasks: Task[] = [
  {
    id: 1,
    user_id: 1,
    start: new Date("2025/01/22 06:00"),
    end: new Date("2025/01/23 08:00"),
  },
  {
    id: 2,
    user_id: 2,
    start: new Date("2025/01/20 11:00"),
    end: new Date("2025/01/22 07:00"),
  },
  {
    id: 3,
    user_id: 3,
    start: new Date("2025/01/22 07:00"),
    end: new Date("2025/01/22 14:00"),
  },
  {
    id: 4,
    user_id: 1,
    start: new Date("2025/01/20 14:00"),
    end: new Date("2025/01/21 08:00"),
  },
  {
    id: 5,
    user_id: 2,
    start: new Date("2025/01/21 15:00"),
    end: new Date("2025/01/22 15:00"),
  },
  {
    id: 6,
    user_id: 3,
    start: new Date("2025/01/19 21:00"),
    end: new Date("2025/01/21 14:00"),
  },
  {
    id: 7,
    user_id: 4,
    start: new Date("2025/01/22 02:00"),
    end: new Date("2025/01/22 11:00"),
  },
  {
    id: 8,
    user_id: 5,
    start: new Date("2025/01/20 14:00"),
    end: new Date("2025/01/22 05:00"),
  },
  {
    id: 9,
    user_id: 4,
    start: new Date("2025/01/19 20:00"),
    end: new Date("2025/01/22 16:00"),
  },
  {
    id: 10,
    user_id: 5,
    start: new Date("2025/01/22 02:00"),
    end: new Date("2025/01/22 21:00"),
  },
];

const API_URL = "http://localhost:5000/tasks";

export const TaskService = {
  list: async () => {
    const response = await fetch(API_URL);
    return response.json();
  },

  post: async (task) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return response.json();
  },

  put: async (id, task) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return response.json();
  },
};


/*const getTasks = async (): Promise<Task[]> => {
  return Promise.resolve([...tasks]);
};

const getTask = async (id: number): Promise<Task | undefined> => {
  return Promise.resolve(tasks.find((t) => t.id === id));
};

const createTask = async (task: Task): Promise<Task> => {
  const newTask = { ...task };
  newTask.id = Math.max(...tasks.map((t) => t.id || 0)) + 1;
  tasks.push(newTask);
  return Promise.resolve(newTask);
};

const updateTask = async (id: number, task: Task): Promise<Task> => {
  const idx = tasks.findIndex((t) => t.id === id);
  delete task.id;
  tasks[idx] = { ...tasks[idx], ...task };
  return Promise.resolve(tasks[idx]);
};

const destroyTask = async (id: number): Promise<Task | undefined> => {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx < 0) return Promise.resolve(undefined);
  return Promise.resolve(tasks.splice(idx, 1)[0]);
};

export const TaskService = {
  list: getTasks,
  get: getTask,
  post: createTask,
  put: updateTask,
  delete: destroyTask,
};*/
