import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from 'next-themes';
import { Sun, Moon, Search, Settings, User, LogOut, Shield, Home } from 'lucide-react';

interface SigNavbarProps {
  onOpenLogin: () => void;
  onOpenMasterStudio: () => void;
}

export const SigNavbar: React.FC<SigNavbarProps> = ({ onOpenLogin, onOpenMasterStudio }) => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar busca global
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="sig-nav border-b sticky top-0 z-50 w-full px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary-foreground" />
            <h1 className="text-xl font-bold text-primary-foreground">SIG Araguaína</h1>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar serviço, CPF, protocolo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 sig-input bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
          </form>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-primary-foreground hover:bg-white/10"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-primary-foreground hover:bg-white/10">
                <Settings className="h-4 w-4 mr-2" />
                Ferramentas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {!user && (
                <DropdownMenuItem onClick={onOpenLogin}>
                  <User className="h-4 w-4 mr-2" />
                  Entrar (Master/Servidor)
                </DropdownMenuItem>
              )}
              
              {user?.role === 'MASTER' && (
                <DropdownMenuItem onClick={onOpenMasterStudio}>
                  <Settings className="h-4 w-4 mr-2" />
                  Master Studio
                </DropdownMenuItem>
              )}
              
              <DropdownMenuSeparator />
              
              {user && (
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {user && (
            <div className="flex items-center space-x-2 text-primary-foreground">
              <Badge variant="secondary" className="sig-badge-primary">
                {user.role}
              </Badge>
              <span className="text-sm">{user.name}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};