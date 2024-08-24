import { FormEvent, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

export function RegisterOutlet() {
    const { signUpWithEmailAndPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        
        try {
            await signUpWithEmailAndPassword(trimmedEmail, trimmedPassword, displayName);
            setErrorMessage(null);
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('Este e-mail já está em uso. Por favor, utilize outro e-mail.');
            } else if (error.code === 'auth/invalid-email') {
                setErrorMessage('O endereço de e-mail é inválido.');
            } else if (error.code === 'auth/weak-password') {
                setErrorMessage('A senha é muito fraca. Por favor, utilize uma senha mais forte.');
            } else {
                setErrorMessage('Ocorreu um erro ao tentar criar sua conta. Por favor, tente novamente.');
            }
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="content-form-login">
            <form onSubmit={handleSubmit}>
                <h3>REGISTER</h3>
                <input
                    type="text"
                    placeholder='NOME'
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    maxLength={50}
                />
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
                <button type="submit">REGISTRAR</button>
                <div className='link-register'>
                    <Link to='login'>JÁ TEM UMA CONTA? FAÇA LOGIN</Link>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
}
