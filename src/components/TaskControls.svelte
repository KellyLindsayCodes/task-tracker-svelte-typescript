<script lang="ts">
  import AddTask from './AddTask.svelte';
  import { searchKeyword } from '../stores/searchStore'; 

  let showAddTaskModal = false;

  function openAddTaskModal() {
    showAddTaskModal = true;
  }

  function closeAddTaskModal() {
    showAddTaskModal = false;
  }

  function handleEdit() {
    alert("Edit functionality coming soon!");
  }

  function handleSearch(e: Event) {
    const target = e.target as HTMLInputElement;
    searchKeyword.set(target.value); 
  }
</script>

<div class="task-controls">
  <!-- Search -->
  <input
    type="text"
    placeholder="Search tasks..."
    on:input={handleSearch}
  />

  <!-- Edit -->
  <button type="button" on:click={handleEdit}>Edit</button>

  <!-- Add Task -->
  <button type="button" on:click={openAddTaskModal}>Add Task</button>
</div>

<!-- Modal -->
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
    margin-bottom: 1rem;
  }

  .task-controls input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
  }

  .task-controls button {
    padding: 0.5rem 1rem;
    background-color: #e763f9;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  .task-controls button:hover {
    background-color: #d254e0;
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: white;
    padding: 2rem;
    border-radius: 0.75rem;
    max-width: 400px;
    width: 90%;
  }

  .modal button {
    margin-top: 1rem;
    background-color: #999;
    color: white;
  }

  .modal button:hover {
    background-color: #777;
  }
</style>
