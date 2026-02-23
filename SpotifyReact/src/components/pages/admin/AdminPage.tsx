import { useState } from "react";
import Panel from "components/pages/admin/Panel.tsx";
import { UsersBody } from "./UsersBody";
import Header from "components/main/Header.tsx";

type Entity = "user" | "role" | "artist" | "album";
type Mode = "list" | "search" | "create" | "edit";

const AdminPage = () => {
  const [active, setActive] = useState<Entity>("user");

  const [panelState, setPanelState] = useState<Record<Entity, { mode: Mode; query: string }>>({
    user: { mode: "list", query: "" },
    role: { mode: "list", query: "" },
    artist: { mode: "list", query: "" },
    album: { mode: "list", query: "" },
  });

  const setMode = (entity: Entity, mode: Mode) =>
    setPanelState((s) => ({ ...s, [entity]: { ...s[entity], mode } }));

  const setQuery = (entity: Entity, query: string) =>
    setPanelState((s) => ({ ...s, [entity]: { ...s[entity], query } }));

  const isOpen = (entity: Entity) => active === entity;

  return (
    <div className="w-full min-h-[100vh] bg-[#181818] relative flex flex-col items-center overflow-hidden z-0">
      <div className="w-[104vw] h-[56.4vh] rounded-[100%] absolute left-[-5.6vw] top-[-46.3vh] bg-[#A5180C] blur-[200px] opacity-70 z-[-1]"/>
      <div className="w-[15vw] h-[66.45%] rounded-[100%] absolute right-[94vw] top-[16%] bg-[#FE7C1B] blur-[200px] opacity-45 z-[-1]"/>
      <div className="w-[15vw] h-[66.45%] rounded-[100%] absolute left-[94vw] top-[16%] bg-[#FE7C1B] blur-[200px] opacity-45 z-[-1]"/>
      <Header/>
      <div className="mt-[30px] text-neutral-100 font-medium font-poppins text-[24px]">
        <div className="w-[101vw] h-[82px] flex items-center gap-[52px] justify-center bg-black/[10%] border border-white/[80%]>">
          {(["user", "role", "artist", "album"] as Entity[]).map((e) => (
            <div
              key={e}
              className={`${active === e ? "text-[#F16001]" : ""} cursor-pointer relative`}
              onClick={() => setActive(e)}
            >
              {e.charAt(0).toUpperCase() + e.slice(1)}

              {/* Panel саме для цього табу */}
              <Panel
                isOpen={isOpen(e)}
                createLabel={`Create ${e}`}
                mode={panelState[e].mode}
                setMode={(m) => setMode(e, m)}
                query={panelState[e].query}
                setQuery={(q) => setQuery(e, q)}
                renderBody={({ mode, query }) => {
                  if (e === "user") return <UsersBody mode={mode} query={query} />;
                  return <div>Body для {e} (зробиш свій компонент)</div>;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>






    // <div className="w-full min-h-[100vh] bg-[#181818] relative flex flex-col items-center overflow-hidden z-0">
    //   <div className="w-[104vw] h-[56.4vh] rounded-[100%] absolute left-[-5.6vw] top-[-46.3vh] bg-[#A5180C] blur-[200px] opacity-70 z-[-1]"/>
    //   <div className="w-[15vw] h-[66.45%] rounded-[100%] absolute right-[94vw] top-[16%] bg-[#FE7C1B] blur-[200px] opacity-45 z-[-1]"/>
    //   <div className="w-[15vw] h-[66.45%] rounded-[100%] absolute left-[94vw] top-[16%] bg-[#FE7C1B] blur-[200px] opacity-45 z-[-1]"/>
    //   <Header/>
    //   <div className="flex mt-[30px] flex-col items-center text-neutral-100">
    //     <div className="w-[101vw] h-[82px] flex font-medium font-poppins text-[24px] bg-black/[10%] border border-white/[80%]">
    //       <div className="h-[100%] px-[32px] m-auto py-[18px] relative gap-x-[64px] flex items-center">
    //         <div className="relative z-0">
    //           <div onClick={() => {PanelCloseHandler(); setUserPanelOpen(!userPanelOpen)}} className={`${userPanelOpen && "text-[#F16001]"} hover:cursor-pointer z-10`}>User</div>
    //           <Panel isOpen={userPanelOpen}/>
    //         </div>
    //         <div className="relative z-0">
    //           <div onClick={() => {PanelCloseHandler(); setRolePanelOpen(!rolePanelOpen)}} className={`${rolePanelOpen && "text-[#F16001]"} hover:cursor-pointer`}>Role</div>
    //           <Panel isOpen={rolePanelOpen}/>
    //         </div>
    //         <div className="relative z-0">
    //           <div onClick={() => {PanelCloseHandler(); setArtistPanelOpen(!artistPanelOpen)}} className={`${artistPanelOpen && "text-[#F16001]"} hover:cursor-pointer`}>Artist</div>
    //           <Panel isOpen={artistPanelOpen}/>
    //         </div>
    //         <div className="relative z-0">
    //           <div onClick={() => {PanelCloseHandler(); setAlbumPanelOpen(!albumPanelOpen)}} className={`${albumPanelOpen && "text-[#F16001]"} hover:cursor-pointer`}>Album</div>
    //           <Panel isOpen={albumPanelOpen}/>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AdminPage;