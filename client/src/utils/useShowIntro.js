import { useLocalStorage } from "./useLocalStorage";

function useShowIntro() {
  const [showIntro, setShowIntro] = useLocalStorage("should_show_intro", true);

  return { showIntro, setShowIntro };
}

export default useShowIntro;
