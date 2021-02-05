import React from 'react';
import { Box, Flex, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

const SingleFrame = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [scrollBehavior] = React.useState("inside")
    return (
        <Flex justifyContent="center" align="center" flexWrap="wrap" >
            <Box onClick={onOpen} onClose={onClose} margin="3" width="lg" _hover={{ boxShadow: "dark-lg" }}cursor="pointer">
                <Img src="https://assets.imgix.net/tutorials/forest4.webp" />

                <Modal isOpen={isOpen} onClose={onClose} isCentered size="5xl" scrollBehavior={scrollBehavior}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Gallary Image</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        <Img marginBottom="2" src="https://assets.imgix.net/tutorials/forest4.webp" />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vero id eligendi rem illum consectetur temporibus cumque sed quas? Reprehenderit sequi ea perspiciatis reiciendis similique doloribus quis nesciunt saepe consequatur.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque fugiat blanditiis quasi ex, suscipit dignissimos ipsa laboriosam sequi odit maiores, similique eligendi nobis autem modi asperiores quia perferendis excepturi debitis.
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>

            <Box margin="3" width="lg" _hover={{}} cursor="pointer">
                <Img src="https://assets.imgix.net/tutorials/forest4.webp" />
            </Box>

            <Box margin="3" width="lg" _hover={{}} cursor="pointer">
                <Img src="https://assets.imgix.net/tutorials/forest4.webp" />
            </Box>

            <Box margin="3" width="lg" _hover={{}} cursor="pointer">
                <Img src="https://assets.imgix.net/tutorials/forest4.webp" />
            </Box>

            <Box margin="3" width="lg" _hover={{}} cursor="pointer">
                <Img src="https://assets.imgix.net/tutorials/forest4.webp" />
            </Box>

            <Box margin="3" width="lg" _hover={{}} cursor="pointer">
                <Img src="https://assets.imgix.net/tutorials/forest4.webp" />
            </Box>


            <Box margin="3" width="lg" _hover={{}} cursor="pointer">
                <Img src="https://assets.imgix.net/tutorials/forest4.webp" />
            </Box>

            <Box margin="3" width="lg" _hover={{}} cursor="pointer">
                <Img src="https://assets.imgix.net/tutorials/forest4.webp" />
            </Box>
        </Flex>

    )
}

export default SingleFrame;