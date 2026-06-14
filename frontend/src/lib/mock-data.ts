// Rich CRM mock data
export type Segment = "High Value" | "Medium Value" | "Low Value" | "Dormant";
export type Status = "Active" | "Inactive" | "New";

export type Customer = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  segment: Segment;
  totalOrders: number;
  totalSpend: number;
  lastPurchase: string;
  status: Status;
  ltv: number;
};

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
];

const names = [
  "Aarav Mehta","Priya Sharma","Rohan Kapoor","Ananya Iyer","Vikram Singh",
  "Sara Khan","Devansh Patel","Ishita Rao","Kabir Joshi","Maya Reddy",
  "Aditya Nair","Tara Bose","Rahul Verma","Neha Gupta","Arjun Malhotra",
  "Zoya Ahmed","Karan Bhatt","Meera Pillai","Siddharth Roy","Ria Choudhary",
];

const segments: Segment[] = ["High Value", "Medium Value", "Low Value", "Dormant"];

export const customers: Customer[] = names.map((name, i) => {
  const seg = segments[i % 4];
  const orders = seg === "High Value" ? 18 + (i % 12) : seg === "Medium Value" ? 8 + (i % 6) : seg === "Low Value" ? 2 + (i % 4) : 1 + (i % 2);
  const spend = orders * (seg === "High Value" ? 4200 : seg === "Medium Value" ? 1850 : 920);
  return {
    id: `CUST-${(1024 + i).toString().padStart(5, "0")}`,
    name,
    email: name.toLowerCase().replace(/\s+/g, ".") + "@gmail.com",
    avatar: avatars[i % avatars.length],
    segment: seg,
    totalOrders: orders,
    totalSpend: spend,
    lastPurchase: ["2 days ago","5 days ago","1 week ago","3 weeks ago","2 months ago","Yesterday","Today"][i % 7],
    status: seg === "Dormant" ? "Inactive" : i % 11 === 0 ? "New" : "Active",
    ltv: spend * 1.4,
  };
});

export const kpis = {
  totalCustomers: 24_586,
  totalOrders: 96_412,
  totalRevenue: 12_840_500,
  avgOrderValue: 1330,
  totalCampaigns: 184,
  activeCampaigns: 23,
  aiRecommendations: 1_247,
  campaignSuccessRate: 72.4,
};

export const revenueTrend = [
  { month: "Jan", revenue: 720000, orders: 5400 },
  { month: "Feb", revenue: 820000, orders: 6100 },
  { month: "Mar", revenue: 760000, orders: 5800 },
  { month: "Apr", revenue: 910000, orders: 6800 },
  { month: "May", revenue: 1050000, orders: 7400 },
  { month: "Jun", revenue: 980000, orders: 7100 },
  { month: "Jul", revenue: 1180000, orders: 8200 },
  { month: "Aug", revenue: 1260000, orders: 8900 },
  { month: "Sep", revenue: 1340000, orders: 9300 },
  { month: "Oct", revenue: 1480000, orders: 10100 },
  { month: "Nov", revenue: 1390000, orders: 9800 },
  { month: "Dec", revenue: 1620000, orders: 10800 },
];

export const segmentDistribution = [
  { name: "High Value", value: 18, customers: 4425, color: "var(--color-chart-1)" },
  { name: "Medium Value", value: 34, customers: 8359, color: "var(--color-chart-2)" },
  { name: "Low Value", value: 28, customers: 6884, color: "var(--color-chart-3)" },
  { name: "Dormant", value: 20, customers: 4918, color: "var(--color-chart-4)" },
];

export const segmentDetails = [
  {
    name: "High Value",
    description: "Top spenders with high frequency and large basket sizes. Most loyal customers.",
    customers: 4425,
    avgSpend: 12400,
    avgOrders: 22,
    revenueContribution: 48,
    expectedConversion: 38,
    color: "from-[#F4D24D] to-[#F8E48A]",
    strategy: "Loyalty rewards, early access to new collections, and VIP-only experiences.",
  },
  {
    name: "Medium Value",
    description: "Regular customers with consistent purchases. Strong potential to grow upward.",
    customers: 8359,
    avgSpend: 4800,
    avgOrders: 9,
    revenueContribution: 31,
    expectedConversion: 22,
    color: "from-[#E7E4DD] to-[#F0EFEA]",
    strategy: "Upsell premium tiers, bundle offers, and personalised category recommendations.",
  },
  {
    name: "Low Value",
    description: "Occasional buyers with low ticket size. Opportunity for habit-building campaigns.",
    customers: 6884,
    avgSpend: 1200,
    avgOrders: 3,
    revenueContribution: 14,
    expectedConversion: 12,
    color: "from-[#DDEFE0] to-[#EAF7EC]",
    strategy: "Frequency-driving offers, free shipping thresholds, and category cross-sell.",
  },
  {
    name: "Dormant",
    description: "Have not purchased in 90+ days. Win-back essential before churn.",
    customers: 4918,
    avgSpend: 0,
    avgOrders: 0,
    revenueContribution: 7,
    expectedConversion: 6,
    color: "from-[#F0E4E4] to-[#FAEFEF]",
    strategy: "Reactivation discounts, personalised win-back messaging, survey + reward flow.",
  },
];

export type Campaign = {
  id: string;
  name: string;
  segment: Segment;
  audienceSize: number;
  channel: "Email" | "SMS" | "WhatsApp" | "Push";
  createdAt: string;
  status: "Active" | "Draft" | "Completed" | "Scheduled";
  ctr: number;
  openRate: number;
  delivered: number;
  opened: number;
  clicked: number;
  failed: number;
};

export const campaigns: Campaign[] = [
  { id: "CMP-2041", name: "Diwali VIP Early Access", segment: "High Value", audienceSize: 4425, channel: "Email", createdAt: "Nov 12, 2025", status: "Active", ctr: 18.2, openRate: 64.5, delivered: 4380, opened: 2825, clicked: 798, failed: 45 },
  { id: "CMP-2040", name: "Win-back 90 day dormant", segment: "Dormant", audienceSize: 4918, channel: "WhatsApp", createdAt: "Nov 10, 2025", status: "Active", ctr: 9.1, openRate: 38.2, delivered: 4810, opened: 1837, clicked: 437, failed: 108 },
  { id: "CMP-2039", name: "Upgrade to Premium tier", segment: "Medium Value", audienceSize: 8359, channel: "Email", createdAt: "Nov 08, 2025", status: "Completed", ctr: 12.7, openRate: 52.1, delivered: 8280, opened: 4314, clicked: 1052, failed: 79 },
  { id: "CMP-2038", name: "Free shipping over ₹999", segment: "Low Value", audienceSize: 6884, channel: "SMS", createdAt: "Nov 05, 2025", status: "Completed", ctr: 6.8, openRate: 41.3, delivered: 6790, opened: 2804, clicked: 461, failed: 94 },
  { id: "CMP-2037", name: "Weekend flash sale", segment: "Medium Value", audienceSize: 7200, channel: "Push", createdAt: "Nov 02, 2025", status: "Completed", ctr: 14.4, openRate: 58.7, delivered: 7110, opened: 4174, clicked: 1024, failed: 90 },
  { id: "CMP-2036", name: "New launch teaser", segment: "High Value", audienceSize: 4200, channel: "Email", createdAt: "Oct 28, 2025", status: "Scheduled", ctr: 0, openRate: 0, delivered: 0, opened: 0, clicked: 0, failed: 0 },
  { id: "CMP-2035", name: "Cart recovery sequence", segment: "Medium Value", audienceSize: 3120, channel: "Email", createdAt: "Oct 25, 2025", status: "Active", ctr: 21.5, openRate: 67.8, delivered: 3090, opened: 2095, clicked: 664, failed: 30 },
  { id: "CMP-2034", name: "Survey + ₹200 reward", segment: "Dormant", audienceSize: 4900, channel: "Email", createdAt: "Oct 20, 2025", status: "Draft", ctr: 0, openRate: 0, delivered: 0, opened: 0, clicked: 0, failed: 0 },
];

export type Order = {
  id: string;
  customer: string;
  customerAvatar: string;
  amount: number;
  status: "Paid" | "Pending" | "Refunded";
  channel: string;
  date: string;
  items: number;
};

export const orders: Order[] = Array.from({ length: 14 }, (_, i) => {
  const c = customers[i % customers.length];
  return {
    id: `ORD-${(80214 + i)}`,
    customer: c.name,
    customerAvatar: c.avatar,
    amount: [1280, 2540, 890, 4320, 1650, 980, 3120, 720, 5840, 1190, 2480, 1340, 4920, 760][i],
    status: (["Paid","Paid","Paid","Pending","Paid","Refunded","Paid","Paid","Paid","Pending","Paid","Paid","Paid","Paid"] as const)[i],
    channel: ["Web","App","Web","App","Web","Web","App","App","Web","Web","App","Web","App","Web"][i],
    date: ["Today, 10:42","Today, 09:12","Yesterday","Yesterday","2 days ago","2 days ago","3 days ago","4 days ago","5 days ago","6 days ago","1 week ago","1 week ago","2 weeks ago","3 weeks ago"][i],
    items: (i % 5) + 1,
  };
});

export const activities = [
  { type: "customer", text: "Ananya Iyer joined as a new customer", time: "2 min ago", avatar: avatars[3] },
  { type: "order", text: "Rohan Kapoor placed an order worth ₹4,320", time: "8 min ago", avatar: avatars[2] },
  { type: "campaign", text: "Diwali VIP Early Access was executed to 4,425 recipients", time: "32 min ago" },
  { type: "ai", text: "AI generated a re-engagement strategy for Dormant segment", time: "1 hr ago" },
  { type: "order", text: "Sara Khan placed an order worth ₹2,540", time: "2 hr ago", avatar: avatars[5] },
  { type: "campaign", text: "Win-back 90 day dormant campaign reached 38% open rate", time: "3 hr ago" },
  { type: "customer", text: "Maya Reddy upgraded to High Value segment", time: "5 hr ago", avatar: avatars[1] },
];

export const channelPerformance = [
  { channel: "Email", ctr: 14.2, openRate: 58.1, delivered: 24500 },
  { channel: "SMS", ctr: 6.8, openRate: 41.3, delivered: 12800 },
  { channel: "WhatsApp", ctr: 11.4, openRate: 48.5, delivered: 9400 },
  { channel: "Push", ctr: 9.1, openRate: 36.7, delivered: 18200 },
];

export const openRateTrend = [
  { day: "Mon", rate: 52 }, { day: "Tue", rate: 56 }, { day: "Wed", rate: 49 },
  { day: "Thu", rate: 61 }, { day: "Fri", rate: 64 }, { day: "Sat", rate: 58 }, { day: "Sun", rate: 67 },
];

export const ctrTrend = [
  { day: "Mon", rate: 11.2 }, { day: "Tue", rate: 12.8 }, { day: "Wed", rate: 10.4 },
  { day: "Thu", rate: 14.1 }, { day: "Fri", rate: 16.3 }, { day: "Sat", rate: 13.7 }, { day: "Sun", rate: 17.2 },
];

export const healthMetrics = [
  { name: "Backend API", status: "Operational", uptime: "99.98%", latency: "82ms", icon: "Server" },
  { name: "PostgreSQL Database", status: "Operational", uptime: "99.99%", latency: "12ms", icon: "Database" },
  { name: "Gemini AI Service", status: "Operational", uptime: "99.92%", latency: "640ms", icon: "Sparkles" },
  { name: "Campaign Engine", status: "Operational", uptime: "99.95%", latency: "118ms", icon: "Megaphone" },
  { name: "Webhook Delivery", status: "Operational", uptime: "99.87%", latency: "204ms", icon: "Webhook" },
  { name: "Deployment", status: "Production", uptime: "v2.0.1", latency: "Vercel · Edge", icon: "Cloud" },
];

export function inr(n: number) {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)}Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(2)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export function num(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toLocaleString("en-IN");
}
