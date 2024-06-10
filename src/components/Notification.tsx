import { useEffect, useState } from "react";

interface NotificationProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

function Notification({ message, visible, onClose }: NotificationProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [visible]);

  useEffect(() => {
    if (show) {
      // Remove notification after a delay
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 5000); // Hide after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 text-center bg-green-600  text-white px-4 py-4 rounded-b-md shadow-lg transition-all duration-300 ease-in-out ${
        show ? "opacity-95" : "opacity-0"
      } w-11/12 sm:w-auto`}
      style={{ top: show ? "20px" : "-50px" }}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Notification;
