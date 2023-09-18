import axios from "axios";
import { useState, useEffect } from "react";
import TaskContext from "./TaskContext";

export const TaskProvider = (props: any) => {
  const [task, setTask] = useState([]);

  const baseUrl = "http://localhost:3000/api/task/";

  useEffect(() => {
    async function fetchData() {
      await getAllTasks();
    }
    fetchData();
  }, []);

  async function getAllTasks() {
    const response = await axios.get(baseUrl);
    return setTask(response.data);
  }

  //missing the boolean
  async function createTask(task: string) {
    const response = await axios.post(baseUrl, task);
    getAllTasks();
    return await new Promise((resolve) => resolve(response.data));
  }

  //missing the boolean
  async function updateTask(taskId: number, task: string) {
    let url = baseUrl + taskId;
    const response = await axios.put(url, task);
    getAllTasks();
    return await new Promise((resolve) => resolve(response.data));
  }

  async function deleteTask(taskId: number) {
    let url = baseUrl + taskId;
    const response = await axios.delete(url);
    getAllTasks();
    return await new Promise((resolve) => resolve(response.data));
  }

  return (
    <TaskContext.Provider
      value={{
        task,
        getAllTasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
