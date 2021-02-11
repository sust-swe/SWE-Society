import { Carousel } from "react-bootstrap";
import { v4 as uuid } from "uuid";

const EventCarousal = (props) => {
  return (
    <Carousel>
      {props.items.map((item) => (
        <Carousel.Item key={uuid()} interval={1000}>
          <img
            className="d-block"
            style={{ width: "100%", height: "75vh", objectFit: "cover" }}
            src={`/${item}`}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default EventCarousal;
