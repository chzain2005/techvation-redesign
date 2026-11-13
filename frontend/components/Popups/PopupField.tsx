import type { ReactNode } from "react";
import Icon from "@/components/Icon/Icon";
import { cn } from "@/lib/cn";

/* Shared look of the inputs on the white pop-ups. */
const fieldClasses =
  "w-full rounded-xl border border-border bg-white px-4 py-3.5 text-small font-normal text-heading outline-none transition-colors placeholder:text-muted focus:border-primary";

const labelClasses = "flex min-w-0 flex-col gap-2 text-label-sm font-semibold text-heading";

type BaseProps = {
  /** Name of the value when the form is submitted. */
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  /** Text that is already filled in when the form opens. */
  defaultValue?: string;
  className?: string;
};

type InputProps = BaseProps & {
  type?: "text" | "email" | "tel";
  /** Helps the browser offer saved details, e.g. "name" or "email". */
  autoComplete?: string;
};

/** A one-line text field with its label on top. */
export function PopupInput({
  name,
  label,
  placeholder,
  required,
  defaultValue,
  className,
  type = "text",
  autoComplete,
}: InputProps) {
  return (
    <label className={cn(labelClasses, className)}>
      {label}
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={fieldClasses}
      />
    </label>
  );
}

/** A taller field for a few lines of text. */
export function PopupTextarea({
  name,
  label,
  placeholder,
  required,
  defaultValue,
  className,
}: BaseProps) {
  return (
    <label className={cn(labelClasses, className)}>
      {label}
      <textarea
        name={name}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`${fieldClasses} h-27.5 resize-none`}
      />
    </label>
  );
}

type SelectProps = Omit<BaseProps, "defaultValue"> & {
  /** Hide the label visually (screen readers still read it). */
  hideLabel?: boolean;
  /** For a dropdown that React controls: the chosen value and its handler. */
  value?: string;
  onChange?: (value: string) => void;
  /** The <option> elements. */
  children: ReactNode;
};

/** A dropdown: a normal <select> with our own arrow icon on top. */
export function PopupSelect({
  name,
  label,
  placeholder,
  required,
  hideLabel = false,
  value,
  onChange,
  className,
  children,
}: SelectProps) {
  return (
    <label className={cn(labelClasses, className)}>
      <span className={hideLabel ? "sr-only" : undefined}>{label}</span>
      <span className="relative">
        <select
          name={name}
          required={required}
          // With a placeholder the dropdown starts empty; otherwise React
          // controls it through "value".
          {...(onChange
            ? { value, onChange: (event) => onChange(event.target.value) }
            : { defaultValue: "" })}
          className={`${fieldClasses} cursor-pointer appearance-none pr-11 invalid:text-muted`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <Icon
          src="/assets/icons/chevron-down-body-18.svg"
          size={18}
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
        />
      </span>
    </label>
  );
}
