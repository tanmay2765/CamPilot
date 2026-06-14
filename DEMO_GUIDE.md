# Campaign Copilot - 5-Minute Demo Walkthrough Guide

This step-by-step guide walks you through the core capabilities of Campaign Copilot. Ensure your local database is running and your `.env` file contains a valid `GEMINI_API_KEY`.

---

## Prerequisites
Open a terminal in the project root directory and start the server:
```bash
source venv/bin/activate
uvicorn app.main:app --reload
```
The Swagger UI documentation is available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

---

## Step 1: Seed the Database
Before running any campaigns, generate transactional and customer profiles.

* **Action:** Run the seeding script.
  ```bash
  python scripts/seed_data.py
  ```
* **Expected Output:**
  ```text
  Seed data generated successfully
  ```
This seeds exactly 100 customer records: 20 High Value, 30 Medium Value, 30 Low Value, and 20 Dormant profiles, with hundreds of historic order records.

---

## Step 2: View the Executive Dashboard
Verify that your database has been successfully seeded.

* **Action:** Retrieve the dashboard KPIs.
  ```bash
  curl -X 'GET' 'http://127.0.0.1:8000/dashboard/summary' -H 'accept: application/json'
  ```
* **Expected JSON Response:**
  ```json
  {
    "customers": 100,
    "orders": 645,
    "campaigns": 0,
    "delivery_events": 0,
    "total_revenue": 1645000.5,
    "segments": {
      "High Value": 20,
      "Medium Value": 30,
      "Low Value": 30,
      "Dormant": 20
    }
  }
  ```

---

## Step 3: Trigger AI Campaign Generation
Submit a high-level business goal to let Gemini select the target segment and draft the campaign.

* **Action:** Send a campaign generation request with the goal of winning back inactive users.
  ```bash
  curl -X 'POST' \
    'http://127.0.0.1:8000/campaigns/generate' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "goal": "Re-engage dormant customers who have not made a purchase recently"
  }'
  ```
* **Expected JSON Response (AI-Driven Decision):**
  ```json
  {
    "campaign_id": 1,
    "selected_segment": {
      "segment_name": "Dormant"
    },
    "segment_stats": {
      "segment_name": "Dormant",
      "audience_size": 20,
      "average_spend": 3215.45,
      "average_orders": 9.5
    },
    "status": "draft",
    "campaign": {
      "campaign_name": "Dormant Customer Win-back Campaign",
      "subject_line": "We Miss You! Get 15% off your next purchase.",
      "message": "It's been a while since you last ordered. Here is a special discount to welcome you back!",
      "cta": "Shop Now",
      "recommended_channel": "Email"
    }
  }
  ```
* *Note:* Gemini automatically selected the **Dormant** segment as the optimal audience and generated custom promotional email copy referencing a discount.

---

## Step 4: Execute the Campaign
Simulate dispatching the campaign to the 20 customers inside the selected segment.

* **Action:** Execute the campaign with ID `1` (use the `campaign_id` returned in the previous step).
  ```bash
  curl -X 'POST' \
    'http://127.0.0.1:8000/campaigns/1/execute' \
    -H 'accept: application/json'
  ```
* **Expected JSON Response:**
  ```json
  {
    "campaign_id": 1,
    "audience_size": 20,
    "events_created": 20,
    "status": "completed"
  }
  ```
The system has generated 20 delivery telemetry events (representing Email deliveries) and set the campaign status to `"completed"`.

---

## Step 5: View Campaign Analytics
Review how customers responded to the campaign.

* **Action:** Retrieve the telemetry analytics.
  ```bash
  curl -X 'GET' \
    'http://127.0.0.1:8000/campaigns/1/analytics' \
    -H 'accept: application/json'
  ```
* **Expected JSON Response:**
  ```json
  {
    "campaign_id": 1,
    "campaign_name": "Dormant Customer Win-back Campaign",
    "segment_name": "Dormant",
    "channel": "Email",
    "status": "completed",
    "total_sent": 20,
    "delivered": 7,
    "opened": 6,
    "clicked": 7,
    "open_rate_percentage": 65.0,
    "click_rate_percentage": 35.0
  }
  ```
* *Note:* Because we simulate human behaviors, your response rates (delivered, opened, clicked) will vary dynamically on each execution.

---

## Step 6: Review Updated Dashboard
Confirm that the campaign lifecycle is reflected on the primary dashboard.

* **Action:** Query the dashboard endpoint again.
  ```bash
  curl -X 'GET' 'http://127.0.0.1:8000/dashboard/summary' -H 'accept: application/json'
  ```
* **Expected JSON Response:**
  ```json
  {
    "customers": 100,
    "orders": 645,
    "campaigns": 1,
    "delivery_events": 20,
    "total_revenue": 1645000.5,
    "segments": {
      "High Value": 20,
      "Medium Value": 30,
      "Low Value": 30,
      "Dormant": 20
    }
  }
  ```
The `campaigns` count has risen to `1` and `delivery_events` count has risen to `20`. You have completed a full closed-loop marketing cycle!
