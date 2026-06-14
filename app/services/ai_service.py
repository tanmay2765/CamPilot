import os

from google import genai
import json
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


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

Example:

{{
  "segment_name": "Dormant",
  "audience_size": 20,
  "reasoning": "Customers have not purchased recently but have strong historical value.",
  "recommended_campaign": "Win-back campaign with 15% discount",
  "recommended_channel": "WhatsApp",
  "expected_outcome": "Increase repeat purchases"
}}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text

    text = text.replace(
        "```json",
        ""
    )

    text = text.replace(
        "```",
        ""
    )

    return text.strip()

def generate_segment_strategy(goal: str):
    """
    Generates an audience segment recommendation
    based on a business goal.
    """

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

Example:

{{
  "segment_name": "Dormant",
  "reasoning": "These customers purchased in the past but have not purchased recently.",
  "recommended_action": "Launch a win-back campaign with a limited-time discount."
}}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text

    text = text.replace("```json", "")
    text = text.replace("```", "")

    return json.loads(
    text.strip()
)

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

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text

    text = text.replace("```json", "")
    text = text.replace("```", "")

    return json.loads(
    text.strip()
)

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

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text

    text = text.replace("```json", "")
    text = text.replace("```", "")

    return json.loads(
        text.strip()
    )