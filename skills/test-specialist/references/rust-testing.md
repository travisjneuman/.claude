# test-specialist: Rust Testing

Part of the `test-specialist` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Rust Testing

### Unit and Integration Tests

```rust
// src/lib.rs - Unit tests (same file)
pub fn calculate_discount(amount: f64, percentage: f64) -> Result<f64, DiscountError> {
    if percentage < 0.0 || percentage > 100.0 {
        return Err(DiscountError::InvalidPercentage(percentage));
    }
    Ok(amount * (1.0 - percentage / 100.0))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_valid_discount() {
        let result = calculate_discount(100.0, 10.0).unwrap();
        assert!((result - 90.0).abs() < f64::EPSILON);
    }

    #[test]
    fn test_zero_discount() {
        assert_eq!(calculate_discount(100.0, 0.0).unwrap(), 100.0);
    }

    #[test]
    fn test_invalid_percentage() {
        assert!(matches!(
            calculate_discount(100.0, 150.0),
            Err(DiscountError::InvalidPercentage(_))
        ));
    }

    #[test]
    fn test_negative_percentage() {
        assert!(calculate_discount(100.0, -10.0).is_err());
    }
}

// tests/integration_test.rs - Integration tests (separate file)
use my_crate::calculate_discount;

#[test]
fn test_full_workflow() {
    let original = 200.0;
    let discounted = calculate_discount(original, 25.0).unwrap();
    assert_eq!(discounted, 150.0);
}
```

### Property-Based Testing (proptest)

```rust
use proptest::prelude::*;

proptest! {
    #[test]
    fn discount_never_exceeds_original(amount in 0.0f64..10000.0, pct in 0.0f64..100.0) {
        let result = calculate_discount(amount, pct).unwrap();
        prop_assert!(result <= amount);
        prop_assert!(result >= 0.0);
    }

    #[test]
    fn roundtrip_serialization(name in "[a-zA-Z]{1,50}", age in 0u32..150) {
        let user = User { name: name.clone(), age };
        let json = serde_json::to_string(&user).unwrap();
        let deserialized: User = serde_json::from_str(&json).unwrap();
        prop_assert_eq!(user, deserialized);
    }
}
```

---
