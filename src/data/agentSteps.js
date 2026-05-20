import { Clock, Leaf, Route, ShieldCheck, Upload, Users } from "lucide-react";

const agentSteps = [
  {
    label: "Input received",
    detail: "Food item, quantity, expiry and pickup window captured",
    icon: Upload,
  },
  {
    label: "Freshness Agent",
    detail: "Expiry window analysed, urgency classified as High",
    icon: Clock,
  },
  {
    label: "Food Safety Agent",
    detail: "Approved with handling conditions, serve within 2 hours",
    icon: ShieldCheck,
  },
  {
    label: "Matching Agent",
    detail: "Verified NGOs ranked by distance, capacity and kitchen fit",
    icon: Users,
  },
  {
    label: "Route Agent",
    detail: "Pickup and drop-off window selected to reduce food safety risk",
    icon: Route,
  },
  {
    label: "Impact Agent",
    detail: "Meals, retail value, CO₂e and delivery cost per meal estimated",
    icon: Leaf,
  },
];

export { agentSteps };
