import React, { useState, useEffect } from 'react';
import { Card, CardBody } from "@nextui-org/card";
import AddEditCollection from '@/app/forms/AddEditCollection';
import { getCollections } from "@/api/api";
import {CardFooter} from "@nextui-org/react";

const Collections = () => {
    const [collectionData, setCollectionData] = useState([]);

    const fetchCollections = async () => {
        try {
            const collectionData = await getCollections();
            setCollectionData(collectionData);
        } catch (error) {
            console.error('Failed to fetch collections:', error);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);


    return (
        <div className= "gap-4 justify-items-center">
            <AddEditCollection collection={undefined} onSave={fetchCollections}/>

            {/* Render collection list here */}
            {collectionData.map((item) => (
                <Card>
                    <CardBody className="text-black">
                        <h1>{item.name}</h1>
                        <h1>{item.owner}</h1>
                    </CardBody>
                    <CardFooter>
                        <AddEditCollection collection={item} onSave={fetchCollections}/>
                    </CardFooter>
                </Card>
            ))}

        </div>
    );
};

export default Collections;
