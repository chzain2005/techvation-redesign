"use client";

/*
 * Replaces the plain "Icon" dropdown with a grid of the actual icons, so
 * editors pick by looking instead of guessing names like "bar-chart".
 */
import { FieldDescription, FieldError, FieldLabel, useField } from "@payloadcms/ui";
import type { SelectFieldClientProps } from "payload";
import "./admin.css";

type Option = { label: string; value: string };

/** Where the picture of an option lives. */
function previewSrc(value: string, kind: string) {
  if (value.startsWith("/")) return value; // already an icon file
  if (kind === "industry") return `/assets/icons/${value}-white-20.svg`;
  return `/assets/icons/glyph/${value}.svg`;
}

export function IconPicker(props: SelectFieldClientProps & { kind?: "glyph" | "file" | "industry" }) {
  const { field, path, readOnly, kind = "glyph" } = props;
  const { value, setValue, showError, errorMessage } = useField<string>({ path });
  const options = (field.options ?? []).map((option) =>
    typeof option === "string" ? { label: option, value: option } : (option as Option),
  );
  const current = options.find((option) => option.value === value);

  /** The picture of one option. */
  const picture = (optionValue: string) => {
    const src = previewSrc(optionValue, kind);
    return kind === "glyph" ? (
      // Line icons are stencils: paint them in the brand colour.
      <span className="tv-icon-picker__glyph" style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }} />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element -- tiny static icon preview
      <img src={src} alt="" className="tv-icon-picker__img" />
    );
  };

  return (
    <div className="field-type tv-icon-picker">
      <FieldLabel label={field.label} path={path} required={field.required} />
      <FieldError path={path} showError={showError} message={errorMessage} />
      <div className="tv-icon-picker__current">
        {current ? picture(current.value) : <span className="tv-icon-picker__empty" />}
        <span>{current ? <>Selected: <strong>{current.label}</strong></> : "No icon chosen yet. Click one below."}</span>
      </div>
      <div className="tv-icon-picker__grid" role="radiogroup" aria-label={String(field.label ?? "Icon")}>
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={readOnly}
              title={option.label}
              onClick={() => setValue(option.value)}
              className={`tv-icon-picker__option${selected ? " is-selected" : ""}`}
            >
              {picture(option.value)}
              <span className="tv-icon-picker__name">{option.label}</span>
            </button>
          );
        })}
      </div>
      <FieldDescription description={field.admin?.description} path={path} />
    </div>
  );
}
