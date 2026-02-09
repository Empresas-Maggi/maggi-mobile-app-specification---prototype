
import React from 'react';

const SpecificationDoc: React.FC = () => {
  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-[#003366] pb-2 inline-block">1. Visão Geral</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          O App Maggi é o hub digital do cliente para todo o ecossistema Maggi (Fiat, VW, Toyota, BYD, etc.). 
          Foco em <strong>conveniência no agendamento</strong>, <strong>estoque dinâmico</strong> e <strong>serviços financeiros integrados</strong>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">2. Estratégia de Conversão</h2>
        <div className="grid gap-4">
          {[
            { title: 'Financiamento', desc: 'Simulação rápida integrada ao banco da montadora.' },
            { title: 'Consórcio', desc: 'Cotas Maggi com taxas administrativas competitivas.' },
            { title: 'Agendamento', desc: 'Fluxo em 3 passos para oficina e pós-venda.' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-[#003366]">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">3. User Stories (MVP)</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-2"><span className="text-[#003366] font-bold">•</span> Como usuário, quero simular um financiamento diretamente da tela do carro para saber se cabe no meu bolso.</li>
          <li className="flex gap-2"><span className="text-[#003366] font-bold">•</span> Como investidor, quero consultar opções de consórcio para planejar minha troca futura.</li>
          <li className="flex gap-2"><span className="text-[#003366] font-bold">•</span> Como cliente, quero ver ofertas da semana para economizar na troca de veículo.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">4. Integrações Sugeridas</h2>
        <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-xs overflow-x-auto">
          <pre>{`Financial_API {
  simulate_financing(vehicle_id, entry_value),
  get_consortium_quotas(brand_id),
  lead_capture(user_data, intent: ['FINANCE', 'CONSORTIUM'])
}`}</pre>
        </div>
      </section>

      <div className="bg-blue-50 p-4 rounded-xl text-center">
        <p className="text-xs text-[#003366] font-bold uppercase tracking-widest">Lead Generation Strategy</p>
        <p className="text-sm text-gray-700 mt-2">CTAs: "Financiar Agora", "Consultar Consórcio", "Simular Parcela".</p>
      </div>
    </div>
  );
};

export default SpecificationDoc;
