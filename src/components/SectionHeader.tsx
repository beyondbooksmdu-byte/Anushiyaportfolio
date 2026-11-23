interface SectionHeaderProps {
  indexLabel: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  indexLabel,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex max-w-2xl flex-col ${alignment}`}>
      <p className="text-xs font-semibold tracking-widest text-[#8C6D24]">
        {indexLabel}
      </p>
      <h2 className="text-balance mt-2 font-serif text-3xl font-semibold tracking-tight text-[#252525] sm:text-4xl">
        {title}
      </h2>
      <div
        aria-hidden="true"
        className={`mt-4 h-[1.5px] w-14 bg-[#C5A253] ${align === 'center' ? 'mx-auto' : ''}`}
      />
      {description && (
        <p className="mt-4 text-base leading-relaxed text-[#5C5C5C]">
          {description}
        </p>
      )}
    </div>
  );
}
