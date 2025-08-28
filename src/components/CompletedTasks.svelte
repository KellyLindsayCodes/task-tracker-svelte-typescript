<script>
  import { tasks } from '../stores/taskStore';
  import { derived } from 'svelte/store';
  import { CircleCheck } from 'lucide-svelte';

  const completedTasks = derived(tasks, $tasks => 
    $tasks.filter(task => task.completed)
  );

  const fmtAU = new Intl.DateTimeFormat('en-AU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    timeZone: 'Australia/Melbourne'
  });

</script>

<style>
  .completed-tasks {
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #f8f8f8;
  }

  .completed-tasks h2 {
    font-size: 1.17rem; 
    font-weight: bold;
    margin: 0 0 0.5rem; 
    line-height: 1.2;
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

  .completed-tasks { padding: 0.8rem; border: 1px solid #ccc; border-radius: 8px; background: #f8f8f8; }
  .completed-tasks h2 { font-size: 1.17rem; font-weight: bold; margin: 0 0 0.5rem; line-height: 1.2; }

  .task { padding: 0.5rem; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; font-size: 0.9rem; }
  .task:last-child { border-bottom: none; }

  .date { display: inline-flex; align-items: center; gap: 0.4rem; }

</style>

<div class="completed-tasks">
  <h2>Completed Tasks</h2>
  {#if $completedTasks.length > 0}
    {#each $completedTasks as task}
      <div class="task">
        <span>{task.title}</span>
        <span class="date">
          {task.dueDate ? fmtAU.format(new Date(task.dueDate)) : ''}
          <CircleCheck color="#16a34a" size={16} aria-hidden="true" />
        </span>
      </div>
    {/each}
  {:else}
    <p>No tasks completed yet.</p>
  {/if}
</div>
