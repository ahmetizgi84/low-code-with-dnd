import { FC } from "react";

import { TGenericComponent } from "@/common/types";
import { useInteractive } from "@/hooks/useInteractive";

const Component: FC<TGenericComponent> = ({ data, components, path }) => {
  const comp = components[data.id];

  const { element } = useInteractive(comp, path);
  return element;
};
export default Component;
