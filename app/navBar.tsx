import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import * as test from "node:test";

const Home = lazy(() => import('./pages/home'));
const Collections = lazy(() => import('./pages/collections'));
const Cards = lazy(() => import('./pages/allCards'));
const Cardle = lazy(() => import('./pages/cardle'));
const Testing = lazy(() => import('./pages/testing'));

const pages = [
    { path: "/", name: "home", component: Home },
    { path: "/cards", name: "all cards", component: Cards },
    { path: "/collections", name: "collections", component: Collections },
    { path: "/cardle", name: "cardle", component: Cardle },
    { path: "/testing", name: "testing", component: Testing },
];

function NavBar() {
    return (
        <Router>
            <div className="grid grid-cols-[175px_1fr_175px] items-center">
                <div>
                    <nav>
                        <ul>
                            {pages.map((page) => (
                                <li key={page.path}>
                                    <NavLink
                                        to={page.path}
                                        className={({ isActive }) => (isActive ? 'active' : '')}
                                        end={page.path === '/'}
                                    >
                                        {page.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="flex flex-col items-center justify-items-center">
                    {/* Wrap routes in Suspense to handle the lazy-loaded components */}
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            {pages.map((page) => (
                                <Route
                                    key={page.path}
                                    path={page.path}
                                    element={<page.component />} // Render the component here
                                />
                            ))}
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </Router>
    );
}

export default NavBar;