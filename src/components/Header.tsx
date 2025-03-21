
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Download } from "lucide-react";

export function Header() {
  return (
    <header className="w-full py-4 px-6 border-b flex justify-between items-center animate-fade-in">
      <Link to="/" className="flex items-center gap-2">
        <Download className="h-6 w-6 text-primary" />
        <span className="font-bold text-xl">Oxe Video</span>
      </Link>
      <div className="flex items-center gap-4">
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Início
              </Link>
            </li>
            <li>
              <Link to="/download" className="text-foreground hover:text-primary transition-colors">
                Baixar
              </Link>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
