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
  const titleClass = theme === "dark" ? "text-ivory" : "text-navy";
  const subtitleClass = theme === "dark" ? "text-ivory/60" : "text-navy/60";
  return (
    <div className={`flex flex-col gap-3 mb-10 ${alignClass}`}>
      <span className="inline-block w-fit rounded-full bg-gold/10 px-4 py-1 text-sm font-semibold tracking-wide text-gold">
        {badge}
      </span>
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${titleClass}`}>{title}</h2>
      {subtitle && <p className={`max-w-2xl text-sm sm:text-base ${subtitleClass}`}>{subtitle}</p>}
    </div>
  );
}
