import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from 'path';

const app = express();
app.use(cors()); // Add CORS middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
    if (capturedJsonResponse) {
      logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
    }

    if (logLine.length > 80) {
      logLine = logLine.slice(0, 79) + "…";
    }

    log(logLine);
  });

  next();
});

app.use(express.static(path.join(__dirname, '../client')));

// Add a catch-all route to serve the index.html for client-side routing
app.get('*', (req, res) => {
  // Exclude API routes from the catch-all
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  } else {
    res.status(404).send('API endpoint not found');
  }
});

(async () => {
  const server = await registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error(`[ERROR] ${message}`);
    res.status(status).json({ message });
  });

  // Logging for environment
  log(`Starting server in ${app.get("env")} mode`);

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    log("Serving static files from public directory");
    serveStatic(app);
  }

  // Update the port configuration to be more flexible
  const PORT = process.env.PORT || 5000;
  const serverInstance = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }).on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      // If port is in use, try another one
      const newPort = Number(PORT) + 1;
      console.log(`Port ${PORT} is in use, attempting with port ${newPort}`);
      process.env.PORT = String(newPort);
      serverInstance.close();
      // Restart the server with the new port
      app.listen(newPort, () => {
        console.log(`Server running on port ${newPort}`);
      });
    } else {
      console.error('Server error:', err);
    }
  });
})();