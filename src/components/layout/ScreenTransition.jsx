import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionPreference } from "@/accessibility/reducedMotion";

function ScreenTransition({ screenKey, children }) {
  const reducedMotion = useReducedMotionPreference();

  if (reducedMotion) {
    return <div key={screenKey}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={screenKey} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.28 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default ScreenTransition;
