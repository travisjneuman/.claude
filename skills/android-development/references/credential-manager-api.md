# android-development: Credential Manager API

Part of the `android-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Credential Manager API

```kotlin
// Modern sign-in replacing legacy APIs
val credentialManager = CredentialManager.create(context)

// Sign in with passkeys, passwords, or federated identity
suspend fun signIn() {
    val request = GetCredentialRequest(listOf(
        GetPasswordOption(),
        GetPublicKeyCredentialOption(requestJson = passkeyRequestJson),
        GetGoogleIdOption(serverClientId = WEB_CLIENT_ID),
    ))

    try {
        val result = credentialManager.getCredential(context, request)
        handleSignIn(result)
    } catch (e: GetCredentialException) {
        handleSignInError(e)
    }
}

// Create a passkey
suspend fun createPasskey() {
    val request = CreatePublicKeyCredentialRequest(
        requestJson = createPasskeyRequestJson
    )
    val result = credentialManager.createCredential(context, request)
    handlePasskeyCreation(result)
}
```
