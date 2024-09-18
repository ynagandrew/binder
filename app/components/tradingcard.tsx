'use client'
import React from 'react'
import { Button, Card, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import AddEditCard from "@/app/forms/AddEditCard";
const TradingCard = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    console.log("isOpen : ", isOpen);

    return (
        <>
            <Card onPress={onOpen} isPressable={true}>
                {/* PASS  onOpen TO onPress EVENT LISTENER*/}
            <Image
                removeWrapper
                alt="card image"
                src="/mitoma.png"/>
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} className="text-black">
                {/* PASS isOpen STATE FROM  useDisclosure HOOK*/}
                <ModalContent>

                    {(onClose) => (
                        <>
                            <ModalHeader>Edit Card</ModalHeader>
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
        </>
    )
}

export default TradingCard;