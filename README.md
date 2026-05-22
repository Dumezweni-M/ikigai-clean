Ikigai
A wellness and habit tracking app built on the four pillars of fulfillment: Love, Skill, Wealth, and Needs. Ikigai tracks your progress across these pillars with intelligent decay mechanics that reflect real-world habit patterns.

Prerequisites
Before you start, ensure you have the following installed and configured: ### Required - Node.js (v22.11.0 or higher) — Download - npm (v10 or higher, included with Node.js) - Git — Download - Ruby (v2.6.10 or higher, required for iOS CocoaPods) — Download ### Platform-Specific Requirements #### For Android Development - Android Studio — Download - Android SDK (API 30 and above recommended) - Java Development Kit (JDK) (v11 or v17 recommended, included with Android Studio) - Gradle (installed with Android Studio) #### For iOS Development - Xcode (v14 or higher) — Download from App Store - CocoaPods (Ruby gem, installed automatically with bundle install) - macOS (10.14 or higher) ### Backend Requirements - PostgreSQL (v12 or higher) — Download - Required for the GraphQL backend API - Ensure PostgreSQL server is running before starting the backend - nodemon (optional but recommended for development) — installed automatically with npm install ### Recommended Tools - Visual Studio Code or your preferred code editor - adb (Android Debug Bridge) — included with Android Studio - Watchman (for file watching, especially on macOS) — Installation guide ## Setup and Installation ### Step 1: Clone the Repository sh <span data-diff-end="36"></span> <span data-diff-start="37"></span>git clone <repository-url> <span data-diff-end="37"></span> <span data-diff-start="38"></span>cd ikigai <span data-diff-end="38"></span> <span data-diff-start="39"></span> ### Step 2: Install Frontend Dependencies

npm install
<span data-diff-start="42"></span>```
<span data-diff-end="42"></span>
<span data-diff-start="43"></span>
<span data-diff-end="43"></span>
<span data-diff-start="44"></span>This<span data-diff-end="44"></span> install<span data-diff-start="45"></span>s all Node.js<span data-diff-end="45"></span> dependencies<span data-diff-start="46"></span> for the React Native frontend.
<span data-diff-end="46"></span>
<span data-diff-start="47"></span>
<span data-diff-end="47"></span>
<span data-diff-start="48"></span>### Step 3: Install iOS Dependencies (macOS only)
<span data-diff-end="48"></span>
<span data-diff-start="49"></span>
<span data-diff-end="49"></span>
<span data-diff-start="50"></span>If developing for iOS:
<span data-diff-end="50"></span>
<span data-diff-start="51"></span>
<span data-diff-end="51"></span>
<span data-diff-start="52"></span>```sh
<span data-diff-end="52"></span>
cd ios
bundle install
bundle exec pod install
cd ..
This installs Ruby gems (CocoaPods) required for iOS builds. ### Step 4: Install Backend Dependencies sh <span data-diff-end="57"></span> <span data-diff-start="58"></span>cd backend <span data-diff-end="58"></span> <span data-diff-start="59"></span>npm install <span data-diff-end="59"></span> <span data-diff-start="60"></span>cd .. <span data-diff-end="60"></span> <span data-diff-start="61"></span>

Step 5: Configure Environment Variables
Create a .env file in the project root with the following configuration:

<span data-diff-start="68"></span># Backend API configuration
<span data-diff-end="68"></span>
API_BASE_URL=http://<YOUR_<span data-diff-start="69"></span>LOCAL_IP>:4000
<span data-diff-end="69"></span>
<span data-diff-start="70"></span>
<span data-diff-end="70"></span>
<span data-diff-start="71"></span># Database configuration (backend only)
<span data-diff-end="71"></span>
<span data-diff-start="72"></span>DATABASE_URL=postgresql://username:password@localhost:5432/ikigai
<span data-diff-end="72"></span>
<span data-diff-start="73"></span>NODE_ENV=development
<span data-diff-end="73"></span>
<span data-diff-start="74"></span>```
<span data-diff-end="74"></span>
<span data-diff-start="75"></span>
<span data-diff-end="75"></span>
<span data-diff-start="76"></span>**Configuration Details:**
<span data-diff-end="76"></span>
<span data-diff-start="77"></span>
<span data-diff-end="77"></span>
<span data-diff-start="78"></span>- **`<YOUR_LOCAL_IP>`**: Your machine's local network IP address
<span data-diff-end="78"></span>
<span data-diff-start="79"></span>  - Find it with:
<span data-diff-end="79"></span>
<span data-diff-start="80"></span>    - **Windows**: `ipconfig` (look for "IPv4 Address")
<span data-diff-end="80"></span>
<span data-diff-start="81"></span>    - **macOS/Linux**: `ifconfig` (look for "inet" address)
<span data-diff-end="81"></span>
<span data-diff-start="82"></span>  - Example: `192.168.1.100`
<span data-diff-end="82"></span>
<span data-diff-start="83"></span>  - ⚠️ **Do NOT use `localhost` or `127.0.0.1`** — the mobile app needs to access from another device
<span data-diff-end="83"></span>
<span data-diff-start="84"></span>
<span data-diff-end="84"></span>
<span data-diff-start="85"></span>- **`DATABASE_URL`**: PostgreSQL connection string
<span data-diff-end="85"></span>
<span data-diff-start="86"></span>  - Format: `postgresql://[username]:[password]@[host]:[port]/[database]`
<span data-diff-end="86"></span>
<span data-diff-start="87"></span>  - Ensure PostgreSQL is running and the database exists
<span data-diff-end="87"></span>
<span data-diff-start="88"></span>  - Create the database if needed: `psql -U postgres -c "CREATE DATABASE ikigai;"`
<span data-diff-end="88"></span>
<span data-diff-start="89"></span>
<span data-diff-end="89"></span>
<span data-diff-start="90"></span>### Step 6: Set Up the Database
<span data-diff-end="90"></span>
<span data-diff-start="91"></span>
<span data-diff-end="91"></span>
<span data-diff-start="92"></span>Initialize the PostgreSQL database with Prisma migrations:
<span data-diff-end="92"></span>
<span data-diff-start="93"></span>
<span data-diff-end="93"></span>
<span data-diff-start="94"></span>```sh
<span data-diff-end="94"></span>
<span data-diff-start="95"></span>npm run migrate
<span data-diff-end="95"></span>
<span data-diff-start="96"></span>```
<span data-diff-end="96"></span>
<span data-diff-start="97"></span>
<span data-diff-end="97"></span>
<span data-diff-start="98"></span>This runs all pending database migrations and sets up the schema.
<span data-diff-end="98"></span>
<span data-diff-start="99"></span>
<span data-diff-end="99"></span>
<span data-diff-start="100"></span>### Step 7: Verify Your Setup
<span data-diff-end="100"></span>
<span data-diff-start="101"></span>
<span data-diff-end="101"></span>
<span data-diff-start="102"></span>Confirm everything is working before proceeding:
<span data-diff-end="102"></span>
<span data-diff-start="103"></span>
<span data-diff-end="103"></span>
<span data-diff-start="104"></span>```sh
<span data-diff-end="104"></span>
<span data-diff-start="105"></span># Check Node.js version (should be >= 22.11.0)
<span data-diff-end="105"></span>
<span data-diff-start="106"></span>node --version
<span data-diff-end="106"></span>
<span data-diff-start="107"></span>
<span data-diff-end="107"></span>
<span data-diff-start="108"></span># Check npm version (should be >= 10.0.0)
<span data-diff-end="108"></span>
<span data-diff-start="109"></span>npm --version
<span data-diff-end="109"></span>
<span data-diff-start="110"></span>
<span data-diff-end="110"></span>
<span data-diff-start="111"></span># Check PostgreSQL connection (if applicable)
<span data-diff-end="111"></span>
<span data-diff-start="112"></span>psql -U postgres -c "SELECT 1;"
<span data-diff-end="112"></span>
<span data-diff-start="113"></span>
<span data-diff-end="113"></span>
<span data-diff-start="114"></span># Test build configuration
<span data-diff-end="114"></span>
<span data-diff-start="115"></span>npm run lint
<span data-diff-end="115"></span>
<span data-diff-start="116"></span>npm test
<span data-diff-end="116"></span>
<span data-diff-start="117"></span>```
<span data-diff-end="117"></span>
<span data-diff-start="118"></span>
<span data-diff-end="118"></span>
<span data-diff-start="119"></span>## Running the Application
<span data-diff-end="119"></span>
<span data-diff-start="120"></span>
<span data-diff-end="120"></span>
<span data-diff-start="121"></span>### Option 1: Quick Start (Development Mode)
<span data-diff-end="121"></span>
<span data-diff-start="122"></span>
<span data-diff-end="122"></span>
<span data-diff-start="123"></span>This is the recommended approach for local development.
<span data-diff-end="123"></span>
<span data-diff-start="124"></span>
<span data-diff-end="124"></span>
<span data-diff-start="125"></span>#### Terminal 1: Start PostgreSQL Server
<span data-diff-end="125"></span>
<span data-diff-start="126"></span>
<span data-diff-end="126"></span>
<span data-diff-start="127"></span>Ensure PostgreSQL is running:
<span data-diff-end="127"></span>
<span data-diff-start="128"></span>
<span data-diff-end="128"></span>
<span data-diff-start="129"></span>```sh
<span data-diff-end="129"></span>
<span data-diff-start="130"></span># macOS with Homebrew
<span data-diff-end="130"></span>
<span data-diff-start="131"></span>brew services start postgresql
<span data-diff-end="131"></span>
<span data-diff-start="132"></span>
<span data-diff-end="132"></span>
<span data-diff-start="133"></span># Windows (if installed as service)
<span data-diff-end="133"></span>
<span data-diff-start="134"></span># PostgreSQL should be running automatically, or start it from Services
<span data-diff-end="134"></span>
<span data-diff-start="135"></span>
<span data-diff-end="135"></span>
<span data-diff-start="136"></span># Linux with systemd
<span data-diff-end="136"></span>
<span data-diff-start="137"></span>sudo systemctl start postgresql
<span data-diff-end="137"></span>
<span data-diff-start="138"></span>```
<span data-diff-end="138"></span>
<span data-diff-start="139"></span>
<span data-diff-end="139"></span>
<span data-diff-start="140"></span>#### Terminal 2: Start the Backend API
<span data-diff-end="140"></span>

```sh
cd backend
npm run dev
Expected output: <span data-diff-end="142"></span> <span data-diff-start="143"></span>🚀 Apollo Server ready at http://localhost:4000/ <span data-diff-end="143"></span> <span data-diff-start="144"></span>Prisma is connected to the database <span data-diff-end="144"></span> <span data-diff-start="145"></span> The GraphQL API is now available at http://localhost:4000/. #### Terminal 3: Start the Metro Bundler In a new terminal from the project root: sh <span data-diff-end="153"></span> <span data-diff-start="154"></span>npm start <span data-diff-end="154"></span> <span data-diff-start="155"></span> Or explicitly:

npx react-native start
This starts the Metro bundler and watches for code changes. Keep this terminal open during development. #### Terminal 4: Run on Your Device

#### Running on Android

Using USB Cable:

Connect your Android device via USB cable
Enable Developer Mode and USB Debugging: <span data-diff-end="167"></span> <span data-diff-start="168"></span> <span data-diff-end="168"></span>Settings > About Phone<span data-diff-start="169"></span> > t<span data-diff-end="169"></span>ap <span data-diff-start="170"></span>"<span data-diff-end="170"></span>Build Number<span data-diff-start="171"></span>"<span data-diff-end="171"></span> 7 times Settings > Developer Options<span data-diff-start="172"></span> ><span data-diff-end="172"></span> enable <span data-diff-start="173"></span>"<span data-diff-end="173"></span>USB Debugging<span data-diff-start="174"></span>" <span data-diff-end="174"></span> <span data-diff-start="175"></span>
Verify the device is recognized:
<span data-diff-start="178"></span>npm run<span data-diff-end="178"></span> devices
Build and run the app:
npm run android
Using Wireless Debugging:

Enable Wireless Debugging on your device: <span data-diff-end="183"></span> <span data-diff-start="184"></span> <span data-diff-end="184"></span>Settings > About Phone<span data-diff-start="185"></span> ><span data-diff-end="185"></span> tap <span data-diff-start="186"></span>"<span data-diff-end="186"></span>Build Number<span data-diff-start="187"></span>"<span data-diff-end="187"></span> 7 times Settings > Developer Options<span data-diff-start="188"></span> > enable "Wireless Debugging" <span data-diff-end="188"></span> <span data-diff-start="189"></span> 2. Pair your device (requires USB connection first):
<span data-diff-start="191"></span>npm run reconnect<span data-diff-end="191"></span>
3. Follow the on-screen prompts to complete pairing 4. Build and run:

npm run android
Troubleshooting Android: - Device not recognized: npm run devices - Clear cache: cd android && ./gradlew clean && cd .. && npm run android - Metro bundler issues: Press R twice in the Metro terminal or shake device and select "Reload" #### Running on iOS Prerequisites: - macOS with Xcode installed - iOS device or simulator Using iOS Simulator: sh <span data-diff-end="208"></span> <span data-diff-start="209"></span>npm run ios <span data-diff-end="209"></span> <span data-diff-start="210"></span> Using Physical iOS Device: 1. Connect your iPhone via USB cable (or configured for wireless) 2. In Xcode, select your device from the device selector 3. Build and run:

npm run ios
Wireless Debugging (After Initial USB Connection): 1. Connect via USB and open Xcode 2. Go to Devices and Simulators > select your device 3. Check "Connect via network" 4. Disconnect USB cable; device stays connected wirelessly 5. You can now deploy wirelessly from Xcode or CLI ### Option 2: Using PowerShell Scripts (Windows) For convenience, PowerShell scripts are provided: Rebuild and run (both Android and iOS setup): sh <span data-diff-end="230"></span> <span data-diff-start="231"></span>npm run rebuild <span data-diff-end="231"></span> <span data-diff-start="232"></span> Run on Android with automatic setup: sh <span data-diff-end="236"></span> <span data-diff-start="237"></span>npm run android <span data-diff-end="237"></span> <span data-diff-start="238"></span> Check connected devices: sh <span data-diff-end="242"></span> <span data-diff-start="243"></span>npm run devices <span data-diff-end="243"></span> <span data-diff-start="244"></span> Reconnect wireless ADB: sh <span data-diff-end="248"></span> <span data-diff-start="249"></span>npm run reconnect <span data-diff-end="249"></span> <span data-diff-start="250"></span> ## Verifying the Application is Running Once you have the backend, Metro bundler, and app running, verify everything works: 1. ✅ Metro bundler terminal shows: Ready to accept connections 2. ✅ Backend terminal shows: 🚀 Apollo Server ready at http://localhost:4000/ 3. ✅ App appears on your device 4. ✅ Check backend connection (you should see GraphQL requests in backend terminal) If the app fails to load: 1. Check the app console for errors (shake device → "Debug") 2. Verify API_BASE_URL in .env matches your local IP 3. Test connectivity: ping <YOUR_LOCAL_IP> 4. Ensure backend is running and accessible

Development
Project Structure
.
├── src/
│   ├── components/       #<span data-diff-start="268"></span> Reusable<span data-diff-end="268"></span> React components
│   ├── screens/          # Navigation screens<span data-diff-start="269"></span> (Home, Habits, etc.)<span data-diff-end="269"></span>
│   ├── utils/            # <span data-diff-start="270"></span>Utility<span data-diff-end="270"></span> functions (decay, stats, pillar tracking)
│   ├── api/              # <span data-diff-start="271"></span>GraphQL/REST<span data-diff-end="271"></span> API calls
│   └── types/            # TypeScript <span data-diff-start="272"></span>type definitions<span data-diff-end="272"></span>
<span data-diff-start="273"></span>├── backend/
<span data-diff-end="273"></span>
<span data-diff-start="274"></span>│   ├── index.js          # Apollo Server entry point
<span data-diff-end="274"></span>
<span data-diff-start="275"></span>│   ├── prisma/
<span data-diff-end="275"></span>
<span data-diff-start="276"></span>│   │   ├── schema.prisma # Database schema
<span data-diff-end="276"></span>
<span data-diff-start="277"></span>│   │   └── migrations/   # Database migrations
<span data-diff-end="277"></span>
<span data-diff-start="278"></span>│   └── package.json
<span data-diff-end="278"></span>
<span data-diff-start="279"></span>├── android/              # Android native code
<span data-diff-end="279"></span>
<span data-diff-start="280"></span>├── ios/                  # iOS native code
<span data-diff-end="280"></span>
<span data-diff-start="281"></span>├── App.jsx<span data-diff-end="281"></span>              # Root component
<span data-diff-start="282"></span>├<span data-diff-end="282"></span>── package.json<span data-diff-start="283"></span>         # Frontend dependencies
<span data-diff-end="283"></span>
<span data-diff-start="284"></span>├── tsconfig.json        # TypeScript configuration
<span data-diff-end="284"></span>
<span data-diff-start="285"></span>└── .env                 # Environment variables (not committed)
<span data-diff-end="285"></span>
Key Utilities
The app includes utilities for:

Decay mechanics: calculateStats() — exponential decay for pillar progress
Weekly tracking: processLineCompletions() — aggregate completions by day
Pillar management: getPillarFrequencies() — track pillar engagement
See src/utils/stats.ts and src/utils/weekly.ts for implementation details.

Reloading Changes
To reload your app after code changes:

Android: Press R twice in the terminal running the build, or shake your device and select Reload
iOS: Press Cmd+R in the simulator
For a full clean rebuild, re-run the build command.

Troubleshooting
### General Issues Port already in use: sh <span data-diff-end="291"></span> <span data-diff-start="292"></span># Kill process using port 4000 (backend) <span data-diff-end="292"></span> <span data-diff-start="293"></span>lsof -ti:4000 | xargs kill -9 # macOS/Linux <span data-diff-end="293"></span> <span data-diff-start="294"></span>netstat -ano | findstr :4000 # Windows (find PID, then: taskkill /PID <pid> /F) <span data-diff-end="294"></span> <span data-diff-start="295"></span> <span data-diff-end="295"></span> <span data-diff-start="296"></span># Kill process using port 8081 (Metro bundler) <span data-diff-end="296"></span> <span data-diff-start="297"></span>lsof -ti:8081 | xargs kill -9 # macOS/Linux <span data-diff-end="297"></span> <span data-diff-start="298"></span> Module not found errors: sh <span data-diff-end="302"></span> <span data-diff-start="303"></span># Clear node_modules and reinstall <span data-diff-end="303"></span> <span data-diff-start="304"></span>rm -rf node_modules package-lock.json # macOS/Linux <span data-diff-end="304"></span> <span data-diff-start="305"></span>rmdir /s node_modules # Windows <span data-diff-end="305"></span> <span data-diff-start="306"></span>npm install <span data-diff-end="306"></span> <span data-diff-start="307"></span> React Native cache issues: sh <span data-diff-end="311"></span> <span data-diff-start="312"></span>npm start -- --reset-cache <span data-diff-end="312"></span> <span data-diff-start="313"></span> ### Database Connection Issues PostgreSQL not running: sh <span data-diff-end="319"></span> <span data-diff-start="320"></span># Verify PostgreSQL is running <span data-diff-end="320"></span> <span data-diff-start="321"></span>psql -U postgres -c "SELECT 1;" <span data-diff-end="321"></span> <span data-diff-start="322"></span> <span data-diff-end="322"></span> <span data-diff-start="323"></span># Start PostgreSQL service (macOS) <span data-diff-end="323"></span> <span data-diff-start="324"></span>brew services start postgresql <span data-diff-end="324"></span> <span data-diff-start="325"></span> <span data-diff-end="325"></span> <span data-diff-start="326"></span># Or verify connection string in .env <span data-diff-end="326"></span> <span data-diff-start="327"></span># Format: postgresql://username:password@localhost:5432/ikigai <span data-diff-end="327"></span> <span data-diff-start="328"></span> Prisma migration fails: sh <span data-diff-end="332"></span> <span data-diff-start="333"></span># Generate Prisma Client <span data-diff-end="333"></span> <span data-diff-start="334"></span>npx prisma generate <span data-diff-end="334"></span> <span data-diff-start="335"></span> <span data-diff-end="335"></span> <span data-diff-start="336"></span># Run migrations with verbose output <span data-diff-end="336"></span> <span data-diff-start="337"></span>npm run migrate -- --verbose <span data-diff-end="337"></span> <span data-diff-start="338"></span> <span data-diff-end="338"></span> <span data-diff-start="339"></span># Reset database (⚠️ destructive, loses data) <span data-diff-end="339"></span> <span data-diff-start="340"></span>npx prisma migrate reset <span data-diff-end="340"></span> <span data-diff-start="341"></span>

Backend Connection Issues
App can't reach backend: 1. Verify backend is running: sh <span data-diff-end="345"></span> <span data-diff-start="346"></span> curl http://<YOUR_LOCAL_IP>:4000/ <span data-diff-end="346"></span> <span data-diff-start="347"></span> 2. Check API_BASE_URL in .env matches your local IP: sh <span data-diff-end="349"></span> <span data-diff-start="350"></span> ifconfig # macOS/Linux <span data-diff-end="350"></span> <span data-diff-start="351"></span> ipconfig # Windows <span data-diff-end="351"></span> <span data-diff-start="352"></span> 3. Ensure firewall allows port 4000 4. Test from device: - Android: Use <YOUR_LOCAL_IP> (not localhost) - Restart Metro bundler after .env changes ### Build and Compilation Issues Android build fails:

# Clea<span data-diff-start="361"></span>n<span data-diff-end="361"></span> and rebuild
cd android
./gradlew clean
cd ..
npm run android
<span data-diff-start="362"></span>
<span data-diff-end="362"></span>
<span data-diff-start="363"></span># Or clear all Android caches
<span data-diff-end="363"></span>
<span data-diff-start="364"></span>cd android && ./gradlew clean && ./gradlew build && cd ..
<span data-diff-end="364"></span>
iOS build fails:

# Clean Xcode build
cd ios
xcodebuild clean -workspace Ikigai.xcworkspace -scheme Ikigai
cd ..
npm run ios
<span data-diff-start="367"></span>
<span data-diff-end="367"></span>
<span data-diff-start="368"></span># Or remove pods and reinstall
<span data-diff-end="368"></span>
<span data-diff-start="369"></span>cd ios
<span data-diff-end="369"></span>
<span data-diff-start="370"></span>rm -rf Pods Podfile.lock
<span data-diff-end="370"></span>
<span data-diff-start="371"></span>bundle exec pod install
<span data-diff-end="371"></span>
<span data-diff-start="372"></span>cd ..
<span data-diff-end="372"></span>
<span data-diff-start="373"></span>npm run ios
<span data-diff-end="373"></span>
<span data-diff-start="374"></span>```
<span data-diff-end="374"></span>
<span data-diff-start="375"></span>
<span data-diff-end="375"></span>
<span data-diff-start="376"></span>**CocoaPods issues (macOS):**
<span data-diff-end="376"></span>
<span data-diff-start="377"></span>
<span data-diff-end="377"></span>
<span data-diff-start="378"></span>```sh
<span data-diff-end="378"></span>
<span data-diff-start="379"></span># Reinstall CocoaPods
<span data-diff-end="379"></span>
<span data-diff-start="380"></span>cd ios
<span data-diff-end="380"></span>
<span data-diff-start="381"></span>bundle install
<span data-diff-end="381"></span>
<span data-diff-start="382"></span>bundle exec pod install
<span data-diff-end="382"></span>
<span data-diff-start="383"></span>cd ..
<span data-diff-end="383"></span>
<span data-diff-start="384"></span>```
<span data-diff-end="384"></span>
<span data-diff-start="385"></span>
<span data-diff-end="385"></span>
<span data-diff-start="386"></span>**Gradle sync issues (Android):**
<span data-diff-end="386"></span>
<span data-diff-start="387"></span>
<span data-diff-end="387"></span>
<span data-diff-start="388"></span>```sh
<span data-diff-end="388"></span>
<span data-diff-start="389"></span>cd android
<span data-diff-end="389"></span>
<span data-diff-start="390"></span>./gradlew --refresh-dependencies
<span data-diff-end="390"></span>
<span data-diff-start="391"></span>cd ..
<span data-diff-end="391"></span>
<span data-diff-start="392"></span>npm run android
<span data-diff-end="392"></span>
<span data-diff-start="393"></span>```
<span data-diff-end="393"></span>

### Device Connection<span data-diff-start="394"></span> Issues
<span data-diff-end="394"></span>
<span data-diff-start="395"></span>
<span data-diff-end="395"></span>
<span data-diff-start="396"></span>**Android device not recognized:**
<span data-diff-end="396"></span>
<span data-diff-start="397"></span>
<span data-diff-end="397"></span>
<span data-diff-start="398"></span>```sh
<span data-diff-end="398"></span>
<span data-diff-start="399"></span># List connected devices
<span data-diff-end="399"></span>
<span data-diff-start="400"></span>npm run devices
<span data-diff-end="400"></span>
<span data-diff-start="401"></span>
<span data-diff-end="401"></span>
<span data-diff-start="402"></span># Restart ADB
<span data-diff-end="402"></span>
<span data-diff-start="403"></span>npm run reconnect
<span data-diff-end="403"></span>
<span data-diff-start="404"></span>
<span data-diff-end="404"></span>
<span data-diff-start="405"></span># Or manually:
<span data-diff-end="405"></span>
<span data-diff-start="406"></span>adb kill-server
<span data-diff-end="406"></span>
<span data-diff-start="407"></span>adb start-server
<span data-diff-end="407"></span>
<span data-diff-start="408"></span>adb devices
<span data-diff-end="408"></span>
<span data-diff-start="409"></span>```
<span data-diff-end="409"></span>
<span data-diff-start="410"></span>
<span data-diff-end="410"></span>
<span data-diff-start="411"></span>**iOS device not showing in Xcode:**
<span data-diff-end="411"></span>
<span data-diff-start="412"></span>
<span data-diff-end="412"></span>
<span data-diff-start="413"></span>1. Disconnect and reconnect the USB cable
<span data-diff-end="413"></span>
<span data-diff-start="414"></span>2. Trust the computer on your device: **Settings > General > Trust**
<span data-diff-end="414"></span>
<span data-diff-start="415"></span>3. Restart Xcode
<span data-diff-end="415"></span>
<span data-diff-start="416"></span>4. Open **Window > Devices and Simulators** to verify
<span data-diff-end="416"></span>
<span data-diff-start="417"></span>
<span data-diff-end="417"></span>
<span data-diff-start="418"></span>### Metro Bundler Issues
<span data-diff-end="418"></span>
<span data-diff-start="419"></span>
<span data-diff-end="419"></span>
<span data-diff-start="420"></span>**Red error screen or blank app:**
<span data-diff-end="420"></span>
<span data-diff-start="421"></span>
<span data-diff-end="421"></span>
<span data-diff-start="422"></span>1. Check Metro terminal for errors (Terminal 3)
<span data-diff-end="422"></span>
<span data-diff-start="423"></span>2. Clear cache: `npm start -- --reset-cache`
<span data-diff-end="423"></span>
<span data-diff-start="424"></span>3. Verify all processes are running (Backend, Metro, App)
<span data-diff-end="424"></span>
<span data-diff-start="425"></span>4. Reload app: Press `R` twice (Android) or `Cmd+R` (iOS simulator)
<span data-diff-end="425"></span>
<span data-diff-start="426"></span>
<span data-diff-end="426"></span>
<span data-diff-start="427"></span>## Development Workflow
<span data-diff-end="427"></span>
<span data-diff-start="428"></span>
<span data-diff-end="428"></span>
<span data-diff-start="429"></span>### Local Development Setup (Recommended)
<span data-diff-end="429"></span>
<span data-diff-start="430"></span>
<span data-diff-end="430"></span>
<span data-diff-start="431"></span>1. Terminal 1: `cd backend && npm run dev`
<span data-diff-end="431"></span>
<span data-diff-start="432"></span>2. Terminal 2: `npm start`
<span data-diff-end="432"></span>
<span data-diff-start="433"></span>3. Terminal 3: `npm run android` or `npm run ios`
<span data-diff-end="433"></span>
<span data-diff-start="434"></span>4. Edit code in your editor and watch changes reload
<span data-diff-end="434"></span>
<span data-diff-start="435"></span>
<span data-diff-end="435"></span>
<span data-diff-start="436"></span>### Fast Reload
<span data-diff-end="436"></span>
<span data-diff-start="437"></span>
<span data-diff-end="437"></span>
<span data-diff-start="438"></span>- **Android**: Press `R` twice in Metro terminal or shake device → Reload
<span data-diff-end="438"></span>
<span data-diff-start="439"></span>- **iOS**: Press `Cmd+R` in simulator or shake device → Reload
<span data-diff-end="439"></span>
<span data-diff-start="440"></span>
<span data-diff-end="440"></span>
<span data-diff-start="441"></span>### Hot Reload vs Full Rebuild
<span data-diff-end="441"></span>
<span data-diff-start="442"></span>
<span data-diff-end="442"></span>
<span data-diff-start="443"></span>- **Hot Reload** (faster): Code changes reload within 1-2 seconds
<span data-diff-end="443"></span>
<span data-diff-start="444"></span>  - Works for most component/utility changes
<span data-diff-end="444"></span>
<span data-diff-start="445"></span>  - Preserves app state
<span data-diff-end="445"></span>
<span data-diff-start="446"></span>- **Full Rebuild** (slower): Needed for native dependency changes or major issues
<span data-diff-end="446"></span>
<span data-diff-start="447"></span>  ```sh
<span data-diff-end="447"></span>
<span data-diff-start="448"></span>  npm run android  # or npm run ios
<span data-diff-end="448"></span>
<span data-diff-start="449"></span>  ```
<span data-diff-end="449"></span>
<span data-diff-start="450"></span>
<span data-diff-end="450"></span>
<span data-diff-start="451"></span>## Project Architecture
<span data-diff-end="451"></span>
<span data-diff-start="452"></span>
<span data-diff-end="452"></span>
<span data-diff-start="453"></span>### Directory Structure
<span data-diff-end="453"></span>
<span data-diff-start="454"></span>
<span data-diff-end="454"></span>
<span data-diff-start="455"></span>```
<span data-diff-end="455"></span>
<span data-diff-start="456"></span>.
<span data-diff-end="456"></span>
<span data-diff-start="457"></span>├── src/
<span data-diff-end="457"></span>
<span data-diff-start="458"></span>│   ├── components/       # Reusable React components
<span data-diff-end="458"></span>
<span data-diff-start="459"></span>│   ├── screens/          # Navigation screens (Home, Habits, etc.)
<span data-diff-end="459"></span>
<span data-diff-start="460"></span>│   ├── utils/            # Utility functions (decay, stats, pillar tracking)
<span data-diff-end="460"></span>
<span data-diff-start="461"></span>│   ├── api/              # GraphQL/REST API calls
<span data-diff-end="461"></span>
<span data-diff-start="462"></span>│   └── types/            # TypeScript type definitions
<span data-diff-end="462"></span>
<span data-diff-start="463"></span>├── backend/
<span data-diff-end="463"></span>
<span data-diff-start="464"></span>│   ├── index.js          # Apollo Server entry point
<span data-diff-end="464"></span>
<span data-diff-start="465"></span>│   ├── prisma/
<span data-diff-end="465"></span>
<span data-diff-start="466"></span>│   │   ├── schema.prisma # Database schema
<span data-diff-end="466"></span>
<span data-diff-start="467"></span>│   │   └── migrations/   # Database migrations
<span data-diff-end="467"></span>
<span data-diff-start="468"></span>│   └── package.json
<span data-diff-end="468"></span>
<span data-diff-start="469"></span>├── android/              # Android native code
<span data-diff-end="469"></span>
<span data-diff-start="470"></span>├── ios/                  # iOS native code
<span data-diff-end="470"></span>
<span data-diff-start="471"></span>├── App.jsx              # Root component
<span data-diff-end="471"></span>
<span data-diff-start="472"></span>├── package.json         # Frontend dependencies
<span data-diff-end="472"></span>
<span data-diff-start="473"></span>├── tsconfig.json        # TypeScript configuration
<span data-diff-end="473"></span>
<span data-diff-start="474"></span>└── .env                 # Environment variables (not committed)
<span data-diff-end="474"></span>
<span data-diff-start="475"></span>```
<span data-diff-end="475"></span>
<span data-diff-start="476"></span>
<span data-diff-end="476"></span>
<span data-diff-start="477"></span>### Key Technologies
<span data-diff-end="477"></span>
<span data-diff-start="478"></span>
<span data-diff-end="478"></span>
<span data-diff-start="479"></span>- **Frontend**: React Native 0.85, TypeScript, TailwindCSS (NativeWind)
<span data-diff-end="479"></span>
<span data-diff-start="480"></span>- **Backend**: Apollo Server, GraphQL, Prisma ORM
<span data-diff-end="480"></span>
<span data-diff-start="481"></span>- **Database**: PostgreSQL
<span data-diff-end="481"></span>
<span data-diff-start="482"></span>- **Navigation**: React Navigation
<span data-diff-end="482"></span>
<span data-diff-start="483"></span>- **Charts**: React Native Chart Kit, Radar Chart
<span data-diff-end="483"></span>
<span data-diff-start="484"></span>- **State Management**: Apollo Client
<span data-diff-end="484"></span>
<span data-diff-start="485"></span>
<span data-diff-end="485"></span>
<span data-diff-start="486"></span>
<span data-diff-end="486"></span>
<span data-diff-start="487"></span>## Additional Resources
<span data-diff-end="487"></span>
<span data-diff-start="488"></span>
<span data-diff-end="488"></span>
<span data-diff-start="489"></span>### Documentation Links
<span data-diff-end="489"></span>

- [React Native Docs](https://reactnative.dev/docs/getting-started)
<span data-diff-start="490"></span>- [Expo Documentation](https://docs.expo.dev/)
<span data-diff-end="490"></span>
<span data-diff-start="491"></span>- [Apollo Client Docs](https://www.apollographql.com/docs/react/)
<span data-diff-end="491"></span>
<span data-diff-start="492"></span>- [Prisma ORM](https://www.prisma.io/docs/)
<span data-diff-end="492"></span>
<span data-diff-start="493"></span>- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
<span data-diff-end="493"></span>
<span data-diff-start="494"></span>- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
<span data-diff-end="494"></span>
<span data-diff-start="495"></span>
<span data-diff-end="495"></span>
<span data-diff-start="496"></span>### Philosophy
<span data-diff-end="496"></span>
<span data-diff-start="497"></span>
<span data-diff-end="497"></span>
<span data-diff-start="498"></span>[Learn more about Ikigai<span data-diff-end="498"></span>](https://en.wikipedia.org/wiki/Ikigai) —<span data-diff-start="499"></span> a Japanese philosophy representing the intersection of:
<span data-diff-end="499"></span>
<span data-diff-start="500"></span>- **Love** (what you love)
<span data-diff-end="500"></span>
<span data-diff-start="501"></span>- **Skill** (what you're good at)
<span data-diff-end="501"></span>
<span data-diff-start="502"></span>- **Wealth** (what you can be paid for)
<span data-diff-end="502"></span>
<span data-diff-start="503"></span>- **Needs** (what the world needs)
<span data-diff-end="503"></span>
<span data-diff-start="504"></span>
<span data-diff-end="504"></span>
<span data-diff-start="505"></span>This app helps you track progress across these four pillars of fulfillment.
<span data-diff-end="505"></span>

## Support

<span data-diff-start="506"></span>Encountered an issue? Try these steps:
<span data-diff-end="506"></span>
<span data-diff-start="507"></span>
<span data-diff-end="507"></span>
<span data-diff-start="508"></span>1. **Check this README** — most issues are covered in the [Troubleshooting](#troubleshooting) section
<span data-diff-end="508"></span>
<span data-diff-start="509"></span>2. **Check React Native docs** — [Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting)
<span data-diff-end="509"></span>
<span data-diff-start="510"></span>3. **Clear caches** — Run `npm start -- --reset-cache` and rebuild
<span data-diff-end="510"></span>
<span data-diff-start="511"></span>4. **Verify environment** — Confirm Node.js, npm, and platform tools are installed correctly
<span data-diff-end="511"></span>
<span data-diff-start="512"></span>5. **Search GitHub Issues** — Check if others have reported the same issue
<span data-diff-end="512"></span>
<span data-diff-start="513"></span>
<span data-diff-end="513"></span>
<span data-diff-start="514"></span>For persistent issues, please open an issue on the project repository with:
<span data-diff-end="514"></span>
<span data-diff-start="515"></span>- Error message and stack trace
<span data-diff-end="515"></span>
<span data-diff-start="516"></span>- Steps to reproduce
<span data-diff-end="516"></span>
<span data-diff-start="517"></span>- Your environment (OS, Node version, npm version, device type)<span data-diff-end="517"></span>