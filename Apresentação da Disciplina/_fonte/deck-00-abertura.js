const path = require("path");
const T = require("./theme");
const { C, F, PAGE, MX, icon, ASSETS } = T;
const { PADRAO, PAPERS, ESTENDIDA_LIVROS } = require("./biblio-data");

(async () => {
  const p = T.newPres();
  const I = (n) => icon(n, "FFFFFF");
  const ID = (n) => icon(n, "12107E");
  const TOTAL = 15;
  const foot = (n, module) => ({ n, total: TOTAL, module });

  // 1 — CAPA
  T.cover(p, {
    eyebrow: "eEDB-006",
    title: "Ecossistema de\nBig Data",
    subtitle: "Dos fundamentos do Hadoop ao streaming de dados em tempo real",
    meta: [
      "Especialização em Engenharia de Dados e Big Data  ·  EAD síncrono",
      "Carga horária: 27h  ·  Teoria + 4 tutoriais práticos",
      "Prof. Leandro Mendes Ferreira",
    ],
    badge: "PECE · Escola Politécnica · USP",
  });

  // 2 — HOOK
  T.quote(p, {
    kicker: "Por que este curso importa",
    text: "The world’s most valuable resource is no longer oil, but data.",
    source: "The Economist, 2017 — a economia movida a dados exige uma nova engenharia.",
  });

  // 3 — SOBRE A DISCIPLINA
  T.bullets(p, {
    kicker: "Apresentação",
    title: "Sobre a disciplina",
    intro: "Uma visão de engenharia sobre como armazenar, processar e movimentar dados em escala — dos conceitos às ferramentas usadas no mercado.",
    points: [
      { t: "Fundamentos distribuídos", d: "HDFS, MapReduce e o ecossistema Hadoop como base histórica e conceitual." },
      { t: "Do SQL ao Lakehouse", d: "Hive e Big SQL, Apache Spark e as tabelas transacionais (Iceberg / Delta)." },
      { t: "Movimentação de dados", d: "Ingestão em lote/CDC e processamento de streaming de eventos em tempo real." },
      { t: "Mão na massa", d: "Cada tema teórico é fixado por um tutorial prático — local (Docker) e na nuvem (AWS)." },
    ],
    aside: {
      title: "Em números",
      lines: ["27 horas", "5 aulas teóricas", "4 tutoriais práticos", "Trabalho em grupos", "Avaliação 0–10"],
    },
    foot: foot(3, "Abertura"),
  });

  // 4 — PROFESSOR (custom)
  {
    const s = p.addSlide();
    s.background = { color: C.white };
    // header
    s.addShape("rect", { x: MX, y: 0.62, w: 0.22, h: 0.3, fill: { color: C.yellow } });
    s.addText("QUEM CONDUZ", { x: MX + 0.34, y: 0.6, w: 8, h: 0.34, fontFace: F.body, fontSize: 12, bold: true, color: C.slate, charSpacing: 2, valign: "middle", margin: 0 });
    s.addText("O professor", { x: MX, y: 1.05, w: 10, h: 0.9, fontFace: F.head, fontSize: 30, bold: true, color: C.navy, margin: 0 });
    // painel esquerdo (navy)
    s.addShape("rect", { x: MX, y: 2.15, w: 4.35, h: 4.45, fill: { color: C.navy }, shadow: { type: "outer", color: "0A0942", blur: 10, offset: 3, angle: 90, opacity: 0.16 } });
    s.addShape("rect", { x: MX, y: 2.15, w: 4.35, h: 0.12, fill: { color: C.yellow } });
    s.addImage({ path: path.join(ASSETS, "circular-white.png"), x: MX + 1.42, y: 2.55, w: 1.5, h: 1.5 });
    s.addText("Leandro Mendes\nFerreira", { x: MX + 0.3, y: 4.2, w: 3.75, h: 1.0, fontFace: F.head, fontSize: 23, bold: true, color: C.white, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 0.95 });
    s.addShape("rect", { x: MX + 0.825, y: 5.35, w: 2.7, h: 0.42, fill: { color: C.yellow } });
    s.addText("PRINCIPAL AI ENGINEER", { x: MX + 0.3, y: 5.35, w: 3.75, h: 0.42, fontFace: F.body, fontSize: 10.5, bold: true, color: C.navy, align: "center", valign: "middle", charSpacing: 1, margin: 0 });
    s.addText("leandro.mferreira@usp.br", { x: MX + 0.3, y: 5.95, w: 3.75, h: 0.4, fontFace: F.body, fontSize: 12, color: C.ice, align: "center", margin: 0 });
    // credenciais (direita)
    const creds = [
      { ic: "FaGraduationCap", t: "Formação acadêmica", d: "Msc. em Engenharia de Computação e Doutorando em Engenharia de Computação." },
      { ic: "FaAward", t: "Pós-graduação (MBA)", d: "MBA em Business Intelligence e MBA em Produtos Financeiros." },
      { ic: "FaDatabase", t: "Graduação", d: "Processamento de Dados — a base técnica de toda a trajetória." },
      { ic: "FaBrain", t: "Atuação atual", d: "Principal AI Engineer — arquitetura de dados e IA aplicada em produção." },
    ];
    let cy = 2.15;
    for (const cr of creds) {
      const data = await I(cr.ic);
      s.addShape("ellipse", { x: 5.35, y: cy, w: 0.72, h: 0.72, fill: { color: C.navy } });
      s.addImage({ data, x: 5.35 + 0.19, y: cy + 0.19, w: 0.34, h: 0.34 });
      s.addText(cr.t, { x: 6.35, y: cy - 0.02, w: 6.2, h: 0.4, fontFace: F.head, fontSize: 16, bold: true, color: C.navy, valign: "top", margin: 0 });
      s.addText(cr.d, { x: 6.35, y: cy + 0.4, w: 6.2, h: 0.7, fontFace: F.body, fontSize: 13, color: C.slate, valign: "top", margin: 0, lineSpacingMultiple: 1.02 });
      cy += 1.12;
    }
    footerRaw(s, 4, "Abertura", TOTAL);
  }

  // 5 — OBJETIVOS
  await T.cards(p, {
    kicker: "O que você vai levar",
    title: "Objetivos de aprendizagem",
    items: [
      { icon: 1, _iconData: await I("FaSitemap"), title: "Pensar distribuído", desc: "Entender partição, paralelismo e tolerância a falhas que sustentam o Big Data." },
      { icon: 1, _iconData: await I("FaTableColumns"), title: "Consultar em escala", desc: "Usar SQL sobre data lakes (Hive, Athena, Spark SQL) com eficiência." },
      { icon: 1, _iconData: await I("FaLayerGroup"), title: "Arquitetar Lakehouse", desc: "Combinar Spark + formatos transacionais (Iceberg/Delta) sobre object storage." },
      { icon: 1, _iconData: await I("FaRightLeft"), title: "Ingerir dados", desc: "Mover dados de bancos e APIs para o lake, em lote e por eventos." },
      { icon: 1, _iconData: await I("FaBolt"), title: "Processar em tempo real", desc: "Modelar filas e streaming com Kafka, Spark Structured Streaming e Flink." },
      { icon: 1, _iconData: await I("FaCloud"), title: "Operar na nuvem", desc: "Provisionar e rodar tudo na AWS (EMR, S3, SQS, Lambda) com IaC." },
    ],
    cols: 3,
    foot: foot(5, "Abertura"),
  });

  // 6 — ESTRUTURA (duas metades) — custom via cards accent
  await T.cards(p, {
    kicker: "Como a disciplina funciona",
    title: "Duas frentes que se complementam",
    intro: "A parte teórica explica os conceitos; a parte prática fixa o aprendizado em tutoriais aplicados, entregues em grupo.",
    items: [
      { accent: true, icon: 1, _iconData: await I("FaChalkboardUser"), _iconDataDark: await ID("FaChalkboardUser"), title: "1 · Teoria", desc: "5 aulas expositivas: introdução, Big SQL, Spark & Lakehouse, ingestão e streaming. Conceitos, arquitetura e o porquê das decisões." },
      { accent: true, icon: 1, _iconData: await I("FaLaptopCode"), _iconDataDark: await ID("FaLaptopCode"), title: "2 · Prática", desc: "4 tutoriais guiados (local + AWS). Cada grupo executa, valida e entrega. É onde a teoria vira habilidade." },
    ],
    cols: 2,
    accentEvery: true,
    foot: foot(6, "Abertura"),
  });

  // 7 — AS 5 AULAS TEÓRICAS
  T.table(p, {
    kicker: "Parte teórica",
    title: "As 5 aulas",
    head: ["#", "Aula", "Temas centrais"],
    rows: [
      ["1", "Introdução a Big Data", "Os 5 V’s, história, GFS/MapReduce, HDFS, ecossistema Hadoop, YARN"],
      ["2", "Big SQL — Hive e outros", "SQL-on-Hadoop, Hive, metastore, particionamento, Athena/Presto, Glue"],
      ["3", "Spark e Lakehouse", "RDD, DataFrame, Spark SQL, Catalyst; Iceberg/Delta e o Lakehouse"],
      ["4", "Ingestão de Dados", "Batch, CDC, ELT; conectores (Meltano, dlt); do banco/API ao data lake"],
      ["5", "Streaming de Dados", "Eventos, filas x tópicos, Kafka, janelas, event-time; Spark/Flink"],
    ],
    colW: [0.7, 3.3, 7.83],
    note: "A introdução abre o curso; as demais aulas seguem a jornada natural do dado: armazenar → consultar → processar → mover → reagir.",
    foot: foot(7, "Abertura"),
  });

  // 8 — OS 4 TUTORIAIS
  await T.cards(p, {
    kicker: "Parte prática",
    title: "Os 4 tutoriais",
    intro: "Executados em grupo, local (Docker) e na nuvem (AWS Academy). Cada tutorial vale 1/4 da nota.",
    items: [
      { icon: 1, _iconData: await I("FaServer"), title: "Hadoop, Hive & Ambiente", desc: "Subir o ambiente, HDFS + MapReduce (WordCount em Java) no Docker; EMR + Hive + Athena/Glue na AWS." },
      { icon: 1, _iconData: await I("FaFire"), title: "Spark & Lakehouse", desc: "Ambiente Spark (local/Docker/Jupyter), RDD e DataFrame em PySpark, tabelas Iceberg." },
      { icon: 1, _iconData: await I("FaRightToBracket"), title: "Ingestão de Dados", desc: "Meltano e dlt levando PostgreSQL e uma API REST para o data lake em Parquet." },
      { icon: 1, _iconData: await I("FaTowerBroadcast"), title: "Streaming de Dados", desc: "Filas (RabbitMQ / SQS+Lambda) e janelas de 30s com Kafka + Spark e Kafka + Flink." },
    ],
    cols: 2,
    foot: foot(8, "Abertura"),
  });

  // 9 — A JORNADA DO DADO (timeline)
  await T.timeline(p, {
    kicker: "Fio condutor",
    title: "A jornada do dado",
    steps: [
      { title: "Armazenar", desc: "Sistemas de arquivos distribuídos e object storage: HDFS, S3." },
      { title: "Consultar", desc: "SQL sobre grandes volumes: Hive, Athena, Spark SQL." },
      { title: "Processar", desc: "Engines distribuídas e Lakehouse: Spark, Iceberg/Delta." },
      { title: "Mover", desc: "Ingestão de bancos e APIs para o lake: batch, CDC, ELT." },
      { title: "Reagir", desc: "Eventos em tempo real: Kafka, streaming, janelas." },
    ],
    foot: foot(9, "Abertura"),
  });

  // 10 — AVALIAÇÃO
  T.stats(p, {
    kicker: "Como você é avaliado",
    title: "Avaliação: a soma dos 4 tutoriais",
    items: [
      { value: "4", label: "tutoriais entregues em grupo" },
      { value: "¼", label: "peso de cada tutorial na nota" },
      { value: "0–10", label: "escala da nota final" },
      { value: "100%", label: "prática — teoria dá o alicerce" },
    ],
    note: "Nota final = média dos 4 tutoriais (pesos iguais de 1/4). A entrega em grupo simula o trabalho real de um time de engenharia de dados.",
  });

  // 11 — CRONOGRAMA
  T.table(p, {
    kicker: "Planejamento",
    title: "Cronograma sugerido (27h)",
    head: ["Bloco", "Aula teórica", "Tutorial associado", "Entrega"],
    rows: [
      ["1", "Introdução a Big Data", "Hadoop, Hive & Ambiente de Big Data", "Grupo"],
      ["2", "Big SQL — Hive e outros SQLs", "(consolidado no tutorial 1 — Hive/Athena)", "—"],
      ["3", "Spark e Lakehouse", "Spark & Lakehouse", "Grupo"],
      ["4", "Ingestão de Dados", "Ingestão de Dados", "Grupo"],
      ["5", "Streaming de Dados", "Streaming de Dados", "Grupo"],
    ],
    colW: [0.9, 3.7, 5.63, 1.9],
    note: "Distribuição indicativa das 27h entre exposição teórica e execução dos tutoriais; ajustável ao ritmo da turma.",
    foot: foot(11, "Abertura"),
  });

  // 12 — FERRAMENTAS & AMBIENTE
  await T.cards(p, {
    kicker: "Stack do curso",
    title: "Ferramentas & ambiente",
    items: [
      { icon: 1, _iconData: await I("FaDocker"), title: "Docker", desc: "Ambientes locais reproduzíveis: Hadoop, Spark, Kafka, RabbitMQ, Flink." },
      { icon: 1, _iconData: await I("FaAws"), title: "AWS Academy", desc: "EMR, S3, RDS, SQS, Lambda no Learner Lab — provisionados via Terraform." },
      { icon: 1, _iconData: await I("FaPython"), title: "Python / PySpark", desc: "Linguagem-base dos tutoriais de Spark, ingestão e producers de streaming." },
      { icon: 1, _iconData: await I("FaCode"), title: "SQL", desc: "Hive, Athena, Spark SQL e Flink SQL — a lingua franca do dado." },
      { icon: 1, _iconData: await I("FaCubes"), title: "Iceberg / Parquet", desc: "Formatos abertos e transacionais que sustentam o Lakehouse." },
      { icon: 1, _iconData: await I("FaGears"), title: "Meltano / dlt", desc: "Frameworks de ingestão declarativa de dados para o lake." },
    ],
    cols: 3,
    foot: foot(12, "Abertura"),
  });

  // 13 — BIBLIOGRAFIA PADRÃO
  T.biblio(p, {
    kicker: "Referências",
    title: "Bibliografia — padrão (básica)",
    left: { heading: "Fundamentos & processamento", dark: true, items: PADRAO.slice(0, 4) },
    right: { heading: "Lakehouse & streaming", items: PADRAO.slice(4) },
    foot: foot(13, "Abertura"),
  });

  // 14 — BIBLIOGRAFIA ESTENDIDA
  T.biblio(p, {
    kicker: "Referências",
    title: "Bibliografia — estendida",
    left: { heading: "Artigos fundadores", dark: true, items: PAPERS.slice(0, 5).concat(PAPERS.slice(5, 6)) },
    right: { heading: "Aprofundamento & clássicos", items: ESTENDIDA_LIVROS },
    foot: foot(14, "Abertura"),
  });

  // 15 — ENCERRAMENTO
  T.closing(p, {
    title: "Bons estudos!",
    lines: [
      "Prepare o ambiente (Docker + credenciais AWS Academy) antes do primeiro tutorial.",
      "Forme seu grupo e acompanhe os materiais no AlunoWeb / Moodle.",
    ],
    contact: "Prof. Leandro Mendes Ferreira  ·  leandro.mferreira@usp.br",
  });

  const out = path.join(__dirname, "out", "00-Abertura-Ecossistema-de-Big-Data.pptx");
  await p.writeFile({ fileName: out });
  console.log("OK", out);
})().catch((e) => { console.error(e); process.exit(1); });

// footer para slides custom (mesma assinatura do theme.footer)
function footerRaw(slide, n, module, total) {
  slide.addImage({ path: path.join(ASSETS, "circular-navy.png"), x: MX, y: 7.02, w: 0.3, h: 0.3 });
  slide.addText("PECE Poli-USP  ·  Ecossistema de Big Data", { x: MX + 0.4, y: 7.0, w: 5.5, h: 0.34, fontFace: F.body, fontSize: 9.5, color: C.slate, valign: "middle", margin: 0 });
  slide.addText(module, { x: 6.4, y: 7.0, w: 4.85, h: 0.34, fontFace: F.body, fontSize: 9.5, color: C.slate, align: "right", valign: "middle", margin: 0 });
  slide.addText(`${n} / ${total}`, { x: PAGE.w - MX - 1.1, y: 7.0, w: 1.1, h: 0.34, fontFace: F.body, fontSize: 9.5, bold: true, color: C.navy, align: "right", valign: "middle", margin: 0 });
}
