import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "./auth-context";
import { ChevronDown, Menu, X, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGrowthToolsOpen, setIsGrowthToolsOpen] = useState(false);
  const { user, logout } = useAuth();
  const [location] = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2" data-testid="logo-link">
            <div className="text-2xl text-primary">🤖</div>
            <span className="text-xl font-bold">SkillSync</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm transition-colors ${location === "/" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              data-testid="nav-home"
            >
              Home
            </Link>
            <Link 
              href="/industry-insights" 
              className={`text-sm transition-colors ${location === "/industry-insights" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              data-testid="nav-insights"
            >
              Industry Insights
            </Link>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <DropdownMenu open={isGrowthToolsOpen} onOpenChange={setIsGrowthToolsOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="flex items-center space-x-1" data-testid="growth-tools-menu">
                      <span>Growth Tools</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/interview-questions" data-testid="nav-interview-questions">
                        Interview Questions
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/resume-builder" data-testid="nav-resume-builder">
                        Resume Builder
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/analytics" data-testid="nav-analytics">
                        Analytics
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-8 h-8 rounded-full bg-primary text-primary-foreground"
                      data-testid="user-menu"
                    >
                      {user.firstName?.[0]?.toUpperCase() || "U"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{user.firstName} {user.lastName}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center space-x-2" data-testid="button-logout">
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" data-testid="button-login">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button className="btn-primary" data-testid="button-signup">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="px-4 py-6 space-y-4">
            <Link 
              href="/" 
              className="block text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              data-testid="mobile-nav-home"
            >
              Home
            </Link>
            <Link 
              href="/industry-insights" 
              className="block text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              data-testid="mobile-nav-insights"
            >
              Industry Insights
            </Link>
            {user ? (
              <>
                <hr className="border-border" />
                <Link 
                  href="/interview-questions" 
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-nav-interview-questions"
                >
                  Interview Questions
                </Link>
                <Link 
                  href="/resume-builder" 
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-nav-resume-builder"
                >
                  Resume Builder
                </Link>
                <Link 
                  href="/analytics" 
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-nav-analytics"
                >
                  Analytics
                </Link>
                <hr className="border-border" />
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="mobile-button-logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <hr className="border-border" />
                <Link 
                  href="/login" 
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-nav-login"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-nav-signup"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}