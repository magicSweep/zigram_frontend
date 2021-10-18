import { Action, Reducer } from "redux";
import { ThemeState, ThemeAction } from "./types";

const themeInitialState: ThemeState = {
  mode: "light",
};

export const themeReducer: Reducer<ThemeState, ThemeAction> = (
  state = themeInitialState,
  action: ThemeAction
) => {
  switch (action.type) {
    case "SET_MODE":
      return {
        mode: action.mode,
      };

    default:
      return state;
  }
};
