/* Bibliografia — compilada dos materiais do repositório + cânone da área.
   a = autor(es) / t = título (itálico) / y = edição/ano/veículo */

// ---- PADRÃO (básica) : livros-núcleo da disciplina ----------------------
const PADRAO = [
  { a: "WHITE, T.", t: "Hadoop: The Definitive Guide.", y: "4. ed. O’Reilly, 2015." },
  { a: "CHAMBERS, B.; ZAHARIA, M.", t: "Spark: The Definitive Guide.", y: "O’Reilly, 2018." },
  { a: "GORELIK, A.", t: "The Enterprise Big Data Lake.", y: "O’Reilly, 2019." },
  { a: "REIS, J.; HOUSLEY, M.", t: "Fundamentals of Data Engineering.", y: "O’Reilly, 2022." },
  { a: "KLEPPMANN, M.", t: "Designing Data-Intensive Applications.", y: "O’Reilly, 2017." },
  { a: "SHAPIRA, G. et al.", t: "Kafka: The Definitive Guide.", y: "2. ed. O’Reilly, 2021." },
  { a: "AKIDAU, T. et al.", t: "Streaming Systems.", y: "O’Reilly, 2018." },
  { a: "SHIRAN, T.; HUGHES, J.; MERCED, A.", t: "Apache Iceberg: The Definitive Guide.", y: "O’Reilly, 2024." },
];

// ---- ESTENDIDA : papers fundadores + livros/artigos de aprofundamento ----
const PAPERS = [
  { a: "GHEMAWAT, S. et al.", t: "The Google File System.", y: "SOSP, 2003." },
  { a: "DEAN, J.; GHEMAWAT, S.", t: "MapReduce: Simplified Data Processing.", y: "OSDI, 2004." },
  { a: "CHANG, F. et al.", t: "Bigtable: A Distributed Storage System.", y: "OSDI, 2006." },
  { a: "THUSOO, A. et al.", t: "Hive: A Warehousing Solution over MapReduce.", y: "VLDB, 2009." },
  { a: "SHVACHKO, K. et al.", t: "The Hadoop Distributed File System.", y: "MSST, 2010." },
  { a: "KREPS, J. et al.", t: "Kafka: A Distributed Messaging System.", y: "NetDB, 2011." },
  { a: "ZAHARIA, M. et al.", t: "Resilient Distributed Datasets (RDD).", y: "NSDI, 2012." },
  { a: "CARBONE, P. et al.", t: "Apache Flink: Stream and Batch in One Engine.", y: "IEEE, 2015." },
  { a: "ARMBRUST, M. et al.", t: "Lakehouse: A New Generation of Open Platforms.", y: "CIDR, 2021." },
];

const ESTENDIDA_LIVROS = [
  { a: "STOPFORD, B.", t: "Designing Event-Driven Systems.", y: "O’Reilly, 2018." },
  { a: "ROY, G.", t: "RabbitMQ in Depth.", y: "Manning, 2017." },
  { a: "SARKAR, A.", t: "Learning Spark SQL.", y: "Packt, 2017." },
  { a: "LEE, D. et al.", t: "Delta Lake: The Definitive Guide.", y: "O’Reilly, 2024." },
  { a: "DAVENPORT, T.; PATIL, D.", t: "Data Scientist: The Sexiest Job of the 21st Century.", y: "HBR, 2012." },
  { a: "THE ECONOMIST.", t: "The world’s most valuable resource is data.", y: "2017." },
];

module.exports = { PADRAO, PAPERS, ESTENDIDA_LIVROS };
