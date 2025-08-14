<script lang="ts">
  import type { Task } from "../types";
  import TaskItem from "./TaskItem.svelte";

  export let tasks: Task[] = [];
</script>

<section class="task-status">
  <h2>Task Status</h2>

  {#if tasks.length === 0}
    <p>No tasks added yet.</p>
  {:else}
    <div class="task-header">
      <div>Task Name</div>
      <div>Date</div>
      <div>Priority</div>
      <div>Category</div>
    </div>

    {#each tasks as task (task.id)}
      <TaskItem {task} />
    {/each}
  {/if}
</section>

<style>
  .task-status {
    margin-top: 1rem;
  }

  .task-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    font-weight: bold;
    padding: 0.5rem 0;
    border-bottom: 1px solid #ccc;
  }

  .task-header div {
    padding: 0 0.5rem;
  }
</style>
