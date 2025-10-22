import { useState } from 'react';
import { FaBolt, FaGithub, FaLinkedin, FaMailchimp, FaMessage, FaTwitter, FaWandSparkles } from 'react-icons/fa6';

export function Sosmed() {

    const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

    return (
        <div className="lg:col-span-1 space-y-4">
                      
                      {/* Quick Response Promise */}
                      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-2xl p-6 hover:border-green-500/40 transition-all group">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <FaBolt className="w-6 h-6 text-green-400" />
                        </div>
                        <h3 className="font-bold text-white mb-2">Lightning Fast Reply</h3>
                        <p className="text-sm text-slate-400">We typically respond within 24 hours (often sooner!)</p>
                      </div>
        
                      {/* Human Touch */}
                      <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/5 border border-violet-500/20 rounded-2xl p-6 hover:border-violet-500/40 transition-all group">
                        <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <FaMessage className="w-6 h-6 text-violet-400" />
                        </div>
                        <h3 className="font-bold text-white mb-2">Real Humans</h3>
                        <p className="text-sm text-slate-400">No bots, no automated responses. Just genuine conversations.</p>
                      </div>
        
                      {/* All Ideas Welcome */}
                      <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/5 border border-indigo-500/20 rounded-2xl p-6 hover:border-indigo-500/40 transition-all group">
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <FaWandSparkles className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h3 className="font-bold text-white mb-2">All Ideas Welcome</h3>
                        <p className="text-sm text-slate-400">Feedback, features, partnerships—we're all ears!</p>
                      </div>
        
                      {/* Social Links */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                          <span>Or find us here</span>
                          <span className="text-xl">👇</span>
                        </h3>
                        <div className="space-y-3">
                          <a
                            href="https://github.com/v3rific"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredSocial('github')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${hoveredSocial === 'github' ? 'bg-slate-700 scale-110' : 'bg-slate-800'}`}>
                              <FaGithub className="w-5 h-5" />
                            </div>
                            <span className="text-sm group-hover:translate-x-1 transition-transform">GitHub</span>
                          </a>
        
                          <a
                            href="https://linkedin.com/company/v3rific"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredSocial('linkedin')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${hoveredSocial === 'linkedin' ? 'bg-blue-600 scale-110' : 'bg-blue-600/20'}`}>
                              <FaLinkedin className="w-5 h-5" />
                            </div>
                            <span className="text-sm group-hover:translate-x-1 transition-transform">LinkedIn</span>
                          </a>
        
                          <a
                            href="https://twitter.com/v3rific"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredSocial('twitter')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${hoveredSocial === 'twitter' ? 'bg-sky-500 scale-110' : 'bg-sky-500/20'}`}>
                              <FaTwitter className="w-5 h-5" />
                            </div>
                            <span className="text-sm group-hover:translate-x-1 transition-transform">Twitter</span>
                          </a>
        
                          <a
                            href="mailto:team@v3rific.io"
                            onMouseEnter={() => setHoveredSocial('email')}
                            onMouseLeave={() => setHoveredSocial(null)}
                            className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${hoveredSocial === 'email' ? 'bg-indigo-600 scale-110' : 'bg-indigo-600/20'}`}>
                              <FaMailchimp className="w-5 h-5" />
                            </div>
                            <span className="text-sm group-hover:translate-x-1 transition-transform">team@v3rific.io</span>
                          </a>
                        </div>
                      </div>
        
                    </div>
    )
}