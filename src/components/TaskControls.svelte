<script lang="ts">
  import AddTask from './AddTask.svelte';
  import { searchKeyword } from '../stores/searchStore';
  import { Pencil, Plus, Search } from "lucide-svelte";

  let showAddTaskModal = false;

  function openAddTaskModal() { showAddTaskModal = true; }
  function closeAddTaskModal() { showAddTaskModal = false; }

  function handleEdit() {
    alert("Edit functionality coming soon!");
  }

  function handleSearch(e: Event) {
    const target = e.target as HTMLInputElement;
    searchKeyword.set(target.value);
  }
</script>

<div class="task-controls">
  <div class="search-container">
  <Search size={16} class="search-icon" aria-hidden="true" />
  <input
    type="text"
    placeholder="Search tasks"
    on:input={handleSearch}
  />
</div>


  <button
    type="button"
    class="icon-btn"
    on:click={handleEdit}
    aria-label="Edit tasks"
    title="Edit"
  >
    <Pencil size={18} aria-hidden="true" />
  </button>

  <button
    type="button"
    class="icon-btn primary"
    on:click={openAddTaskModal}
    aria-label="Add task"
    title="Add task"
  >
    <Plus size={18} aria-hidden="true" />
  </button>
</div>


{#if showAddTaskModal}
  <div
    class="modal-backdrop"
    role="presentation"
    tabindex="-1"
    on:click={closeAddTaskModal}
    on:keydown={(e) => e.key === 'Escape' && closeAddTaskModal()}
  >
    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabindex="0"
      on:click|stopPropagation
    >
      <h1 id="modal-title">Add New Task</h1>
      <AddTask />
      <button
        type="button"
        on:click={closeAddTaskModal}
        aria-label="Close add task modal"
      >
        Close
      </button>
    </div>
  </div>
{/if}

<style>
  .task-controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .task-controls input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    font: inherit;
  }

  .icon-btn {
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #eae6ff;            
    color: #483D8B;                 
    cursor: pointer;
    transition: background-color .15s ease, box-shadow .15s ease, transform .04s ease;
  }
  .icon-btn:hover {
    background: #dcd4ff;
    box-shadow: 0 2px 8px rgba(72,61,139,0.18);
  }
  .icon-btn:active { transform: translateY(1px); }

  .icon-btn.primary {
    background: #483D8B;
    color: #F9FAFB;
  }
  .icon-btn.primary:hover {
    background: #3f357f;
    box-shadow: 0 3px 10px rgba(72,61,139,0.25);
  }

  .icon-btn:focus-visible {
    outline: 3px solid #E9DEFF;
    outline-offset: 2px;
  }

  .modal-backdrop {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.4);
    display: flex; justify-content: center; align-items: center;
  }
  .modal {
    background: white; padding: 2rem; border-radius: 0.75rem;
    max-width: 400px; width: 90%;
  }
  .modal button {
    margin-top: 1rem; background-color: #999; color: white;
    border: none; padding: 0.5rem 1rem; border-radius: 0.5rem;
  }
  .modal button:hover { background-color: #777; }

  .search-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem; 
  border: 1px solid #ddd;
  border-radius: 5rem;
  padding: 0.4rem 0.75rem;
  background: #fff;
}

.search-container input {
  border: none;
  outline: none;
  flex: 1;
  font: inherit;
}
  
</style>
