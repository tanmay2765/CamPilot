import os
import json

from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def _safe_generate(prompt: str):
    """
    Wrapper around Gemini API.
    Returns response text or None if Gemini fails.
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:
        print(f"Gemini Error: {e}")
        return None


def generate_campaign_strategy(
    goal: str,
    segment_stats: dict
):

    prompt = f"""
You are a senior CRM strategist.

Business Goal:
{goal}

Customer Segment Statistics:

{segment_stats}

Using the provided CRM data:

1. Explain why this audience should be targeted.
2. Recommend a campaign strategy.
3. Recommend the best channel.
4. Estimate expected business impact.

Return ONLY valid JSON.

{{
  "segment_name": "Dormant",
  "audience_size": 20,
  "reasoning": "Customers have not purchased recently but have strong historical value.",
  "recommended_campaign": "Win-back campaign with 15% discount",
  "recommended_channel": "WhatsApp",
  "expected_outcome": "Increase repeat purchases"
}}
"""

    text = _safe_generate(prompt)

    if not text:
        return json.dumps({
            "segment_name": "Dormant",
            "audience_size": 20,
            "reasoning": "Fallback strategy used because AI service is unavailable.",
            "recommended_campaign": "Win-back campaign with 15% discount",
            "recommended_channel": "Email",
            "expected_outcome": "Increase repeat purchases"
        })

    text = text.replace("```json", "")
    text = text.replace("```", "")

    return text.strip()


def generate_segment_strategy(goal: str):

    prompt = f"""
You are an expert CRM strategist.

Available customer segments:

1. High Value
   - Frequent purchasers
   - High spending

2. Medium Value
   - Moderate spending
   - Moderate purchase frequency

3. Low Value
   - Low spending
   - Few purchases

4. Dormant
   - Purchased before
   - No recent activity

Business Goal:
{goal}

Choose the BEST segment.

Return ONLY valid JSON.

{{
  "segment_name": "Dormant",
  "reasoning": "These customers purchased in the past but have not purchased recently.",
  "recommended_action": "Launch a win-back campaign with a limited-time discount."
}}
"""

    text = _safe_generate(prompt)

    if not text:
        return {
            "segment_name": "Dormant",
            "reasoning": "Fallback segment selection.",
            "recommended_action": "Launch a win-back campaign."
        }

    text = text.replace("```json", "")
    text = text.replace("```", "")

    try:
        return json.loads(text.strip())

    except Exception:
        return {
            "segment_name": "Dormant",
            "reasoning": "Failed to parse AI response.",
            "recommended_action": "Launch a win-back campaign."
        }


def generate_campaign_content(
    goal: str,
    segment_stats: dict
):

    prompt = f"""
You are a senior CRM marketing expert.

Business Goal:
{goal}

Audience Data:
{segment_stats}

Generate a marketing campaign.

Return ONLY valid JSON.

{{
  "campaign_name": "",
  "subject_line": "",
  "message": "",
  "cta": "",
  "recommended_channel": ""
}}
"""

    text = _safe_generate(prompt)

    if not text:
        return {
            "campaign_name": "Win Back Campaign",
            "subject_line": "We Miss You!",
            "message": "Come back and enjoy an exclusive offer crafted just for you.",
            "cta": "Shop Now",
            "recommended_channel": "Email"
        }

    text = text.replace("```json", "")
    text = text.replace("```", "")

    try:
        return json.loads(text.strip())

    except Exception:
        return {
            "campaign_name": "Win Back Campaign",
            "subject_line": "We Miss You!",
            "message": "Come back and enjoy an exclusive offer crafted just for you.",
            "cta": "Shop Now",
            "recommended_channel": "Email"
        }


def choose_best_segment(
    goal: str,
    segment_stats: list
):

    prompt = f"""
You are a CRM strategist.

Available customer segments:

- High Value
- Medium Value
- Low Value
- Dormant

Business Goal:
{goal}

Choose the BEST segment.

Return ONLY valid JSON.

{{
    "segment_name": ""
}}
"""

    text = _safe_generate(prompt)

    if not text:
        return {
            "segment_name": "Dormant"
        }

    text = text.replace("```json", "")
    text = text.replace("```", "")

    try:
        return json.loads(text.strip())

    except Exception:
        return {
            "segment_name": "Dormant"
        }