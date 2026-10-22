# 🚀 Hostinger Deployment Guide for 10Q Challenge

This guide explains how to deploy the **10Q Challenge Platform** (Next.js 16 App Router) onto **Hostinger**.

---

## 📋 Table of Contents
1. [Which Hostinger Plan Are You Using?](#which-hostinger-plan-are-you-using)
2. [Method 1: Hostinger Web & Cloud Hosting (hPanel Node.js)](#method-1-hostinger-web--cloud-hosting-hpanel-nodejs-recommended-for-sharedcloud)
3. [Method 2: Hostinger VPS (Ubuntu + PM2 + Nginx)](#method-2-hostinger-vps-ubuntu--pm2--nginx-recommended-for-vps)
4. [Method 3: Hostinger VPS via Docker Compose](#method-3-hostinger-vps-via-docker-compose)
5. [Pre-configured Hostinger Files Included](#pre-configured-hostinger-files-included)
6. [Troubleshooting & Common Hostinger Issues](#troubleshooting--common-hostinger-issues)

---

## Which Hostinger Plan Are You Using?

| Plan Type | Recommended Deployment Method | Entry Point |
| :--- | :--- | :--- |
| **Hostinger Cloud Hosting / Business Web** | [Method 1: hPanel Node.js](#method-1-hostinger-web--cloud-hosting-hpanel-nodejs-recommended-for-sharedcloud) | `server.js` with `.htaccess` |
| **Hostinger VPS (KVM 1 / 2 / 4)** | [Method 2: SSH + PM2 + Nginx](#method-2-hostinger-vps-ubuntu--pm2--nginx-recommended-for-vps) | `ecosystem.config.js` |
| **Hostinger VPS with Docker** | [Method 3: Docker Compose](#method-3-hostinger-vps-via-docker-compose) | `docker-compose.yml` |

---

## Method 1: Hostinger Web & Cloud Hosting (hPanel Node.js)

Most Hostinger Cloud Hosting and Business Web Hosting plans include a built-in **Node.js Application Manager** in hPanel.

### Step 1: Upload Your Project Files
You can upload either via **Git** or **File Manager**:

#### Option A: Deploy via Git (Fastest & Best)
1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com/).
2. Go to **Websites** &rarr; Select your domain &rarr; **Advanced** &rarr; **Git**.
3. Enter your repository URL (e.g., `https://github.com/riteshkumarcode/10q-challenge-new-site`).
4. Set Branch to `main`.
5. Set Directory to `/public_html`.
6. Click **Create** &rarr; **Deploy**.

#### Option B: Deploy via File Manager (.zip)
1. In your local repository, run a local build first (ensures `.next` folder exists):
   ```bash
   npm run build
   ```
2. Compress your project into a `.zip` file (exclude `node_modules` to keep it lightweight).
3. In hPanel, go to **File Manager** &rarr; Open `public_html`.
4. Upload the zip and click **Extract**.

---

### Step 2: Configure Node.js in hPanel
1. In hPanel, navigate to **Advanced** &rarr; **Node.js** (or search "Node.js" in the top search bar).
2. Click **Create Application** (or Edit existing).
3. Fill in the following exact settings:

| Setting | Value | Notes |
| :--- | :--- | :--- |
| **Node.js Version** | **20.x** (or 18.x) | Next.js 16 requires Node 18.18+ or 20+ |
| **Application Mode** | **Production** | Optimized runtime |
| **Application Root** | `public_html` | Directory where `server.js` resides |
| **Application Startup File** | `server.js` | Built-in custom server |
| **Application URL** | `yourdomain.com` | Your live domain |

4. Click **Save** or **Create**.

---

### Step 3: Install Dependencies and Build
1. In the **Node.js** page in hPanel:
   - Click the **"NPM Install"** button (or open the SSH / Terminal in hPanel).
2. If using the hPanel Terminal, execute:
   ```bash
   cd ~/domains/yourdomain.com/public_html
   npm install
   npm run build
   ```
3. Once the build finishes, click **"Restart"** on the Node.js application.

---

### Step 4: Verify the `.htaccess` File
Hostinger uses OpenLiteSpeed / Apache. Ensure that the pre-configured [`.htaccess`](file:///d:/10q%20challenge%20website%20new%20and%20final%20by%20ritesh/.htaccess) file is located in your `public_html/` root. It includes:
- Automatic HTTPS redirection.
- Caching rules for Next.js static assets (`/_next/static/*`).
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`).
- Gzip & Brotli compression.

---

## Method 2: Hostinger VPS (Ubuntu + PM2 + Nginx)

Hostinger VPS provides full root access, dedicated resources, and high concurrency.

### Step 1: Connect to your Hostinger VPS via SSH
```bash
ssh root@YOUR_HOSTINGER_VPS_IP
```

### Step 2: Install Node.js 20, Git, and PM2
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git nginx

# Install PM2 globally
npm install -g pm2
```

### Step 3: Clone and Setup Project
```bash
# Create directory
mkdir -p /var/www/10qchallenge
cd /var/www/10qchallenge

# Clone repository
git clone https://github.com/riteshkumarcode/10q-challenge-new-site.git .

# Run automated deployment script
chmod +x deploy-hostinger.sh
./deploy-hostinger.sh
```

### Step 4: Configure PM2 for Automatic Reboots
```bash
# Start with ecosystem config
pm2 start ecosystem.config.js --env production

# Save PM2 state & enable startup on system boot
pm2 save
pm2 startup
```

### Step 5: Configure Nginx Reverse Proxy
1. Copy the included Nginx config:
   ```bash
   cp hostinger-nginx.conf /etc/nginx/sites-available/10qchallenge
   ```
2. Edit `/etc/nginx/sites-available/10qchallenge` to replace `10qchallenge.in` with your domain.
3. Enable the site and restart Nginx:
   ```bash
   ln -s /etc/nginx/sites-available/10qchallenge /etc/nginx/sites-enabled/
   rm -f /etc/nginx/sites-enabled/default
   nginx -t
   systemctl restart nginx
   ```

### Step 6: Install Free SSL with Certbot
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Method 3: Hostinger VPS via Docker Compose

If you selected the **Ubuntu with Docker** template on Hostinger VPS:

1. Clone your repository:
   ```bash
   git clone https://github.com/riteshkumarcode/10q-challenge-new-site.git
   cd 10q-challenge-new-site
   ```
2. Start all services in the background:
   ```bash
   docker compose up -d --build
   ```
3. To inspect running containers:
   ```bash
   docker compose ps
   docker compose logs -f frontend
   ```

---

## Pre-configured Hostinger Files Included

The following files have been prepared and tested specifically for Hostinger:

| File | Purpose | Location |
| :--- | :--- | :--- |
| [`.htaccess`](file:///d:/10q%20challenge%20website%20new%20and%20final%20by%20ritesh/.htaccess) | OpenLiteSpeed / Apache rewrite, HTTPS redirect, Next.js cache headers | Root & `frontend/public/` |
| [`server.js`](file:///d:/10q%20challenge%20website%20new%20and%20final%20by%20ritesh/server.js) | Production Node.js server with Hostinger hPanel diagnostics & port pipe handling | Root & `frontend/` |
| [`ecosystem.config.js`](file:///d:/10q%20challenge%20website%20new%20and%20final%20by%20ritesh/ecosystem.config.js) | PM2 cluster configuration with auto-restart & memory limits | Root & `frontend/` |
| [`hostinger-nginx.conf`](file:///d:/10q%20challenge%20website%20new%20and%20final%20by%20ritesh/hostinger-nginx.conf) | Production Nginx reverse proxy configuration for Hostinger VPS | Root |
| [`deploy-hostinger.sh`](file:///d:/10q%20challenge%20website%20new%20and%20final%20by%20ritesh/deploy-hostinger.sh) | 1-line bash script to pull, install, build, and restart on Hostinger VPS | Root |
| [`.env.production.example`](file:///d:/10q%20challenge%20website%20new%20and%20final%20by%20ritesh/.env.production.example) | Template for production environment variables & PayU gateway keys | Root & `frontend/` |

---

## Troubleshooting & Common Hostinger Issues

### 1. "503 Service Unavailable" or blank screen
- **Cause**: Node.js app is stopped or dependencies have not been installed.
- **Fix**: Open Hostinger hPanel &rarr; **Node.js** &rarr; Verify Application Status is **Running**. Check that `Startup File` is set to `server.js`.

### 2. "Build Required" diagnostic screen
- **Cause**: The `.next` production build folder has not been generated or uploaded.
- **Fix**: Run `npm run build` in the SSH Terminal, or build locally on your machine and upload the `.next` folder to Hostinger.

### 3. Out of Memory error during `npm run build` on Hostinger shared hosting
- **Cause**: Hostinger shared/cloud plans limit RAM per process during intensive compilation.
- **Fix**: Build the site locally on your computer:
  ```bash
  npm run build
  ```
  Then upload the generated `frontend/.next` folder directly to Hostinger using File Manager or FTP.

### 4. Port binding error / process already in use
- **Cause**: Hostinger assigns a port dynamically via `process.env.PORT`.
- **Fix**: The provided `server.js` automatically binds to `process.env.PORT || 3000`. Do not hardcode a port number.
