'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import HeroSection from "./HeroSection";
import FooterSection from "./FooterSection";
import RightDotsNav from "./RightDotsNav";

const SLIDE_COUNT = 2;
const ANIMATION_DURATION_MS = 850;
const WHEEL_SENSITIVITY = 30;
const TOUCH_THRESHOLD = 50;

export default function SectionSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimatingRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToSlide = useCallback((index: number) => {
    if (isAnimatingRef.current || index === activeIndex) return;

    isAnimatingRef.current = true;
    setActiveIndex(index);

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
    }, ANIMATION_DURATION_MS);
  }, [activeIndex]);

  const goNext = useCallback(() => {
    if (activeIndex < SLIDE_COUNT - 1) {
      goToSlide(activeIndex + 1);
    }
  }, [activeIndex, goToSlide]);

  const goPrev = useCallback(() => {
    if (activeIndex > 0) {
      goToSlide(activeIndex - 1);
    }
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (isAnimatingRef.current) return;

      if (Math.abs(event.deltaY) < WHEEL_SENSITIVITY) return;

      event.preventDefault();

      if (event.deltaY > 0) {
        goNext();
      } else {
        goPrev();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [goNext, goPrev]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
    if (event.touches.length !== 1) return;
    touchStartYRef.current = event.touches[0].clientY;
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (event) => {
    if (touchStartYRef.current === null || isAnimatingRef.current) return;

    const endY = event.changedTouches[0]?.clientY;
    if (endY == null) return;

    const deltaY = touchStartYRef.current - endY;

    if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;

    if (deltaY > 0) {
      goNext();
    } else {
      goPrev();
    }

    touchStartYRef.current = null;
  };

  return (
    <div
      className="slider-root"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="slider-wrapper"
        style={{
          transform: `translate3d(0, -${activeIndex * 100}vh, 0)`
        }}
      >
        <HeroSection />
        <FooterSection />
      </div>

      <RightDotsNav
        activeIndex={activeIndex}
        total={SLIDE_COUNT}
        onDotClick={goToSlide}
      />
    </div>
  );
}

