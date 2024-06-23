import clsx from "clsx";
import { forwardRef, useState } from "react";

import { Slot } from "@/slot";
import { createContext } from "@/utils/react";

import { getAvatarExtraProps } from "../get-avatar-extra-props";

import type { AvatarContext, AvatarProps, ImageLoadingStatus } from "../avatar.types";
import type { ForwardedRef } from "react";

const [AvatarProvider, useContext] = createContext<AvatarContext>({
  contextName: "AvatarContext",
  consumerHookName: "useAvatarContext",
});

export const useAvatarContext = useContext;

export const Avatar = forwardRef((props: AvatarProps, forwardedRef: ForwardedRef<HTMLSpanElement>) => {
  const { asChild, className, ...avatarProps } = props;

  const Comp = asChild ? Slot : "span";

  const [imageLoadingStatus, setLoadingStatus] = useState<ImageLoadingStatus>("IDLE");

  const extraProps = getAvatarExtraProps();

  return (
    <AvatarProvider value={{ imageLoadingStatus, onImageLoadingStatusChange: setLoadingStatus, extraProps }}>
      <Comp
        ref={forwardedRef}
        className={clsx("base-avatar-root", className)}
        {...avatarProps}
        {...extraProps.rootProps}
      />
    </AvatarProvider>
  );
});

Avatar.displayName = "Avatar.Root";

export const Root = Avatar;
