# C/C++ Rules
Modern C++: target C++17 minimum. Use `auto`, structured bindings, `std::optional`, `std::variant`.
Memory: RAII everywhere. `std::unique_ptr` for ownership, `std::shared_ptr` only when shared. Never raw `new`/`delete`.
Strings: `std::string_view` for read-only params, `std::string` for owned. Never `char*` for string manipulation.
Error handling: use `std::expected` (C++23) or return codes over exceptions in hot paths. Document noexcept.
Build: CMake with `target_*` commands. Use `FetchContent` for dependencies. Prefer static analysis (`clang-tidy`).
C: use `const` everywhere possible. Prefer `size_t` for sizes. Check all return codes. Use `static` for file-local functions.
