import React, { useState, useEffect } from "react";

function Home() {
  const [message, setMessage] = useState("Hello Igor");
  const [num, setNum] = useState(0);

  useEffect(() => {
    console.log("ATIVOU");
  }, []);

  useEffect(() => {}, [num]);

  function helloWorld() {
    return (
      <>
        <h1>{message}</h1>
        <button onClick={() => setMessage("Hello Giovanna")}>
          Mudar Mensagem
        </button>
        <button onClick={() => setNum(num + 1)}>Aumentar</button>
        <p>Num: {num}</p>
      </>
    );
  }

  return helloWorld();
}

export default Home;
