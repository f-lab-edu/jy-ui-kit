import { Slot } from "@jy-headless-ui/slot";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clsx from "clsx";
import { forwardRef } from "react";

import { base_aspect_ratio_root_wrapper, base_aspect_ratio_root, ratio } from "./root.css";

import type { AspectRatioProps } from "../aspect-ratio-types";
import type { ForwardedRef } from "react";

export const AspectRatio = forwardRef((props: AspectRatioProps, forwardedRef: ForwardedRef<HTMLDivElement>) => {
  const { asChild, ratio: propsRatio = 1, className, ...aspectRatioProps } = props;

  const Comp = asChild ? Slot : "div";

  return (
    <div
      className={base_aspect_ratio_root_wrapper}
      style={assignInlineVars({
        [ratio]: propsRatio.toString(),
      })}
    >
      <Comp
        ref={forwardedRef}
        className={clsx(base_aspect_ratio_root, "base-aspect-ratio-root", className)}
        {...aspectRatioProps}
      />
    </div>
  );
});

AspectRatio.displayName = "AspectRation.Root";

export const Root = AspectRatio;
