import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon } from "./icon/github";
import { LinkedinIcon } from "./icon/linkedin";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-6">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Manjoong Kim. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Built with Next.js and Tailwind CSS
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/Ring-wdr"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubIcon width={18} height={18} />
            </Link>
            <Link
              href="https://linkedin.com/in/dust-shooter-408560340/"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <LinkedinIcon width={18} height={18} />
            </Link>
            <Link
              href="mailto:akswnd55@gmail.com"
              aria-label="Email"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
