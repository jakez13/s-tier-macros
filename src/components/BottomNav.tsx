import { NavLink } from 'react-router-dom';
import { BookOpen, Calendar, BookText, Dumbbell } from 'lucide-react';

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
          <BookOpen className="h-5 w-5 mb-1" />
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
          <Calendar className="h-5 w-5 mb-1" />
          <span className="text-xs">Meal Plans</span>
        </NavLink>

        <NavLink
          to="/macro-guide"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          <BookText className="h-5 w-5 mb-1" />
          <span className="text-xs">Macro Guide</span>
        </NavLink>

        <NavLink
          to="/t-protocol"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          <Dumbbell className="h-5 w-5 mb-1" />
          <span className="text-xs">T-Protocol</span>
        </NavLink>
      </div>
    </nav>
  );
};
