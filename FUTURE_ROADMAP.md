# Campaign Copilot - Future Architecture Roadmap

This document outlines the six-phase product roadmap to scale Campaign Copilot from a single-node MVP to a distributed, multi-channel marketing automation platform.

---

## Phase 1: Current MVP
* **Focus:** Establish core schema, baseline REST APIs, static customer behavioral segmentation, and standard LLM campaign orchestration.
* **Architecture:** Monolithic FastAPI application communicating synchronously with a PostgreSQL database and Google Gemini API.
* **Deliverables:**
  * CRUD customer and order tables.
  * Deterministic segment stats query engine.
  * Structured JSON schema prompting using Gemini 2.5 Flash.
  * In-memory dispatcher simulator and static KPI dashboard.

---

## Phase 2: Production Email & SMS Dispatchers
* **Focus:** Transition from simulated delivery to real-world communication integrations.
* **Architecture:** Integrate production SMTP/SMS gateways.
* **Key Technologies:** SendGrid API (Email), Twilio SDK (SMS), and WhatsApp Business API.
* **Engineering Tasks:**
  * Implement connection managers for API clients with fallback retry configurations.
  * Encrypt customer phone numbers and emails at rest (AES-256) to meet GDPR/HIPAA compliance standards.
  * Add user preference settings for channel opt-out (`opt_in_email`, `opt_in_sms`).

---

## Phase 3: Webhook Telemetry & Event Ingestion
* **Focus:** Ingest real delivery telemetry (delivered, bounced, opened, clicked) from external providers.
* **Architecture:** Implement public webhook endpoint routers that receive async event streams from SendGrid or Twilio and parse signatures to prevent spoofing.
* **Key Technologies:** FastAPI Router, Cryptographic signature verifiers, and Event Broker.
* **Engineering Tasks:**
  * Expose `/webhooks/sendgrid` and `/webhooks/twilio`.
  * Validate webhook signatures using SHA256 HMAC.
  * Route events to a queue to prevent database lockups under high delivery loads.

---

## Phase 4: Async Processing & Multi-Channel Orchestration
* **Focus:** Support large-scale campaigns (>10,000 users) and multi-step customer journeys.
* **Architecture:** Decouple campaign generation and dispatching from the HTTP request-response cycle using an asynchronous worker pattern.
* **Key Technologies:** Celery or ARQ, Redis (as a message broker), and PostgreSQL.
* **Engineering Tasks:**
  * Refactor campaign execution into an asynchronous Celery task (`tasks.execute_campaign_task.delay(campaign_id)`).
  * Implement rate limiting to respect vendor API constraints (e.g., maximum 100 SMS per second).
  * Build multi-stage campaigns (e.g., "Send email; if unopened in 3 days, send SMS follow-up").

---

## Phase 5: Predictive AI & Campaign Optimization
* **Focus:** Transition from basic static segments to dynamic machine-learning-driven cohorts.
* **Architecture:** Train lightweight offline models to predict customer churn risk, customer lifetime value (CLV), and individual channel preferences.
* **Key Technologies:** Scikit-Learn or XGBoost, BigQuery, and Gemini Embeddings.
* **Engineering Tasks:**
  * Replace static SQL segmentation rules with ML propensity scores (e.g., churn probability > 0.85).
  * Use Gemini Embeddings to cluster customers based on purchase descriptions, enabling semantic-similarity targeting.
  * Implement A/B testing framework allowing LLMs to generate two copywriting variations and automatically route traffic to the higher-performing variant.

---

## Phase 6: Real-Time Analytics Dashboard
* **Focus:** High-concurrency, low-latency campaign performance visualizers.
* **Architecture:** Implement WebSocket connections or Server-Sent Events (SSE) for the frontend, feeding on a real-time event analytics store.
* **Key Technologies:** Redis TimeSeries, ClickHouse (columnar database for high-throughput event analytics), and WebSockets.
* **Engineering Tasks:**
  * Pipe webhook events into ClickHouse for instant sub-second aggregation queries.
  * Expose a WebSocket route `/dashboard/live` to push click-stream updates directly to client browsers.
  * Implement historical comparison charts comparing campaigns side-by-side.
