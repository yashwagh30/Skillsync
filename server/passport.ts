import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import { storage } from "./storage";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL!;
const JWT_SECRET = process.env.JWT_SECRET!;

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          console.error("❌ Google profile has no email");
          return done(new Error("No email found"), null);
        }

        // Try to find user
        let user = await storage.getUserByEmail(email);

        if (!user) {
          // Create new user if not exists
          user = await storage.createUser({
            email,
            password: "", // no password for OAuth users
            firstName: profile.name?.givenName || "",
            lastName: profile.name?.familyName || "",
            industry: null,
            experienceLevel: null,
          });
          console.log("✅ Created new OAuth user:", user);
        } else {
          console.log("✅ Found existing user:", user);
        }

        if (!user.id) {
          console.error("❌ User object has no id:", user);
          return done(new Error("User has no ID"), null);
        }

        console.log("✅ Passing user to passport:", user);
        return done(null, user);
      } catch (err) {
        console.error("❌ Error in GoogleStrategy:", err);
        return done(err as any, null);
      }
    }
  )
);

// Used after Google login succeeds
passport.serializeUser((user: any, done) => {
  console.log("🔐 serializeUser:", user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await storage.getUser(id);
    console.log("🔐 deserializeUser:", user);
    done(null, user);
  } catch (err) {
    console.error("❌ Error in deserializeUser:", err);
    done(err, null);
  }
});

export default passport;
