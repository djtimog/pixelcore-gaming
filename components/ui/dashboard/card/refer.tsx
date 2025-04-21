import {   type LucideIcon } from "lucide-react";

export const RefersCard = ({
    name,
    description,
    Icon,
    ActionIcon,
    onClick,
  }: {
    name: string;
    description: string;
    Icon: LucideIcon;
    ActionIcon: LucideIcon;
    onClick: () => void;
  }) => {
    return (
      <div
        className="relative flex h-28 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-slate-300 bg-opacity-20 p-5 dark:bg-slate-600"
        onClick={onClick}
      >
        <Icon className="absolute bottom-0 left-0 -ml-7 size-32 -rotate-45 font-extrabold text-primary opacity-70" />
        <ActionIcon className="absolute right-0 top-0 m-2" />
        <div className="relative z-10 h-full w-full">
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="truncate text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    );
  };