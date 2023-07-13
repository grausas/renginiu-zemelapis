import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Image } from '@chakra-ui/react';

export default function ImagePreview({ url }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleImageClick = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Image src={url} alt="Preview" onClick={handleImageClick} />
            <Modal isOpen={isOpen} onClose={handleClose} isCentered >
                <ModalOverlay />
                <ModalContent
                    minWidth="fit-content"
                    height="fit-content"
                >
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Image src={url} alt="Preview" />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

