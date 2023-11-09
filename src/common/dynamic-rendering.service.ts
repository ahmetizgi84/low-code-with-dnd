import React from "react";

import { IComponent } from "@/common/types";
import { Components } from "@/common/constants";

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
