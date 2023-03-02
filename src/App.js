import { useState } from "react";
import FormBlock from "./components/FormBlock/FormBlock";
import CustomModal from "./components/Modal/Modal";

const App = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const onModalOpen = (message) => {
    setMessage(message);
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  };

  return (
    <div className="app">
      <FormBlock onModalOpen={onModalOpen} />
      <CustomModal title={message} show={show} />
    </div>
  );
};

export default App;
