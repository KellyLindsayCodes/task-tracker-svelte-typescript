<script lang="ts">
  import type { Task } from "../types";
  import TaskItem from "./TaskItem.svelte";

  export let tasks: Task[] = [];
</script>

{#each tasks as task (task.id)}
  <TaskItem {task} />
{/each}

