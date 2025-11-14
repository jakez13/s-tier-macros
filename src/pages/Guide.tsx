import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MacroGuide } from './MacroGuide';
import { TProtocol } from './TProtocol';

export const Guide = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-foreground mb-6">Nutrition Guide</h1>
        
        <Tabs defaultValue="macros" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="macros">Macro Guide</TabsTrigger>
            <TabsTrigger value="t-protocol">T-Protocol</TabsTrigger>
          </TabsList>
          
          <TabsContent value="macros" className="mt-0">
            <MacroGuide />
          </TabsContent>
          
          <TabsContent value="t-protocol" className="mt-0">
            <TProtocol />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
