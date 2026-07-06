interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-3 mb-10 ${alignClass}`}>
      <span className="inline-block w-fit rounded-full bg-gold/10 px-4 py-1 text-sm font-semibold tracking-wide text-gold">
        {badge}
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy">{title}</h2>
      {subtitle && (
        <p className="max-w-2xl text-sm sm:text-base text-navy/60">{subtitle}</p>
      )}
    </div>
  );
}
