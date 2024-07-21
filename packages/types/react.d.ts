import type { Combine } from "./utils";
import type {
  ComponentPropsWithoutRef,
  DetailedHTMLProps,
  HTMLAttributes,
  ElementType,
  AriaAttributes,
  AriaRole,
} from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      element: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export type ComponentPropsWithoutRefWithAsChild<Comp extends ElementType, Props = unknown> = Combine<
  Combine<{ asChild?: boolean }, Props>,
  ComponentPropsWithoutRef<Comp>
>;

export type AriaAttributeWithRole = AriaAttributes & { role?: AriaRole };
