import { useAuth } from '../../../hooks/useAuth';
import './style.scss'

export function ButtonSair() {
    const { deslogar } = useAuth();

    function sair() {
        deslogar();
    }
    return (
        <div>
            <button className="ButtonSair" onClick={sair}>Sair</button>
        </div>
    )
}