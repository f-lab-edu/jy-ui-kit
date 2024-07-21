import { MergeProps } from "@jy-headless-ui/utils";
import { Children, cloneElement, forwardRef, isValidElement } from "react";

import type { SlotProps } from "../slot.types";
import type { ComponentPropsWithRef, ForwardedRef, MutableRefObject, ReactElement, Ref } from "react";

const MAX_NUM_OF_SLOTTED_CHILDREN = 1;

function setRef<T>(node: T, ref?: Ref<T>) {
  if (typeof ref === "function") {
    ref(node);
  } else if (ref) {
    (ref as MutableRefObject<T>).current = node;
  }
}

function combineRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T) => refs.forEach((ref) => setRef(node, ref));
}

export const SlotClone = forwardRef((props: SlotProps, forwardedRef: ForwardedRef<HTMLElement>) => {
  const { children, ...slotProps } = props;

  if (Children.count(children) > MAX_NUM_OF_SLOTTED_CHILDREN) {
    throw new Error("Slot 컴포넌트의 children props 에는 단일 ReactElement 만 전달할 수 있습니다.");
  }

  // children 이 ReactElement 인지 체크
  if (isValidElement(children)) {
    return cloneElement<ComponentPropsWithRef<"element">>(children as ReactElement, {
      ...MergeProps.setProps(slotProps, children.props)
        .mergeEventHandlers()
        .mergeStyles()
        .mergeClassNames(slotProps.postProcessClassName)
        .build(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref: forwardedRef ? combineRefs(forwardedRef, (children as any)?.ref) : (children as any)?.ref,
    });
  }

  return null;
});

SlotClone.displayName = "SlotClone";
