<script lang="ts">
  import { tasks } from './stores/taskStore';
  import { searchKeyword } from './stores/searchStore';
  import TaskControls from './components/TaskControls.svelte';
  import TaskList from './components/TaskList.svelte';
  import Sidebar from './components/Sidebar.svelte';
  import Banner from './components/Banner.svelte';
  import type { Task } from './types';

  let filteredTasks: Task[] = [];

  $: filteredTasks = $tasks.filter(task =>
    task.title.toLowerCase().includes($searchKeyword.toLowerCase())
  );
</script>

<div class="app-container" style="display:flex; min-height:100vh;">
  <!-- Sidebar -->
  <Sidebar />

  <!-- Main content -->
  <main class="main-content" style="flex:1; padding:2rem;">
    <Banner />

    <!-- Task Controls (Add/Edit/Search) -->
    <TaskControls />

    <!-- Task list filtered by search -->
    <TaskList tasks={filteredTasks} />
  </main>
</div>

<style>
  .app-container {
    display: flex;
    min-height: 100vh;
  }

  .main-content {
    flex: 1;
    padding: 2rem;
  }
</style>
