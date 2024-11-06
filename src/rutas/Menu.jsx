import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import firebaseServices from '../firebase/appConfig'; // Importamos el objeto firebaseServices
import Home from '../components/Home';
import ListProducts from '../components/ListProducts';
import RegisterProduct from '../components/RegisterProduct';
import EditForm from '../components/EditForm';
import { onAuthStateChanged } from "firebase/auth";
import Swal from 'sweetalert2'; // Importamos SweetAlert2
import '../index.css';

const { auth, signInWithGoogle, logout } = firebaseServices;

export default function Menu() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // PrivateRoute component to protect routes
    const PrivateRoute = ({ element, ...rest }) => {
        if (!user) {
            Swal.fire({
                title: '¡Acceso Denegado!',
                text: 'Por favor, inicie sesión para acceder a esta sección.',
                icon: 'warning',
                confirmButtonText: 'Cerrar',
            });
            return <Navigate to="/" />;
        }
        return element;
    };

    return (
        <BrowserRouter>
            <div className="app-container">
                <aside className="sidebar">
                    {user ? (
                        <>
                            <p className="letra-auth">Hola, {user.displayName}</p>
                            <button onClick={logout} className="logout-btn">Cerrar sesión</button>
                        </>
                    ) : (
                        <button onClick={signInWithGoogle} className="login-btn">Iniciar sesión con Google</button>
                    )}
                    <h2 className="logo">🌟 MiApp</h2>
                    <nav className="menu">
                        <Link to="/" className="menu-link">🏠 Home</Link>
                        <Link to="/productos" className="menu-link">📦 Productos</Link>
                        <Link to="/registro" className="menu-link">📝 Registro</Link>
                        <Link to="/prueba" className="menu-link">🔍 Prueba</Link>
                    </nav>
                </aside>

                <main className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/productos" element={<PrivateRoute element={<ListProducts />} />} />
                        <Route path="/registro" element={<PrivateRoute element={<RegisterProduct />} />} />
                        <Route path="/prueba" element={<PrivateRoute element={<RegisterProduct />} />} />
                        <Route path="/editar/:id" element={<PrivateRoute element={<EditForm />} />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}
