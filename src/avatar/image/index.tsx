import clsx from "clsx";
import { forwardRef, useLayoutEffect } from "react";

import { Slot } from "@/slot";
import { useCallbackRef } from "@/utils/react";

import { useAvatarContext } from "../root";

import { useImageLoadingStatus } from "./use-image-loading-status";

import type { AvatarImageProps, ImageLoadingStatus } from "../avatar.types";
import type { ForwardedRef } from "react";

export const AvatarImage = forwardRef((props: AvatarImageProps, forwardedRef: ForwardedRef<HTMLImageElement>) => {
  const { asChild, onImageLoadingStatusChange, className, ...avatarImageProps } = props;
  const { src, srcSet, crossOrigin, referrerPolicy } = avatarImageProps;

  const Comp = asChild ? Slot : "img";

  const avatarContext = useAvatarContext();
  const imageLoadingStatus = useImageLoadingStatus({ src, srcset: srcSet, crossOrigin, referrerPolicy });

  const handleImageLoadingStatus = useCallbackRef((status: ImageLoadingStatus) => {
    onImageLoadingStatusChange?.(status);
    avatarContext?.onImageLoadingStatusChange(status);
  });

  useLayoutEffect(() => {
    if (imageLoadingStatus !== "IDLE") {
      handleImageLoadingStatus.current?.(imageLoadingStatus);
    }
  }, [imageLoadingStatus, handleImageLoadingStatus]);

  return imageLoadingStatus === "SUCCESS" ? (
    <Comp
      ref={forwardedRef}
      className={clsx("base-avatar-image", className)}
      {...avatarImageProps}
      {...avatarContext?.extraProps.imageProps}
    />
  ) : null;
});

AvatarImage.displayName = "Avatar.Image";

export const Image = AvatarImage;
