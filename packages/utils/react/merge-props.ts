import { clsx } from "clsx";

export const mergeProps = (props1?: AnyObj, props2?: AnyObj, postProcess?: (className: string) => string) => {
  if (!props1 && !props2) return {};

  if (!props1) return { ...props2 };

  if (!props2) return { ...props1 };

  const overriddenProps = { ...props1, ...props2 };

  // 이벤트 핸들러 머지
  Object.keys(props2).forEach((propName) => {
    const isEventHandler = /^on[A-Z]/.test(propName);

    if (isEventHandler) {
      const props1EventHandler = props1[propName];
      const props2EventHandler = props2[propName];

      if (props1EventHandler && props2EventHandler) {
        overriddenProps[propName] = (...args: unknown[]) => {
          props2EventHandler(...args);
          props1EventHandler(...args);
        };
      }
    }
  });

  // 스타일 머지
  const props1Styles = props1["style"];
  const props2Styles = props2["style"];

  overriddenProps["style"] = { ...props1Styles, ...props2Styles };

  // 클래스명 머지
  const props1ClassNames = props1["className"];
  const props2ClassNames = props2["className"];

  overriddenProps["className"] = clsx(props1ClassNames, props2ClassNames);
  postProcess && (overriddenProps["className"] = postProcess(overriddenProps["className"]));

  return overriddenProps;
};
