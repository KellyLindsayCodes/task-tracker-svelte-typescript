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

</style>
