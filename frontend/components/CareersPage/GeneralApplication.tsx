"use client"; // Form, file upload and the "Apply now" hand-off need the browser.

import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import Button from "@/components/Button/Button";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Glyph from "@/components/Icon/Glyph";
import Icon from "@/components/Icon/Icon";
import { careersPage, type Position } from "@/data/careers";
import { mergeContent } from "@/lib/cms/normalize";
import { cn } from "@/lib/cn";
import { APPLY_EVENT } from "./OpenPositions";
import { trackFormSubmit } from "@/lib/analytics";

const fieldClasses =
  "w-full rounded-xl border border-border bg-white px-4 py-3.5 text-small text-heading outline-none transition-colors placeholder:text-muted focus:border-primary";
const labelClasses = "flex flex-col gap-2 text-label-sm font-semibold text-heading";

/**
 * "Don't see the right role? Send us your CV": text on the left, the
 * application form on the right (stacked below xl).
 *
 * "Apply now" on a role fills in that role and its department here. The CV
 * box takes a PDF of up to 5 MB, by clicking or by dragging it in.
 */
export default function GeneralApplication({ content }: { content: Partial<typeof careersPage> }) {
  const { application, positions } = mergeContent(careersPage, content);
  const [role, setRole] = useState<Position | null>(null);
  const [area, setArea] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  // Listen for "Apply now" on the open roles list.
  useEffect(() => {
    function handleApply(event: Event) {
      const position = (event as CustomEvent<Position>).detail;
      setRole(position);
      setArea(position.department);
      setIsSent(false);
    }
    window.addEventListener(APPLY_EVENT, handleApply);
    return () => window.removeEventListener(APPLY_EVENT, handleApply);
  }, []);

  /** Accepts a PDF up to 5 MB, otherwise shows why not. */
  function pickFile(candidate: File | undefined) {
    if (!candidate) return;
    if (candidate.type !== "application/pdf" && !candidate.name.toLowerCase().endsWith(".pdf")) {
      setFileError(application.upload.wrongType);
    } else if (candidate.size > application.upload.maxBytes) {
      setFileError(application.upload.tooBig);
    } else {
      setFileError("");
      setFile(candidate);
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    pickFile(event.dataTransfer.files[0]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page.
    event.preventDefault();
    // Record the sent form in Google Analytics (no personal details).
    trackFormSubmit("careers_application", "job_application", {
      job_role: role?.title ?? "general",
      job_area: area || undefined,
    });
    // TODO: send the form (with the CV file and `role`) to the backend once
    // the careers endpoint exists, e.g. as multipart/form-data.
    setIsSent(true);
    setRole(null);
    setArea("");
    setFile(null);
    event.currentTarget.reset();
  }

  return (
    <section id="apply" className="scroll-mt-navbar bg-white">
      <div className="mx-auto flex w-full max-w-page flex-col gap-10 page-x section-y xl:flex-row xl:items-center xl:gap-20">
        <div className="flex min-w-0 flex-col items-start gap-4 xl:flex-1">
          <Eyebrow>{application.eyebrow}</Eyebrow>
          <h2 className="font-heading text-h2-sm font-bold text-heading md:text-h2-md xl:max-w-140 xl:text-h2">
            {application.heading.lead}
            <span className="text-gradient-brand">{application.heading.highlight}</span>
            {application.heading.tail}
          </h2>
          <p className="text-body-sm text-body md:text-body-base xl:max-w-140 xl:text-body-lg">{application.description}</p>
        </div>

        <div className="w-full rounded-feature border border-border bg-white p-6 shadow-panel md:p-9 xl:w-140 xl:shrink-0">
          {isSent ? (
            <div role="status" className="flex flex-col items-center gap-3 py-10 text-center">
              <span className="rounded-full bg-brand p-4 text-white">
                <Glyph name="check" size={28} />
              </span>
              <p className="font-heading text-popup-title-sm font-semibold text-heading">{application.successTitle}</p>
              <p className="max-w-90 text-small text-body">{application.successText}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {role && (
                <p className="flex flex-wrap items-center gap-2 rounded-xl bg-surface-tint px-4 py-3 text-small text-primary-dark">
                  <Glyph name="briefcase" size={16} />
                  {application.applyingFor}: <strong className="font-semibold">{role.title}</strong>
                  <input type="hidden" name="role" value={role.title} />
                </p>
              )}

              <label className={labelClasses}>
                {application.fields.name.label}
                <input type="text" name="name" required autoComplete="name" placeholder={application.fields.name.placeholder} className={fieldClasses} />
              </label>
              <label className={labelClasses}>
                {application.fields.email.label}
                <input type="email" name="email" required autoComplete="email" placeholder={application.fields.email.placeholder} className={fieldClasses} />
              </label>
              <label className={labelClasses}>
                {application.fields.area.label}
                <span className="relative">
                  <select
                    name="area"
                    required
                    value={area}
                    onChange={(event) => setArea(event.target.value)}
                    className={cn(fieldClasses, "cursor-pointer appearance-none pr-11", !area && "text-muted")}
                  >
                    <option value="" disabled>
                      {application.fields.area.placeholder}
                    </option>
                    {[...positions.departments, application.fields.area.other].map((item) => (
                      <option key={item} value={item} className="text-heading">
                        {item}
                      </option>
                    ))}
                  </select>
                  <Icon
                    src="/assets/icons/chevron-down-body-18.svg"
                    size={18}
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
                  />
                </span>
              </label>

              {/* CV upload: click to browse or drop a file on the box. */}
              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={cn(
                  "relative flex flex-col items-center gap-2 rounded-2xl border border-dashed p-6 text-center transition-colors",
                  isDragging ? "border-primary bg-surface-tint" : "border-primary/40 bg-surface",
                )}
              >
                <input
                  ref={fileInput}
                  id="cv-file"
                  type="file"
                  name="cv"
                  accept="application/pdf,.pdf"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => pickFile(event.target.files?.[0])}
                  className="sr-only"
                />
                <Glyph name="paperclip" size={22} className="text-primary" />
                {file ? (
                  <>
                    <p className="max-w-full truncate text-label font-semibold text-primary-dark">{file.name}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        if (fileInput.current) fileInput.current.value = "";
                      }}
                      className="cursor-pointer text-caption font-medium text-body underline underline-offset-2 hover:text-primary"
                    >
                      {application.upload.remove}
                    </button>
                  </>
                ) : (
                  <>
                    <label htmlFor="cv-file" className="cursor-pointer text-label font-semibold text-primary-dark after:absolute after:inset-0">
                      {application.upload.title}
                    </label>
                    <p className="text-caption font-medium text-body">{application.upload.hint}</p>
                  </>
                )}
                {fileError && (
                  <p role="alert" className="text-caption font-medium text-danger">
                    {fileError}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                {application.submitLabel}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
