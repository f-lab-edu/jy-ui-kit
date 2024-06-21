export interface SwitchRootProps extends ComponentPropsWithoutRefWithAsChild<"button"> {
  defaultChecked?: boolean;
  onSwitchStateChange?: (checkStatus: boolean) => void;
}

export type UseSwitchArgs = Omit<SwitchRootProps, "asChild">;

export interface GetSwitchExtraPropsArgs extends Pick<SwitchRootProps, "disabled"> {
  checked: boolean;
}
