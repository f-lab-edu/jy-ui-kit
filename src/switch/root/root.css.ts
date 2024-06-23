import { style } from "@vanilla-extract/css";

export const base_switch_hidden_input = style({
  transform: "translateX(-100%)",
  position: "absolute",
  pointerEvents: "none",
  margin: 0,
  opacity: 0,
});
