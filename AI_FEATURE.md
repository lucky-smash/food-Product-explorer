# AI Feature Plan: Voice-Based Personalized Nutrition Coach

## Note
This file is a saved roadmap for later. You can come back to it step by step when you are ready to build the feature.

## Feature Idea
Let users speak their personal details and goals, then use AI to generate a personalized nutrition plan, food suggestions, and simple recipes.

Add a smart search feature where users can type or speak natural-language queries like:
- "high protein breakfast under 300 calories"
- "healthy snacks for gym"
- "low sugar vegetarian dinner ideas"

The AI should understand the intent and turn it into:
- Better search keywords
- Structured filters
- Relevant product and recipe suggestions

Example voice input:
- "I am 24, I want to lose weight, I go to the gym 4 times a week, and I am vegetarian"

The AI should turn that into:
- A structured user profile
- A daily or weekly nutrition plan
- High-nutrition food suggestions
- Recipe ideas
- Product recommendations from the app

## Problem This Solves
- Users do not know what food fits their goals.
- Nutrition advice is hard to personalize.
- People want quick meal ideas without manual research.
- Food labels and product choices can be confusing.

## Why This Feature Is Valuable
- It is directly useful, not just decorative.
- It fits the food/product theme of the app.
- It gives the project a strong portfolio story.
- It shows real AI API usage in a practical way.
- It makes search feel intelligent instead of basic keyword matching.

## MVP Scope
Start with a simple version first:
1. Voice input for user details
2. AI converts speech into structured data
3. AI generates a nutrition plan
4. Show food/product recommendations
5. Show simple recipe suggestions
6. Smart search that rewrites natural language into better queries

## Step-by-Step Build Plan

### Step 1: Define the user input
Decide what details the AI should collect:
- Age
- Gender (optional)
- Weight goal
- Fitness goal
- Activity level
- Diet type
- Allergies
- Food preferences
- Budget level

### Step 2: Add voice input in the frontend
- Add a microphone button near the search bar or in a new nutrition assistant section.
- Capture spoken text from the user.
- Show listening state and transcription result.
- Let the user edit the text before sending it.

### Step 2.5: Add smart search
- Let the user type or speak a food request in normal language.
- Send the query to AI for intent detection.
- Convert the request into search terms and filters.
- Use those results to search products or recipes.

### Step 3: Send the voice text to the backend
- Create an AI endpoint in the backend.
- Send the transcribed text to the backend.
- Keep the OpenAI API key only on the server.

### Step 4: Use AI to extract structured profile data
Ask the AI to return JSON like:
- age
- goals
- diet type
- calories estimate
- protein target
- food restrictions
- suggested meal style

### Step 5: Generate a nutrition plan
Use the structured profile to create:
- Daily meal plan
- 3 to 5 food suggestions
- Recipe ideas
- Shopping/product recommendations

### Step 6: Show the result in the UI
Create a results section with:
- Profile summary
- Nutrition goals
- Suggested meals
- Recommended products
- Simple recipe cards

### Step 7: Add follow-up questions
If needed, ask AI to refine the plan:
- "I want cheaper options"
- "Make it vegan"
- "Add more protein"
- "No dairy"

### Step 8: Add a disclaimer
Show a small note:
- This is a general nutrition suggestion tool, not medical advice.

## Suggested Backend Flow
1. Frontend sends voice transcript
2. Backend sends transcript to OpenAI
3. OpenAI returns structured profile + plan
4. Backend returns JSON to frontend
5. Frontend renders the nutrition coach output

## Suggested OpenAI Use Cases
- Speech-to-text support if you want a stronger voice pipeline later
- Prompt-based profile extraction
- Meal plan generation
- Recipe generation
- Personalized recommendation summaries
- Natural-language search understanding
- Search query rewrite into structured filters

## Good UI Sections to Add
- Voice input card
- Profile summary card
- Daily meal plan card
- Recipe suggestions card
- Product recommendations card
- Refinement buttons like "more protein" or "cheaper options"

## Portfolio Story
You can describe the project like this:

"I built a food product explorer with an AI-powered voice nutrition coach that helps users share personal goals and get personalized meal plans, recipes, and product suggestions."

## Build Order Recommendation
1. Add voice-to-text input
2. Add AI profile extraction
3. Add meal plan generation
4. Add product recommendations
5. Add follow-up question support
6. Improve UI and polish

## Next Practical Step
Create a backend API route for AI nutrition planning, then connect it to a frontend voice input component.
