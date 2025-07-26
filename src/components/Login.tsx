import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Lock, User } from 'lucide-react';
import '../styles/Login.css';

interface LoginProps {
  onLogin: () => void;
}

interface FormData {
  username: string;
  password: string;
}

const Login = ({ onLogin }: LoginProps) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.username.trim() && formData.password.trim()) {
      onLogin();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Cygger</h1>
          <p>Accede a tu dashboard de análisis</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
