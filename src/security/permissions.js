export const PERMISSIONS = {
  landing: "public",
  roles: "public",
  supermarket: "public",
  processing: "public",
  marketplace: "public",
  match: "public",
  delivery: "public",
  receipt: "public",
  impact: "public",
  admin: "public",
  minigame: "public",
};

export const hasScreenAccess = ({ permission = "public" }) => permission === "public";
