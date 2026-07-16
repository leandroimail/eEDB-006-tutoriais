const path = require("path");
const T = require("./theme");
const { icon } = T;

(async () => {
  const p = T.newPres();
  const I = (n) => icon(n, "FFFFFF");
  const MOD = "Aula 3 · Spark & Lakehouse";
  let N = 0; const TOTAL = 11;
  const f = () => ({ n: ++N, total: TOTAL, module: MOD });

  T.cover(p, {
    eyebrow: "Aula 3",
    title: "Spark e\nLakehouse",
    subtitle: "Processamento em memória e tabelas transacionais no data lake",
    meta: ["eEDB-006 · Ecossistema de Big Data", "Parte teórica · processamento", "Prof. Leandro Mendes Ferreira"],
    badge: "PECE · Poli-USP",
  });

  T.quote(p, {
    kicker: "O salto",
    text: "E se, em vez de ir ao disco a cada passo, o cluster mantivesse os dados na memória entre as operações?",
    source: "Essa é a ideia que fez o Spark ser ordens de grandeza mais rápido que o MapReduce.",
  });

  await T.cards(p, {
    kicker: "Nesta aula", title: "O que vamos ver",
    items: [
      { icon: 1, _iconData: await I("FaFire"), title: "Por que Spark", desc: "Motor unificado e em memória, sucessor do MapReduce." },
      { icon: 1, _iconData: await I("FaSitemap"), title: "Arquitetura", desc: "Driver, executors e cluster manager (standalone/YARN)." },
      { icon: 1, _iconData: await I("FaCubes"), title: "RDD", desc: "A abstração base: transformações, ações e lazy evaluation." },
      { icon: 1, _iconData: await I("FaTableColumns"), title: "DataFrame & SQL", desc: "API estruturada e o otimizador Catalyst." },
      { icon: 1, _iconData: await I("FaWater"), title: "Do Lake ao Lakehouse", desc: "Por que o data lake puro não bastava." },
      { icon: 1, _iconData: await I("FaLayerGroup"), title: "Iceberg & Delta", desc: "ACID, time travel e schema evolution no lake." },
    ],
    cols: 3, foot: f(),
  });

  T.bullets(p, {
    kicker: "Motivação", title: "Por que Spark venceu o MapReduce",
    intro: "O MapReduce funcionava, mas gravava tudo em disco a cada etapa — caro para pipelines iterativos.",
    points: [
      { t: "Em memória", d: "Mantém dados intermediários na RAM entre operações; ideal para ML e iterações." },
      { t: "Motor unificado", d: "Batch, SQL, streaming, ML (MLlib) e grafos numa só API." },
      { t: "APIs de alto nível", d: "Python, Scala, Java, R e SQL — muito além do map/reduce cru." },
      { t: "Lazy + DAG", d: "Constrói um grafo de execução e o otimiza antes de rodar." },
    ],
    aside: { title: "Onde roda", lines: ["Standalone", "Sobre YARN", "Kubernetes", "Local (dev)", "EMR / Databricks (nuvem)"] },
    foot: f(),
  });

  T.twoCol(p, {
    kicker: "Arquitetura", title: "Driver, executors e cluster",
    left: [
      { t: "Driver", d: "Roda seu programa, cria o plano (DAG) e coordena o trabalho." },
      { t: "Cluster Manager", d: "Aloca recursos: standalone, YARN ou Kubernetes." },
      { t: "Executors", d: "Processos nos workers que executam tarefas e guardam dados em cache." },
      { t: "Partições & tarefas", d: "O dado é dividido em partições; cada uma vira uma task paralela." },
    ],
    codeTitle: "PySpark — SparkSession",
    code:
`from pyspark.sql import SparkSession

spark = (SparkSession.builder
         .appName("curso")
         # usa todos os cores locais:
         .master("local[*]")
         .getOrCreate())

df = spark.read.parquet("s3a://lake/vendas/")
df.printSchema()
df.count()`,
    rightNote: "local[*] no dev; em produção, o master aponta para YARN/K8s.",
    foot: f(),
  });

  T.bullets(p, {
    kicker: "Abstração base", title: "RDD: o coração do Spark",
    intro: "Resilient Distributed Dataset — uma coleção imutável, particionada e tolerante a falhas.",
    points: [
      { t: "Transformações (lazy)", d: "map, filter, flatMap, union… retornam um novo RDD e não executam nada ainda." },
      { t: "Ações (disparam)", d: "count, collect, take, save… é aqui que o Spark realmente calcula." },
      { t: "Lineage", d: "O Spark lembra como cada RDD foi derivado; se um nó cai, recomputa a partição." },
      { t: "Imutável e particionado", d: "Nunca se altera um RDD; cria-se outro — o que permite paralelismo seguro." },
    ],
    aside: { title: "Regra de ouro", lines: ["Nada roda até uma ação", "Transformações só desenham o DAG", "collect() traz tudo ao driver (cuidado!)", "cache() reusa em memória"] },
    foot: f(),
  });

  T.twoCol(p, {
    kicker: "API estruturada", title: "DataFrame & Spark SQL",
    left: [
      { t: "DataFrame", d: "Dados em linhas e colunas com schema — como uma tabela distribuída." },
      { t: "Mesmo motor que SQL", d: "df.filter(...) e SELECT ... geram o mesmo plano otimizado." },
      { t: "Catalyst", d: "O otimizador reescreve a consulta: pushdown, poda de colunas, reordenação." },
      { t: "Tungsten", d: "Geração de código e memória off-heap para execução veloz." },
    ],
    codeTitle: "DataFrame API + SQL",
    code:
`# API funcional
(df.filter(df.categoria == "Eletronicos")
   .groupBy("categoria")
   .sum("valor")
   .show())

# ou o mesmo em SQL
df.createOrReplaceTempView("vendas")
spark.sql("""
  SELECT categoria, SUM(valor) AS total
  FROM vendas GROUP BY categoria
""").show()`,
    rightNote: "Você exercita create, load, schema, joins e agregações no Tutorial 2.",
    foot: f(),
  });

  T.bullets(p, {
    kicker: "O problema", title: "Data Lake não bastava",
    intro: "Guardar arquivos baratos no object storage é ótimo — até você precisar de confiabilidade transacional.",
    points: [
      { t: "Sem ACID", d: "Escritas concorrentes e falhas no meio deixam o lake inconsistente." },
      { t: "Sem UPDATE/DELETE fácil", d: "Corrigir um registro ou atender LGPD vira reprocessar tudo." },
      { t: "Schema frágil", d: "Mudar colunas quebra leituras; não há evolução controlada." },
      { t: "“Data swamp”", d: "Sem governança, o lake vira um pântano de arquivos que ninguém confia." },
    ],
    aside: { title: "Warehouse × Lake", lines: ["Warehouse: confiável, caro, fechado", "Lake: barato, flexível, sem garantias", "Lakehouse: o melhor dos dois"] },
    foot: f(),
  });

  await T.timeline(p, {
    kicker: "A convergência", title: "Data Warehouse → Lake → Lakehouse",
    steps: [
      { title: "Data Warehouse", desc: "Confiável e rápido para BI, mas caro, proprietário e só dado estruturado." },
      { title: "Data Lake", desc: "Barato e flexível (qualquer formato), porém sem ACID nem governança." },
      { title: "Lakehouse", desc: "Camada transacional sobre arquivos abertos: confiança do warehouse, custo do lake." },
    ],
    foot: f(),
  });

  await T.cards(p, {
    kicker: "Table formats", title: "O que o Lakehouse adiciona",
    intro: "Iceberg, Delta e Hudi transformam pastas de Parquet em tabelas de verdade.",
    items: [
      { icon: 1, _iconData: await I("FaShieldHalved"), title: "Transações ACID", desc: "Escritas atômicas e isoladas, mesmo com múltiplos escritores." },
      { icon: 1, _iconData: await I("FaClockRotateLeft"), title: "Time travel", desc: "Consultar a tabela como ela era em um snapshot/versão anterior." },
      { icon: 1, _iconData: await I("FaCodeBranch"), title: "Schema evolution", desc: "Adicionar/renomear colunas com segurança, sem reescrever tudo." },
      { icon: 1, _iconData: await I("FaPenToSquare"), title: "UPDATE / DELETE / MERGE", desc: "Correções e upserts em nível de registro no lake." },
      { icon: 1, _iconData: await I("FaLayerGroup"), title: "Hidden partitioning", desc: "Iceberg gerencia partições sem poluir a query (partition evolution)." },
      { icon: 1, _iconData: await I("FaBroom"), title: "Compaction & vacuum", desc: "Junta arquivos pequenos e limpa versões antigas para performance." },
    ],
    cols: 3, foot: f(),
  });

  T.twoCol(p, {
    kicker: "Na prática", title: "Apache Iceberg com Spark",
    left: [
      { t: "Formato aberto", d: "Metadados versionados sobre arquivos Parquet — sem lock-in." },
      { t: "Catálogo", d: "Hadoop, Hive/Glue ou REST controlam snapshots e tabelas." },
      { t: "Neutro de engine", d: "Spark, Flink, Trino e Dremio leem a mesma tabela." },
      { t: "É o formato do Tutorial 2", d: "Você cria, insere e consulta tabelas Iceberg via PySpark." },
    ],
    codeTitle: "Spark SQL + Iceberg",
    code:
`CREATE TABLE local.db.vendas (
  id INT, categoria STRING, valor DOUBLE
) USING iceberg;

INSERT INTO local.db.vendas
VALUES (1,'Eletronicos',199.9);

-- viagem no tempo
SELECT * FROM local.db.vendas
FOR VERSION AS OF 1;`,
    rightNote: "Smoke test do Tutorial 2: iceberg-spark-runtime 1.10.2.",
    foot: f(),
  });

  T.bullets(p, {
    kicker: "Tutorial prático 2", title: "Spark & Lakehouse",
    intro: "O segundo tutorial (1/4 da nota) leva Spark e Iceberg do ambiente ao código.",
    points: [
      { t: "Ambiente Spark", d: "Instalar e validar PySpark local, via Docker e em Jupyter Notebook." },
      { t: "RDD", d: "Transformações e ações; entender lazy evaluation na prática." },
      { t: "DataFrame", d: "Create, load, schema, select, filtros, joins e agregações (SQL e API)." },
      { t: "Lakehouse com Iceberg", d: "Criar tabela, inserir, consultar e testar time travel." },
    ],
    aside: { title: "Stack", lines: ["PySpark 3.5.x", "RDD & DataFrame", "Spark SQL", "Apache Iceberg 1.10.2", "Docker / Jupyter"] },
    foot: f(),
  });

  T.biblio(p, {
    kicker: "Para aprofundar", title: "Leituras da aula",
    left: { heading: "Livros", dark: true, items: [
      { a: "CHAMBERS, B.; ZAHARIA, M.", t: "Spark: The Definitive Guide.", y: "O’Reilly, 2018." },
      { a: "SHIRAN, T. et al.", t: "Apache Iceberg: The Definitive Guide.", y: "O’Reilly, 2024." },
      { a: "LEE, D. et al.", t: "Delta Lake: The Definitive Guide.", y: "O’Reilly, 2024." },
    ]},
    right: { heading: "Artigos", items: [
      { a: "ZAHARIA, M. et al.", t: "Resilient Distributed Datasets (RDD).", y: "NSDI, 2012." },
      { a: "ARMBRUST, M. et al.", t: "Lakehouse: A New Generation of Open Platforms.", y: "CIDR, 2021." },
      { a: "ARMBRUST, M. et al.", t: "Spark SQL: Relational Data Processing.", y: "SIGMOD, 2015." },
    ]},
    foot: f(),
  });

  T.closing(p, {
    title: "Próxima: Ingestão",
    lines: ["Já sabemos processar e guardar com confiança (Spark + Lakehouse).", "Mas como o dado chega ao lake? A próxima aula é sobre ingestão."],
    contact: "Dúvidas? leandro.mferreira@usp.br",
  });

  const out = path.join(__dirname, "out", "03-Spark-e-Lakehouse.pptx");
  await p.writeFile({ fileName: out });
  console.log("OK", out);
})().catch((e) => { console.error(e); process.exit(1); });
