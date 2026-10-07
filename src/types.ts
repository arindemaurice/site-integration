export type AspectRatio = '16:9' | '9:16';

export interface InternetPlan {
  id: string;
  name: string;
  speed: string;
  speedNumber: number; // in Mbps
  priceUgx?: string;
  description: string;
  badge?: string;
  isPopular?: boolean;
  category: 'home' | 'student' | 'gamer' | 'business';
  features: string[];
  recommendedFor: string;
}

export interface VideoGenerationState {
  status: 'idle' | 'uploading' | 'processing' | 'ready' | 'error';
  progress: number;
  stepMessage: string;
  operationName: string | null;
  videoUrl: string | null;
  errorMessage: string | null;
  aspectRatio: AspectRatio;
  prompt: string;
  sourceImagePreview: string | null;
  startedAt?: number;
}

export interface InquiryFormData {
  name: string;
  phone: string;
  location: string;
  planId: string;
  customerType: 'home' | 'student' | 'gamer' | 'business';
  notes: string;
}
