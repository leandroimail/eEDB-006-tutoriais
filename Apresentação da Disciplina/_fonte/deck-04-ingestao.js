const path = require("path");
const T = require("./theme");
const { icon } = T;

(async () => {
  const p = T.newPres();
  const I = (n) => icon(n, "FFFFFF");
  const MOD = "Aula 4 · Ingestão";
  let N = 0; const TOTAL = 9;
  const f = () => ({ n: ++N, total: TOTAL, module: MOD });

  T.cover(p, {
    eyebrow: "Aula 4",
    title: "Ingestão de\nDados em Big Data",
    subtitle: "Trazendo dados de bancos e APIs para o data lake",
    meta: ["eEDB-006 · Ecossistema de Big Data", "Parte teórica · movimentação de dados", "Prof. Leandro Mendes Ferreira"],
    badge: "PECE · Poli-USP",
  });

  T.quote(p, {
    kicker: "O elo esquecido",
    text: "Não existe análise sem dado no lugar certo. Ingestão é o encanamento que sustenta tudo o mais.",
    source: "É onde a maior parte do esforço de engenharia de dados realmente acontece.",
  });

  await T.cards(p, {
    kicker: "Nesta aula", title: "O que vamos ver",
    items: [
      { icon: 1, _iconData: await I("FaRightToBracket"), title: "O que é ingestão", desc: "Da origem ao lake: fronteira de entrada do pipeline." },
      { icon: 1, _iconData: await I("FaArrowsRotate"), title: "Batch × Streaming", desc: "Lotes agendados versus fluxo contínuo de eventos." },
      { icon: 1, _iconData: await I("FaCodeCompare"), title: "ETL × ELT", desc: "Onde transformar: antes ou depois de carregar." },
      { icon: 1, _iconData: await I("FaDiagramProject"), title: "CDC", desc: "Change Data Capture: capturar mudanças do banco em tempo quase real." },
      { icon: 1, _iconData: await I("FaGears"), title: "Ferramentas", desc: "Meltano, dlt, Airbyte, Fivetran, Kafka Connect, Debezium." },
      { icon: 1, _iconData: await I("FaLayerGroup"), title: "Camadas do lake", desc: "Raw/bronze → silver → gold (arquitetura medalhão)." },
    ],
    cols: 3, foot: f(),
  });

  T.bullets(p, {
    kicker: "Fundamento", title: "O que é ingestão de dados",
    intro: "Ingestão é mover dados de sistemas de origem para onde eles serão armazenados e processados.",
    points: [
      { t: "Origens variadas", d: "Bancos relacionais, APIs REST, arquivos, filas, SaaS, logs, IoT." },
      { t: "Destino: o data lake", d: "Object storage (S3) em formato aberto e colunar (Parquet)." },
      { t: "Confiabilidade importa", d: "Idempotência, reprocessamento, controle de estado e de esquema." },
      { t: "Metadados & linhagem", d: "Saber de onde veio, quando e como — base para governança." },
    ],
    aside: { title: "Duas dimensões", lines: ["Cadência: batch × streaming", "Estratégia: full × incremental", "Local da transformação: ETL × ELT", "Origem: pull × push"] },
    foot: f(),
  });

  await T.cards(p, {
    kicker: "Estratégias", title: "Padrões de carga",
    items: [
      { icon: 1, _iconData: await I("FaDownload"), title: "Full load", desc: "Recarrega a tabela inteira a cada execução. Simples, mas caro em volume." },
      { icon: 1, _iconData: await I("FaTableList"), title: "Incremental", desc: "Só o que mudou desde a última carga (por data/ID). Eficiente e comum." },
      { icon: 1, _iconData: await I("FaDiagramProject"), title: "CDC", desc: "Lê o log de transações do banco e replica cada INSERT/UPDATE/DELETE." },
      { icon: 1, _iconData: await I("FaTowerBroadcast"), title: "Streaming ingest", desc: "Eventos chegam continuamente e são gravados quase em tempo real." },
    ],
    cols: 4, foot: f(),
  });

  T.table(p, {
    kicker: "Decisão de arquitetura", title: "ETL × ELT",
    head: ["Aspecto", "ETL (transforma antes)", "ELT (transforma depois)"],
    rows: [
      ["Onde transforma", "Em um motor externo, antes de carregar", "No próprio destino (lake/warehouse)"],
      ["Formato no destino", "Já modelado e limpo", "Dado cru + camadas derivadas"],
      ["Flexibilidade", "Rígido; retrabalho ao mudar regra", "Alto; reprocessa do cru quando quiser"],
      ["Escala", "Limitada ao motor de ETL", "Usa o poder do lake/warehouse"],
      ["Tendência atual", "Legado / casos específicos", "Padrão no Big Data e na nuvem"],
    ],
    colW: [2.9, 4.45, 4.48],
    note: "No Big Data moderno, ELT domina: carregue barato e transforme com Spark/SQL sobre o lake.",
    foot: f(),
  });

  await T.cards(p, {
    kicker: "O mercado", title: "Ferramentas de ingestão",
    intro: "De frameworks declarativos a plataformas gerenciadas e captura de mudanças.",
    items: [
      { icon: 1, _iconData: await I("FaGears"), title: "Meltano", desc: "Orquestra conectores Singer (taps/targets); ELT declarativo em YAML." },
      { icon: 1, _iconData: await I("FaPython"), title: "dlt (data load tool)", desc: "Biblioteca Python: pipelines de ingestão como código, com schema automático." },
      { icon: 1, _iconData: await I("FaPlug"), title: "Airbyte", desc: "Centenas de conectores open source, com UI e agendamento." },
      { icon: 1, _iconData: await I("FaCloudArrowDown"), title: "Fivetran", desc: "SaaS gerenciado de ELT: conectores prontos, zero manutenção." },
      { icon: 1, _iconData: await I("FaLink"), title: "Kafka Connect", desc: "Conectores source/sink para integrar sistemas via Kafka." },
      { icon: 1, _iconData: await I("FaDiagramProject"), title: "Debezium", desc: "CDC sobre o log do banco (Postgres, MySQL) publicando em Kafka." },
    ],
    cols: 3, foot: f(),
  });

  T.twoCol(p, {
    kicker: "Ferramenta 1", title: "Meltano (Singer)",
    left: [
      { t: "Taps & Targets", d: "Tap lê da origem; target escreve no destino — padrão Singer." },
      { t: "Declarativo", d: "Tudo em meltano.yml: fontes, destinos e agendamento." },
      { t: "Plugável", d: "Catálogo grande de conectores da comunidade." },
      { t: "ELT-first", d: "Extrai e carrega; transformação fica no destino (dbt/Spark)." },
    ],
    codeTitle: "meltano — CLI",
    code:
`meltano add extractor tap-postgres
meltano add loader   target-parquet

meltano config tap-postgres set host ...
# extrai 'vendas' do Postgres -> Parquet
meltano run tap-postgres target-parquet`,
    rightNote: "Tutorial 3: Postgres → S3 (Parquet) com Meltano.",
    foot: f(),
  });

  T.twoCol(p, {
    kicker: "Ferramenta 2", title: "dlt — ingestão como código",
    left: [
      { t: "Pythonic", d: "Escreve o pipeline em Python; roda em qualquer lugar." },
      { t: "Schema automático", d: "Infere e evolui o schema do destino sozinho." },
      { t: "Fontes REST", d: "Ótimo para APIs paginadas, como a PokéAPI do tutorial." },
      { t: "Destinos variados", d: "Filesystem/S3, DuckDB, warehouses — Parquet incluso." },
    ],
    codeTitle: "dlt — pipeline Python",
    code:
`import dlt, requests

@dlt.resource(name="pokemon")
def pokemon():
    url = "https://pokeapi.co/api/v2/pokemon"
    while url:
        r = requests.get(url).json()
        yield r["results"]
        url = r["next"]

pipe = dlt.pipeline(destination="filesystem",
                    dataset_name="raw")
pipe.run(pokemon())   # -> Parquet no lake`,
    rightNote: "Tutorial 3: API REST → S3 (Parquet) com dlt.",
    foot: f(),
  });

  T.bullets(p, {
    kicker: "Tutorial prático 3", title: "Ingestão de Dados",
    intro: "O terceiro tutorial (1/4 da nota) constrói pipelines reais de ingestão, local e na AWS.",
    points: [
      { t: "Fontes", d: "Um banco PostgreSQL (tabela de vendas) e uma API REST pública (PokéAPI)." },
      { t: "Meltano", d: "Extrair do Postgres e carregar no data lake em Parquet." },
      { t: "dlt + Python", d: "Ingerir a API REST paginada e gravar no mesmo lake." },
      { t: "Local e AWS", d: "Docker + MiniStack (S3 local) e depois RDS + EC2 + S3 via Terraform." },
    ],
    aside: { title: "Stack", lines: ["PostgreSQL 16", "Meltano 4.x", "dlt 1.x", "S3 / MiniStack", "Terraform (AWS)"] },
    foot: f(),
  });

  T.biblio(p, {
    kicker: "Para aprofundar", title: "Leituras da aula",
    left: { heading: "Livros", dark: true, items: [
      { a: "REIS, J.; HOUSLEY, M.", t: "Fundamentals of Data Engineering.", y: "O’Reilly, 2022." },
      { a: "KLEPPMANN, M.", t: "Designing Data-Intensive Applications.", y: "O’Reilly, 2017." },
      { a: "GORELIK, A.", t: "The Enterprise Big Data Lake.", y: "O’Reilly, 2019." },
    ]},
    right: { heading: "Documentação & padrões", items: [
      { a: "MELTANO / SINGER.", t: "Especificação e conectores.", y: "" },
      { a: "DLTHUB.", t: "dlt — documentação oficial.", y: "" },
      { a: "DEBEZIUM.", t: "Change Data Capture — guia.", y: "" },
    ]},
    foot: f(),
  });

  T.closing(p, {
    title: "Próxima: Streaming",
    lines: ["Vimos ingestão em lote e o conceito de CDC.", "A última aula leva o dado ao extremo da velocidade: streaming em tempo real."],
    contact: "Dúvidas? leandro.mferreira@usp.br",
  });

  const out = path.join(__dirname, "out", "04-Ingestao-de-Dados.pptx");
  await p.writeFile({ fileName: out });
  console.log("OK", out);
})().catch((e) => { console.error(e); process.exit(1); });
