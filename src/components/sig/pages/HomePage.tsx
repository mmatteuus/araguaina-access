import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  AlertCircle,
  Building,
  DollarSign,
  Calendar,
  Activity
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { user } = useAuth();

  const kpis = [
    {
      title: 'Protocolos Pendentes',
      value: '147',
      change: '+12%',
      trend: 'up' as const,
      icon: FileText,
      description: 'Em relação ao mês anterior'
    },
    {
      title: 'Últimos Acessos',
      value: '2.4k',
      change: '+5%',
      trend: 'up' as const,
      icon: Users,
      description: 'Usuários ativos hoje'
    },
    {
      title: 'Arrecadação IPTU',
      value: 'R$ 1.2M',
      change: '+8%',
      trend: 'up' as const,
      icon: Building,
      description: 'Este mês'
    },
    {
      title: 'Notificações',
      value: '23',
      change: '-3%',
      trend: 'down' as const,
      icon: AlertCircle,
      description: 'Pendentes de ação'
    }
  ];

  const recentActivities = [
    {
      action: 'Nova consulta IPTU',
      user: 'Cidadão ***123-45',
      time: '2 min atrás',
      status: 'success' as const
    },
    {
      action: 'Protocolo criado #2024001',
      user: 'Atendente Maria',
      time: '15 min atrás',
      status: 'pending' as const
    },
    {
      action: 'Relatório RH gerado',
      user: 'Admin João',
      time: '1h atrás',
      status: 'success' as const
    },
    {
      action: 'Sistema atualizado',
      user: 'Sistema',
      time: '3h atrás',
      status: 'info' as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Bem-vindo ao SIG Araguaína
          </h1>
          <p className="text-muted-foreground mt-2">
            {user ? `Olá, ${user.name}! ` : ''}Sistema Integrado de Gestão Municipal
          </p>
        </div>
        <Badge variant="outline" className="sig-badge-primary">
          Sistema Ativo
        </Badge>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="sig-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <TrendingUp className={`h-3 w-3 ${
                  kpi.trend === 'up' ? 'text-accent' : 'text-destructive'
                }`} />
                <span className={kpi.trend === 'up' ? 'text-accent' : 'text-destructive'}>
                  {kpi.change}
                </span>
                <span>{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Welcome Card */}
        <Card className="sig-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Visão Geral</span>
            </CardTitle>
            <CardDescription>
              Informações gerais do sistema e acesso rápido
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-lg">
              <h3 className="font-semibold text-primary mb-2">Sistema Integrado</h3>
              <p className="text-sm text-muted-foreground">
                Use o menu lateral para navegar entre os módulos disponíveis.
                Sua permissão de acesso: <Badge variant="secondary">{user?.role || 'Público'}</Badge>
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-surface-subtle rounded-lg">
                <Building className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Tributos</p>
                <p className="text-xs text-muted-foreground">IPTU e Taxas</p>
              </div>
              <div className="text-center p-3 bg-surface-subtle rounded-lg">
                <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Protocolos</p>
                <p className="text-xs text-muted-foreground">Atendimento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="sig-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Atividades Recentes</span>
            </CardTitle>
            <CardDescription>
              Últimas ações no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-surface-subtle transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-accent' :
                    activity.status === 'pending' ? 'bg-yellow-500' :
                    activity.status === 'info' ? 'bg-primary' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};