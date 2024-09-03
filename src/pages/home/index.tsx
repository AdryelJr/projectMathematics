import './style.scss';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';

export function Home() {
    const [isVisible, setIsVisible] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar o menu
    const { user, deslogar } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        setIsVisible(false);

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300); // Duração da transição

        return () => clearTimeout(timer);
    }, [location.pathname]);

    function sair() {
        deslogar();
    }

    // Função que fecha o menu ao clicar em um link
    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const equations = [
        '2 + 2 = 4', '3 x 3 = 9', '5 - 2 = 3', '8 ÷ 2 = 4',
        '7 + 1 = 8', '6 x 6 = 36', '9 - 3 = 6', '12 ÷ 4 = 3',
        '10 + 5 = 15', '4 x 4 = 16', '14 - 7 = 7', '20 ÷ 5 = 4',
        '3 + 7 = 10', '9 x 2 = 18', '8 - 4 = 4', '15 ÷ 3 = 5',
        '11 + 6 = 17', '7 x 7 = 49', '14 - 5 = 9', '18 ÷ 6 = 3'
    ];

    function getRandomPosition() {
        const top = Math.floor(Math.random() * 85) + 5; // 5% a 90% da altura
        const left = Math.floor(Math.random() * 80) + 10; // 10% a 90% da largura
        return { top: `${top}%`, left: `${left}%` };
    }

    return (
        <div className={`main-container ${isVisible ? 'fade-in' : 'fade-out'}`}>
            <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>

            <div className={`div-opcoes ${menuOpen ? 'open' : ''}`}>
                <Link to='/' className={isActive('/') || isActive('/addition') || isActive('/subtraction') || isActive('/multiplication') || isActive('/division') ? 'active' : ''} onClick={handleLinkClick}>JOGAR</Link>
                <Link to='/profile' className={isActive('/profile') ? 'active' : ''} onClick={handleLinkClick}>PERFIL</Link>
                <button onClick={() => { sair(); handleLinkClick(); }}>SAIR</button>
            </div>

            <div className='div-content'>
                <main>
                    <div className="math-background">
                        {[...Array(5)].map((_, index) => {
                            const position = getRandomPosition();
                            return (
                                <div
                                    key={index}
                                    className={`math-equation animation-${index % 3}`}
                                    style={position}
                                >
                                    {equations[Math.floor(Math.random() * equations.length)]}
                                </div>
                            );
                        })}
                    </div>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}