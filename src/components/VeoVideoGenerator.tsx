import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  Upload,
  Sparkles,
  Play,
  RotateCcw,
  Download,
  AlertCircle,
  CheckCircle2,
  Tv,
  Smartphone,
  Layers,
  ArrowRight,
  Clock,
  Wand2
} from 'lucide-react';
import { AspectRatio, VideoGenerationState } from '../types';

const PROMPT_SUGGESTIONS = [
  {
    label: '⚡ Fiber Speed Surge',
    prompt: 'Cinematic camera movement showing glowing fiber optic light pulses accelerating through the scene with energetic high-speed visual motion and vivid colors.',
  },
  {
    label: '🎥 Technician Action Shot',
    prompt: 'Dynamic cinematic pan around the technician connecting high-speed fiber cables, warm sunlight, professional documentary style, smooth motion.',
  },
  {
    label: '🌐 Futuristic Connected Network',
    prompt: 'Futuristic digital network waves expanding smoothly into modern smart devices with glowing high-speed internet data beams.',
  },
  {
    label: '✨ Smooth Cinematic Zoom',
    prompt: 'Gentle cinematic push-in camera movement with soft atmospheric depth of field and beautiful lens flare.',
  },
];

const REASSURING_STEPS = [
  'Initializing Veo video generation engine...',
  'Analyzing photo depth and composition...',
  'Synthesizing continuous motion vector frames...',
  'Applying cinematic lighting and fiber stream effects...',
  'Compiling high-definition MP4 video stream...',
  'Finalizing download buffer...',
];

export const VeoVideoGenerator: React.FC = () => {
  const [state, setState] = useState<VideoGenerationState>({
    status: 'idle',
    progress: 0,
    stepMessage: '',
    operationName: null,
    videoUrl: null,
    errorMessage: null,
    aspectRatio: '16:9',
    prompt: PROMPT_SUGGESTIONS[0].prompt,
    sourceImagePreview: null,
  });

  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setState((prev) => ({
        ...prev,
        errorMessage: 'Please select a valid image file (JPEG, PNG, or WebP).',
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageBase64(result);
      setImageMimeType(file.type || 'image/jpeg');
      setState((prev) => ({
        ...prev,
        sourceImagePreview: result,
        errorMessage: null,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Load Arinde Maurice's technician photo as sample
  const loadMauriceSamplePhoto = async () => {
    try {
      setState((prev) => ({ ...prev, errorMessage: null }));
      const response = await fetch('/maurice-profile.jpg');
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setImageBase64(base64);
        setImageMimeType('image/jpeg');
        setState((prev) => ({
          ...prev,
          sourceImagePreview: base64,
          errorMessage: null,
        }));
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error('Failed to load sample image:', err);
      setState((prev) => ({
        ...prev,
        errorMessage: 'Could not load the sample photo. Please upload your own image.',
      }));
    }
  };

  // Start Generation
  const handleStartGeneration = async () => {
    if (!imageBase64) {
      setState((prev) => ({
        ...prev,
        errorMessage: 'Please upload a photo or use the sample photo first.',
      }));
      return;
    }

    // Reset previous run
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    setElapsedSeconds(0);
    setState((prev) => ({
      ...prev,
      status: 'processing',
      progress: 5,
      stepMessage: REASSURING_STEPS[0],
      errorMessage: null,
      videoUrl: null,
      startedAt: Date.now(),
    }));

    // Start elapsed timer
    timerIntervalRef.current = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);

    try {
      // 1. Send start request to backend
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          mimeType: imageMimeType,
          prompt: state.prompt,
          aspectRatio: state.aspectRatio,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to start video generation');
      }

      const operationName = data.operationName;
      setState((prev) => ({
        ...prev,
        operationName,
        progress: 15,
        stepMessage: REASSURING_STEPS[1],
      }));

      // 2. Start polling
      let stepIndex = 1;
      let fakeProgress = 15;

      pollIntervalRef.current = setInterval(async () => {
        try {
          // Increment comforting steps
          fakeProgress = Math.min(fakeProgress + 4, 92);
          if (fakeProgress > 30 && stepIndex < 2) stepIndex = 2;
          if (fakeProgress > 50 && stepIndex < 3) stepIndex = 3;
          if (fakeProgress > 70 && stepIndex < 4) stepIndex = 4;

          setState((prev) => ({
            ...prev,
            progress: fakeProgress,
            stepMessage: REASSURING_STEPS[stepIndex] || REASSURING_STEPS[3],
          }));

          const statusRes = await fetch('/api/video-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ operationName }),
          });

          const statusData = await statusRes.json();

          if (statusData.error) {
            throw new Error(statusData.error.message || 'Video generation failed');
          }

          if (statusData.done) {
            // Finished!
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            setState((prev) => ({
              ...prev,
              progress: 98,
              stepMessage: REASSURING_STEPS[5],
            }));

            // Download video
            const dlRes = await fetch('/api/video-download', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ operationName }),
            });

            if (!dlRes.ok) {
              const errJson = await dlRes.json().catch(() => ({}));
              throw new Error(errJson.error || 'Failed to retrieve generated video');
            }

            const videoBlob = await dlRes.blob();
            const videoUrl = URL.createObjectURL(videoBlob);

            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

            setState((prev) => ({
              ...prev,
              status: 'ready',
              progress: 100,
              videoUrl,
              stepMessage: 'Video generated successfully!',
            }));
          }
        } catch (pollErr: any) {
          console.error('Polling error:', pollErr);
          if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          setState((prev) => ({
            ...prev,
            status: 'error',
            errorMessage: pollErr.message || 'An error occurred while generating the video.',
          }));
        }
      }, 4000);
    } catch (err: any) {
      console.error('Generate initiation error:', err);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setState((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: err.message || 'Could not connect to the video generation service.',
      }));
    }
  };

  const handleReset = () => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setState({
      status: 'idle',
      progress: 0,
      stepMessage: '',
      operationName: null,
      videoUrl: null,
      errorMessage: null,
      aspectRatio: '16:9',
      prompt: PROMPT_SUGGESTIONS[0].prompt,
      sourceImagePreview: null,
    });
    setImageBase64(null);
    setElapsedSeconds(0);
  };

  return (
    <section id="veo-animator" className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Powered by Veo 3.1 Fast Video Generation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Animate Photos into High-Speed Internet Videos
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Turn your photo into a cinematic promotional video! Upload your own picture or use Arinde Maurice’s fiber technician portrait to witness pure visual speed.
          </p>
        </div>

        {/* Main Card Container */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          {state.status === 'ready' && state.videoUrl ? (
            /* READY: Video Player & Actions */
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-700 pb-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold text-lg">Your Veo Video is Ready!</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    id="download-veo-video-btn"
                    href={state.videoUrl}
                    download="arinde-maurice-fast-internet.mp4"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/30"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download MP4</span>
                  </a>
                  <button
                    id="reset-veo-generator-btn"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium text-sm transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Create Another</span>
                  </button>
                </div>
              </div>

              {/* Video Player Display */}
              <div className="flex flex-col items-center justify-center">
                <div
                  className={`relative rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-black flex items-center justify-center ${
                    state.aspectRatio === '9:16'
                      ? 'w-full max-w-xs aspect-[9/16]'
                      : 'w-full max-w-3xl aspect-[16/9]'
                  }`}
                >
                  <video
                    src={state.videoUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-400 font-medium">
                    Rendered in {state.aspectRatio} format • Model: <span className="text-blue-400">veo-3.1-fast-generate-preview</span>
                  </p>
                </div>
              </div>
            </div>
          ) : state.status === 'processing' ? (
            /* PROCESSING: Progress & Reassuring Messages */
            <div className="py-12 px-4 text-center max-w-xl mx-auto space-y-8">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping" />
                <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-amber-400 border-b-transparent border-l-transparent animate-spin" />
                <Video className="w-10 h-10 text-blue-400" />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">Synthesizing Your Video</h3>
                <p className="text-blue-400 font-medium text-sm animate-pulse">
                  {state.stepMessage}
                </p>
                <p className="text-xs text-slate-400">
                  Elapsed time: <span className="font-mono text-slate-300 font-semibold">{elapsedSeconds}s</span> • Veo generates full motion video from still imagery.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden p-0.5">
                  <div
                    className="bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400 h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${state.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Starting render</span>
                  <span>{state.progress}%</span>
                  <span>Ready</span>
                </div>
              </div>

              {/* Image Preview during processing */}
              {state.sourceImagePreview && (
                <div className="inline-flex items-center gap-3 p-2 bg-slate-900/60 rounded-lg border border-slate-700/80">
                  <img
                    src={state.sourceImagePreview}
                    alt="Source"
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="text-left text-xs">
                    <p className="text-slate-300 font-medium">Source Photo Locked</p>
                    <p className="text-slate-500">Aspect Ratio: {state.aspectRatio}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* IDLE / UPLOAD: Form Controls */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Image Selection */}
              <div className="lg:col-span-5 space-y-4">
                <label className="block text-sm font-semibold text-slate-200">
                  1. Select or Upload Photo
                </label>

                {/* Dropzone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`cursor-pointer border-2 border-dashed rounded-xl p-6 transition-all text-center flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden ${
                    dragActive
                      ? 'border-blue-400 bg-blue-500/10'
                      : state.sourceImagePreview
                      ? 'border-blue-500/60 bg-slate-900/50'
                      : 'border-slate-700 hover:border-slate-500 bg-slate-900/40 hover:bg-slate-900/60'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFile(e.target.files[0]);
                      }
                    }}
                  />

                  {state.sourceImagePreview ? (
                    <div className="relative w-full h-48 flex items-center justify-center">
                      <img
                        src={state.sourceImagePreview}
                        alt="Preview"
                        className="max-h-full max-w-full object-contain rounded-lg shadow-md"
                      />
                      <div className="absolute bottom-2 right-2 bg-slate-900/90 text-white text-xs px-2.5 py-1 rounded-md border border-slate-700">
                        Click to change
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-200">
                          Drop your image here or <span className="text-blue-400 underline">browse</span>
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WebP</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Sample Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    id="use-sample-photo-btn"
                    onClick={loadMauriceSamplePhoto}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-600/70 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <img
                      src="/maurice-profile.jpg"
                      alt="Arinde Maurice sample"
                      className="w-5 h-5 rounded-full object-cover border border-amber-400"
                    />
                    <span>Use Arinde Maurice Fiber Technician Sample Photo</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Settings, Aspect Ratio & Prompt */}
              <div className="lg:col-span-7 space-y-6">
                {/* 2. Aspect Ratio Selector (16:9 or 9:16 required) */}
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">
                    2. Choose Aspect Ratio (Required)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      id="aspect-ratio-16-9-btn"
                      onClick={() => setState((prev) => ({ ...prev, aspectRatio: '16:9' }))}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                        state.aspectRatio === '16:9'
                          ? 'border-blue-500 bg-blue-600/20 text-white shadow-md ring-1 ring-blue-500'
                          : 'border-slate-700 bg-slate-900/40 text-slate-300 hover:bg-slate-900/70'
                      }`}
                    >
                      <div className="w-10 h-7 rounded border border-current flex items-center justify-center text-xs font-bold">
                        16:9
                      </div>
                      <div>
                        <div className="text-sm font-bold flex items-center gap-1.5">
                          <Tv className="w-4 h-4 text-blue-400" />
                          <span>16:9 Landscape</span>
                        </div>
                        <p className="text-xs text-slate-400">TV, Web & YouTube widescreen</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      id="aspect-ratio-9-16-btn"
                      onClick={() => setState((prev) => ({ ...prev, aspectRatio: '9:16' }))}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                        state.aspectRatio === '9:16'
                          ? 'border-blue-500 bg-blue-600/20 text-white shadow-md ring-1 ring-blue-500'
                          : 'border-slate-700 bg-slate-900/40 text-slate-300 hover:bg-slate-900/70'
                      }`}
                    >
                      <div className="w-6 h-9 rounded border border-current flex items-center justify-center text-xs font-bold">
                        9:16
                      </div>
                      <div>
                        <div className="text-sm font-bold flex items-center gap-1.5">
                          <Smartphone className="w-4 h-4 text-amber-400" />
                          <span>9:16 Portrait</span>
                        </div>
                        <p className="text-xs text-slate-400">TikTok, Shorts & WhatsApp Status</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 3. Animation Motion Prompt */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-slate-200">
                      3. Animation Style Prompt
                    </label>
                    <span className="text-xs text-slate-400">Veo Motion Director</span>
                  </div>

                  {/* Preset Pills */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {PROMPT_SUGGESTIONS.map((sug, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setState((prev) => ({ ...prev, prompt: sug.prompt }))}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          state.prompt === sug.prompt
                            ? 'bg-blue-500/20 border-blue-400 text-blue-200'
                            : 'bg-slate-900/40 border-slate-700 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        {sug.label}
                      </button>
                    ))}
                  </div>

                  <textarea
                    id="veo-prompt-input"
                    rows={3}
                    value={state.prompt}
                    onChange={(e) => setState((prev) => ({ ...prev, prompt: e.target.value }))}
                    placeholder="Describe how you want your photo animated..."
                    className="w-full rounded-xl bg-slate-900/80 border border-slate-700 p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Error Banner if any */}
                {state.errorMessage && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                    <span>{state.errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  id="generate-veo-video-btn"
                  type="button"
                  onClick={handleStartGeneration}
                  disabled={!imageBase64}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-lg ${
                    imageBase64
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 hover:from-blue-500 hover:to-amber-400 text-white cursor-pointer shadow-blue-600/30'
                      : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Wand2 className="w-5 h-5 text-amber-300" />
                  <span>Generate Video with Veo (veo-3.1-fast-generate-preview)</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
