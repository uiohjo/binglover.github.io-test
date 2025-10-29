'use strict';

const el = (id) => document.getElementById(id);

function setGoldState(isGold) {
  const title = el('title');
  const rarity = el('rarity');
  if (!title || !rarity) return;
  if (isGold) {
    title.classList.add('title--gold');
    title.textContent = 'GOLDEN Plumet Tournament';
    rarity.style.display = 'block';
  } else {
    title.classList.remove('title--gold');
    title.textContent = 'Plumet Tournament';
    rarity.style.display = 'none';
  }
}

function spinNameOnce(target, finalText) {
  if (!target || target.dataset.spun === 'true') return;
  const pool = ['Olivi~r', 'Oliver', 'Ol1ver', '0liver', 'O-L-I-V-E-R', 'Oliverr', 'O.G.', 'Oll—', 'Olive?', 'Oli..', 'Oliver'];
  const duration = 1200;
  const interval = 70;
  let i = 0;
  target.classList.add('slotting');
  const timer = setInterval(() => {
    target.textContent = pool[i++ % pool.length];
  }, interval);

  const pool = ['Olivi~r', 'Oliver', 'Ol1ver', 'Olivia', '0liver', 'O-L-I-V-E-R', 'Revilo Ggorg', 'Asian', 'O.G.', 'Oll—', 'Olive?', 'Oli..', 'Oliver Oil'];
  const duration = 2500;
  const interval = 70;
  let i = 0;

  target.classList.add('slotting');
  target.dataset.spun = 'true'; // prevent triggering twice

  const timer = setInterval(() => {
    target.textContent = pool[i++ % pool.length];
  }, interval);

  setTimeout(() => {
    clearInterval(timer);
    target.textContent = finalText;
    target.classList.remove('slotting');
    target.classList.add('slot-complete');
    target.dataset.spun = 'true';
    target.setAttribute('aria-label', finalText);
    target.setAttribute('aria-label', finalText);

    // ✅ UNHIDE PASSWORD BUTTON
    const btn = el('password-btn');
    if (btn) btn.style.display = 'block';

  }, duration);
}

window.addEventListener('DOMContentLoaded', () => {
  const isGold = Math.floor(Math.random() * 50) === 0;
  setGoldState(isGold);

  const oliver = document.getElementById('player-oliver');
  oliver?.addEventListener('click', () => spinNameOnce(oliver, 'Ollie G'));
  if (oliver) {

  // --- GOLD TITLE + OLIVER SPIN LOGIC ---
  const isGold = Math.floor(Math.random() * 50) === 0;
  setGoldState(isGold);

  const oliver = el('player-oliver');
  if (oliver) {
    oliver.addEventListener('click', () => spinNameOnce(oliver, 'Ollie G'));
    oliver.setAttribute('tabindex', '0');
    oliver.setAttribute('role', 'button');
    oliver.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        spinNameOnce(oliver, 'Ollie G');
      }
    });
  }

  const uilses = document.getElementById('player-uilses');
  if (uilses) {
    uilses.setAttribute('tabindex', '0');
    uilses.setAttribute('role', 'button');
    uilses.setAttribute('aria-live', 'polite');
    const triggerIllegalSequence = () => {
      if (uilses.dataset.triggered === 'true') return;
      uilses.dataset.triggered = 'true';
      uilses.classList.add('illegal-active');
      uilses.textContent = 'ILLEGAL';
      uilses.setAttribute('aria-label', 'ILLEGAL');

      document.body.classList.add('illegal-flash');

      setTimeout(() => {
        document.body.classList.remove('illegal-flash');
        uilses.classList.add('illegal-fall');
      }, 2500);

      uilses.addEventListener(
        'animationend',
        () => {
          uilses.style.visibility = 'hidden';
        },
        { once: true }
      );
    };

    uilses.addEventListener('click', triggerIllegalSequence);
    uilses.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        triggerIllegalSequence();
      }
    });
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('password-btn');
  const panel = document.getElementById('password-panel');
  const closeBtn = document.getElementById('close-panel');
  const submit = document.getElementById('password-submit');
  const input = document.getElementById('password-input');
  const msg = document.getElementById('password-message');

  if (!btn || !panel) return;

  btn.addEventListener('click', () => {
    panel.style.display = 'flex';
    input.focus();
  });

  panel.addEventListener('click', (e) => {
    if (e.target === panel) panel.style.display = 'none';
  });

  closeBtn.addEventListener('click', () => {
    panel.style.display = 'none';
  });

  submit.addEventListener('click', () => {
    const entered = input.value.trim();
    if (entered === '902197') {
      msg.textContent = '✅ Access granted!';
      msg.style.color = 'lime';
      launchConfetti();
      setTimeout(() => (panel.style.display = 'none'), 2000);
    } else {
      msg.textContent = '❌ Incorrect password.';
      msg.style.color = 'red';
    }
  });

  function launchConfetti() {
    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.top = 0;
    confettiCanvas.style.left = 0;
    confettiCanvas.style.width = '100%';
    confettiCanvas.style.height = '100%';
    confettiCanvas.style.pointerEvents = 'none';
    confettiCanvas.style.zIndex = 2000;
    document.body.appendChild(confettiCanvas);
    const ctx = confettiCanvas.getContext('2d');

    const confetti = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * -50,
      r: Math.random() * 6 + 2,
      d: Math.random() * 0.5 + 0.5,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      tilt: Math.random() * 10 - 5,
    }));

    function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      confetti.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.r, p.r);
      });
      update();
    }

    function update() {
      confetti.forEach((p) => {
        p.y += p.d * 4;
        p.x += Math.sin(p.tilt / 2);
        p.tilt += 0.5;
      });
    }

    let frame = 0;
    function animate() {
      draw();
      frame++;
      if (frame < 200) requestAnimationFrame(animate);
      else document.body.removeChild(confettiCanvas);
    }
    animate();
  // --- PASSWORD PANEL LOGIC ---
  const btn = el('password-btn');
  const panel = el('password-panel');
  const closeBtn = el('close-panel');
  const submit = el('password-submit');
  const input = el('password-input');
  const msg = el('password-message');

  // Hide password button until Ollie G event
  if (btn) btn.style.display = "none";

  if (btn && panel) {
    btn.addEventListener('click', () => {
      panel.style.display = 'flex';
      input.focus();
    });

    closeBtn.addEventListener('click', () => panel.style.display = 'none');

    panel.addEventListener('click', (e) => {
      if (e.target === panel) panel.style.display = 'none';
    });

    submit.addEventListener('click', () => {
      const entered = input.value.trim();
      if (entered === '902197') {
        msg.textContent = '✅ Access granted!';
        msg.style.color = 'lime';

        setTimeout(() => {
          panel.style.display = 'none';

          const newPage = window.open("about:blank", "_blank");
          if (newPage) {
            newPage.document.write(`
              <!DOCTYPE html>
              <html>
              <head>
                <title>THE ICON LOVES ALL</title>
                <style>
                  body {
                    background: black;
                    color: white;
                    font-family: 'Poppins', sans-serif;
                    text-align: center;
                    padding-top: 120px;
                    font-size: 2.5rem;
                    letter-spacing: 3px;
                  }
                </style>
              </head>
              <body>THE ICON LOVES ALL</body>
              </html>
            `);
            newPage.document.close();
          }
        }, 500);

      } else {
        msg.textContent = '❌ Incorrect password.';
        msg.style.color = 'red';
      }
    });
  }

  // --- LEADERBOARD NAVIGATION ---
  const leaderboardBtn = el("goto-leaderboard");
  if (leaderboardBtn) {
    leaderboardBtn.addEventListener("click", () => {
      const section = el("leaderboard-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});
