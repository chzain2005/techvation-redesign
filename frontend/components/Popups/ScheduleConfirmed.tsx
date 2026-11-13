import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import { scheduleCall } from "@/data/popups";
import {
  formatLongDate,
  formatTimeRange,
  googleCalendarLink,
  outlookCalendarLink,
  zonedMoment,
} from "@/lib/schedule";
import { ScheduleProgress, ScheduleSteps } from "./ScheduleParts";

type ScheduleConfirmedProps = {
  /** The booked day. */
  day: Date;
  /** Start time, as minutes after midnight. */
  minutes: number;
  /** Official name of the chosen time zone, e.g. "Asia/Karachi". */
  timeZone: string;
  /** Short label of that time zone, e.g. "PKT". */
  zoneShort: string;
  /** Where the invite goes. */
  email: string;
};

/**
 * Step 3 of "Schedule a Call": the booking is confirmed. Shows the date and
 * time again and two buttons that add the call to the visitor's calendar.
 */
export default function ScheduleConfirmed({
  day,
  minutes,
  timeZone,
  zoneShort,
  email,
}: ScheduleConfirmedProps) {
  const { confirmedStep, durationMinutes } = scheduleCall;

  // The calendar links need the exact start and end of the call.
  const start = zonedMoment(day, minutes, timeZone);
  const end = new Date(start.getTime() + durationMinutes * 60000);
  const event = {
    title: confirmedStep.eventTitle,
    details: confirmedStep.eventDetails,
    start,
    end,
  };

  /* The three lines of the summary card. */
  const rows = [
    { icon: "/assets/icons/calendar-brand.svg", text: formatLongDate(day) },
    {
      icon: "/assets/icons/clock-brand.svg",
      text: `${formatTimeRange(minutes, durationMinutes)} (${zoneShort})`,
    },
    { icon: "/assets/icons/video-brand.svg", text: confirmedStep.meeting },
  ];

  return (
    <div className="flex flex-col items-center gap-3.5 px-5 pt-3.5 pb-6 text-center md:gap-4 md:p-11">
      {/* Phones: the slim progress bar of the bottom sheet. Larger screens:
          the numbered steps. */}
      <div className="md:hidden">
        <ScheduleProgress current={3} />
      </div>
      <div className="hidden md:block">
        <ScheduleSteps current={3} />
      </div>

      {/* Round gradient icon with a white tick */}
      <span className="grid size-21 place-items-center rounded-full bg-brand">
        <Icon src="/assets/icons/check-white-40.svg" size={40} />
      </span>

      <h2 className="font-heading text-popup-title-sm font-semibold text-heading md:text-popup-title-lg">
        {confirmedStep.title}
      </h2>
      <p className="max-w-110 text-small text-body md:text-body-base">
        {confirmedStep.descriptionStart}
        {/* Long email addresses may wrap instead of overflowing. */}
        <span className="wrap-anywhere">{email}</span>
        {confirmedStep.descriptionEnd}
      </p>

      {/* Summary card: date, time and where the call takes place */}
      <ul className="flex w-full max-w-117.5 flex-col gap-2.5 rounded-2xl bg-surface p-5 text-left">
        {rows.map((row) => (
          <li key={row.icon} className="flex items-center gap-2.5 text-label font-semibold text-heading">
            <Icon src={row.icon} size={16} scale />
            {row.text}
          </li>
        ))}
      </ul>

      {/* Each button opens that calendar in a new tab with the call filled in. */}
      {/* Phones: stacked, full-width buttons. */}
      <div className="flex w-full flex-col gap-2.5 md:w-auto md:flex-row md:flex-wrap md:justify-center">
        <Button
          href={googleCalendarLink(event)}
          newTab
          variant="outlineDark"
          size="md"
          showIcon={false}
          className="w-full md:w-auto"
        >
          {confirmedStep.googleLabel}
        </Button>
        <Button
          href={outlookCalendarLink(event)}
          newTab
          variant="outlineDark"
          size="md"
          showIcon={false}
          className="w-full md:w-auto"
        >
          {confirmedStep.outlookLabel}
        </Button>
      </div>

      <p className="text-caption font-medium text-muted">{confirmedStep.note}</p>
    </div>
  );
}
