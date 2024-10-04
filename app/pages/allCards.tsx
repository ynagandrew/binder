'use client';
import React, { useEffect, useState } from 'react';
import { useDisclosure } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { getCards } from "@/api/api";
import AddEditCard from "@/app/forms/AddEditCard";
import TradingCard from "@/app/components/tradingcard";

const AllCards = () => {
    const [cardData, setCardData] = useState([]); // Initialize as an empty array
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const fetchCards = async () => {
        try {
            const data = await getCards();
            setCardData(data);
        } catch (error) {
            console.error("Failed to fetch card data:", error);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    return (
        <div>
            <div className="gap-4 grid grid-cols-2 lg:grid-cols-3 justify-items-center">
                {cardData && cardData.length > 0 ? ( // Check if cardData exists and has length
                    cardData.map((item) => (
                        <TradingCard card={item} onSave={fetchCards}/>

                    ))
                ) : (
                    <Spinner color="default"/>
                )}
                <AddEditCard onSave={fetchCards}/>
            </div>
        </div>
    );
};

export default AllCards;
