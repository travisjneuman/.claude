/**
 * DeepSeek AI Provider
 * Access to DeepSeek models (V3, Coder, Reasoner)
 * BYOK (Bring Your Own Key) - User provides API key
 * OpenAI-compatible API
 */

import OpenAI from 'openai';
import type {
  AIProvider,
  AIProviderMetadata,
  AIModel,
  AIMessageOptions,
  AIResponse,
} from './types';
import { ProviderError, ProviderErrorType } from './types';

/**
 * DeepSeek provider metadata
 */
const METADATA: AIProviderMetadata = {
  id: 'deepseek',
  name: 'DeepSeek',
  displayName: 'DeepSeek',
  description: 'High-quality AI models with excellent reasoning and coding capabilities at competitive prices.',

  requiresApiKey: true,
  apiKeyUrl: 'https://platform.deepseek.com/api_keys',
  apiKeyLabel: 'DeepSeek API Key',

  hasFreeModels: false,
  freeModelIds: [],

  supportsCORS: false,
  requiresProxy: true,
  supportsStreaming: true,

  websiteUrl: 'https://www.deepseek.com',
  docsUrl: 'https://platform.deepseek.com/api-docs',
};

/**
 * DeepSeek models
 */
const MODELS: AIModel[] = [
  {
    id: 'deepseek-chat',
    name: 'DeepSeek V3',
    provider: 'deepseek',
    speedRating: 4,
    qualityRating: 5,
    contextWindow: 65536,
    maxOutputTokens: 8192,
    supportsStreaming: true,
    isFree: false,
    costPer1MTokens: 0.28, // Output price, input is ~$0.14
    requiresApiKey: true,
    useCases: ['chat', 'reasoning', 'analysis', 'creative'],
    description: 'DeepSeek-V3: Flagship model rivaling GPT-4 with excellent reasoning.',
  },
  {
    id: 'deepseek-coder',
    name: 'DeepSeek Coder V2',
    provider: 'deepseek',
    speedRating: 4,
    qualityRating: 5,
    contextWindow: 131072,
    maxOutputTokens: 8192,
    supportsStreaming: true,
    isFree: false,
    costPer1MTokens: 0.28,
    requiresApiKey: true,
    useCases: ['code', 'debugging', 'refactoring', 'explanation'],
    description: 'DeepSeek-Coder-V2: Specialized for code generation and understanding.',
  },
  {
    id: 'deepseek-reasoner',
    name: 'DeepSeek R1',
    provider: 'deepseek',
    speedRating: 3,
    qualityRating: 5,
    contextWindow: 65536,
    maxOutputTokens: 8192,
    supportsStreaming: true,
    isFree: false,
    costPer1MTokens: 2.19, // R1 is more expensive
    requiresApiKey: true,
    useCases: ['reasoning', 'math', 'logic', 'analysis'],
    description: 'DeepSeek-R1: Advanced reasoning model for complex problem-solving.',
  },
];

/**
 * DeepSeek AI Provider Implementation
 * Uses OpenAI-compatible API
 */
export class DeepSeekProvider implements AIProvider {
  metadata = METADATA;
  models = MODELS;

  private client: OpenAI | null = null;
  private apiKey: string | null = null;

  /**
   * Check if provider is configured with API key
   */
  isConfigured(): boolean {
    return !!this.apiKey && !!this.client;
  }

  /**
   * Set API key and initialize client
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    this.client = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  /**
   * Get current API key
   */
  getApiKey(): string | null {
    return this.apiKey;
  }

  /**
   * Clear API key and client
   */
  clearApiKey(): void {
    this.apiKey = null;
    this.client = null;
  }

  /**
   * Validate API key by making a test request
   */
  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      const testClient = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
      });

      // Try to list models (minimal API call)
      await testClient.models.list();
      return true;
    } catch (error) {
      console.error('DeepSeek API key validation failed:', error);
      return false;
    }
  }

  /**
   * Get model by ID
   */
  getModel(modelId: string): AIModel | null {
    return this.models.find((m) => m.id === modelId) || null;
  }

  /**
   * Get default model
   */
  getDefaultModel(): AIModel {
    return MODELS[0]; // DeepSeek V3
  }

  /**
   * Get all free models
   */
  getFreeModels(): AIModel[] {
    return []; // No free models
  }

  /**
   * Send message to DeepSeek
   */
  async sendMessage(model: string, options: AIMessageOptions): Promise<AIResponse> {
    if (!this.client) {
      throw new ProviderError(
        ProviderErrorType.INVALID_API_KEY,
        'DeepSeek provider not configured. Please add your DeepSeek API key.',
        'deepseek'
      );
    }

    try {
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

      // Add system prompt if provided
      if (options.systemPrompt) {
        messages.push({
          role: 'system',
          content: options.systemPrompt,
        });
      }

      // Add conversation history
      if (options.conversationHistory) {
        options.conversationHistory.forEach((msg) => {
          messages.push({
            role: msg.role === 'assistant' ? 'assistant' : msg.role === 'system' ? 'system' : 'user',
            content: msg.content,
          });
        });
      }

      // Add current user prompt
      messages.push({
        role: 'user',
        content: options.prompt,
      });

      // Send request
      if (options.stream && options.onChunk) {
        // Streaming mode
        const stream = await this.client.chat.completions.create({
          model: model,
          messages: messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 2048,
          stream: true,
        });

        let fullContent = '';
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          fullContent += content;
          if (content && options.onChunk) {
            options.onChunk(content);
          }
        }

        return {
          content: fullContent,
          model: model,
          provider: 'deepseek',
          finishReason: 'stop',
        };
      } else {
        // Non-streaming mode
        const completion = await this.client.chat.completions.create({
          model: model,
          messages: messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 2048,
          stream: false,
        });

        const content = completion.choices[0]?.message?.content || '';

        return {
          content: content,
          model: model,
          provider: 'deepseek',
          finishReason: completion.choices[0]?.finish_reason as 'stop' | 'length' | undefined,
          usage: completion.usage ? {
            promptTokens: completion.usage.prompt_tokens,
            completionTokens: completion.usage.completion_tokens,
            totalTokens: completion.usage.total_tokens,
          } : undefined,
        };
      }
    } catch (error: unknown) {
      const err = error as { status?: number; message?: string };

      // Map DeepSeek errors to ProviderError
      if (err?.status === 401 || err?.message?.includes('Incorrect API key') || err?.message?.includes('invalid_api_key')) {
        throw new ProviderError(
          ProviderErrorType.INVALID_API_KEY,
          'Invalid DeepSeek API key. Please check your API key and try again.',
          'deepseek'
        );
      } else if (err?.status === 429 || err?.message?.includes('rate limit')) {
        throw new ProviderError(
          ProviderErrorType.RATE_LIMIT,
          'DeepSeek rate limit exceeded. Please wait a moment and try again.',
          'deepseek',
          true // retryable
        );
      } else if (err?.status === 402 || err?.message?.includes('quota') || err?.message?.includes('insufficient_balance')) {
        throw new ProviderError(
          ProviderErrorType.QUOTA_EXCEEDED,
          'DeepSeek quota exceeded or insufficient balance. Please check your account.',
          'deepseek'
        );
      } else if (err?.status === 404 || err?.message?.includes('model')) {
        throw new ProviderError(
          ProviderErrorType.MODEL_NOT_FOUND,
          `Model "${model}" not found on DeepSeek.`,
          'deepseek'
        );
      } else if (err?.message?.includes('CORS') || err?.message?.includes('fetch')) {
        throw new ProviderError(
          ProviderErrorType.NETWORK_ERROR,
          'DeepSeek requires backend proxy for browser use. CORS error encountered.',
          'deepseek'
        );
      } else {
        throw new ProviderError(
          ProviderErrorType.UNKNOWN,
          `DeepSeek error: ${err?.message || 'Unknown error occurred'}`,
          'deepseek'
        );
      }
    }
  }
}

// Singleton instance
export const deepseekProvider = new DeepSeekProvider();
