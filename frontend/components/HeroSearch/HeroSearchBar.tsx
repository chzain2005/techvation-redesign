"use client"; // A controlled input that filters content while you type.

import type { FormEvent } from "react";
import Button from "@/components/Button/Button";
import Glyph from "@/components/Icon/Glyph";
import { cn } from "@/lib/cn";

type HeroSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  /** Called on "Search" or Enter, e.g. to scroll to the results. */
  onSubmit?: () => void;
  /** Read by screen readers (the field has no visible label). */
  label: string;
  placeholder: string;
  submitLabel: string;
  className?: string;
};

/**
 * The white search pill on a dark hero (FAQs, Blog): search icon, field and
 * a gradient "Search" button. The button is a bit smaller on phones.
 */
export default function HeroSearchBar({
  value,
  onChange,
  onSubmit,
  label,
  placeholder,
  submitLabel,
  className,
}: HeroSearchBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.();
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn(
        "mt-2 flex w-full items-center gap-3 rounded-full bg-white py-1.5 pr-1.5 pl-5 shadow-search md:py-2 md:pr-2 md:pl-5.5",
        className,
      )}
    >
      <Glyph name="search" size={20} className="text-muted" />
      <label className="min-w-0 flex-1">
        <span className="sr-only">{label}</span>
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-body-sm text-heading outline-none placeholder:text-muted md:text-body-base"
        />
      </label>
      <span className="md:hidden">
        <Button type="submit" size="md" showIcon={false}>
          {submitLabel}
        </Button>
      </span>
      <span className="max-md:hidden">
        <Button type="submit" showIcon={false}>
          {submitLabel}
        </Button>
      </span>
    </form>
  );
}
