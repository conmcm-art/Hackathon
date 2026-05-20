import { FLOW_STEPS } from "@/app/flow.config";

const FLOW_INDEX = FLOW_STEPS.reduce((acc, step, index) => {
  acc[step.id] = index;
  return acc;
}, {});

export function getFlowIndex(screen) {
  return FLOW_INDEX[screen] ?? 0;
}

export function getFlowProgress(screen) {
  const currentIndex = getFlowIndex(screen);
  const total = FLOW_STEPS.length;

  return {
    currentIndex,
    total,
    percentage: Math.round(((currentIndex + 1) / total) * 100),
    currentStep: FLOW_STEPS[currentIndex],
    breadcrumbs: FLOW_STEPS.slice(0, currentIndex + 1),
  };
}
