import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export const ScrollManager = (props) => {
  const { section, onSectionChange } = props;

  const data = useScroll();
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);

  data.fill.classList.add("fix");

  useEffect(() => {
    function onScroll(event) {
      if (isAnimating.current) {
        return;
      }
      isAnimating.current = true;
      if (event.deltaY < 0) {
        onSectionChange((section) => (section > 0 ? section - 1 : 0));
      } else if (event.deltaY > 0) {
        onSectionChange((section) => (section === 3 ? 3 : section + 1));
      }
    }
    window.addEventListener("wheel", onScroll);
    return () => window.removeEventListener("wheel", onScroll);
  }, []);

  useEffect(() => {
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, [section]);

  return null;
};
