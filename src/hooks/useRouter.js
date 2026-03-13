import { useState, useEffect, useCallback } from "react";

function parseHash() {
  const raw = window.location.hash.slice(1) || "/";
  const qi = raw.indexOf("?");
  return qi < 0
    ? { path: raw, params: new URLSearchParams() }
    : {
        path: raw.slice(0, qi),
        params: new URLSearchParams(raw.slice(qi + 1)),
      };
}

export function useRouter() {
  const [loc, setLoc] = useState(parseHash);
  useEffect(() => {
    const h = () => setLoc(parseHash());
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  const nav = useCallback((path, p) => {
    window.location.hash = path + (p ? "?" + new URLSearchParams(p) : "");
  }, []);
  return [loc, nav];
}
