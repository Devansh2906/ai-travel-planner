from flask import Flask, request, jsonify
import google.generativeai as genai
import json
import re
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("models/gemini-flash-lite-latest")


# 🧠 Improved JSON cleaner
def clean_json(text):
    try:
        # Remove markdown blocks
        text = re.sub(r"```json|```", "", text)

        # Extract JSON object
        match = re.search(r'\{.*\}', text, re.DOTALL)

        if match:
            json_text = match.group()

            # Remove trailing commas (common issue)
            json_text = re.sub(r',\s*}', '}', json_text)
            json_text = re.sub(r',\s*]', ']', json_text)

            return json.loads(json_text)

        return None

    except Exception as e:
        print("❌ JSON CLEAN ERROR:", str(e))
        return None

    except Exception as e:
        print("❌ JSON CLEAN ERROR:", str(e))
        return None


@app.route('/')
def home():
    return "AI Travel Planner Running 🚀"


@app.route('/plan', methods=['POST'])
def plan_trip():
    try:
        data = request.json

        # ✅ Inputs
        destination = data.get('destination')
        days = data.get('days')
        budget = data.get('budget')
        travel_type = data.get("type", "General")

        if not destination or not days or not budget:
            return jsonify({"error": "Missing required fields"}), 400

        # 🧠 STRONG PROMPT (UPGRADED)
        prompt = f"""
        Create a smart, realistic and structured travel itinerary.

        User Details:
        - Destination: {destination}
        - Number of Days: {days}
        - Budget: {budget} INR
        - Travel Type: {travel_type}

        Requirements:
        1. Break plan into days (Day 1, Day 2...)
        2. Each day must include:
           - Morning
           - Afternoon
           - Evening
           - Night
        3. Suggest:
           - Tourist attractions
           - Local food spots
           - Activities
        4. Optimize travel (nearby locations per day)
        5. Consider realistic travel time
        6. Keep budget in control
        7. Include travel tips

        ALSO INCLUDE:
        - "highlights": top must-visit places

        IMPORTANT:
        Return ONLY JSON in this format:

        {{
          "highlights": ["...", "..."],

          "days": [
            {{
              "day": "Day 1",
              "plan": [
                "Morning: ...",
                "Afternoon: ...",
                "Evening: ...",
                "Night: ..."
              ]
            }}
          ],

          "budget": {{
            "stay": "...",
            "food": "...",
            "transport": "...",
            "activities": "...",
            "total": "..."
          }},

          "tips": [
            "...",
            "..."
          ]
        }}
        Return ONLY valid JSON.
Do NOT include explanations, markdown, or text.
Do NOT wrap JSON in ``` blocks
        """

        # ⚙️ Better generation config
        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.6,
                "max_output_tokens": 800
            }
        )
        print("🧠 RAW AI RESPONSE:\n", response.text)

        # 🧪 Parse JSON
        result = clean_json(response.text)

        if result:
            return jsonify(result)

        else:
            return jsonify({
                "error": "AI response parsing failed",
                "message": "AI returned unexpected format. Try again.",
                "raw": response.text[:300]
            }), 500

    except Exception as e:
        print("🔥 ERROR:", str(e))   # 👈 ADD THIS

        return jsonify({
            "error": "Something went wrong",
            "details": str(e)
        }), 500


if __name__ == "__main__":
    app.run()