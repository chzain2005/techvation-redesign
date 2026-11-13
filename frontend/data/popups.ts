/*
 * ---------------------------------------------------------------------------
 * POPUP CONTENT
 * ---------------------------------------------------------------------------
 * All text for the pop-ups ("11 · Pop-up" frames in Figma):
 *
 *   Free Consultation form  ->  success  ->  Schedule a Call (3 steps)
 *
 * Like homepage.ts, this file decides WHAT the pop-ups say and the
 * components in /components/Popups decide HOW they look.
 */

const icon = (name: string) => `/assets/icons/${name}.svg`;

/* -------------------------- Free Consultation form ------------------------ */

export const consultationPopup = {
  title: "Get your free consultation",
  subtitle: "Tell us a little about your needs, an expert replies within 24 hours.",
  fields: {
    name: { label: "Full name *", placeholder: "John Smith" },
    company: { label: "Company", placeholder: "Acme Inc." },
    email: { label: "Work email *", placeholder: "john@company.com" },
    phone: { label: "Phone / WhatsApp", placeholder: "+1 (555) 000-0000" },
    service: { label: "Service you’re interested in *", placeholder: "Select a service" },
    goal: {
      label: "Briefly describe your goal",
      placeholder: "e.g. We want to replace spreadsheets with an ERP…",
    },
  },
  submitLabel: "Get My Free Consultation",
  /** Small reassurance line under the button. */
  notes: [
    { label: "Confidential", icon: icon("shield-green-14") },
    { label: "Reply in 24h", icon: icon("clock-green-14") },
    { label: "No obligation", icon: icon("check-green-14") },
  ],
};

/* ------------------------ Free Consultation success ----------------------- */

export const consultationSuccess = {
  /** The visitor's first name is placed between these two parts. */
  titleStart: "Thank you, ",
  titleEnd: "! 🎉",
  /** Used when we do not know the name. */
  titleFallback: "Thank you! 🎉",
  description:
    "Your request is in. A Techvation expert will contact you within 24 hours. Want to skip the wait?",
  primaryLabel: "Pick a Call Time Now",
  closeLabel: "Back to website",
};

/* ----------------------------- Schedule a Call ---------------------------- */

export const scheduleCall = {
  /** The dark panel on the left. */
  info: {
    photo: "/assets/images/popup/consultant.png",
    team: "Techvation Consulting Team",
    title: "Free 30-min strategy call",
    facts: [
      { label: "30 minutes", icon: icon("clock-accent-16") },
      { label: "Google Meet or Microsoft Teams", icon: icon("video-accent-16") },
      { label: "Your local time zone", icon: icon("globe-accent-16") },
      { label: "Free, no obligation", icon: icon("dollar-accent-16") },
    ],
    coverTitle: "What we’ll cover",
    cover: ["Your goals & current systems", "Quick-win opportunities", "Timeline & budget estimate"],
  },

  /** The three numbered steps at the top. */
  steps: ["Date & time", "Your details", "Confirmed"],

  /** Step 1. */
  dateStep: {
    title: "Select a date",
    weekdays: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    legend: { available: "Available", selected: "Selected", unavailable: "Unavailable" },
    timeZoneLabel: "Time zone",
    bookedSuffix: " · booked",
    /** Shown at the bottom until a time has been picked. */
    emptySummary: "Pick a time to continue",
    nextLabel: "Next: Your Details",
  },

  /** Length of the call in minutes. */
  durationMinutes: 30,
  /** How many months ahead a visitor can book. */
  monthsAhead: 3,

  /** Start times offered on every available day, as minutes after midnight.
      "booked" slots are shown greyed out. */
  slots: [
    { minutes: 9 * 60 + 30 },
    { minutes: 10 * 60 + 30 },
    { minutes: 11 * 60 + 30 },
    { minutes: 13 * 60 },
    { minutes: 14 * 60 + 30 },
    { minutes: 16 * 60 },
    { minutes: 17 * 60 + 30, booked: true },
  ] as Array<{ minutes: number; booked?: boolean }>,

  /** Time zones in the dropdown. "id" is the official zone name, "short" is
      the label shown after a time, e.g. "11:30 AM (PKT)". */
  timeZones: [
    { id: "Asia/Karachi", city: "Karachi", short: "PKT" },
    { id: "Asia/Dubai", city: "Dubai", short: "GST" },
    { id: "Asia/Riyadh", city: "Riyadh", short: "AST" },
    { id: "Europe/London", city: "London", short: "UK" },
    { id: "America/New_York", city: "New York", short: "ET" },
    { id: "America/Chicago", city: "Chicago", short: "CT" },
    { id: "America/Los_Angeles", city: "Los Angeles", short: "PT" },
    { id: "Asia/Singapore", city: "Singapore", short: "SGT" },
    { id: "Australia/Sydney", city: "Sydney", short: "AET" },
  ],
  /** Used when the visitor's own time zone is not in the list. */
  defaultTimeZone: "Asia/Karachi",

  /** Step 2. */
  detailsStep: {
    changeLabel: "Change",
    fields: {
      name: { label: "Full name *", placeholder: "John Smith" },
      email: { label: "Work email *", placeholder: "john@company.com" },
      phone: { label: "Phone / WhatsApp", placeholder: "+1 (555) 000-0000" },
      company: { label: "Company", placeholder: "Acme Inc." },
      topic: {
        label: "What would you like to discuss?",
        placeholder: "Goals, current systems, timelines…",
      },
    },
    backLabel: "Back",
    submitLabel: "Confirm Booking",
  },

  /** Step 3. */
  confirmedStep: {
    title: "Your call is booked!",
    /** The visitor's email is placed between these two parts. */
    descriptionStart: "A calendar invite with the meeting link has been sent to ",
    descriptionEnd: ".",
    meeting: "Google Meet · link in your invite",
    googleLabel: "Add to Google Calendar",
    outlookLabel: "Add to Outlook",
    note: "Need to reschedule? Use the link in your email.",
    /** Title and text of the event created by the two calendar buttons. */
    eventTitle: "Techvation strategy call",
    eventDetails: "Free 30-minute strategy call with the Techvation consulting team.",
  },
};
