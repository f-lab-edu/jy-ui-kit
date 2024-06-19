export interface SwitchRootProps extends ComponentPropsWithoutRefWithAsChild<"button"> {
  defaultChecked?: boolean;
  onSwitchStateChange?: (checkStatus: boolean) => void;
}
