// Conteúdo editorial da página. Atualize textos, datas e notícias aqui,
// sem precisar mexer nos componentes.

export const EVENT_NAME = '1ª Mostra de Projetos CIENTEC - UFSC';
export const EVENT_TAGLINE = 'Da teoria ao impacto';
// Início do cerimonial de abertura (alvo da contagem regressiva).
export const EVENT_DATE = '2026-12-03T08:30:00-03:00';
export const EVENT_DAY = '2026-12-03';
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

// Programação preliminar do dia 03/12/2026 (horário de Brasília).
// Cada atividade termina quando a próxima começa. `url` é o link de
// inscrição na plataforma da UFSC; a presença registrada gera certificado de
// horas para Atividades Complementares. Sem `url` = aberta, sem inscrição.
export const PROGRAM_STATUS = 'Programação preliminar, sujeita a alterações.';
export const CERTIFICATE_NOTE =
  'A presença registrada gera certificado de horas para Atividades Complementares.';

export const REGISTRATION_ALL = {
  title: 'Todas as apresentações',
  text: 'Uma única inscrição para participar do dia inteiro da mostra.',
  url: 'https://inscricoes.ufsc.br/mostra-cientec-participacao',
};

export const programTypes = {
  org: 'Organização',
  abertura: 'Abertura',
  tcc: 'TCC',
  cultura: 'Cultura',
  projeto: 'Projeto',
  extensao: 'Extensão',
  conversa: 'Conversa',
  encerramento: 'Encerramento',
};

export const programFilters = [
  { id: 'todas', label: 'Tudo' },
  { id: 'tcc', label: 'TCCs', types: ['tcc'] },
  {
    id: 'projetos',
    label: 'Projetos e extensão',
    types: ['projeto', 'extensao', 'conversa'],
  },
  { id: 'cultura', label: 'Cultura', types: ['cultura'] },
  { id: 'inscricao', label: 'Com inscrição', withRegistration: true },
];

export const program = [
  {
    start: '08:30',
    type: 'abertura',
    title: 'Cerimonial e abertura',
    detail:
      'Coordenação do curso (Romulo e Delatorre), TCC (Cesar), Estágio (Maria Simone) e Extensão (Andréa)',
  },
  {
    start: '09:00',
    type: 'tcc',
    title: 'Apresentação de TCC',
    detail: 'Hideki Nishijima',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-tcc-hideki',
  },
  {
    start: '10:00',
    type: 'tcc',
    title: 'Apresentação de TCC',
    detail: 'Felipe Schneider Herrmann',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-tcc-felipe',
  },
  {
    start: '11:00',
    type: 'tcc',
    title: 'Apresentação de TCC',
    detail: 'Victor Medeiros Bitencourt',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-tcc-victor',
  },
  { start: '12:00', type: 'cultura', title: 'Momento cultural' },
  {
    start: '12:45',
    type: 'cultura',
    title: 'Apresentação da Banda Mordent',
    detail: 'Antoni Leffeck Schafachek',
  },
  { start: '13:10', type: 'org', title: 'Retorno das atividades do evento' },
  {
    start: '13:20',
    type: 'projeto',
    title: 'Apresentação do GAPE',
    detail: 'Julia Nascimento dos Santos',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-gape',
  },
  {
    start: '13:30',
    type: 'projeto',
    title: 'Apresentação da ETECH',
    detail: 'Priscila de Matos Barros',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-etech',
  },
  {
    start: '13:40',
    type: 'projeto',
    title: 'Apresentação do Projeto SECARTE',
    detail: 'Bruna Carolyne Manfron Martins',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-secarte',
  },
  {
    start: '13:50',
    type: 'projeto',
    title: 'Apresentação do Clube do Livro',
    detail: 'Professor Emerich',
  },
  {
    start: '14:40',
    type: 'projeto',
    title: 'Projeto Conhecer e Integrar',
    detail: 'Edições 2025/2026',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-cointegrar',
  },
  {
    start: '15:40',
    type: 'extensao',
    title: 'Apresentação de Extensão do TCC',
    detail:
      'Everton Wesley da Silva, Henrique Gomes Inácio e Maria Clara Seixa Scheffel',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-extensao',
  },
  {
    start: '16:40',
    type: 'projeto',
    title: 'Projeto Relacionar e Promover',
    detail: 'Edições 2025/2026',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-repromove',
  },
  {
    start: '17:40',
    type: 'conversa',
    title: 'Roda de conversa com egressos',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-egressos',
  },
  {
    start: '18:40',
    type: 'encerramento',
    title: 'Encerramento e coffee break',
  },
].map((item, index, list) => ({
  ...item,
  id: `${item.start}-${index}`,
  end: list[index + 1]?.start,
}));

export const news = [
  {
    date: 'OUT 2026',
    title: 'Definição da programação',
    text: 'A comissão organizadora definiu a programação preliminar: apresentações de TCC, projetos de extensão, momento cultural e roda de conversa com egressos.',
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
