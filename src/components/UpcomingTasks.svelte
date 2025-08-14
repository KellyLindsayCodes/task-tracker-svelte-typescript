<script lang="ts">
  import { tasks } from "../stores/taskStore";
  import type { Task } from "../types";

  let today = new Date();
  let startOfWeek = getMonday(today);
  let selectedDate: Date | null = null;
  let weekDates: Date[] = [];

  function generateWeek(baseDate: Date) {
    const monday = getMonday(baseDate);
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      week.push(d);
    }
    return week;
  }

  function getMonday(d: Date) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    date.setDate(date.getDate() + diff);
    return date;
  }

  $: weekDates = generateWeek(startOfWeek);

  function nextWeek() {
    startOfWeek.setDate(startOfWeek.getDate() + 7);
    weekDates = generateWeek(startOfWeek);
    selectedDate = null;
  }

  function prevWeek() {
    startOfWeek.setDate(startOfWeek.getDate() - 7);
    weekDates = generateWeek(startOfWeek);
    selectedDate = null;
  }

  $: tasksForSelectedDate = $tasks.filter((t: Task) => {
    if (!t.dueDate) return false;
    const taskDate = new Date(t.dueDate);
    if (selectedDate) {
      return taskDate.toDateString() === selectedDate.toDateString();
    } else {
      return taskDate >= weekDates[0] && taskDate <= weekDates[6];
    }
  });
</script>

<section class="upcoming-tasks">
  <h2>Upcoming Tasks</h2>
  <div class="week-navigation">
    <button on:click={prevWeek}>&lt;</button>
    {#each weekDates as date}
      <div
        class="day"
        class:selected={selectedDate && selectedDate.toDateString() === date.toDateString()}
        on:click={() => selectedDate = date}
      >
        <div>{date.toLocaleDateString(undefined, { weekday: "short" })}</div>
        <div>{date.toLocaleDateString(undefined, { day: "2-digit", month: "2-digit" })}</div>
      </div>
    {/each}
    <button on:click={nextWeek}>&gt;</button>
  </div>

  {#if tasksForSelectedDate.length === 0}
    <p>No tasks for {selectedDate ? selectedDate.toDateString() : "this week"}.</p>
  {:else}
    <ul>
      {#each tasksForSelectedDate as task (task.id)}
        <li>
          <strong>{task.title}</strong>
          {task.dueDate ? ` - ${task.dueDate}` : ""}
          {task.priority ? ` [${task.priority}]` : ""}
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>
  .upcoming-tasks {
    margin-top: 2rem;
  }

  .week-navigation {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    align-items: center;
  }

  .week-navigation button {
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }

  .day {
    cursor: pointer;
    padding: 0.5rem;
    text-align: center;
    border-radius: 0.5rem;
    border: 1px solid transparent;
  }

  .day.selected {
    background-color: #e763f9;
    color: white;
    border-color: #d254e0;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 0.25rem 0;
    border-bottom: 1px solid #eee;
  }
</style>
