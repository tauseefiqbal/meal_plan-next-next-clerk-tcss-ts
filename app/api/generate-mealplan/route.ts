// app/api/generate-mealplan/route.ts

import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import {
  OPENAI_CONFIG,
  VALIDATION_LIMITS,
  ERROR_CODES,
} from "@/lib/constants";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "placeholder-for-build",
});

export async function POST(request: Request) {
  try {
    // Extract parameters from the request body
    const body = await request.json();
    const { dietType, calories, allergies, cuisine, snacks } = body;

    // Input validation
    if (!dietType || typeof dietType !== "string" || dietType.trim() === "") {
      return NextResponse.json(
        { 
          error: "Valid diet type is required.",
          code: ERROR_CODES.INVALID_INPUT
        },
        { status: 400 }
      );
    }

    if (
      !calories ||
      typeof calories !== "number" ||
      calories < VALIDATION_LIMITS.MIN_CALORIES ||
      calories > VALIDATION_LIMITS.MAX_CALORIES
    ) {
      return NextResponse.json(
        { 
          error: `Calories must be between ${VALIDATION_LIMITS.MIN_CALORIES} and ${VALIDATION_LIMITS.MAX_CALORIES}.`,
          code: ERROR_CODES.INVALID_INPUT
        },
        { status: 400 }
      );
    }

    // Sanitize inputs to prevent prompt injection
    const sanitizedDietType = dietType
      .substring(0, VALIDATION_LIMITS.DIET_TYPE_MAX_LENGTH)
      .trim();
    const sanitizedAllergies = allergies
      ? String(allergies).substring(0, VALIDATION_LIMITS.ALLERGIES_MAX_LENGTH).trim()
      : "none";
    const sanitizedCuisine = cuisine
      ? String(cuisine).substring(0, VALIDATION_LIMITS.CUISINE_MAX_LENGTH).trim()
      : "no preference";

    const prompt = `
      You are a professional nutritionist. Create a 7-day meal plan for an individual following a ${sanitizedDietType} diet aiming for ${calories} calories per day.
      
      Allergies or restrictions: ${sanitizedAllergies}.
      Preferred cuisine: ${sanitizedCuisine}.
      Snacks included: ${snacks ? "yes" : "no"}.
      
      For each day, provide:
        - Breakfast
        - Lunch
        - Dinner
        ${snacks ? "- Snacks" : ""}
      
      Use simple ingredients and provide brief instructions. Include approximate calorie counts for each meal.
      
      Structure the response as a JSON object where each day is a key, and each meal (breakfast, lunch, dinner, snacks) is a sub-key. Example:
      
      {
        "Monday": {
          "Breakfast": "Oatmeal with fruits - 350 calories",
          "Lunch": "Grilled chicken salad - 500 calories",
          "Dinner": "Steamed vegetables with quinoa - 600 calories",
          "Snacks": "Greek yogurt - 150 calories"
        },
        "Tuesday": {
          "Breakfast": "Smoothie bowl - 300 calories",
          "Lunch": "Turkey sandwich - 450 calories",
          "Dinner": "Baked salmon with asparagus - 700 calories",
          "Snacks": "Almonds - 200 calories"
        }
        // ...and so on for each day
      }

      Return just the json with no extra commentaries and no backticks.
    `;

    // Send the prompt to the AI model
    const response = await openai.chat.completions.create(
      {
        model: OPENAI_CONFIG.MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: OPENAI_CONFIG.TEMPERATURE,
        max_tokens: OPENAI_CONFIG.MAX_TOKENS,
      },
      {
        timeout: OPENAI_CONFIG.TIMEOUT_MS,
      }
    );

    // Extract the AI's response
    const aiContent = response.choices[0].message.content.trim();

    // Attempt to parse the AI's response as JSON
    let parsedMealPlan: { [day: string]: DailyMealPlan };
    console.log(aiContent);
    try {
      parsedMealPlan = JSON.parse(aiContent);
    } catch (parseError) {
      console.error("[API] Error parsing AI response as JSON:", parseError);
      // If parsing fails, return the raw text with an error message
      return NextResponse.json(
        { 
          error: "Failed to parse meal plan. Please try again.",
          code: ERROR_CODES.OPENAI_ERROR
        },
        { status: 500 }
      );
    }

    // Validate the structure of the parsedMealPlan
    if (typeof parsedMealPlan !== "object" || parsedMealPlan === null) {
      throw new Error("Invalid meal plan format received from AI.");
    }

    // Optionally, perform additional validation on the structure here

    // Return the parsed meal plan
    return NextResponse.json({ mealPlan: parsedMealPlan });
  } catch (error) {
    console.error("[API] Error generating meal plan:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate meal plan. Please try again later.",
        code: ERROR_CODES.OPENAI_ERROR
      },
      { status: 500 }
    );
  }
}

// Define the DailyMealPlan interface here or import it if defined elsewhere
interface DailyMealPlan {
  Breakfast?: string;
  Lunch?: string;
  Dinner?: string;
  Snacks?: string;
}
