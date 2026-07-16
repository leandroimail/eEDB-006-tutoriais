const path = require("path");
const T = require("./theme");
const { icon } = T;

(async () => {
  const p = T.newPres();
  const I = (n) => icon(n, "FFFFFF");
  const ID = (n) => icon(n, "12107E");
  const MOD = "Aula 5 · Streaming";
  let N = 0; const TOTAL = 10;
  const f = () => ({ n: ++N, total: TOTAL, module: MOD });

  T.cover(p, {
    eyebrow: "Aula 5",
    title: "Streaming de\nDados em Big Data",
    subtitle: "Eventos, filas, Kafka e janelas em tempo real",
    meta: ["eEDB-006 · Ecossistema de Big Data", "Parte teórica · tempo real", "Prof. Leandro Mendes Ferreira"],
    badge: "PECE · Poli-USP",
  });

  T.quote(p, {
    kicker: "A virada de chave",
    text: "O mundo não acontece em lotes noturnos. Ele acontece agora — um evento de cada vez.",
    source: "Streaming trata o dado como um fluxo contínuo, não como uma foto do passado.",
  });

  await T.cards(p, {
    kicker: "Nesta aula", title: "O que vamos ver",
    items: [
      { icon: 1, _iconData: await I("FaArrowsRotate"), title: "Batch × Streaming", desc: "Dois paradigmas para processar dados." },
      { icon: 1, _iconData: await I("FaBell"), title: "Eventos", desc: "Arquitetura orientada a eventos e o desacoplamento." },
      { icon: 1, _iconData: await I("FaListCheck"), title: "Filas × Tópicos", desc: "RabbitMQ/SQS versus o log distribuído do Kafka." },
      { icon: 1, _iconData: await I("FaLayerGroup"), title: "Kafka", desc: "Brokers, tópicos, partições, offsets e consumer groups." },
      { icon: 1, _iconData: await I("FaClock"), title: "Tempo & janelas", desc: "Event-time, watermark e janelas de agregação." },
      { icon: 1, _iconData: await I("FaBolt"), title: "Spark × Flink", desc: "As engines de processamento de stream." },
    ],
    cols: 3, foot: f(),
  });

  await T.cards(p, {
    kicker: "O contraste", title: "Batch × Streaming",
    items: [
      { accent: true, icon: 1, _iconData: await I("FaBoxesStacked"), _iconDataDark: await ID("FaBoxesStacked"), title: "Batch", desc: "Processa um conjunto finito e completo, em janelas agendadas. Alta vazão, latência de minutos a horas. Ideal para relatórios e cargas históricas." },
      { accent: true, icon: 1, _iconData: await I("FaWaveSquare"), _iconDataDark: await ID("FaWaveSquare"), title: "Streaming", desc: "Processa um fluxo infinito, evento a evento (ou micro-lotes), com latência de segundos. Ideal para alertas, dashboards ao vivo e detecção de fraude." },
    ],
    cols: 2, accentEvery: true, foot: f(),
  });

  T.bullets(p, {
    kicker: "O paradigma", title: "Arquitetura orientada a eventos",
    intro: "Um evento é um fato imutável que já aconteceu: “venda realizada”, “sensor leu 30°C”.",
    points: [
      { t: "Produtores e consumidores", d: "Quem gera o evento não sabe (nem precisa saber) quem vai consumi-lo." },
      { t: "Desacoplamento", d: "Sistemas evoluem de forma independente; novos consumidores entram sem mexer no produtor." },
      { t: "Broker no meio", d: "Uma peça de mensageria (fila/tópico) garante o trânsito confiável dos eventos." },
      { t: "Reatividade", d: "O sistema reage no instante em que o fato ocorre, não horas depois." },
    ],
    aside: { title: "Por que importa", lines: ["Escala independente", "Resiliência (buffer)", "Baixa latência", "Novos casos sem retrabalho", "Base do tempo real"] },
    foot: f(),
  });

  T.table(p, {
    kicker: "Transporte", title: "Filas × Tópicos (log)",
    head: ["Aspecto", "Fila (RabbitMQ, SQS)", "Log / Tópico (Kafka)"],
    rows: [
      ["Modelo", "Mensagem consumida e removida", "Log append-only, retido por tempo"],
      ["Releitura", "Não (some ao processar)", "Sim — vários consumidores, no seu ritmo"],
      ["Consumidores", "Competem pela mensagem", "Cada grupo lê todo o fluxo"],
      ["Ordenação", "Por fila", "Por partição"],
      ["Uso típico", "Tarefas/trabalho distribuído", "Streaming, event sourcing, integração"],
    ],
    colW: [2.7, 4.55, 4.58],
    note: "No Tutorial 4 você usa ambos: filas (RabbitMQ/SQS) e o log do Kafka.",
    foot: f(),
  });

  T.twoCol(p, {
    kicker: "O padrão de mercado", title: "Como o Kafka se organiza",
    left: [
      { t: "Broker & cluster", d: "Servidores que armazenam e servem os eventos (KRaft, sem ZooKeeper)." },
      { t: "Tópico & partição", d: "O tópico é dividido em partições — a unidade de paralelismo e ordem." },
      { t: "Offset", d: "Posição de cada evento na partição; o consumidor controla até onde leu." },
      { t: "Consumer group", d: "Consumidores de um grupo dividem as partições entre si e escalam." },
    ],
    codeTitle: "kafka — conceitos",
    code:
`# produtor publica em um tópico
topic: vendas   (3 partições)

  P0: [e0][e1][e2][e3] ...
  P1: [e0][e1][e2] ...
  P2: [e0][e1] ...
       ^offset

# consumer group "faturamento"
#   -> reparte P0,P1,P2 entre instâncias`,
    rightNote: "Mais partições = mais paralelismo de consumo.",
    foot: f(),
  });

  await T.cards(p, {
    kicker: "Garantias", title: "Semânticas de entrega",
    intro: "Quantas vezes um evento pode ser processado? O trade-off entre perda e duplicação.",
    items: [
      { icon: 1, _iconData: await I("FaAnglesRight"), title: "At-most-once", desc: "Pode perder eventos, nunca duplica. Rápido, mas arriscado." },
      { icon: 1, _iconData: await I("FaRotateRight"), title: "At-least-once", desc: "Nunca perde, mas pode duplicar. O consumidor precisa ser idempotente." },
      { icon: 1, _iconData: await I("FaCircleCheck"), title: "Exactly-once", desc: "Cada evento conta uma vez. Mais caro; exige suporte da engine (Kafka+Flink)." },
    ],
    cols: 3, foot: f(),
  });

  T.bullets(p, {
    kicker: "Conceito difícil (e central)", title: "Tempo e janelas",
    intro: "Em streams infinitos, agregamos por janelas de tempo — e o tempo tem duas naturezas.",
    points: [
      { t: "Event-time", d: "Quando o fato ocorreu (carimbo no evento). É o tempo que interessa ao negócio." },
      { t: "Processing-time", d: "Quando a engine viu o evento. Mais simples, porém sensível a atrasos." },
      { t: "Watermark", d: "Estimativa de “já vi tudo até aqui”; tolera eventos atrasados sem travar." },
      { t: "Tipos de janela", d: "Tumbling (fixa), sliding (deslizante) e session (por inatividade)." },
    ],
    aside: { title: "No tutorial", lines: ["Janela tumbling de 30s", "Agrupada por categoria", "Sobre o event-time", "Watermark p/ atraso", "Saída idêntica Spark×Flink"] },
    foot: f(),
  });

  T.table(p, {
    kicker: "As engines", title: "Spark Structured Streaming × Flink",
    head: ["Aspecto", "Spark Structured Streaming", "Apache Flink"],
    rows: [
      ["Modelo", "Micro-batch (e modo contínuo)", "Streaming nativo, evento a evento"],
      ["Latência", "Sub-segundo a segundos", "Milissegundos"],
      ["API", "DataFrame / SQL unificado com batch", "DataStream + Flink SQL"],
      ["Estado & tempo", "Watermark, janelas, stateful", "Estado robusto, exactly-once forte"],
      ["Quando brilha", "Time já usa Spark; unificar batch+stream", "Streaming puro, baixa latência"],
    ],
    colW: [2.7, 4.55, 4.58],
    note: "No Tutorial 4, a mesma janela de 30s é implementada nas duas engines — para você comparar.",
    foot: f(),
  });

  T.bullets(p, {
    kicker: "Tutorial prático 4", title: "Streaming de Dados",
    intro: "O quarto tutorial (1/4 da nota) processa um fluxo de eventos de venda de três formas.",
    points: [
      { t: "Filas", d: "Processamento unitário/micro-lote com RabbitMQ (local) e SQS + Lambda (AWS)." },
      { t: "Kafka + Spark", d: "Janela event-time de 30s por categoria com Structured Streaming." },
      { t: "Kafka + Flink", d: "A mesma janela de 30s em Flink SQL — contrato de saída idêntico." },
      { t: "Destino", d: "Sempre um data lake S3 em Parquet (MiniStack local ou AWS)." },
    ],
    aside: { title: "Stack", lines: ["Kafka 3.x (KRaft)", "Spark 3.5 Structured Streaming", "Flink 1.20 (SQL)", "RabbitMQ / SQS + Lambda", "S3 / MiniStack (Parquet)"] },
    foot: f(),
  });

  T.biblio(p, {
    kicker: "Para aprofundar", title: "Leituras da aula",
    left: { heading: "Livros", dark: true, items: [
      { a: "AKIDAU, T. et al.", t: "Streaming Systems.", y: "O’Reilly, 2018." },
      { a: "SHAPIRA, G. et al.", t: "Kafka: The Definitive Guide.", y: "2. ed. O’Reilly, 2021." },
      { a: "STOPFORD, B.", t: "Designing Event-Driven Systems.", y: "O’Reilly, 2018." },
      { a: "ROY, G.", t: "RabbitMQ in Depth.", y: "Manning, 2017." },
    ]},
    right: { heading: "Artigos", items: [
      { a: "KREPS, J. et al.", t: "Kafka: A Distributed Messaging System.", y: "NetDB, 2011." },
      { a: "CARBONE, P. et al.", t: "Apache Flink: Stream and Batch in One Engine.", y: "IEEE, 2015." },
      { a: "AKIDAU, T. et al.", t: "The Dataflow Model.", y: "VLDB, 2015." },
    ]},
    foot: f(),
  });

  T.closing(p, {
    title: "Fim da jornada",
    lines: ["Do HDFS ao streaming: você percorreu todo o ciclo de vida do dado em escala.", "Agora é mão na massa — capriche nos 4 tutoriais em grupo. Sucesso!"],
    contact: "Prof. Leandro Mendes Ferreira · leandro.mferreira@usp.br",
  });

  const out = path.join(__dirname, "out", "05-Streaming-de-Dados.pptx");
  await p.writeFile({ fileName: out });
  console.log("OK", out);
})().catch((e) => { console.error(e); process.exit(1); });
