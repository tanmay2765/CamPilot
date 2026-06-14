from app.services.ai_service import model

response = model.generate_content(
    "Say hello"
)

print(response.text)