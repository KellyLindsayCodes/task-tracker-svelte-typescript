<script lang="ts">
  import type { Task } from "../types";
  import TaskItem from "./TaskItem.svelte";

  export let tasks: Task[] = [];

  const pageSize = 7;
  let page = 1;

  $: totalPages = Math.max(1, Math.ceil(tasks.length / pageSize));
  $: page = Math.min(page, totalPages);
  $: start = (page - 1) * pageSize;
  $: pageTasks = tasks.slice(start, start + pageSize);

  const prev = () => page > 1 && page--;
  const next = () => page < totalPages && page++;

</script>

<section class="task-status">

  {#if tasks.length === 0}
    <p>No tasks added yet.</p>
  {:else}
    <div class="task-header">
      <div>Task Name</div>
      <div>Date</div>
      <div>Priority</div>
      <div>Category</div>
    </div>

     {#each pageTasks as task (task.id)}
      <TaskItem {task} />
    {/each}

    <div class="pager">
      <button on:click={prev} disabled={page === 1} aria-label="Previous page">‹ Prev</button>
      <span>{start + 1}–{Math.min(start + pageSize, tasks.length)} of {tasks.length}</span>
      <button on:click={next} disabled={page === totalPages} aria-label="Next page">Next ›</button>
    </div>
  {/if}
</section>

<style>
  .task-status {
    text-align: left;
  }

  .task-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    font-weight: bold;
    padding: 0.8rem 0;
    border-bottom: 1px solid #ccc;
  }

  .pager {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
  }
  .pager button {
    padding: 0.35rem 0.75rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    background: #eae6ff;            
    color: #483D8B;
    cursor: pointer;
  }
  .pager button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

</style>
