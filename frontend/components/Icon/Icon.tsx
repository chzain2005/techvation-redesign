import Image from "next/image";
import { cn } from "@/lib/cn";

type IconProps = {
  /** Path to the SVG file, e.g. "/assets/icons/clock-13.svg". */
  src: string;
  /** Size of the icon box in pixels (the size used in Figma). */
  size: number;
  /**
   * Most icons were exported from Figma at the exact size they are used, so we
   * show them as-is. A few were exported at 24px and are used smaller; pass
   * `scale` for those so the SVG is resized to fit the box.
   */
  scale?: boolean;
  className?: string;
};

/**
 * Shows one SVG icon from /public/assets/icons inside a fixed square box.
 * Icons are decorative (the text next to them explains the meaning), so the
 * alt text is empty and screen readers skip them.
 */
export default function Icon({ src, size, scale = false, className }: IconProps) {
  return (
    <span
      aria-hidden
      className={cn("grid shrink-0 place-items-center", className)}
      // The box size comes from the `size` prop, so it is set inline.
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        // "h-auto w-auto" lets the SVG keep its own exported size.
        className={scale ? "size-full" : "h-auto w-auto max-w-none"}
      />
    </span>
  );
}
