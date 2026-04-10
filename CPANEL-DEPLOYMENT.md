# cPanel Node.js Deployment Guide

**Domain:** `express.ousadbazar.com`

---

## 📋 Prerequisites

- ✅ cPanel with Node.js Manager enabled
- ✅ SSH/Terminal access (for running commands)
- ✅ Production database (PostgreSQL) with connection string ready
- ✅ All required environment variables prepared

---

## 🚀 Step-by-Step Deployment

### **Step 1: Prepare the Code on cPanel**

**Option A: Using Git (Recommended)**

```bash
# SSH into your cPanel
ssh user@ousadbazar.com

# Navigate to public_html
cd ~/public_html

# Clone the repository
git clone https://github.com/AbdulAzizSajib/Protfolio_server.git api

# Navigate into the project
cd api
```

**Option B: Using FTP/File Manager**

1. Upload all project files to `~/public_html/api` directory
2. Ensure `.gitignore` files are respected (skip `node_modules`, `dist`, etc.)

---

### **Step 2: Install Dependencies**

Via SSH terminal:

```bash
cd ~/public_html/api

# Using pnpm (recommended)
pnpm install

# OR using npm
npm install
```

---

### **Step 3: Create Node.js Application in cPanel**

1. **Login to cPanel** → Dashboard
2. Navigate to **"Node.js Manager"** (or "Node.js Selector")
3. Click **"Create Application"**

Fill in the details:

| Field                        | Value                                |
| ---------------------------- | ------------------------------------ |
| **Node.js version**          | 20.x or latest                       |
| **Application name**         | `portfolio-api`                      |
| **Application root**         | `/home/yourusername/public_html/api` |
| **Application startup file** | `src/app/server.ts`                  |
| **Application URL**          | `express.ousadbazar.com`             |

4. Click **"Create"**

---

### **Step 4: Set Environment Variables**

After creating the application, click on it and go to **"Environment Variables"** tab.

Add all the following variables (get values from your `.env` file):

```env
PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/dbname
BETTER_AUTH_SECRET=your_random_secret_key_here
BETTER_AUTH_URL=https://express.ousadbazar.com
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRES_IN=7d
REFRESH_TOKEN_EXPIRES_IN=30d
EMAIL_SENDER_SMTP_USER=your_gmail@gmail.com
EMAIL_SENDER_SMTP_PASS=your_gmail_app_password
EMAIL_SENDER_SMTP_HOST=smtp.gmail.com
EMAIL_SENDER_SMTP_PORT=587
EMAIL_SENDER_SMTP_FROM=your_email@gmail.com
FRONTEND_URL=https://yourfrontend.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Critical Notes:**

- `BETTER_AUTH_URL` must be `https://express.ousadbazar.com`
- `EMAIL_SENDER_SMTP_PASS` is your Gmail app password (NOT your regular password)
- Generate a strong `BETTER_AUTH_SECRET` (use: `openssl rand -base64 32` in terminal)

---

### **Step 5: Run Database Migrations**

Via SSH terminal:

```bash
cd ~/public_html/api

# Run Prisma migrations
pnpm prisma:migrate

# Or manually
pnpm exec prisma migrate deploy

# Generate Prisma client (usually auto-done but ensure it runs)
pnpm prisma:generate
```

---

### **Step 6: Start the Application**

1. In cPanel Node.js Manager, find your application
2. Click **"Start Application"** button
3. Wait for status to change to "**Running**"

---

### **Step 7: Verify Deployment**

Test your API endpoint:

```bash
# Via terminal
curl https://express.ousadbazar.com/

# Or open in browser
https://express.ousadbazar.com/
```

**Expected Response:** `"Server is running..."`

---

## 📝 Common Operations

### Restart Application

```bash
# Via cPanel Node.js Manager, click "Restart Application"
# OR via SSH:
cd ~/public_html/api
npm restart
```

### View Logs

```bash
cd ~/public_html/api
# Check cPanel Node.js Manager logs tab
# OR access via SSH
tail -f /home/yourusername/logs/nodejs.log
```

### Update Code

```bash
cd ~/public_html/api
git pull origin main
pnpm install
pnpm build
# Restart application in cPanel
```

### Run Migrations After Schema Change

```bash
cd ~/public_html/api
pnpm prisma:migrate
# Restart application
```

---

## 🔧 Troubleshooting

### Application won't start

1. Check environment variables are all set correctly
2. Verify `BETTER_AUTH_URL` includes `https://` and correct domain
3. Check database connection is valid
4. Review logs in cPanel Node.js Manager

### Port conflicts

- If port 5000 is taken, change `PORT` env variable to 3000, 8080, or another available port
- Restart the application

### Database connection errors

- Ensure `DATABASE_URL` is correct and accessible from cPanel server
- Test connection: `psql postgresql://user:pass@host:5432/dbname`

### Missing dependencies after update

```bash
cd ~/public_html/api
pnpm install
pnpm prisma:generate
npm restart
```

---

## 📌 Additional Notes

- **Subdomain SSL**: cPanel should auto-provision SSL for `express.ousadbazar.com` via AutoSSL
- **Backup**: Regularly backup your database and codebase
- **Monitoring**: Check logs regularly for errors
- **Updates**: Keep Node.js, npm/pnpm, and dependencies updated

---

## 🆘 Need Help?

If deployment fails:

1. Check cPanel Node.js Manager logs
2. SSH and run: `cd ~/public_html/api && pnpm install && pnpm build`
3. Verify all environment variables are set
4. Test database connection manually
5. Check if firewall/security rules are blocking connections

---

**Last Updated:** April 10, 2025  
**Domain:** `express.ousadbazar.com`
