import Image from "next/image";
import { CATEGORY_ICON_ON_BRAND, type IncidentCategory } from "@/lib/categories";

interface CategoryChipProps {
  category: IncidentCategory;
  count: number;
}

export function CategoryChip({ category, count }: CategoryChipProps) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap rounded-md bg-surface-muted p-3">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary p-1">
        <span className="relative size-3.5">
          <Image src={CATEGORY_ICON_ON_BRAND[category]} alt="" fill sizes="14px" />
        </span>
      </span>
      <p className="text-black">
        <span className="text-base font-semibold">{count}</span> <span className="text-[13px] font-medium">{category}</span>
      </p>
    </div>
  );
}
