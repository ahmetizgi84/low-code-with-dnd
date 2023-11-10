import React from "react";

import { IComponent } from "@/common/types";
import { Components } from "@/common/constants";
// import { useInteractive } from "@/hooks/useInteractive";

export function createPage(layout: IComponent): React.ReactNode {
  if (!layout) return null;

  function renderer(config: IComponent): React.ReactNode {
    if (!config) return null;

    // return config.map((item) => createComponent(item));
    return createComponent(config);
  }

  function createComponent(component: IComponent): React.ReactNode {
    const { type, id, props, children } = component;

    const element = React.createElement(
      Components[type] as any,
      // ForwardedComponent as any,
      {
        ...props,
        id,
        key: id,
      },
      Array.isArray(children) ? children.map(renderer) : renderer(children ?? null)
    );

    return element;
  }

  return renderer(layout);
}

/*
const ForwardedComponent = React.forwardRef((rest: IComponent) => {
  const { type } = rest;
  const { props, ref } = useInteractive(rest, false);

  const element = React.createElement(Components[type] as any, {
    ...rest,
    ...props,
    ref,
  });

  return element;
});

ForwardedComponent.displayName = "ForwardedComponent";
*/

/*
export function createPage(layout: IComponent[]): React.ReactNode {
  if (!layout) return null;

  function renderer(config: IComponent[]): React.ReactNode {
    if (!config) return null;

    return config.map((item) => createComponent(item));
  }

  function createComponent(component: IComponent): React.ReactNode {
    const { type, id, props, children } = component;

    const element = React.createElement(
      Components[type] as any,
      {
        ...props,
        id,
        key: id,
      },
      renderer(children || [])
    );

    return element;
  }

  return renderer(layout);
}
*/

/*
export function createPage(layout: IComponent[]): React.ReactNode {
  if (!layout) return null;

  function renderer(config: IComponent[]): React.ReactNode {
    if (!config) return null;

    return createComponent(config);
  }

  function createComponent(items: IComponent[]): React.ReactNode {
    for (const child of items) {
      console.log("child:", child);
      const { type, id, props, children } = child;

      const element = React.createElement(
        Components[type] as any,
        {
          ...props,
          id,
          key: id,
        },
        renderer(children)
      );

      return element;
    }
  }

  return renderer(layout);
}
*/

/*
export function createPage(data?: IComponent): React.ReactNode {
  if (!data) return null;

  function createComponent(item: IComponent): React.ReactNode {
    const { data, type } = item;
    const { items, embeddedView, children, id, ...rest } = data;

    // let dropzoneElement = null;
    // if (dropzone) {
    //   dropzoneElement = React.createElement(DropZone as any, {
    //     id: `dropzone-${uniqid()}`,
    //     key: `dropzone-${uniqid()}`,
    //   });
    // }

    const element = React.createElement(
      Components[type] as any,
      {
        ...rest,
        id,
        key: id,
      } as any,
      Array.isArray(items) ? items.map(renderer) : renderer(embeddedView ?? children ?? null)
      //   dropzoneElement
    );

    return element;
  }

  function renderer(config: IComponent | string | null): React.ReactNode {
    if (!config) return null;
    if (typeof config == "string") return config;

    return createComponent(config);
  }

  return renderer(data);
}
*/
