# Java/Kotlin Rules
Kotlin: prefer data classes, sealed classes, extension functions. Use `?.` and `?:` for null safety. Avoid `!!`.
Java: use records for DTOs (Java 16+), sealed interfaces (Java 17+), pattern matching (Java 21+).
Spring Boot: constructor injection over field injection. Use `@Transactional` at service layer. Validate DTOs with `@Valid`.
Coroutines (Kotlin): use `structured concurrency` with `coroutineScope`. Never use `GlobalScope`. Cancel via `Job`.
Testing: JUnit 5 with `@Nested` for structure. Kotlin: use `kotest` or `junit5` with `shouldBe` matchers.
