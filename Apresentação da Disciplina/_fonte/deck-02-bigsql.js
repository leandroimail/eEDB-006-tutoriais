const path = require("path");
const T = require("./theme");
const { icon } = T;

(async () => {
  const p = T.newPres();
  const I = (n) => icon(n, "FFFFFF");
  const MOD = "Aula 2 · Big SQL";
  let N = 0; const TOTAL = 9;
  const f = () => ({ n: ++N, total: TOTAL, module: MOD });

  T.cover(p, {
    eyebrow: "Aula 2",
    title: "Big SQL\nHive e outros SQLs",
    subtitle: "Trazendo o SQL de volta para o mundo distribuído",
    meta: ["eEDB-006 · Ecossistema de Big Data", "Parte teórica · consulta em escala", "Prof. Leandro Mendes Ferreira"],
    badge: "PECE · Poli-USP",
  });

  T.quote(p, {
    kicker: "A motivação",
    text: "Escrever MapReduce à mão para cada pergunta não escala para humanos. E se o cluster entendesse SQL?",
    source: "Foi essa a aposta do Hive, no Facebook, em 2009 — e ela mudou o jogo.",
  });

  await T.cards(p, {
    kicker: "Nesta aula", title: "O que vamos ver",
    items: [
      { icon: 1, _iconData: await I("FaTableColumns"), title: "Hive", desc: "SQL declarativo compilado para jobs distribuídos sobre o HDFS." },
      { icon: 1, _iconData: await I("FaBook"), title: "Metastore", desc: "O catálogo que dá schema aos arquivos: schema-on-read." },
      { icon: 1, _iconData: await I("FaSliders"), title: "Performance", desc: "Particionamento, bucketing e formatos colunares (ORC/Parquet)." },
      { icon: 1, _iconData: await I("FaLayerGroup"), title: "As engines", desc: "Presto/Trino, Impala, Spark SQL — o mesmo SQL, motores diferentes." },
      { icon: 1, _iconData: await I("FaCloud"), title: "SQL serverless", desc: "Amazon Athena + Glue Data Catalog consultando direto o S3." },
      { icon: 1, _iconData: await I("FaScaleBalanced"), title: "Quando usar cada um", desc: "Um mapa para escolher a ferramenta certa para cada caso." },
    ],
    cols: 3, foot: f(),
  });

  T.bullets(p, {
    kicker: "A ideia", title: "SQL-on-Hadoop: por que existe",
    intro: "Big SQL é a camada que deixa você perguntar em SQL e delega ao cluster o “como” executar.",
    points: [
      { t: "Declarativo, não imperativo", d: "Você diz o quê quer; o motor decide o plano de execução distribuído." },
      { t: "Democratiza o acesso", d: "Analistas usam o dado do lake sem escrever Java/Scala." },
      { t: "Reaproveita o SQL que já existe", d: "Décadas de conhecimento e ferramentas de BI passam a valer no Big Data." },
      { t: "Separa lógica de motor", d: "O mesmo SQL roda em Hive, Spark SQL, Trino ou Athena." },
    ],
    aside: { title: "O que muda vs. banco", lines: ["Schema-on-read", "Dados em arquivos no lake", "Escala horizontal", "Leitura massiva > OLTP", "Formatos abertos (Parquet/ORC)"] },
    foot: f(),
  });

  T.twoCol(p, {
    kicker: "Arquitetura", title: "Como o Hive executa uma query",
    left: [
      { t: "Driver", d: "Recebe a HiveQL e coordena o ciclo de vida da consulta." },
      { t: "Compiler", d: "Traduz o SQL num plano de jobs (MapReduce, Tez ou Spark)." },
      { t: "Metastore", d: "Diz onde estão os dados e qual o schema de cada tabela." },
      { t: "Execution engine", d: "Roda o plano no cluster e devolve o resultado." },
    ],
    codeTitle: "HiveQL",
    code:
`CREATE EXTERNAL TABLE vendas (
  produto STRING, categoria STRING,
  valor   DOUBLE, dt      DATE
)
STORED AS PARQUET
LOCATION 's3://datalake/vendas/';

SELECT categoria, SUM(valor) AS faturamento
FROM   vendas
WHERE  dt >= '2026-01-01'
GROUP  BY categoria
ORDER  BY faturamento DESC;`,
    rightNote: "EXTERNAL + LOCATION: a tabela é só metadado sobre arquivos no lake.",
    foot: f(),
  });

  T.bullets(p, {
    kicker: "Conceito-chave", title: "Schema-on-read & o Metastore",
    intro: "No banco tradicional o schema é imposto na escrita; no lake, ele é aplicado na leitura.",
    points: [
      { t: "Schema-on-write (banco)", d: "O dado só entra se couber no schema. Rígido, valida cedo." },
      { t: "Schema-on-read (lake)", d: "Guarda-se o arquivo cru; o schema é aplicado quando se lê. Flexível." },
      { t: "O Metastore é o contrato", d: "Tabela, colunas, tipos, partições e a localização dos arquivos." },
      { t: "Compartilhado entre engines", d: "Hive, Spark, Trino e Athena (via Glue) leem o mesmo catálogo." },
    ],
    aside: { title: "Cuidado", lines: ["Sem validação na escrita", "Dado sujo passa despercebido", "Governança vira essencial", "Documente os contratos"] },
    foot: f(),
  });

  await T.cards(p, {
    kicker: "Performance", title: "Como fazer a query voar",
    intro: "Em Big SQL, custo é I/O. Ler menos dado é a otimização mais poderosa.",
    items: [
      { icon: 1, _iconData: await I("FaFolderTree"), title: "Particionamento", desc: "Organizar por coluna (ex.: dt=…) para varrer só o necessário — partition pruning." },
      { icon: 1, _iconData: await I("FaBoxesStacked"), title: "Bucketing", desc: "Distribuir por hash de uma chave para acelerar joins e amostragem." },
      { icon: 1, _iconData: await I("FaTableCells"), title: "Formato colunar", desc: "Parquet/ORC leem só as colunas usadas e comprimem muito melhor que CSV." },
      { icon: 1, _iconData: await I("FaFilter"), title: "Predicate pushdown", desc: "Filtros e projeção descem até o arquivo, reduzindo dados lidos." },
      { icon: 1, _iconData: await I("FaCompress"), title: "Compressão", desc: "Snappy, ZSTD — menos bytes lidos do disco/S3, menos custo." },
      { icon: 1, _iconData: await I("FaChartColumn"), title: "Estatísticas", desc: "Metadados de min/max por bloco permitem pular dados inteiros." },
    ],
    cols: 3, foot: f(),
  });

  T.table(p, {
    kicker: "O panorama", title: "As engines de Big SQL",
    head: ["Engine", "Tipo", "Melhor para"],
    rows: [
      ["Hive", "Batch (MR/Tez/Spark)", "ETL pesado e transformações em lote no lake"],
      ["Spark SQL", "In-memory unificado", "Pipelines que misturam SQL, código e ML"],
      ["Presto / Trino", "MPP interativo", "Consultas ad-hoc rápidas, federando várias fontes"],
      ["Impala", "MPP (Cloudera)", "BI de baixa latência sobre HDFS"],
      ["Athena", "Serverless (Trino)", "SQL sob demanda no S3, sem cluster para gerir"],
      ["Redshift Spectrum / BigQuery", "Warehouse + lake", "SQL gerenciado em nuvem, escala elástica"],
    ],
    colW: [3.2, 3.3, 5.33],
    note: "Mesmo SQL, decisões diferentes: latência, custo, elasticidade e quem administra o cluster.",
    foot: f(),
  });

  T.twoCol(p, {
    kicker: "Na nuvem", title: "Serverless: Athena + Glue",
    left: [
      { t: "Glue Data Catalog", d: "O Metastore gerenciado da AWS — compatível com Hive." },
      { t: "Glue Crawler", d: "Varre o S3 e infere schema e partições automaticamente." },
      { t: "Athena", d: "Motor Trino serverless: você paga por dado varrido, sem cluster." },
      { t: "Padrão de mercado", d: "Consulta o data lake em minutos, sem infraestrutura para operar." },
    ],
    codeTitle: "Athena (SQL no S3)",
    code:
`-- catálogo criado pelo Glue Crawler
MSCK REPAIR TABLE vendas;   -- carrega partições

SELECT categoria,
       COUNT(*)      AS pedidos,
       SUM(valor)    AS receita
FROM   vendas
WHERE  dt = DATE '2026-07-16'
GROUP  BY categoria;

-- custo ∝ bytes varridos → particione + Parquet`,
    rightNote: "É exatamente o fluxo do Tutorial 1 na AWS.",
    foot: f(),
  });

  T.bullets(p, {
    kicker: "Tutorial prático 1 (parte SQL)", title: "Hive na EMR & Athena/Glue",
    intro: "A parte de Big SQL do Tutorial 1 (1/4 da nota) exercita consultas distribuídas na nuvem.",
    points: [
      { t: "Cluster EMR com Hive", d: "Criar tabelas HiveQL e rodar consultas de agregação sobre dados no S3." },
      { t: "Glue Data Catalog", d: "Catalogar os dados com um crawler e reaproveitar o schema." },
      { t: "Athena", d: "Consultar o mesmo dado de forma serverless e comparar a experiência." },
      { t: "Boas práticas", d: "Observar o efeito de particionamento e Parquet no volume varrido." },
    ],
    aside: { title: "Stack", lines: ["AWS EMR + Hive", "HiveQL", "AWS Glue (catálogo + crawler)", "Amazon Athena", "Amazon S3 (Parquet)"] },
    foot: f(),
  });

  T.biblio(p, {
    kicker: "Para aprofundar", title: "Leituras da aula",
    left: { heading: "Livros & material", dark: true, items: [
      { a: "WHITE, T.", t: "Hadoop: The Definitive Guide (cap. Hive).", y: "4. ed. O’Reilly, 2015." },
      { a: "GORELIK, A.", t: "The Enterprise Big Data Lake.", y: "O’Reilly, 2019." },
      { a: "SARKAR, A.", t: "Learning Spark SQL.", y: "Packt, 2017." },
    ]},
    right: { heading: "Artigo & documentação", items: [
      { a: "THUSOO, A. et al.", t: "Hive: A Warehousing Solution over MapReduce.", y: "VLDB, 2009." },
      { a: "APACHE.", t: "Hive / Trino — documentação oficial.", y: "" },
      { a: "AWS.", t: "Athena & Glue Developer Guides.", y: "" },
    ]},
    foot: f(),
  });

  T.closing(p, {
    title: "Próxima: Spark & Lakehouse",
    lines: ["O SQL resolveu a linguagem, mas o motor em disco ainda era lento.", "A próxima aula traz o processamento em memória e as tabelas transacionais."],
    contact: "Dúvidas? leandro.mferreira@usp.br",
  });

  const out = path.join(__dirname, "out", "02-Big-SQL-Hive-e-outros-SQLs.pptx");
  await p.writeFile({ fileName: out });
  console.log("OK", out);
})().catch((e) => { console.error(e); process.exit(1); });
