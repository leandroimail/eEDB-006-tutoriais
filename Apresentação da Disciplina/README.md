# Ecossistema de Big Data — Material de Apresentação

**eEDB-006 · 27h** — Especialização em Engenharia de Dados e Big Data (EAD síncrono)
PECE · Escola Politécnica · USP
**Professor:** Leandro Mendes Ferreira

Conjunto de apresentações (`.pptx`, 16:9, editáveis) com identidade visual Poli-USP
(azul `#12107E` + amarelo `#FCF101`, brasão da Minerva). São **decks separados por módulo**:
um de abertura da disciplina + um por aula teórica.

## Decks

| Arquivo | Conteúdo |
|---|---|
| `00-Abertura-Ecossistema-de-Big-Data.pptx` | Boas-vindas, professor, ementa, as 5 aulas, os 4 tutoriais, jornada do dado, **avaliação (4 × 1/4, 0–10)**, cronograma, ferramentas e **bibliografia (padrão + estendida)** |
| `01-Introducao-a-Big-Data.pptx` | 5 V's, origens (GFS/MapReduce/Bigtable), HDFS, MapReduce, YARN, ecossistema Hadoop |
| `02-Big-SQL-Hive-e-outros-SQLs.pptx` | SQL-on-Hadoop, Hive, metastore/schema-on-read, particionamento, engines (Trino/Impala/Spark SQL), Athena + Glue |
| `03-Spark-e-Lakehouse.pptx` | Arquitetura Spark, RDD, DataFrame/Spark SQL, Catalyst; Data Lake → Lakehouse; Iceberg/Delta |
| `04-Ingestao-de-Dados.pptx` | Batch × streaming, ETL × ELT, CDC; Meltano, dlt, Airbyte, Debezium; camadas do lake |
| `05-Streaming-de-Dados.pptx` | Eventos, filas × tópicos, Kafka, semânticas de entrega, tempo/janelas, Spark × Flink |

Cada deck de módulo termina com o **tutorial prático associado** (a parte avaliada) e uma
seção **"Para aprofundar"**. Os quatro tutoriais valem **1/4 da nota cada** (nota final 0–10),
entregues em grupo.

## Bibliografia

- **Padrão (básica):** White (Hadoop), Chambers & Zaharia (Spark), Gorelik (Big Data Lake),
  Reis & Housley (Fundamentals of DE), Kleppmann (DDIA), Shapira et al. (Kafka),
  Akidau et al. (Streaming Systems), Shiran et al. (Iceberg).
- **Estendida:** papers fundadores (GFS, MapReduce, Bigtable, HDFS, Hive, Kafka, RDD, Flink,
  Lakehouse) + Stopford, Roy (RabbitMQ), Sarkar, Delta Lake e artigos (HBR, The Economist).

## Regenerar / editar os decks

Os `.pptx` são gerados por código (`pptxgenjs`) — em `_fonte/`.

```bash
cd _fonte
npm install pptxgenjs react react-dom react-icons sharp
node deck-00-abertura.js   # gera o .pptx correspondente em out/
```

- `theme.js` — sistema de design (cores, tipografia, componentes: capa, divisor, cards,
  timeline, tabela, bibliografia, encerramento).
- `biblio-data.js` — dados da bibliografia.
- `deck-0X-*.js` — conteúdo de cada deck (declarativo).
- `assets/` — logos oficiais Poli-USP processados (brasão/medalhão em branco e navy, wordmark).

> Imagens oficiais da Escola Politécnica da USP obtidas em imagens.usp.br.
> Uso institucional no material didático da própria disciplina.
