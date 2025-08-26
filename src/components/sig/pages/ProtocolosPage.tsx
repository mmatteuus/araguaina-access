import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, RefreshCw, Eye, Calendar } from 'lucide-react';

interface Protocol {
  id: string;
  numero: string;
  assunto: string;
  situacao: string;
  requerente: string;
  dataAbertura: string;
  prazo: string;
}

export const ProtocolosPage: React.FC = () => {
  const [protocolos, setProtocolos] = useState<Protocol[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadProtocolos = async () => {
    setIsLoading(true);
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProtocolos: Protocol[] = [
        {
          id: '1',
          numero: '2024001',
          assunto: 'Solicitação de Alvará de Funcionamento',
          situacao: 'Em Análise',
          requerente: 'João Silva',
          dataAbertura: '15/01/2024',
          prazo: '30 dias'
        },
        {
          id: '2',
          numero: '2024002',
          assunto: 'Certidão Negativa de Débitos',
          situacao: 'Concluído',
          requerente: 'Maria Santos',
          dataAbertura: '12/01/2024',
          prazo: '10 dias'
        },
        {
          id: '3',
          numero: '2024003',
          assunto: 'Segunda Via de IPTU',
          situacao: 'Pendente',
          requerente: 'Carlos Oliveira',
          dataAbertura: '20/01/2024',
          prazo: '5 dias'
        },
        {
          id: '4',
          numero: '2024004',
          assunto: 'Licenciamento de Obra',
          situacao: 'Em Análise',
          requerente: 'Ana Costa',
          dataAbertura: '18/01/2024',
          prazo: '45 dias'
        }
      ];

      setProtocolos(mockProtocolos);
    } catch (error) {
      console.error('Erro ao carregar protocolos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProtocolos();
  }, []);

  const getSituacaoBadge = (situacao: string) => {
    const variants = {
      'Concluído': 'default',
      'Em Análise': 'secondary',
      'Pendente': 'destructive',
      'Aguardando': 'outline'
    } as const;
    
    return (
      <Badge variant={variants[situacao as keyof typeof variants] || 'outline'}>
        {situacao}
      </Badge>
    );
  };

  const filteredProtocolos = protocolos.filter(protocolo =>
    protocolo.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    protocolo.assunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    protocolo.requerente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Gestão de Protocolos</h1>
        </div>
        <Button 
          onClick={loadProtocolos}
          disabled={isLoading}
          variant="outline"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="sig-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{protocolos.length}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="sig-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Análise</p>
                <p className="text-2xl font-bold text-secondary">
                  {protocolos.filter(p => p.situacao === 'Em Análise').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="sig-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Concluídos</p>
                <p className="text-2xl font-bold text-accent">
                  {protocolos.filter(p => p.situacao === 'Concluído').length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="sig-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold text-destructive">
                  {protocolos.filter(p => p.situacao === 'Pendente').length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="sig-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Protocolos</CardTitle>
              <CardDescription>
                Gerencie todos os protocolos do sistema
              </CardDescription>
            </div>
            <Input
              placeholder="Buscar protocolo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm sig-input"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Assunto</TableHead>
                  <TableHead>Requerente</TableHead>
                  <TableHead>Situação</TableHead>
                  <TableHead>Data Abertura</TableHead>
                  <TableHead>Prazo</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProtocolos.map((protocolo) => (
                  <TableRow key={protocolo.id}>
                    <TableCell className="font-mono font-medium">
                      #{protocolo.numero}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {protocolo.assunto}
                    </TableCell>
                    <TableCell>{protocolo.requerente}</TableCell>
                    <TableCell>{getSituacaoBadge(protocolo.situacao)}</TableCell>
                    <TableCell>{protocolo.dataAbertura}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {protocolo.prazo}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};