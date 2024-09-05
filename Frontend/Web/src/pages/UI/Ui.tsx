import { useState } from "react";
import NewToast from "../../components/toast/newToast";

function Ui() {
  const [showToast, setShowToast] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="w-screen h-full flex flex-col gap-8 flex-wrap p-4">
      <div className="w-full flex items-center">
        {showToast && (
          <NewToast
            deny={() => setShowToast(false)}
            onClick={() => console.log("accept")}
            message="Vous avez un nouveau message !"
            icon="info"
            iconColor="white"
            type="Info"
            bgColor="blue-900"
            textColor="white"
          />
        )}
        {!showToast && <button onClick={() => setShowToast(true)}>Show Toast</button>}
      </div>
      <div className="w-full flex items-center">
        {!showAlert && <button onClick={() => setShowAlert(true)}>Show Alert</button>}
        {showAlert && (
          <NewToast
            deny={() => setShowAlert(false)}
            onClick={() => console.log("accept")}
            message="Vous avez une synchronisation en attente !"
            icon="Error"
            iconColor="red"
            type="Alert"
            bgColor="red-500"
            textColor="white"
          />
        )}
      </div>
    </div>
  );
}

export default Ui;
