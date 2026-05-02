import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Neon Nexus",
      role: "Lead Developer",
      desc: "A high-performance WebGL experience for a futuristic clothing brand.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Aura Studio",
      role: "Creative Engineer",
      desc: "Award-winning agency portfolio built with Next.js and Three.js.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2500&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Zenith OS",
      role: "Frontend Architect",
      desc: "A sleek, minimal operating system interface living in the browser.",
      image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
    },
  ];

  return (
    <section className="relative min-h-screen bg-[#121212] text-white py-32 px-6 md:px-12 z-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-16 border-b border-white/10 pb-8">
          Selected Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 transition-all duration-500 hover:border-white/30 hover:bg-white/10"
              style={{ minHeight: "450px" }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="relative z-20 mt-auto transform transition-transform duration-500 group-hover:-translate-y-2">
                <p className="text-sm font-medium tracking-widest text-gray-400 uppercase mb-2">
                  {project.role}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {project.title}
                  </h3>
                  <div className="bg-white/10 p-2 rounded-full backdrop-blur-md opacity-0 transform translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-gray-300 font-light text-sm line-clamp-2">
                  {project.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
