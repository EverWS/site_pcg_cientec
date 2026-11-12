// Conteúdo editorial da página. Atualize textos, datas e notícias aqui,
// sem precisar mexer nos componentes.

export const EVENT_DATE = '2026-12-03T09:00:00-03:00';

export const navItems = [
  ['sobre', 'O evento'],
  ['programacao', 'Programação'],
  ['noticias', 'Atualizações'],
  ['feedback', 'Feedback'],
];

export const highlights = [
  {
    icon: '◎',
    eyebrow: 'Propósito',
    title: 'Conhecimento que encontra contexto',
    text: 'Uma ponte entre a formação universitária e os desafios reais da sociedade, com espaço para testar ideias e compartilhar descobertas.',
  },
  {
    icon: '⌘',
    eyebrow: 'Interdisciplinaridade',
    title: 'Diferentes saberes, um mesmo movimento',
    text: 'Resultados dos projetos extensionistas se conectam em uma experiência que reúne ciência, criatividade, tecnologia e impacto social.',
  },
  {
    icon: '↗',
    eyebrow: 'Comunidade',
    title: 'Portas abertas para Joinville',
    text: 'Escolas e comunidade externa são convidadas a explorar, perguntar, experimentar e participar da construção do futuro.',
  },
];

export const schedule = [
  {
    number: '01',
    time: 'Durante todo o evento',
    title: 'Exposição de projetos',
    text: 'Protótipos, simulações, pesquisas aplicadas e soluções desenvolvidas pelos acadêmicos.',
    tone: 'blue',
  },
  {
    number: '02',
    time: 'Atividades práticas',
    title: 'Workshops e oficinas',
    text: 'Experiências para visitantes e estudantes do ensino básico e médio das escolas convidadas.',
    tone: 'gold',
  },
  {
    number: '03',
    time: 'Programação de palco',
    title: 'Palestras e apresentações',
    text: 'Conversas sobre inovação, sustentabilidade, empreendedorismo e impactos sociais da tecnologia.',
    tone: 'orange',
  },
];

export const news = [
  {
    date: 'OUT 2026',
    title: 'Definição de workshops e palestras',
    text: 'A comissão organizadora está finalizando a grade oficial de atividades práticas e exposições.',
  },
  {
    date: 'NOV 2026',
    title: 'Convite às escolas de Joinville',
    text: 'Começa o cronograma de visitas e convites oficiais às escolas do município para participação na mostra.',
  },
  {
    date: '03 DEZ 2026',
    title: 'Grande dia do evento',
    text: 'O CIENTEC abre suas portas para a comunidade e transforma teoria em experiências compartilhadas.',
    featured: true,
  },
];

// Aviso exibido enquanto os formulários não têm backend. Ao conectar um
// serviço de envio, remova o aviso e publique a política de privacidade (LGPD).
export const DEMO_NOTICE =
  'Formulário demonstrativo: nenhum dado é enviado ou armazenado.';
