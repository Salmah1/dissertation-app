import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

// Load API key from .env file
dotenv.config();

// Create express server
const app = express();
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON from requests

// Set up Gemini AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Start server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// AI image generation route
app.post("/output", async (req, res) => {
  const userIdea = req.body.prompt;

  // Improve prompt before sending to AI
  const improvedPrompt = `A realistic social care scene with a robot or AI showing: ${userIdea}`;

  console.log("Output request received:", userIdea);

  try {
    console.log("Sending to Gemini...");

    // Generate image using Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: improvedPrompt,
    });

    // Loop through response parts to find image data
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        console.log("Image generated successfully");

        const base64 = part.inlineData.data;

        // Create images folder if it doesn't exist
        if (!fs.existsSync("./images")) {
          fs.mkdirSync("./images", { recursive: true });
        }

        const filename = `./images/image_${Date.now()}.png`;

        // Convert base64 to image file
        const buffer = Buffer.from(base64, "base64");

        console.log("Saving image as:", filename);

        fs.writeFileSync(filename, buffer);

        // Save prompt and file reference
        fs.appendFileSync("data.txt", `${userIdea}, ${filename}\n`);

        // Send image back to frontend
        return res.json({
          image: `data:image/png;base64,${base64}`,
        });
      }
    }

    // Use fallback if no image returned
    console.log("No image received, using fallback");

    return res.json({
      image: "/fallback-image.png",
    });
  } catch (error) {
    console.error("Output route error:", error.message);
    console.log("Using fallback result");

    // Use fallback if AI fails
    return res.json({
      image: "/fallback-image.png",
    });
  }
});

// AI guess route
app.post("/guess", async (req, res) => {
  const answers = req.body.answers;

  const answersText = answers.map((a) => a.selectedAnswer).join(", ");

  // Force AI to return clean JSON only
  const cleanedPrompt = `Based only on these answers: ${answersText}. 
  Return only valid JSON in exactly this format: {"age": "30-40", "hobby": "Gaming", 
  "personality": "Adventurous"}. No markdown. No explanation.`;

  console.log("Guess request received:", answers);

  try {
    console.log("Sending to Gemini...");

    // Generate text response
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: cleanedPrompt,
    });

    let text = response.candidates[0].content.parts[0].text;
    console.log("Gemini response:", text);

    text = text.replace(/```json|```/g, "").trim();

    // Extract JSON from response
    const match = text.match(/\{[\s\S]*\}/);
    const jsonText = match ? match[0] : "";

    const result = JSON.parse(jsonText);

    return res.json(result);
  } catch (error) {
    console.error("Guess route error:", error.message);
    console.log("Using fallback result");

    // Use fallback if AI fails
    return res.json({
      age: "20-30",
      hobby: "Painting",
      personality: "Thoughtful",
    });
  }
});
