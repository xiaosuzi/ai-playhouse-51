import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ChevronsUp, ChevronsDown } from "lucide-react";

interface SortControlsProps {
  index: number;
  total: number;
  onMove: (direction: "up" | "down" | "top" | "bottom") => void;
  disabled?: boolean;
}

export default function SortControls({ index, total, onMove, disabled }: SortControlsProps) {
  return (
    <div className="flex items-center gap-0.5">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        disabled={disabled || index === 0}
        onClick={() => onMove("top")}
        title="置顶"
      >
        <ChevronsUp className="w-3.5 h-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        disabled={disabled || index === 0}
        onClick={() => onMove("up")}
        title="上移"
      >
        <ArrowUp className="w-3.5 h-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        disabled={disabled || index === total - 1}
        onClick={() => onMove("down")}
        title="下移"
      >
        <ArrowDown className="w-3.5 h-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        disabled={disabled || index === total - 1}
        onClick={() => onMove("bottom")}
        title="置底"
      >
        <ChevronsDown className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}
