<script lang="ts">
  import type { Task } from "../types";
  import { addTask } from "../stores/taskStore";

  let title = "";
  let description = "";
  let dueDate: string = "";
  let priority: "Low" | "Medium" | "High" = "Medium";
  let category = "";

  function handleSubmit() {
    if (!title.trim()) return;

    const newTask: Omit<Task, "id"> = {
      title,
      description,
      dueDate,
      priority,
      category,
      completed: false
    };

    addTask(newTask);

    title = "";
    description = "";
    dueDate = "";
    priority = "Medium";
    category = "";
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input type="text" bind:value={title} placeholder="Task Name" required />

  <textarea placeholder="Description (optional)" bind:value={description}></textarea>

  <input type="date" bind:value={dueDate} />

  <select bind:value={priority}>
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
  </select>

  <input type="text" placeholder="Category (optional)" bind:value={category} />

  <button type="submit">Add Task</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  input, textarea, select {
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
  }

  button {
    padding: 0.75rem;
    background-color: #483D8B;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  button:hover {
    background-color: #9B55D0;
  }
</style>
