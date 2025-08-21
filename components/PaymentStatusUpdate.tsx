import React, { useState } from "react";
import { Alert, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import { useRideStore } from "@/store";

interface PaymentStatusUpdateProps {
  rideId: string;
  currentStatus: "paid" | "cash_pending" | "cash_paid" | "cash_cancelled";
  onStatusUpdate?: () => void;
}

const PaymentStatusUpdate = ({ 
  rideId, 
  currentStatus, 
  onStatusUpdate 
}: PaymentStatusUpdateProps) => {
  const { updatePaymentStatus } = useRideStore();
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (newStatus: "cash_paid" | "cash_cancelled") => {
    try {
      setLoading(true);
      await updatePaymentStatus(rideId, newStatus);
      Alert.alert(
        "Success", 
        `Payment status updated to ${newStatus === "cash_paid" ? "Cash Paid" : "Cancelled"}`
      );
      onStatusUpdate?.();
    } catch (error) {
      Alert.alert("Error", "Failed to update payment status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Only show update buttons for cash_pending status
  if (currentStatus !== "cash_pending") {
    return null;
  }

  return (
    <View className="flex flex-row space-x-3 mt-3">
      <CustomButton
        title={loading ? "Updating..." : "Mark as Paid"}
        onPress={() => handleStatusUpdate("cash_paid")}
        disabled={loading}
        bgVariant="success"
        className="flex-1"
      />
      <CustomButton
        title={loading ? "Updating..." : "Cancel Ride"}
        onPress={() => handleStatusUpdate("cash_cancelled")}
        disabled={loading}
        bgVariant="danger"
        className="flex-1"
      />
    </View>
  );
};

export default PaymentStatusUpdate;
