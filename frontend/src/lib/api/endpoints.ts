// API endpoint functions organized by domain.
// Each function returns typed data from the backend.

import { apiClient } from "./api-client";
import type {
  DashboardSummary,
  CustomerListResponse,
  CustomerSummary,
  CustomerMetrics,
  CustomerOrder,
  OrderListResponse,
  ApiCampaign,
  CampaignGenerateRequest,
  CampaignGenerateResponse,
  CampaignExecuteResponse,
  CampaignAnalytics,
  SegmentStats,
  HealthCheckResponse,
} from "./types";

// ─── Dashboard ───────────────────────────────────────────────────────────────

export const dashboardApi = {
  getSummary: () => apiClient.get<DashboardSummary>("/dashboard/summary"),
};

// ─── Customers ───────────────────────────────────────────────────────────────

export const customersApi = {
  list: (params?: { search?: string; segment?: string; page?: number; limit?: number }) =>
    apiClient.get<CustomerListResponse>("/customers", params as Record<string, string | number | undefined>),

  getSummary: (customerId: number) =>
    apiClient.get<CustomerSummary>(`/customers/${customerId}/summary`),

  getMetrics: (customerId: number) =>
    apiClient.get<CustomerMetrics>(`/customers/${customerId}/metrics`),

  getOrders: (customerId: number) =>
    apiClient.get<CustomerOrder[]>(`/customers/${customerId}/orders`),
};

// ─── Orders ──────────────────────────────────────────────────────────────────

export const ordersApi = {
  list: (params?: { page?: number; limit?: number }) =>
    apiClient.get<OrderListResponse>("/orders", params as Record<string, string | number | undefined>),
};

// ─── Campaigns ───────────────────────────────────────────────────────────────

export const campaignsApi = {
  list: () => apiClient.get<ApiCampaign[]>("/campaigns"),

  generate: (data: CampaignGenerateRequest) =>
    apiClient.post<CampaignGenerateResponse>("/campaigns/generate", data),

  execute: (campaignId: number) =>
    apiClient.post<CampaignExecuteResponse>(`/campaigns/${campaignId}/execute`),

  getAnalytics: (campaignId: number) =>
    apiClient.get<CampaignAnalytics>(`/campaigns/${campaignId}/analytics`),
};

// ─── Segments ────────────────────────────────────────────────────────────────

export const segmentsApi = {
  getStats: () => apiClient.get<SegmentStats[]>("/segments/stats"),
};

// ─── Health ──────────────────────────────────────────────────────────────────

export const healthApi = {
  check: () => apiClient.get<HealthCheckResponse>("/health"),
};
