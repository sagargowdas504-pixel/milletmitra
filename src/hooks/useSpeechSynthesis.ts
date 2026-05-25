import { useState, useCallback, useEffect, useRef } from "react";

type SpeechLang = "en" | "hi" | "kn" | "te";

const langCodeMap: Record<SpeechLang, string> = {
  en: "en-IN",
  hi: "hi-IN",
  kn: "kn-IN",
  te: "te-IN",
};

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const stepsRef = useRef<string[]>([]);
  const langRef = useRef<SpeechLang>("en");
  const onStepDoneRef = useRef<(() => void) | null>(null);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentStepIndex(-1);
    utteranceRef.current = null;
  }, []);

  const speakText = useCallback((text: string, lang: SpeechLang, onEnd?: () => void) => {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = langCodeMap[lang];
    utt.rate = 0.9;
    utt.pitch = 1;
    utt.onend = () => {
      onEnd?.();
    };
    utt.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utteranceRef.current = utt;
    setIsSpeaking(true);
    setIsPaused(false);
    window.speechSynthesis.speak(utt);
  }, []);

  const speakStep = useCallback((index: number) => {
    if (index < 0 || index >= stepsRef.current.length) {
      stop();
      return;
    }
    setCurrentStepIndex(index);
    const stepText = `Step ${index + 1}. ${stepsRef.current[index]}`;
    speakText(stepText, langRef.current, () => {
      // auto-advance
      if (index + 1 < stepsRef.current.length) {
        speakStep(index + 1);
      } else {
        stop();
        onStepDoneRef.current?.();
      }
    });
  }, [speakText, stop]);

  const startStepByStep = useCallback((steps: string[], lang: SpeechLang, onDone?: () => void) => {
    stepsRef.current = steps;
    langRef.current = lang;
    onStepDoneRef.current = onDone || null;
    speakStep(0);
  }, [speakStep]);

  const nextStep = useCallback(() => {
    const next = currentStepIndex + 1;
    if (next < stepsRef.current.length) speakStep(next);
  }, [currentStepIndex, speakStep]);

  const prevStep = useCallback(() => {
    const prev = currentStepIndex - 1;
    if (prev >= 0) speakStep(prev);
  }, [currentStepIndex, speakStep]);

  const goToStep = useCallback((index: number) => {
    speakStep(index);
  }, [speakStep]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    window.speechSynthesis.resume();
    setIsPaused(false);
  }, []);

  const speakFullRecipe = useCallback((ingredients: string[], instructions: string[], lang: SpeechLang) => {
    const ingLabel = lang === "hi" ? "सामग्री" : lang === "kn" ? "ಪದಾರ್ಥಗಳು" : lang === "te" ? "పదార్థాలు" : "Ingredients";
    const stepsLabel = lang === "hi" ? "विधि" : lang === "kn" ? "ತಯಾರಿ ವಿಧಾನ" : lang === "te" ? "తయారీ విధానం" : "Steps";
    const fullText = `${ingLabel}: ${ingredients.join(", ")}. ${stepsLabel}: ${instructions.map((s, i) => `Step ${i + 1}. ${s}`).join(". ")}`;
    speakText(fullText, lang);
  }, [speakText]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return {
    isSpeaking,
    isPaused,
    currentStepIndex,
    speakText,
    speakFullRecipe,
    startStepByStep,
    nextStep,
    prevStep,
    goToStep,
    pause,
    resume,
    stop,
    totalSteps: stepsRef.current.length,
  };
}
