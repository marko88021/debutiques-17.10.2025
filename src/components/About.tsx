import { useEffect, useRef, useState } from 'react';

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const teamMembers = [
    {
      name: 'Marko Bokan',
      role: 'Founder & Lead 3D Artist',
      description: 'Master of Architecture with 10 years of experience in high-end CGI and furniture visualization.'
    },
    {
      name: 'Milica K.',
      role: 'Art Director & Interior Stylist',
      description: 'Focused on composition, styling, and bringing architectural precision to every shot.'
    },
    {
      name: 'Vladimir D.',
      role: 'Technical Director & 3D Artist',
      description: 'Specialized in lighting, materials, and photorealistic rendering workflows.'
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 bg-neutral-50"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Section Title */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-black tracking-tight mb-6">
              About Debutiques Studio
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-neutral-600 font-light leading-relaxed text-lg md:text-xl" style={{ lineHeight: '1.8' }}>
               For over a decade, Debutiques has been crafting high-end 3D visuals for premium Scandinavian furniture brands — including collections sold through retailers such as Royal Design and Rum21.

We blend architectural precision with cinematic aesthetics to help furniture designers communicate craftsmanship, materials, and emotion through authentic CGI. Our work goes beyond rendering — it’s built on research and development, from scanning real fabrics and studying finishes, to calibrating natural light for every scene.

Having worked closely with furniture designers and product developers, we understand how design intent translates into visual storytelling. Each image we create reflects that dialogue — refined, consistent, and deeply rooted in the tactile reality of design.
              </p>
            </div>
          </div>

          {/* Team Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                >
                  {/* Team Photo */}
                  {index === 0 && (
                    <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-neutral-200 border border-neutral-300">
                      <img
                        src="/assets/1517620148782.jpg"
                        alt={member.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Member Info */}
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-light text-black mb-2 tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-sm uppercase tracking-widest text-neutral-500 mb-4">
                      {member.role}
                    </p>
                    <p className="text-neutral-600 font-light leading-relaxed text-sm md:text-base">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
