/*
 * The first thing editors see after signing in: a short welcome, buttons
 * for the most common jobs, and three tips. The full list of everything
 * that can be edited follows below it.
 */
import Link from "next/link";
import type { Payload } from "payload";
import "./admin.css";

const tasks = [
  { title: "Change homepage text", text: "Headlines, buttons, stats and sections of the homepage.", href: "/admin/globals/homepage", icon: "layers" },
  { title: "Write a blog post", text: "Add an article. Save it as a draft until it is ready.", href: "/admin/collections/posts/create", icon: "file-text" },
  { title: "Post a job opening", text: "Add a role to the Careers page, or hide a filled one.", href: "/admin/collections/jobs", icon: "briefcase" },
  { title: "Edit a service", text: "Text, photo, FAQs and tools of a service page.", href: "/admin/collections/services", icon: "sliders" },
  { title: "Update FAQs", text: "Add, change or reorder questions and answers.", href: "/admin/collections/faq-categories", icon: "message" },
  { title: "Manage the team", text: "People shown under Leadership on the About page.", href: "/admin/collections/team-members", icon: "users" },
  { title: "Client logos", text: "The scrolling logos under the homepage hero.", href: "/admin/collections/clients", icon: "award" },
  { title: "Contact details & footer", text: "Phone numbers, email, social links and menus.", href: "/admin/globals/site-settings", icon: "phone" },
];

const tips = [
  { title: "Saving publishes", text: "When you press Save, the website updates within seconds. Blog posts can be saved as drafts first." },
  { title: "Drag to reorder", text: "In any list (services, team, FAQs, logos…), drag the ⠿ handle to change the order on the website." },
  { title: "See it live", text: "Use the ↗ button at the top of an edit screen to open that page on the website." },
];

/** How many form submissions have not been handled yet. */
async function countNew(payload: Payload) {
  try {
    const { totalDocs } = await payload.count({ collection: "form-submissions", where: { status: { equals: "new" } } });
    return totalDocs;
  } catch {
    return 0;
  }
}

export async function Dashboard({ payload }: { payload: Payload }) {
  const newCount = await countNew(payload);
  return (
    <div className="tv-dashboard">
      <div className="tv-dashboard__intro">
        <h1 className="tv-dashboard__title">Welcome to the Techvation website editor</h1>
        <p className="tv-dashboard__lead">
          Everything on thetechvation.com can be changed here. Pick a task below, or use the menu on the left.
        </p>
      </div>

      <Link
        href="/admin/collections/form-submissions?where[status][equals]=new"
        className={`tv-dashboard__inbox${newCount ? " has-new" : ""}`}
      >
        <span className="tv-dashboard__inbox-count">{newCount}</span>
        <span className="tv-dashboard__inbox-text">
          <strong>{newCount === 1 ? "new request" : "new requests"} in the inbox</strong>
          <span>Contact forms, consultations, call bookings, job applications and sign-ups from the website.</span>
        </span>
        <span className="tv-dashboard__inbox-cta">Open inbox →</span>
      </Link>

      <h2 className="tv-dashboard__heading">What would you like to do?</h2>
      <ul className="tv-dashboard__tasks">
        {tasks.map((task) => (
          <li key={task.title}>
            <Link href={task.href} className="tv-dashboard__task">
              <span
                className="tv-dashboard__task-icon"
                style={{
                  maskImage: `url(/assets/icons/glyph/${task.icon}.svg)`,
                  WebkitMaskImage: `url(/assets/icons/glyph/${task.icon}.svg)`,
                }}
              />
              <span className="tv-dashboard__task-title">{task.title}</span>
              <span className="tv-dashboard__task-text">{task.text}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="tv-dashboard__tips">
        {tips.map((tip) => (
          <li key={tip.title} className="tv-dashboard__tip">
            <strong>{tip.title}</strong>
            <span>{tip.text}</span>
          </li>
        ))}
      </ul>

      <h2 className="tv-dashboard__heading">Everything you can edit</h2>
    </div>
  );
}
