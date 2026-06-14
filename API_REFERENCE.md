# Campaign Copilot - REST API Reference

All requests and responses use standard JSON payloads. Query parameters and path parameters must follow the formats specified below.

---

## 1. Customer Endpoints

### `POST /customers`
Registers a new customer profile in the database.

* **Purpose:** Create new customer profiles with metadata for segmentation.
* **Headers:** `Content-Type: application/json`
* **Request Example:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "phone": "+919876543210",
    "city": "Mumbai"
  }
  ```
* **Response Example (200 OK):**
  ```json
  {
    "message": "Customer created successfully",
    "customer_id": 101
  }
  ```
* **Error Responses:**
  * **422 Unprocessable Entity:** Email address format invalid or missing required field (`name`, `email`).
    ```json
    {
      "detail": [
        {
          "loc": ["body", "email"],
          "msg": "value is not a valid email address",
          "type": "value_error.email"
        }
      ]
    }
    ```

---

### `POST /orders`
Records a transaction order for a customer.

* **Purpose:** Record order purchases to build transaction history used by the segmentation engine.
* **Headers:** `Content-Type: application/json`
* **Request Example:**
  ```json
  {
    "customer_id": 101,
    "amount": 2500.50,
    "status": "completed"
  }
  ```
* **Response Example (200 OK):**
  ```json
  {
    "message": "Order created successfully",
    "order_id": 401
  }
  ```
* **Error Responses:**
  * **422 Unprocessable Entity:** Missing customer ID or negative transaction amount.

---

## 2. Customer Summary & Metrics Endpoints

### `GET /customers/{customer_id}/summary`
Retrieves a customer's basic purchase count, total spending, and segment info.

* **Purpose:** Fetch historical customer profile summary at a glance.
* **Path Parameters:**
  * `customer_id` (integer): ID of the customer.
* **Request Example:**
  `GET http://127.0.0.1:8000/customers/101/summary`
* **Response Example (200 OK):**
  ```json
  {
    "customer_id": 101,
    "customer_name": "Jane Doe",
    "total_orders": 5,
    "total_spend": 12502.5,
    "average_order_value": 2500.5,
    "segment": "High Value"
  }
  ```
* **Error Responses:**
  * **404 Not Found:** Customer ID does not exist in the database.
    ```json
    {
      "detail": "Customer not found"
    }
    ```

---

### `GET /customers/{customer_id}/metrics`
Calculates transactional metrics including purchase recency, purchase frequency, and lifetime spending statistics.

* **Purpose:** Provides metrics to power segment selection queries.
* **Path Parameters:**
  * `customer_id` (integer): ID of the customer.
* **Request Example:**
  `GET http://127.0.0.1:8000/customers/101/metrics`
* **Response Example (200 OK):**
  ```json
  {
    "customer_id": 101,
    "customer_name": "Jane Doe",
    "segment": "High Value",
    "total_orders": 5,
    "total_spend": 12502.5,
    "average_order_value": 2500.5,
    "days_since_last_order": 4
  }
  ```
* **Error Responses:**
  * **404 Not Found:** Customer ID does not exist in the database.

---

## 3. Campaign Endpoints

### `POST /campaigns/generate`
Generates a target segment and writes campaign marketing materials using Gemini.

* **Purpose:** Uses AI to select the optimal segment matching the business goal, computes metrics for that segment, and generates copy tailored to their spending behaviors.
* **Headers:** `Content-Type: application/json`
* **Request Example:**
  ```json
  {
    "goal": "Re-engage customers who haven't ordered in 60+ days with an incentive"
  }
  ```
* **Response Example (200 OK):**
  ```json
  {
    "campaign_id": 12,
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
      "campaign_name": "Dormant Win-Back Promotion",
      "subject_line": "We miss you! Save 15% on your next order",
      "message": "It's been a while since your last order. Enjoy an exclusive 15% discount code valid this week.",
      "cta": "Claim My Discount",
      "recommended_channel": "Email"
    }
  }
  ```

---

### `POST /campaigns/{campaign_id}/execute`
Launches the campaign simulation engine.

* **Purpose:** Triggers communication simulation (Email, SMS, WhatsApp) for all customers matching the target segment, writing telemetry events to PostgreSQL.
* **Path Parameters:**
  * `campaign_id` (integer): The ID of the campaign to execute.
* **Request Example:**
  `POST http://127.0.0.1:8000/campaigns/12/execute`
* **Response Example (200 OK):**
  ```json
  {
    "campaign_id": 12,
    "audience_size": 20,
    "events_created": 20,
    "status": "completed"
  }
  ```
* **Error Responses:**
  * **404 Not Found:** Campaign ID does not exist.
    ```json
    {
      "detail": "Campaign not found"
    }
    ```

---

### `GET /campaigns/{campaign_id}/analytics`
Aggregates delivery and user interaction telemetry logs.

* **Purpose:** Calculates campaign outreach effectiveness (open rate, click rate).
* **Path Parameters:**
  * `campaign_id` (integer): ID of the campaign.
* **Request Example:**
  `GET http://127.0.0.1:8000/campaigns/12/analytics`
* **Response Example (200 OK):**
  ```json
  {
    "campaign_id": 12,
    "campaign_name": "Dormant Win-Back Promotion",
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
* **Error Responses:**
  * **404 Not Found:** Campaign ID does not exist.

---

## 4. Executive Dashboard

### `GET /dashboard/summary`
Provides high-level aggregate summary statistics for the executive dashboard.

* **Purpose:** High-level dashboard summary showing user counts, revenue, campaign count, and segment distribution.
* **Request Example:**
  `GET http://127.0.0.1:8000/dashboard/summary`
* **Response Example (200 OK):**
  ```json
  {
    "customers": 100,
    "orders": 645,
    "campaigns": 3,
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
