<script lang="ts">
  import type { Task } from "../types";
  import { toggleTask, deleteTask } from "../stores/taskStore";

  export let task: Task;
</script>

<div class="task-row">
  <div>{task.title}</div>
  <div>{task.dueDate || '-'}</div>
  <div>{task.priority}</div>
  <div>{task.category || '-'}</div>
</div>

<style>
  .task-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr auto auto;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
  }

  .task-row div {
    padding: 0 0.5rem;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #483D8B;
  }
</style>
