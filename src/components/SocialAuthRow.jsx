
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.3C29.4 34.9 26.8 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.5 5.3C41 35.9 44 30.4 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.462 2.166-1.212 2.913-.813.822-2.14 1.457-3.153 1.372-.132-1.09.44-2.245 1.163-2.964.81-.822 2.185-1.44 3.202-1.321zM20.28 17.06c-.552 1.276-.816 1.847-1.526 2.976-.99 1.573-2.386 3.532-4.116 3.548-1.541.016-1.938-1.005-4.029-.994-2.09.011-2.53 1.01-4.07.995-1.73-.017-3.05-1.784-4.04-3.357-2.774-4.4-3.066-9.567-1.354-12.318 1.213-1.952 3.13-3.093 4.937-3.093 1.84 0 2.997 1.011 4.518 1.011 1.474 0 2.376-1.014 4.518-1.014 1.617 0 3.33.883 4.55 2.406-4.001 2.19-3.352 7.899.612 9.84z" />
    </svg>
  );
}

export default function SocialAuthRow({ label, onGoogleClick, googleLoading = false }) {
  return (
    <div className="mt-5">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-ink-100" />
        <span className="text-xs text-ink-500">{label}</span>
        <span className="h-px flex-1 bg-ink-100" />
      </div>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={onGoogleClick}
          disabled={googleLoading}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-ink-100 text-sm font-medium text-ink-900 hover:border-ink-300 disabled:opacity-60"
        >
          <GoogleIcon /> {googleLoading ? "Connecting…" : "Google"}
        </button>
        <button
          type="button"
          disabled
          title="Apple sign-in isn't set up yet"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-ink-100 text-sm font-medium text-ink-400 opacity-60"
        >
          <AppleIcon /> Apple
        </button>
      </div>
    </div>
  );
}