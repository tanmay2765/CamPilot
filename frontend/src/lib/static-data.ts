// Static display data used in charts and feeds.
// These have no backend endpoint — they're placeholder visualisations.

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

export const activities = [
  { type: "customer", text: "Ananya Iyer joined as a new customer", time: "2 min ago", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces" },
  { type: "order", text: "Rohan Kapoor placed an order worth ₹4,320", time: "8 min ago", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces" },
  { type: "campaign", text: "Diwali VIP Early Access was executed to 4,425 recipients", time: "32 min ago" },
  { type: "ai", text: "AI generated a re-engagement strategy for Dormant segment", time: "1 hr ago" },
  { type: "order", text: "Sara Khan placed an order worth ₹2,540", time: "2 hr ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces" },
  { type: "campaign", text: "Win-back 90 day dormant campaign reached 38% open rate", time: "3 hr ago" },
  { type: "customer", text: "Maya Reddy upgraded to High Value segment", time: "5 hr ago", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces" },
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
