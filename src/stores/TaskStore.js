import { makeAutoObservable } from 'mobx';
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
      this.tasks = response.data;
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  }

  async addTask(task) {
    try {
      const response = await axios.post(`${this.host}/api/tasks`, task);
      this.tasks.push(response.data);
    } catch (error) {
      console.error('Failed to add task', error);
    }
  }

  async updateTask(id, updatedTask) {
    try {
      const updatedTask = {
        id: 1,                // Ensure this matches the task ID
        title: 'New Task Title',
        description: 'Updated Description',
        dueDate: '2024-08-01', // Ensure the date format is correct
        isCompleted: false
      };
      const response = await axios.put(`${this.host}/api/tasks/${id}`, updatedTask);
      const index = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        this.tasks[index] = response.data;
      }
    } catch (error) {
      console.error('Failed to update task', error);
    }
  }

  async deleteTask(id) {
    try {
      await axios.delete(`${this.host}/api/tasks/${id}`);
      this.tasks = this.tasks.filter(task => task.id !== id);
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  }
}

export default TaskStore;
