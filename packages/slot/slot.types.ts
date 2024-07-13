import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface SlotProps extends ComponentPropsWithoutRef<"element"> {
  /**
   * 병합된 `Slot` 컴포넌트와, `children` `class` 후처리 로직
   * {@link https://github.com/radix-ui/primitives/issues/2631}
   */
  postProcessClassName?: (className: string) => string;
}

export interface SlottableProps {
  children: ReactNode;
}
