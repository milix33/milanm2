'use client'

type RightDotsNavProps = {
  activeIndex: number;
  total: number;
  onDotClick: (index: number) => void;
};

export default function RightDotsNav({ activeIndex, total, onDotClick }: RightDotsNavProps) {
  return (
    <div className="dots-nav" aria-label="Navigacija sekcija">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={index}
            type="button"
            className={
              "dots-nav-button" + (isActive ? " dots-nav-button--active" : "")
            }
            aria-label={index === 0 ? "Hero sekcija" : "Footer sekcija"}
            aria-pressed={isActive}
            onClick={() => onDotClick(index)}
          />
        );
      })}
    </div>
  );
}

