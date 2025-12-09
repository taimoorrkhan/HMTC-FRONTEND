# My App — Setup & Documentation

Welcome to **My App**,  frontend and an ASP.NET Core (.NET 10) backend with EF Core. This README shows how to run the frontend and the backend locally.

---

## Frontend (Next.js)

This repository uses the Next.js App Router (the `app/` directory).

### Requirements

- Node.js (16+ recommended)

### Install & run

```powershell
# Clone the repository
git clone ....
cd my-ap

# Install dependencies
npm install

# Start the Next.js development server
npm run dev
```

Open the frontend at: http://localhost:3000

> If your backend runs on `http://localhost:5160`, start it first so the frontend can communicate with it.

### Project structure (important files)

```
app/                # Next.js App Router routes
  globals.css
  layout.tsx
  page.tsx
public/             # Static assets
next.config.ts
package.json
README.md
```

### API communication

The frontend sends requests to the backend API. Example endpoint used in this project:

```
POST http://localhost:5160/api/TaskItem/createTask
```

Example JSON payload:

```json
{
  "title": "My Task",
  "description": "Task details",
  "taskstatus": "Pending",
  "dueDateTime": "2025-01-10T10:00:00Z"
}
```

---

## Backend (.NET 10 + EF Core)

The backend is an ASP.NET Core Web API using Entity Framework Core and SQL Server (code-first).

### Requirements

- .NET 10 SDK
- SQL Server (or another provider configured in `appsettings.json`)

### Configure database

Edit `HMCT/appsettings.json` (create the `HMCT/` folder if your backend source is colocated there) and add your connection string under `ConnectionStrings:DefaultConnection`.

Example `appsettings.json` snippet:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=MyDb;Trusted_Connection=True;"
  }
}
```

### Restore packages and run migrations

```powershell
cd HMCT
dotnet restore

# Add a migration (only if models changed)
dotnet ef migrations add InitialCreate

# Apply migrations
dotnet ef database update

# Run the backend
dotnet run
```

The API will be available at: http://localhost:5160 (by default)

---

## Tests

To run the unit tests for the backend:

```powershell
cd HMCT.Tests
dotnet test
```

> Note: one test is expected to pass and one to fail (intentional) 

---



## Ready

Start the backend (if separate) and then the frontend:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5160`

