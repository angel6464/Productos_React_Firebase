import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import firebaseServices from '../firebase/appConfig'; // Importamos el objeto firebaseServices
import Home from '../components/Home';
import ListProducts from '../components/ListProducts';
import RegisterProduct from '../components/RegisterProduct';
import EditForm from '../components/EditForm';
import { onAuthStateChanged } from "firebase/auth";
import Swal from 'sweetalert2';  // Importa SweetAlert2
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

    // Función para manejar el inicio de sesión con Google
    const handleGoogleSignIn = async () => {
        try {
            console.log("Iniciando sesión con Google...");
            // Muestra un SweetAlert indicando que la sesión está iniciando
            Swal.fire({
                title: 'Iniciando sesión...',
                text: 'Por favor espera mientras se autentica con Google.',
                icon: 'info',
                allowOutsideClick: false,  // Impide cerrar el alerta mientras se espera
                showConfirmButton: true,  // No muestra botón de confirmación
                willOpen: () => {
                    Swal.showLoading();  // Muestra el icono de carga
                },
            });

            // Llama a la función de inicio de sesión
            await signInWithGoogle();

            // Cierra el SweetAlert cuando la autenticación se haya completado
            Swal.close();
        } catch (error) {
            // Si ocurre un error, mostramos un SweetAlert de error
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al intentar iniciar sesión con Google.',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
            console.error("Error al iniciar sesión con Google", error);
        }
    };

    // PrivateRoute component to protect routes
    const PrivateRoute = ({ element, ...rest }) => {
        if (!user) {
            // Si no está autenticado, mostramos SweetAlert
            Swal.fire({
                title: 'Necesitas iniciar sesión',
                text: 'Para acceder a esta página, por favor, inicia sesión con Google.',
                icon: 'warning',
                confirmButtonText: 'Iniciar sesión',
                allowOutsideClick: false,
            }).then(() => {
                // Si el usuario acepta, redirigimos al inicio de sesión
             
            });
            return <Navigate to="/" />;  // Redirige a la página de inicio
        }
        return element;  // Si está autenticado, renderiza la ruta
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
                        // Aquí mantenemos el modal de Google sign-in
                        <button onClick={handleGoogleSignIn} className="login-btn">Iniciar sesión con Google</button>
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
