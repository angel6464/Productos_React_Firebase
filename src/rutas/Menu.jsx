import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import ListProducts from '../components/ListProducts';
import RegisterProduct from '../components/RegisterProduct';
import EditForm from '../components/EditForm';
import '../index.css';

export default function Menu() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <aside className="sidebar">
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
                        <Route path='/' element={<Home />} />
                        <Route path='/productos' element={<ListProducts />} />
                        <Route path='/registro' element={<RegisterProduct />} />
                        <Route path='/prueba' element={<RegisterProduct />} />
                        <Route path='/editar/:id' element={<EditForm />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}
