import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { description } = await req.json();
    
    if (!description) {
      return new Response(
        JSON.stringify({ error: "Meal description is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating meal from description:", description);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a nutrition expert. Generate detailed meal information based on user descriptions. Provide realistic macro estimates."
          },
          {
            role: "user",
            content: description
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_meal",
              description: "Create a meal with nutritional information",
              parameters: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "A clear, descriptive name for the meal"
                  },
                  calories: {
                    type: "number",
                    description: "Total calories in the meal"
                  },
                  protein: {
                    type: "number",
                    description: "Protein in grams"
                  },
                  carbs: {
                    type: "number",
                    description: "Carbohydrates in grams"
                  },
                  fat: {
                    type: "number",
                    description: "Fat in grams"
                  },
                  mealType: {
                    type: "string",
                    enum: ["breakfast", "lunch", "dinner", "snack"],
                    description: "Type of meal"
                  },
                  instructions: {
                    type: "string",
                    description: "Brief cooking or preparation instructions (optional)"
                  }
                },
                required: ["name", "calories", "protein", "carbs", "fat", "mealType"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "create_meal" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    console.log("AI response:", JSON.stringify(data, null, 2));

    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || !toolCall.function.arguments) {
      throw new Error("Failed to generate meal data");
    }

    const mealData = JSON.parse(toolCall.function.arguments);
    
    console.log("Generated meal:", mealData);

    return new Response(
      JSON.stringify({ meal: mealData }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-ai-meal:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
