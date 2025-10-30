'use strict';

const el = (id) => document.getElementById(id);

async function getAccessToken() {
  const exp = +localStorage.getItem("sp_expires_at") || 0;
  if (Date.now() < exp) return localStorage.getItem("sp_access_token");

  const refresh = localStorage.getItem("sp_refresh_token");
  if (!refresh) return null; // user may need to reconnect after 1h if no refresh token granted

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refresh,
    client_id: "YOUR_SPOTIFY_CLIENT_ID"
  });

  const r = await fetch("https://accounts.spotify.com/api/token", {
    method:"POST", headers:{ "Content-Type":"application/x-www-form-urlencoded" }, body
  });

  if (!r.ok) return null;
  const tok = await r.json();
  localStorage.setItem("sp_access_token", tok.access_token);
  localStorage.setItem("sp_expires_at", String(Date.now() + (tok.expires_in-60)*1000));
  return tok.access_token;
}

const CLIENT_ID = "YOUR_SPOTIFY_CLIENT_ID";
const REDIRECT_URI = location.origin + location.pathname.replace(/\/$/, "") + "/callback"; 
const SCOPES = ["user-read-currently-playing","user-read-playback-state"].join(" ");

const connectBtn = document.getElementById("spotify-connect");

connectBtn?.addEventListener("click", async () => {
  const verifier = base64url(crypto.getRandomValues(new Uint8Array(64)));
  const challenge = await pkceChallenge(verifier);
  sessionStorage.setItem("pkce_verifier", verifier);

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.set("response_type","code");
  authUrl.searchParams.set("client_id", CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("scope", SCOPES);
  authUrl.searchParams.set("code_challenge_method","S256");
  authUrl.searchParams.set("code_challenge", challenge);

  location.href = authUrl.toString();
});

function base64url(bytes) {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
}
async function pkceChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64url(new Uint8Array(digest));
}

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

  const pool = ['Olivi~r', 'Oliver', 'Ol1ver', 'Olivia', '0liver', 'O-L-I-V-E-R', 'Revilo', 'O.G.', 'Oll—', 'Olive?', 'Oli..', 'Oliver Oil'];
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
    target.setAttribute('aria-label', finalText);

    // ✅ UNHIDE PASSWORD BUTTON
    const btn = el('password-btn');
    if (btn) btn.style.display = 'block';

  }, duration);
}

window.addEventListener('DOMContentLoaded', () => {
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

  document.getElementById("open-blank").addEventListener("click", () => {
  const newPage = window.open("about:blank", "_blank");

  if (!newPage) {
    alert("Popup blocked! Allow popups for this site.");
    return;
  }

  newPage.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Classroom</title>
        <style>
          body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: black;
          }
          iframe {
            width: 100vw;
            height: 100vh;
            border: none;
          }
        </style>
      </head>
      <body>
        <iframe src="https://binglover.github.io/"></iframe>
      </body>
    </html>
  `);

  newPage.document.close();
});

  // --- PASSWORD PANEL LOGIC ---
  const btn = el('password-btn');
  const panel = el('password-panel');
  const closeBtn = el('close-panel');
  const submit = el('password-submit');
  const input = el('password-input');
  const msg = el('password-message');

  // Hide password button until Ollie G event
  if (btn) btn.style.display = 'none';

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

      // ✅ SECRET KEY: change background to Qing flag
      if (entered === 'thejock') {
        msg.textContent = '⚠️ The Icon watches over all.';
        msg.style.color = 'gold';
        document.body.style.background = "url('https://i.imgur.com/CgplZ0i.png')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        panel.style.display = 'none';
        return;
      }

      // ✅ MAIN PASSWORD: open about:blank containing GitHub via iframe
      if (entered === '902197') {
        msg.textContent = '✅ Access granted!';
        msg.style.color = 'lime';

        setTimeout(() => {
          panel.style.display = 'none';

          // Open blank tab and load GitHub in an iframe
          const newPage = window.open('about:blank', '_blank');
          if (newPage) {
            newPage.document.write(`
              <!DOCTYPE html>
              <html>
              <head>
                <title>Blocked Page</title>
                <style>
                  body, html {
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                    background: black;
                  }
                  iframe {
                    border: none;
                    width: 100vw;
                    height: 100vh;
                  }
                </style>
              </head>
              <body>
              <iframe src="https://binglover.github.io"></iframe>
              </body>
              </html>
            `);
            newPage.document.close();
          }
        }, 500);
        return;
      }

      // ❌ WRONG PASSWORD
      msg.textContent = '❌ Incorrect password.';
      msg.style.color = 'red';
    });
  }

  // --- LEADERBOARD NAVIGATION ---
  const leaderboardBtn = el('goto-leaderboard');
  if (leaderboardBtn) {
    leaderboardBtn.addEventListener('click', () => {
      const section = el('leaderboard-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
