# Fix Access Denied Student and Warden Dashboard

## Plan
- Investigate role mismatch or access control issues causing access denied on student and warden dashboards
- Verify user role stored in localStorage matches allowedRoles in ProtectedRoute
- Add debug logs in useAuth hook to confirm user role after sign in
- Check frontend routes and allowedRoles consistency with backend roles
- Fix role casing or mapping if mismatch found
- Test sign in and access to student and warden dashboards

## Steps
- [ ] Add debug logs in useAuth hook to verify user role after sign in
- [ ] Verify role casing consistency between backend and frontend
- [ ] Test student dashboard access after sign in
- [ ] Test warden dashboard access after sign in
- [ ] Fix any identified role mismatch issues
- [ ] Verify access control works correctly for both roles

## Dependent Files
- frontend/src/hooks/useAuth.ts
- frontend/src/components/ProtectedRoute.tsx
- frontend/src/App.tsx
- frontend/src/components/SignInModal.tsx
- backend/src/models/User.ts
- backend/src/controllers/authController.ts

## Followup Steps
- Test authentication flow with different user roles
- Verify dashboard access for student and warden users
- Check for any remaining access control issues
