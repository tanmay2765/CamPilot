# Campaign Copilot - Technical Architecture

This document describes the high-level architecture, component designs, and operational data flows of Campaign Copilot.

---

## 1. High-Level Architecture
Campaign Copilot uses a standard clean, layered architecture separating routing, business services, database records, and LLM reasoning.

```mermaid
graph TB
    subgraph Client Layer
        Client([Client Applications / Swagger UI])
    end

    subgraph API Layer [FastAPI Gateway]
        API[app.main]
        RouteCust[app.routes.customers]
        RouteOrd[app.routes.orders]
        RouteCamp[app.routes.campaigns]
        RouteExec[app.routes.execution]
        RouteAnal[app.routes.analytics]
        RouteDash[app.routes.dashboard]
    end

    subgraph Service Layer [Business Logic]
        SegService[app.services.segment_service]
        AIService[app.services.ai_service]
        ChannelService[app.services.channel_service]
    end

    subgraph Data Access Layer [SQLAlchemy ORM]
        DBConn[database.connection]
        Models[(database.models.*)]
    end

    subgraph External Systems
        Gemini[Google Gemini 2.5 Flash API]
        Postgres[(PostgreSQL Database)]
    end

    Client -->|HTTP Requests| API
    API --> RouteCust & RouteOrd & RouteCamp & RouteExec & RouteAnal & RouteDash

    RouteCamp --> SegService
    RouteCamp --> AIService
    RouteExec --> ChannelService
    RouteExec --> Models

    AIService -->|API Calls| Gemini
    SegService --> DBConn
    DBConn -->|SQL Queries| Postgres
```

---

## 2. Component Descriptions

### A. API Routing Layer (`app/routes/`)
* **`customers.py` & `orders.py`**: Handle baseline CRM write and read requests. Validate request models using Pydantic schemas.
* **`metrics.py` & `segments.py`**: Calculate transactional KPIs (AOV, Recency, spend) and call AI services to review target cohorts.
* **`campaigns.py`**: The core AI orchestration controller. Coordinates between database segmentation queries and Gemini generative content requests.
* **`execution.py`**: Directs campaign dispatch simulations.
* **`analytics.py` & `dashboard.py`**: Read raw database data (spending records, delivery logs) and compute performance summaries.

### B. Business Logic Services (`app/services/`)
* **`segment_service.py`**: Encapsulates SQL-based aggregation queries. Generates statistical summaries (average spend, order frequencies, audience sizes) per customer segment.
* **`ai_service.py`**: The core AI adapter. Configured with the `google-genai` SDK and utilizes `gemini-2.5-flash` to structure system-level prompts, receive text, clean code fences, and parse JSON payloads.
* **`channel_service.py`**: Simple marketing dispatcher simulator. Simulates delivery results based on probabilities of users opening and clicking different communication channels (Email, SMS, WhatsApp).

### C. Database Access Layer (`database/`)
* **`connection.py`**: Sets up the SQLAlchemy database engine, connection pool, and `SessionLocal` generator context.
* **`models/`**: Implements declarative database tables: `Customer`, `Order`, `Campaign`, and `DeliveryEvent`.

---

## 3. Core Operational Flows

### A. AI-Driven Campaign Generation Flow
This flow describes what happens when a user requests a campaign generation from a high-level business goal.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Router as app.routes.campaigns
    participant SegService as app.services.segment_service
    participant AIService as app.services.ai_service
    participant Gemini as Gemini 2.5 Flash
    participant DB as PostgreSQL

    User->>Router: POST /campaigns/generate { "goal": "..." }
    Router->>SegService: get_all_segment_stats(db)
    SegService->>DB: SELECT COUNT and SUM of spend grouped by segment
    DB-->>SegService: Segment statistics data
    SegService-->>Router: List of segment stats
    Router->>AIService: choose_best_segment(goal, segment_stats)
    AIService->>Gemini: Send prompt (Goal + Available Segments)
    Gemini-->>AIService: Return JSON { "segment_name": "..." }
    AIService-->>Router: Selected segment dictionary
    Router->>SegService: get_segment_stats(db, selected_segment_name)
    SegService-->>Router: Target segment's detailed metrics
    Router->>AIService: generate_campaign_content(goal, segment_stats)
    AIService->>Gemini: Send copywriting prompt (Goal + Target Segment Stats)
    Gemini-->>AIService: Return JSON { "campaign_name", "subject_line", "message", "cta", "recommended_channel" }
    AIService-->>Router: Structured campaign content
    Router->>DB: INSERT INTO campaigns (draft status)
    DB-->>Router: Saved Campaign with ID
    Router-->>User: 200 OK (Campaign details + Selected segment stats)
```

---

## 4. Campaign Execution & Telemetry Simulation
When the marketer executes a campaign, the engine pulls the target audience, simulates marketing channel delivery, and commits telemetry back to the database.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Router as app.routes.execution
    participant DB as PostgreSQL
    participant Channel as app.services.channel_service

    User->>Router: POST /campaigns/{id}/execute
    Router->>DB: SELECT * FROM campaigns WHERE id = campaign_id
    DB-->>Router: Campaign Details (segment_name, channel)
    Router->>DB: SELECT * FROM customers WHERE segment = segment_name
    DB-->>Router: List of customers
    loop For each customer
        Router->>Channel: simulate_send(channel)
        Channel-->>Router: Simulated Status ("delivered", "opened", "clicked")
        Router->>DB: INSERT INTO delivery_events
    end
    Router->>DB: UPDATE campaigns SET status = 'completed' WHERE id = campaign_id
    Router-->>User: 200 OK { "audience_size", "events_created", "status": "completed" }
```

---

## 5. Delivery Telemetry Analytics Flow
This flow aggregates the outcome of campaign execution to evaluate how well the AI copywriting performed.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Router as app.routes.analytics
    participant DB as PostgreSQL

    User->>Router: GET /campaigns/{id}/analytics
    Router->>DB: SELECT * FROM campaigns WHERE id = campaign_id
    DB-->>Router: Campaign Details (name, channel)
    Router->>DB: SELECT * FROM delivery_events WHERE campaign_id = id
    DB-->>Router: List of events
    Note over Router: Calculate rates:<br/>open_rate = (opened + clicked) / total_sent<br/>click_rate = clicked / total_sent
    Router-->>User: Return performance metrics (delivered, opened, clicked, rates)
```
