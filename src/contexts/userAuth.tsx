import { signInWithPopup, GoogleAuthProvider, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { ReactNode, createContext, useEffect, useState } from 'react';
import { signOut } from "firebase/auth";
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
    signInUserWithEmailAndPassword: (email: string, password: string) => Promise<void>; // Renomeado
    deslogar: () => Promise<void>;
    updateName: (displayNameInput: string) => Promise<void>;
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
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid, email } = user;
                if (!displayName || !photoURL || !email) {
                    throw new Error('Missing information from Google Account.');
                }
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                    email: email
                });
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
            const { displayName, photoURL, uid, email } = result.user;
            if (!displayName || !photoURL || !email) {
                throw new Error('Missing information from Google Account.');
            }
            const newUser: User = {
                id: uid,
                name: displayName,
                avatar: photoURL,
                email: email
            };
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));

            const db = getDatabase();
            const userRef = ref(db, 'users/' + uid);
            const snapshot = await get(userRef);
            if (!snapshot.exists()) {
                set(userRef, {
                    name: displayName,
                    avatar: photoURL,
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

            navigate('/');
        }
    };

    const signUpWithEmailAndPassword = async (email: string, password: string, displayName: string) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            if (result.user) {
                await updateProfile(result.user, { displayName });
                const { uid, photoURL } = result.user;
                const newUser: User = {
                    id: uid,
                    name: displayName,
                    avatar: photoURL || '',
                    email: email
                };
                setUser(newUser);
                localStorage.setItem('user', JSON.stringify(newUser));

                const db = getDatabase();
                const userRef = ref(db, 'users/' + uid);
                await set(userRef, {
                    name: displayName,
                    avatar: photoURL || '',
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


    const signInUserWithEmailAndPassword = async (email: string, password: string) => {
        try {
            const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user) {
                const { uid, displayName, photoURL, email } = user;
                const newUser: User = {
                    id: uid,
                    name: displayName || '',
                    avatar: photoURL || '',
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



    const deslogar = async () => {
        signOut(auth).then(() => {
            setUser(undefined);
            localStorage.removeItem('user');
        }).catch((error) => {
            console.log("Failed to sign out", error);
        });
    };

    const updateName = async (displayNameInput: string) => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            await updateProfile(currentUser, {
                displayName: displayNameInput
            });

            setUser(prevUser => {
                if (prevUser) {
                    const updatedUser = { ...prevUser, name: displayNameInput };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    return updatedUser;
                }
                return prevUser;
            });
        }
    };


    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signUpWithEmailAndPassword, signInUserWithEmailAndPassword, deslogar, updateName }}>
            {props.children}
        </AuthContext.Provider>
    );
}
