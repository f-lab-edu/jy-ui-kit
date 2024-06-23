import clsx from "clsx";
import { forwardRef } from "react";

import { Slot } from "@/slot";

import { useAvatarContext } from "../root";

import type { AvatarFallbackProps } from "../avatar.types";
import type { ForwardedRef } from "react";

export const AvatarFallback = forwardRef((props: AvatarFallbackProps, forwardedRef: ForwardedRef<HTMLSpanElement>) => {
  const { asChild, children, className, ...avatarFallbackProps } = props;
  const Comp = asChild ? Slot : "span";

  const avatarContext = useAvatarContext();

  return avatarContext?.imageLoadingStatus !== "SUCCESS" ? (
    <Comp
      ref={forwardedRef}
      className={clsx("base-avatar-fallback", className)}
      {...avatarFallbackProps}
      {...avatarContext?.extraProps.fallbackProps}
    >
      {typeof children === "function" ? children(avatarContext?.imageLoadingStatus) : children}
    </Comp>
  ) : null;
});

AvatarFallback.displayName = "Avatar.Fallback";

export const Fallback = AvatarFallback;
