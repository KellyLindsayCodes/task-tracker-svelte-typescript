<script lang="ts">
  import type { Task } from "../types";
  import { toggleTask, deleteTask } from "../stores/taskStore";

  export let task: Task;

  const fmtAU = new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Australia/Melbourne"
  });

  $: dateStr = task.dueDate ? fmtAU.format(new Date(task.dueDate)) : "";
  $: priorityClass = (task.priority || "Low").toLowerCase();

</script>

<div class="task-row">
  <div class="col title">{task.title}</div>
  <div class="col date">{dateStr}</div>
  <div class="col">
    <span class={"badge " + priorityClass}>{task.priority}</span>
  </div>
  <div class="col category">{task.category}</div>
</div>

<style>
  .task-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr auto auto;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
  }

  .badge {
    display: inline-block;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
  }

  .badge.high   { background: #ef4444; color: #fff; }
  .badge.medium { background: #f59e0b; color: #111; }
  .badge.low    { background: #10b981; color: #fff; }

</style>
