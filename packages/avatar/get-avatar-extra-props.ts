export const getAvatarExtraProps = () => {
  const dataAttrs = {
    "data-scope": "avatar",
  };

  return {
    rootProps: {
      ...dataAttrs,
      "data-part": "root",
    },

    imageProps: {
      ...dataAttrs,
      "data-part": "image",
    },

    fallbackProps: {
      ...dataAttrs,
      "data-part": "fallback",
    },
  } as const;
};
