<script lang="ts">
  import calendarIllustration from '../assets/task-tracker-calender.svg';
  import { addTaskOpen } from '../stores/uiStore';
</script>

<div class="banner">
  <div class="banner-content">
    <h1>Your To-Dos</h1>
    <h3>What's on your agenda today?</h3>
    <button on:click={() => addTaskOpen.set(true)}>Schedule Task</button>
  </div>
  <img src={calendarIllustration} alt="Task illustration" />
</div>

<style>
  .banner {
    display: flex;              
    justify-content: space-between; 
    align-items: center;        
    width: 100%;
    background: linear-gradient(
      to top, 
      var(--bg-soft),
      rgba(243, 236, 251, 0.65)
    );
    padding: 3rem 2rem; 
    box-sizing: border-box;
    border-radius: 28px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.03);
    margin-bottom: 1rem;
    font-family: "Plus Jakarta Sans", sans-serif;
  }

  .banner-content {
    flex: 1; 
    text-align: left;                 
  }

  .banner h1 {
    color: var(--text-strong);
    font-size: 3.2rem;
    line-height: 1.1;
    font-weight: 600;
    margin: 0 0 .25rem 0;
  }
  
  .banner h3 {
    margin: .75rem 0 1.25rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--text-muted);
  }

  .banner button {
    font-family: "Plus Jakarta Sans", sans-serif;
    background-color: var(--btn-bg);
    color: var(--btn-text);
    border: 0;
    padding: 0.6rem 2rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    letter-spacing: 0.02rem;
    font-weight: 500;
    cursor: pointer;
    transition: transform .04s ease, box-shadow .15s ease, background-color .15s ease;
  }

  .banner button:hover {
    box-shadow: 0 6px 14px rgba(92,45,192,0.28);
  }

  .banner img {
    max-height: 200px;  
    margin-left: 2rem;  
  }
</style>
