import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { TThemeState } from "./types";

export const useThemeStore = create<TThemeState>()(
	devtools(
		// persist(
		(set, get) => ({
			
            
		})
	)
);
