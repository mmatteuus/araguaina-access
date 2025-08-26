import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DollarSign, Download, Calendar, FileText, User } from 'lucide-react';

export const RhPage: React.FC = () => {
  const [competencia, setCompetencia] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownloadContracheque = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!competencia) {
        throw new Error('Selecione uma competência');
      }

      // Simular download
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Em produção, fazer chamada para API
      console.log('Downloading contracheque for:', competencia);
      alert(`Download do contracheque de ${competencia} iniciado!`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao gerar contracheque');
    } finally {
      setIsLoading(false);
    }
  };

  const currentMonth = new Date().toISOString().slice(0, 7);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <DollarSign className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Recursos Humanos</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="sig-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Funcionários</p>
                <p className="text-2xl font-bold">1.247</p>
              </div>
              <User className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="sig-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Folha Atual</p>
                <p className="text-2xl font-bold">R$ 2.1M</p>
              </div>
              <DollarSign className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="sig-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Contracheques</p>
                <p className="text-2xl font-bold">1.247</p>
              </div>
              <FileText className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="sig-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Gerar Contracheque</span>
          </CardTitle>
          <CardDescription>
            Selecione a competência para download do contracheque em PDF
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDownloadContracheque} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="competencia">Competência (Mês/Ano) *</Label>
              <Input
                id="competencia"
                type="month"
                value={competencia}
                onChange={(e) => setCompetencia(e.target.value)}
                max={currentMonth}
                required
                className="sig-input"
              />
              <p className="text-xs text-muted-foreground">
                Selecione o mês e ano da folha de pagamento
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              disabled={isLoading || !competencia}
              className="sig-btn-gov"
            >
              {isLoading ? (
                <>
                  <Download className="h-4 w-4 mr-2 animate-pulse" />
                  Gerando PDF...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Contracheque
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="sig-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Histórico de Competências</span>
          </CardTitle>
          <CardDescription>
            Últimas competências disponíveis para download
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { mes: '2024-01', status: 'Disponível' },
              { mes: '2023-12', status: 'Disponível' },
              { mes: '2023-11', status: 'Disponível' },
              { mes: '2023-10', status: 'Disponível' },
              { mes: '2023-09', status: 'Disponível' },
              { mes: '2023-08', status: 'Arquivado' }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-surface-subtle transition-colors"
              >
                <div>
                  <p className="font-medium">
                    {new Date(item.mes + '-01').toLocaleDateString('pt-BR', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.status}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setCompetencia(item.mes)}
                  disabled={item.status === 'Arquivado'}
                >
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};