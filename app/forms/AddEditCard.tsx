'use client';
import { React, useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/modal";
import {Input} from "@nextui-org/input";
import {Select, SelectSection, SelectItem} from "@nextui-org/select";
import {getCard, createCard, editCard, deleteCard, getCollections} from "@/api/api";
import {Checkbox} from "@nextui-org/checkbox";
import {CARD_MODAL_DATA, EMPTY_CARD, LEAGUE_DATA} from "@/public/card_data";
import {Button, useDisclosure} from "@nextui-org/react";

import ImageUpload from "@/app/components/imageupload";

export default function AddEditCard({card, onSave}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal control hook
    const [values, setValues] = useState(EMPTY_CARD);
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
        if (card) {
            setValues(card);
        }
        fetchCollections();
    }, [card]);

    const updateValue = (field, value) => {
        setValues(prevValues => ({
            ...prevValues,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        const new_card = values;
        console.log(new_card)
        try {
            if (card) {
                await editCard(card.id, new_card);
            } else {
                await createCard(new_card);
                setValues(EMPTY_CARD);
            }
            onSave();
            onOpenChange();
        } catch (error) {
            console.error('Error saving card:', error);
        }
    };

    const handleDelete = async () => {
        try {
            if (card) {
                await deleteCard(card.id);
            }
            onSave();
            onOpenChange();
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    const renderField = (key, field) => {
        switch (field.type) {
            case "Input":
                return (
                    <Input
                        key={key}
                        defaultValue={values[key]}
                        label={field.label}
                        placeholder={field.placeholder}
                        type={field.inputType || "text"} // Default to "text" if inputType is not provided
                        onChange={(e) => {
                            const value = field.inputType === "number" ? Number(e.target.value) : e.target.value;
                            updateValue(key, value);
                        }}
                    />
                );
            case "Checkbox":
                return (
                    <Checkbox
                        className='text-black'
                        key={key}
                        defaultSelected={values[key]}
                        onChange={(e) => updateValue(key, e.target.checked)}
                    >
                        {field.label}
                    </Checkbox>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Button onPress={onOpen} color="primary">
                {card ? 'Edit Card' : 'Add New Card'}
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} scrollBehavior='inside' placement="top-center" className='text-black' size='4xl'>
                <ModalContent className='text-black'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {card ? 'Edit Card' : 'Add Card'}
                            </ModalHeader>
                            <ModalBody className='text-black'>
                                <Select
                                    label="Collection"
                                    defaultSelectedKeys={[values.collection_id ? String(values.collection_id) : '']}
                                    placeholder="Select Collection"
                                    items={collectionData}
                                    onChange={(e) => updateValue('collection_id', Number(e.target.value))} // e is already the collection_id
                                >
                                    {collectionData.map((collection) => (
                                        <SelectItem className='text-black' key={collection.id} value={collection.id}>
                                            {collection.name}
                                        </SelectItem>
                                    ))}

                                </Select>

                                <Select
                                    label="League"
                                    defaultSelectedKeys={[LEAGUE_DATA[values.league]?.league]}
                                    placeholder="Select League"
                                    onChange={(e) => {
                                        const selectedLeague = e.target.value; // Get the selected value
                                        const index = LEAGUE_DATA.map(leagueObj => leagueObj.league).indexOf(selectedLeague); // Get the index of the selected value
                                        updateValue('league', index); // Update the state with the index
                                        updateValue('team', "")
                                    }}
                                >
                                    {LEAGUE_DATA.map((leagueObj) => (
                                        <SelectItem className='text-black' key={leagueObj.league}>
                                            {leagueObj.league}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Select
                                    label="Team"
                                    defaultSelectedKeys={[LEAGUE_DATA[values.league]?.teams[values.team]]}
                                    placeholder="Select Team"
                                    isDisabled={values.league === ""}
                                    onChange={(e) => {
                                        const selectedTeam = e.target.value; // Get the selected value
                                        const index = LEAGUE_DATA[values.league].teams.indexOf(selectedTeam); // Get the index of the selected value
                                        updateValue('team', index); // Update the state with the index
                                    }}
                                >

                                    {LEAGUE_DATA[values.league]?.teams.map((team) => (
                                        <SelectItem className='text-black' key={team}>
                                            {team}
                                        </SelectItem>
                                    ))}
                                </Select>

                                {Object.entries(CARD_MODAL_DATA).map(([key, field]) => renderField(key, field))}

                                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                                    <div>
                                        <ImageUpload
                                            onImageChange={(image) => updateValue('front_image', image)}
                                            initialImage={values.front_image}
                                        ></ImageUpload>
                                    </div>
                                    <div>
                                        <ImageUpload
                                            onImageChange={(image) => updateValue('back_image', image)}
                                            initialImage={values.back_image}
                                        ></ImageUpload>
                                    </div>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                {card && (
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