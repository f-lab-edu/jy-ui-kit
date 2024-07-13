import { isValidElement } from "react";

import type { SlottableProps } from "../slot.types";
import type { ReactElement, ReactNode } from "react";

export function isSlottable(children: ReactNode): children is ReactElement {
  return isValidElement(children) && children.type === Slottable;
}

export const Slottable = ({ children }: SlottableProps) => {
  return <>{children}</>;
};
