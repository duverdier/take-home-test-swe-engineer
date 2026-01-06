# Bank Account – Take-Home Test (Node.js / TypeScript)

## 🗂️ Structure du projet

```
.
├── src/
│   ├── domain/
│   ├── presentation/
│   │   └── api/
│   └── index.ts
├── test/
├── Dockerfile
├── tsconfig.json
├── jest.config.ts
├── package.json
└── README.md
```

---

## ⚙️ Prérequis

- Node.js 18+ (testé avec Node 22)
- pnpm (via Corepack recommandé)

```bash
corepack enable
```

---

## 📦 Installation

```bash
pnpm install
```

---

## 🧪 Tests

```bash
pnpm test
```

---

## ▶️ Exécution – Mode console

```bash
pnpm start
```

---

## 🌐 API REST (Bonus)

### Mode développement

```bash
pnpm dev:api
```

### Endpoints

- POST /deposit
- POST /withdraw
- GET /statement
- GET /health

### Swagger

<http://localhost:3000/docs>

---

## 🚀 API – Mode production

```bash
pnpm build:api
```

---

## 🐳 Docker

```bash
docker build -t bank-account .
docker run -p 3000:3000 bank-account
```

---
