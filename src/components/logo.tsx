import Image from "next/image";

/**
 * CORESEC FINANCE wordmark: the hexagon "S" mark (public/mark.svg — the brand SVG with its
 * background paths removed and the viewBox cropped to the mark) + the type as live text.
 *
 * The mark's green reads on both surfaces as an accent, so only the wordmark follows the
 * surface via `variant` (dark ink on the cream header, white on the dark footer).
 */
export function Logo({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const dark = variant === "dark";
  const wordColor = dark ? "text-white" : "text-ink";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <Image
        src="/mark.svg"
        width={313}
        height={356}
        alt="Coresec Finance"
        priority
        unoptimized
        className="h-7 w-auto shrink-0"
      />
      <span className="flex flex-col leading-none">
        <span className={`text-[15px] font-extrabold uppercase tracking-[0.14em] ${wordColor}`}>
          Coresec
        </span>
        <span className="mt-[3px] text-[8px] font-semibold uppercase tracking-[0.42em] text-emerald">
          Finance
        </span>
      </span>
    </span>
  );
}
