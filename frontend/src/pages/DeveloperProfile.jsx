import { motion } from 'framer-motion';
import { Mail, Phone, Globe, Linkedin, Github, Briefcase, GraduationCap, Code2, Rocket, Award } from 'lucide-react';

export default function DeveloperProfile() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 relative z-10">
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        {/* Header section */}
        <motion.header variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-gradient">Sumit Singh</span>{' '}
            <span className="text-gradient-primary">Bhadoria</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Full-stack developer and CS undergrad building production-grade applications across real-time systems, AI integrations, and scalable platforms.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-zinc-300">
            <a href="mailto:sumitsbhadoria21@gmail.com" className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800 transition-colors">
              <Mail size={16} className="text-indigo-400" /> sumitsbhadoria21@gmail.com
            </a>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800/50">
              <Phone size={16} className="text-emerald-400" /> +91-89620-74730
            </div>
            <a href="https://ssb.sumitsbhadoria21.workers.dev" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800 transition-colors">
              <Globe size={16} className="text-sky-400" /> Portfolio Website
            </a>
          </div>
          <div className="flex justify-center gap-4 mt-4 text-sm font-medium text-zinc-300">
            <a href="https://linkedin.com/in/ss-bhadoria-rs2101" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800 transition-colors">
              <Linkedin size={16} className="text-blue-400" /> LinkedIn
            </a>
            <a href="https://github.com/SSbhadoria21" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800 transition-colors">
              <Github size={16} className="text-zinc-100" /> GitHub
            </a>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div variants={itemVariants} className="glass-panel p-8">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-fuchsia-400" size={24} />
              <h2 className="text-2xl font-bold text-zinc-100">Experience</h2>
            </div>
            <div className="border-l-2 border-zinc-800/50 pl-4 ml-2">
              <h3 className="text-lg font-semibold text-zinc-200">Full Stack Development Intern</h3>
              <p className="text-indigo-400 font-medium mb-2">Decode Labs • Remote</p>
              <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider font-semibold">Jun 2026 - Jul 2026</p>
              <ul className="list-disc list-inside text-sm text-zinc-400 space-y-2">
                <li>Working on assigned full-stack project milestones under mentor-led sessions.</li>
                <li>Building and shipping production-ready features across the web stack.</li>
                <li>Participating in a structured learning-focused internship program.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-panel p-8">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="text-emerald-400" size={24} />
              <h2 className="text-2xl font-bold text-zinc-100">Education</h2>
            </div>
            <div className="border-l-2 border-zinc-800/50 pl-4 ml-2">
              <h3 className="text-lg font-semibold text-zinc-200">B.Tech in Computer Science &amp; Engineering</h3>
              <p className="text-emerald-400 font-medium mb-2">Madhav Institute of Technology and Science, Gwalior</p>
              <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider font-semibold">2024 - 2028 • CGPA: 8.38</p>
            </div>

            <div className="flex items-center gap-3 mb-6 mt-8">
              <Award className="text-amber-400" size={24} />
              <h2 className="text-2xl font-bold text-zinc-100">Achievements</h2>
            </div>
            <ul className="list-none text-sm text-zinc-400 space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span><strong>LeetCode:</strong> 250+ problems solved in Java</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span><strong>CPTrack:</strong> Ranked 181 / ~2,400 students (Top ~8%)</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="glass-panel p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="text-sky-400" size={24} />
            <h2 className="text-2xl font-bold text-zinc-100">Technical Skills</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div>
              <span className="text-zinc-300 font-semibold block mb-1">Languages</span>
              <span className="text-zinc-500">Java, JavaScript, TypeScript, Python</span>
            </div>
            <div>
              <span className="text-zinc-300 font-semibold block mb-1">Frontend</span>
              <span className="text-zinc-500">React.js, Next.js, React 19, Tailwind CSS v4, Framer Motion</span>
            </div>
            <div>
              <span className="text-zinc-300 font-semibold block mb-1">Backend &amp; Databases</span>
              <span className="text-zinc-500">Node.js, Express.js, Bun, Supabase, MongoDB, Firebase</span>
            </div>
            <div>
              <span className="text-zinc-300 font-semibold block mb-1">AI &amp; Realtime</span>
              <span className="text-zinc-500">Vercel AI SDK, Google Gemini, OpenRouter, Zustand, WebRTC</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-8">
          <div className="flex items-center gap-3 mb-6">
            <Rocket className="text-rose-400" size={24} />
            <h2 className="text-2xl font-bold text-zinc-100">Featured Projects</h2>
          </div>
          <div className="space-y-8">
            <div className="border-l-2 border-zinc-800/50 pl-4 ml-2">
              <h3 className="text-lg font-semibold text-zinc-200">Track-Reframe <span className="text-sm font-normal text-zinc-500 ml-2">AI-Powered Filmmaking Platform</span></h3>
              <p className="text-xs text-zinc-500 mt-1 mb-3">Next.js • TypeScript • Google Gemini AI • WebRTC • Supabase</p>
              <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                <li>Real-time collaborative screenplay editor using Yjs + WebRTC.</li>
                <li>Automated Script Shot Planner parsing PDFs with Gemini AI SDK.</li>
                <li>Competition Management System with real-time data visualizations.</li>
              </ul>
            </div>
            
            <div className="border-l-2 border-zinc-800/50 pl-4 ml-2">
              <h3 className="text-lg font-semibold text-zinc-200">MiniCodeClaw <span className="text-sm font-normal text-zinc-500 ml-2">AI-Powered Developer CLI Tool</span></h3>
              <p className="text-xs text-zinc-500 mt-1 mb-3">TypeScript • Bun • Vercel AI SDK • OpenRouter</p>
              <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                <li>AI CLI tool to apply LLM-generated code fixes directly from the terminal.</li>
                <li>Extensible plugin system delivering CLI, Telegram Bot, and Autonomous Agent modes.</li>
              </ul>
            </div>

            <div className="border-l-2 border-zinc-800/50 pl-4 ml-2">
              <h3 className="text-lg font-semibold text-zinc-200">CargoHub <span className="text-sm font-normal text-zinc-500 ml-2">Logistics &amp; Fleet Management</span></h3>
              <p className="text-xs text-zinc-500 mt-1 mb-3">Next.js 15 • Firebase Auth • Socket.io • Supabase</p>
              <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                <li>Full-scale logistics platform for Customers, Drivers, and B2B clients.</li>
                <li>Real-time GPS tracking achieving sub-500ms location update latency.</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
