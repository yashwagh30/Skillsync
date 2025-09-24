import dotenv from "dotenv";
dotenv.config();
import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { storage } from "./storage";
import jwt from "jsonwebtoken";


// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));

// Passport initialization
app.use(passport.initialize());

// JWT secret - MAKE SURE THIS IS CONSISTENT
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production";

// Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:5008/api/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        console.log('🔐 Google OAuth Profile received:', profile.displayName);
        
        if (!profile.emails || profile.emails.length === 0) {
          return done(new Error("No email found in Google profile"), undefined);
        }

        const email = profile.emails[0].value;
        
        // Look up user by email
        let user = await storage.getUserByEmail(email);

        if (!user) {
          // Create new user if not found
          user = await storage.createUser({
            email: email,
            password: "", // no password for OAuth users
            firstName: profile.name?.givenName || profile.displayName.split(' ')[0] || "",
            lastName: profile.name?.familyName || profile.displayName.split(' ').slice(1).join(' ') || "",
            industry: null,
            experienceLevel: null,
          });
          console.log('🔐 Created new user for OAuth:', user.id);
        } else {
          console.log('🔐 Found existing user:', user.id);
        }

        done(null, user);
      } catch (err) {
        console.error('🔐 Google OAuth Error:', err);
        done(err as Error, undefined);
      }
    }
  )
);

// Serialize/Deserialize user
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await storage.getUser(id);
    done(null, user);
  } catch (error) {
    done(error, undefined);
  }
});

// OAuth routes
app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", { 
    failureRedirect: "http://localhost:3001/login?error=oauth_failed", 
    session: false 
  }),
  (req: any, res: Response) => {
    try {
      console.log('🔐 OAuth callback successful for user:', req.user?.id);
      
      if (!req.user) {
        throw new Error("No user found after OAuth authentication");
      }

      // Generate JWT token with proper payload
      const token = jwt.sign({ 
        userId: req.user.id,
        email: req.user.email 
      }, JWT_SECRET, { expiresIn: "7d" });
      
      console.log('🔐 Generated JWT token, redirecting to frontend...');
      
      // URL encode the token to handle special characters
      const encodedToken = encodeURIComponent(token);
      res.redirect(`http://localhost:3001/oauth-success?token=${encodedToken}`);
    } catch (error) {
      console.error('🔐 OAuth callback error:', error);
      res.redirect(`http://localhost:3001/login?error=oauth_callback_failed`);
    }
  }
);

// ---- Existing app routes ----
(async () => {
  try {
    const server = await registerRoutes(app);

    // Global error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      
      console.error('🔐 Global error handler:', err);
      
      res.status(status).json({ message });
      log(`Error: ${message}`, "error");
    });

    // Handle 404 for API routes
    app.use("/api/*", (req: Request, res: Response) => {
      res.status(404).json({ message: "API route not found" });
    });

    // Port
    const port = parseInt(process.env.PORT || "5008", 10);

    // Vite setup for development
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    server.listen(port, "0.0.0.0", () => {
      log(`✅ Backend server running on port ${port}`);
      log(`✅ Frontend server running on port 3001`);
      log(`🚀 Development server ready!`);
      log(`🔐 JWT Secret configured: ${JWT_SECRET !== "your-super-secret-jwt-key-change-this-in-production" ? 'Yes' : 'No (using default)'}`);
      log(`🔐 Google OAuth configured: ${process.env.GOOGLE_CLIENT_ID ? 'Yes' : 'No'}`);
    });
  } catch (error) {
    log(`Failed to start server: ${error}`, "error");
    process.exit(1);
  }
})();