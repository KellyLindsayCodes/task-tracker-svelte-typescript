export type Task = {
  id: number;                   // unique identifier
  title: string;                // task name
  description?: string;          // optional details
  dueDate?: string;              // optional due date (YYYY-MM-DD)
  priority?: "Low" | "Medium" | "High"; // optional priority
  category?: string;             // optional category
  completed: boolean;            // task completion status
};
