import './style.scss';
import { useState } from 'react';
import img1 from '../../assets/img/img1.jpg';
import img2 from '../../assets/img/img2.jpg';
import img3 from '../../assets/img/img3.png';
import img4 from '../../assets/img/img4.png';
import { useAuth } from '../../hooks/useAuth';

export function Profile() {
    const { user, updateAvatar } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

    return (
        <div className='container-profile'>
            <div className='profile'>
                <img className='img-modal' src={user?.avatar} alt="Avatar" />
                <button className='btn-modal' onClick={handleModal}>Mudar avatar</button>

                <div className='info-profile'>
                    <p>Nome: {user?.name}</p>
                    <p>Email: {user?.email}</p>
                </div>
            </div>

            <div className='conquistas'>
                CONQUISTAS
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
