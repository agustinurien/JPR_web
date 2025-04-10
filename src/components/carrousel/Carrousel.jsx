import { useEffect, useRef, useState } from "react";
import "./carrousel.css";

import corpo from "../../assets/corpo.jpg";
import artistico from "../../assets/artistico.jpg";
import social from "../../assets/boda.jpg";
import convencion from "../../assets/convenciones.jpg";
import publico from "../../assets/publico.jpg";

import { FaWhatsapp } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

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
      text: "Los eventos corporativos incluyen conferencias, lanzamientos de productos, reuniones de negocios, ferias comerciales y eventos de networking. En estos eventos, los servicios de sonido son cruciales para asegurar que las presentaciones y discursos se escuchen con claridad, permitiendo que todos los participantes se mantengan informados y comprometidos. Una buena configuración de sonido ayuda a evitar problemas técnicos que puedan interrumpir la fluidez del evento.",
      text2:
        "Además, la iluminación profesional y el uso de pantallas refuerzan la identidad de la marca y el contenido visual. Crear una atmósfera acorde al profesionalismo de la empresa, a través de una experiencia visual y auditiva impactante, es esencial en estos eventos. El uso de pantallas facilita la presentación de gráficos, diapositivas y contenido multimedia que eleva el impacto de las presentaciones.",
    },
    {
      id: 2,
      alt: "artistico",
      img: artistico,
      title: "Espectaculos Artisticos",
      text: "Los espectáculos como conciertos, obras de teatro, performances y festivales de arte dependen de una producción técnica de alta calidad para cautivar al público. La iluminación artística es fundamental para crear ambientes y transmitir emociones, siendo clave para el desarrollo de la narrativa y el impacto visual de cada acto.",
      text2:
        "Un sistema de sonido profesional es igualmente crucial, asegurando que cada nota y palabra llegue al público de manera clara y poderosa. Las pantallas y proyecciones visuales agregan un valor estético y funcional, permitiendo la integración de efectos visuales y contenido audiovisual que intensifican la experiencia y mantienen al público inmerso en la obra o espectáculo.",
    },
    {
      id: 3,
      alt: "boda",
      img: social,
      title: "Eventos Sociales",
      text: "En bodas, cumpleaños, fiestas deaniversario y otras celebraciones familiares, la ambientación juega un papel clave para crear momentos memorables. La iluminación decorativa se adapta a la visión de los organizadores, creando unaatmósfera cálida y personalizada que reliza el estilo del evento",

      text2:
        "El sonido debe estar cuidadosamenteequilibrado, para que la música, losdiscursos y otros momentos especiales sedisfruten sin interrupciones y con laclaridad adecuada. Las pantallas puedenusarse para proyectar fotos, videos opresentaciones que personalicen aún másel evento, aportando un toque emotivo yúnico a cada ocasión.",
    },
    {
      id: 4,
      alt: "convenciones",
      img: convencion,
      title: "Convenciones y Exposiciones",
      text: "En estos eventos, que suelen reunir a una gran cantidad de personas, es importante crear una disposición flexible y adaptable. La iluminación puede resaltar áreas específicas como stands de exhibición y escenarios para conferencias o presentaciones, dirigiendo la atención del público de forma estratégica.",
      text2:
        "Además, el sonido debe cubrir amplios espacios de forma uniforme, de modo que cada presentación o panel sea audible, sin importar el tamaño de la audiencia. Las pantallas juegan un papel vital en la comunicación visual, ya que permiten mostrar presentaciones, gráficos y contenido multimedia que enriquecen la experiencia y mantienen a los asistentes interesados y enfocados en el mensaje.",
    },
    {
      id: 5,
      alt: "publico",
      img: publico,
      title: "Espectaculos Publicos",
      text: "Los festivales, ferias locales y actividades de recaudación de fondos se benefician de una ambientación acogedora y bien organizada. La producción técnica permite iluminar áreas de tránsito, stands y escenarios, facilitando la circulación de personas y resaltando las actividades principales.",
      text2:
        "Además, el sonido adecuado asegura que las presentaciones y actividades sean audibles para todos los asistentes, generando una experiencia más inclusiva. Las pantallas pueden usarse para transmitir información, horarios y contenidos especiales que mantengan a la comunidad informada y participativa en todo momento.",
    },
  ];

  useEffect(() => {
    const selectedEvent = Number(event);
    const selected = originalItems.findIndex(
      (item) => item.id === selectedEvent
    );

    if (selectedEvent !== -1) {
      const n = originalItems.length;

      const reorderedItems = [
        ...originalItems.slice(selected),
        ...originalItems.slice(0, selected),
      ];

      setItems(reorderedItems);
    }
  }, [event]);

  const moveUp = (n) => {
    if (n === 0) {
      moveBottom(n);
    } else {
      setOffsetY((prev) => prev + getVH(80));
    }
  };

  const moveDown = (n) => {
    if (n === items.length - 1) {
      moveTop(n);
    } else {
      setOffsetY((prev) => prev - getVH(80));
    }
  };

  const moveTop = (n) => {
    console.log("se aplico el movimiento");
    console.log(n, items.length - 1);
    const maxOffset = 0;
    setOffsetY(maxOffset);
  };
  const moveBottom = (n) => {
    console.log(n, 0);
    const maxOffset = getVH(80) * 4;
    setOffsetY(-maxOffset);
  };

  return (
    <div className="carouselContainer">
      <div
        ref={trackRef}
        className="carouselTrack"
        style={{
          transform: `translateY(${offsetY}px)`,
          transition: "transform 0.6s cubic-bezier(0.77, 0, 0.175, 1)",
          willChange: "transform",
        }}
      >
        {items.map((item, index) => (
          <div
            style={{ backgroundColor: item.color }}
            key={index}
            className="carouselItem"
          >
            <div className="eventImageContainer">
              <img
                src={item.img.src}
                alt={item.alt}
                className={`eventImage ${item.alt}`}
              />
            </div>

            <div className="eventContent">
              <div className="closeContainer">
                <div className="moveButtons">
                  <button onClick={() => moveUp(index)}>
                    <MdOutlineKeyboardArrowUp />
                  </button>
                  <button onClick={() => moveDown(index)}>
                    <MdOutlineKeyboardArrowDown />
                  </button>
                </div>
                <a href="/">
                  <IoCloseSharp />
                </a>
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
                  <span>¿Listo para el espectaculo?</span>
                  <h3>
                    Contactate <br />
                    con nosotros
                  </h3>
                </div>
                <div className="contactButtons">
                  <a href="/" className="wpButton">
                    ENVIAR MENSAJE
                  </a>
                  <a href="/" className="whatsappIcon">
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrousel;
