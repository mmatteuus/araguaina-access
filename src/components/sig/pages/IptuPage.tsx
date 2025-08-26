import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building, Search, Download, Eye, AlertCircle } from 'lucide-react';

interface IptuRecord {
  id: string;
  ano: string;
  inscricao: string;
  situacao: string;
  valor: string;
  vencimento: string;
}

export const IptuPage: React.FC = () => {
  const [inscricao, setInscricao] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<IptuRecord[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simular busca na API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      const mockResults: IptuRecord[] = [
        {
          id: '1',
          ano: '2024',
          inscricao: inscricao || '12345-001',
          situacao: 'Em Aberto',
          valor: 'R$ 1.250,00',
          vencimento: '15/03/2024'
        },
        {
          id: '2',
          ano: '2023',
          inscricao: inscricao || '12345-001',
          situacao: 'Pago',
          valor: 'R$ 1.180,00',
          vencimento: '15/03/2023'
        },
        {
          id: '3',
          ano: '2022',
          inscricao: inscricao || '12345-001',
          situacao: 'Pago',
          valor: 'R$ 1.100,00',
          vencimento: '15/03/2022'
        }
      ];

      setResults(mockResults);
    } catch (err) {
      setError('Erro ao consultar IPTU. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPdf = (record: IptuRecord) => {
    // Simular download de PDF
    console.log('Downloading PDF for:', record.id);
    alert(`Download da 2ª via iniciado para ${record.ano}`);
  };

  const getSituacaoBadge = (situacao: string) => {
    const variant = situacao === 'Pago' ? 'default' : 
                   situacao === 'Em Aberto' ? 'destructive' : 'secondary';
    return <Badge variant={variant}>{situacao}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Building className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Consulta IPTU</h1>
      </div>

      <Card className="sig-card">
        <CardHeader>
          <CardTitle>Buscar Imóvel</CardTitle>
          <CardDescription>
            Informe a inscrição municipal e CPF/CNPJ para consultar débitos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inscricao">Inscrição Municipal *</Label>
                <Input
                  id="inscricao"
                  type="text"
                  placeholder="12345-001"
                  value={inscricao}
                  onChange={(e) => setInscricao(e.target.value)}
                  required
                  className="sig-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
                <Input
                  id="cpfCnpj"
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpfCnpj}
                  onChange={(e) => setCpfCnpj(e.target.value)}
                  required
                  className="sig-input"
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              disabled={isLoading}
              className="sig-btn-gov"
            >
              {isLoading ? (
                <>
                  <Search className="h-4 w-4 mr-2 animate-spin" />
                  Consultando...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Buscar IPTU
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card className="sig-card">
          <CardHeader>
            <CardTitle>Resultados da Consulta</CardTitle>
            <CardDescription>
              Débitos encontrados para a inscrição {results[0]?.inscricao}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ano</TableHead>
                    <TableHead>Situação</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.ano}</TableCell>
                      <TableCell>{getSituacaoBadge(record.situacao)}</TableCell>
                      <TableCell className="font-mono">{record.valor}</TableCell>
                      <TableCell>{record.vencimento}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadPdf(record)}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            2ª Via
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};