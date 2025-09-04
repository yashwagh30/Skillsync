import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ... (your existing middleware)

(async () => {
  try {
    const server = await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
      log(`Error: ${message}`, "error");
    });

    const port = parseInt(process.env.PORT || '5008', 10);

    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Handle port conflicts
    server.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        const newPort = port + 1;
        log(`Port ${port} is busy, trying ${newPort}`, "warn");
        server.listen(newPort, "0.0.0.0");
      } else {
        log(`Server error: ${error.message}`, "error");
        throw error;
      }
    });

    server.listen(port, "0.0.0.0", () => {
      log(`Backend server running on port ${port}`);
      log(`Frontend server running on port 3001`);
      log(`Development server ready!`);
    });

  } catch (error) {
    log(`Failed to start server: ${error}`, "error");
    process.exit(1);
  }
})();