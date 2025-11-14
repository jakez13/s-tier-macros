export const ComingSoon = ({ title }: { title: string }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 pb-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
        <p className="text-xl text-muted-foreground">Coming in Phase 2</p>
      </div>
    </div>
  );
};
