import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MDBIcon } from "mdb-react-ui-kit";
import { useLoading } from "../../context/LoadingContext";

const MotionDiv = motion.div;

const GlobalLoader = () => {
  const { isGlobalLoading } = useLoading();

  return (
    <AnimatePresence>
      {isGlobalLoading ? (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1300] flex items-center justify-center bg-black/45 backdrop-blur-sm"
        >
          <MotionDiv
            initial={{ scale: 0.92, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.22 }}
            className="surface-card px-6 py-5 rounded-2xl flex items-center gap-3 shadow-xl"
          >
            <MDBIcon fas icon="spinner" spin className="text-blue-500" />
            <p className="text-sm font-bold text-slate-800">Please wait...</p>
          </MotionDiv>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  );
};

export default GlobalLoader;
