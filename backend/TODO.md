# TODO: Fix Sign-In Issue

## Current Status
- Backend sign-in route and controller implemented
- Frontend auth hook implemented
- Demo users created via seed script
- Issue: Sign-in not working (no response)

## Steps to Fix

### 1. Verify Backend Server
- [ ] Start backend server: `cd backend && npm run dev`
- [ ] Confirm server running on http://localhost:5000
- [ ] Check server logs for any startup errors

### 2. Seed Database
- [ ] Run seed script: `cd backend && npx ts-node src/scripts/seed.ts`
- [ ] Confirm demo users created (admin@campus.com, student@campus.com, warden@campus.com with password 'admin123')

### 3. Verify Frontend Configuration
- [ ] Check VITE_API_URL environment variable in frontend/.env
- [ ] Ensure it points to http://localhost:5000/api
- [ ] Start frontend: `cd frontend && npm run dev`

### 4. Test API Endpoint
- [ ] Test sign-in endpoint with curl:
  ```
  curl -X POST http://localhost:5000/api/auth/signin \
    -H "Content-Type: application/json" \
    -d '{"email":"student@campus.com","password":"admin123"}'
  ```
- [ ] Verify response contains token and user data

### 5. Check CORS and Middleware
- [ ] Verify CORS configuration in server.ts allows frontend origin
- [ ] Check rate limiting not blocking requests
- [ ] Ensure validation middleware not causing issues

### 6. Add Debugging
- [ ] Add console.log in signIn controller to track execution
- [ ] Check browser network tab for failed requests
- [ ] Verify JWT_SECRET environment variable set

### 7. Test End-to-End
- [ ] Attempt sign-in from frontend UI
- [ ] Check browser console for errors
- [ ] Verify token stored in localStorage
