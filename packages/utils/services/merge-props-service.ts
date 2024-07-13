import { clsx } from "clsx";

class MergePropsService {
  private overrideProps!: AnyObj;
  private props1!: AnyObj;
  private props2!: AnyObj;

  static MergeProps = new MergePropsService();

  setProps(props1: AnyObj, props2: AnyObj) {
    this.props1 = props1;
    this.props2 = props2;

    this.overrideProps = { ...props1, ...props2 };

    return this;
  }

  mergeEventHandlers() {
    Object.keys(this.props2).forEach((propName) => {
      const isEventHandler = /^on[A-Z]/.test(propName);

      if (isEventHandler) {
        const props1EventHandler = this.props1[propName];
        const props2EventHandler = this.props2[propName];

        if (props1EventHandler && props2EventHandler) {
          this.overrideProps[propName] = (...args: unknown[]) => {
            props2EventHandler(...args);
            props1EventHandler(...args);
          };
        }
      }
    });

    return this;
  }

  mergeStyles() {
    const props1Styles = this.props1["style"];
    const props2Styles = this.props2["style"];

    this.overrideProps["style"] = { ...props1Styles, ...props2Styles };

    return this;
  }

  mergeClassNames(postProcess?: (className: string) => string) {
    const props1ClassNames = this.props1["className"];
    const props2ClassNames = this.props2["className"];

    this.overrideProps["className"] = clsx(props1ClassNames, props2ClassNames);

    postProcess && (this.overrideProps["className"] = postProcess(this.overrideProps["className"]));

    return this;
  }

  build() {
    return this.overrideProps;
  }
}

export default MergePropsService.MergeProps;
