import { Image, Text, View } from "react-native";

import PaymentStatusUpdate from "@/components/PaymentStatusUpdate";
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";

const RideCard = ({ ride }: { ride: Ride }) => {
  // Safety check for ride data
  if (!ride) {
    return (
      <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
        <Text className="text-md font-JakartaMedium text-gray-500 p-3">
          Ride data not available
        </Text>
      </View>
    );
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-500";
      case "cash_pending":
        return "text-yellow-500";
      case "cash_paid":
        return "text-green-500";
      case "cash_cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Paid";
      case "cash_pending":
        return "Cash Pending";
      case "cash_paid":
        return "Cash Paid";
      case "cash_cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col items-start justify-center p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />

          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {ride.origin_address}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {ride.destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Date & Time
            </Text>
            <Text className="text-md font-JakartaBold" numberOfLines={1}>
              {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Driver
            </Text>
            <Text className="text-md font-JakartaBold">
              {ride.driver.first_name} {ride.driver.last_name}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Car Seats
            </Text>
            <Text className="text-md font-JakartaBold">
              {ride.driver.car_seats}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-3">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Payment Status
            </Text>
            <Text
              className={`text-md capitalize font-JakartaBold ${getPaymentStatusColor(ride.payment_status)}`}
            >
              {getPaymentStatusText(ride.payment_status)}
            </Text>
          </View>

          {/* Payment Status Update Component for Cash Payments */}
          <PaymentStatusUpdate 
            rideId={ride.ride_id?.toString() || ""}
            currentStatus={ride.payment_status}
            onStatusUpdate={() => {
              // This will trigger a refresh of the rides list
              // You can implement a callback to refresh the parent component
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default RideCard;