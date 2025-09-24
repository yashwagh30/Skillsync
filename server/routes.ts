import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, loginSchema, onboardingSchema, type User } from "@shared/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config(); // Load .env at the very top

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env file");
}

interface AuthRequest extends Request {
  user?: User;
}

// ---------------- JWT Middleware ----------------
const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("🔐 No token provided");
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    console.log("🔐 Decoded token:", decoded);

    const user = await storage.getUser(decoded.userId);
    if (!user) {
      console.log("🔐 No user found for ID:", decoded.userId);
      return res.status(401).json({ message: "Invalid token - user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("🔐 Token verification failed:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// ---------------- Routes ----------------
export async function registerRoutes(app: Express): Promise<Server> {
  // ----- Signup -----
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);

      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(409).json({ message: "User already exists with this email" });
      }

      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
      const { password: _, ...userWithoutPassword } = user;

      res.status(201).json({ user: userWithoutPassword, token });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // ----- Login -----
  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);

      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
      const { password: _, ...userWithoutPassword } = user;

      res.json({ user: userWithoutPassword, token });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // ----- Get current user -----
  app.get("/api/auth/me", authenticateToken, (req: AuthRequest, res) => {
    const { password: _, ...userWithoutPassword } = req.user!;
    res.json({ user: userWithoutPassword });
  });

  // ----- Logout -----
  app.post("/api/auth/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
  });

  // ----- Onboarding -----
  app.post("/api/onboarding", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const validatedData = onboardingSchema.parse(req.body);

      const updatedUser = await storage.updateUser(req.user!.id, {
        industry: validatedData.industry,
        experienceLevel: validatedData.experienceLevel,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // ---------------- Google OAuth Callback ----------------
  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    async (req: any, res) => {
      if (!req.user) {
        return res.status(400).json({ message: "No user returned from OAuth" });
      }

      console.log("✅ Google callback user:", req.user);

      // Sign JWT using the SAME secret
      const token = jwt.sign({ userId: req.user.id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      // Redirect frontend with token
      res.redirect(`http://localhost:3001/oauth-success?token=${token}`);
    }
  );

  const httpServer = createServer(app);
  return httpServer;
}
