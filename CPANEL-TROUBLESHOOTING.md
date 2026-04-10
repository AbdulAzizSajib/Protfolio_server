# cPanel Deployment Troubleshooting Guide

## Common Issues & Solutions

### 🔴 Issue: Application won't start or shows "Stopped"

**Symptoms:**

- Status in cPanel shows "Stopped"
- Visiting `https://express.ousadbazar.com/` returns 502 Bad Gateway or timeout

**Solutions:**

1. **Check Node.js application logs:**
   - cPanel > Node.js Manager > [Your App] > "Logs" tab
   - Look for error messages

2. **Verify environment variables are set:**

   ```bash
   # SSH and check if env vars are accessible
   cd ~/public_html/api
   echo $DATABASE_URL  # Should print your database URL
   ```

   - If empty, go to cPanel and set them again

3. **Manually run startup command:**

   ```bash
   cd ~/public_html/api
   pnpm install
   pnpm build
   npm start   # This should show errors if any
   ```

4. **Check for missing dependencies:**

   ```bash
   cd ~/public_html/api
   pnpm install --legacy-peer-deps
   ```

5. **Verify Prisma client is generated:**
   ```bash
   cd ~/public_html/api
   pnpm prisma:generate
   npm start
   ```

---

### 🔴 Issue: "Missing required environment variable"

**Error Message:**

```
Error: Missing required environment variable: DATABASE_URL
```

**Symptoms:**

- Application crashes immediately on startup
- Error shows which env variable is missing

**Solutions:**

1. Go to **cPanel > Node.js Manager**
2. Click on your application
3. Click **"Environment Variables"** tab
4. Add the missing variable with its value
5. Click **"Save"** or **"Apply"**
6. **Restart Application**

**Required Variables (all must be set):**

```
PORT
NODE_ENV
DATABASE_URL
BETTER_AUTH_SECRET
BETTER_AUTH_URL
ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET
ACCESS_TOKEN_EXPIRES_IN
REFRESH_TOKEN_EXPIRES_IN
EMAIL_SENDER_SMTP_USER
EMAIL_SENDER_SMTP_PASS
EMAIL_SENDER_SMTP_HOST
EMAIL_SENDER_SMTP_PORT
EMAIL_SENDER_SMTP_FROM
FRONTEND_URL
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

---

### 🔴 Issue: Database connection failed

**Error Message:**

```
Error: connect ECONNREFUSED or connection timeout
```

**Symptoms:**

- Application starts but crashes when trying to connect to database
- API endpoints return 500 errors

**Solutions:**

1. **Verify DATABASE_URL format:**

   ```
   postgresql://username:password@host:port/database
   ```

   - Example: `postgresql://admin:pass123@db.example.com:5432/portfolio_db`

2. **Test database connection from cPanel:**

   ```bash
   # SSH into cPanel
   psql postgresql://username:password@host:port/database

   # If psql is not available, try connecting with a tool
   # or verify credentials are correct
   ```

3. **Check if database is accessible from cPanel server:**
   - Contact your database provider
   - Ensure firewall allows connection from cPanel IP

4. **Verify credentials:**
   - Username, password, host, port, database name
   - Re-check in cPanel environment variables

5. **Try with local database (if available):**
   ```bash
   # Temporarily set to local DB for testing
   DATABASE_URL=postgresql://localhost/test_db
   # Then restart and check logs
   ```

---

### 🔴 Issue: SSL Certificate Error

**Error Message:**

```
SSL_ERROR_BAD_CERT_DOMAIN or certificate verification failed
```

**Symptoms:**

- HTTPS requests fail with certificate errors
- cPanel shows SSL warning

**Solutions:**

1. **Wait for AutoSSL to provision:**
   - cPanel automatically provisions SSL certificates
   - May take 5-15 minutes after subdomain is added

2. **Manually renew SSL:**
   - cPanel > "AutoSSL" > Click "Check AutoSSL Status"
   - Or use "Force Renewal"

3. **Check if subdomain is pointing correctly:**
   - DNS records for `express.ousadbazar.com` should point to your cPanel IP
   - Verify with: `nslookup express.ousadbazar.com`

4. **Use HTTP temporarily for testing:**
   ```bash
   # Test on HTTP first
   curl http://express.ousadbazar.com/
   ```

---

### 🔴 Issue: Port already in use

**Error Message:**

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Symptoms:**

- Application won't start
- Another process using port 5000

**Solutions:**

1. **Change PORT environment variable:**
   - cPanel > Node.js Manager > [Your App] > Environment Variables
   - Change `PORT=5000` to `PORT=3000` (or any available port)
   - Restart application

2. **Find ports in use:**

   ```bash
   # SSH
   netstat -tuln | grep LISTEN
   # Look for available ports (3000, 8080, 8888, etc.)
   ```

3. **Kill process on port 5000:**
   ```bash
   # Find PID
   lsof -i :5000
   # Kill it (ask cPanel support first!)
   kill -9 PID
   ```

---

### 🔴 Issue: CORS errors from frontend

**Error Message:**

```
Access to XMLHttpRequest from 'https://frontend.com' blocked by CORS policy
```

**Symptoms:**

- Frontend can't communicate with API
- API works when tested directly with curl

**Solutions:**

1. **Verify FRONTEND_URL in environment:**

   ```bash
   echo $FRONTEND_URL  # Should show your frontend domain with https://
   ```

2. **Update FRONTEND_URL if needed:**
   - cPanel > Node.js Manager > [Your App] > Environment Variables
   - Update `FRONTEND_URL=https://yourfrontend.com`
   - **Restart Application**

3. **Check app.ts CORS configuration:**

   ```typescript
   // In src/app/app.ts, origin should include your frontend
   cors({
     origin: [envVars.FRONTEND_URL, "http://localhost:3000"],
   });
   ```

4. **For development/testing:**
   ```bash
   # Add your frontend domain to CORS
   # Or temporarily allow all origins (NOT for production)
   origin: "*"
   ```

---

### 🔴 Issue: Migrations not running

**Error Message:**

```
Error: Connection to database failed or migration file not found
```

**Symptoms:**

- Database tables not created
- "relation does not exist" errors

**Solutions:**

1. **Manually run migrations:**

   ```bash
   cd ~/public_html/api
   pnpm prisma:migrate
   ```

2. **Check migration files exist:**

   ```bash
   ls -la prisma/migrations/
   # Should see folders like: 20260404180649_init, etc.
   ```

3. **Force migration (if you know it's safe):**

   ```bash
   pnpm prisma migrate resolve --rolled-back 20260404180649_init
   pnpm prisma migrate deploy
   ```

4. **Check Prisma client is generated:**
   ```bash
   cd ~/public_html/api
   pnpm prisma:generate
   ```

---

### 🟡 Issue: Node.js version mismatch

**Symptoms:**

- Build succeeds but app crashes at runtime
- Unexpected syntax errors
- Module compatibility issues

**Solutions:**

1. **Check Node.js version in cPanel:**
   - cPanel > Node.js Manager > [Your App]
   - Should be 18.x or 20.x

2. **To change Node.js version:**
   - cPanel > Node.js Manager
   - Edit application
   - Change Node.js version to 20.x
   - Restart application

3. **Verify locally:**
   ```bash
   node --version   # Should be v18.x or v20.x
   npm --version    # Should be v9+
   ```

---

### 🟡 Issue: Slow application startup

**Symptoms:**

- First request takes 20+ seconds
- Subsequent requests are fast

**Causes:**

- Prisma client generation at startup
- Database connection pooling warmup
- Large dependency tree

**Solutions:**

1. **Pre-warm Prisma client:**

   ```bash
   cd ~/public_html/api
   pnpm prisma:generate  # Generate before app starts
   ```

2. **Enable connection pooling:**
   - Check DATABASE_URL includes connection pool settings
   - Add `?schema=public` to DATABASE_URL if needed

3. **Monitor startup:**
   ```bash
   npm start  # Watch for startup messages
   # Should see "Server is running on port 5000" within 5 seconds
   ```

---

## Quick Diagnostic Commands

Run these via SSH to diagnose issues:

```bash
# Check Node.js version
node --version

# Check npm/pnpm version
npm --version
pnpm --version

# Check if port is in use
lsof -i :5000

# Check CPU/memory usage
top -n 1 | head -20

# Check disk space
df -h

# Test database connection
psql $DATABASE_URL -c "SELECT 1"

# Verify .env file is readable
cat .env  # (careful, shows secrets)

# Check application files permissions
ls -la ~/public_html/api/

# View last 50 lines of logs
tail -50 ~/logs/nodejs.log

# Check if SSL certificate exists
ls -la /usr/share/ssl/certs/
```

---

## When All Else Fails

1. **Restart the entire application:**

   ```bash
   # cPanel > Node.js Manager > [Your App] > Restart Application
   ```

2. **Verify configuration again:**
   - Check all env variables are set
   - Verify DATABASE_URL is correct
   - Make sure BETTER_AUTH_URL has https://

3. **Reinstall dependencies:**

   ```bash
   cd ~/public_html/api
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

4. **Check cPanel support/logs:**
   - cPanel > Node.js Manager > Logs tab
   - Check server error logs at `/home/yourusername/logs/`

5. **Contact hosting support:**
   - Provide cPanel logs
   - Provide SSH terminal output
   - Ask to check firewall/network rules

---

## Useful Resources

- **cPanel Documentation:** https://documentation.cpanel.net/
- **Node.js on cPanel:** https://documentation.cpanel.net/display/EA4/Node.js
- **Prisma Error Reference:** https://www.prisma.io/docs/reference/api-reference/error-reference
- **PostgreSQL Connection String:** https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING

---

**Domain:** express.ousadbazar.com
**Last Updated:** April 10, 2025
