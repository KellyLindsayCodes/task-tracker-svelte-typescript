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
        <div>
          {date.toLocaleDateString("en-AU", {
            day: "2-digit",
            month: "2-digit",
            timeZone: "Australia/Melbourne"
          })}
        </div>
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
          <div class="task-info">
            <strong class="title">{task.title}</strong>

            {#if task.dueDate}
              <span class="due">
                {new Date(task.dueDate).toLocaleDateString(undefined, { weekday: "short" })}
                &nbsp;
                {new Date(task.dueDate).toLocaleDateString(undefined, { day: "2-digit" })}
              </span>
            {/if}
          </div>

          {#if task.priority}
            <span class={"priority " + task.priority.toLowerCase()}></span>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>
  .upcoming-tasks {
    max-width: 560px;
    width: 100%;
    margin: 0.1rem auto 0;
    padding: 1rem;
    border: 1px solid  #ccc;
    border-radius: 0.75rem;
    box-sizing: border-box;
    overflow-x: clip;
  }

  .week-navigation {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: auto auto;
    gap: 0.5rem 0.1rem;
    justify-items: center;
  }

  .week-navigation .day {
    grid-row: 1;                           
  }

  .week-navigation > button:first-of-type {
    grid-row: 2;
    grid-column: 1;
    justify-self: start;
  }

  .week-navigation > button:last-of-type {
    grid-row: 2;
    grid-column: 7;
    justify-self: end;
  }

  .day {
    padding: 0.375rem 0.25rem;
    border-radius: 0.5rem;
    text-align: center;
    border: 1px solid transparent;
    line-height: 1.1;
    aspect-ratio: 1 / 1;
    display: grid;
    place-items: center;
    gap: 0.15rem;
  }

  .day.selected {
    background-color: #483D8B;
    color: #F9FAFB;
    border-color:  #9B55D0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0.2rem;
    text-align: left; 
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
  }

  li strong {
    margin-right: 0.25rem;
  }

  .week-navigation button {
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border: none;
    border-radius: 0.25rem;
  }

  .day > div:first-child {           
    font-size: 0.75rem;
    font-weight: 600;
  }
  .day > div:last-child {            
    font-size: 0.7rem;
    letter-spacing: 0.1px;
  }

  .priority {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .priority.high {
      background-color: #e53e3e;
    }
    .priority.medium {
      background-color: #d69e2e;
    }
    .priority.low {
      background-color: #38a169;
    }
  
  .upcoming-tasks h2 {
    font-size: 1.17rem; 
    font-weight: bold;
    margin: 0 0 0.5rem; 
    line-height: 1.2;
  }

  .task-info {
    display: inline-flex;
    align-items: baseline;
    gap: 1rem; 
  }

  .due { 
    white-space: nowrap; 
  }

  @media (max-width: 520px) {
    .week-navigation {
      grid-template-columns: repeat(7, minmax(2.4rem, 1fr)); 
    }
  }

</style>
