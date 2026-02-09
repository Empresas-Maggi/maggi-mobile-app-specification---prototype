
import React, { useState, useEffect } from 'react';
import { AppView, Vehicle, Appointment } from './types';
import Layout from './components/Layout';
import SpecificationDoc from './components/SpecificationDoc';
import { MOCK_VEHICLES, MOCK_CAMPAIGNS, BRANDS, UNITS, SERVICES } from './constants';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Filter,
  CheckCircle2,
  ChevronLeft,
  Sparkles,
  Car,
  Tag,
  User,
  FileText,
  CircleDollarSign,
  Users2,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { getVehicleRecommendation } from './services/geminiService';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.HOME);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [userProfileInput, setUserProfileInput] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // States for Appointment Flow
  const [step, setStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState<Partial<Appointment>>({});
  const [isBooked, setIsBooked] = useState(false);

  // Stock Filters
  const [stockType, setStockType] = useState<'NEW' | 'USED'>('NEW');

  const handleAskAi = async () => {
    if (!userProfileInput) return;
    setIsAiLoading(true);
    const rec = await getVehicleRecommendation(userProfileInput);
    setAiRecommendation(rec);
    setIsAiLoading(false);
  };

  const renderHome = () => (
    <div className="space-y-6 p-6 animate-in fade-in duration-500">
      {/* Search Header */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-900" size={18} />
        <input 
          type="text" 
          placeholder="Busque modelo, marca ou categoria..." 
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all text-sm"
        />
      </div>

      {/* AI Assistant */}
      <div className="bg-gradient-to-br from-[#003366] to-blue-800 p-5 rounded-2xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={80} />
        </div>
        <div className="relative z-10">
            <h3 className="text-lg font-bold flex items-center gap-2">
                <Sparkles size={20} className="text-blue-300" />
                Consultor Digital Maggi
            </h3>
            <p className="text-xs text-blue-100 mt-1">IA treinada para te ajudar com estoque e crédito.</p>
            
            <div className="mt-4 flex gap-2">
                <input 
                  value={userProfileInput}
                  onChange={(e) => setUserProfileInput(e.target.value)}
                  placeholder="Ex: Qual o melhor consórcio para SUV?"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder:text-blue-200"
                />
                <button 
                  onClick={handleAskAi}
                  disabled={isAiLoading}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <ChevronRight size={20} />
                </button>
            </div>

            {aiRecommendation && (
                <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-lg animate-in slide-in-from-top-2">
                    <p className="text-xs leading-relaxed italic">"{aiRecommendation}"</p>
                </div>
            )}
        </div>
      </div>

      {/* Quick Actions Grid - Updated to 6 items */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Revisão', icon: CalendarIcon, color: 'bg-blue-50 text-blue-900', view: AppView.SCHEDULE },
          { label: 'Estoque', icon: Car, color: 'bg-blue-50 text-blue-700', view: AppView.STOCK },
          { label: 'Ofertas', icon: Tag, color: 'bg-blue-50 text-blue-800', view: AppView.CAMPAIGNS },
          { label: 'Financiar', icon: CircleDollarSign, color: 'bg-blue-50 text-blue-900', action: 'finance' },
          { label: 'Consórcio', icon: Users2, color: 'bg-blue-50 text-blue-800', action: 'consortium' },
          { label: 'WhatsApp', icon: MessageCircle, color: 'bg-green-50 text-green-700', action: 'whatsapp' },
        ].map((action, i) => (
          <button 
            key={i}
            onClick={() => action.view ? setActiveView(action.view) : null}
            className="flex flex-col items-center justify-center p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow gap-2"
          >
            <div className={`p-2.5 rounded-lg ${action.color}`}>
              <action.icon size={22} />
            </div>
            <span className="text-[10px] font-bold text-gray-700 text-center leading-tight">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Featured Vehicle */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
            <h2 className="text-lg font-bold text-gray-900">Destaque Maggi</h2>
            <button onClick={() => setActiveView(AppView.STOCK)} className="text-[#003366] text-xs font-bold uppercase tracking-wider">Ver Todos</button>
        </div>
        <div 
          onClick={() => { setSelectedVehicle(MOCK_VEHICLES[0]); setActiveView(AppView.STOCK); }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer"
        >
          <img src={MOCK_VEHICLES[0].image} className="w-full h-48 object-cover" alt="Destaque" />
          <div className="p-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-gray-900">{MOCK_VEHICLES[0].model}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{MOCK_VEHICLES[0].brand}</p>
                </div>
                <div className="text-right">
                    <p className="text-[#003366] font-black text-lg leading-none">R$ {MOCK_VEHICLES[0].price.toLocaleString('pt-BR')}</p>
                    <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Opções de Crédito</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Maggi Section */}
      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 grid grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
            <div className="mt-1 text-[#003366]"><ShieldCheck size={18}/></div>
            <div>
                <p className="text-xs font-bold text-gray-800">Segurança</p>
                <p className="text-[10px] text-gray-500 leading-tight">Empresa com +40 anos de história.</p>
            </div>
        </div>
        <div className="flex items-start gap-3">
            <div className="mt-1 text-[#003366]"><CreditCard size={18}/></div>
            <div>
                <p className="text-xs font-bold text-gray-800">Flexibilidade</p>
                <p className="text-[10px] text-gray-500 leading-tight">Melhores taxas do mercado.</p>
            </div>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => {
    if (isBooked) return (
      <div className="flex flex-col items-center justify-center h-full p-10 text-center space-y-4 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Agendamento Realizado!</h2>
        <p className="text-gray-500 text-sm">Entraremos em contato em breve para confirmar.</p>
        <button 
          onClick={() => { setIsBooked(false); setStep(1); setActiveView(AppView.HOME); }}
          className="w-full bg-[#003366] text-white py-4 rounded-xl font-bold mt-6 shadow-lg active:scale-95 transition-transform"
        >
          Voltar para Home
        </button>
      </div>
    );

    return (
      <div className="p-6 space-y-8 animate-in slide-in-from-right-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Agendar Serviço</h2>
            <div className="flex items-center gap-1 mt-2">
                {[1,2,3].map(s => (
                    <div key={s} className={`h-1 flex-1 rounded-full ${step >= s ? 'bg-[#003366]' : 'bg-gray-200'}`} />
                ))}
            </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <label className="block">
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Qual serviço deseja?</span>
                <select 
                    className="mt-2 w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                    onChange={(e) => setAppointmentData({...appointmentData, service: e.target.value})}
                >
                    <option value="">Selecione um serviço</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </label>
            <label className="block">
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Marca do Veículo</span>
                <div className="grid grid-cols-3 gap-2 mt-2">
                    {BRANDS.slice(0, 6).map(b => (
                        <button 
                            key={b}
                            onClick={() => setAppointmentData({...appointmentData, brand: b})}
                            className={`p-3 rounded-lg border text-xs font-bold transition-all ${appointmentData.brand === b ? 'bg-[#003366] border-[#003366] text-white' : 'bg-white border-gray-200 text-gray-600'}`}
                        >
                            {b}
                        </button>
                    ))}
                </div>
            </label>
            <button 
                disabled={!appointmentData.service || !appointmentData.brand}
                onClick={() => setStep(2)}
                className="w-full bg-[#003366] text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 active:scale-95 transition-transform"
            >
                Continuar
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <button onClick={() => setStep(1)} className="flex items-center text-xs font-bold text-gray-400 gap-1 uppercase tracking-widest"><ChevronLeft size={14}/> Voltar</button>
            <label className="block">
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Unidade Maggi</span>
                <select 
                    className="mt-2 w-full p-4 bg-white border border-gray-200 rounded-xl outline-none"
                    onChange={(e) => setAppointmentData({...appointmentData, unit: e.target.value})}
                >
                    <option value="">Escolha a unidade</option>
                    {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
            </label>
            <label className="block">
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Data do Serviço</span>
                <input 
                    type="date" 
                    className="mt-2 w-full p-4 bg-white border border-gray-200 rounded-xl outline-none"
                    onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                />
            </label>
            <button 
                disabled={!appointmentData.unit || !appointmentData.date}
                onClick={() => setStep(3)}
                className="w-full bg-[#003366] text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 active:scale-95 transition-transform"
            >
                Próximo Passo
            </button>
          </div>
        )}

        {step === 3 && (
            <div className="space-y-6">
                <button onClick={() => setStep(2)} className="flex items-center text-xs font-bold text-gray-400 gap-1 uppercase tracking-widest"><ChevronLeft size={14}/> Voltar</button>
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Horários</span>
                <div className="grid grid-cols-4 gap-2 mt-2">
                    {['08:00', '10:00', '14:00', '16:00'].map(t => (
                        <button 
                            key={t}
                            onClick={() => setAppointmentData({...appointmentData, time: t})}
                            className={`p-3 rounded-lg border text-sm font-bold transition-all ${appointmentData.time === t ? 'bg-[#003366] border-[#003366] text-white' : 'bg-white border-gray-200 text-gray-600'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                <button 
                    disabled={!appointmentData.time}
                    onClick={() => setIsBooked(true)}
                    className="w-full bg-[#003366] text-white py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 active:scale-95 transition-transform"
                >
                    Confirmar Tudo
                </button>
            </div>
        )}
      </div>
    );
  };

  const renderStock = () => {
    if (selectedVehicle) return (
        <div className="animate-in slide-in-from-bottom-10 duration-500 h-full bg-white">
            <div className="relative h-64">
                <button onClick={() => setSelectedVehicle(null)} className="absolute top-4 left-4 z-10 bg-white/80 p-2 rounded-full backdrop-blur-sm"><ChevronLeft size={20}/></button>
                <img src={selectedVehicle.image} className="w-full h-full object-cover" alt="Veículo" />
            </div>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 leading-tight">{selectedVehicle.model}</h2>
                        <span className="text-xs font-bold bg-blue-50 px-2 py-1 rounded text-[#003366] uppercase tracking-widest">{selectedVehicle.brand}</span>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black text-[#003366]">R$ {selectedVehicle.price.toLocaleString('pt-BR')}</p>
                        <p className="text-[10px] text-green-600 font-bold uppercase">Melhor taxa garantida</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: 'Ano', value: selectedVehicle.year },
                        { label: 'KM', value: selectedVehicle.km === 0 ? '0km' : `${selectedVehicle.km.toLocaleString()} km` },
                        { label: 'Câmbio', value: selectedVehicle.transmission },
                        { label: 'Combustível', value: selectedVehicle.fuel },
                    ].map((attr, i) => (
                        <div key={i} className="bg-gray-50 p-3 rounded-xl">
                            <p className="text-[10px] text-gray-400 font-bold uppercase">{attr.label}</p>
                            <p className="text-sm font-bold text-gray-700">{attr.value}</p>
                        </div>
                    ))}
                </div>

                {/* Primary Actions */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                    <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform">
                        <MessageCircle size={20} />
                        Falar com Consultor via WhatsApp
                    </button>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <button className="bg-blue-50 text-[#003366] py-3 rounded-xl font-bold flex flex-col items-center justify-center gap-1 active:scale-95 border border-blue-100 transition-transform">
                            <CircleDollarSign size={18} />
                            <span className="text-[10px] uppercase">Financiamento</span>
                        </button>
                        <button className="bg-blue-50 text-[#003366] py-3 rounded-xl font-bold flex flex-col items-center justify-center gap-1 active:scale-95 border border-blue-100 transition-transform">
                            <Users2 size={18} />
                            <span className="text-[10px] uppercase">Consórcio</span>
                        </button>
                    </div>
                    
                    <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform">
                        <CalendarIcon size={20} />
                        Agendar Visita / Test Drive
                    </button>
                </div>
            </div>
        </div>
    );

    return (
      <div className="space-y-6 animate-in fade-in">
        <div className="p-6 pb-0 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Estoque Maggi</h2>
            <div className="flex bg-gray-100 p-1 rounded-xl">
                <button 
                    onClick={() => setStockType('NEW')}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${stockType === 'NEW' ? 'bg-white shadow-sm text-[#003366]' : 'text-gray-500'}`}
                >
                    Veículos Novos
                </button>
                <button 
                    onClick={() => setStockType('USED')}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${stockType === 'USED' ? 'bg-white shadow-sm text-[#003366]' : 'text-gray-500'}`}
                >
                    Seminovos
                </button>
            </div>
        </div>

        <div className="px-6 space-y-4 pb-6">
            {MOCK_VEHICLES.filter(v => v.type === stockType).map((vehicle) => (
                <div 
                    key={vehicle.id} 
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col active:scale-98 transition-transform cursor-pointer"
                >
                    <div className="relative">
                        <img src={vehicle.image} className="w-full h-40 object-cover" alt={vehicle.model} />
                        <span className="absolute top-2 right-2 bg-blue-900/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
                            {vehicle.unit}
                        </span>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-gray-900 text-sm truncate max-w-[65%]">{vehicle.model}</h3>
                            <p className="text-[#003366] font-black text-sm">R$ {vehicle.price.toLocaleString('pt-BR')}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                {vehicle.year} • {vehicle.km === 0 ? 'Zero KM' : `${vehicle.km.toLocaleString()} KM`}
                            </p>
                            <span className="text-[9px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-bold uppercase">Crédito Aprovado</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
  };

  const renderCampaigns = () => (
    <div className="p-6 space-y-6 animate-in fade-in">
        <h2 className="text-2xl font-bold text-gray-900">Ofertas Exclusivas</h2>
        <div className="space-y-6">
            {MOCK_CAMPAIGNS.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    <img src={c.image} className="w-full h-40 object-cover" alt={c.title} />
                    <div className="p-5 space-y-2">
                        <h3 className="font-black text-lg text-[#003366] leading-tight">{c.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{c.subtitle}</p>
                        <button className="w-full bg-[#003366] text-white py-3 rounded-xl text-sm font-bold uppercase mt-2 active:scale-95 transition-transform">Tenho Interesse</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const renderProfile = () => (
    <div className="p-6 space-y-8 animate-in fade-in">
        <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center border-2 border-blue-100">
                <User size={32} className="text-[#003366]" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-900">Meu Perfil Maggi</h2>
                <button className="text-[#003366] text-xs font-bold uppercase tracking-widest mt-1">Fazer Login</button>
            </div>
        </div>

        <div className="space-y-3">
            {[
                { label: 'Meus Agendamentos', icon: CalendarIcon },
                { label: 'Veículos Salvos', icon: Car },
                { label: 'Planos de Financiamento', icon: CircleDollarSign },
                { label: 'Cotas de Consórcio', icon: Users2 },
                { label: 'Nossas Unidades', icon: MapPin },
            ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                        <item.icon size={18} className="text-[#003366]" />
                        <span className="text-sm font-bold text-gray-700">{item.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-300"/>
                </button>
            ))}
        </div>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case AppView.HOME: return renderHome();
      case AppView.SCHEDULE: return renderSchedule();
      case AppView.STOCK: return renderStock();
      case AppView.CAMPAIGNS: return renderCampaigns();
      case AppView.PROFILE: return renderProfile();
      case AppView.SPEC: return <SpecificationDoc />;
      default: return renderHome();
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
