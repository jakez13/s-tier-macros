import { NavLink } from 'react-router-dom';
import { UtensilsCrossed, ClipboardList, BookText, Settings } from 'lucide-react';

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-secondary/95 backdrop-blur border-t border-border z-50">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16">
        <NavLink
          to="/recipes"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          <UtensilsCrossed className="h-5 w-5 mb-1" />
          <span className="text-xs">Recipes</span>
        </NavLink>

        <NavLink
          to="/meal-plans"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          <ClipboardList className="h-5 w-5 mb-1" />
          <span className="text-xs">My Plan</span>
        </NavLink>

        <NavLink
          to="/guide"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          <BookText className="h-5 w-5 mb-1" />
          <span className="text-xs">Guide</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          <Settings className="h-5 w-5 mb-1" />
          <span className="text-xs">Settings</span>
        </NavLink>
      </div>
    </nav>
  );
};
