import type { getSwitchExtraProps } from "./get-switch-extra-props";

export interface SwitchRootProps extends ComponentPropsWithoutRefWithAsChild<"button"> {
  defaultChecked?: boolean;
  checked?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  onSwitchStateChange?: (checkStatus: boolean) => void;
}

export type SwitchExtraProps = ReturnType<typeof getSwitchExtraProps>;

export interface SwitchContext {
  extraProps: SwitchExtraProps;
}

export type UseSwitchArgs = Omit<SwitchRootProps, "asChild">;

export interface GetSwitchExtraPropsArgs
  extends Pick<SwitchRootProps, "disabled" | "readOnly" | "invalid" | "checked"> {}

export interface SwitchThumbProps extends ComponentPropsWithoutRefWithAsChild<"span"> {}
