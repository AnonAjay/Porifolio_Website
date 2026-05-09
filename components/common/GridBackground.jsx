"use client";

export default function GridBackground({ type = "radial", opacity = "opacity-[0.03]" }) {
  const styles = {
    radial: {
      backgroundImage: "radial-gradient(circle at 1px 1px, #1A1A1A 0.5px, transparent 0)",
      backgroundSize: "40px 40px"
    },
    linear: {
      backgroundImage: "linear-gradient(#FF6F61 1px, transparent 1px), linear-gradient(90deg, #FF6F61 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    },
    dots: {
       backgroundImage: "radial-gradient(#FF6F61 1px, transparent 1px)",
       backgroundSize: "32px 32px"
    }
  };

  return (
    <div 
      className={`absolute inset-0 pointer-events-none z-0 ${opacity}`}
      style={styles[type]} 
    />
  );
}
