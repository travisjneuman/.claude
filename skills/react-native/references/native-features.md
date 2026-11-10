# react-native: Native Features

Part of the `react-native` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Native Features

### Camera (Expo)

```tsx
import { Camera, CameraType } from "expo-camera";

function CameraScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri);
    }
  };

  if (!permission?.granted) {
    return <Button title="Grant Permission" onPress={requestPermission} />;
  }

  return (
    <Camera ref={cameraRef} style={styles.camera} type={CameraType.back}>
      <TouchableOpacity onPress={takePicture}>
        <Text>Take Photo</Text>
      </TouchableOpacity>
    </Camera>
  );
}
```

### Push Notifications (Expo)

```tsx
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotifications() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") return;

  const token = await Notifications.getExpoPushTokenAsync();
  return token.data;
}

// Listen for notifications
useEffect(() => {
  const subscription = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log(notification);
    },
  );
  return () => subscription.remove();
}, []);
```

### Location

```tsx
import * as Location from "expo-location";

async function getLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") return;

  const location = await Location.getCurrentPositionAsync({});
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}
```

---
