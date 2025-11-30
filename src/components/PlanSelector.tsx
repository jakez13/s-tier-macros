import { Button } from "./ui/button";

interface PlanSelectorProps {
  selectedPlan: 'lean' | 'bulk';
  onPlanChange: (plan: 'lean' | 'bulk') => void;
}

export const PlanSelector = ({ selectedPlan, onPlanChange }: PlanSelectorProps) => {
  return (
    <div className="flex gap-3">
      <Button
        onClick={() => onPlanChange('lean')}
        variant={selectedPlan === 'lean' ? 'default' : 'outline'}
        className={`flex-1 text-base font-bold ${
          selectedPlan === 'lean'
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-primary/10'
        }`}
      >
        DURDEN LEAN PLAN
      </Button>
      <Button
        onClick={() => onPlanChange('bulk')}
        variant={selectedPlan === 'bulk' ? 'default' : 'outline'}
        className={`flex-1 text-base font-bold ${
          selectedPlan === 'bulk'
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-primary/10'
        }`}
      >
        DURDEN BULK PLAN
      </Button>
    </div>
  );
};
