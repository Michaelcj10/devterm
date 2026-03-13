import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  Suspense,
} from "react";
import { useRouter } from "./hooks/useRouter";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { CATS, META } from "./constants";
import CommandPalette from "./components/CommandPalette";
import Landing from "./components/Landing";
import SidebarBtn from "./components/SidebarBtn";
import ErrorBoundary from "./components/ErrorBoundary";
import TOOLS from "./tools/index";

function useDebounce(value, ms) {
  const [dv, setDv] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDv(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return dv;
}

export default function App() {
  const [loc, nav] = useRouter();
  const isLanding = loc.path === "/" || loc.path === "";
  const toolId = isLanding ? null : loc.path.slice(1);
  const initVal = loc.params.get("i") || "";

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 150);
  const [palette, setPalette] = useState(false);
  const [collapsed, setCollapsed] = useLocalStorage("devterm_collapsed", false);
  const [pins, setPins] = useLocalStorage("devterm_pins", []);
  const [saved, setSaved] = useLocalStorage("devterm_saved", {});
  const [history, setHistory] = useLocalStorage("devterm_history", []);
  const [shareCopied, setShareCopied] = useState(false);
  const [searchCursor, setSearchCursor] = useState(-1);
  const activeRef = useRef(null);
  const searchRef = useRef(null);

  // Add/move current tool to front of history (max 5)
  useEffect(() => {
    if (!toolId) return;
    setHistory((h) => {
      const prev = h.find((x) => x.id === toolId);
      return [
        prev || { id: toolId, lastInput: "" },
        ...h.filter((x) => x.id !== toolId),
      ].slice(0, 5);
    });
  }, [toolId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll active sidebar item into view when tool changes
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [toolId]);

  // Reset keyboard cursor when search query changes
  useEffect(() => {
    setSearchCursor(-1);
  }, [debouncedSearch]);

  const toolCat = useMemo(
    () => CATS.find((c) => c.ids.includes(toolId)),
    [toolId],
  );

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
      if (e.key === "/") {
        const tag = document.activeElement?.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA") {
          e.preventDefault();
          searchRef.current?.focus();
        }
      }
      if (e.key === "Escape") {
        if (palette) setPalette(false);
        else if (search) {
          setSearch("");
          searchRef.current?.blur();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [palette, search]);

  const togglePin = useCallback(
    (id) =>
      setPins((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])),
    [setPins],
  );

  const handleInput = useCallback(
    (v) => {
      if (!toolId) return;
      setSaved((s) => ({ ...s, [toolId]: v }));
      setHistory((h) =>
        h.map((x) => (x.id === toolId ? { ...x, lastInput: v } : x)),
      );
    },
    [toolId, setSaved, setHistory],
  );

  const handleNavTo = useCallback(
    (id) => {
      nav("/" + id);
      setSearch("");
      setSearchCursor(-1);
    },
    [nav],
  );

  const onSearchKey = (e) => {
    if (!filtered) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSearchCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSearchCursor((c) => Math.max(c - 1, -1));
    } else if (e.key === "Enter" && filtered[searchCursor]) {
      handleNavTo(filtered[searchCursor][0]);
    }
  };

  const filtered = useMemo(() => {
    if (!debouncedSearch) return null;
    const q = debouncedSearch.toLowerCase();
    return Object.entries(META).filter(
      ([id, m]) =>
        m.label.toLowerCase().includes(q) ||
        m.desc.toLowerCase().includes(q) ||
        id.includes(q),
    );
  }, [debouncedSearch]);

  const share = () => {
    const base = window.location.origin + window.location.pathname;
    const current = saved[toolId] || "";
    const param = current ? "?i=" + encodeURIComponent(current) : "";
    navigator.clipboard.writeText(base + "#/" + toolId + param);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  if (isLanding)
    return (
      <>
        <Landing nav={nav} />
        {palette && (
          <CommandPalette
            onNav={nav}
            onClose={() => setPalette(false)}
            history={history}
          />
        )}
      </>
    );

  const Tool = TOOLS[toolId];
  const meta = META[toolId];

  return (
    <div
      className="flex h-screen bg-neutral-900 text-green-400 font-mono overflow-hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,80,0.01) 2px,rgba(0,255,80,0.01) 4px)",
      }}
    >
      {palette && (
        <CommandPalette
          onNav={nav}
          onClose={() => setPalette(false)}
          history={history}
        />
      )}
      <aside
        className={`${
          collapsed ? "w-10" : "w-52"
        } shrink-0 bg-neutral-950 border-r border-green-900 flex flex-col overflow-hidden transition-[width] duration-150`}
      >
        {collapsed ? (
          <>
            <div className="py-3 flex justify-center border-b border-green-900">
              <button
                onClick={() => setCollapsed(false)}
                title="Expand sidebar"
                className="text-green-500 hover:text-green-300 bg-transparent border-0 cursor-pointer font-mono text-base leading-none transition-colors"
              >
                ›
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto devterm-scroll">
              {CATS.flatMap((c) => c.ids)
                .filter((id, i, arr) => META[id] && arr.indexOf(id) === i)
                .map((id) => (
                  <button
                    key={id}
                    title={META[id].label}
                    onClick={() => handleNavTo(id)}
                    className={`w-full py-1.5 flex justify-center text-xs font-mono cursor-pointer bg-transparent border-0 transition-colors ${
                      toolId === id
                        ? "text-green-300 bg-green-900"
                        : "text-green-500 hover:text-green-300"
                    }`}
                  >
                    {String(META[id].icon).slice(0, 3)}
                  </button>
                ))}
            </nav>
            <div className="py-2 flex justify-center border-t border-green-950">
              <span className="text-green-600 text-xs font-mono">
                {pins.length > 0 ? `★${pins.length}` : "·"}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="px-4 py-3 border-b border-green-900 flex items-center justify-between">
              <button
                onClick={() => nav("/")}
                className="text-green-400 font-bold text-sm cursor-pointer bg-transparent border-0 hover:text-green-300 p-0 transition-colors"
                style={{ textShadow: "0 0 8px #4ade80" }}
              >
                &gt; DEVTERM_
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPalette(true)}
                  title="⌘K"
                  className="text-green-600 hover:text-green-400 text-xs font-mono border border-green-900 hover:border-green-700 rounded px-1.5 py-0.5 bg-transparent cursor-pointer transition-colors"
                >
                  ⌘K
                </button>
                <button
                  onClick={() => setCollapsed(true)}
                  title="Collapse sidebar"
                  className="text-green-600 hover:text-green-400 text-xs font-mono border border-green-900 hover:border-green-700 rounded px-1 py-0.5 bg-transparent cursor-pointer transition-colors"
                >
                  ‹
                </button>
              </div>
            </div>
            <div className="px-3 py-2 border-b border-green-900">
              <div className="relative">
                <input
                  ref={searchRef}
                  className="w-full bg-black border border-green-900 rounded px-2.5 py-1.5 pr-6 text-xs font-mono text-green-300 outline-none focus:border-green-600 focus-visible:ring-1 focus-visible:ring-green-500/30 placeholder-green-600"
                  placeholder="$ grep... (press /)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={onSearchKey}
                />
                {search && (
                  <button
                    onClick={() => {
                      setSearch("");
                      searchRef.current?.focus();
                    }}
                    tabIndex={-1}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-300 bg-transparent border-0 cursor-pointer font-mono text-sm leading-none transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            <nav className="flex-1 overflow-y-auto devterm-scroll py-2 px-2">
              {filtered ? (
                <>
                  {filtered.length === 0 && (
                    <div className="text-xs text-green-600 px-3 py-2">
                      // no results
                    </div>
                  )}
                  {filtered.map(([id, m], idx) => (
                    <SidebarBtn
                      key={id}
                      id={id}
                      m={m}
                      active={toolId === id}
                      focused={searchCursor === idx}
                      activeRef={toolId === id ? activeRef : null}
                      onNav={handleNavTo}
                      pinned={pins.includes(id)}
                      onTogglePin={togglePin}
                    />
                  ))}
                </>
              ) : (
                <>
                  {pins.length > 0 && (
                    <div className="mb-3">
                      <div className="px-2 py-1 text-xs font-bold text-cyan-700 tracking-widest">
                        ★ PINNED
                      </div>
                      {pins.map(
                        (id) =>
                          META[id] && (
                            <SidebarBtn
                              key={id}
                              id={id}
                              m={META[id]}
                              active={toolId === id}
                              activeRef={toolId === id ? activeRef : null}
                              onNav={handleNavTo}
                              pinned={true}
                              onTogglePin={togglePin}
                            />
                          ),
                      )}
                    </div>
                  )}
                  {CATS.map((cat) => (
                    <div key={cat.id} className="mb-3">
                      <div className="px-2 py-1 text-xs font-bold text-cyan-700 tracking-widest flex items-center justify-between">
                        <span>// {cat.label}</span>
                        <span className="text-green-600 font-normal">
                          {cat.ids.filter((id) => META[id]).length}
                        </span>
                      </div>
                      {cat.ids.map(
                        (id) =>
                          META[id] && (
                            <SidebarBtn
                              key={id}
                              id={id}
                              m={META[id]}
                              active={toolId === id}
                              activeRef={toolId === id ? activeRef : null}
                              onNav={handleNavTo}
                              pinned={pins.includes(id)}
                              onTogglePin={togglePin}
                            />
                          ),
                      )}
                    </div>
                  ))}
                </>
              )}
            </nav>
            <div className="px-3 py-2 border-t border-green-950 text-xs text-green-600 font-mono">
              &gt; {Object.keys(META).length} tools · {pins.length} pinned
              {search &&
                filtered &&
                filtered.length > 0 &&
                searchCursor >= 0 && <span> · ↵ open</span>}
            </div>
          </>
        )}
      </aside>
      <main className="flex-1 overflow-y-auto flex flex-col">
        {Tool ? (
          <>
            <div className="sticky top-0 z-10 bg-neutral-900 border-b border-green-900 px-6 py-3 flex items-center justify-between shrink-0">
              <div>
                {toolCat && (
                  <div className="text-xs font-mono text-green-600 mb-0.5">
                    // {toolCat.label}
                  </div>
                )}
                <div className="text-sm font-bold text-green-300 flex items-center gap-2">
                  <span className="text-cyan-600 font-mono font-normal text-xs w-7 shrink-0">
                    {meta?.icon}
                  </span>
                  {meta?.label}
                </div>
                <div className="text-xs text-green-500">{meta?.desc}</div>
              </div>
              <div className="flex items-center gap-2">
                {saved[toolId] && (
                  <>
                    <span className="text-xs text-green-600 font-mono">
                      // saved
                    </span>
                    <button
                      onClick={() =>
                        setSaved((s) => {
                          const n = { ...s };
                          delete n[toolId];
                          return n;
                        })
                      }
                      className="text-xs font-mono text-green-600 hover:text-red-500 cursor-pointer bg-transparent border-0 transition-colors"
                    >
                      [ clear ]
                    </button>
                  </>
                )}
                <button
                  onClick={share}
                  className="px-3 py-1.5 rounded text-xs font-mono bg-transparent border border-green-900 text-green-500 hover:border-green-700 hover:text-green-400 cursor-pointer transition-colors"
                >
                  {shareCopied ? "✓ link copied" : "[ share ]"}
                </button>
              </div>
            </div>
            <div className="p-6 max-w-4xl mx-auto w-full">
              <ErrorBoundary key={toolId}>
                <Suspense
                  fallback={
                    <div className="space-y-3 animate-pulse">
                      <div className="h-2.5 bg-green-950 rounded w-1/4" />
                      <div className="h-20 bg-green-950 rounded" />
                      <div className="flex gap-2">
                        <div className="h-7 bg-green-950 rounded w-20" />
                        <div className="h-7 bg-green-950 rounded w-16" />
                      </div>
                      <div className="h-20 bg-green-950 rounded" />
                      <div className="h-2.5 bg-green-950 rounded w-2/5" />
                    </div>
                  }
                >
                  <Tool
                    init={saved[toolId] || initVal}
                    onInput={handleInput}
                  />
                </Suspense>
              </ErrorBoundary>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center font-mono">
              <div className="text-4xl mb-3 text-green-600">404</div>
              <div className="text-green-500 mb-3">// tool not found</div>
              <button
                onClick={() => nav("/")}
                className="text-green-500 text-sm border-0 bg-transparent cursor-pointer hover:text-green-300"
              >
                cd ..
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
