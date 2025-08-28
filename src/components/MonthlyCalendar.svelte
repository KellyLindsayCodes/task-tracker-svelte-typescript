<script lang="ts">
  import { writable } from "svelte/store";
  import type { Task } from "../types";
  import { tasks } from "../stores/taskStore";
  import { onMount } from "svelte";

  export let selectedDate: Date;
  export let setSelectedDate: (date: Date) => void;

  let currentMonth = new Date();

  function firstDayOfMonth(date: Date) {
    const d = new Date(date.getFullYear(), date.getMonth(), 1);
    return d.getDay();
  }

  function daysInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  function prevMonth() {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
  }

  function nextMonth() {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  }

  $: monthDays = Array.from({ length: daysInMonth(currentMonth) }, (_, i) => i + 1);
</script>

<div class="calendar">
  <div class="calendar-header">
    <button on:click={prevMonth}>&lt;</button>
    <h3>{currentMonth.toLocaleString(undefined, { month: "long", year: "numeric" })}</h3>
    <button on:click={nextMonth}>&gt;</button>
  </div>

  <div class="calendar-grid">
  {#each ["S","M","T","W","T","F","S"] as day}
    <div class="day-name">{day}</div>
  {/each}

  {#each Array(42).fill(null).map((_, i) => i) as i}
    {#if i < firstDayOfMonth(currentMonth) || i >= firstDayOfMonth(currentMonth) + monthDays.length}
      <div class="empty"></div>
    {:else}
      <div
        class="day"
        class:selected={selectedDate && selectedDate.toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i - firstDayOfMonth(currentMonth) + 1).toDateString()}
        on:click={() => setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i - firstDayOfMonth(currentMonth) + 1))}
      >
        {i - firstDayOfMonth(currentMonth) + 1}
      </div>
    {/if}
  {/each}
</div>
</div>

<style>
  .calendar {
    max-width: 350px;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .calendar-header button {
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border: none;
    border-radius: 0.25rem;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.25rem;
  }

  .day-name {
    text-align: center;
    font-weight: bold;
  }

  .day, .empty {
    text-align: center;
    padding: 0.8rem;
    cursor: pointer;
    border-radius: 50%;
  }

  .day.selected {
    background-color: #483D8B;
    color: #F9FAFB;
  }

  .day:hover {
    background-color: #9B55D0;
  }
</style>
