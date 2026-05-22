# Ikigai

A wellness and habit tracking app built on the four pillars of fulfillment: **Love**, **Skill**, **Wealth**, and **Needs**. Ikigai tracks your progress across these pillars with intelligent decay mechanics that reflect real-world habit patterns.

## Prerequisites

Before you start, ensure you have:
- Node.js and npm/Yarn installed
- [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) complete
- Access to the Ikigai backend API
- Android Studio (for Android) or Xcode (for iOS)

## Getting Started

### Step 1: Install Dependencies

```sh
# Install npm packages
npm install

# For iOS, install CocoaPods dependencies
cd ios
bundle install
bundle exec pod install
cd ..
```

### Step 2: Configure Environment

Create a `.env` file in the project root with the required configuration:

```env
API_BASE_URL=http://<YOUR_HOME_DEVICE_IP>:3000
DATABASE_URL=<YOUR_DATABASE_CONNECTION_STRING>
```

Replace:
- `<YOUR_HOME_DEVICE_IP>` with your home device's local IP address (e.g., `192.168.1.100`)
- `<YOUR_DATABASE_CONNECTION_STRING>` with your database connection string

> **Note**: If running the backend locally, use your machine's local IP (not `localhost`). Find it with `ipconfig` (Windows) or `ifconfig` (macOS/Linux).

### Step 3: Start the Backend

In a new terminal from the project root:

```sh
cd backend
npm run dev
```

The backend will start and listen for API requests. Ensure it's running before starting the frontend.

### Step 4: Start the Frontend

In another new terminal from the project root:

```sh
npx react-native start
```

This starts the development server and watches for changes.

### Step 5: Build and Run on Android or iOS

#### Android (USB Cable)

1. Connect your Android device via USB cable
2. Enable Developer Mode on your device:
   - Go to **Settings > About Phone**
   - Tap **Build Number** 7 times
   - Go to **Settings > Developer Options** and enable **USB Debugging**
3. Verify device is connected:
   ```sh
   adb devices
   ```
4. Build and run:
   ```sh
   npm run android
   ```

#### Android (Wireless Debugging)

1. Connect your device to the same WiFi as your computer
2. Enable Developer Mode and **Wireless Debugging**:
   - Go to **Settings > About Phone** and tap **Build Number** 7 times
   - Go to **Settings > Developer Options** and enable **Wireless Debugging**
3. On your device, tap **Wireless Debugging** and select **Pair with code**
4. On your computer, run:
   ```sh
   adb pair <IP_ADDRESS>:<PORT>
   ```
   (Use the IP and port shown on your device's pairing code screen)
5. Enter the pairing code from your device
6. Once paired, connect:
   ```sh
   adb connect <IP_ADDRESS>:<PORT>
   ```
   (Use the same IP and a different port shown in Wireless Debugging settings)
7. Verify connection:
   ```sh
   adb devices
   ```
8. Build and run:
   ```sh
   npm run android
   ```

#### iOS

1. **Cable Method**: Connect your iPhone via USB cable
2. **Wireless Method**: 
   - Connect via USB cable first
   - In Xcode: **Devices and Simulators > [Your Device] > Connect via Network**
   - Disconnect cable (device stays connected wirelessly)
3. Build and run:
   ```sh
   npm run ios
   ```

## Development

### Project Structure

```
.
├── src/
│   ├── components/       # React components
│   ├── screens/          # Navigation screens
│   ├── utils/            # Helper functions (decay, stats, pillar tracking)
│   ├── api/              # Backend API calls
│   └── types/            # TypeScript types
├── App.tsx              # Root component
└── package.json
```

### Key Utilities

The app includes utilities for:
- **Decay mechanics**: `calculateStats()` — exponential decay for pillar progress
- **Weekly tracking**: `processLineCompletions()` — aggregate completions by day
- **Pillar management**: `getPillarFrequencies()` — track pillar engagement

See `src/utils/stats.ts` and `src/utils/weekly.ts` for implementation details.

### Reloading Changes

To reload your app after code changes:
- **Android**: Press `R` twice in the terminal running the build, or shake your device and select **Reload**
- **iOS**: Press `Cmd+R` in the simulator

For a full clean rebuild, re-run the build command.

## Troubleshooting

### Backend Connection Issues

If the app can't connect to the backend:
1. Verify your home device IP is correct and reachable
2. Ensure the backend server is running on the configured port
3. Check firewall settings on your development machine
4. Test connectivity: `ping <YOUR_HOME_DEVICE_IP>`
5. Verify `API_BASE_URL` in `App.jsx` is set correctly

### Build Issues

#### Android

```sh
# Clear gradle cache and rebuild
cd android
./gradlew clean
cd ..
npm run android
```

#### iOS

```sh
# Clean Xcode build
cd ios
xcodebuild clean -workspace Ikigai.xcworkspace -scheme Ikigai
cd ..
npm run ios
```

### Device Connection

Ensure your device is connected and recognized:
- **Android**: `adb devices`
- **iOS**: Check Xcode's device selector

## Learn More

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting)
- [Ikigai Philosophy](https://en.wikipedia.org/wiki/Ikigai) — the intersection of passion, vocation, profession, and mission

## Support

For issues or questions, check the troubleshooting section above or consult the React Native docs.