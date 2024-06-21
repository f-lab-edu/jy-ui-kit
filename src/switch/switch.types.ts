export interface SwitchRootProps extends ComponentPropsWithoutRefWithAsChild<"button"> {
  defaultChecked?: boolean;
  onSwitchStateChange?: (checkStatus: boolean) => void;
}

export type UseSwitchArgs = Omit<SwitchRootProps, "asChild">;
