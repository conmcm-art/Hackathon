import { analyseDonationLocally } from "@/lib/decisionEngine";

export async function analyseDonationWithPython(food, ngos) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1200);
  try {
    const res = await fetch("http://localhost:8787/api/analyse-donation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ food, ngos }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error("backend-failed");
    return await res.json();
  } catch {
    return analyseDonationLocally(food, ngos);
  } finally {
    clearTimeout(timeout);
  }
}
