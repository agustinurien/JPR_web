import { useEffect, useRef, useState } from "react";
import "./carrousel.css";
import corpo from "../../../public/images/corpo.jpg";
import boda from "../../../public/images/boda.jpg";
import artistico from "../../../public/images/artistico.jpg";
import convenciones from "../../../public/images/convenciones.jpg";
import publico from "../../../public/images/publico.jpg";

const Carrousel = ({ event }) => {
  const [items, setItems] = useState([]);
  const [offsetY, setOffsetY] = useState(0);
  const getVH = (vh) => (window.innerHeight * vh) / 100;

  const trackRef = useRef(null);
  const originalItems = [
    {
      id: 1,
      alt: "corpo",
      img: corpo,
      title: "Eventos Corporativos",
      text: "",
      text2: "",
    },
    {
      id: 2,
      alt: "artistico",
      img: artistico,
      title: "Espectaculos Artisticos",
      text: "",
      text2: "",
    },
    {
      id: 3,
      alt: "boda",
      img: boda,
      title: "Eventos Sociales",
      text: "En bodas, cumpleaños, fiestas deaniversario y otras celebraciones familiares, la ambientación juega un papel clave para crear momentos memorables. La iluminación decorativa se adapta a la visión de los organizadores, creando unaatmósfera cálida y personalizada que reliza el estilo del evento",

      text2:
        "El sonido debe estar cuidadosamenteequilibrado, para que la música, losdiscursos y otros momentos especiales sedisfruten sin interrupciones y con laclaridad adecuada. Las pantallas puedenusarse para proyectar fotos, videos opresentaciones que personalicen aún másel evento, aportando un toque emotivo yúnico a cada ocasión.",
    },
    {
      id: 4,
      alt: "convenciones",
      img: convenciones,
      title: "Convenciones y Exposiciones",
      text: "",
      text2: "",
    },
    {
      id: 5,
      alt: "publico",
      img: publico,
      title: "Espectaculos Publicos",
      text: "",
      text2: "",
    },
  ];

  useEffect(() => {
    const selectedEvent = Number(event);
    const selected = originalItems.findIndex(
      (item) => item.id === selectedEvent
    );

    if (selectedEvent !== -1) {
      const n = originalItems.length;
      const center = Math.floor(n / 2);
      const shift = (selected - center + n) % n;

      const reorderedItems = [
        ...originalItems.slice(shift),
        ...originalItems.slice(0, shift),
      ];

      setItems(reorderedItems);
    }
  }, [event]);

  const moveUp = () => {
    setOffsetY((prev) => prev - getVH(80));
  };

  const moveDown = () => {
    setOffsetY((prev) => prev + getVH(80));
  };

  return (
    <div className="carouselContainer">
      <div
        ref={trackRef}
        className="carouselTrack"
        style={{
          transform: `translateY(${offsetY}px)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {items.map((item, index) => (
          <div
            style={{ backgroundColor: item.color }}
            key={index}
            className="carouselItem"
          >
            <div className={`eventImage ${item.alt}`}></div>

            <div className="eventContent">
              <div className="closeContainer">
                <button onClick={() => moveUp()}>A</button>
                <button onClick={() => moveDown()}>V</button>
              </div>

              <div className="eventText">
                <h2 className="eventTitle">{item.title}</h2>
                <div className="eventDescription">
                  <p>{item.text}</p>
                  <p>{item.text2}</p>
                </div>
              </div>

              <div className="contactContainer">
                <div className="contactText">
                  <span>Listo para el espectaculo</span>
                  <h3>
                    Contactate <br />
                    con nosotros
                  </h3>
                </div>
                <button>enviar mensaje</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrousel;
