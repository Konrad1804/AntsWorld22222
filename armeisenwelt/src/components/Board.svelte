<script>
  // Simple turn-based board for ants.
  // - Click an ant (your color) to select it
  // - Click a highlighted neighbouring cell to move
  // - End Turn button switches player and resets moves

  export let cols = 8
  export let rows = 6

  // simple ants state (id, x, y, owner, moved)
  let ants = [
    { id: 1, x: 1, y: 1, owner: 1, moved: false },
    { id: 2, x: 6, y: 4, owner: 2, moved: false },
  ]

  let currentPlayer = 1
  let selectedId = null

  function antAt(x, y) {
    return ants.find(a => a.x === x && a.y === y)
  }

  function inBounds(x, y) {
    return x >= 0 && x < cols && y >= 0 && y < rows
  }

  function neighbors(ant) {
    if (!ant) return []
    const deltas = [ [1,0],[-1,0],[0,1],[0,-1] ]
    return deltas
      .map(d => ({ x: ant.x + d[0], y: ant.y + d[1] }))
      .filter(p => inBounds(p.x, p.y) && !antAt(p.x, p.y))
  }

  function selectAnt(a) {
    if (a.owner !== currentPlayer) return
    if (a.moved) return
    selectedId = a.id === selectedId ? null : a.id
  }

  function cellClick(x, y) {
    const ant = antAt(x, y)
    if (ant) {
      selectAnt(ant)
      return
    }

    if (selectedId == null) return
    const sel = ants.find(a => a.id === selectedId)
    if (!sel) return
    // check if target is one of neighbors
    const ok = neighbors(sel).some(p => p.x === x && p.y === y)
    if (!ok) return

    // move
    sel.x = x
    sel.y = y
    sel.moved = true
    selectedId = null
  }

  function endTurn() {
    // simple turn switch and reset moved flags
    currentPlayer = currentPlayer === 1 ? 2 : 1
    ants.forEach(a => (a.moved = false))
    selectedId = null
  }

  function resetBoard() {
    ants = [
      { id: 1, x: 1, y: 1, owner: 1, moved: false },
      { id: 2, x: 6, y: 4, owner: 2, moved: false },
    ]
    currentPlayer = 1
    selectedId = null
  }
</script>

<div class="board-wrap">
  <div class="controls">
    <div>Aktueller Spieler: <strong class="player">{currentPlayer}</strong></div>
    <button on:click={endTurn}>End Turn</button>
    <button on:click={resetBoard}>Reset</button>
  </div>

  <div class="grid" style={`grid-template-columns: repeat(${cols}, 48px)` }>
    {#each Array(rows) as _, row}
      {#each Array(cols) as _, col}
        {#key `${col},${row}`}
          <button
            type="button"
            class="cell"
            class:selected-cell={selectedId && antAt(col,row) && antAt(col,row).id === selectedId}
            on:click={() => cellClick(col, row)}>

            {#if antAt(col,row)}
                <div
                  class="ant {antAt(col,row).owner === 1 ? 'p1' : 'p2'} {antAt(col,row).moved ? 'moved' : ''} {selectedId === antAt(col,row).id ? 'selected' : ''}">
                  {antAt(col,row).id}
                </div>
            {:else}
              <!-- empty cell: show highlight if selectable -->
              {#if selectedId}
                {#if ants.find(x => x.id === selectedId)}
                  {#if neighbors(ants.find(x => x.id === selectedId)).some(p => p.x === col && p.y === row)}
                    <div class="hint"></div>
                  {/if}
                {/if}
              {/if}
            {/if}

          </button>
        {/key}
      {/each}
    {/each}
  </div>
</div>

<style>
  .board-wrap { display:flex; flex-direction:column; gap:0.75rem }
  .controls { display:flex; gap:0.5rem; align-items:center }
  .controls .player { color: #0b5; }
  .grid { display: grid; gap:4px; background:transparent }
  .cell { width:48px; height:48px; background:#fff; border:1px solid #e3e3e8; display:flex; align-items:center; justify-content:center; position:relative }
  .cell:hover { background:#f3f6ff }
  .ant { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:600; cursor:pointer }
  .ant.p1 { background:#007acc }
  .ant.p2 { background:#e04b4b }
  .ant.moved { opacity:0.5 }
  .ant.selected { outline:3px solid #ffd166 }
  .hint { width:14px; height:14px; border-radius:3px; background:rgba(0,122,204,0.2); position:absolute }
  .selected-cell { box-shadow: inset 0 0 0 2px #ffd166 }
</style>
