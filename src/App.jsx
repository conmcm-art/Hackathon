import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { RotateCcw, Undo2 } from "lucide-react";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import PageContainer from "@/components/layout/PageContainer";
import ScreenTransition from "@/components/layout/ScreenTransition";
import { renderScreen } from "@/app/screenRegistry";
import { DEFAULT_FLOW_STATE } from "@/app/flow.config";
import { flowReducer, loadFlowState, persistFlowState } from "@/app/flowReducer";
import { getFlowProgress } from "@/app/flowProgress";
import useSoundFeedback from "@/audio/useSoundFeedback";
import SOUND_EVENTS from "@/audio/soundEvents";
import { useEscapeToGoHome } from "@/accessibility/keyboardShortcuts";
import { ariaLabels } from "@/accessibility/ariaLabels";

export default function App() {
  const [flowState, dispatch] = useReducer(flowReducer, DEFAULT_FLOW_STATE, loadFlowState);
  const [screenHistory, setScreenHistory] = useState([flowState.screen]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(60);
  const [statusMessage, setStatusMessage] = useState("Ready");
  const [minigameContext, setMinigameContext] = useState(null);
  const { play } = useSoundFeedback();

  const { screen, role, donationCreated } = flowState;
  const [submittedFood, setSubmittedFood] = useState(null);
  const [decisionResult, setDecisionResult] = useState(null);
  const progress = useMemo(() => getFlowProgress(screen), [screen]);

  useEffect(() => {
    persistFlowState(flowState);
  }, [flowState]);

  const playSound = useCallback((eventName) => {
    if (!soundEnabled || muted || volume === 0) return;
    play(eventName);
  }, [muted, play, soundEnabled, volume]);

  const navigateTo = useCallback((nextScreen, nextRole) => {
    dispatch({ type: "NAVIGATE", screen: nextScreen, role: nextRole });
    setScreenHistory((prev) => [...prev, nextScreen]);
    setStatusMessage(`Screen updated: ${nextScreen}`);
    playSound(SOUND_EVENTS.NAVIGATE);
  }, [playSound]);

  const goBackOneStep = useCallback(() => {
    if (screenHistory.length < 2) return;
    dispatch({ type: "GO_BACK", history: screenHistory });
    setScreenHistory((prev) => prev.slice(0, -1));
    setStatusMessage("Moved back one step");
  }, [screenHistory]);

  const restartDemo = useCallback(() => {
    dispatch({ type: "RESTART" });
    setScreenHistory(["landing"]);
    setStatusMessage("Demo restarted from Home");
  }, []);

  useEscapeToGoHome(() => navigateTo("landing"));

  const screenComponent = useMemo(() => renderScreen(screen, {
    setScreen: navigateTo,
    role,
    setRole: (nextRole) => dispatch({ type: "SET_ROLE", role: nextRole }),
    setDonationCreated: (value) => dispatch({ type: "SET_DONATION_CREATED", value }),
    donationCreated,
    submittedFood,
    decisionResult,
    setSubmittedFood,
    setDecisionResult,
    setStatusMessage,
    minigameContext,
    setMinigameContext,
    playSound,
  }), [screen, role, donationCreated, navigateTo, minigameContext, playSound]);

  return (
    <div className="app-bg-tone min-h-screen">
      <a href="#main-content" className="skip-link">{ariaLabels.skipToMain}</a>
      <Header
        screen={screen}
        setScreen={navigateTo}
        role={role}
        setRole={(nextRole) => dispatch({ type: "SET_ROLE", role: nextRole })}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        muted={muted}
        setMuted={setMuted}
        volume={volume}
        setVolume={setVolume}
        progress={progress}
      />
      <MobileNav
        screen={screen}
        setScreen={navigateTo}
        role={role}
        setRole={(nextRole) => dispatch({ type: "SET_ROLE", role: nextRole })}
        setDonationCreated={(value) => dispatch({ type: "SET_DONATION_CREATED", value })}
      />
      <div aria-live="polite" className="sr-only" aria-label={ariaLabels.mainStatus}>{statusMessage}</div>
      <PageContainer className="pb-28 md:pb-0">
        <div className="surface-card-soft mb-4 hidden items-center justify-between p-3 md:flex">
          <div>
            <p className="text-xs font-semibold text-slate-600">What just happened?</p>
            <p className="text-sm text-slate-800">{progress.currentStep.note}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={goBackOneStep} className="flow-control-action">
              <Undo2 className="h-4 w-4" /> Back one step
            </button>
            <button onClick={restartDemo} className="flow-control-action">
              <RotateCcw className="h-4 w-4" /> Restart demo
            </button>
          </div>
        </div>
        <ScreenTransition screenKey={screen}>{screenComponent}</ScreenTransition>
      </PageContainer>
      <Footer />
    </div>
  );
}
