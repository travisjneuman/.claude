/**
 * AI Provider Types and Interfaces
 * Defines the contract for all AI provider implementations
 */

/**
 * AI Model metadata
 */
export interface AIModel {
  id: string; // Unique model identifier (e.g., "gpt-4o", "llama-3.3-70b")
  name: string; // Display name (e.g., "GPT-4o", "Llama 3.3 70B")
  provider: string; // Provider ID (e.g., "openai", "groq")

  // Performance characteristics
  speedRating: 1 | 2 | 3 | 4 | 5; // 1 = slow, 5 = lightning fast
  qualityRating: 1 | 2 | 3 | 4 | 5; // 1 = basic, 5 = excellent

  // Capabilities
  contextWindow: number; // Max tokens in context (e.g., 128000)
  maxOutputTokens?: number; // Max tokens in response
  supportsStreaming: boolean; // Can stream responses
  supportsVision?: boolean; // Can process images
  supportsFunctionCalling?: boolean; // Can call functions

  // Cost and availability
  isFree: boolean; // Available on free tier
  costPer1MTokens?: number; // Cost in USD per 1M tokens (if paid)
  requiresApiKey: boolean; // Needs API key

  // Use cases
  useCases: string[]; // ["chat", "code", "reasoning", "creative"]
  description?: string; // Brief description of model strengths
}

/**
 * AI Provider metadata
 */
export interface AIProviderMetadata {
  id: string; // Unique provider ID (e.g., "openai", "groq")
  name: string; // Display name (e.g., "OpenAI", "Groq")
  displayName: string; // Branded name for UI
  description: string; // Brief description

  // Authentication
  requiresApiKey: boolean; // Needs API key
  apiKeyUrl?: string; // Where to get API key
  apiKeyLabel?: string; // Label for API key input (e.g., "OpenAI API Key")

  // Availability
  hasFreeModels: boolean; // Has free tier models
  freeModelIds?: string[]; // IDs of free models

  // Rate limits (free tier)
  freeTierLimits?: {
    requestsPerMinute?: number;
    requestsPerDay?: number;
    tokensPerMinute?: number;
    tokensPerDay?: number;
    description?: string; // Human-readable description
  };

  // Features
  supportsCORS?: boolean; // Can be called from browser
  requiresProxy?: boolean; // Needs backend proxy
  supportsStreaming: boolean; // Can stream responses

  // Branding
  logoUrl?: string; // Provider logo
  websiteUrl?: string; // Provider website
  docsUrl?: string; // API documentation
}

/**
 * AI message options
 */
export interface AIMessageOptions {
  prompt: string; // User message
  conversationHistory?: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>; // Previous messages
  systemPrompt?: string; // System instruction
  temperature?: number; // 0-1, creativity level
  maxTokens?: number; // Max response length
  stream?: boolean; // Enable streaming
  onChunk?: (chunk: string) => void; // Stream callback
}

/**
 * AI response
 */
export interface AIResponse {
  content: string; // Response text
  model: string; // Model used
  provider: string; // Provider used
  finishReason?: 'stop' | 'length' | 'error'; // Why generation stopped
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * Provider error types
 */
export const ProviderErrorType = {
  INVALID_API_KEY: 'invalid_api_key',
  RATE_LIMIT: 'rate_limit',
  QUOTA_EXCEEDED: 'quota_exceeded',
  MODEL_NOT_FOUND: 'model_not_found',
  NETWORK_ERROR: 'network_error',
  TIMEOUT: 'timeout',
  UNKNOWN: 'unknown',
} as const;

export type ProviderErrorType = typeof ProviderErrorType[keyof typeof ProviderErrorType];

/**
 * Provider error
 */
export class ProviderError extends Error {
  type: ProviderErrorType;
  provider: string;
  retryable: boolean;

  constructor(
    type: ProviderErrorType,
    message: string,
    provider: string,
    retryable: boolean = false
  ) {
    super(message);
    this.name = 'ProviderError';
    this.type = type;
    this.provider = provider;
    this.retryable = retryable;
  }
}

/**
 * AI Provider interface
 * All provider implementations must implement this interface
 */
export interface AIProvider {
  // Metadata
  metadata: AIProviderMetadata;
  models: AIModel[];

  // Configuration
  isConfigured(): boolean; // Has valid API key
  setApiKey(apiKey: string): void;
  getApiKey(): string | null;
  clearApiKey(): void;

  // Validation
  validateApiKey(apiKey: string): Promise<boolean>;

  // Model operations
  getModel(modelId: string): AIModel | null;
  getDefaultModel(): AIModel;
  getFreeModels(): AIModel[];

  // Messaging
  sendMessage(model: string, options: AIMessageOptions): Promise<AIResponse>;

  // Usage tracking
  getUsage?(): Promise<{ requestsToday: number; tokensToday: number; limitReached: boolean }>;
}

/**
 * Provider selection criteria
 */
export interface ProviderSelectionCriteria {
  requireFree?: boolean; // Only free models
  requireFast?: boolean; // Prioritize speed
  requireHighQuality?: boolean; // Prioritize quality
  minContextWindow?: number; // Minimum context size
  useCase?: string; // Specific use case
}

/**
 * Provider router configuration
 */
export interface ProviderRouterConfig {
  primaryProvider: string; // Primary provider ID
  primaryModel: string; // Primary model ID
  fallbackEnabled: boolean; // Enable automatic fallbacks
  fallbackOrder: string[]; // Provider IDs in fallback order
  notifyOnFallback: boolean; // Show notification when falling back
}

/**
 * Usage statistics
 */
export interface ProviderUsageStats {
  provider: string;
  model: string;
  requestsToday: number;
  tokensToday: number;
  lastRequestAt: Date | null;
  limitReached: boolean;
  resetAt?: Date; // When limits reset
}
