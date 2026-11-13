import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import { consultationSuccess } from "@/data/popups";

type ConsultationSuccessProps = {
  /** The visitor's full name from the form; we greet them by first name. */
  name: string;
  /** "Pick a Call Time Now" was clicked. */
  onPickTime: () => void;
  onClose: () => void;
};

/** Pop-up 2: the thank-you message after the consultation form was sent. */
export default function ConsultationSuccess({ name, onPickTime, onClose }: ConsultationSuccessProps) {
  const firstName = name.trim().split(/\s+/)[0];

  return (
    <div className="flex flex-col items-center gap-4 p-8 text-center md:p-11">
      {/* Round gradient icon with a white tick */}
      <span className="grid size-21 place-items-center rounded-full bg-brand shadow-brand-icon">
        <Icon src="/assets/icons/check-white-40.svg" size={40} />
      </span>

      <h2 className="font-heading text-popup-title-lg font-semibold text-heading">
        {firstName
          ? `${consultationSuccess.titleStart}${firstName}${consultationSuccess.titleEnd}`
          : consultationSuccess.titleFallback}
      </h2>
      <p className="max-w-105 text-body-base text-body">{consultationSuccess.description}</p>

      <Button onClick={onPickTime}>{consultationSuccess.primaryLabel}</Button>

      <button
        type="button"
        onClick={onClose}
        className="cursor-pointer text-label font-semibold text-primary underline-offset-4 hover:underline"
      >
        {consultationSuccess.closeLabel}
      </button>
    </div>
  );
}
