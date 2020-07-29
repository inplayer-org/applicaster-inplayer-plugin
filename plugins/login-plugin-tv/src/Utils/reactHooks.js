import { useEffect } from "react";

const useToggleNavBar = (navigator) => {
  useEffect(() => {
    navigator.hideNavBar();
    return () => {
      navigator.showNavBar();
    };
  }, []);
};

export { useToggleNavBar };
