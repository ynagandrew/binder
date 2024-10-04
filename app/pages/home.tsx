import React from 'react';
import { Button } from '@nextui-org/button';
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const Home: React.FC = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleButtonClick = () => {
        navigate('/collections'); // Navigate to the collections page
    };

    return (
        <>
            <h1>welcome to binder. this is a project to store and view sports trading cards in collections.</h1>
            <h1>start by pressing the button below and making your first collection.</h1>
            <Button onPress={handleButtonClick}>add your first collection!</Button>
        </>
    );
};

export default Home;
