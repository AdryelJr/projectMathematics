import { Link } from 'react-router-dom'
import './style.scss'

export function Play() {
    return (
        <div className='container-play'>
            <h1>ESCOLHA A OPERAÇÃO</h1>

            <ul>
                <Link to="addition">ADIÇÃO</Link>
                <Link to="subtraction">SUBTRAÇÃO</Link>
                <Link to="multiplication">MULTIPLICAÇÃO</Link>
                <Link to="division">DIVISÃO</Link>
            </ul>
        </div>
    )
}