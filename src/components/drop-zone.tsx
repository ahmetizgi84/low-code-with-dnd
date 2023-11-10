import type { FC } from "react";
import classNames from "classnames";

import { ComponentTypes } from "@/common/types";
import { useDropComponent } from "@/hooks/useDropComponent";

type TDropZone = {
  id: string;
  type: ComponentTypes;
  className?: string;
};

const DropZone: FC<TDropZone> = ({ className, type, id, ...rest }) => {
  const { drop, isActive } = useDropComponent(id);

  return <div className={classNames("transition-all", { active: isActive }, className)} ref={drop} {...rest} />;
};
export { DropZone };
