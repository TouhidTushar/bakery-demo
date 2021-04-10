import store from "../store";
import { toast } from "react-toastify";

export const isuccessNotification = () => {
  const currentState = store.getState();
  const Notification = currentState.inventory.serverRes;
  toast.success(`✅ ${Notification}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ierrorNotification = () => {
  const currentState = store.getState();
  const Notification = currentState.inventory.serverRes;
  toast.error(`⚠️ ${Notification}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const iwarningNotification = () => {
  toast.warning(`Session expired!`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const asuccessNotification = () => {
  const currentState = store.getState();
  const Notification = currentState.auth.serverRes;
  toast.success(`✅ ${Notification}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const aerrorNotification = () => {
  const currentState = store.getState();
  const Notification = currentState.auth.serverRes;
  toast.error(`⚠️ ${Notification}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const awarningNotification = () => {
  toast.warning(`Session expired!`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
