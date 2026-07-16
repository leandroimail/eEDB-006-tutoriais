const path = require("path");
const T = require("./theme");
const { icon } = T;

(async () => {
  const p = T.newPres();
  const I = (n) => icon(n, "FFFFFF");
  const MOD = "Aula 1 · Introdução";
  let N = 0; const TOTAL = 10;
  const f = () => ({ n: ++N, total: TOTAL, module: MOD });

  T.cover(p, {
    eyebrow: "Aula 1",
    title: "Introdução a\nBig Data",
    subtitle: "Os 5 V’s, as origens no Google e o ecossistema Hadoop",
    meta: ["eEDB-006 · Ecossistema de Big Data", "Parte teórica · fundamentos", "Prof. Leandro Mendes Ferreira"],
    badge: "PECE · Poli-USP",
  });

  T.quote(p, {
    kicker: "O ponto de partida",
    text: "Big Data não é sobre “muitos dados” — é sobre dados que quebram a arquitetura de uma máquina só.",
    source: "Quando volume, velocidade e variedade excedem o servidor único, muda a engenharia.",
  });

  await T.cards(p, {
    kicker: "Nesta aula", title: "O que vamos ver",
    items: [
      { icon: 1, _iconData: await I("FaChartSimple"), title: "O que é Big Data", desc: "Definição pelos 5 V’s e o que muda em relação ao dado tradicional." },
      { icon: 1, _iconData: await I("FaGoogle"), title: "As origens", desc: "Os três papers do Google que fundaram a área: GFS, MapReduce e Bigtable." },
      { icon: 1, _iconData: await I("FaHardDrive"), title: "HDFS", desc: "Armazenamento distribuído: blocos, réplicas, NameNode e DataNodes." },
      { icon: 1, _iconData: await I("FaDiagramProject"), title: "MapReduce", desc: "O modelo map → shuffle → reduce para processar em paralelo." },
      { icon: 1, _iconData: await I("FaServer"), title: "YARN", desc: "O gerenciador de recursos que orquestra o cluster." },
      { icon: 1, _iconData: await I("FaCubesStacked"), title: "Ecossistema", desc: "Hive, HBase, Spark e as peças que crescem sobre o Hadoop." },
    ],
    cols: 3, foot: f(),
  });

  await T.cards(p, {
    kicker: "Definição", title: "Os 5 V’s do Big Data",
    intro: "A forma clássica de caracterizar o problema — e o que cada dimensão exige da engenharia.",
    items: [
      { icon: 1, _iconData: await I("FaDatabase"), title: "Volume", desc: "Escala de tera a petabytes — não cabe (nem processa) em uma máquina só." },
      { icon: 1, _iconData: await I("FaGaugeHigh"), title: "Velocidade", desc: "Dados chegam rápido e contínuos; muitas vezes precisam de resposta em tempo real." },
      { icon: 1, _iconData: await I("FaShapes"), title: "Variedade", desc: "Estruturado, semiestruturado e não estruturado convivendo (JSON, logs, imagens)." },
      { icon: 1, _iconData: await I("FaCircleCheck"), title: "Veracidade", desc: "Qualidade e confiança: dado incerto, incompleto ou duplicado é regra, não exceção." },
      { icon: 1, _iconData: await I("FaGem"), title: "Valor", desc: "O fim de tudo: transformar volume bruto em decisão e produto." },
    ],
    cols: 5, foot: f(),
  });

  T.bullets(p, {
    kicker: "O problema central", title: "Escalar para cima × escalar para os lados",
    intro: "Quando um servidor não dá conta, há dois caminhos — e o Big Data escolheu o segundo.",
    points: [
      { t: "Scale-up (vertical)", d: "Máquina maior: mais CPU/RAM. Simples, mas caro e com teto físico." },
      { t: "Scale-out (horizontal)", d: "Muitas máquinas comuns (commodity) em cluster — a aposta do Hadoop." },
      { t: "Mover a computação, não o dado", d: "Processar onde o dado está (data locality) em vez de trafegá-lo pela rede." },
      { t: "Falha é normal", d: "Com centenas de nós, algo sempre falha; o software tolera via replicação." },
    ],
    aside: { title: "A mudança de mentalidade", lines: ["Hardware commodity > supercomputador", "Paralelismo por padrão", "Tolerância a falhas no software", "Dados particionados no cluster"] },
    foot: f(),
  });

  await T.timeline(p, {
    kicker: "Como chegamos aqui", title: "Uma breve linha do tempo",
    steps: [
      { title: "2003–04 · Google", desc: "Papers do GFS e do MapReduce descrevem como o Google processa a web." },
      { title: "2006 · Hadoop", desc: "Doug Cutting cria o Hadoop (Yahoo!): GFS + MapReduce open source." },
      { title: "2009 · Hive", desc: "Facebook traz SQL para o Hadoop; nasce o SQL-on-Hadoop." },
      { title: "2010 · Spark", desc: "Processamento em memória, muito mais rápido que MapReduce." },
      { title: "2020+ · Lakehouse", desc: "Formatos transacionais e streaming unificam lake e warehouse." },
    ],
    foot: f(),
  });

  await T.cards(p, {
    kicker: "As origens", title: "Os três papers que fundaram tudo",
    items: [
      { icon: 1, _iconData: await I("FaFolderTree"), title: "GFS (2003)", desc: "Google File System: como guardar arquivos gigantes em milhares de discos comuns, com réplicas. Inspira o HDFS." },
      { icon: 1, _iconData: await I("FaDiagramProject"), title: "MapReduce (2004)", desc: "Um modelo simples para paralelizar computação sobre dados distribuídos, escondendo a complexidade do cluster." },
      { icon: 1, _iconData: await I("FaTableCells"), title: "Bigtable (2006)", desc: "Armazenamento estruturado e esparso em escala; inspira o HBase e o mundo NoSQL de colunas." },
    ],
    cols: 3, foot: f(),
  });

  T.twoCol(p, {
    kicker: "Armazenamento", title: "Como funciona o HDFS",
    left: [
      { t: "Blocos grandes", d: "O arquivo é quebrado em blocos (ex.: 128 MB) espalhados pelos DataNodes." },
      { t: "Replicação", d: "Cada bloco é copiado (fator 3, por padrão) — se um nó cai, o dado sobrevive." },
      { t: "NameNode", d: "Guarda os metadados: onde está cada bloco. É o cérebro do sistema." },
      { t: "DataNodes", d: "Guardam os blocos de fato e reportam saúde ao NameNode." },
    ],
    codeTitle: "hdfs dfs — comandos",
    code:
`# enviar arquivo para o HDFS
hdfs dfs -mkdir -p /user/hduser/input
hdfs dfs -put lorem.txt /user/hduser/input/

# listar e inspecionar
hdfs dfs -ls  /user/hduser/input/
hdfs dfs -du -h /

# ver a saída de um job
hdfs dfs -cat /user/.../part-r-00000 | head`,
    rightNote: "Você usará exatamente estes comandos no Tutorial 1.",
    foot: f(),
  });

  T.twoCol(p, {
    kicker: "Processamento", title: "O modelo MapReduce",
    left: [
      { t: "Map", d: "Cada nó processa sua fatia e emite pares (chave, valor)." },
      { t: "Shuffle & Sort", d: "O framework agrupa todos os valores de uma mesma chave." },
      { t: "Reduce", d: "Cada chave é agregada (soma, contagem…) gerando o resultado." },
      { t: "Clássico: WordCount", d: "Contar palavras num texto — o “Hello World” do Big Data." },
    ],
    codeTitle: "WordCount (pseudocódigo)",
    code:
`map(linha):
  para cada palavra em linha.split():
    emite(palavra, 1)

reduce(palavra, valores):
  emite(palavra, soma(valores))

# entrada:  "dado dado big"
# saída:    dado 2 | big 1`,
    rightNote: "No Tutorial 1 você compila e roda este job em Java no Hadoop.",
    foot: f(),
  });

  await T.cards(p, {
    kicker: "As peças", title: "O ecossistema Hadoop",
    intro: "Hadoop é mais que HDFS + MapReduce: é uma plataforma sobre a qual muitas ferramentas cresceram.",
    items: [
      { icon: 1, _iconData: await I("FaHardDrive"), title: "HDFS", desc: "Armazenamento distribuído de arquivos." },
      { icon: 1, _iconData: await I("FaServer"), title: "YARN", desc: "Gerência de recursos e agendamento de jobs no cluster." },
      { icon: 1, _iconData: await I("FaTableColumns"), title: "Hive", desc: "SQL sobre arquivos do HDFS (próxima aula)." },
      { icon: 1, _iconData: await I("FaTableCells"), title: "HBase", desc: "Banco NoSQL de colunas, inspirado no Bigtable." },
      { icon: 1, _iconData: await I("FaFire"), title: "Spark", desc: "Processamento em memória, sucessor do MapReduce." },
      { icon: 1, _iconData: await I("FaDiagramProject"), title: "Oozie / Airflow", desc: "Orquestração de fluxos de trabalho." },
    ],
    cols: 3, foot: f(),
  });

  T.bullets(p, {
    kicker: "Tutorial prático 1", title: "Hadoop, Hive & Ambiente de Big Data",
    intro: "O primeiro tutorial (1/4 da nota) coloca a teoria desta aula para rodar — local e na AWS.",
    points: [
      { t: "Ambiente local (Docker)", d: "Subir um Hadoop single-node; compilar e rodar o WordCount em Java sobre o HDFS." },
      { t: "HDFS na prática", d: "Enviar dados, navegar diretórios e ler a saída do job MapReduce." },
      { t: "Na nuvem (AWS Academy)", d: "Provisionar um cluster EMR e rodar Hive; consultar dados no S3 com Athena + Glue." },
      { t: "Entrega em grupo", d: "Evidências da execução (prints/saídas) conforme o roteiro do tutorial." },
    ],
    aside: { title: "Stack", lines: ["Docker", "Hadoop (HDFS + YARN)", "MapReduce (Java)", "AWS EMR + Hive", "Athena + Glue"] },
    foot: f(),
  });

  T.biblio(p, {
    kicker: "Para aprofundar", title: "Leituras da aula",
    left: { heading: "Livros", dark: true, items: [
      { a: "WHITE, T.", t: "Hadoop: The Definitive Guide.", y: "4. ed. O’Reilly, 2015." },
      { a: "GORELIK, A.", t: "The Enterprise Big Data Lake.", y: "O’Reilly, 2019." },
      { a: "KLEPPMANN, M.", t: "Designing Data-Intensive Applications.", y: "O’Reilly, 2017." },
    ]},
    right: { heading: "Artigos fundadores", items: [
      { a: "GHEMAWAT, S. et al.", t: "The Google File System.", y: "SOSP, 2003." },
      { a: "DEAN, J.; GHEMAWAT, S.", t: "MapReduce.", y: "OSDI, 2004." },
      { a: "CHANG, F. et al.", t: "Bigtable.", y: "OSDI, 2006." },
      { a: "SHVACHKO, K. et al.", t: "The Hadoop Distributed File System.", y: "MSST, 2010." },
    ]},
    foot: f(),
  });

  T.closing(p, {
    title: "Próxima: Big SQL",
    lines: ["Já sabemos armazenar (HDFS) e processar (MapReduce) em escala.", "Mas escrever MapReduce à mão é penoso — a próxima aula traz o SQL de volta."],
    contact: "Dúvidas? leandro.mferreira@usp.br",
  });

  const out = path.join(__dirname, "out", "01-Introducao-a-Big-Data.pptx");
  await p.writeFile({ fileName: out });
  console.log("OK", out);
})().catch((e) => { console.error(e); process.exit(1); });
