import Link from "next/link";

export default function Navbar() {
  const links = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Projects", href: "#" },
    { name: "Skills", href: "#" },
    { name: "Experience", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/60 backdrop-blur-[14px] border border-white/40 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.05)] px-8 py-3 flex items-center gap-8">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="group relative text-sm font-semibold tracking-wide text-gray-900 transition-colors hover:text-black"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full rounded-full"></span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
