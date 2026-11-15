/* The Techvation logo on the sign-in screen and the small icon in the admin header. */
/* eslint-disable @next/next/no-img-element -- static brand images in the admin */
import "./admin.css";

export function Logo() {
  return (
    <div className="tv-brand-logo">
      <img src="/assets/logos/techvation-logo.png" alt="Techvation" />
      <span>Website editor</span>
    </div>
  );
}

export function Icon() {
  return <img src="/assets/logos/techvation-icon.png" alt="Techvation" style={{ width: 24, height: 24, borderRadius: 6 }} />;
}
