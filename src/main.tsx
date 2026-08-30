import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { api } from "./lib/api-client";

// Seed database on first load
api.seed().then((result) => {
  if (result.seeded) {
    console.log('✓ Database seeded successfully!');
  } else {
    console.log('Database already contains data');
  }
}).catch((error) => {
  console.error('Failed to check/seed database:', error);
});

createRoot(document.getElementById("root")!).render(<App />);
