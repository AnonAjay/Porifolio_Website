import Link from "next/link";

export default function Navbar() {
  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#" },
    { name: "Experience", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/10 backdrop-blur-md border border-white/40 rounded-full shadow-lg px-10 py-4 flex items-center gap-12">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="group relative text-base font-semibold tracking-wide text-gray-900 transition-colors hover:text-black"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full rounded-full"></span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
