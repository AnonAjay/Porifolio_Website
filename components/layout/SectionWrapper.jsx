import { forwardRef } from "react";

const SectionWrapper = forwardRef(({ id, className = "", style = {}, children }, ref) => {
  return (
    <section
      id={id}
      ref={ref}
      style={style}
      className={`relative w-full min-h-screen overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
});

SectionWrapper.displayName = "SectionWrapper";

export default SectionWrapper;
