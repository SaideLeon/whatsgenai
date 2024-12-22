import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { sessionService, vendorService, sellerService, messageService } from '../services/api';
import { Bot, Menu, X, LogOut, MessageCircle, Users, Settings, PlusCircle, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    sessions: 0,
    vendors: 0,
    sellers: 0,
    messages: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [sessions, vendors, sellers, messages] = await Promise.all([
        sessionService.list(),
        vendorService.list(),
        sellerService.list(),
        messageService.list()
      ]);

      setStats({
        sessions: sessions.data.length,
        vendors: vendors.data.length,
        sellers: sellers.data.length,
        messages: messages.data.length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Visão Geral', icon: <Bot className="w-5 h-5" /> },
    { path: '/dashboard/sessions', label: 'Sessões', icon: <MessageCircle className="w-5 h-5" /> },
    { path: '/dashboard/contacts', label: 'Contatos', icon: <Users className="w-5 h-5" /> },
    { path: '/dashboard/settings', label: 'Configurações', icon: <Settings className="w-5 h-5" /> }
  ];

  const DashboardOverview = () => (
    <div className="grid gap-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-400">Sessões Ativas</h3>
            <MessageCircle className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-2xl font-semibold text-white mt-2">{stats.sessions}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-400">Fornecedores</h3>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-2xl font-semibold text-white mt-2">{stats.vendors}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-400">Vendedores</h3>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-2xl font-semibold text-white mt-2">{stats.sellers}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-400">Mensagens</h3>
            <MessageCircle className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-2xl font-semibold text-white mt-2">{stats.messages}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/dashboard/sessions/new')}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            Nova Sessão
          </button>

          <button
            onClick={() => navigate('/dashboard/vendors/new')}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            Novo Fornecedor
          </button>

          <button
            onClick={() => navigate('/dashboard/sellers/new')}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            Novo Vendedor
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navbar */}
      <nav className="backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Bot className="h-8 w-8 text-blue-400" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                        location.pathname === item.path
                          ? 'bg-white/10 text-white'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                >
                  <LogOut className="w-5 h-5" />
                  Sair
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white w-full"
              >
                <LogOut className="w-5 h-5" />
                Sair
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/sessions" element={<div>Sessões</div>} />
            <Route path="/contacts" element={<div>Contatos</div>} />
            <Route path="/settings" element={<div>Configurações</div>} />
          </Routes>
        )}
      </main>
    </div>
  );
};

export default Dashboard;