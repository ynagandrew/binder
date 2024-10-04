import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure } from "@nextui-org/react";
import {createCollection, editCollection, deleteCollection} from '@/api/api';

export default function AddEditCollection({ collection, onSave }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal control hook
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');

    // Fetch collection details if editing
    useEffect(() => {
        if (collection) {
            setName(collection.name);
            setOwner(collection.owner);

        } else {
            setName('');  // Reset form fields for adding new collection
            setOwner('');
        }
    }, [collection]);



    const handleSubmit = async () => {
        const new_collection = { name, owner };
        try {
            if (collection) {
                await editCollection(collection.id, new_collection);
            } else {
                await createCollection(new_collection);
                setName('');  // Reset form fields for adding new collection
                setOwner('');
            }
            onSave(); // Trigger parent component update
            onOpenChange(); // Close modal
        } catch (error) {
            console.error('Error saving collection:', error);
        }
    };

    const handleDelete = async () => {
        try {
            if (collection) {
                await deleteCollection(collection.id);
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
                {collection ? 'Edit Collection' : 'Add New Collection'}
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} placement="top-center" className='text-black'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {collection ? 'Edit Collection' : 'Add Collection'}
                            </ModalHeader>
                            <ModalBody className='text-black'>
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
                                {collection && (
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
