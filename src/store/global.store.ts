
import { create } from "zustand";
import type { Theme } from "../types/general";
type GlobalStore = {
    theme: Theme;
    toggleTheme: () => void;
};
export const useGlobalStore =
    create<GlobalStore>((set) => ({
        theme: "light",
        toggleTheme: () => {
            set((state) => ({

                theme:
                    state.theme === "light" ? "dark":"light", }));
        },
    }));
