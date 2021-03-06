import { Reducer } from "redux";
import { getInitialMode } from "../utils/main";
import { ThemeState, ThemeAction } from "./types";
import { PaletteOptions } from "@mui/material/styles";

const initialMode: PaletteOptions["mode"] = "light";
//const initialMode: PaletteOptions["mode"] = getInitialMode();

//console.log("-----INITIAL THEME MODE", initialMode);

const themeInitialState: ThemeState = {
  mode: initialMode,
};

export const themeReducer: Reducer<ThemeState, ThemeAction> = (
  state = themeInitialState,
  action: ThemeAction
) => {
  switch (action.type) {
    case "TOGGLE_MODE":
      return {
        mode: state.mode === "light" ? "dark" : "light",
      };

    default:
      return state;
  }
};
