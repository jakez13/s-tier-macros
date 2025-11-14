interface ProgressBarProps {
  current: number;
  target: number;
  label: string;
  color?: string;
}

export const ProgressBar = ({ current, target, label, color = "bg-primary" }: ProgressBarProps) => {
  const percentage = Math.min((current / target) * 100, 100);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-foreground font-semibold">{label}</span>
        <span className="text-muted-foreground">
          {Math.round(current)}/{Math.round(target)}g ({Math.round(percentage)}%)
        </span>
      </div>
      <div className="w-full bg-secondary/50 rounded-full h-3 overflow-hidden border border-border">
        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
