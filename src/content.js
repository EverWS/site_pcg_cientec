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

// Programação do dia 03/12/2026 (horário de Brasília).
// Cada atividade termina quando a próxima começa. `url` é o link de
// inscrição na plataforma da UFSC; a presença registrada gera certificado de
// horas para Atividades Complementares. Sem `url` = aberta, sem inscrição.
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
  { start: '08:30', type: 'abertura', title: 'Cerimonial e abertura' },
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
  {
    start: '12:00',
    type: 'cultura',
    title: 'Momento das Poesias',
    detail: 'Clube do Livro Viajantes Estáticos',
  },
  {
    start: '12:45',
    type: 'cultura',
    title: 'Apresentação da Banda Mordent',
    detail: 'Antoni Leffeck Schafachek',
  },
  { start: '13:20', type: 'org', title: 'Retorno das atividades do evento' },
  {
    start: '13:30',
    type: 'projeto',
    title: 'Apresentação do GAPE',
    detail: 'Julia Nascimento dos Santos',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-gape',
  },
  {
    start: '13:45',
    type: 'projeto',
    title: 'Apresentação da ETECH',
    detail: 'Priscila de Matos Barros',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-etech',
  },
  {
    start: '14:00',
    type: 'projeto',
    title: 'Apresentação do Projeto SECARTE',
    detail: 'Bruna Carolyne Manfron Martins',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-secarte',
  },
  {
    start: '14:15',
    type: 'projeto',
    title: 'Projeto Conhecer e Integrar',
    detail: 'Edições 2025/2026',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-cointegrar',
  },
  // As três apresentações das 15h compartilham o mesmo link de inscrição.
  {
    start: '15:15',
    type: 'extensao',
    title: 'Apresentação de Extensão do TCC',
    detail: 'Everton Wesley da Silva',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-extensao',
  },
  {
    start: '15:35',
    type: 'projeto',
    title: 'Projeto Agentes para Escrita de Artigos',
    detail: 'Maria Clara Seixa Scheffel',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-extensao',
  },
  {
    start: '15:55',
    type: 'extensao',
    title: 'Apresentação de Extensão do TCC',
    detail: 'Henrique Gomes Inácio',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-extensao',
  },
  {
    start: '16:15',
    type: 'projeto',
    title: 'Projeto Relacionar e Promover',
    detail: 'Edições 2025/2026',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-repromove',
  },
  {
    start: '17:30',
    type: 'conversa',
    title: 'Roda de conversa com egressos',
    url: 'https://inscricoes.ufsc.br/mostra-cientec-egressos',
  },
  {
    start: '18:30',
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
    text: 'A comissão organizadora definiu a programação: apresentações de TCC, projetos de extensão, momento cultural e roda de conversa com egressos.',
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

// Questionário de avaliação da mostra (Google Forms, abre em nova aba).
export const FEEDBACK_FORM_URL = 'https://forms.gle/dP8tbqLoJHJaVHGu5';

// Destino das mensagens da caixa de contato.
export const CONTACT_EMAIL = 'ufsc.cientec@gmail.com';

// URL do App da Web do Google Apps Script que envia as mensagens por e-mail
// (veja integracoes/google-apps-script/README.md). Termina em /exec.
// Vazio = plano B: abre o aplicativo de e-mail do visitante.
export const CONTACT_ENDPOINT = '';

// Aviso de privacidade (LGPD) do formulário de contato.
export const PRIVACY_UPDATED = '17/11/2026';
export const privacySections = [
  {
    title: 'Quem trata os dados',
    text: `A comissão organizadora da 1ª Mostra de Projetos CIENTEC, do Curso de Bacharelado em Ciência e Tecnologia da UFSC Joinville. Contato: ${CONTACT_EMAIL}.`,
  },
  {
    title: 'Quais dados coletamos',
    text: 'Somente o que você digita no formulário de contato: nome, e-mail e mensagem. O site não usa cookies, não cria contas e não faz rastreamento.',
  },
  {
    title: 'Para que usamos',
    text: 'Para ler e responder a sua mensagem e melhorar as próximas edições da mostra. A base legal é o seu consentimento, dado ao enviar o formulário (art. 7º, I, da LGPD).',
  },
  {
    title: 'Como os dados são enviados',
    text: `A mensagem é transmitida por conexão segura a um script do Google Apps Script da conta ${CONTACT_EMAIL}, que a entrega por e-mail nessa caixa. O site não grava os dados. O Google atua como operador, conforme a política de privacidade dele.`,
  },
  {
    title: 'Por quanto tempo guardamos',
    text: 'As mensagens ficam na caixa de e-mail da organização pelo tempo necessário para responder e organizar o evento, e depois são excluídas. Não são vendidas nem compartilhadas com terceiros.',
  },
  {
    title: 'Seus direitos',
    text: `Você pode pedir acesso, correção ou exclusão dos seus dados e revogar o consentimento a qualquer momento (art. 18 da LGPD), escrevendo para ${CONTACT_EMAIL}.`,
  },
];
