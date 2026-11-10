# ios-development: UIKit (Legacy/Complex UI)

Part of the `ios-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## UIKit (Legacy/Complex UI)

### View Controller Lifecycle

```swift
class MyViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        // About to appear
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        // Fully visible
    }
}
```

### Auto Layout

```swift
// Programmatic constraints
NSLayoutConstraint.activate([
    label.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 20),
    label.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
    label.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16)
])
```

---
