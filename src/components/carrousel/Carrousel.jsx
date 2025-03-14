import { useState } from "react";
import "./carrousel.css";

const Carrousel = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Caja 1" },
    { id: 2, text: "Caja 2" },
    { id: 3, text: "Caja 3" },
  ]);

  const [caja, setCaja] = useState([0, 0]);

  const handleRotate = (n) => {
    const newCaja = items.map((item) => item.id).filter((id) => id !== n);
    setCaja(newCaja);

    handleRotate2();
  };

  const handleRotate2 = () => {
    setTimeout(() => {
      setItems((prev) => {
        const newItems = [...prev];
        newItems.push(newItems.shift());
        setCaja([0, 0]);
        return newItems;
      });
    }, 500);

    return;
  };

  return (
    <div className="carouselContainer">
      <div className="carouselTrack">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`carouselItem ${caja.includes(item.id) ? "moveUp" : ""}`}
          >
            <button
              onClick={() => handleRotate(item.id)}
              className="carouselButton"
            >
              Cerrar (Mover Arriba)
            </button>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrousel;
