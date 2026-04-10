# cPanel Quick Setup Checklist

## Pre-Deployment Checklist

### Database

- [ ] Production PostgreSQL database created
- [ ] Database connection string ready: `DATABASE_URL`
- [ ] Verified connection from cPanel server

### Authentication & Secrets

- [ ] Generated `BETTER_AUTH_SECRET` (use: `openssl rand -base64 32`)
- [ ] Generated `ACCESS_TOKEN_SECRET`
- [ ] Generated `REFRESH_TOKEN_SECRET`
- [ ] Set `BETTER_AUTH_URL=https://express.ousadbazar.com`

### Email Configuration

- [ ] Gmail account ready
- [ ] Gmail App Password generated (16 characters)
- [ ] `EMAIL_SENDER_SMTP_USER` set to your Gmail
- [ ] `EMAIL_SENDER_SMTP_PASS` set to app password

### Cloudinary (Image Uploads)

- [ ] Cloudinary account created
- [ ] Cloud name, API key, API secret obtained
- [ ] All three values ready

### Frontend

- [ ] Frontend URL ready for `FRONTEND_URL`
- [ ] CORS policy updated in code if needed

---

## Deployment Steps (Copy-Paste)

### 1. SSH Login

```bash
ssh user@ousadbazar.com
```

### 2. Clone Repository

```bash
cd ~/public_html
git clone https://github.com/AbdulAzizSajib/Protfolio_server.git api
cd api
```

### 3. Install Dependencies

```bash
pnpm install
# or: npm install
```

### 4. Create cPanel Application

1. **Login to cPanel Dashboard**
2. Click **"Node.js Manager"**
3. Click **"Create Application"**
4. Fill in:
   - **Node.js Version:** 20.x
   - **Application Name:** portfolio-api
   - **Application Root:** /home/yourusername/public_html/api
   - **Startup File:** src/app/server.ts
   - **Application URL:** express.ousadbazar.com
5. Click **"Create"**

### 5. Set Environment Variables

In cPanel Node.js Manager, click your app and go to **"Environment Variables"**

Add these (copy from `.env.example`, fill in your values):

```
PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=(from openssl command)
BETTER_AUTH_URL=https://express.ousadbazar.com
ACCESS_TOKEN_SECRET=...
REFRESH_TOKEN_SECRET=...
ACCESS_TOKEN_EXPIRES_IN=7d
REFRESH_TOKEN_EXPIRES_IN=30d
EMAIL_SENDER_SMTP_USER=your_gmail@gmail.com
EMAIL_SENDER_SMTP_PASS=(16-char app password)
EMAIL_SENDER_SMTP_HOST=smtp.gmail.com
EMAIL_SENDER_SMTP_PORT=587
EMAIL_SENDER_SMTP_FROM=your_email@gmail.com
FRONTEND_URL=https://yourfrontend.com
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### 6. Run Database Migration (via SSH)

```bash
cd ~/public_html/api
pnpm prisma:migrate
```

### 7. Start Application

In cPanel Node.js Manager, click **"Start Application"**

Wait for status to show **"Running"**

### 8. Test

```bash
curl https://express.ousadbazar.com/
# Should return: Server is running...
```

---

## Environment Variables Summary

| Variable               | Value                  | Example                          |
| ---------------------- | ---------------------- | -------------------------------- |
| PORT                   | 5000                   | `5000`                           |
| NODE_ENV               | production             | `production`                     |
| DATABASE_URL           | PostgreSQL URL         | `postgresql://user:pass@host/db` |
| BETTER_AUTH_SECRET     | Random secret          | `(generated)`                    |
| BETTER_AUTH_URL        | API domain with https  | `https://express.ousadbazar.com` |
| EMAIL_SENDER_SMTP_USER | Gmail address          | `yourmail@gmail.com`             |
| EMAIL_SENDER_SMTP_PASS | Gmail app password     | `(16 chars)`                     |
| EMAIL_SENDER_SMTP_HOST | Gmail SMTP host        | `smtp.gmail.com`                 |
| EMAIL_SENDER_SMTP_PORT | Gmail SMTP port        | `587`                            |
| FRONTEND_URL           | Frontend domain        | `https://yourfrontend.com`       |
| CLOUDINARY\_\*         | Cloudinary credentials | (from Cloudinary dashboard)      |

---

## Restart/Update After Deployment

**To restart:**

```
cPanel > Node.js Manager > [your app] > Restart Application
```

**To update code:**

```bash
cd ~/public_html/api
git pull origin main
pnpm install
# Then restart in cPanel
```

**To run migrations after schema change:**

```bash
cd ~/public_html/api
pnpm prisma:migrate
# Then restart in cPanel
```

---

## Support

For detailed instructions, see: `CPANEL-DEPLOYMENT.md`

For errors, check:

1. cPanel Node.js Manager logs tab
2. SSH and run: `cd ~/public_html/api && pnpm install`
3. Verify all env variables are set correctly
4. Check database connection: `psql DATABASE_URL`

---

**Domain:** express.ousadbazar.com
