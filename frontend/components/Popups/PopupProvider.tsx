"use client"; // Remembers which pop-up is open and what the visitor typed.

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { consultationPopup, consultationSuccess, scheduleCall } from "@/data/popups";
import {
  firstAvailableDay,
  formatShortDate,
  formatTimeRange,
  startOfToday,
} from "@/lib/schedule";
import ConsultationPopup from "./ConsultationPopup";
import ConsultationSuccess from "./ConsultationSuccess";
import PopupShell, { PopupCloseButton } from "./PopupShell";
import ScheduleConfirmed from "./ScheduleConfirmed";
import ScheduleDateStep from "./ScheduleDateStep";
import ScheduleDetailsStep from "./ScheduleDetailsStep";
import {
  ScheduleInfoPanel,
  ScheduleMobileHeader,
  ScheduleProgress,
  ScheduleSteps,
} from "./ScheduleParts";

/** The visitor's details. Typed once, then reused in the next form. */
export type Contact = {
  name: string;
  email: string;
  phone: string;
  company: string;
};

/** The call being booked. */
export type Booking = {
  day: Date;
  /** Start time as minutes after midnight, or null while none is chosen. */
  minutes: number | null;
  /** Official time zone name, e.g. "Asia/Karachi". */
  timeZone: string;
};

/**
 * The pop-ups, in the order a visitor sees them:
 *
 *   consultation -> success -> date -> details -> confirmed
 *   (form)          (thanks)   (Schedule a Call: steps 1, 2 and 3)
 */
type Step = "consultation" | "success" | "date" | "details" | "confirmed";

type Popups = {
  /** Opens the "Get your free consultation" pop-up. */
  openConsultation: () => void;
  /** Opens the "Schedule a Call" pop-up directly at its first step. */
  openScheduleCall: () => void;
};

const PopupContext = createContext<Popups | null>(null);

/**
 * Gives a component the functions that open the pop-ups:
 *
 *   const { openConsultation } = usePopups();
 *   <Button onClick={openConsultation}>Free Consultation</Button>
 */
export function usePopups() {
  const popups = useContext(PopupContext);
  if (!popups) throw new Error("usePopups must be used inside <PopupProvider>.");
  return popups;
}

const emptyContact: Contact = { name: "", email: "", phone: "", company: "" };

/** A fresh booking: the first free day, no time yet, the visitor's own time
    zone if we offer it. */
function newBooking(): Booking {
  const ownZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isOffered = scheduleCall.timeZones.some((zone) => zone.id === ownZone);
  return {
    day: firstAvailableDay(startOfToday()),
    minutes: null,
    timeZone: isOffered ? ownZone : scheduleCall.defaultTimeZone,
  };
}

/* Width of the white window for each step. */
const windowSize: Record<Step, string> = {
  consultation: "max-w-150",
  success: "max-w-130",
  date: "max-w-270",
  details: "max-w-270",
  confirmed: "max-w-140",
};

/* Name of each pop-up for screen readers. */
const windowLabel: Record<Step, string> = {
  consultation: consultationPopup.title,
  success: consultationSuccess.titleFallback,
  date: scheduleCall.info.title,
  details: scheduleCall.info.title,
  confirmed: scheduleCall.confirmedStep.title,
};

/**
 * Wraps the page and shows the pop-ups on top of it.
 * Any component inside can open one with usePopups().
 */
export default function PopupProvider({ children }: { children: ReactNode }) {
  // Which pop-up is showing; null means none.
  const [step, setStep] = useState<Step | null>(null);
  const [contact, setContact] = useState<Contact>(emptyContact);
  const [booking, setBooking] = useState<Booking | null>(null);

  const openConsultation = useCallback(() => setStep("consultation"), []);
  const openScheduleCall = useCallback(() => {
    setBooking(newBooking());
    setStep("date");
  }, []);
  const popups = useMemo(
    () => ({ openConsultation, openScheduleCall }),
    [openConsultation, openScheduleCall],
  );

  /** Closes the pop-up and forgets what was typed. */
  function close() {
    setStep(null);
    setContact(emptyContact);
    setBooking(null);
  }

  const zone = scheduleCall.timeZones.find((item) => item.id === booking?.timeZone);

  return (
    <PopupContext.Provider value={popups}>
      {children}

      {step && (
        <PopupShell
          // Steps 1 and 2 of the call share one window, so it does not
          // animate in again when moving between them.
          step={step === "details" ? "date" : step}
          label={windowLabel[step]}
          onClose={close}
          className={windowSize[step]}
        >
          {step === "consultation" && (
            <ConsultationPopup
              onClose={close}
              onSubmitted={(details) => {
                setContact(details);
                setStep("success");
              }}
            />
          )}

          {step === "success" && (
            <ConsultationSuccess name={contact.name} onPickTime={openScheduleCall} onClose={close} />
          )}

          {/* Schedule a Call, steps 1 and 2: dark info panel on the left
              (large screens only), the step on the right. */}
          {(step === "date" || step === "details") && booking && (
            <div className="flex lg:min-h-160">
              <ScheduleInfoPanel />
              <div className="flex min-w-0 flex-1 flex-col gap-3.5 px-5 pt-3.5 pb-6 md:gap-5 md:px-8 md:py-7">
                {/* Phones: photo and title, then a progress bar.
                    Larger screens: the numbered steps. */}
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 md:hidden">
                    <ScheduleMobileHeader />
                  </div>
                  <div className="hidden md:block">
                    <ScheduleSteps current={step === "date" ? 1 : 2} />
                  </div>
                  <PopupCloseButton onClick={close} />
                </div>
                <div className="md:hidden">
                  <ScheduleProgress current={step === "date" ? 1 : 2} />
                </div>

                {step === "date" && (
                  <ScheduleDateStep
                    booking={booking}
                    onChange={(changes) => setBooking({ ...booking, ...changes })}
                    onNext={() => setStep("details")}
                  />
                )}

                {step === "details" && booking.minutes !== null && (
                  <ScheduleDetailsStep
                    summary={`${formatShortDate(booking.day)} · ${formatTimeRange(
                      booking.minutes,
                      scheduleCall.durationMinutes,
                    )} (${zone?.short})`}
                    contact={contact}
                    onBack={() => setStep("date")}
                    onConfirmed={(details) => {
                      setContact(details);
                      setStep("confirmed");
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {step === "confirmed" && booking && booking.minutes !== null && (
            <ScheduleConfirmed
              day={booking.day}
              minutes={booking.minutes}
              timeZone={booking.timeZone}
              zoneShort={zone?.short ?? ""}
              email={contact.email}
            />
          )}
        </PopupShell>
      )}
    </PopupContext.Provider>
  );
}
