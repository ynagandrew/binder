'use client'
import React from 'react'
import { Button, Card, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import AddEditCard from "@/app/forms/AddEditCard";
import ThreeDModal from "@/app/components/3dmodal";
const TradingCard = ({card, onSave}) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Card onPress={onOpen} isPressable={true}>
                {/* PASS  onOpen TO onPress EVENT LISTENER*/}
            <Image
                removeWrapper
                alt="card image"
                src={card.front_image}/>
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} className="text-black">
                {/* PASS isOpen STATE FROM  useDisclosure HOOK*/}
                <ModalContent>

                    {(onClose) => (
                        <>
                            <ModalHeader>Card Details</ModalHeader>
                            <ModalBody>
                                <AddEditCard card={card} onSave={onSave}></AddEditCard>
                                <ThreeDModal card={card}></ThreeDModal>
                            </ModalBody>
                            <ModalFooter>

                                <Button color="success" variant="light"
                                        onPress={onClose}>
                                    {/* PASS  onClose OR ANY OTHER FUNCTION TO onPress EVENT LISTENER*/}
                                    CLOSE
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