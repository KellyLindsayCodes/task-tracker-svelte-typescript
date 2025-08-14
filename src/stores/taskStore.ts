import { writable } from "svelte/store";
import type { Task } from "../types";

let nextId = 21; 

export const tasks = writable<Task[]>([
  { id: 1, title: "Buy groceries", description: "Milk, eggs, bread, cheese", dueDate: "2025-08-15", completed: false, priority: "Medium", category: "Personal" },
  { id: 2, title: "Finish project report", description: "Write the conclusion and proofread", dueDate: "2025-08-16", completed: true, priority: "High", category: "Work" },
  { id: 3, title: "Call the electrician", description: "Fix the kitchen light", dueDate: "2025-08-17", completed: false, priority: "High", category: "Personal" },
  { id: 4, title: "Go for a run", description: "Morning exercise, 5km target", dueDate: "2025-08-18", completed: false, priority: "Low", category: "Health" },
  { id: 5, title: "Doctor appointment", description: "Annual check-up", dueDate: "2025-08-19", completed: false, priority: "High", category: "Health" },
  { id: 6, title: "Team meeting", description: "Discuss next sprint goals", dueDate: "2025-08-20", completed: true, priority: "High", category: "Work" },
  { id: 7, title: "Pick up dry cleaning", description: "Suits and shirts", dueDate: "2025-08-21", completed: false, priority: "Low", category: "Personal" },
  { id: 8, title: "Birthday gift for Sarah", description: "Find something unique", dueDate: "2025-08-22", completed: false, priority: "Medium", category: "Personal" },
  { id: 9, title: "Laundry", description: "Wash and fold clothes", dueDate: "2025-08-23", completed: false, priority: "Low", category: "Personal" },
  { id: 10, title: "Prepare presentation", description: "For Monday’s client meeting", dueDate: "2025-08-24", completed: false, priority: "High", category: "Work" },
  { id: 11, title: "Water plants", description: "Especially the fern in the kitchen", dueDate: "2025-08-25", completed: false, priority: "Low", category: "Personal" },
  { id: 12, title: "Organize files", description: "Sort by project and date", dueDate: "2025-08-26", completed: true, priority: "Medium", category: "Work" },
  { id: 13, title: "Clean the car", description: "Inside and outside", dueDate: "2025-08-27", completed: false, priority: "Low", category: "Personal" },
  { id: 14, title: "Book dentist", description: "Teeth cleaning", dueDate: "2025-08-28", completed: false, priority: "Medium", category: "Health" },
  { id: 15, title: "Renew passport", description: "Check photo requirements", dueDate: "2025-08-29", completed: false, priority: "High", category: "Personal" },
  { id: 16, title: "Bake cookies", description: "Try the new recipe", dueDate: "2025-08-30", completed: false, priority: "Low", category: "Personal" },
  { id: 17, title: "Read a book", description: "At least 50 pages", dueDate: "2025-09-01", completed: false, priority: "Low", category: "Personal" },
  { id: 18, title: "Movie night", description: "Invite friends over", dueDate: "2025-09-02", completed: false, priority: "Low", category: "Personal" },
  { id: 19, title: "Declutter desk", description: "Remove old papers", dueDate: "2025-09-03", completed: false, priority: "Medium", category: "Personal" },
  { id: 20, title: "Plan holiday", description: "Look at flights and hotels", dueDate: "2025-09-04", completed: true, priority: "High", category: "Misc" }
]);

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
