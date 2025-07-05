import { useState, useEffect } from 'react'
import coatPic from './assets/coat_pic.jpeg'
import flutterLogo from './assets/flutter.png'
import supabaseLogo from './assets/supabse.png'
import pythonLogo from './assets/python.png'
import firebaseLogo from './assets/firebase.png'

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const projects = [
    {
      id: 1,
      title: "TaskFlow Pro",
      description: "A sleek task management app with real-time collaboration and AI-powered insights.",
      tech: ["React Native", "Node.js", "MongoDB"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      link: "#"
    },
    {
      id: 2,
      title: "FitTracker",
      description: "Fitness tracking app with personalized workout plans and progress analytics.",
      tech: ["Flutter", "Firebase", "TensorFlow"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      link: "#"
    },
    {
      id: 3,
      title: "CryptoVault",
      description: "Secure cryptocurrency portfolio tracker with real-time market data.",
      tech: ["React", "Web3.js", "Express"],
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop",
      link: "#"
    },
    {
      id: 4,
      title: "EcoRoute",
      description: "Sustainable navigation app that finds the most eco-friendly routes.",
      tech: ["React Native", "Google Maps API", "Python"],
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      link: "#"
    }
  ]

  const techStack = [
    { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", isImage: true },
    { name: "Flutter", icon: flutterLogo, isImage: true },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", isImage: true },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", isImage: true },
    { name: "Python", icon: pythonLogo, isImage: true },
    { name: "Firebase", icon: firebaseLogo, isImage: true },
    { name: "Supabase", icon: supabaseLogo, isImage: true },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", isImage: true }
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus({ type: 'success', message: 'Message saved successfully!' })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus({ type: 'error', message: data.message })
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus({ type: 'error', message: 'Failed to save message. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-orbitron font-bold gradient-text">
              DevPortfolio
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-white hover:text-neon-blue transition-colors">Home</a>
              <a href="#about" className="text-white hover:text-neon-blue transition-colors">About</a>
              <a href="#projects" className="text-white hover:text-neon-blue transition-colors">Projects</a>
              <a href="#tech" className="text-white hover:text-neon-blue transition-colors">Tech</a>
              <a href="#contact" className="text-white hover:text-neon-blue transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg"></div>
        <div className="relative z-10 text-center px-4">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6">
              <span className="text-white">Hi, I'm </span>
              <span className="gradient-text animate-glow">Sarathy</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              I build sleek mobile & web apps that transform ideas into digital experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#projects" className="px-8 py-3 bg-neon-blue text-black font-semibold rounded-lg hover-glow transition-all duration-300">
                View Projects
              </a>
              <a 
                href="https://drive.google.com/file/d/10x-S6pRrLJpAa-iooxQesp4PlxA0RfAM/view?usp=drive_link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 border border-neon-blue text-neon-blue font-semibold rounded-lg hover-glow transition-all duration-300 hover:bg-neon-blue hover:text-black"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-neon-purple rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16 gradient-text">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate app developer with 2+ years of experience creating innovative digital solutions. 
                I specialize in React Native and Flutter development, building cross-platform apps that deliver 
                exceptional user experiences.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring the latest tech trends, contributing to open-source 
                projects, or mentoring junior developers. I believe in writing clean, maintainable code and 
                staying up-to-date with industry best practices.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-neon-blue">10+</div>
                  <div className="text-gray-400">Apps Built</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-neon-purple">2+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-neon-green">3</div>
                  <div className="text-gray-400">Commercial Apps Built</div>
                </div>
              </div>
              <div className="pt-4">
                <a 
                  href="https://drive.google.com/file/d/10x-S6pRrLJpAa-iooxQesp4PlxA0RfAM/view?usp=drive_link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-neon-blue text-black font-semibold rounded-lg hover-glow transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                    <path d="M12 18l-4-4h3V8h2v6h3l-4 4z"/>
                  </svg>
                  Download Resume
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center animate-float">
                <div className="w-72 h-72 bg-dark-bg rounded-full overflow-hidden">
                  <img src={coatPic} alt="Sarathy" className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-dark-surface">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16 gradient-text">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="glass-effect rounded-xl p-6 hover-glow">
                <div className="relative mb-6">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                </div>
                <h3 className="text-2xl font-orbitron font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-neon-blue/20 text-neon-blue text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link}
                  className="inline-block px-6 py-2 border border-neon-blue text-neon-blue rounded-lg hover:bg-neon-blue hover:text-black transition-all duration-300"
                >
                  View Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16 gradient-text">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {techStack.map((tech, index) => (
              <div 
                key={index}
                className="text-center p-6 glass-effect rounded-xl hover-glow"
              >
                <div className="text-4xl mb-4">
                  {tech.isImage ? (
                    <img src={tech.icon} alt={tech.name} className="w-12 h-12 mx-auto object-contain" />
                  ) : (
                    tech.icon
                  )}
                </div>
                <div className="text-white font-semibold">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-dark-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16 gradient-text">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-orbitron font-bold mb-6 text-white">Let's Build Something Amazing</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-neon-blue/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-neon-blue" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-gray-300">sarathy01062005@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-neon-purple/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-neon-purple" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Location</div>
                    <div className="text-gray-300">Pondicherry, India</div>
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none transition-colors resize-none"
                  required
                ></textarea>
              </div>
              
              {/* Status Message */}
              {submitStatus && (
                <div className={`p-3 rounded-lg text-center ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-3 font-semibold rounded-lg transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                    : 'bg-neon-blue text-black hover-glow'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          
          {/* Social Links */}
          <div className="mt-16 text-center">
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/Sarathy2908" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center hover:bg-neon-blue/20 transition-colors">
                <svg className="w-6 h-6 text-white hover:text-neon-blue transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/sarathyvaittianadasammy/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center hover:bg-neon-blue/20 transition-colors">
                <svg className="w-6 h-6 text-white hover:text-neon-blue transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://leetcode.com/your-username" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center hover:bg-neon-blue/20 transition-colors">
                <svg className="w-6 h-6 text-white hover:text-neon-blue transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362c.138.508.373 1.003.7 1.456a6.113 6.113 0 0 0 1.04 1.259l.007.006a5.988 5.988 0 0 0 4.077 1.608h.005a6.026 6.026 0 0 0 4.077-1.608l.007-.006a6.113 6.113 0 0 0 1.04-1.259 5.9 5.9 0 0 0 .7-1.456 5.527 5.527 0 0 0 .062-2.362 5.35 5.35 0 0 0-.125-.513 5.266 5.266 0 0 0-1.209-2.104L16.884 6.226l-5.406-5.788A1.374 1.374 0 0 0 13.483 0zm-2.866 12.815a1.112 1.112 0 0 0-1.592 0 1.112 1.112 0 0 0 0 1.592l2.804 2.804a1.112 1.112 0 0 0 1.592 0l2.804-2.804a1.112 1.112 0 0 0 0-1.592 1.112 1.112 0 0 0-1.592 0L12 15.186l-2.383-2.371z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-white/10">
        <p className="text-gray-400">
          © 2024 Sarathy. Built with React & Tailwind CSS
        </p>
      </footer>
    </div>
  )
}

export default App
