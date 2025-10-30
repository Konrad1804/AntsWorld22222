<script>
  import Board from './components/Board.svelte'
</script>

<main>
  <h1>Armeisenwelt — Rundenbasiertes Demo</h1>

  <div class="card">
    <Board />
  </div>

</main>

<style>
  main {
    padding: 1rem;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  }
  h1 { margin-bottom: 0.5rem }
  .card { padding: 1rem; background:#f8f8fb; border-radius:8px }
</style>
