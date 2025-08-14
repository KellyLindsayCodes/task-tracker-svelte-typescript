<script>
  // props can be added later if needed
</script>

<style>
  .banner {
    width: 100%;
    background: linear-gradient(
  to top, 
  rgba(200, 180, 255),  
  rgba(230, 210, 255, 0.3)
);
    padding: 3rem 2rem; 
    box-sizing: border-box;
    text-align: left;
    color: #333;
    border-radius: 28px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    margin-bottom: 1rem;
  }

  .banner h1 {
    color: #4B0082;
  }

  .banner h3 {
    margin: 1rem 0;
    font-size: 1.2rem;
    font-weight: normal;
    color: #6F4685;
    font-family: 'Open Sans';
  }

  .banner button {
    font-family: 'Inter';
    background-color: #4B0082;
    color: #F5F5F5;
    border-radius: 20px;
    letter-spacing: 1px;
  }

</style>

<div class="banner">
  <h1>Your To-Dos</h1>
  <h3>What's on the agenda today? Let's make it happen!</h3>
  <button>Create Task</button>
</div>
