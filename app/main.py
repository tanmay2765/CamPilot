from fastapi import FastAPI

from app.routes.customers import router as customer_router
from app.routes.orders import router as order_router
from app.routes.analytics import router as analytics_router
from app.routes.metrics import router as metrics_router
from app.routes.segments import router as segment_router
from app.routes.campaigns import router as campaign_router
from app.routes.execution import router as execution_router
from app.routes.dashboard import router as dashboard_router

app = FastAPI(
    title="Campaign Copilot CRM",
    version="1.0.0"
)

app.include_router(customer_router)
app.include_router(order_router)
app.include_router(analytics_router)
app.include_router(metrics_router)
app.include_router(segment_router)
app.include_router(campaign_router)
app.include_router(execution_router)
app.include_router(dashboard_router)



@app.get("/")
def root():
    return {
        "message": "Campaign Copilot API Running"
    }