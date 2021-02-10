
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Carousel } from "react-bootstrap";
import { v4 as uuid } from "uuid";

const BlogCarosuel = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Carousel>
            {props.items.map((item) => (
                <Carousel.Item key={uuid()} interval={1000}>
                    <img
                        className="d-block"
                        style={{ width: "100%", height: "50vh", objectFit: "cover" }}
                        src={item}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}

            {/* <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit mollitia quos obcaecati minima eveniet id autem? Beatae blanditiis tempore corrupti, qui debitis nostrum, assumenda molestias labore earum, tenetur quaerat fugit.
                    </ModalBody>
                </ModalContent>
            </Modal> */}
        </Carousel>
    );
};

export default BlogCarosuel;