Ikigai
A wellness and habit tracking app built on the four pillars of fulfillment: Love, Skill, Wealth, and Needs. Ikigai tracks your progress across these pillars with intelligent decay mechanics that reflect real-world habit patterns.


#Prerequisites
Before you start, ensure you have the following installed and configured:

#Required Core Tools
Node.js (v22.11.0 or higher)

npm (v10 or higher, included with Node.js)

Git

Ruby (v2.6.10 or higher, required for iOS CocoaPods)

#Platform-Specific Requirements
For Android Development
Android Studio

Android SDK (API 30 and above recommended)

Java Development Kit (JDK) (v11 or v17 recommended, included with Android Studio)

Gradle (installed with Android Studio)

#For iOS Development
Xcode (v14 or higher)

CocoaPods (Ruby gem, installed automatically via Bundler)

macOS (10.14 or higher)

#Backend Requirements
PostgreSQL (v12 or higher) — Required for the GraphQL backend API. Ensure the PostgreSQL server is running before starting the backend.

nodemon (optional but recommended for development)

Recommended Tools
Visual Studio Code (or your preferred code editor)

adb (Android Debug Bridge) — included with Android Studio

Watchman (for file watching, especially on macOS)

#Setup and Installation
Step 1: Clone the Repository
Bash
git clone <repository-url>
cd ikigai
Step 2: Install Frontend Dependencies
Bash
npm install
This installs all Node.js dependencies for the React Native frontend.

Step 3: Install iOS Dependencies (macOS only)
Bash
cd ios
bundle install
bundle exec pod install
cd ..
This installs Ruby gems and CocoaPods required for iOS native builds.

Step 4: Install Backend Dependencies
Bash
cd backend
npm install
cd ..
Step 5: Configure Environment Variables
Create a .env file in the project root with the following configuration:

Code snippet
# Backend API configuration
API_BASE_URL=http://<YOUR_LOCAL_IP>:4000

# Database configuration (backend only)
DATABASE_URL=postgresql://username:password@localhost:5432/ikigai
NODE_ENV=development
Configuration Details:

<YOUR_LOCAL_IP>: Your machine's local network IP address.

Windows: ipconfig (look for "IPv4 Address")

macOS/Linux: ifconfig (look for "inet" address)

⚠️ Do NOT use localhost or 127.0.0.1 — the physical mobile device needs to access the server via your shared network.

DATABASE_URL: PostgreSQL connection string.

Format: postgresql://[username]:[password]@[host]:[port]/[database]

Create the database manually if needed: psql -U postgres -c "CREATE DATABASE ikigai;"

Step 6: Set Up the Database
Initialize the PostgreSQL database with Prisma migrations:

Bash
npm run migrate
This runs all pending database migrations and provisions your schema.

Step 7: Verify Your Setup
Bash
# Check Node.js version (should be >= 22.11.0)
node --version

# Check npm version (should be >= 10.0.0)
npm --version

# Check PostgreSQL connection
psql -U postgres -c "SELECT 1;"

# Test build configuration
npm run lint
npm test
Running the Application
Option 1: Quick Start (Development Mode)
Terminal 1: Start PostgreSQL Server
Bash
# macOS with Homebrew
brew services start postgresql

# Windows
# Run via Services App (Typically starts automatically)

# Linux with systemd
sudo systemctl start postgresql
Terminal 2: Start the Backend API
Bash
cd backend
npm run dev
Expected output:

🚀 Apollo Server ready at http://localhost:4000/

Prisma is connected to the database

Terminal 3: Start the Metro Bundler
Bash
npm start
# Or explicitly:
npx react-native start
Terminal 4: Run on Your Device
Running on Android (USB Cable)
Connect your Android device via USB.

Enable Developer Mode and USB Debugging via Settings > About Phone > Tap "Build Number" 7 times, then allow USB debugging under Developer Options.

Run the following:

Bash
npm run devices
npm run android
Running on Android (Wireless Debugging)
Enable Wireless Debugging in your phone's Developer Options.

Pair your device:

Bash
npm run reconnect
Follow the on-screen prompts to complete pairing, then run:

Bash
npm run android
Running on iOS
Bash
# For Simulator
npm run ios

# For Physical iOS Device
# Connect phone via USB, open Xcode, select your target device from the header dropdown, then run:
npm run ios
Option 2: Using PowerShell Scripts (Windows)
Bash
npm run rebuild    # Rebuild and run everything
npm run android    # Setup and run Android build
npm run devices    # Check connected devices
npm run reconnect  # Reconnect wireless ADB
Verifying the Application is Running
Once paths are configured, confirm the following indicators:

✅ Metro bundler terminal shows: Ready to accept connections

✅ Backend terminal shows: 🚀 Apollo Server ready at http://localhost:4000/

✅ App interface launches successfully on your device/emulator.

If the app fails to resolve network connectivity:

Verify API_BASE_URL in .env accurately matches your local IP address.

Test device connectivity using: ping <YOUR_LOCAL_IP>

Project Architecture
Directory Structure
.
├── src/
│   ├── components/       # Reusable React UI elements
│   ├── screens/          # Navigation stack views (Home, Habits, etc.)
│   ├── utils/            # Decay, statistics, and pillar metrics logic
│   ├── api/              # GraphQL operations and setups
│   └── types/            # TypeScript type definitions
├── backend/
│   ├── index.js          # Apollo Server entry point
│   ├── prisma/
│   │   ├── schema.prisma # Core database relational schema
│   │   └── migrations/   # Automated SQL tracking states
│   └── package.json
├── android/              # Native Android project configuration
├── ios/                  # Native iOS project configuration
├── App.jsx               # Root Application entry component
├── package.json          # Root dependencies tier
├── tsconfig.json         # TypeScript compiler configurations
└── .env                  # Infrastructure environment targets (Secret)
Key Utilities
Decay Mechanics (calculateStats()): Mathematical exponential decay variables acting on pillar values.

Weekly Tracking (processLineCompletions()): Timeline bucket aggregations by weekday.

Pillar Management (getPillarFrequencies()): Engagement frequency matrix computations.

Troubleshooting
General Issues
Bash
# Kill process using port 4000 (Backend)
lsof -ti:4000 | xargs kill -9               # macOS/Linux
# Windows: netstat -ano | findstr :4000 -> taskkill /PID <PID> /F

# Kill process using port 8081 (Metro Bundler)
lsof -ti:8081 | xargs kill -9               # macOS/Linux

# Clear node_modules and clean reinstalls
rm -rf node_modules package-lock.json       # macOS/Linux
# Windows: rmdir /s node_modules
npm install

# Reset Metro Bundler cache
npm start -- --reset-cache
Database Connection Issues
Bash
# Verify connection availability
psql -U postgres -c "SELECT 1;"

# Generate Prisma Client fresh
npx prisma generate

# Reset database (⚠️ Warning: Destructive command)
npx prisma migrate reset
Build and Compilation Issues
Bash
# Android deep clean
cd android && ./gradlew clean && cd ..
npm run android

# iOS deep clean
cd ios
xcodebuild clean -workspace Ikigai.xcworkspace -scheme Ikigai
rm -rf Pods Podfile.lock
bundle exec pod install
cd ..
npm run ios
