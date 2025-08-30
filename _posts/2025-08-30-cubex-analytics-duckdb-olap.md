---
layout: post
title: "CubeX Analytics：基于 DuckDB 的多维 OLAP 引擎"
date: 2025-08-30 00:00:00 +0000
tags: [OLAP, DuckDB, FastAPI, 数据分析, 多维分析]
author: "WanJo Chan"
excerpt: "CubeX 是一个面向 AI 代理的多维分析引擎，基于 DuckDB 与 FastAPI，内置维度/事实模型、查询与 OLAP 操作、缓存与性能监控，适合低成本搭建内嵌式分析服务。"
---

本文基于项目文件 `aixcorp/core/cubex.py`，简述 CubeX Analytics 的设计与用法。它以 DuckDB 为内核，结合 FastAPI 暴露 `/query`、`/olap` 等接口，内置维度模型与缓存机制，适合在 AI 工作流中嵌入轻量分析能力。

## 架构与数据模型
- 核心类：`CubeXAnalytics`（命令式 OLAP 引擎）与 `QuantumDBService`（HTTP 服务层）。
- 存储：DuckDB 文件（`data/cubex/cubex.duckdb` 与 `data/default.duckdb`）。
- 维度表：`dim_time`、`dim_agent`、`dim_task`；事实表：`fact_agent_performance`。
- 特性：LRU/TTL 缓存（查询/OLAP/模式/统计）、并发限制、性能指标记录与健康检查。

## 能力速览
- 表与模式：`tables`、`schema <table>`；初始化：`init`（创建示例维度与事实数据）。
- OLAP 操作：`slice`、`dice`、`rollup`、`drilldown`；支持按维度聚合与层级下钻。
- API 端点：
  - `POST /query` 执行 SQL；
  - `POST /olap` 执行切片/汇总/下钻；
  - `GET /databases`、`/health`、`/sample-queries`；`DELETE /cache` 清理缓存。

## 示例
执行 SQL（限制返回行、可缓存）：

```bash
curl -X POST http://localhost:9771/query \
  -H 'Content-Type: application/json' \
  -d '{
    "sql": "SELECT agent_type, AVG(execution_time_ms) avg_time FROM fact_agent_performance fp JOIN dim_agent da ON fp.agent_key = da.agent_key GROUP BY agent_type ORDER BY avg_time",
    "limit": 20,
    "cache": true
  }'
```

OLAP 汇总（按维度 rollup）：

```bash
curl -X POST http://localhost:9771/olap \
  -H 'Content-Type: application/json' \
  -d '{
    "operation": "rollup",
    "cube": "fact_agent_performance",
    "dimensions": ["agent_type", "task_category"],
    "measures": ["execution_time_ms", "tokens_processed"]
  }'
```

## 启动与配置
- 环境变量：`PORT`（默认 9771）、`CUBEX_DATA_DIR`、`CUBEX_CACHE_DIR`、`DUCKDB_MEMORY_LIMIT`、`MAX_CONCURRENT_QUERIES`。
- 启动服务：

```bash
python -m aixcorp.core.cubex  # 或直接运行 cubex.py
```

若用于内嵌型分析（Agent/服务侧），建议先调用 `init` 生成示例数据，再通过 `/query` 与 `/olap` 叠加你自身的业务维度与度量。
