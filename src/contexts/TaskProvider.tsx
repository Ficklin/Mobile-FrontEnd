import axios from "axios";
import { useState, useEffect } from "react";
import TaskContext from "./TaskContext";

export const TaskProvider = (props: any) => {
  type task = {
    taskId: number;
    title: string;
    completed: boolean;
  };

  const [task, setTask] = useState([]);

  const baseUrl = "http://localhost:3000/api/task";

  useEffect(() => {
    async function fetchData() {
      await getAllTasks();
    }
    fetchData();
  }, []);

  function getAllTasks() {
    return axios.get(baseUrl).then((response) => setTask(response.data));
  }

  //A task is setup with unchecked button. So, it should defaulted false
  async function createTask(task: string) {
    console.log("Task to be created:", task);

    const response = await axios.post(baseUrl, { task, completed: false }); //0 for false
    getAllTasks();
    return await new Promise((resolve) => resolve(response.data));
  }

  function updateTask(taskId: number, task: task) {
    task.completed = !task.completed;
    let url = baseUrl + "/" + taskId;
    return axios.put(url, task).then((response) => {
      getAllTasks();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  async function deleteTask(taskId: number) {
    let url = baseUrl + "/" + taskId;
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
