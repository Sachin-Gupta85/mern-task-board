# 🗂️ mern-task-board — Kanban board (MERN + Python)

> A three-column Kanban board (todo / doing / done). **React** (Vite) + **Express** + **MongoDB** (Mongoose), with a **Python** analytics tool and a cross-stack test harness.

![React](https://img.shields.io/badge/React-18-61dafb)
![Express](https://img.shields.io/badge/Express-4-000000)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248)
![Tests](https://img.shields.io/badge/tests-jest%20%2B%20pytest%20%2B%20vitest-brightgreen)

## ✨ Features
- Create tasks, move them across columns (PATCH), delete; order kept per column.
- Mongoose model with status enum + validation; `toJSON` exposes a clean `id`.
- **Python companion** (`pytools/board_stats.py`): board metrics (column counts,
  completion %, WIP) from an exported task list — unit-tested with pytest.
- Express API tested with **Jest + mongodb-memory-server** (no external Mongo).

## 🗂️ Layout
```
server/    Express + Mongoose API  (+ Jest tests)
client/    React + Vite UI         (+ Vitest tests)
pytools/   Python analytics tool   (+ pytest tests)
docker-compose.yml   MongoDB + API
run_harness.sh       runs all three test suites
```

## 🚀 Run
```bash
docker compose up --build                 # MongoDB + API on :8000
cd client && npm install && npm run dev    # UI on :5173
```

## ✅ Test
```bash
./run_harness.sh      # jest (6) + pytest (4) + vitest (1)
```

## 🔌 API
`GET /api/tasks` · `POST /api/tasks` · `PATCH /api/tasks/{id}` · `DELETE /api/tasks/{id}`

## 📝 License
MIT — see [LICENSE](LICENSE).
