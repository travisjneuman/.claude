# flutter-development: Platform-Specific Code

Part of the `flutter-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Platform-Specific Code

```dart
import 'dart:io' show Platform;
import 'package:flutter/foundation.dart' show kIsWeb;

Widget build(BuildContext context) {
  if (kIsWeb) {
    return WebLayout();
  } else if (Platform.isIOS) {
    return CupertinoLayout();
  } else if (Platform.isAndroid) {
    return MaterialLayout();
  } else if (Platform.isMacOS || Platform.isWindows || Platform.isLinux) {
    return DesktopLayout();
  }
  return DefaultLayout();
}
```

---
