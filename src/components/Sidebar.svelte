<script lang="ts">
  import { House, ListChecks, Star, Clock, CircleCheckBig, Trash, UserPlus, CircleQuestionMark, Settings } from "lucide-svelte";

  const topItems = [
    { label: "Dashboard", icon: House },
    { label: "All tasks", icon: ListChecks },
    { label: "Priority tasks", icon: Star },
    { label: "Upcoming tasks", icon: Clock },
    { label: "Completed tasks", icon: CircleCheckBig },
    { label: "Deleted tasks", icon: Trash }
  ];

  const bottomItems = [
    { label: "Login", icon: UserPlus },
    { label: "Support", icon: CircleQuestionMark },
    { label: "Settings", icon: Settings }
  ];

 let showNotice = false;
  let noticeText = "";                          
  let modalEl: HTMLDivElement | null = null;

  const messages: Record<string, string> = {
    Login: "Login is not available in this project environment.",
    Support: "This feature isn’t available in this project environment.",
    Settings: "Settings are disabled in this project environment."
  };

  const open = () => { showNotice = true; queueMicrotask(() => modalEl?.focus()); };
  const closeNotice = () => { showNotice = false; };

  function handleItemClick(label: string) {
    const msg = messages[label];
    if (msg) {
      noticeText = msg;
      open();
      return;
    }
  }

</script>

<aside class="sidebar">
  <div class="top-section">
    {#each topItems as { label, icon }}
      <div
        class="sidebar-item"
        role="button"
        tabindex="0"
        on:click={() => handleItemClick(label)}
        on:keydown={(e) => e.key === 'Enter' && handleItemClick(label)}
      >
        <svelte:component this={icon} size={20} />
        <span>{label}</span>
      </div>
    {/each}
  </div>

  <div class="bottom-section">
    {#each bottomItems as { label, icon }}
      <div
        class="sidebar-item"
        role="button"
        tabindex="0"
        on:click={() => handleItemClick(label)}
        on:keydown={(e) => e.key === 'Enter' && handleItemClick(label)}
      >
        <svelte:component this={icon} size={20} />
        <span>{label}</span>
      </div>
    {/each}
  </div>
</aside>

{#if showNotice}
  <div class="backdrop" on:click={closeNotice}>
    <div
      class="modal"
      tabindex="-1"
      bind:this={modalEl}
      on:keydown={(e) => e.key === 'Escape' && closeNotice()}
      on:click|stopPropagation
      role="dialog"
      aria-modal="true"
    >
      <h3>Feature not available</h3>
      <p>{noticeText}</p>
      <button class="btn" type="button" on:click={closeNotice}>OK</button> 
    </div>
  </div>
{/if}

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
  .sidebar-item:hover,
  .sidebar-item:focus-visible {
    background-color: #f0f0f0;
    color: #9B55D0;
    outline: none;
  }

  .backdrop {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.4);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000;
  }
  .modal {
    background: white;
    padding: 1.25rem 1.5rem;
    border-radius: 12px;
    width: min(92vw, 420px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
  }
  .modal h3 {
    margin: 0 0 .5rem 0;
    font-size: 1.05rem;
    color: #2D0A5F;
  }
  .modal p { margin: 0 0 1rem 0; color: #444; }
  .btn {
    padding: 0.5rem 0.9rem;
    border-radius: 8px;
    border: none;
    background: #483D8B;
    color: #fff;
    cursor: pointer;
  }
  .btn:hover { background: #3f357f; }
</style>
