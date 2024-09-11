import {
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { getDatabase, ref, set, get, update } from "firebase/database";
import { ReactNode, createContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
    email: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
    signUpWithEmailAndPassword: (email: string, password: string, displayName: string) => Promise<void>;
    signInUserWithEmailAndPassword: (email: string, password: string) => Promise<void>;
    deslogar: () => Promise<void>;
    updateAvatar: (avatarUrl: string) => Promise<void>; // Nova função para atualizar o avatar
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | undefined>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : undefined;
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const { displayName, uid, email } = user;
                if (!displayName || !email) {
                    throw new Error('Missing information from Google Account.');
                }
                const defaultAvatar = "https://palestraparaprofessores.com.br/wp-content/webp-express/webp-images/uploads/2022/12/fotos-para-perfil-do-whatsapp.png.webp";

                const db = getDatabase();
                const userRef = ref(db, 'users/' + uid);
                const snapshot = await get(userRef);

                const avatar = snapshot.exists() ? snapshot.val().avatar || defaultAvatar : defaultAvatar;

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: avatar,
                    email: email
                });
            } else {
                setUser(undefined);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        if (result.user) {
            const { displayName, uid, email } = result.user;
            const defaultAvatar = "https://palestraparaprofessores.com.br/wp-content/webp-express/webp-images/uploads/2022/12/fotos-para-perfil-do-whatsapp.png.webp";

            const db = getDatabase();
            const userRef = ref(db, 'users/' + uid);
            const snapshot = await get(userRef);

            let avatar = defaultAvatar;
            if (snapshot.exists()) {
                const userData = snapshot.val();
                avatar = userData.avatar || defaultAvatar;
            } else {
                // Novo usuário, então defina o avatar padrão
                await set(userRef, {
                    name: displayName,
                    avatar: defaultAvatar,
                    email: email,
                    progress: {
                        addition: {
                            facil: false,
                            dificil: false,
                            concluido: false
                        },
                        subtraction: {
                            facil: false,
                            dificil: false,
                            concluido: false
                        },
                        multiplication: {
                            facil: false,
                            dificil: false,
                            concluido: false
                        },
                        division: {
                            facil: false,
                            dificil: false,
                            concluido: false
                        }
                    }
                });
            }

            const newUser: User = {
                id: uid,
                name: displayName || '',
                avatar: avatar,
                email: email || ''
            };
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));

            navigate('/');
        }
    };

    const signInUserWithEmailAndPassword = async (email: string, password: string) => {
        try {
            const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user) {
                const { uid, displayName, email } = user;
                const defaultAvatar = "https://palestraparaprofessores.com.br/wp-content/webp-express/webp-images/uploads/2022/12/fotos-para-perfil-do-whatsapp.png.webp";

                const db = getDatabase();
                const userRef = ref(db, 'users/' + uid);
                const snapshot = await get(userRef);

                let avatar = defaultAvatar;
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    avatar = userData.avatar || defaultAvatar;
                } else {
                    // Se o usuário não existir no banco de dados, configure o avatar padrão
                    await set(userRef, {
                        name: displayName || '',
                        avatar: defaultAvatar,
                        email: email || '',
                        progress: {
                            addition: {
                                facil: false,
                                dificil: false,
                                concluido: false
                            },
                            subtraction: {
                                facil: false,
                                dificil: false,
                                concluido: false
                            },
                            multiplication: {
                                facil: false,
                                dificil: false,
                                concluido: false
                            },
                            division: {
                                facil: false,
                                dificil: false,
                                concluido: false
                            }
                        }
                    });
                }

                const newUser: User = {
                    id: uid,
                    name: displayName || '',
                    avatar: avatar,
                    email: email || ''
                };
                setUser(newUser);
                localStorage.setItem('user', JSON.stringify(newUser));
                navigate('/');
            }
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error signing in: ${errorCode} - ${errorMessage}`);
        }
    };

    const signUpWithEmailAndPassword = async (email: string, password: string, displayName: string) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            if (result.user) {
                const defaultAvatar = "https://palestraparaprofessores.com.br/wp-content/webp-express/webp-images/uploads/2022/12/fotos-para-perfil-do-whatsapp.png.webp";
                await updateProfile(result.user, { displayName, photoURL: defaultAvatar });
                const { uid } = result.user;
                const newUser: User = {
                    id: uid,
                    name: displayName,
                    avatar: defaultAvatar,
                    email: email
                };
                setUser(newUser);
                localStorage.setItem('user', JSON.stringify(newUser));

                const db = getDatabase();
                const userRef = ref(db, 'users/' + uid);
                await set(userRef, {
                    name: displayName,
                    avatar: defaultAvatar,
                    email: email,
                    progress: {
                        addition: {
                            facil: false,
                            dificil: false,
                            concluido: false
                        },
                        subtraction: {
                            facil: false,
                            dificil: false,
                            concluido: false
                        },
                        multiplication: {
                            facil: false,
                            dificil: false,
                            concluido: false
                        },
                        division: {
                            facil: false,
                            dificil: false,
                            concluido: false
                        }
                    }
                });

                navigate('/');
            }
        } catch (error) {
            console.error('Error during sign up:', error);
            throw error;
        }
    };

    const deslogar = async () => {
        signOut(auth).then(() => {
            setUser(undefined);
            localStorage.removeItem('user');
        }).catch((error) => {
            console.log("Failed to sign out", error);
        });
    };

    const updateAvatar = async (avatarUrl: string) => {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + user?.id);
    
        await update(userRef, {
            avatar: avatarUrl
        });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signInWithGoogle,
                signUpWithEmailAndPassword,
                signInUserWithEmailAndPassword,
                deslogar,
                updateAvatar
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
