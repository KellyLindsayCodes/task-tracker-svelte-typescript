<script>
  import { tasks } from '../stores/taskStore';
  import { derived } from 'svelte/store';

  const completedTasks = derived(tasks, $tasks => 
    $tasks.filter(task => task.completed)
  );
</script>

<style>
  .completed-tasks {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #f8f8f8;
    margin-top: 1rem;
  }
  h2 {
    margin-bottom: 0.5rem;
  }
  .task {
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
  }
  .task:last-child {
    border-bottom: none;
  }
</style>

<div class="completed-tasks">
  <h2>Completed Tasks</h2>
  {#if $completedTasks.length > 0}
    {#each $completedTasks as task}
      <div class="task">
        <span>{task.name}</span>
        <span>{task.dueDate}</span>
      </div>
    {/each}
  {:else}
    <p>No tasks completed yet.</p>
  {/if}
</div>
