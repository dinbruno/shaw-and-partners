"use client";
import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import animationData from "./loading.json";

function useLoadingDots(interval = 300, dots = 3) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prevFrame: any) => (prevFrame + 1) % (dots + 1));
    }, interval);

    return () => clearInterval(timer);
  }, [interval, dots]);

  return "Carregando, por favor aguarde" + ".".repeat(frame) + " ".repeat(dots - frame);
}

function LottieAnimation({ animationData }: any) {
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
    }
  }, [animationData]);

  return <div ref={container}></div>;
}

export default function LoadingComponent() {
  const loadingText = useLoadingDots();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col h-auto">
        <p className="mt-4 text-white text-center pb-4 text-xl">{loadingText}</p>
        <LottieAnimation animationData={animationData} />
      </div>
    </div>
  );
}
