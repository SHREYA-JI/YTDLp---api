from fastapi import FastAPI, Query
from fastapi.responses import FileResponse
import yt_dlp
import os
import uuid

app = FastAPI()

@app.get("/download")
async def download(url: str = Query(...), type: str = Query("mp4")):
    filename = f"{uuid.uuid4()}.{type}"
    ydl_opts = {
        "format": "bestaudio" if type == "mp3" else "best",
        "outtmpl": f"/tmp/{filename}",
    }

    if type == "mp3":
        ydl_opts["postprocessors"] = [{
            "key": "FFmpegExtractAudio",
            "preferredcodec": "mp3",
            "preferredquality": "192",
        }]

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        return FileResponse(f"/tmp/{filename}", filename=filename, media_type="application/octet-stream")
    except Exception as e:
        return {"error": str(e)}
