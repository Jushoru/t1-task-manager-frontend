import { create } from 'zustand';
import type { TaskUi } from './TaskTypes';

interface TaskState {
    tasks: TaskUi[];
    createTask: (task: TaskUi) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    updateTask: (id: string, updatedFields: Partial<TaskUi>) => Promise<void>;
    getTasks: () => Promise<TaskUi[]>;
    getTaskById: (id: string) => Promise<TaskUi | undefined>;
}

const API_URL = 'https://t1-task-manager-backend.onrender.com/api/tasks';

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],

    createTask: async (task) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (response.ok) {
                const newTask: TaskUi = await response.json();
                set((state) => ({
                    tasks: [...state.tasks, newTask],
                }));
            }
        } catch (error) {
            console.error('Failed to create task:', error);
        }
    },

    deleteTask: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                set((state) => ({
                    tasks: state.tasks.filter((task) => task.id !== id),
                }));
            }
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    },

    updateTask: async (id, updatedFields) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields),
            });

            if (response.ok) {
                const updatedTask: TaskUi = await response.json();
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === id ? updatedTask : task
                    ),
                }));
            }
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    },

    getTasks: async () => {
        try {
            const response = await fetch(API_URL);
            if (response.ok) {
                const tasks: TaskUi[] = await response.json();
                set({ tasks });
                return tasks;
            }
            return [];
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
            return [];
        }
    },

    getTaskById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (response.ok) {
                const task: TaskUi = await response.json();
                return task;
            }
            return undefined;
        } catch (error) {
            console.error('Failed to fetch task by id:', error);
            return undefined;
        }
    },
}));