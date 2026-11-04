# Terminal Easter Egg — Setup Guide

A real Ubuntu 24.04 shell is hidden in the portfolio footer. Clicking **(what is this?!?)** opens it.

## Architecture

```
Browser (xterm.js)
    │  WebSocket ws://localhost:3000/terminal-ws
    │  (proxied by Vite in dev; by your reverse proxy in prod)
    ▼
terminal-server/server.mjs   (Node.js, port 7681)
    │  Docker SDK (dockerode)
    ▼
sage-portfolio-terminal:latest  (Ubuntu 24.04 container)
    └─ /bin/bash  ←  PTY-backed via docker attach
```

Each visitor gets their own **disposable container**:
- Non-root user (`sage`)
- 256 MB RAM / 0.5 CPU / 64 PIDs
- No outbound network (`NetworkMode: none`)
- Auto-removed on exit or 15-minute idle timeout

## Requirements

| Dependency | Version |
|---|---|
| Docker Desktop | 4.x+ (daemon must be running) |
| Node.js | 18+ |

## Development (first run)

### 1. Build the Ubuntu image (one-time, ~5 minutes)

```bash
docker build -t sage-portfolio-terminal:latest ./terminal-server
```

### 2. Start both servers

```bash
npm run dev:all
```

This runs the Vite dev server (port 3000) and the terminal server (port 7681) in parallel.  
Vite proxies all `/terminal-ws` WebSocket traffic to the terminal server automatically.

### 3. Open the portfolio

Navigate to `http://localhost:3000`, scroll to the footer, and click **(what is this?!?)**.

## Alternative: start servers separately

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run terminal
```

## Production deployment

In production you must proxy WebSocket connections yourself.

**nginx example:**
```nginx
location /terminal-ws {
    proxy_pass         http://127.0.0.1:7681;
    proxy_http_version 1.1;
    proxy_set_header   Upgrade    $http_upgrade;
    proxy_set_header   Connection "upgrade";
    proxy_set_header   Host       $host;
    proxy_read_timeout 900s;
}
```

Start the terminal server as a persistent process:
```bash
node terminal-server/server.mjs
# or with pm2:
pm2 start terminal-server/server.mjs --name portfolio-terminal
```

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `TERMINAL_PORT` | `7681` | Port the terminal server listens on |

## Security notes

- Containers run with `--cap-drop ALL` plus only the minimum required capabilities
- `no-new-privileges` is enforced
- Network is completely isolated (`NetworkMode: none`)
- Max 10 concurrent sessions before new connections are rejected
- Sessions are destroyed after 15 minutes of idle time
- Host Docker socket is used only by the Node.js server process, never exposed to container guests
