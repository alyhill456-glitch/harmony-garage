# Harmony Garage — FiveM Business Website

A custom responsive website with a service menu, employee applications, Discord OAuth login, employee clock-in/out, shift history, and an owner dashboard.

## Run locally

1. Install Node.js 20+.
2. Run `npm install` in this folder.
3. Copy `.env.example` to `.env` and set the variables below.
4. Run `npm start` and open http://localhost:3000.

## Discord login setup

1. Visit https://discord.com/developers/applications and create a Discord application.
2. Under OAuth2, add the redirect URL `http://localhost:3000/auth/discord/callback` (for production use your real HTTPS domain plus `/auth/discord/callback`).
3. Put your Discord Client ID and Client Secret into `.env`. Never publish `.env` or the secret.
4. Set `DISCORD_REDIRECT_URI` to the exact redirect URL registered in Discord.
5. Set `SESSION_SECRET` to a long random string.
6. Set `OWNER_DISCORD_IDS` to the Discord user IDs of Brady and Isabel, comma-separated. These IDs get access to employee management and applications.
7. Restart the server.

## How staff access works

- Applicants sign in with Discord and submit the application form.
- Owners can review applications and set status. Approving an application **does not automatically grant staff access**.
- Owners add a staff member using their Discord user ID and role in the management dashboard. Only active employees and owners can use the time clock.
- Employees clock in and out. Shift timestamps and applications are saved in the SQLite database `harmony.sqlite`.

## Deployment and security

- Deploy to a Node.js hosting service with a persistent disk/volume for `harmony.sqlite`. Static-only hosting will **not** support Discord login, applications, or time clock.
- Set `NODE_ENV=production`, configure an HTTPS domain and matching Discord redirect URI, and supply all environment variables securely.
- This is an MVP, not a hardened payroll or HR system. For production use, add a durable session store (the default MemoryStore is for development), CSRF protection for state-changing routes, rate limiting, regular backups, privacy/data retention policy, and audit logging for management actions. Configure a trusted reverse proxy for secure cookies if applicable.
- Time entries are stored in UTC and displayed in each viewer's local time zone.
- Do not treat recorded time as a payroll calculation without reviewing entries.

## Customization

Edit `public/app.js` to change the service menu and prices. Edit `public/index.html` and `public/style.css` for copy and styling. The existing site uses typographic garage branding rather than your original logo file; replace the logo mark with your artwork when available.
