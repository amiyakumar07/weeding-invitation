import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Calendar, MapPin, Music2, Music, Clock, Send, ChevronDown, User, Star, Volume2, VolumeX } from 'lucide-react';

const PetalLayer = ({ count = 15 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, x: Math.random() * 100 + "%", rotate: 0, opacity: 0.8 }}
          animate={{ 
            y: "110vh",
            x: (Math.random() * 100 - 50) + "%",
            rotate: 720,
            opacity: 0
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute w-3 h-4 bg-red-800/20 rounded-full blur-[1px]"
          style={{ borderRadius: '50% 0 50% 0' }}
        />
      ))}
    </div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("April 29, 2026 12:30:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-4 md:gap-8 py-8 bg-gradient-to-b from-wedding-maroon-mid to-black">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center bg-white/10 backdrop-blur-md p-4 rounded-lg min-w-[70px] border border-wedding-gold/20">
          <span className="block text-3xl md:text-5xl font-bold text-wedding-gold">{value.toString().padStart(2, '0')}</span>
          <label className="text-[10px] uppercase font-cinzel text-wedding-cream/60 tracking-widest">{label}</label>
        </div>
      ))}
    </div>
  );
};

const LandingCover = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex overflow-hidden cursor-default">
      {/* Left Gate */}
      <motion.div 
        initial={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        className="w-1/2 h-full bg-maroon-gradient border-r border-wedding-gold/30 relative z-20"
      >
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-wedding-gold shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
      </motion.div>

      {/* Right Gate */}
      <motion.div 
        initial={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        className="w-1/2 h-full bg-maroon-gradient border-l border-wedding-gold/30 relative z-20"
      >
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-wedding-gold shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
      </motion.div>

      {/* Center Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1, y: -20 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-30"
      >
        <div className="relative border border-wedding-gold/40 p-10 md:p-20 bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-2 border border-wedding-gold/20 pointer-events-none" />
          <div className="absolute inset-4 border border-wedding-gold/10 pointer-events-none" />
          
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-script text-wedding-gold text-3xl md:text-5xl mb-6 block"
          >
            You Are Invited
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-serif text-wedding-cream text-3xl md:text-6xl font-semibold tracking-wider mb-10 leading-tight"
          >
            Dibya Ranjan & Sasmita
          </motion.h1>
          
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={onOpen}
            className="group relative border border-wedding-gold text-wedding-gold px-12 py-5 font-cinzel text-xs tracking-[0.4em] uppercase overflow-hidden transition-all duration-500 cursor-pointer"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-wedding-maroon">Open Invitation</span>
            <div className="absolute inset-0 bg-wedding-gold translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
          </motion.button>
          
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="block mt-10 text-wedding-cream/40 text-[10px] italic tracking-[0.3em] font-sans uppercase"
          >
            Tap to begin the celebration
          </motion.span>
        </div>
      </motion.div>

      {/* Falling flowers on landing too */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <PetalLayer count={25} />
      </div>
    </div>
  );
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpen && audioRef.current) {
      audioRef.current.play().catch(() => console.log("Audio needs user interaction"));
    }
  }, [isOpen]);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative min-h-screen bg-wedding-maroon overflow-hidden">
      <audio ref={audioRef} loop src="https://www.image2url.com/r2/default/audio/1777382440823-bdcbc4a4-6871-4611-a31b-b1a732fee054.mp3" />

      <AnimatePresence>
        {!isOpen && <LandingCover onOpen={() => setIsOpen(true)} />}
      </AnimatePresence>

      {isOpen && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1 }}
        >
          {/* Main Hero Section */}
          <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 bg-maroon-gradient overflow-hidden">
            <PetalLayer count={45} />
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative z-10 w-full max-w-4xl"
            >
              <div className="relative py-16 px-4 border-x border-wedding-gold/10 bg-gradient-to-b from-transparent via-wedding-maroon/20 to-transparent">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[#4dd9c0] text-3xl md:text-5xl mb-8 opacity-80"
                >
                  ॐ
                </motion.div>
                
                <div className="font-cinzel text-wedding-gold text-[10px] md:text-sm tracking-[0.4em] mb-10 uppercase opacity-70">
                  Together <span className="text-sm">✦</span> With Our Families
                </div>
                
                <h2 className="font-script text-wedding-cream text-7xl md:text-[10rem] mb-12 leading-tight drop-shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                  Dibya Ranjan <span className="text-wedding-gold italic font-serif text-5xl md:text-8xl block md:inline md:mx-4">&</span> Sasmita
                </h2>
                
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="w-48 h-[1px] bg-gradient-to-r from-transparent via-wedding-gold to-transparent mb-12 mx-auto" 
                />
                
                <p className="text-wedding-cream/80 italic font-sans text-sm md:text-xl mb-14 max-w-lg mx-auto tracking-widest uppercase">
                  Invite you to join us in the celebration of our love
                </p>
                
                <div className="font-cinzel text-wedding-gold text-lg md:text-4xl border-y border-wedding-gold/20 py-5 px-12 mb-10 tracking-[0.3em] backdrop-blur-[2px] inline-block">
                  APRIL 29, 2026 | 12:30 PM
                </div>
                
                <div className="flex flex-col items-center gap-3 text-wedding-cream/60 font-cinzel text-[10px] md:text-xs tracking-[0.2em] uppercase">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-wedding-gold" />
                    Maa Ramachandi Temple, Bhobara
                  </div>
                  <div>Ramachandrapur, Odisha</div>
                </div>

                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-20 opacity-40"
                >
                  <ChevronDown size={30} className="text-wedding-gold mx-auto" />
                </motion.div>
              </div>
            </motion.div>

            {/* Background Decorative Icons */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -30, 0],
                    x: [0, i % 2 === 0 ? 10 : -10, 0],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 5 + i, 
                    repeat: Infinity, 
                    delay: i 
                  }}
                  className="absolute"
                  style={{ 
                    top: (Math.random() * 80) + "%", 
                    left: (Math.random() * 90) + "%" 
                  }}
                >
                  <Heart size={60 + i * 20} className="text-wedding-gold" />
                </motion.div>
              ))}
            </div>
          </section>

          <Countdown />

          {/* Our Story */}
          <section className="py-24 px-6 bg-wedding-cream text-wedding-maroon text-center relative overflow-hidden">
            <div className="absolute -left-20 top-20 text-wedding-gold/10 -rotate-12 pointer-events-none">
              <Star size={200} fill="currentColor" />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto relative z-10"
            >
              <h2 className="font-serif text-5xl md:text-6xl mb-4 italic text-wedding-maroon-mid">Our Story</h2>
              <div className="w-20 h-[2px] bg-wedding-gold mx-auto mb-20 opacity-60" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-12 mb-20">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center group"
                >
                  <div className="relative">
                    <div className="absolute -inset-2 bg-wedding-gold/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img src="https://www.image2url.com/r2/default/images/1777375724590-bd901433-8ca6-4307-bbd5-244e7a772c1f.jpeg" className="w-48 h-48 rounded-full border-4 border-wedding-gold shadow-2xl object-cover mb-8 relative z-10 grayscale hover:grayscale-0 transition-all duration-700" alt="Dibya Ranjan" />
                  </div>
                  <h3 className="font-script text-4xl mb-3 text-wedding-maroon font-bold">Dibya Ranjan</h3>
                  <div className="h-[1px] w-10 bg-wedding-gold/30 mb-4" />
                  <p className="italic text-gray-500 text-sm font-serif leading-relaxed">"The moment I saw her, I knew my search was over."</p>
                </motion.div>

                <div className="flex flex-col items-center justify-center h-full">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="text-wedding-gold text-5xl fill-wedding-gold/20" size={50} />
                  </motion.div>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center group"
                >
                  <div className="relative">
                    <div className="absolute -inset-2 bg-wedding-gold/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img src="https://www.image2url.com/r2/default/images/1777374712501-48ed58b5-a1a2-4b25-b324-cc5562fe7ab1.jpeg" className="w-48 h-48 rounded-full border-4 border-wedding-gold shadow-2xl object-cover mb-8 relative z-10 grayscale hover:grayscale-0 transition-all duration-700" alt="Sasmita" />
                  </div>
                  <h3 className="font-script text-4xl mb-3 text-wedding-maroon font-bold">Sasmita</h3>
                  <div className="h-[1px] w-10 bg-wedding-gold/30 mb-4" />
                  <p className="italic text-gray-500 text-sm font-serif leading-relaxed">"In him, I found my love, my best friend, and my home."</p>
                </motion.div>
              </div>

              <div className="relative p-10 md:p-14 bg-white/40 backdrop-blur-sm rounded-2xl border border-wedding-gold/10">
                <p className="max-w-2xl mx-auto italic text-gray-700 text-lg md:text-xl leading-loose font-serif">
                  Love is not just about finding the right person, but creating the right relationship.
                  It's not about how much love you have in the beginning but how much love you build until the end.
                  Dibya Ranjan and Sasmita met under serendipitous circumstances, and what followed was a beautiful journey
                  of laughter, understanding, and unconditional love.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Wedding Events */}
          <section className="py-24 px-6 bg-wedding-maroon text-wedding-cream overflow-hidden">
            <PetalLayer count={10} />
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-[10px] tracking-[0.4em] uppercase text-wedding-gold/60 mb-2 block font-cinzel">A Celebration of Love</span>
                <h2 className="font-cinzel text-3xl md:text-5xl text-wedding-gold">Wedding Events</h2>
                <div className="w-20 h-[2px] bg-wedding-gold bg-opacity-40 mx-auto mt-4" />
              </div>

              <div className="relative border-l-2 border-wedding-gold/20 ml-4 md:ml-0 md:pl-0 space-y-12">
                {[
                  { title: "Ring Ceremony", time: "April 29, 2026 | 12:30 PM", loc: "Maa Ramachandi Temple, Bhobara", icon: "💍", tag: "Engagement" },
                  { title: "Sangeet Night", time: "Coming Soon..", loc: "Badapari, Tangi, Odisha", icon: "🎵", tag: "Music & Dance" },
                  { title: "The Wedding", time: "Coming Soon..", loc: "Badapari, Tangi, Odisha", icon: "🕊️", tag: "The Holy Union" }
                ].map((event, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="relative md:flex md:items-center md:gap-10 pl-10 md:pl-0"
                   >
                     <div className="absolute left-[-11px] md:static w-5 h-5 bg-wedding-gold rounded-full flex items-center justify-center text-[10px] text-wedding-maroon z-10">🌸</div>
                     <div className="bg-wedding-maroon-mid/50 border border-wedding-gold/20 p-8 rounded shadow-2xl flex-1 backdrop-blur-sm">
                       <span className="text-3xl mb-4 block">{event.icon}</span>
                       <h3 className="font-serif text-2xl text-wedding-gold mb-2">{event.title}</h3>
                       <p className="text-xs mb-1 text-wedding-cream/80">{event.time}</p>
                       <p className="text-[10px] mb-4 text-wedding-cream/60 uppercase tracking-widest">{event.loc}</p>
                       <span className="text-[9px] uppercase tracking-[0.2em] text-wedding-gold font-cinzel">{event.tag}</span>
                     </div>
                   </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Location & Blessings */}
          <section className="py-24 px-6 bg-wedding-cream text-wedding-maroon">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
              <div className="flex-1 bg-white p-10 border border-wedding-gold/30 shadow-xl text-center">
                <span className="text-2xl mb-4 block text-wedding-gold text-gold-gradient font-bold drop-shadow-sm">👑</span>
                <h3 className="font-serif text-2xl mb-6">Blessings From</h3>
                <div className="space-y-6">
                  <div>
                    <p className="font-cinzel text-[10px] text-wedding-gold tracking-widest uppercase mb-1">Groom's Parents</p>
                    <p className="font-serif text-sm">Mr. Pradeep Pradhan & Mrs. Sakuntala Pradhan</p>
                  </div>
                  <div>
                     <p className="font-cinzel text-[10px] text-wedding-gold tracking-widest uppercase mb-1">Bride's Parents</p>
                     <p className="font-serif text-sm">Mr. Upendra Kumar Nayak & Mrs. Prativa Dei</p>
                  </div>
                  <p className="font-script text-wedding-gold text-2xl mt-4">And Grandparents</p>
                </div>
              </div>
              <div className="flex-1 bg-white p-10 border border-wedding-gold/30 shadow-xl flex flex-col">
                 <h3 className="font-serif text-2xl text-center mb-6">The Venue Map</h3>
                 <div className="flex-1 min-h-[300px] mb-6 rounded overflow-hidden grayscale-[50%] contrast-125 border border-wedding-gold/10">
                   <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.7119273574164!2d73.6792673!3d24.5681604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e54366e60b7d%3A0xe104fc7d32c5890!2sJagmandir%20Island%20Palace!5e0!3m2!1sen!2sin!4v1714312345678!5m2!1sen!2sin" 
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" 
                   />
                 </div>
                 <a 
                   href="https://maps.app.goo.gl/HXn2FWNnTHr4ACzA9?g_st=ac" 
                   target="_blank" 
                   rel="noreferrer"
                   className="bg-wedding-maroon text-wedding-cream py-4 font-cinzel text-xs tracking-widest text-center hover:bg-wedding-maroon-light transition-colors uppercase"
                 >
                   📍 Get Directions
                 </a>
              </div>
            </div>
          </section>

          {/* RSVP Section */}
          <section className="py-24 px-6 bg-wedding-maroon relative overflow-hidden">
             <PetalLayer count={10} />
             <div className="max-w-xl mx-auto bg-wedding-maroon-mid/80 border border-wedding-gold/30 p-10 md:p-16 text-center text-wedding-cream relative shadow-2xl backdrop-blur-md">
                <span className="text-3xl mb-4 block">📩</span>
                <h2 className="font-cinzel text-3xl tracking-widest mb-4">RSVP</h2>
                <p className="text-[10px] tracking-[0.3em] text-wedding-cream/60 mb-12 uppercase">Confirm presence by April 29th</p>
                
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="w-16 h-16 bg-green-800/40 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl text-white">✓</div>
                    <h3 className="font-serif text-2xl mb-2">Thank You!</h3>
                    <p className="text-sm text-wedding-cream/60">Your response has been recorded.</p>
                  </motion.div>
                ) : (
                  <form className="space-y-6 text-left" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                    <div className="space-y-1">
                      <label className="font-cinzel text-[9px] tracking-widest text-wedding-gold/60 uppercase">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="Your Name" 
                        className="w-full bg-white/5 border border-white/10 p-3 text-sm focus:outline-none focus:border-wedding-gold transition-colors text-wedding-cream" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-cinzel text-[9px] tracking-widest text-wedding-gold/60 uppercase">Number of Guests</label>
                      <select className="w-full bg-wedding-maroon border border-white/10 p-3 text-sm focus:outline-none focus:border-wedding-gold text-wedding-cream appearance-none">
                        <option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option>
                      </select>
                    </div>
                    <div className="space-y-2 pt-4">
                       <label className="flex items-center gap-3 text-xs tracking-wide cursor-pointer text-wedding-cream/80">
                         <input type="radio" name="attending" defaultChecked className="accent-wedding-gold" />
                         <span>Joyfully Accepts</span>
                       </label>
                       <label className="flex items-center gap-3 text-xs tracking-wide cursor-pointer text-wedding-cream/80">
                         <input type="radio" name="attending" className="accent-wedding-gold" />
                         <span>Regretfully Declines</span>
                       </label>
                    </div>
                    <button type="submit" className="w-full bg-wedding-gold text-wedding-maroon py-4 font-cinzel text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white transition-all cursor-pointer mt-8">
                       Send Confirmation
                    </button>
                  </form>
                )}
             </div>
          </section>

          {/* Final Footer */}
          <footer className="py-24 text-center bg-wedding-maroon border-t border-wedding-gold/10">
            <Heart className="text-wedding-gold mx-auto mb-6 animate-pulse" fill="currentColor" size={32} />
            <h2 className="font-script text-wedding-cream text-5xl mb-4">Dibya Ranjan & Sasmita</h2>
            <p className="font-cinzel text-[9px] tracking-[0.6em] text-wedding-cream/40 mb-10 pb-10 border-b border-wedding-gold/10 inline-block px-10">April 29, 2026 • Bhobara, Odisha</p>
            <p className="text-[8px] tracking-[0.3em] text-wedding-cream/20 uppercase">&copy; 2026 Celebration of Love | Forbidden to Time</p>
          </footer>

          {/* Sticky Sound Toggle */}
          <button 
            onClick={toggleSound}
            className="fixed bottom-6 right-6 w-12 h-12 bg-wedding-gold text-wedding-maroon rounded-full flex items-center justify-center shadow-2xl z-[999] hover:scale-110 transition-transform cursor-pointer"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </motion.div>
      )}
    </div>
  );
}
