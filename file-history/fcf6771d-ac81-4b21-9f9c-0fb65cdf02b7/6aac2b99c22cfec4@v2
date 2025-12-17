/**
 * Provider Settings Modal
 * Configure AI provider API keys with encryption
 *
 * Features:
 * - Configure all 8 AI providers (OpenRouter, Groq, HuggingFace, Mistral, Gemini, OpenAI, Anthropic, xAI)
 * - Encrypted API key storage
 * - Visual provider status (configured/unconfigured)
 * - Test API key validation
 * - Provider documentation links
 * - Free vs paid tier indicators
 * - CORS compatibility warnings
 */

import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { PasswordPrompt } from './PasswordPrompt';
import { ConfirmDialog } from './ConfirmDialog';
import { useTerminalStore } from '../stores/useTerminalStore';
import { AIProviderRouter, PROVIDER_METADATA } from '../services/ai/providerRouter';
import { toast } from '../stores/useToastStore';

interface ProviderSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  router: AIProviderRouter;
}

export function ProviderSettings({ isOpen, onClose, router }: ProviderSettingsProps) {
  const {
    // providers is unused (using router.getAllProviders() instead)
    encryptionPassword,
    passwordHash,
    isPasswordExpired,
    setProviderApiKey,
    clearProviderApiKey,
    setEncryptionPassword,
    setActiveProvider,
  } = useTerminalStore();

  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [apiKeyInputs, setApiKeyInputs] = useState<Record<string, string>>({});
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});
  const [validating, setValidating] = useState<Record<string, boolean>>({});
  const [validationResults, setValidationResults] = useState<Record<string, boolean | null>>({});
  const [providerToClear, setProviderToClear] = useState<string | null>(null);

  // Get provider metadata (sync - no SDK loading needed for display)
  const providerMetadataList = PROVIDER_METADATA;
  const providerStatus = router.getProviderStatus();

  // Check if password is needed
  useEffect(() => {
    if (!encryptionPassword || isPasswordExpired()) {
      // Password needed but don't show prompt automatically
      // User will trigger it when trying to save an API key
    }
  }, [encryptionPassword, isPasswordExpired]);

  const handlePasswordSubmit = (password: string, hash: string, duration: 'daily' | 'weekly' | 'monthly') => {
    setEncryptionPassword(password, hash, duration);
    setShowPasswordPrompt(false);

    // If user was trying to save a provider, save it now
    if (selectedProvider && apiKeyInputs[selectedProvider]) {
      saveProviderKey(selectedProvider, apiKeyInputs[selectedProvider], password);
    }
  };

  const saveProviderKey = async (providerId: string, apiKey: string, password: string) => {
    try {
      await setProviderApiKey(providerId, apiKey, password);
      setApiKeyInputs((prev) => ({ ...prev, [providerId]: '' }));
      setValidationResults((prev) => ({ ...prev, [providerId]: null }));

      // Store API key in router (will be applied when provider loads)
      router.setProviderApiKey(providerId, apiKey);

      // Try to load provider and set as active
      const provider = await router.getProvider(providerId);
      if (provider) {
        // Auto-switch to this provider after saving
        const defaultModel = provider.getDefaultModel();
        if (defaultModel) {
          setActiveProvider(providerId, defaultModel.id);
        }
      }
    } catch (error) {
      console.error('Failed to save API key:', error);
      toast.error('Failed to save API key', 'Please try again.');
    }
  };

  const handleSaveApiKey = (providerId: string) => {
    const apiKey = apiKeyInputs[providerId];
    if (!apiKey || !apiKey.trim()) return;

    // Check if password is needed
    if (!encryptionPassword || isPasswordExpired()) {
      setSelectedProvider(providerId);
      setShowPasswordPrompt(true);
      return;
    }

    saveProviderKey(providerId, apiKey, encryptionPassword);
  };

  const handleClearApiKey = (providerId: string) => {
    setProviderToClear(providerId);
  };

  const confirmClearApiKey = () => {
    if (providerToClear) {
      clearProviderApiKey(providerToClear);
      setApiKeyInputs((prev) => ({ ...prev, [providerToClear]: '' }));
      setValidationResults((prev) => ({ ...prev, [providerToClear]: null }));
      setProviderToClear(null);
    }
  };

  const handleTestApiKey = async (providerId: string) => {
    const apiKey = apiKeyInputs[providerId];
    if (!apiKey || !apiKey.trim()) {
      toast.warning('Please enter an API key first');
      return;
    }

    setValidating((prev) => ({ ...prev, [providerId]: true }));

    try {
      // Load provider SDK on-demand for validation
      const provider = await router.getProvider(providerId);
      if (!provider) {
        throw new Error('Provider not found');
      }

      const isValid = await provider.validateApiKey(apiKey);
      setValidationResults((prev) => ({ ...prev, [providerId]: isValid }));

      if (isValid) {
        toast.success('API key valid', `${providerStatus[providerId]?.name} is ready to use.`);
      } else {
        toast.error('API key invalid', `Please check your ${providerStatus[providerId]?.name} key.`);
      }
    } catch (error: unknown) {
      console.error('API key validation error:', error);
      setValidationResults((prev) => ({ ...prev, [providerId]: false }));
      const message = error instanceof Error ? error.message : 'Unknown error';
      toast.error('Validation error', message);
    } finally {
      setValidating((prev) => ({ ...prev, [providerId]: false }));
    }
  };

  const toggleShowApiKey = (providerId: string) => {
    setShowApiKeys((prev) => ({ ...prev, [providerId]: !prev[providerId] }));
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="AI Provider Settings"
        maxWidth="2xl"
      >
        <div className="space-y-3">
          {/* Header Description */}
          <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
            <p className="mb-1">
              Configure API keys for AI providers. Your keys are encrypted with AES-256-CBC and stored locally.
            </p>
            <p className="text-[10px]">
              <span className="text-accent-green">🟢 Free</span> models available
              {' • '}
              <span className="text-accent-blue">🔵 Paid</span> BYOK (Bring Your Own Key)
              {' • '}
              <span className="text-accent-yellow">⚠️</span> Requires backend proxy (CORS)
            </p>
          </div>

          {/* Provider List */}
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {Object.entries(providerMetadataList).map(([providerId, metadata]) => {
              const status = providerStatus[providerId];
              const isConfigured = status?.configured || false;

              return (
                <div
                  key={providerId}
                  className="p-3 bg-surface-light-elevated dark:bg-surface-dark-elevated border border-border-light dark:border-border-dark rounded-button"
                >
                  {/* Provider Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-2.5 flex-1">
                      {/* Provider Favicon */}
                      {metadata.websiteUrl && (
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${new URL(metadata.websiteUrl).hostname}&sz=32`}
                          alt=""
                          className="w-5 h-5 mt-0.5 rounded-sm flex-shrink-0"
                          onError={(e) => {
                            // Hide on error - fall back to no icon
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className="text-sm font-medium text-text-light-primary dark:text-text-dark-primary">
                          {metadata.displayName}
                        </h3>
                        {metadata.hasFreeModels && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-accent-green/10 text-accent-green rounded">
                            Free Models
                          </span>
                        )}
                        {!metadata.supportsCORS && metadata.requiresProxy && (
                          <span
                            className="text-[10px] px-1.5 py-0.5 bg-accent-yellow/10 text-accent-yellow rounded cursor-help"
                            title="This provider blocks direct browser requests (CORS). Use OpenRouter instead - it can access this provider's models and works directly in your browser."
                          >
                            ⚠️ Proxy Required
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                        {metadata.description}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2 text-[10px] text-text-light-secondary dark:text-text-dark-secondary">
                        <span>{status?.modelCount || 0} models</span>
                        {metadata.apiKeyUrl && (
                          <>
                            <span>•</span>
                            <a
                              href={metadata.apiKeyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-blue hover:text-accent-blue-hover"
                            >
                              Get API Key →
                            </a>
                          </>
                        )}
                        {metadata.docsUrl && (
                          <>
                            <span>•</span>
                            <a
                              href={metadata.docsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-blue hover:text-accent-blue-hover"
                            >
                              Documentation →
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-1.5">
                      {isConfigured ? (
                        <span className="text-[10px] px-1.5 py-0.5 bg-accent-green/10 text-accent-green rounded">
                          ✓ Configured
                        </span>
                      ) : (
                        <span className="text-[10px] px-1.5 py-0.5 bg-surface-light-elevated dark:bg-surface-dark-elevated text-text-light-secondary dark:text-text-dark-secondary rounded">
                          Not Configured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* API Key Input */}
                  <div className="space-y-1.5">
                    <div className="flex gap-1.5">
                      <div className="flex-1 relative">
                        <input
                          type={showApiKeys[providerId] ? 'text' : 'password'}
                          value={apiKeyInputs[providerId] || ''}
                          onChange={(e) =>
                            setApiKeyInputs((prev) => ({ ...prev, [providerId]: e.target.value }))
                          }
                          placeholder={
                            isConfigured
                              ? 'Enter new API key to replace existing'
                              : `Enter your ${metadata.apiKeyLabel || 'API key'}`
                          }
                          className="w-full px-2.5 py-1.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-button focus:outline-none focus:ring-2 focus:ring-accent-blue text-text-light-primary dark:text-text-dark-primary text-xs"
                          autoComplete="off"
                        />
                        <button
                          type="button"
                          onClick={() => toggleShowApiKey(providerId)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary text-[10px]"
                        >
                          {showApiKeys[providerId] ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleSaveApiKey(providerId)}
                        disabled={!apiKeyInputs[providerId]?.trim()}
                        className="px-2.5 py-1 bg-accent-blue hover:bg-accent-blue-hover disabled:bg-surface-light-elevated dark:disabled:bg-surface-dark-elevated disabled:text-text-light-tertiary dark:disabled:text-text-dark-tertiary disabled:cursor-not-allowed text-white rounded-button text-xs transition-all duration-standard ease-smooth"
                      >
                        {isConfigured ? 'Update' : 'Save'}
                      </button>

                      <button
                        onClick={() => handleTestApiKey(providerId)}
                        disabled={!apiKeyInputs[providerId]?.trim() || validating[providerId]}
                        className="px-2.5 py-1 bg-surface-light-elevated dark:bg-surface-dark-elevated hover:bg-surface-light dark:hover:bg-surface-dark disabled:opacity-50 disabled:cursor-not-allowed border border-border-light dark:border-border-dark rounded-button text-xs text-text-light-primary dark:text-text-dark-primary transition-all duration-standard ease-smooth"
                      >
                        {validating[providerId] ? 'Testing...' : 'Test Key'}
                      </button>

                      {isConfigured && (
                        <button
                          onClick={() => handleClearApiKey(providerId)}
                          className="px-2.5 py-1 bg-accent-red/10 hover:bg-accent-red/20 border border-accent-red/20 rounded-button text-xs text-accent-red transition-all duration-standard ease-smooth"
                        >
                          Remove
                        </button>
                      )}

                      {/* Validation Result */}
                      {validationResults[providerId] !== null && (
                        <span
                          className={`px-1.5 py-1 text-[10px] rounded-button ${
                            validationResults[providerId]
                              ? 'bg-accent-green/10 text-accent-green'
                              : 'bg-accent-red/10 text-accent-red'
                          }`}
                        >
                          {validationResults[providerId] ? '✓ Valid' : '✗ Invalid'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end pt-3 border-t border-border-light dark:border-border-dark">
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-accent-blue hover:bg-accent-blue-hover text-white rounded-button text-xs transition-all duration-standard ease-smooth"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>

      {/* Password Prompt Modal */}
      <PasswordPrompt
        isOpen={showPasswordPrompt}
        onSubmit={handlePasswordSubmit}
        onCancel={() => {
          setShowPasswordPrompt(false);
          setSelectedProvider(null);
        }}
        mode={passwordHash ? 'unlock' : 'setup'}
        existingPasswordHash={passwordHash || undefined}
      />

      {/* Confirm Clear API Key Dialog */}
      <ConfirmDialog
        isOpen={providerToClear !== null}
        onClose={() => setProviderToClear(null)}
        onConfirm={confirmClearApiKey}
        title="Remove API Key"
        message={providerToClear ? `Remove the API key for ${providerStatus[providerToClear]?.name || providerToClear}? You will need to re-enter it to use this provider.` : ''}
        confirmText="Remove"
        variant="danger"
      />
    </>
  );
}
