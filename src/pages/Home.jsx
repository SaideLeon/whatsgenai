import React, { useState } from 'react';
import { Menu, X, Bot, MessageCircle, Brain, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "Agentes Especializados",
      description: "Cada agente é treinado em uma área específica, garantindo atendimento preciso e profissional."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "IA Contextual",
      description: "Sistema inteligente que direciona cada cliente para o agente mais adequado automaticamente."
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Único Número",
      description: "Gerencie infinitos agentes inteligentes usando apenas um número de WhatsApp."
    }
  ];

  const benefits = [
    "Atendimento 24/7 sem custos adicionais",
    "Aumento significativo na taxa de conversão",
    "Redução de custos operacionais",
    "Escalabilidade ilimitada",
    "Respostas personalizadas e contextuais",
    "Integração simples e rápida"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navbar */}
      <nav className="backdrop-blur-md bg-black/30 fixed w-full z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                WhatsGenAI
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#home" className="text-white hover:text-blue-400 transition-colors">Home</a>
              <a href="#features" className="text-white hover:text-blue-400 transition-colors">Recursos</a>
              <a href="#how-it-works" className="text-white hover:text-blue-400 transition-colors">Como Funciona</a>
              <a href="#pricing" className="text-white hover:text-blue-400 transition-colors">Preços</a>
              <button
                onClick={() => handleNavigate('/login')}
                className="border border-white/20 text-white px-4 py-2 rounded hover:bg-white/10 transition"
              >
                Login
              </button>
              <button
                onClick={() => handleNavigate('/register')}
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded hover:opacity-90 transition"
              >
                Cadastro
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                <a href="#home" className="text-white hover:text-blue-400 transition-colors">Home</a>
                <a href="#features" className="text-white hover:text-blue-400 transition-colors">Recursos</a>
                <a href="#how-it-works" className="text-white hover:text-blue-400 transition-colors">Como Funciona</a>
                <a href="#pricing" className="text-white hover:text-blue-400 transition-colors">Preços</a>
                <button
                  onClick={() => handleNavigate('/login')}
                  className="border border-white/20 text-white px-4 py-2 rounded hover:bg-white/10 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigate('/register')}
                  className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded hover:opacity-90 transition"
                >
                  Cadastro
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 md:pt-32 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Revolucione seu 
                <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent"> Atendimento</span>
              </h1>
              <p className="text-gray-300 text-lg mb-8">
                Transforme um único número de WhatsApp em uma equipe completa de agentes inteligentes especializados, prontos para atender seus clientes 24/7.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => handleNavigate('/register')}
                  className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 justify-center"
                >
                  Cadastro <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleNavigate('/login')}
                  className="border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 justify-center"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
