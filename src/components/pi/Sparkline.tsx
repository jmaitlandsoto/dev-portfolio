import { sparklinePath } from "./sparklinePath";

const WIDTH = 200;
const HEIGHT = 36;

export interface ISparklineProps {
  values: number[];
  label: string;
}

export function Sparkline({ values, label }: ISparklineProps) {
  const path = sparklinePath(values, WIDTH, HEIGHT, 3);
  if (!path) return null;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className="w-full h-9 overflow-visible text-sky-400"
      role="img"
      aria-label={label}
    >
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
