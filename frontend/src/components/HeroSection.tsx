import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Building, BarChart3, Sparkles, Zap, Crown, Star, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-dashboard.jpg";

const HeroSection = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { icon: Users, label: "Students", value: "10,000+", color: "from-blue-500 to-cyan-500" },
    { icon: Building, label: "Hostels", value: "50+", color: "from-purple-500 to-pink-500" },
    { icon: Shield, label: "Security", value: "24/7", color: "from-green-500 to-emerald-500" },
    { icon: BarChart3, label: "Efficiency", value: "98%", color: "from-orange-500 to-red-500" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <Badge variant="outline" className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 text-blue-300 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                ✨ Next-Gen Campus Management
              </Badge>
            </div>

            <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Revolutionize
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Campus Living
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Experience the future of hostel management with AI-powered insights,
              real-time security monitoring, and seamless automation that transforms
              how students live and administrators manage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group">
                  <Crown className="w-5 h-5 mr-2" />
                  Launch Dashboard
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 group">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
                <Star className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
              </Button>
            </div>
            {/* Demo Credentials */}
            <div className="mt-4 text-sm text-gray-400 max-w-md mx-auto lg:mx-0">
              <p><strong>Demo Credentials:</strong></p>
              <p>Email: <code>admin@dormmate.com</code></p>
              <p>Password: <code>password123</code></p>
              <p className="italic mt-2">Use these credentials to sign in directly from the landing page.</p>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`text-center transition-all duration-500 ${
                      index === currentStat ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg ${
                      index === currentStat ? 'animate-bounce' : ''
                    }`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hero Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl scale-110"></div>

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={heroImage}
                  alt="Secure Campus Suite Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/20 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">AI Security</div>
                    <div className="text-xs text-gray-300">Real-time Protection</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/20 animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">Smart Analytics</div>
                    <div className="text-xs text-gray-300">Predictive Insights</div>
                  </div>
                </div>
              </div>

              {/* Interactive Elements */}
              <div className="absolute top-1/2 left-4 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
              <div className="absolute top-1/4 right-6 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-300"></div>
              <div className="absolute bottom-1/3 left-8 w-4 h-4 bg-pink-400 rounded-full animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
