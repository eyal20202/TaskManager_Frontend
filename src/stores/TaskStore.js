import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

class TaskStore {
  tasks = [];
  host = 'http://localhost:5000';

  constructor() {
    makeAutoObservable(this);
    this.fetchTasks();
  }

  async fetchTasks() {
    try {
      const response = await axios.get(`${this.host}/api/tasks`);
      runInAction(() => {
        this.tasks = response.data;
      });
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  }

  async addTask(task) {
    try {
      const response = await axios.post(`${this.host}/api/tasks`, task);
      runInAction(() => {
        this.tasks.push(response.data);
      });
    } catch (error) {
      console.error('Failed to add task', error);
    }
  }

  async updateTask(id, updatedTask) {
    try {
      const response = await axios.put(`${this.host}/api/tasks/${id}`, updatedTask);
      runInAction(() => {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
          // Ensure we don't lose any existing properties on the task
          this.tasks[index] = { ...this.tasks[index], ...updatedTask };
        }
      });
    } catch (error) {
      console.error('Failed to update task', error);
    }
  }

  async deleteTask(id) {
    try {
      await axios.delete(`${this.host}/api/tasks/${id}`);
      runInAction(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      });
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  }
}

export default TaskStore;
