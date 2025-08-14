import { writable } from "svelte/store";
import type { Task } from "../types";

export const tasks = writable<Task[]>([]);

let nextId = 1; 

export function addTask(task: Omit<Task, "id">) {
  tasks.update(current => [
    ...current,
    { ...task, id: nextId++ }
  ]);
}

export function toggleTask(id: number) {
  tasks.update(current =>
    current.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  );
}

export function deleteTask(id: number) {
  tasks.update(current => current.filter(task => task.id !== id));
}
