import './style.scss';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import img1 from '../../assets/img/img1.jpg';
import img2 from '../../assets/img/img2.jpg';
import img3 from '../../assets/img/img3.png';
import img4 from '../../assets/img/img4.png';
import { useAuth } from '../../hooks/useAuth';
import svgTrofeu from '../../assets/svg/trofeu.svg';
import imgTrofeu from '../../assets/img/trofeu.png';

interface QuestionData {
    correctAnswer: string;
    isCorrect: boolean;
    question: string;
    selectedAnswer: string;
}

export function Profile() {
    const { user, updateAvatar } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string>('');
    const [loadingAvatar, setLoadingAvatar] = useState(true);

    useEffect(() => {
        if (!user?.id) return;
        const db = getDatabase();
        const userRef = ref(db, 'users/' + user.id);
        const unsubscribe = onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            if (userData && userData.avatar) {
                setAvatar(userData.avatar);
                setLoadingAvatar(true);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [user?.id]);

    const handleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleImageSelect = (imgSrc: string) => {
        setSelectedImage(imgSrc);
    };

    const handleSubmit = async () => {
        if (selectedImage && updateAvatar) {
            await updateAvatar(selectedImage);
            handleModal();
        }
    };

    const handleImageLoad = () => {
        setLoadingAvatar(false);
    };


    // PAGINA CONQUISTA ------------------------------------------------------------------------
    const [conquistas, setConquistas] = useState({
        additionEasy: false,
        additionHard: false,
        subtractionEasy: false,
        subtractionHard: false,
        multiplicationEasy: false,
        multiplicationHard: false,
        divisionEasy: false,
        divisionHard: false
    });

    useEffect(() => {
        if (!user?.id) return;

        const db = getDatabase();
        const answersRef = ref(db, `users/${user.id}/answers`);

        const unsubscribe = onValue(answersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const newConquistas = {
                    additionEasy: checkConquista(data.addition?.easy),
                    additionHard: checkConquista(data.addition?.hard),
                    subtractionEasy: checkConquista(data.subtraction?.easy),
                    subtractionHard: checkConquista(data.subtraction?.hard),
                    multiplicationEasy: checkConquista(data.multiplication?.easy),
                    multiplicationHard: checkConquista(data.multiplication?.hard),
                    divisionEasy: checkConquista(data.division?.easy),
                    divisionHard: checkConquista(data.division?.hard),
                };
                setConquistas(newConquistas);
            }
        });

        return () => unsubscribe();
    }, [user?.id]);

    // Verifica se todas as perguntas foram respondidas corretamente
    const checkConquista = (nivel: Record<string, QuestionData> | undefined): boolean => {
        if (!nivel) return false;
        return Object.values(nivel).every((question) => question.isCorrect);
    };


    return (
        <div className='container-profile'>
            <div className='profile'>
                <div className='div-img'>
                    {loadingAvatar && <div className='di-loading'>
                        <div className='div-loading'>
                        </div>
                    </div>}
                    <img className='img-modal' src={avatar} onLoad={handleImageLoad} />
                </div>
                <button className='btn-modal' onClick={handleModal}>Mudar avatar</button>

                <div className='info-profile'>
                    <p>Nome: <br /> {user?.name}</p>
                    <p>Email: <br />{user?.email}</p>
                </div>
            </div>


            <div className='conquistas'>
                <div className="conquistas-page">
                    <h1>Conquistas</h1>
                    <div className="conquistas-grid">
                        {/* Adição */}
                        <div className="conquista">
                            <img src={conquistas.additionEasy ? imgTrofeu : svgTrofeu} className={conquistas.additionEasy ? 'trofeu-colorido' : ''} alt="Troféu Adição Fácil" />
                            <p>Acerte todas as questões <h2>Adição Fácil</h2> </p>
                        </div>
                        <div className="conquista">
                            <img src={conquistas.additionHard ? imgTrofeu : svgTrofeu} className={conquistas.additionHard ? 'trofeu-colorido' : ''} alt="Troféu Adição Difícil" />
                            <p>Acerte todas as questões <h2>Adição Difícil</h2> </p>
                        </div>

                        {/* Subtração */}
                        <div className="conquista">
                            <img src={conquistas.subtractionEasy ? imgTrofeu : svgTrofeu} className={conquistas.subtractionEasy ? 'trofeu-colorido' : ''} alt="Troféu Subtração Fácil" />
                            <p>Acerte todas as questões <h2>Subtração Fácil</h2> </p>
                        </div>
                        <div className="conquista">
                            <img src={conquistas.subtractionHard ? imgTrofeu : svgTrofeu} className={conquistas.subtractionHard ? 'trofeu-colorido' : ''} alt="Troféu Subtração Difícil" />
                            <p>Acerte todas as questões <h2>Subtração Difícil</h2> </p>
                        </div>

                        {/* Multiplicação */}
                        <div className="conquista">
                            <img src={conquistas.multiplicationEasy ? imgTrofeu : svgTrofeu} className={conquistas.multiplicationEasy ? 'trofeu-colorido' : ''} alt="Troféu Multiplicação Fácil" />
                            <p>Acerte todas as questões <h2>Multiplicação Fácil</h2> </p>
                        </div>
                        <div className="conquista">
                            <img src={conquistas.multiplicationHard ? imgTrofeu : svgTrofeu} className={conquistas.multiplicationHard ? 'trofeu-colorido' : ''} alt="Troféu Multiplicação Difícil" />
                            <p>Acerte todas as questões <h2>Multiplicação Difícil</h2> </p>
                        </div>

                        {/* Divisão */}
                        <div className="conquista">
                            <img src={conquistas.divisionEasy ? imgTrofeu : svgTrofeu} className={conquistas.divisionEasy ? 'trofeu-colorido' : ''} alt="Troféu Divisão Fácil" />
                            <p>Acerte todas as questões <h2>Divisão Fácil</h2> </p>
                        </div>
                        <div className="conquista">
                            <img src={conquistas.divisionHard ? imgTrofeu : svgTrofeu} className={conquistas.divisionHard ? 'trofeu-colorido' : ''} alt="Troféu Divisão Difícil" />
                            <p>Acerte todas as questões <h2>Divisão Difícil</h2> </p>
                        </div>
                    </div>
                </div>
            </div>


            {modalOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h1>Escolha seu avatar</h1> <br />
                        <div className='div-img-profile'>
                            <img
                                src={img1}
                                alt="Avatar 1"
                                className={selectedImage === img1 ? 'selected' : ''}
                                onClick={() => handleImageSelect(img1)}
                            />
                            <img
                                src={img2}
                                alt="Avatar 2"
                                className={selectedImage === img2 ? 'selected' : ''}
                                onClick={() => handleImageSelect(img2)}
                            /> <br />
                            <img
                                src={img3}
                                alt="Avatar 3"
                                className={selectedImage === img3 ? 'selected' : ''}
                                onClick={() => handleImageSelect(img3)}
                            />
                            <img
                                src={img4}
                                alt="Avatar 4"
                                className={selectedImage === img4 ? 'selected' : ''}
                                onClick={() => handleImageSelect(img4)}
                            />
                        </div>
                        <button onClick={handleSubmit}>ENVIAR</button>
                        <button className='btn-close' onClick={handleModal}>X</button>
                    </div>
                </div>
            )}
        </div>
    );
}
