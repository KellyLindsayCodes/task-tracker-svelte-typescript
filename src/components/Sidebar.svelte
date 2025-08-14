<script>
  const topItems = ["Dashboard", "All tasks", "Priority tasks", "Upcoming tasks", "Completed tasks", "Deleted tasks"];
  const bottomItems = ["Login / Create user", "Support", "Settings"];
</script>

<aside class="sidebar">
  <div class="top-section">
    {#each topItems as item}
      <div class="sidebar-item">{item}</div>
    {/each}
  </div>

  <div class="bottom-section">
    {#each bottomItems as item}
      <div class="sidebar-item">{item}</div>
    {/each}
  </div>
</aside>

<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    background-color: #f7f7f7;
    padding: 1rem;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  }

  .sidebar-item {
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .sidebar-item:hover {
    background-color: #e763f9;
    color: white;
  }

  .top-section, .bottom-section {
    display: flex;
    flex-direction: column;
  }
</style>
