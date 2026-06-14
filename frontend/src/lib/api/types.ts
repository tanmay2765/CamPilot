// TypeScript interfaces matching backend response schemas.
// All types prefixed with "Api" to distinguish from local UI types.

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardSummary {
  customers: number;
  orders: number;
  campaigns: number;
  delivery_events: number;
  total_revenue: number;
  segments: {
    "High Value": number;
    "Medium Value": number;
    "Low Value": number;
    Dormant: number;
  };
}

// ─── Customers ───────────────────────────────────────────────────────────────

export interface ApiCustomer {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  segment: string | null;
}

export interface CustomerListResponse {
  customers: ApiCustomer[];
  total: number;
  page: number;
  pages: number;
}

export interface CustomerSummary {
  customer_id: number;
  customer_name: string;
  total_orders: number;
  total_spend: number;
  average_order_value: number;
  segment: string;
}

export interface CustomerMetrics {
  customer_id: number;
  customer_name: string;
  segment: string;
  total_orders: number;
  total_spend: number;
  average_order_value: number;
  days_since_last_order: number;
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export interface ApiOrder {
  id: number;
  customer_id: number;
  customer_name: string;
  customer_email: string;
  customer_segment: string;
  amount: number;
  status: string;
  created_at: string | null;
}

export interface OrderListResponse {
  orders: ApiOrder[];
  total: number;
  page: number;
  pages: number;
}

export interface CustomerOrder {
  id: number;
  customer_id: number;
  amount: number;
  status: string;
  created_at: string | null;
}

// ─── Campaigns ───────────────────────────────────────────────────────────────

export interface ApiCampaign {
  id: number;
  name: string;
  segment_name: string;
  channel: string;
  subject_line: string | null;
  message: string | null;
  cta: string | null;
  status: string;
  created_at: string | null;
}

export interface CampaignGenerateRequest {
  goal: string;
}

export interface CampaignGenerateResponse {
  campaign_id: number;
  selected_segment: { segment_name: string };
  segment_stats: {
    segment_name: string;
    audience_size: number;
    average_spend: number;
    average_orders: number;
  };
  status: string;
  campaign: {
    campaign_name: string;
    subject_line: string;
    message: string;
    cta: string;
    recommended_channel: string;
  };
}

export interface CampaignExecuteResponse {
  campaign_id: number;
  audience_size: number;
  events_created: number;
  status: string;
}

export interface CampaignAnalytics {
  campaign_id: number;
  campaign_name: string;
  segment_name: string;
  channel: string;
  status: string;
  total_sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  open_rate_percentage: number;
  click_rate_percentage: number;
}

// ─── Segments ────────────────────────────────────────────────────────────────

export interface SegmentStats {
  segment_name: string;
  audience_size: number;
  average_spend: number;
  average_orders: number;
}

// ─── Health ──────────────────────────────────────────────────────────────────

export interface HealthCheckResponse {
  status: string;
  database: string;
  gemini: string;
  version: string;
}
