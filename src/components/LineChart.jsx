import { LineChart } from "react-native-chart-kit";
import { Dimensions, View, Text } from "react-native";

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [2, 5, 2, 8, 10, 3, 4], // The '8' and '10' create the spikes
      color: (opacity = 1) => `rgba(20, 158, 168, ${opacity})`, 
      strokeWidth: 3 
    }
  ],
  legend: ["Daily Intensity"] 
};

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0, 
  color: (opacity = 1) => `rgba(20, 158, 168, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffffff"
  }
};

export default function SpikesGraph() {
  return (
    <View className="bg-white p-4 rounded-3xl border border-gray-100 my-4">
      <Text className="text-lg font-bold mb-4">Activity Spikes</Text>
      <LineChart
        data={data}
        width={screenWidth - 64}
        height={220}
        chartConfig={chartConfig}
        bezier // This makes the spikes look smooth/curvy
        style={{
          borderRadius: 16
        }}
      />
    </View>
  );
}