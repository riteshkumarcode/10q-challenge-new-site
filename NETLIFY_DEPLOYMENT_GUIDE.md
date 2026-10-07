# 🚀 Deploying 10Q Challenge to Netlify

Your project is now fully pre-configured for **1-click Netlify deployment** using the official `@netlify/plugin-nextjs` Next.js runtime.

---

## 🛠️ Pre-configured Netlify Settings

The repository includes [`netlify.toml`](file:///d:/10q%20challenge%20website%20new%20and%20final%20by%20ritesh/netlify.toml) configured with:
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node.js runtime**: `v20.x`
- **Automatic 301 Permanent Redirects** for legacy paths (`/sign-in`, `/course-list`, `/student-index`, etc.)
- **Static Asset Caching**: Optimized headers for `/_next/static/*` and `/site/*`.

---

## 🌐 Method 1: Deploy via GitHub / GitLab (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Configure Netlify Next.js deployment and subject-wise curriculum"
   git push origin main
   ```

2. **Connect to Netlify**:
   - Go to [https://app.netlify.com/](https://app.netlify.com/)
   - Click **"Add new site"** &rarr; **"Import an existing project"**
   - Select **GitHub** and choose your repository: `riteshkumarcode/10q-Challenge`
   - Netlify will automatically detect the settings from [`netlify.toml`](file:///d:/10q%20challenge%20website%20new%20and%20final%20by%20ritesh/netlify.toml):
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
   - Click **"Deploy Site"**.

---

## ⚡ Method 2: Instant Deploy via Netlify CLI

If you want to deploy directly from your local terminal:

```powershell
# 1. Install Netlify CLI globally or use npx
npx netlify-cli login

# 2. Deploy from the frontend directory
cd frontend
npx netlify-cli deploy --build --prod
```

---

## ⚙️ Environment Variables (Optional)

In your Netlify Dashboard under **Site configuration &rarr; Environment variables**, you can set:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `NODE_VERSION` | Node.js version | `20.18.0` |
| `NEXT_PUBLIC_SITE_URL` | Live production domain | `https://10qchallenge.in` |
| `NEXT_PUBLIC_PAYU_KEY` | PayU Merchant Key | `YourPayUKey` |

---

## ✅ Verified Build Status
- Next.js 16 App Router & Turbopack verified
- All 33 routes pre-rendered statically & on-demand SSR
- KaTeX LaTeX Math Formulas fully compiled
- CBT Exam Simulator & Admin CMS live
