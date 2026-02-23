import React from "react";
import { Button } from "components/ui/Button.tsx";

type Mode = "list" | "search" | "create" | "edit";

type PanelProps = {
  isOpen?: boolean;

  // стан
  mode: Mode;
  setMode: (m: Mode) => void;

  // пошук
  query: string;
  setQuery: (q: string) => void;

  // рендер “тіла”
  renderBody: (args: { mode: Mode; query: string }) => React.ReactNode;

  // можна налаштовувати під сутність
  createLabel?: string;
};

const Panel = ({
                 isOpen = false,
                 mode,
                 setMode,
                 query,
                 setQuery,
                 renderBody,
                 createLabel = "Create",
               }: PanelProps) => {
  return (
    <div
      className={`${
        isOpen ? "top-[90px] w-[600px]" : "top-1/2 -translate-y-1/2 w-[160%] h-[160%]"
      } absolute transition-all duration-300 left-1/2 -translate-x-1/2 rounded-[48px] flex flex-col items-center justify-center border bg-black/[10%] backdrop-blur-[4px] overflow-hidden z-[-1]`}
    >
      <div
        className={`w-full h-[800px] ${!isOpen ? "hidden" : ""} p-[20px] flex flex-col items-center gap-[16px] bg-white/[2%]`}
      >

        {/* Search bar */}
        <div className="w-full h-[50px] flex items-center rounded-full backdrop-blur-[8.3px] border border-white/[80%] bg-black/[10%]">
          <img src="/assets/icons/icon8.svg" alt="icon" className="h-[24px] ml-[16px]" />
          <input
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setQuery(v);
              // якщо почали шукати — логічно перейти в search
              if (v.trim().length > 0) setMode("search");
              // якщо стерли — повернутись в list (або лишити як є — на твій смак)
              if (v.trim().length === 0 && mode === "search") setMode("list");
            }}
            type="text"
            placeholder="Search"
            className="flex-1 mr-[12px] bg-transparent font-normal font-inter text-[20px] text-white placeholder-[#D9D9D9] border-none focus:ring-0"
          />
        </div>

        {/* Body */}
        <div className="w-full flex-1 rounded-[35px] flex flex-col gap-[16px] border border-white/[80%] bg-black/[10%] p-[16px] text-white/90 overflow-auto">
          {renderBody({ mode, query })}
        </div>

        {/* Bottom action */}
        <Button
          variant="transparent"
          className="w-[50%] h-[55px]"
          onClick={() => setMode("create")}
        >
          {createLabel}
        </Button>
      </div>
    </div>






  // <div className={`${isOpen ? "top-[90px] w-[600px]" : "top-1/2 -translate-y-1/2 w-[160%] h-[160%]"} absolute transition-all duration-300 left-1/2 -translate-x-1/2 rounded-[48px]  flex flex-col items-center justify-center border bg-black/[10%] backdrop-blur-[4px] overflow-hidden z-[-1]`}>
  //   <div className={`w-full h-[800px] ${!isOpen && "hidden"} p-[20px] flex flex-col items-center gap-[16px] bg-white/[2%]`}>
  //     <div className={`w-full h-[50px] flex items-center rounded-full backdrop-blur-[8.3px] border border-white/[80%] bg-black/[10%]`}>
  //       <img
  //         src="/assets/icons/icon8.svg"
  //         alt="icon"
  //         className="h-[24px] ml-[16px]"
  //       />
  //       <input
  //         type="text"
  //         placeholder={searchPlaceholder}
  //         className="flex-1 mr-[12px] bg-transparent font-normal font-inter  text-[20px] text-white placeholder-[#D9D9D9] border-none focus:ring-0"
  //       />
  //     </div>
  //     <div className="w-full flex-1 rounded-[35px] flex flex-col gap-[16px] border border-white/[80%] bg-black/[10%]">
  //       {children}
  //     </div>
  //     <Button
  //       variant="transparent"
  //       className="w-[50%] h-[55px]"
  //     >{createLabel}</Button>
  //   </div>
  // </div>
  );
};

export default Panel;