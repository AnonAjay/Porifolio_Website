import { forwardRef } from "react";

const SectionWrapper = forwardRef(({ id, className = "", style = {}, children }, ref) => {
  return (
    <section
      id={id}
      ref={ref}
      style={style}
      // Reusable standard constraints:
      // - min-h-screen: Viewport sizing
      // - w-full: Full width
      // - py-24: Standard top/bottom breathing room
      // - px-8 md:px-20: Consistent horizontal padding
      // - overflow-hidden: Prevent scrollbar from animations
      // - relative: For absolute children (backgrounds, glowing orbs)
      // - flex flex-col justify-center: Center content vertically
      className={`relative min-h-screen w-full flex flex-col justify-center px-8 md:px-20 py-24 overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
});

SectionWrapper.displayName = "SectionWrapper";

export default SectionWrapper;
