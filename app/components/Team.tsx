"use client";

const team = [
  { name: "Daniel", role: "Desarrollo", image: "/images/pixel-art/dani.png" },
  { name: "Josue", role: "Desarrollo", image: "/images/pixel-art/josue.png" },
];

export default function Team() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">
            Equipo
          </p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight">
            Quienes construyen
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-12 md:gap-16">
          {team.map((member) => (
            <div key={member.name} className="group flex flex-col items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-border bg-secondary">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <div className="mt-5 text-center">
                <p className="text-base font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-xs mt-16">
          Un equipo pequeño, enfocado y comprometido
        </p>
      </div>
    </section>
  );
}
