# dev.ps1
param (
  [string]$command
)

function Start-App {
  $env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot"
  $env:Path = "$env:JAVA_HOME\bin;" + $env:Path
  npx react-native run-android
}

function Start-Metro {
  npx react-native start
}

function Reconnect-Device {
  $IP = Read-Host "Enter device IP"
  $PORT = Read-Host "Enter device port"
  adb connect "${IP}:${PORT}"
  adb reverse tcp:8081 tcp:8081
  Write-Host "Connected and Metro port forwarded." -ForegroundColor Green
}

function Check-Device {
  adb devices
}

switch ($command) {
  "android"   { Start-App }
  "start"     { Start-Metro }
  "reconnect" { Reconnect-Device }
  "devices"   { Check-Device }
  default {
    Write-Host "Usage: .\dev.ps1 <command>" -ForegroundColor Yellow
    Write-Host "Commands:"
    Write-Host "  android    - build and run on device"
    Write-Host "  start      - start Metro bundler"
    Write-Host "  reconnect  - reconnect wireless device"
    Write-Host "  devices    - list connected devices"
  }
}