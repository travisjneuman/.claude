# react-native: Testing

Part of the `react-native` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Testing

### Jest + React Native Testing Library

```tsx
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { LoginScreen } from "./LoginScreen";

describe("LoginScreen", () => {
  it("should login successfully", async () => {
    const onLogin = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen onLogin={onLogin} />,
    );

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });
});
```

---
