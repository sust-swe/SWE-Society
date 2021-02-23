import { Carousel } from "react-bootstrap";
import { v4 as uuid } from "uuid";

const LandingCarousal = (props) => {
  return (
    <Carousel>
      {props.items.map((item) => (
        <Carousel.Item key={uuid()} interval={2000}>
          <img
            className="d-block"
            style={{ width: "100%", height: "75vh", objectFit: "cover" }}
            src={item.src}
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

export default LandingCarousal;
