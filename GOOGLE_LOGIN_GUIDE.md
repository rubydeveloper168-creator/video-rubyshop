# Google Login Guide

## Overview
The application uses **Laravel Socialite** for Google OAuth 2.0. Users can authenticate with their Google account directly from the login or registration screen. When Google login is active, the UI shows a “Continue with Google” button featuring the Google icon; clicking it launches the OAuth flow.

### Flow Summary
1. **User action**: Clicks “Continue with Google”.
2. **Redirect**: Browser is sent to Google’s consent screen (`/auth/google`).
3. **Callback**: Google redirects back to `/auth/google/callback` with an auth code.
4. **Socialite**: Exchanges the code for user profile + tokens.
5. **Account handling**:
   - Existing user → tokens refreshed, session logged in.
   - New user → account created (`email_verified_at` auto-filled), role = student.
6. **Post-login redirect**: Students go to the course catalog, admins/instructors go to the dashboard (respecting any stored intended URL).

## Configuration
### Environment Variables
Set these in `.env` (already supported by the middleware fallback):
```env
GOOGLE_STATUS=true
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-secret
GOOGLE_REDIRECT_URI=https://your-domain.com/auth/google/callback
```
> For local dev use `http://127.0.0.1:8000/auth/google/callback` and list it in your Google Cloud OAuth consent screen.

### Settings UI (Optional)
Dashboard → Settings → Auth → Google. If the fields are filled here, the middleware uses them; otherwise it falls back to `.env`. The “Active” toggle mirrors `GOOGLE_STATUS`.

### Routes
Declared in `routes/auth.php`:
```php
Route::get('auth/google', [GoogleAuthController::class, 'show'])->name('auth.google.redirect');
Route::get('auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');
```
Only accessible to guests; the `authConfig` middleware injects Google settings before the redirect occurs.

## Server-Side Logic
- **Controller**: `app/Http/Controllers/Auth/GoogleAuthController.php`
  - `show()` stores the origin (`from` session key) and triggers `Socialite::driver('google')->redirect()`.
  - `callback()` retrieves the Google user data, finds or creates a local user via `AuthService`, logs them in, updates tokens, and redirects appropriately.
- **Service**: `app/Services/AuthService.php`
  - `googleAuthStatus()` exposes whether Google login is enabled—used by the login/register view to determine visibility of the button.
  - `googleAuthRegister()` creates a student record, marks the email verified, and stores Google tokens.
  - `updateGoogleTokens()` refreshes stored tokens when an existing user signs in again.
- **Middleware**: `app/Http/Middleware/AuthConfig.php`
  - Loads Google configuration from the Settings table. If empty or disabled, it falls back to environment variables. This ensures the login pages show the button whenever `.env` is configured—even if the settings UI hasn’t been populated.

## Front-End Integration
- **Login/Register Views**: `resources/js/pages/auth/login.tsx` & `resources/js/pages/auth/register.tsx`
  - Receive `googleLogIn` from the Inertia response (populated via `googleAuthStatus()`).
  - Render the Google button when `googleLogIn` is true, using Ziggy’s `route('auth.google.redirect')` helper.
  - Button includes the Google SVG for visual clarity.

## Testing
1. Ensure `.env` (or Settings UI) has a valid Google OAuth client configured.
2. Run `php artisan config:clear` to pick up new env values.
3. Start Laravel (`php artisan serve`) and front-end assets (`npm run dev`).
4. Visit `/login` and confirm the “Continue with Google” button appears.
5. Click the button, sign in with a Google account, and verify:
   - User record exists in `users` table with `google_id` set.
   - Browser redirects to the student catalog (or dashboard for roles other than student).

## Error Handling Tips
- **Button Missing**: Check `config('services.google')` via `php artisan tinker`—status must be true, and client ID/secret must be non-empty.
- **Google OAuth Error**: Confirm the redirect URI matches exactly between Google Cloud Console and `.env` / settings.
- **Account Exists with Different Provider**: The controller ties by `google_id` or `email`. Ensure email uniqueness and that the existing account can accept Google login.

## Related Files
- `.env`
- `routes/auth.php`
- `app/Http/Middleware/AuthConfig.php`
- `app/Http/Controllers/Auth/GoogleAuthController.php`
- `app/Services/AuthService.php`
- `resources/js/pages/auth/login.tsx`
- `resources/js/pages/auth/register.tsx`

