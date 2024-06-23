import type { getSwitchExtraProps } from "./get-switch-extra-props";
import type { ComponentPropsWithoutRef, RefObject } from "react";

export interface SwitchRootProps extends ComponentPropsWithoutRefWithAsChild<"button"> {
  defaultChecked?: boolean;
  checked?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  onSwitchStateChange?: (checkStatus: boolean) => void;
}

export interface SwitchThumbProps extends ComponentPropsWithoutRefWithAsChild<"span"> {}

export interface SwitchHiddenInputProps extends ComponentPropsWithoutRef<"input"> {
  checked: boolean;
  extraProps: SwitchExtraProps["hiddenInputProps"];
}

export type SwitchExtraProps = ReturnType<typeof getSwitchExtraProps>;

export interface SwitchContext {
  extraProps: SwitchExtraProps;
}

export type UseSwitchArgs = Omit<SwitchRootProps, "asChild">;

export interface UseSwitchHiddenInputArgs extends Pick<SwitchHiddenInputProps, "checked"> {
  inputRef: RefObject<HTMLInputElement>;
}

export interface GetSwitchExtraPropsArgs
  extends Pick<SwitchRootProps, "disabled" | "readOnly" | "invalid" | "checked" | "required"> {}
