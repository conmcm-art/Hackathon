import { hasScreenAccess } from "@/security/permissions";

function ProtectedScreen({ permission = "public", fallback = null, children }) {
  if (!hasScreenAccess({ permission })) {
    return fallback;
  }

  return children;
}

export default ProtectedScreen;
