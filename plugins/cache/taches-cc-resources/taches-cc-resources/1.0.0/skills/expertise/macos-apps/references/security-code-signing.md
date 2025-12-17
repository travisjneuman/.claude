# Security & Code Signing

Secure coding, keychain, code signing, and notarization for macOS apps.

<keychain>
<save_retrieve>
```swift
import Security

class KeychainService {
    enum KeychainError: Error {
        case itemNotFound
        case duplicateItem
        case unexpectedStatus(OSStatus)
    }

    static let shared = KeychainService()
    private let service = Bundle.main.bundleIdentifier!

    // Save data
    func save(key: String, data: Data) throws {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: key,
            kSecValueData as String: data
        ]

        // Delete existing item first
        SecItemDelete(query as CFDictionary)

        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else {
            throw KeychainError.unexpectedStatus(status)
        }
    }

    // Retrieve data
    func load(key: String) throws -> Data {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: key,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]

        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)

        guard status == errSecSuccess else {
            if status == errSecItemNotFound {
                throw KeychainError.itemNotFound
            }
            throw KeychainError.unexpectedStatus(status)
        }

        guard let data = result as? Data else {
            throw KeychainError.itemNotFound
        }

        return data
    }

    // Delete item
    func delete(key: String) throws {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: key
        ]

        let status = SecItemDelete(query as CFDictionary)
        guard status == errSecSuccess || status == errSecItemNotFound else {
            throw KeychainError.unexpectedStatus(status)
        }
    }

    // Update existing item
    func update(key: String, data: Data) throws {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: key
        ]

        let attributes: [String: Any] = [
            kSecValueData as String: data
        ]

        let status = SecItemUpdate(query as CFDictionary, attributes as CFDictionary)
        guard status == errSecSuccess else {
            throw KeychainError.unexpectedStatus(status)
        }
    }
}

// Convenience methods for strings
extension KeychainService {
    func saveString(_ string: String, for key: String) throws {
        guard let data = string.data(using: .utf8) else { return }
        try save(key: key, data: data)
    }

    func loadString(for key: String) throws -> String {
        let data = try load(key: key)
        guard let string = String(data: data, encoding: .utf8) else {
            throw KeychainError.itemNotFound
        }
        return string
    }
}
```
</save_retrieve>

<keychain_access_groups>
Share keychain items between apps:

```swift
// In entitlements
/*
<key>keychain-access-groups</key>
<array>
    <string>$(AppIdentifierPrefix)com.yourcompany.shared</string>
</array>
*/

// When saving
let query: [String: Any] = [
    kSecClass as String: kSecClassGenericPassword,
    kSecAttrService as String: service,
    kSecAttrAccount as String: key,
    kSecAttrAccessGroup as String: "TEAMID.com.yourcompany.shared",
    kSecValueData as String: data
]
```
</keychain_access_groups>

<keychain_access_control>
```swift
// Require user presence (Touch ID / password)
func saveSecure(key: String, data: Data) throws {
    let access = SecAccessControlCreateWithFlags(
        nil,
        kSecAttrAccessibleWhenUnlockedThisDeviceOnly,
        .userPresence,
        nil
    )

    let query: [String: Any] = [
        kSecClass as String: kSecClassGenericPassword,
        kSecAttrService as String: service,
        kSecAttrAccount as String: key,
        kSecValueData as String: data,
        kSecAttrAccessControl as String: access as Any
    ]

    SecItemDelete(query as CFDictionary)
    let status = SecItemAdd(query as CFDictionary, nil)
    guard status == errSecSuccess else {
        throw KeychainError.unexpectedStatus(status)
    }
}
```
</keychain_access_control>
</keychain>

<secure_coding>
<input_validation>
```swift
// Validate user input
func validateUsername(_ username: String) throws -> String {
    // Check length
    guard username.count >= 3, username.count <= 50 else {
        throw ValidationError.invalidLength
    }

    // Check characters
    let allowed = CharacterSet.alphanumerics.union(CharacterSet(charactersIn: "_-"))
    guard username.unicodeScalars.allSatisfy({ allowed.contains($0) }) else {
        throw ValidationError.invalidCharacters
    }

    return username
}

// Sanitize for display
func sanitizeHTML(_ input: String) -> String {
    input
        .replacingOccurrences(of: "&", with: "&amp;")
        .replacingOccurrences(of: "<", with: "&lt;")
        .replacingOccurrences(of: ">", with: "&gt;")
        .replacingOccurrences(of: "\"", with: "&quot;")
        .replacingOccurrences(of: "'", with: "&#39;")
}
```
</input_validation>

<secure_random>
```swift
import Security

// Generate secure random bytes
func secureRandomBytes(count: Int) -> Data? {
    var bytes = [UInt8](repeating: 0, count: count)
    let result = SecRandomCopyBytes(kSecRandomDefault, count, &bytes)
    guard result == errSecSuccess else { return nil }
    return Data(bytes)
}

// Generate secure token
func generateToken(length: Int = 32) -> String? {
    guard let data = secureRandomBytes(count: length) else { return nil }
    return data.base64EncodedString()
}
```
</secure_random>

<cryptography>
```swift
import CryptoKit

// Hash data
func hash(_ data: Data) -> String {
    let digest = SHA256.hash(data: data)
    return digest.map { String(format: "%02x", $0) }.joined()
}

// Encrypt with symmetric key
func encrypt(_ data: Data, key: SymmetricKey) throws -> Data {
    try AES.GCM.seal(data, using: key).combined!
}

func decrypt(_ data: Data, key: SymmetricKey) throws -> Data {
    let box = try AES.GCM.SealedBox(combined: data)
    return try AES.GCM.open(box, using: key)
}

// Generate key from password
func deriveKey(from password: String, salt: Data) -> SymmetricKey {
    let passwordData = Data(password.utf8)
    let key = HKDF<SHA256>.deriveKey(
        inputKeyMaterial: SymmetricKey(data: passwordData),
        salt: salt,
        info: Data("MyApp".utf8),
        outputByteCount: 32
    )
    return key
}
```
</cryptography>

<secure_file_storage>
```swift
// Store sensitive files with data protection
func saveSecureFile(_ data: Data, to url: URL) throws {
    try data.write(to: url, options: [.atomic, .completeFileProtection])
}

// Read with security scope
func readSecureFile(at url: URL) throws -> Data {
    let accessing = url.startAccessingSecurityScopedResource()
    defer {
        if accessing {
            url.stopAccessingSecurityScopedResource()
        }
    }
    return try Data(contentsOf: url)
}
```
</secure_file_storage>
</secure_coding>

<app_sandbox>
<entitlements>
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <!-- Enable sandbox -->
    <key>com.apple.security.app-sandbox</key>
    <true/>

    <!-- Network -->
    <key>com.apple.security.network.client</key>
    <true/>
    <key>com.apple.security.network.server</key>
    <true/>

    <!-- File access -->
    <key>com.apple.security.files.user-selected.read-write</key>
    <true/>
    <key>com.apple.security.files.downloads.read-write</key>
    <true/>

    <!-- Hardware -->
    <key>com.apple.security.device.camera</key>
    <true/>
    <key>com.apple.security.device.audio-input</key>
    <true/>

    <!-- Inter-app -->
    <key>com.apple.security.automation.apple-events</key>
    <true/>

    <!-- Temporary exception (avoid if possible) -->
    <key>com.apple.security.temporary-exception.files.home-relative-path.read-write</key>
    <array>
        <string>/Library/Application Support/MyApp/</string>
    </array>
</dict>
</plist>
```
</entitlements>

<request_permission>
```swift
// Request camera permission
import AVFoundation

func requestCameraAccess() async -> Bool {
    await AVCaptureDevice.requestAccess(for: .video)
}

// Request microphone permission
func requestMicrophoneAccess() async -> Bool {
    await AVCaptureDevice.requestAccess(for: .audio)
}

// Check status
func checkCameraAuthorization() -> AVAuthorizationStatus {
    AVCaptureDevice.authorizationStatus(for: .video)
}
```
</request_permission>
</app_sandbox>

<code_signing>
<signing_identity>
```bash
# List available signing identities
security find-identity -v -p codesigning

# Sign app with Developer ID
codesign --force --options runtime \
    --sign "Developer ID Application: Your Name (TEAMID)" \
    --entitlements MyApp/MyApp.entitlements \
    MyApp.app

# Verify signature
codesign --verify --verbose=4 MyApp.app

# Display signature info
codesign -dv --verbose=4 MyApp.app

# Show entitlements
codesign -d --entitlements - MyApp.app
```
</signing_identity>

<hardened_runtime>
```xml
<!-- Required for notarization -->
<!-- Hardened runtime entitlements -->

<!-- Allow JIT (for JavaScript engines) -->
<key>com.apple.security.cs.allow-jit</key>
<true/>

<!-- Allow unsigned executable memory (rare) -->
<key>com.apple.security.cs.allow-unsigned-executable-memory</key>
<true/>

<!-- Disable library validation (for plugins) -->
<key>com.apple.security.cs.disable-library-validation</key>
<true/>

<!-- Allow DYLD environment variables -->
<key>com.apple.security.cs.allow-dyld-environment-variables</key>
<true/>
```
</hardened_runtime>
</code_signing>

<notarization>
<notarize_app>
```bash
# Create ZIP for notarization
ditto -c -k --keepParent MyApp.app MyApp.zip

# Submit for notarization
xcrun notarytool submit MyApp.zip \
    --apple-id your@email.com \
    --team-id YOURTEAMID \
    --password @keychain:AC_PASSWORD \
    --wait

# Check status
xcrun notarytool info <submission-id> \
    --apple-id your@email.com \
    --team-id YOURTEAMID \
    --password @keychain:AC_PASSWORD

# View log
xcrun notarytool log <submission-id> \
    --apple-id your@email.com \
    --team-id YOURTEAMID \
    --password @keychain:AC_PASSWORD

# Staple ticket
xcrun stapler staple MyApp.app

# Verify notarization
spctl --assess --verbose=4 --type execute MyApp.app
```
</notarize_app>

<store_credentials>
```bash
# Store notarization credentials in keychain
xcrun notarytool store-credentials "AC_PASSWORD" \
    --apple-id your@email.com \
    --team-id YOURTEAMID \
    --password <app-specific-password>

# Use stored credentials
xcrun notarytool submit MyApp.zip \
    --keychain-profile "AC_PASSWORD" \
    --wait
```
</store_credentials>

<dmg_notarization>
```bash
# Create DMG
hdiutil create -volname "MyApp" -srcfolder MyApp.app -ov -format UDZO MyApp.dmg

# Sign DMG
codesign --force --sign "Developer ID Application: Your Name (TEAMID)" MyApp.dmg

# Notarize DMG
xcrun notarytool submit MyApp.dmg \
    --keychain-profile "AC_PASSWORD" \
    --wait

# Staple DMG
xcrun stapler staple MyApp.dmg
```
</dmg_notarization>
</notarization>

<transport_security>
```swift
// HTTPS only (default in iOS 9+ / macOS 10.11+)
// Add exceptions in Info.plist if needed

/*
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSExceptionDomains</key>
    <dict>
        <key>localhost</key>
        <dict>
            <key>NSExceptionAllowsInsecureHTTPLoads</key>
            <true/>
        </dict>
    </dict>
</dict>
*/

// Certificate pinning
class PinnedSessionDelegate: NSObject, URLSessionDelegate {
    let pinnedCertificates: [Data]

    init(certificates: [Data]) {
        self.pinnedCertificates = certificates
    }

    func urlSession(
        _ session: URLSession,
        didReceive challenge: URLAuthenticationChallenge,
        completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void
    ) {
        guard challenge.protectionSpace.authenticationMethod == NSURLAuthenticationMethodServerTrust,
              let serverTrust = challenge.protectionSpace.serverTrust,
              let certificate = SecTrustGetCertificateAtIndex(serverTrust, 0) else {
            completionHandler(.cancelAuthenticationChallenge, nil)
            return
        }

        let serverCertData = SecCertificateCopyData(certificate) as Data

        if pinnedCertificates.contains(serverCertData) {
            completionHandler(.useCredential, URLCredential(trust: serverTrust))
        } else {
            completionHandler(.cancelAuthenticationChallenge, nil)
        }
    }
}
```
</transport_security>

<best_practices>
<security_checklist>
- Store secrets in Keychain, never in UserDefaults or files
- Use App Transport Security (HTTPS only)
- Validate all user input
- Use secure random for tokens/keys
- Enable hardened runtime
- Sign and notarize for distribution
- Request only necessary entitlements
- Clear sensitive data from memory when done
</security_checklist>

<common_mistakes>
- Storing API keys in code (use Keychain or secure config)
- Logging sensitive data
- Using `print()` for sensitive values in production
- Not validating server certificates
- Weak password hashing (use bcrypt/scrypt/Argon2)
- Storing passwords instead of hashes
</common_mistakes>
</best_practices>
