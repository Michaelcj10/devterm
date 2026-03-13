import { useState, memo } from "react";

const SidebarBtn = memo(function SidebarBtn({
  id,
  m,
  active,
  focused = false,
  activeRef,
  onNav,
  pinned,
  onTogglePin,
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      ref={activeRef}
      className="relative flex items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        onClick={() => onNav(id)}
        className={`flex-1 text-left rounded px-3 py-1.5 text-xs flex items-center gap-2 border-0 cursor-pointer transition-colors font-mono ${
          active
            ? "bg-green-900 text-green-200 border border-green-700"
            : focused
              ? "bg-green-950 text-green-300 ring-1 ring-green-800"
              : "text-green-500 hover:text-green-300 hover:bg-green-950"
        }`}
      >
        <span className="w-6 shrink-0 text-cyan-400">{m.icon}</span>
        <span className="flex-1">{m.label}</span>
      </button>
      {(hover || pinned) && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(id);
          }}
          className="absolute right-1 text-xs border-0 bg-transparent cursor-pointer font-mono text-green-500 hover:text-cyan-500 px-1"
        >
          {pinned ? "★" : "☆"}
        </button>
      )}
    </div>
  );
});

export default SidebarBtn;
