import { useEffect, useState } from "react";

export default function PythonTerminalTrace({ replay = [], source = "local-js-fallback", onComplete }) {
  const [visible, setVisible] = useState([]);
  useEffect(() => {
    setVisible([]);
    let total = 0;
    replay.forEach((line, i) => {
      total += line.delayMs || 100;
      setTimeout(() => setVisible((prev) => [...prev, line]), total);
    });
    const done = setTimeout(() => onComplete?.(), total + 100);
    return () => clearTimeout(done);
  }, [replay, onComplete]);

  return <div className="rounded-[2rem] border border-slate-700 bg-slate-950 p-5 text-sm text-emerald-200">
    <div className="mb-3 flex items-center justify-between font-mono text-xs text-slate-300"><span>$ python backend/server.py</span><span className="rounded bg-slate-800 px-2 py-1">{source === "python-backend" ? "Python backend active" : "Local fallback active"}</span></div>
    <div className="space-y-1 font-mono">{visible.map((line, i) => <div key={`${line.text}-${i}`}>{line.text}</div>)}</div>
  </div>;
}
