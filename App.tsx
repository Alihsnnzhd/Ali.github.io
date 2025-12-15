import React, { useState, useEffect, useRef } from 'react';
import { translations } from './constants';
import { Translation, Language } from './types';
import Sidebar from './components/Sidebar';
import { Github, Instagram, Mail, Smartphone, Code2, Database, Layout, Terminal, ExternalLink, Download, Globe, ArrowUpRight, Send, MapPin, Linkedin } from 'lucide-react';

// --- Sub Components ---

// 1. Custom Cursor Component
const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (cursorDotRef.current && cursorOutlineRef.current) {
        cursorDotRef.current.style.left = `${posX}px`;
        cursorDotRef.current.style.top = `${posY}px`;
        
        // Add a slight delay/lag to the outline for fluid feel
        cursorOutlineRef.current.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot hidden md:block"></div>
      <div ref={cursorOutlineRef} className="cursor-outline hidden md:block"></div>
    </>
  );
};

// 2. Particle Background
const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    const particleCount = 40; // Slightly reduced for cleaner look

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2,
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#39ff14';

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Connections only when very close
      ctx.strokeStyle = '#39ff14';
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            ctx.globalAlpha = (80 - dist) / 80 * 0.1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-30" />;
};

// 3. Skill Bar
const SkillBar: React.FC<{ name: string; percentage: number; icon: React.ReactNode }> = ({ name, percentage, icon }) => (
  <div className="mb-6 group">
    <div className="flex justify-between mb-2 text-sm font-medium text-gray-300">
      <div className="flex items-center gap-2">
        <span className="text-neon group-hover:text-white transition-colors duration-300">{icon}</span>
        <span className="group-hover:translate-x-1 transition-transform duration-300">{name}</span>
      </div>
      <span className="text-neon font-mono text-xs">{percentage}%</span>
    </div>
    <div className="w-full bg-white/5 rounded-full h-2 backdrop-blur-sm border border-white/5 overflow-hidden">
      <div 
        className="bg-gradient-to-r from-neon/70 to-neon h-2 rounded-full shadow-[0_0_15px_#39ff14] relative transition-all duration-1000 ease-out group-hover:shadow-[0_0_25px_#39ff14]" 
        style={{ width: `${percentage}%` }}
      >
      </div>
    </div>
  </div>
);

// 4. Project Card with Spotlight Effect
const ProjectCard: React.FC<{ item: Translation['projects']['items'][0]; lang: Language }> = ({ item, lang }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 overflow-hidden transition-transform duration-300 hover:-translate-y-2"
    >
      {/* Spotlight Effect Gradient */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(57, 255, 20, 0.15), transparent 40%)`
        }}
      />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:border-neon/30 transition-colors">
            <Layout className="text-neon" size={24} />
          </div>
          <a href={item.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-neon transition-colors">
            {lang === 'fa' ? 'مشاهده' : 'View'} <ArrowUpRight size={14} />
          </a>
        </div>

        <h3 className={`text-xl font-bold text-white mb-2 group-hover:text-neon transition-colors ${lang === 'fa' ? 'font-fa' : 'font-en'}`}>
          {item.title}
        </h3>

        <p className={`text-gray-400 mb-6 text-sm leading-relaxed h-20 overflow-hidden ${lang === 'fa' ? 'font-fa' : 'font-en'}`}>
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-black text-gray-300 text-[10px] rounded-full border border-white/10 font-mono">
              {tag}
            </span>
          ))}
        </div>

        {item.codeSnippet && (
          <div className="mt-4 bg-black/50 rounded-xl p-3 border border-white/5 group-hover:border-neon/20 transition-colors">
            <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-2">
               <Code2 size={12} className="text-gray-500" />
               <span className="text-[10px] text-gray-500 font-mono">{item.codeSnippet.file}</span>
            </div>
            <pre className="text-[10px] text-gray-400 font-mono overflow-hidden">
              <code>{item.codeSnippet.code.substring(0, 100)}...</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

// 5. Contact Card
const ContactCard: React.FC<{ icon: React.ReactNode; label: string; value: string; link: string; colorClass?: string }> = ({ icon, label, value, link, colorClass = "text-neon" }) => (
    <a href={link} target="_blank" rel="noreferrer" className="group relative bg-[#111] border border-white/5 hover:border-neon/50 p-6 rounded-3xl flex items-center gap-4 transition-all duration-300 hover:bg-white/5">
        <div className={`p-4 rounded-2xl bg-black border border-white/10 group-hover:scale-110 transition-transform duration-300 ${colorClass}`}>
            {icon}
        </div>
        <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">{label}</span>
            <span className="text-white font-bold group-hover:text-neon transition-colors">{value}</span>
        </div>
        <div className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-neon">
            <ArrowUpRight />
        </div>
    </a>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('fa');
  const [activeSection, setActiveSection] = useState('home');
  const t = translations[lang];

  // Intersection Observer for Animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [lang]); // Re-run when lang changes to ensure new content is observed

  const toggleLang = () => {
    const newLang = lang === 'fa' ? 'en' : 'fa';
    setLang(newLang);
    document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.dir = 'rtl'; 
  }, []);

  return (
    <div className={`min-h-screen bg-dark-bg text-white selection:bg-neon selection:text-black overflow-x-hidden cursor-none ${lang === 'fa' ? 'font-fa' : 'font-en'}`}>
      <CustomCursor />
      <Particles />
      <div className="bg-noise fixed inset-0 z-0 pointer-events-none"></div>

      {/* Mobile Top Bar (Language Switcher) - Added spacing and backdrop */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 p-4 flex justify-between items-center bg-dark-bg/80 backdrop-blur-md border-b border-white/5">
          <span className="font-bold text-neon">&lt;Ali.Dev /&gt;</span>
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 bg-[#131313] border border-white/10 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg active:scale-95 transition-transform"
          >
            <Globe size={14} className="text-neon"/>
            {lang === 'fa' ? 'EN' : 'FA'}
          </button>
      </div>

      {/* Main Layout Grid */}
      <div className="flex flex-col md:flex-row relative z-10 pt-16 md:pt-0"> {/* Added pt-16 for mobile top bar */}
        
        {/* Sidebar Navigation */}
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          lang={lang} 
          t={t}
          toggleLang={toggleLang}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-12 pb-32 md:pb-12 w-full max-w-7xl mx-auto space-y-32">
          
          {/* Hero Section */}
          <section id="home" className="min-h-[85vh] flex flex-col justify-center items-start relative reveal-on-scroll">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-neon/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
              <div className="order-2 lg:order-1 relative">
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0a] border border-neon/20 text-neon text-xs font-mono mb-8 hover:border-neon/50 transition-colors cursor-default">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neon"></span>
                  </span>
                  Ready to Innovate
                </div>
                
                <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
                  <span className="block text-white glitch-text filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" data-text={t.hero.title}>{t.hero.title}</span>
                </h1>
                
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl mb-10 pl-6 border-l-4 border-neon/50">
                  {t.hero.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-6">
                  <button className="group relative bg-neon text-black px-8 py-4 rounded-2xl font-black text-lg overflow-hidden transition-all hover:scale-105">
                     <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                     <span className="relative flex items-center gap-2">
                        {t.hero.cta} <Download size={20} />
                     </span>
                  </button>
                  
                  <div className="flex gap-4">
                     {[Github, Instagram].map((Icon, i) => (
                         <a key={i} href="#" className="w-14 h-14 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center text-gray-400 hover:text-neon hover:border-neon hover:-translate-y-1 transition-all duration-300">
                             <Icon size={24} />
                         </a>
                     ))}
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center relative">
                 <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] group">
                    <div className="absolute inset-0 bg-neon/20 rounded-full blur-[60px] group-hover:bg-neon/30 transition-all duration-500"></div>
                    
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-neon rounded-tr-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-neon rounded-bl-3xl"></div>
                    
                    <div className="absolute inset-4 rounded-[40px] overflow-hidden border border-white/10 bg-[#111] shadow-2xl">
                       <img 
                        src="https://picsum.photos/600/600" 
                        alt="Avatar" 
                        className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-110" 
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                    </div>
                 </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="reveal-on-scroll">
            <div className="flex items-end gap-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                <span className="text-neon text-6xl block mb-2">01.</span> {t.experience.title}
              </h2>
            </div>

            <div className="relative border-l-2 border-white/5 ml-4 md:ml-8 space-y-16 pl-8 md:pl-12">
              {t.experience.items.map((job, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node */}
                  <div className="absolute -left-[41px] md:-left-[57px] top-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#050505] border-4 border-neon shadow-[0_0_20px_#39ff14] z-10 transition-transform group-hover:scale-150"></div>
                  
                  <div className="bg-gradient-to-r from-white/5 to-transparent border-l-4 border-neon/50 p-8 rounded-r-3xl hover:bg-white/5 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-neon transition-colors">{job.title}</h3>
                        <span className="px-3 py-1 bg-neon-dim text-neon rounded-full text-xs font-mono border border-neon/20 whitespace-nowrap w-fit">{job.date}</span>
                    </div>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-3xl">{job.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {job.tags.map(tag => (
                        <span key={tag} className="text-sm text-gray-500 font-mono hover:text-white transition-colors">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="reveal-on-scroll">
            <div className="flex items-end gap-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                <span className="text-neon text-6xl block mb-2">02.</span> {t.projects.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.projects.items.map((project, idx) => (
                <ProjectCard key={idx} item={project} lang={lang} />
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="reveal-on-scroll">
             <div className="flex items-end gap-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                <span className="text-neon text-6xl block mb-2">03.</span> {t.skills.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-[#111] border border-white/5 rounded-[40px] p-10 hover:border-neon/30 transition-all duration-500">
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                    <div className="p-3 bg-neon/10 rounded-xl text-neon"><Smartphone size={28} /></div>
                    {t.skills.categories.mobile}
                  </h3>
                  <div className="space-y-6">
                    <SkillBar name="Java & Kotlin" percentage={95} icon={<Code2 size={16}/>} />
                    <SkillBar name="Android SDK & Jetpack" percentage={90} icon={<Layout size={16}/>} />
                    <SkillBar name="MVVM & Clean Arch" percentage={85} icon={<Database size={16}/>} />
                  </div>
               </div>

               <div className="space-y-8">
                  <div className="bg-[#111] border border-white/5 rounded-[40px] p-10 hover:border-neon/30 transition-all duration-500">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                      <div className="p-3 bg-neon/10 rounded-xl text-neon"><Globe size={28} /></div>
                      {t.skills.categories.web}
                    </h3>
                    <SkillBar name="React & Tailwind" percentage={80} icon={<Layout size={16}/>} />
                    <SkillBar name="HTML5 / CSS3" percentage={90} icon={<Code2 size={16}/>} />
                  </div>
               </div>
            </div>
          </section>

          {/* Reimagined Contact Section */}
          <section id="contact" className="reveal-on-scroll pb-20">
            <div className="flex items-end gap-4 mb-16">
               <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                <span className="text-neon text-6xl block mb-2">04.</span> {t.nav.contact}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContactCard 
                    icon={<Mail size={24} />} 
                    label="Email Me" 
                    value="alihassannegad44@gmail.com" 
                    link="mailto:alihassannegad44@gmail.com"
                />
                <ContactCard 
                    icon={<Github size={24} />} 
                    label="Github" 
                    value="@Alihsnnzhd" 
                    link="https://github.com/Alihsnnzhd"
                />
                <ContactCard 
                    icon={<Smartphone size={24} />} 
                    label="Cafe Bazaar" 
                    value="Developer Profile" 
                    link="https://cafebazaar.ir/developer/ali_hsnnzhd"
                />
                 <ContactCard 
                    icon={<Instagram size={24} />} 
                    label="Instagram" 
                    value="@Ali.Dev" 
                    link="#"
                />
            </div>

            <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 font-mono text-sm gap-4">
                <p>{t.footer.text}</p>
                <p className="flex items-center gap-2">Designed & Built by <span className="text-neon">Ali</span></p>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default App;
