"use client";

/*
 * The "Department" of a job, picked from the departments listed on the
 * Careers page (Pages → Careers page → Open positions) instead of typed.
 */
import { FieldDescription, FieldError, FieldLabel, useConfig, useField } from "@payloadcms/ui";
import type { TextFieldClientProps } from "payload";
import { useEffect, useState } from "react";
import "./admin.css";

export function DepartmentSelect({ field, path, readOnly }: TextFieldClientProps) {
  const { value, setValue, showError, errorMessage } = useField<string>({ path });
  const { config } = useConfig();
  const [departments, setDepartments] = useState<string[] | null>(null);

  useEffect(() => {
    const api = `${config.serverURL ?? ""}${config.routes.api}`;
    fetch(`${api}/globals/careers-page?depth=0`, { credentials: "include" })
      .then((response) => response.json())
      .then((careers) =>
        setDepartments(
          ((careers?.positions?.departments ?? []) as Array<{ text: string }>).map((d) => d.text),
        ),
      )
      .catch(() => setDepartments([]));
  }, [config.serverURL, config.routes.api]);

  return (
    <div className="field-type tv-select">
      <FieldLabel label={field.label} path={path} required={field.required} />
      <FieldError path={path} showError={showError} message={errorMessage} />
      <select
        className="tv-select__input"
        value={value ?? ""}
        disabled={readOnly || departments === null}
        onChange={(event) => setValue(event.target.value)}
      >
        <option value="" disabled>
          {departments === null ? "Loading…" : "Choose a department"}
        </option>
        {/* Keep a value that is no longer in the list visible, so it can be fixed. */}
        {value && departments && !departments.includes(value) && <option value={value}>{value} (not in the list)</option>}
        {departments?.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
      <FieldDescription description={field.admin?.description} path={path} />
    </div>
  );
}
