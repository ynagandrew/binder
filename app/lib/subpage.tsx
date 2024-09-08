'use client';
import React from 'react';


const Subpage = ({ title, content }) => {
    return (
        <main>
            <h2>{title}</h2>
            <p>{content}</p>
        </main>
    );
};

export default Subpage;