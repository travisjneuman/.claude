/**
 * Encryption Service for API Keys
 * Uses WebCrypto API for AES-256-GCM encryption with PBKDF2 key derivation
 * Provides secure, password-based encryption for sensitive data
 *
 * MIGRATION NOTE: This file now uses WebCrypto API instead of crypto-js
 * - All functions are now async (use await)
 * - Provides backward compatibility for old crypto-js encrypted data
 */

import * as WebCrypto from './encryptionWebCrypto';
import CryptoJS from 'crypto-js'; // Keep for backward compatibility with old encrypted data

/**
 * Encryption configuration constants
 */
const ENCRYPTION_CONFIG = {
  iterations: 100000, // PBKDF2 iterations (100k recommended minimum)
  keySize: 256 / 32, // 256-bit key
  algorithm: 'AES',
};

/**
 * Encrypted data structure
 */
export interface EncryptedData {
  ciphertext: string;
  salt: string;
  iv: string;
  version?: 'crypto-js' | 'webcrypto'; // Track encryption method for migration
  pbkdf2Version?: number; // PBKDF2 iteration version (1=100k, 2=600k)
}

/**
 * Derive encryption key from password using PBKDF2 (crypto-js - for backward compatibility)
 * @param password - User's encryption password
 * @param salt - Salt for key derivation
 * @returns Derived encryption key
 */
function deriveKey(password: string, salt: string): CryptoJS.lib.WordArray {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: ENCRYPTION_CONFIG.keySize,
    iterations: ENCRYPTION_CONFIG.iterations,
  });
}

/**
 * Encrypt plaintext using AES-256-GCM (WebCrypto API)
 * @param plaintext - Data to encrypt (e.g., API key)
 * @param password - User's encryption password
 * @returns Encrypted data with salt and IV
 */
export async function encrypt(plaintext: string, password: string): Promise<EncryptedData> {
  const encrypted = await WebCrypto.encrypt(plaintext, password);
  return {
    ciphertext: encrypted.ciphertext,
    salt: encrypted.salt,
    iv: encrypted.iv,
    version: 'webcrypto', // Mark as WebCrypto encrypted (vs crypto-js)
    pbkdf2Version: encrypted.version, // PBKDF2 iteration version (2 = 600k iterations)
  };
}

/**
 * Decrypt ciphertext using AES-256-GCM (WebCrypto) or AES-256-CBC (crypto-js for backward compatibility)
 * @param encryptedData - Encrypted data with salt and IV
 * @param password - User's encryption password
 * @returns Decrypted plaintext
 * @throws Error if decryption fails (wrong password or corrupted data)
 */
export async function decrypt(encryptedData: EncryptedData, password: string): Promise<string> {
  if (!encryptedData || !password) {
    throw new Error('Encrypted data and password are required for decryption');
  }

  const { ciphertext, salt, iv, version, pbkdf2Version } = encryptedData;

  if (!ciphertext || !salt || !iv) {
    throw new Error('Invalid encrypted data structure');
  }

  // If encrypted with WebCrypto, use WebCrypto to decrypt
  if (version === 'webcrypto') {
    // Pass the PBKDF2 version for correct key derivation iterations
    // Default to v2 (600k iterations) for webcrypto without explicit pbkdf2Version
    // since all webcrypto encryptions use the current ENCRYPTION_CONFIG.version
    return WebCrypto.decrypt({
      ciphertext,
      salt,
      iv,
      version: pbkdf2Version ?? 2, // Default to v2 for webcrypto
    }, password);
  }

  // Otherwise, assume old crypto-js format (backward compatibility)
  try {
    // Derive the same encryption key from password and salt
    const key = deriveKey(password, salt);

    // Decrypt using AES-256-CBC (crypto-js)
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
      iv: CryptoJS.enc.Hex.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Convert decrypted WordArray to UTF-8 string
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

    if (!plaintext) {
      throw new Error('Decryption failed - invalid password or corrupted data');
    }

    return plaintext;
  } catch (error) {
    throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Object with validation result and message
 */
export function validatePassword(password: string): { valid: boolean; message: string } {
  if (!password || password.length < 8) {
    return {
      valid: false,
      message: 'Password must be at least 8 characters long',
    };
  }

  if (password.length > 128) {
    return {
      valid: false,
      message: 'Password must be less than 128 characters',
    };
  }

  // Check for at least one number, one letter
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);

  if (!hasNumber || !hasLetter) {
    return {
      valid: false,
      message: 'Password must contain at least one letter and one number',
    };
  }

  return {
    valid: true,
    message: 'Password is strong',
  };
}

/**
 * Hash password for verification (not for encryption key derivation)
 * Used to verify password without decrypting data
 * @param password - Password to hash
 * @returns Password hash
 */
export async function hashPassword(password: string): Promise<string> {
  return WebCrypto.hashPassword(password);
}

/**
 * Verify password against stored hash
 * @param password - Password to verify
 * @param hash - Stored password hash
 * @returns True if password matches hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return WebCrypto.verifyPassword(password, hash);
}

/**
 * Calculate password expiry date
 * @param duration - 'daily' | 'weekly' | 'monthly'
 * @returns Date when password should expire
 */
export function calculatePasswordExpiry(duration: 'daily' | 'weekly' | 'monthly'): Date {
  const now = new Date();

  switch (duration) {
    case 'daily':
      now.setDate(now.getDate() + 1);
      break;
    case 'weekly':
      now.setDate(now.getDate() + 7);
      break;
    case 'monthly':
      now.setMonth(now.getMonth() + 1);
      break;
    default:
      now.setDate(now.getDate() + 7); // Default to weekly
  }

  return now;
}

/**
 * Check if password has expired
 * @param expiryDate - Password expiry date
 * @returns True if password has expired
 */
export function isPasswordExpired(expiryDate: Date | null): boolean {
  if (!expiryDate) return true;
  return new Date() > new Date(expiryDate);
}
