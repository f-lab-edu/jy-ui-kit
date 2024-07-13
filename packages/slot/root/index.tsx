import { Children, cloneElement, forwardRef, isValidElement } from "react";

import { SlotClone } from "../slot-clone";
import { isSlottable } from "../slottable";

import type { SlotProps, SlottableProps } from "../slot.types";
import type { ForwardedRef, ReactElement } from "react";

const MAX_NUM_OF_SLOTTABLE = 1;
const MAX_NUM_OF_SLOTTABLE_CHILDREN = 1;

export const Slot = forwardRef((props: SlotProps, forwardedRef: ForwardedRef<HTMLElement>) => {
  const { children, ...slotProps } = props;
  const childrenArray = Children.toArray(children);

  const slottableComp: ReactElement<SlottableProps>[] = childrenArray.filter(isSlottable);

  if (slottableComp.length > MAX_NUM_OF_SLOTTABLE) {
    throw new Error("Slottable 컴포넌트는 하나만 존재해야 합니다.");
  }

  if (slottableComp?.[0]) {
    const firstSlottable = slottableComp[0];
    const newContainer = firstSlottable.props.children;

    if (Children.count(newContainer) > MAX_NUM_OF_SLOTTABLE_CHILDREN) {
      throw new Error("Slottable 컴포넌트의 children props 에는 단일 ReactElement 만 전달할 수 있습니다.");
    }

    if (!isValidElement(newContainer)) return null;

    const slottableCompNewChildren = childrenArray.map((child) => {
      if (child === firstSlottable) {
        return newContainer.props.children;
      } else {
        return child;
      }
    });

    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {cloneElement(newContainer, undefined, ...slottableCompNewChildren)}
      </SlotClone>
    );
  }

  return (
    <SlotClone {...slotProps} ref={forwardedRef}>
      {children}
    </SlotClone>
  );
});

Slot.displayName = "Slot";

export const Root = Slot;
