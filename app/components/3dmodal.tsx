import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalContent, ModalFooter, useDisclosure } from '@nextui-org/react';  // Correct use of NextUI hooks
import {Canvas, useLoader} from '@react-three/fiber';        // React Three Fiber for 3D rendering
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';  // Optional for user rotation controls

const ThreeDModal = ({card}) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();  // Correct hook for modal management

    const frontTexture = useLoader(TextureLoader, card.front_image);
    const backTexture = useLoader(TextureLoader, card.back_image);
    const sideTexture = useLoader(TextureLoader, '/side_card_texture.png');
    const topTexture = useLoader(TextureLoader, '/top_card_texture.png');

    return (
        <>
            {/* Button to open the modal */}
            <Button onPress={onOpen}>
                View Card in 3D
            </Button>

            {/* Modal with 3D object */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} size='full'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='text-black'>3D Card Viewer (click and drag to rotate)</ModalHeader>
                            <ModalBody>
                                <Canvas
                                    style={{ background: '#3c3c3c' }}
                                    camera={{ position: [0, 0, 12], fov: 45 }}  // Set the camera position and field of view
                                >
                                    {/* Basic scene setup */}
                                    <ambientLight intensity={1} />

                                    {/* 3D Object */}
                                    <mesh>
                                        <boxGeometry args={[5, 7, 0.2]}/>
                                        {/* Example object: a cube */}
                                        <meshStandardMaterial attach="material-0" map={sideTexture} />
                                        <meshStandardMaterial attach="material-1" map={sideTexture} />
                                        <meshStandardMaterial attach="material-2" map={topTexture} />
                                        <meshStandardMaterial attach="material-3" map={topTexture} />
                                        <meshStandardMaterial attach="material-4" map={frontTexture} /> {/* Front */}
                                        <meshStandardMaterial attach="material-5" map={backTexture} /> {/* Back */}

                                    </mesh>

                                    {/* User controls for rotating the object */}
                                    <OrbitControls />
                                </Canvas>
                            </ModalBody>
                            <ModalFooter>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ThreeDModal;

