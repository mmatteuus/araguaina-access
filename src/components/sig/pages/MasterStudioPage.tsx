import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Settings, 
  Palette, 
  Users, 
  Code, 
  Shield, 
  Plus, 
  Trash2,
  Save,
  Upload,
  Eye
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  group: string;
  icon: string;
  permissions: string[];
}

export const MasterStudioPage: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'home',
      title: 'Início',
      group: 'Geral',
      icon: '🏠',
      permissions: ['*']
    },
    {
      id: 'iptu',
      title: 'Consulta IPTU',
      group: 'Tributos',
      icon: '🏢',
      permissions: ['CIDADAO', 'SERVIDOR_TRIBUTOS', 'MASTER']
    }
  ]);

  const [userPermissions, setUserPermissions] = useState<Record<string, string[]>>({});
  const [customCSS, setCustomCSS] = useState('');
  const [customJS, setCustomJS] = useState('');
  const [permissionCpf, setPermissionCpf] = useState('');
  const [permissionModules, setPermissionModules] = useState('');

  const handleAddModule = () => {
    const newModule: Module = {
      id: `custom_${Date.now()}`,
      title: 'Novo Módulo',
      group: 'Personalizados',
      icon: '📋',
      permissions: ['MASTER']
    };
    setModules([...modules, newModule]);
  };

  const handleRemoveModule = (id: string) => {
    setModules(modules.filter(m => m.id !== id));
  };

  const handleUpdateModule = (id: string, field: keyof Module, value: string) => {
    setModules(modules.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const handleSavePermissions = () => {
    if (!permissionCpf) return;
    
    const moduleList = permissionModules === '*' ? ['*'] : 
                      permissionModules.split(',').map(s => s.trim());
    
    setUserPermissions({
      ...userPermissions,
      [permissionCpf]: moduleList
    });
    
    setPermissionCpf('');
    setPermissionModules('');
  };

  const handleApplyCustomizations = () => {
    // Em produção, salvar no localStorage ou enviar para API
    console.log('Applying customizations:', { customCSS, customJS });
    alert('Personalizações aplicadas com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Settings className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Master Studio</h1>
        <Badge variant="outline" className="sig-badge-primary">MASTER</Badge>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Atenção:</strong> Esta área permite personalizar completamente o sistema.
          Mudanças aqui afetam todos os usuários.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="modules">Módulos</TabsTrigger>
          <TabsTrigger value="permissions">Permissões</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="advanced">Avançado</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          <Card className="sig-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Gerenciar Módulos</span>
                <Button onClick={handleAddModule} size="sm" className="sig-btn-gov">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </CardTitle>
              <CardDescription>
                Configure ícones, títulos e permissões dos módulos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modules.map((module) => (
                  <Card key={module.id} className="border">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <Label>Ícone</Label>
                          <Input
                            value={module.icon}
                            onChange={(e) => handleUpdateModule(module.id, 'icon', e.target.value)}
                            className="text-center text-lg"
                          />
                        </div>
                        <div>
                          <Label>Título</Label>
                          <Input
                            value={module.title}
                            onChange={(e) => handleUpdateModule(module.id, 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Grupo</Label>
                          <Input
                            value={module.group}
                            onChange={(e) => handleUpdateModule(module.id, 'group', e.target.value)}
                          />
                        </div>
                        <div className="flex items-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveModule(module.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card className="sig-card">
            <CardHeader>
              <CardTitle>Controle de Acesso</CardTitle>
              <CardDescription>
                Defina quais módulos cada usuário pode acessar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="permCpf">CPF do Usuário</Label>
                  <Input
                    id="permCpf"
                    placeholder="000.000.000-00"
                    value={permissionCpf}
                    onChange={(e) => setPermissionCpf(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="permMods">Módulos (separados por vírgula) ou *</Label>
                  <Input
                    id="permMods"
                    placeholder="iptu, protocolos ou *"
                    value={permissionModules}
                    onChange={(e) => setPermissionModules(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={handleSavePermissions} className="sig-btn-gov">
                <Save className="h-4 w-4 mr-2" />
                Salvar Permissões
              </Button>

              <div className="space-y-2">
                <h4 className="font-medium">Permissões Ativas:</h4>
                {Object.entries(userPermissions).map(([cpf, mods]) => (
                  <div key={cpf} className="flex items-center justify-between p-2 bg-surface-subtle rounded">
                    <span className="font-mono">{cpf}</span>
                    <Badge variant="outline">
                      {Array.isArray(mods) ? mods.join(', ') : mods}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card className="sig-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Personalização Visual</span>
              </CardTitle>
              <CardDescription>
                Customize CSS e JavaScript do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customCss">CSS Customizado</Label>
                <Textarea
                  id="customCss"
                  rows={8}
                  placeholder="/* Adicione seu CSS aqui */
.custom-button {
  background: linear-gradient(45deg, #007bff, #0056b3);
}"
                  value={customCSS}
                  onChange={(e) => setCustomCSS(e.target.value)}
                  className="font-mono"
                />
              </div>
              
              <div>
                <Label htmlFor="customJs">JavaScript Customizado</Label>
                <Textarea
                  id="customJs"
                  rows={6}
                  placeholder="// Adicione seu JavaScript aqui
console.log('Sistema SIG carregado!');"
                  value={customJS}
                  onChange={(e) => setCustomJS(e.target.value)}
                  className="font-mono"
                />
              </div>

              <Button onClick={handleApplyCustomizations} className="sig-btn-gov">
                <Save className="h-4 w-4 mr-2" />
                Aplicar Personalizações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card className="sig-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-5 w-5" />
                <span>Configurações Avançadas</span>
              </CardTitle>
              <CardDescription>
                Configurações técnicas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Exportar Configuração</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Baixar Config JSON
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Importar Configuração</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Carregar Config JSON
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Em produção, todas as configurações devem ser salvas em banco de dados
                  e versionadas adequadamente.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};