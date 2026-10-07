import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Allow large image payload for photo uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Lazy GoogleGenAI client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in the environment');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// 2. Generate Video using Veo (veo-3.1-fast-generate-preview)
app.post('/api/generate-video', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', prompt, aspectRatio = '16:9' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'imageBase64 is required' });
    }

    // Strip data url prefix if present
    const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');

    const ai = getGenAI();

    const videoPrompt = prompt && prompt.trim().length > 0
      ? prompt.trim()
      : 'Cinematic high-speed internet promotion: dramatic camera pan showcasing glowing fiber optic streams, ultra-fast connection speeds, vivid colors and smooth motion.';

    const validAspectRatio = aspectRatio === '9:16' ? '9:16' : '16:9';

    console.log(`[Veo] Requesting video generation with model: veo-3.1-fast-generate-preview, aspect: ${validAspectRatio}`);

    const operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: videoPrompt,
      image: {
        imageBytes: cleanBase64,
        mimeType: mimeType || 'image/jpeg',
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: validAspectRatio,
      },
    });

    console.log(`[Veo] Operation started: ${operation.name}`);
    return res.json({ operationName: operation.name });
  } catch (error: any) {
    console.error('[Veo] Generate error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to start video generation',
    });
  }
});

// 3. Poll Video Operation Status
app.post('/api/video-status', async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'operationName is required' });
    }

    const ai = getGenAI();
    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });
    console.log(`[Veo] Status check for ${operationName}: done=${updated.done}`);

    return res.json({
      done: Boolean(updated.done),
      error: updated.error || null,
    });
  } catch (error: any) {
    console.error('[Veo] Status error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to check video status',
    });
  }
});

// 4. Download / Stream Video
app.post('/api/video-download', async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'operationName is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
    }

    const ai = getGenAI();
    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });

    if (!updated.done) {
      return res.status(400).json({ error: 'Video generation is still processing' });
    }

    if (updated.error) {
      return res.status(500).json({ error: updated.error.message || 'Video generation failed' });
    }

    const videoUri = updated.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) {
      return res.status(404).json({ error: 'No video URI found in completed operation' });
    }

    console.log(`[Veo] Fetching generated video from URI...`);
    const videoRes = await fetch(videoUri, {
      headers: {
        'x-goog-api-key': apiKey,
      },
    });

    if (!videoRes.ok) {
      throw new Error(`Failed to fetch video from storage: ${videoRes.status} ${videoRes.statusText}`);
    }

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', 'inline; filename="veo-animation.mp4"');

    if (videoRes.body) {
      // Pipe web stream to Express response
      const reader = videoRes.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(Buffer.from(value));
      }
      res.end();
    } else {
      const buffer = await videoRes.arrayBuffer();
      res.send(Buffer.from(buffer));
    }
  } catch (error: any) {
    console.error('[Veo] Download error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to download video',
    });
  }
});

// 5. Arinde Maurice AI Assistant / Package Recommendation Endpoint
app.post('/api/assistant', async (req, res) => {
  try {
    const { message, history } = req.body;
    const ai = getGenAI();

    const systemInstruction = `You are the digital assistant for Arinde Maurice, a trusted internet connection representative and marketing expert.
Maurice's contact information:
- Phone / Call: 0789269317
- WhatsApp: 0748808436
- Representative: Arinde Maurice

Maurice provides high-speed, reliable fiber optic and broadband internet packages for:
1. Homes & Families (30 Mbps - 100 Mbps, smooth 4K TV streaming, smart home devices, family connection)
2. Students & Academics (15 Mbps - 30 Mbps, affordable budget, Zoom classes, fast research & downloads)
3. Gamers (60 Mbps - 200 Mbps, ultra-low latency ping, zero packet loss, multiplayer esports)
4. Businesses & Offices (100 Mbps - 1000 Mbps dedicated fiber, 99.9% uptime SLA, priority technical support, multi-device capacity)

Help users calculate their bandwidth needs, recommend the best package, explain installation procedures, and encourage them to call or WhatsApp Maurice directly for instant site survey and installation. Keep responses warm, helpful, energetic, and professional.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message || 'Hello, what internet packages do you offer?',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (err: any) {
    console.error('Assistant error:', err);
    res.status(500).json({ error: err.message || 'Assistant error' });
  }
});

// Start server with Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Arinde Maurice Internet Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
