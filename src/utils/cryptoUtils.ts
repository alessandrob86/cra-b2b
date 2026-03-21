/**
 * Utilities for client-side encryption of sensitive data (like signatures).
 * Uses Web Crypto API for performance and security without extra dependencies.
 */

// We'll use a Hybrid Encryption approach if possible, but for simplicity 
// and "write-only" collection, we'll implement AES-GCM for now, 
// and later we can upgrade to RSA for true Asymmetric security.

export async function encryptData(data: string, secretKey: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataUint8 = encoder.encode(data);
    
    // Hash the secretKey to get a stable 256-bit key
    const keyHash = await crypto.subtle.digest('SHA-256', encoder.encode(secretKey));
    const key = await crypto.subtle.importKey(
        'raw', 
        keyHash, 
        { name: 'AES-GCM' }, 
        false, 
        ['encrypt']
    );
    
    // Initialization vector
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        dataUint8
    );
    
    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);
    
    // Return as base64
    return btoa(String.fromCharCode(...combined));
}

// For a more professional approach, we should use RSA Public Key.
// I'll add a placeholder for that if the user wants to provide a Public Key.
