import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Subpage from './subpage';

const pages = [
    { path: "/", name: "home", text: "" },
    { path: "/about", name: "collections", text: "" },
    { path: "/contact", name: "cards", text: "" },
    { path: "/portfolio", name: "quizzes", text: "" }
];

function NavBar() {
    return (
        <Router>
            <div className="App">
                <header>
                    <h1>binder</h1>
                </header>

                <nav>
                    <ul>
                        {pages.map(page => (
                            <li key={page.path}>
                                <NavLink
                                    to={page.path}
                                    className={({ isActive }) => isActive ? "active" : ""}
                                    end={page.path === "/"}
                                >
                                    {page.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <Routes>
                    {pages.map(page => (
                        <Route
                            key={page.path}
                            path={page.path}
                            element={<Subpage title={page.name} content={page.text} />}
                        />
                    ))}
                </Routes>

                <footer>
                    <p> </p>
                </footer>
            </div>
        </Router>
    );
}

export default NavBar;