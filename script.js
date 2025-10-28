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
  const pool = ['Olivi~r', 'Oliver', 'Ol1ver', '0liver', 'O-L-I-V-E-R', 'Oliverr', 'O.S.', 'Oll—', 'Olive?', 'Oli..', 'Oliver'];
  const duration = 1200;
  const interval = 70;
  let i = 0;
  target.classList.add('slotting');
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
  }, duration);
}

window.addEventListener('DOMContentLoaded', () => {
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

  // --- PASSWORD PANEL LOGIC ---
  const btn = el('password-btn');
  const panel = el('password-panel');
  const closeBtn = el('close-panel');
  const submit = el('password-submit');
  const input = el('password-input');
  const msg = el('password-message');

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

// ✅ OPEN about:blank AND LOAD YOUR HTML FILE INSIDE
const newPage = window.open("about:blank", "_blank");
if (newPage) {
  newPage.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Secret View</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        iframe {
          border: none;
          width: 100vw;
          height: 100vh;
        }
      </style>
    </head>
    <body>
      <iframe src="cl1v1maybeidk.html"></iframe>
    </body>
    </html>
  `);
  newPage.document.close();
}

