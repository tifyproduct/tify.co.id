import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground font-serif">T</span>
              </div>
              <span className="text-xl font-bold font-serif">Tify</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your digital AI Partner
            </p>
            <div className="flex gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover-elevate active-elevate-2 p-2 rounded-md" data-testid="link-social-facebook">
                <Facebook className="h-5 w-5 text-muted-foreground" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover-elevate active-elevate-2 p-2 rounded-md" data-testid="link-social-twitter">
                <Twitter className="h-5 w-5 text-muted-foreground" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover-elevate active-elevate-2 p-2 rounded-md" data-testid="link-social-linkedin">
                <Linkedin className="h-5 w-5 text-muted-foreground" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover-elevate active-elevate-2 p-2 rounded-md" data-testid="link-social-instagram">
                <Instagram className="h-5 w-5 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products#finance" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-personal-finance">
                  Personal Finance Management
                </Link>
              </li>
              <li>
                <Link href="/products#parenting" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-parenting-app">
                  Kids & Parenting App
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Learn */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Learn</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-all-courses">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/courses?category=Parenting" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-parenting-courses">
                  Parenting Courses
                </Link>
              </li>
              <li>
                <Link href="/courses?category=Financial%20Literacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-finance-courses">
                  Finance Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <a href="mailto:hello@tify.co.id" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-email">
                  hello@tify.co.id
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">+62 123 456 7890</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Jakarta, Indonesia
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Tify. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-cookies">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
