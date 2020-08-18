export default function createPlayer() {
  const state = {
    vel: 1,
    px: Math.floor(Math.random() * 35),
    py: Math.floor(Math.random() * 35), // player's head position
    vx: 1, // player body position
    vy: 0,
    trail: [], // his tail pixels
    tail: 2, // quantity of tails
    lost: false, // if touched his body
    score: 0,
    highscore: this.score
  };

  function movePlayer() {
    // Snake Logic P1
    state.px += state.vx;
    state.py += state.vy;

    // Arena Wrap
    if (state.px < 0) {
      state.px = WIDTH - 1;
    }
    if (state.px > WIDTH - 1) {
      state.px = 0;
    }
    if (state.py < 0) {
      state.py = HEIGHT - 1;
    }
    if (state.py > HEIGHT - 1) {
      state.py = 0;
    }
  }
}
