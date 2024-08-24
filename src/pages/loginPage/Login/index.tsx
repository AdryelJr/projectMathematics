import { FormEvent, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import './style.scss';

export function LoginOutlet() {
    const { signInUserWithEmailAndPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        try {
            await signInUserWithEmailAndPassword(trimmedEmail, trimmedPassword);
            setErrorMessage(null); 
        } catch (error: any) {
            console.error('Error signing in:', error);

            if (error.code === 'auth/invalid-email') {
                setErrorMessage('O endereço de e-mail é inválido.');
            } else if (error.code === 'auth/user-not-found') {
                setErrorMessage('Usuário não encontrado. Verifique o e-mail ou registre-se.');
            } else if (error.code === 'auth/wrong-password') {
                setErrorMessage('Senha incorreta. Verifique e tente novamente.');
            } else {
                setErrorMessage('Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.');
            }
            console.error('Error signing in:', error);
        }
    };

    return (
        <div className="content-form-login">
            <form onSubmit={handleSubmit}>
                <h3>LOGIN</h3>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <input
                    type="email"
                    placeholder='EMAIL'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={50}
                />
                <input
                    type="password"
                    placeholder='SENHA'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={20}
                />
                <button type="submit">LOGIN</button>
                <div className='link-register'>
                    <Link to='register'>NÃO TEM UMA CONTA? REGISTRE-SE</Link>
                </div>
            </form>
        </div>
    );
}
