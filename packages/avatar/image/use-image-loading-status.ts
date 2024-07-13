import { useLayoutEffect, useState } from "react";

import type { ImageLoadingStatus, UseImageLoadingStatusArgs } from "../avatar.types";

export const useImageLoadingStatus = ({ src, srcset, crossOrigin, referrerPolicy }: UseImageLoadingStatusArgs) => {
  const [loadingStatus, setLoadingStatus] = useState<ImageLoadingStatus>("IDLE");

  useLayoutEffect(() => {
    if (!src && !srcset) {
      setLoadingStatus("ERROR");
      return;
    }

    const updateLoadingStatus = (status: ImageLoadingStatus) => {
      if (ignore) return;
      setLoadingStatus(status);
    };

    let ignore = false;

    const image = new Image();

    updateLoadingStatus("LOADING");

    image.onload = () => updateLoadingStatus("SUCCESS");
    image.onerror = () => updateLoadingStatus("ERROR");
    image.crossOrigin = crossOrigin ?? null;
    image.referrerPolicy = referrerPolicy ?? "strict-origin-when-cross-origin";

    if (src) {
      image.src = src;
    }

    if (srcset) {
      image.srcset = srcset;
    }

    return () => {
      ignore = true;
    };
  }, [src, srcset, crossOrigin, referrerPolicy]);

  return loadingStatus;
};
