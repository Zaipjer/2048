import { useEffect } from "react";

const Event = (event, handler, passive = false) => {
  useEffect(() => {
    // Inicializa el evento
    window.addEventListener(event, handler, passive);

    // esto limpiará el evento cada vez que se vuelva a renderizar el componente
    return () => {
      window.removeEventListener(event, handler);
    };
  });
};

export default Event;