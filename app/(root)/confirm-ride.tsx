import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import DriverCard from "@/components/DriverCard";
import RideLayout from "@/components/RideLayout";
import { useDriverStore } from "@/store";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  // Show loading state if drivers are not available
  if (!drivers || drivers.length === 0) {
    return (
      <RideLayout title={"Choose a Rider"} snapPoints={["65%", "85%"]}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg font-JakartaBold text-center">
            Loading drivers...
          </Text>
          <Text className="text-sm text-gray-600 text-center mt-2">
            Please wait while we fetch available drivers
          </Text>
        </View>
      </RideLayout>
    );
  }

  return (
    <RideLayout title={"Choose a Rider"} snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <DriverCard
            item={item}
            selected={selectedDriver || 0}
            setSelected={() => setSelectedDriver(Number(item.id!))}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("./book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;