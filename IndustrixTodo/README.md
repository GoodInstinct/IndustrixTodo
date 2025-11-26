# Industrix Todo Application

A full-stack Todo List application built for the **Industrix Full Stack Engineer Intern Coding Challenge**.

This project demonstrates a complete full-stack solution with:

- Backend REST API (Node.js + Express)
- PostgreSQL database with manual SQL migrations
- Sequelize ORM
- React + Ant Design frontend
- Global state management using Context API
- Todo CRUD
- Category CRUD
- Pagination, search, and advanced filtering
- Responsive UI

---

## 📦 Tech Stack

### **Frontend**
- React (Vite)
- Ant Design UI
- React Router
- Context API (Global state)
- Axios

### **Backend**
- Node.js (Express)
- PostgreSQL
- Sequelize ORM
- Manual SQL migrations (no sequelize-cli)
- dotenv

---

## 📂 Project Structure

```
IndustrixTodo/
│
├── backend/
│   ├── src/
│   │   ├── migrations/       ← SQL migrations (manual)
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── layout/
│   │   ├── context/
│   │   └── services/
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ System Requirements
- Node.js 16+
- PostgreSQL 14+
- Git
- pgAdmin (recommended)
- Postman / Insomnia (optional)
- OS: Windows, Linux, macOS

---

# 🚀 BACKEND INSTALLATION & SETUP

### **1. Navigate to backend**
```
cd backend
```

### **2. Install dependencies**
```
npm install
```

### **3. Create `.env` file**
```
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=industrix_todo
DB_PORT=5432
PORT=5000
```

---

# 🗄️ APPLY DATABASE MIGRATIONS  
> This project uses **manual SQL migrations** (not sequelize-cli).  
> Do **not** run: `npx sequelize-cli db:migrate`

### **How to apply migrations**

1. Open pgAdmin  
2. Select your database: `industrix_todo`  
3. Right-click → **Query Tool**  
4. Run these files in order:

```
backend/src/migrations/001_create_categories.up.sql
backend/src/migrations/002_create_todos.up.sql
```

Tables created:

- `Categories`
- `Todos`

### **Rollback (optional)**
```
backend/src/migrations/001_create_categories.down.sql
backend/src/migrations/002_create_todos.down.sql
```

---

# ▶️ Run Backend Server

### Development mode
```
npm run dev
```

### Production mode
```
npm start
```

Backend runs at:
```
http://localhost:5000
```

---

# 💻 FRONTEND INSTALLATION & SETUP

### 1. Navigate to frontend
```
cd frontend
```

### 2. Install dependencies
```
npm install
```

### 3. Start dev server
```
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

# 🔌 API DOCUMENTATION

## 🟦 TODOS

### **GET /api/todos**
Query params:
- page  
- limit  
- search  
- status (completed / incomplete)  
- category_id  
- priority (high / medium / low)

### **POST /api/todos**
```json
{
  "title": "My Task",
  "description": "Something...",
  "category_id": 1,
  "priority": "high"
}
```

### **PUT /api/todos/:id**
Update a todo.

### **DELETE /api/todos/:id**
Delete a todo.

### **PATCH /api/todos/:id/complete**
Toggle completion status.

---

## 🟩 CATEGORIES

### **GET /api/categories**
Retrieve all categories.

### **POST /api/categories**
```json
{
  "name": "Work",
  "color": "#3B82F6"
}
```

### **PUT /api/categories/:id**

### **DELETE /api/categories/:id**

---

# 🧱 DATABASE DESIGN QUESTIONS

## **1. What database tables did you create and why?**

### Tables
- **Categories**  
  Stores category names and color codes.

- **Todos**  
  Stores todo items including:
  - title  
  - description  
  - completed (boolean)  
  - priority  
  - due_date  
  - category_id  
  - timestamps  

### Relationships
- One category → Many todos  
- Each todo belongs to a category

### Why this structure?
- Normalized schema  
- Minimal tables  
- Easy to expand (tags, users, due dates, etc.)  
- Matches requirements of filtering by category & priority  

---

## **2. Pagination & Filtering**

Pagination uses:
```
LIMIT <limit> OFFSET (<page> - 1) * <limit>
```

Search uses:
```
ILIKE '%keyword%'
```

Filters:
- completed = true/false  
- category_id = ?  
- priority = ?  

### Indexes for performance
```
CREATE INDEX idx_todos_title ON "Todos"(title);
CREATE INDEX idx_todos_category_id ON "Todos"(category_id);
CREATE INDEX idx_todos_completed ON "Todos"(completed);
```

---

# 🧪 TECHNICAL DECISION QUESTIONS

## **1. Responsive Design**
- Ant Design Grid (Row, Col)
- Mobile-first styles using CSS flex-wrap
- Table scrolls horizontally on small screens
- Ant Design breakpoints: `xs`, `sm`, `md`, `lg`

---

## **2. React Component Structure**

```
MainLayout
 ├── TodosPage
 │     ├── FilterBar
 │     ├── SearchBar
 │     ├── TodoTable
 │     └── TodoFormModal
 └── CategoriesPage
```

### State Management (Context API)
- todos  
- categories  
- filters  
- pagination  

Context API chosen for:
- simplicity  
- global shared state  
- avoids prop drilling  
- bonus challenge requirement  

---

## **3. Backend Architecture**

- `routes/` → define Express routes  
- `controllers/` → business logic  
- `models/` → Sequelize ORM models  
- `migrations/` → SQL schema  
- `server.js` → entrypoint  

### Error Handling
- try/catch in all controllers  
- consistent JSON error responses  

---

## **4. Data Validation**

### Frontend (Ant Design)
- Required fields (title)
- Form validation rules
- Prevents empty submissions

### Backend (Sequelize + manual checks)
- NOT NULL on required fields  
- ENUM for priority  
- Additional validation in controllers  

---

# 🧪 TESTING & QUALITY

## **1. Unit Tests**
Not implemented due to time constraints.

Recommended test areas:
- Todo CRUD logic  
- Category CRUD  
- Validation  
- Pagination logic  

---

## **2. If more time: improvements**
- Add backend unit tests (highest bonus)
- Add sorting (date created / priority)
- Add Docker & docker-compose
- Add TypeScript to frontend
- Add color picker UI for categories
- Add due dates & reminders
- Add authentication system (future scope)

---

# ⭐ BONUS FEATURES IMPLEMENTED
- ✔ Advanced filtering (status, category, priority)  
- ✔ Pagination  
- ✔ Search  
- ✔ React Context API  
- ✔ Fully responsive UI  
- ✔ CRUD for Todos & Categories  
- ✔ Clean Ant Design interface  

---

# 🎉 Thank You!
For improvements or additional features, feel free to reach out!
