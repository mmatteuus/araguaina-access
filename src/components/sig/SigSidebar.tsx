import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Building, 
  FileText, 
  DollarSign, 
  Users, 
  Settings,
  ChevronRight 
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  icon: React.ReactNode;
  group: string;
  permissions: string[];
  route: string;
}

interface SigSidebarProps {
  activeModule: string;
  onModuleSelect: (moduleId: string) => void;
}

const modules: Module[] = [
  {
    id: 'home',
    title: 'Início',
    icon: <Home className="sig-icon" />,
    group: 'Geral',
    permissions: ['*'],
    route: '#/home'
  },
  {
    id: 'iptu',
    title: 'Consulta IPTU',
    icon: <Building className="sig-icon" />,
    group: 'Tributos',
    permissions: ['CIDADAO', 'SERVIDOR_TRIBUTOS', 'MASTER'],
    route: '#/tributos/iptu'
  },
  {
    id: 'protocolos',
    title: 'Protocolos',
    icon: <FileText className="sig-icon" />,
    group: 'Atendimento',
    permissions: ['SERVIDOR_ATENDIMENTO', 'MASTER'],
    route: '#/protocolos'
  },
  {
    id: 'rh',
    title: 'Contracheque',
    icon: <DollarSign className="sig-icon" />,
    group: 'RH',
    permissions: ['SERVIDOR_RH', 'MASTER'],
    route: '#/rh/contracheque'
  }
];

export const SigSidebar: React.FC<SigSidebarProps> = ({ activeModule, onModuleSelect }) => {
  const { user } = useAuth();

  const canUserAccess = (module: Module): boolean => {
    if (!module.permissions || module.permissions.includes('*')) return true;
    if (!user) return module.permissions.includes('CIDADAO');
    return module.permissions.includes(user.role);
  };

  const groupedModules = modules.reduce((acc, module) => {
    if (!canUserAccess(module)) return acc;
    
    if (!acc[module.group]) {
      acc[module.group] = [];
    }
    acc[module.group].push(module);
    return acc;
  }, {} as Record<string, Module[]>);

  return (
    <aside className="w-64 h-full bg-sidebar border-r border-sidebar-border p-4 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-sidebar-foreground">Menu</h2>
        <Badge variant="outline" className="text-xs">
          {user?.role || 'Público'}
        </Badge>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedModules).map(([group, moduleList]) => (
          <Card key={group} className="sig-card">
            <CardContent className="p-3">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2">
                {group}
              </h3>
              <div className="space-y-1">
                {moduleList.map((module) => (
                  <Button
                    key={module.id}
                    variant={activeModule === module.id ? "default" : "ghost"}
                    className={`w-full justify-start h-10 text-left ${
                      activeModule === module.id 
                        ? 'sig-btn-gov' 
                        : 'hover:bg-sidebar-accent'
                    }`}
                    onClick={() => onModuleSelect(module.id)}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      {module.icon}
                      <span className="flex-1">{module.title}</span>
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {user?.role === 'MASTER' && (
        <Card className="sig-card border-primary/20">
          <CardContent className="p-3">
            <h3 className="text-sm font-medium text-primary mb-3 px-2">
              Administração
            </h3>
            <Button
              variant="outline"
              className="w-full justify-start h-10 border-primary/20 hover:bg-primary/5"
              onClick={() => onModuleSelect('master')}
            >
              <Settings className="sig-icon mr-3" />
              Master Studio
            </Button>
          </CardContent>
        </Card>
      )}
    </aside>
  );
};