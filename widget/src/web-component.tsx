import ReactDom from "react-dom/client";
import Widget from "./components/Widget";

// eslint-disable-next-line react-refresh/only-export-components
export const normalizeAttribute = (attribute: string) => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

class WidgetWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes();
    const root = ReactDom.createRoot(this.shadowRoot as ShadowRoot);
    root.render(<Widget {...props} />);
  }

  getPropsFromAttributes() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props: { [key: string]: any } = {};
    for (const { name, value } of this.attributes) {
      props[normalizeAttribute(name)] = value;
    }
    return props;
  }
}

export default WidgetWebComponent;
