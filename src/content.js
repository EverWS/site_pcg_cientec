// Conteúdo editorial da página. Atualize textos, datas e notícias aqui,
// sem precisar mexer nos componentes.

export const EVENT_NAME = '1ª Mostra de Projetos CIENTEC - UFSC';
export const EVENT_TAGLINE = 'Da teoria ao impacto';
export const EVENT_DATE = '2026-12-03T09:00:00-03:00';
export const EVENT_DATE_LABEL = '03 dez. 2026';
export const EVENT_PLACE = 'UFSC Joinville';

export const navItems = [
  ['sobre', 'A mostra'],
  ['trajetoria', 'Trajetória'],
  ['programacao', 'Programação'],
  ['noticias', 'Atualizações'],
  ['feedback', 'Feedback'],
];

// Palavras que alternam no título do hero: "Da teoria ao …".
export const heroWords = ['protótipo', 'experimento', 'impacto'];

// Faixa em movimento abaixo do hero.
export const areas = [
  'Engenharias',
  'Computação',
  'Sustentabilidade',
  'Empreendedorismo',
  'Inovação',
  'Ciência aplicada',
  'Extensão universitária',
  'Tecnologia social',
];

export const highlights = [
  {
    icon: '◎',
    eyebrow: 'Propósito',
    title: 'Conhecimento que encontra contexto',
    text: 'Uma ponte entre a formação universitária e os desafios reais da sociedade, com espaço para testar ideias e compartilhar descobertas.',
    tone: 'blue',
  },
  {
    icon: '⌘',
    eyebrow: 'Interdisciplinaridade',
    title: 'Diferentes saberes, um mesmo movimento',
    text: 'Resultados dos projetos extensionistas se conectam em uma experiência que reúne ciência, criatividade, tecnologia e impacto social.',
    tone: 'gold',
  },
  {
    icon: '↗',
    eyebrow: 'Comunidade',
    title: 'Portas abertas para Joinville',
    text: 'Escolas e comunidade externa são convidadas a explorar, perguntar, experimentar e participar da construção do futuro.',
    tone: 'orange',
  },
];

// Etapas da seção "Trajetória": o caminho de um projeto até a mostra.
export const journey = [
  {
    step: 'Teoria',
    title: 'Uma pergunta',
    text: 'Todo projeto começa em sala de aula, num conceito que pede para ser testado fora do papel.',
  },
  {
    step: 'Método',
    title: 'Um experimento',
    text: 'Modelos, simulações e medições transformam a hipótese em algo que pode ser verificado.',
  },
  {
    step: 'Protótipo',
    title: 'Uma solução',
    text: 'A ideia ganha forma: circuitos, códigos, maquetes e processos que funcionam de verdade.',
  },
  {
    step: 'Impacto',
    title: 'Uma conversa',
    text: 'Na mostra, o projeto encontra o público, recebe perguntas e passa a fazer parte da comunidade.',
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
    title: 'Grande dia da mostra',
    text: 'A 1ª Mostra de Projetos CIENTEC abre suas portas para a comunidade e transforma teoria em experiências compartilhadas.',
    featured: true,
  },
];

// Aviso exibido enquanto os formulários não têm backend. Ao conectar um
// serviço de envio, remova o aviso e publique a política de privacidade (LGPD).
export const DEMO_NOTICE =
  'Formulário demonstrativo: nenhum dado é enviado ou armazenado.';
