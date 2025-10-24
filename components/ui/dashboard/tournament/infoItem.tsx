import { LucideIcon } from "lucide-react";

export function InfoItem({
  Icon,
  label,
  value,
}: {
  Icon: LucideIcon;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
