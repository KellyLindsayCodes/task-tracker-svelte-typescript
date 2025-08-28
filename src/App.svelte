<script lang="ts">
  import Sidebar from "./components/Sidebar.svelte";
  import TaskControls from "./components/TaskControls.svelte";
  import TaskList from "./components/TaskList.svelte";
  import Banner from './components/Banner.svelte';
  import UpcomingTasks from './components/UpcomingTasks.svelte';
  import MonthlyCalendar from './components/MonthlyCalendar.svelte';
  import CompletedTasks from './components/CompletedTasks.svelte';

  import { tasks } from "./stores/taskStore";
  import { searchKeyword } from "./stores/searchStore";
  import type { Task } from './types';

  import AddTask from './components/AddTask.svelte';
  import { addTaskOpen } from './stores/uiStore';

  let selectedDate: Date = new Date();
  let filteredTasks: Task[] = [];

  $: filteredTasks = $tasks.filter(task =>
    task.title.toLowerCase().includes($searchKeyword.toLowerCase())
  );

  function handleAddTask() {
    console.log("Add task clicked");
  }

  function handleEditTask() {
    console.log("Edit task clicked");
  }

  function handleSearch(query: string) {
    searchKeyword.set(query);
  }
</script>

<div class="app-container">
  <Sidebar />
  <main class="main-content">
    <section class="center">
      <Banner />
      <TaskControls 
      onAdd={handleAddTask} 
      onEdit={handleEditTask} 
      onSearch={handleSearch} 
      />
      <TaskList tasks={filteredTasks} />
      <CompletedTasks />
    </section>

    <aside class="right-rail">
      <MonthlyCalendar 
        {selectedDate} 
        on:selectDate={(e) => selectedDate = e.detail} 
      />
      <UpcomingTasks {selectedDate} />
    </aside>
  </main>
</div>

{#if $addTaskOpen}
  <div
    class="modal-backdrop"
    tabindex="-1"
    on:click={() => addTaskOpen.set(false)}
    on:keydown={(e) => e.key === 'Escape' && addTaskOpen.set(false)}
  >
    <div class="modal" role="dialog" aria-modal="true" on:click|stopPropagation>
      <h1 id="modal-title">Add New Task</h1>
      <AddTask on:done={() => addTaskOpen.set(false)} />
      <button type="button" on:click={() => addTaskOpen.set(false)}>Close</button>
    </div>
  </div>
{/if}

<style>
  .app-container {
    display: flex;
    min-height: 100vh;
  }

  .main-content {
    flex: 1;
    display: grid;
    grid-template-columns: minmax(640px, 1fr) 360px; 
    gap: 2rem;
    padding: 0 2rem;
    align-items: start;
  }

  .center {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 1200px;
  }

  .right-rail {
    display: flex;
    flex-direction: column;
    position: sticky;
  }

  .modal-backdrop { 
    position: fixed; 
    inset: 0; 
    background: rgba(0,0,0,.4);
    display:flex; 
    align-items:center; 
    justify-content:center; 
  }
  
  .modal { 
    background:#fff; 
    padding:2rem; 
    border-radius:.75rem; 
    max-width:400px; 
    width:90%; 
  }

  .modal button {
    margin-top: 1rem; background-color: #999; color: white;
    border: none; padding: 0.5rem 1rem; border-radius: 0.5rem;
  }
  .modal button:hover { background-color: #777; }

</style>
