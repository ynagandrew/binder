import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure } from "@nextui-org/react";
import {getCollection, createCollection, editCollection, deleteCollection} from '@/api/api';

export default function AddEditCollection({ collectionId, onSave }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal control hook
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');

    // Fetch collection details if editing
    useEffect(() => {
        if (collectionId) {
            const fetchCollection = async () => {
                const collection = await getCollection(collectionId);
                setName(collection.name);
                setOwner(collection.owner);
            };
            fetchCollection();
        } else {
            setName('');  // Reset form fields for adding new collection
            setOwner('');
        }
    }, [collectionId]);

    const handleSubmit = async () => {
        const collection = { name, owner };
        try {
            if (collectionId) {
                await editCollection(collectionId, collection);
            } else {
                await createCollection(collection);
            }
            onSave(); // Trigger parent component update
            onOpenChange(); // Close modal
        } catch (error) {
            console.error('Error saving collection:', error);
        }
    };

    const handleDelete = async () => {
        try {
            if (collectionId) {
                await deleteCollection(collectionId);
            }
            onSave();
            onOpenChange();
        } catch (error) {
            console.error('Error deleting collection:', error);
        }
    };

    return (
        <>
            <Button onPress={onOpen} color="primary">
                {collectionId ? 'Edit Collection' : 'Add New Collection'}
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {collectionId ? 'Edit Collection' : 'Add Collection'}
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Name"
                                    placeholder="Enter collection name"
                                    variant="bordered"
                                    defaultValue={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <Input
                                    label="Owner"
                                    placeholder="Enter owner name"
                                    variant="bordered"
                                    defaultValue={owner}
                                    onChange={(e) => setOwner(e.target.value)}
                                    required
                                />
                            </ModalBody>
                            <ModalFooter>
                                {collectionId && (
                                    <Button color="danger" onPress={handleDelete}>
                                        Delete
                                    </Button>
                                )}
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleSubmit}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
