import { type LucideIcon } from "lucide-react";

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
      className="relative w-full h-auto flex min-h-32 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-slate-300 p-7 dark:bg-secondary"
      onClick={onClick}
    >
      <Icon
        className={`absolute bottom-0 left-0 -ml-5 size-32 ${name === "Copy Referral Link" ? "" : "-rotate-45"} font-extrabold text-primary opacity-90`}
      />
      <ActionIcon className="absolute right-0 top-0 m-2" />
      <div className="relative z-10 h-full w-full">
        <h3 className="text-2xl font-bold text-black dark:text-white">{name}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
