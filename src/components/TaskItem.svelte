<script lang="ts">
  import type { Task } from "../types";
  import { toggleTask, deleteTask } from "../stores/taskStore";

  export let task: Task;
</script>

<div class="task-item">
  <input
    type="checkbox"
    checked={task.completed}
    on:change={() => toggleTask(task.id)}
  />

  <div class="task-details">
    <span class="task-title" style:text-decoration={task.completed ? 'line-through' : 'none'}>
      {task.title}
    </span>

    {#if task.description}
      <p class="task-desc">{task.description}</p>
    {/if}

    <div class="task-meta">
      {#if task.dueDate}
        <span class="due-date">Due: {task.dueDate}</span>
      {/if}

      {#if task.priority}
        <span class="priority">Priority: {task.priority}</span>
      {/if}

      {#if task.category}
        <span class="category">Category: {task.category}</span>
      {/if}
    </div>
  </div>

  <button on:click={() => deleteTask(task.id)}>❌</button>
</div>

<style>
  .task-item {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
  }

  .task-details {
    flex: 1;
  }

  .task-title {
    font-weight: bold;
  }

  .task-desc {
    margin: 0.25rem 0;
    color: #555;
  }

  .task-meta span {
    font-size: 0.85rem;
    margin-right: 1rem;
    color: #777;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #d254e0;
  }

  button:hover {
    color: #e763f9;
  }
</style>
