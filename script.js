// ✅ MAIN PASSWORD: open about:blank with CodePen embedded
if (entered === '902197') {
  msg.textContent = '✅ Access granted!';
  msg.style.color = 'lime';

  setTimeout(() => {
    panel.style.display = 'none';

    const newPage = window.open('about:blank', '_blank');
    if (newPage) {
      newPage.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>binglover.github.io</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            html, body {
              height: 100%;
              margin: 0;
              background: #000;
            }
            .full {
              position: fixed;
              inset: 0;
              width: 100%;
              height: 100%;
              border: 0;
            }
          </style>
        </head>
        <body>
          <iframe
            class="full"
            src="https://codepen.io/MAXWELL-MARSON/embed/GgoXoVN?default-tab=result"
            loading="lazy"
            allowfullscreen
            allowtransparency="true"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </body>
        </html>
      `);
      newPage.document.close();
    }
  }, 500);
  return;
}
