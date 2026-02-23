import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type RegisterDraft = {
  email: string;
  password: string;
  username: string;
  birthDate: string;
};

type RegisterStore = {
  draft: RegisterDraft;
  setDraft: (patch: Partial<RegisterDraft>) => void;
  clear: () => void;
  hasHydrated: boolean;
};

const initialDraft: RegisterDraft = {
  email: "",
  password: "",
  username: "",
  birthDate: "",
};

export const useRegisterStore = create<RegisterStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
      clear: () => set({ draft: initialDraft }),
      hasHydrated: false,
    }),
    {
      name: "register-draft",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.hasHydrated && state.hasHydrated;
      },
    }
  )
);