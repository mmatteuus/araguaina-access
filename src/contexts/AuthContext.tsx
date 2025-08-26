import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'MASTER' | 'CIDADAO' | 'SERVIDOR_TRIBUTOS' | 'SERVIDOR_ATENDIMENTO' | 'SERVIDOR_RH';

export interface User {
  cpf: string;
  role: UserRole;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (cpf: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (cpf: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock authentication - em produção conectar com o BFF
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulação baseada no CPF final
      const role: UserRole = cpf.endsWith('0') ? 'MASTER' : 
                            cpf.endsWith('1') ? 'SERVIDOR_TRIBUTOS' :
                            cpf.endsWith('2') ? 'SERVIDOR_ATENDIMENTO' :
                            cpf.endsWith('3') ? 'SERVIDOR_RH' : 'CIDADAO';
      
      const userData: User = {
        cpf: cpf.replace(/\D/g, ''),
        role,
        name: role === 'MASTER' ? 'Administrador' : 
              role === 'CIDADAO' ? 'Cidadão' : 
              `Servidor ${role.split('_')[1]}`
      };
      
      setUser(userData);
      localStorage.setItem('sig_user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Falha na autenticação');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sig_user');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('sig_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('sig_user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};