export type Task = {
  id: number;                   
  title: string;                
  description?: string;          
  dueDate?: string;             
  priority?: "Low" | "Medium" | "High"; 
  category?: string;             
  completed: boolean;          
};
