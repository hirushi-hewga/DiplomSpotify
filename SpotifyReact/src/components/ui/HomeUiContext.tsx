import { createContext, useContext, useMemo, useState, useCallback } from "react";

type HomeUiContextType = {
  playlistModalOpen: boolean;
  sidebarOpen: boolean;
  trackbarOpen: boolean;
  detailsTrackPanelOpen: boolean;

  trackbarActiveTab: "details" | "queue";
  queueActiveTab: "queue" | "recent";

  openPlaylistModal: () => void;
  closePlaylistModal: () => void;
  togglePlaylistModal: () => void;

  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  openTrackbar: () => void;
  closeTrackbar: () => void;
  toggleTrackbar: () => void;

  openDetailsTrackPanel: () => void;
  closeDetailsTrackPanel: () => void;
  toggleDetailsTrackPanel: () => void;

  searchQuery: string;
  setSearchQuery: (value: string) => void;
  clearSearchQuery: () => void;

  setTrackbarTab: (tab: "details" | "queue") => void;
  setQueueTab: (tab: "queue" | "recent") => void;
};

const HomeUiContext = createContext<HomeUiContextType | null>(null);

export const HomeUiProvider = ({ children }: { children: React.ReactNode }) => {
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [trackbarOpen, setTrackbarOpen] = useState(false);
  const [detailsTrackPanelOpen, setDetailsTrackPanelOpen] = useState(false);

  const [trackbarActiveTab, setTrackbarActiveTab] = useState<"details" | "queue">("details");
  const [queueActiveTab, setQueueActiveTab] = useState<"queue" | "recent">("queue");

  const openPlaylistModal = useCallback(() => setPlaylistModalOpen(true), []);
  const closePlaylistModal = useCallback(() => setPlaylistModalOpen(false), []);
  const togglePlaylistModal = useCallback(() => setPlaylistModalOpen((prev) => !prev), []);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);

  const openTrackbar = useCallback(() => setTrackbarOpen(true), []);
  const closeTrackbar = useCallback(() => {
    setTrackbarOpen(false);
    setTrackbarActiveTab("details");
    setQueueActiveTab("queue");
    setDetailsTrackPanelOpen(false);
  }, []);
  const toggleTrackbar = useCallback(() => setTrackbarOpen((prev) => !prev), []);

  const openDetailsTrackPanel = useCallback(() => setDetailsTrackPanelOpen(true), []);
  const closeDetailsTrackPanel = useCallback(() => setDetailsTrackPanelOpen(false), []);
  const toggleDetailsTrackPanel = useCallback(() => setDetailsTrackPanelOpen((prev) => !prev), []);

  const setTrackbarTab = useCallback(
    (tab: "details" | "queue") => setTrackbarActiveTab(tab),
    []
  );

  const setQueueTab = useCallback(
    (tab: "queue" | "recent") => setQueueActiveTab(tab),
    []
  );

  const [searchQuery, setSearchQuery] = useState("");

  const clearSearchQuery = useCallback(() => setSearchQuery(""), []);

  const value = useMemo(
    () => ({
      playlistModalOpen,
      sidebarOpen,
      trackbarOpen,
      detailsTrackPanelOpen,

      trackbarActiveTab,
      queueActiveTab,

      openPlaylistModal,
      closePlaylistModal,
      togglePlaylistModal,

      openSidebar,
      closeSidebar,
      toggleSidebar,

      openTrackbar,
      closeTrackbar,
      toggleTrackbar,

      openDetailsTrackPanel,
      closeDetailsTrackPanel,
      toggleDetailsTrackPanel,

      setTrackbarTab,
      setQueueTab,

      searchQuery,
      setSearchQuery,
      clearSearchQuery,
    }),
    [
      playlistModalOpen,
      sidebarOpen,
      trackbarOpen,
      detailsTrackPanelOpen,
      trackbarActiveTab,
      queueActiveTab,
      searchQuery,
      openPlaylistModal,
      closePlaylistModal,
      togglePlaylistModal,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      openTrackbar,
      closeTrackbar,
      toggleTrackbar,
      openDetailsTrackPanel,
      closeDetailsTrackPanel,
      toggleDetailsTrackPanel,
      setTrackbarTab,
      setQueueTab,
      setSearchQuery,
      clearSearchQuery,
    ]
  );

  return <HomeUiContext.Provider value={value}>{children}</HomeUiContext.Provider>;
};

export const useHomeUi = () => {
  const context = useContext(HomeUiContext);

  if (!context) {
    throw new Error("useHomeUi must be used within HomeUiProvider");
  }

  return context;
};