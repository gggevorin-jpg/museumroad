interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  theme = "light",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const titleClass = theme === "dark" ? "text-bg" : "text-ink";
  const subtitleClass = theme === "dark" ? "text-bg/60" : "text-ink-soft";
  const overlineClass = theme === "dark" ? "text-bg/50" : "text-ink-soft";

  return (
    <div className={`flex flex-col gap-4 mb-14 sm:mb-16 ${alignClass}`}>
      <span
        className={`text-xs font-medium tracking-[0.2em] uppercase ${overlineClass}`}
      >
        {badge}
      </span>
      <h2 className={`font-serif text-3xl sm:text-4xl ${titleClass}`}>{title}</h2>
      {subtitle && (
        <p className={`max-w-xl text-sm leading-7 sm:text-base ${subtitleClass}`}>{subtitle}</p>
      )}
    </div>
  );
}
