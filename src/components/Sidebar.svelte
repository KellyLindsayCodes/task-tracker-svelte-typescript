<script>
  import { Home, ListChecks, Star, Clock, CheckCircle, Trash, UserPlus, HelpCircle, Settings } from "lucide-svelte";

  const topItems = [
    { label: "Dashboard", icon: Home },
    { label: "All tasks", icon: ListChecks },
    { label: "Priority tasks", icon: Star },
    { label: "Upcoming tasks", icon: Clock },
    { label: "Completed tasks", icon: CheckCircle },
    { label: "Deleted tasks", icon: Trash }
  ];

  const bottomItems = [
    { label: "Login", icon: UserPlus },
    { label: "Support", icon: HelpCircle },
    { label: "Settings", icon: Settings }
  ];
</script>

<aside class="sidebar">
  <div class="top-section">
    {#each topItems as { label, icon }}
      <div class="sidebar-item">
        <svelte:component this={icon} size={20} />
        <span>{label}</span>
      </div>
    {/each}
  </div>

  <div class="bottom-section">
    {#each bottomItems as { label, icon }}
      <div class="sidebar-item">
        <svelte:component this={icon} size={20} />
        <span>{label}</span>
      </div>
    {/each}
  </div>
</aside>

<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    text-align: left;
    color: #2D0A5F;
    background-color: #f7f7f7;
    padding: 1rem;
    border-radius: 20px;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  }

  .sidebar-item {
  display: flex;
  align-items: center;
  gap: 0.75rem; 
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.sidebar-item:hover {
  background-color: #f0f0f0;
  color: #9B55D0;
}
</style>
