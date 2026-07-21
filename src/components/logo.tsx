import Image from "next/image";

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
