from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import google.generativeai as genai
import base64
import io
from PIL import Image
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="AsanaSense API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini AI
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable is required")

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

@app.get("/")
async def root():
    return {"message": "AsanaSense API is running!"}

@app.post("/analyze")
async def analyze_pose(file: UploadFile = File(...)):
    try:
        # Read the uploaded file
        contents = await file.read()
        
        # Convert to PIL Image
        image = Image.open(io.BytesIO(contents))
        
        # Convert to base64-encoded JPEG for Gemini
        buffered = io.BytesIO()
        image.convert("RGB").save(buffered, format="JPEG")
        image_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
        
        # Create the prompt for yoga pose analysis
        prompt = """
        Analyze this yoga pose image and provide:
        1. The name of the yoga pose (if recognizable)
        2. Detailed posture feedback including:
           - Alignment corrections needed
           - Breathing suggestions
           - Common mistakes to avoid
           - Tips for improvement
        
        Keep the feedback encouraging, specific, and actionable. 
        If this is not a recognizable yoga pose, provide general posture feedback.
        
        Format your response as a single paragraph that flows naturally when spoken aloud.
        """
        
        # Generate content using Gemini
        response = model.generate_content([
            prompt,
            {
                "mime_type": "image/jpeg",
                "data": image_base64
            }
        ])

        feedback_text = response.text or ""
        if not feedback_text.strip():
            raise RuntimeError("Gemini returned an empty response")

        feedback = feedback_text.strip()
        
        return JSONResponse(content={"feedback": feedback})
        
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "AsanaSense API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
