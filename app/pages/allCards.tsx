import React, { useEffect, useState } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader, useDisclosure
} from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { Button } from "@nextui-org/button";
import { getCards } from "@/api/api";
import AddEditCard from "@/app/forms/AddEditCard";

const AllCards = () => {
    const [cardData, setCardData] = useState([]); // Initialize as an empty array
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const data = await getCards();
                setCardData(data);
            } catch (error) {
                console.error("Failed to fetch card data:", error);
            }
        };

        fetchCards();
    }, []);

    return (
        <div>
            <div className="gap-4 grid grid-cols-2 lg:grid-cols-3 justify-items-center">
                {cardData && cardData.length > 0 ? ( // Check if cardData exists and has length
                    cardData.map((item) => (
                        <Card shadow="sm" key={item.id} isPressable onPress={() => console.log(`${item.player} card pressed`)}>
                            <CardBody className="overflow-visible p-0">
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={item.player}
                                    className="w-full object-cover h-[140px]"
                                    src={item.image} // Use the image link from your card data
                                />
                            </CardBody>

                        </Card>
                    ))
                ) : (
                    <Spinner color="default"/>
                )}
                <Button onPress={onOpen}>
                    Add card
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} className="text-black">
                    {/* PASS isOpen STATE FROM  useDisclosure HOOK*/}
                    <ModalContent>

                        {(onClose) => (
                            <>
                                <ModalHeader>Add card</ModalHeader>
                                <ModalBody>
                                    <AddEditCard></AddEditCard>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant = "light"
                                            onPress={onClose}>
                                        {/* PASS  onClose FUNCTION TO onPress EVENT LISTENER*/}
                                        DELETE
                                    </Button>
                                    <Button color="danger" variant="light"
                                            onPress={onClose}>
                                        {/* PASS  onClose FUNCTION TO onPress EVENT LISTENER*/}
                                        CANCEL
                                    </Button>
                                    <Button color="success" variant="light"
                                            onPress={onClose}>
                                        {/* PASS  onClose OR ANY OTHER FUNCTION TO onPress EVENT LISTENER*/}
                                        ACCEPT
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
};

export default AllCards;
