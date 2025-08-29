<script lang="ts">
  import { derived } from "svelte/store";
  import { tasks } from "../stores/taskStore";

  type Priority = "High" | "Medium" | "Low";

  const stats = derived(tasks, ($tasks) => {
    const total = $tasks.length;
    const open = $tasks.filter(t => !t.completed).length;
    const completed = total - open;

    const byPriority: Record<Priority, number> = { High: 0, Medium: 0, Low: 0 };
    for (const t of $tasks) {
      if (!t.completed && (t.priority as Priority)) {
        byPriority[t.priority as Priority] += 1;
      }
    }
    return { total, open, completed, byPriority };
  });
</script>

<section class="to-complete">
  <h3>Tasks to Complete</h3>

  <div class="row">
    <div class="big">{$stats.open}</div>
    <div class="meta">out of {$stats.total} total</div>
  </div>

  <div class="chips">
    <span class="chip high">High {$stats.byPriority.High}</span>
    <span class="chip med">Medium {$stats.byPriority.Medium}</span>
    <span class="chip low">Low {$stats.byPriority.Low}</span>
  </div>

  <div class="bar" aria-hidden="true">
    <div class="fill" style="width:{($stats.completed / Math.max($stats.total, 1)) * 100}%"></div>
  </div>
  <div class="done">{$stats.completed} done</div>
</section>

<style>
  .to-complete{
    margin-top:1rem;
    padding:1.4rem;
    border:1px solid #ddd;
    border-radius:12px;
    background:#faf9ff;
    font-family: inherit;
  }
  h3{
    margin:0 0 .5rem 0;
    font-size:1rem;
    font-weight:600;
    color:#2D0A5F;
  }
  .row{ display:flex; align-items:baseline; gap:.5rem; }
  .big{ font-size:2rem; font-weight:700; color:#483D8B; line-height:1; }
  .meta{ font-size:.9rem; opacity:.75; }

  .chips{ display:flex; gap:.4rem; margin-top:.5rem; flex-wrap:wrap; }
  .chip{
    padding:.18rem .5rem;
    border-radius:999px;
    font-size:.75rem;
    font-weight:600;
    line-height:1;
  }
  .chip.high{ background:#ef4444; color:#fff; }
  .chip.med { background:#f59e0b; color:#111; }
  .chip.low { background:#10b981; color:#fff; }

  .bar{
    height:8px;
    border-radius:999px;
    background:#eee;
    margin:.6rem 0 .25rem;
    overflow:hidden;
  }
  .fill{
    height:100%;
    background:#9B55D0;
    width:0%;
    transition:width .2s ease;
  }
  .done{ font-size:.8rem; opacity:.7; text-align:right; }
</style>
