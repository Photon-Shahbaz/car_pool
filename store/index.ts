import { create } from "zustand";

import { DriverStore, LocationStore, MarkerData } from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: 37.78825,
  userLongitude: -122.4324,
  userAddress: "San Francisco, CA",
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));

    // if driver is selected and now new location is set, clear the selected driver
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) clearSelectedDriver();
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));

    // if driver is selected and now new location is set, clear the selected driver
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) clearSelectedDriver();
  },
}));  

export const useDriverStore = create<DriverStore>((set, get) => ({
  drivers: [
    {
      id: 1,
      latitude: 37.78825,
      longitude: -122.4324,
      title: "James Wilson",
      profile_image_url: "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      car_image_url: "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      car_seats: 4,
      rating: 4.8,
      first_name: "James",
      last_name: "Wilson",
      time: 15,
      price: "25.00"
    },
    {
      id: 2,
      latitude: 37.78825,
      longitude: -122.4324,
      title: "David Brown",
      profile_image_url: "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      car_image_url: "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      car_seats: 5,
      rating: 4.6,
      first_name: "David",
      last_name: "Brown",
      time: 12,
      price: "22.00"
    },
    {
      id: 3,
      latitude: 37.78825,
      longitude: -122.4324,
      title: "Michael Johnson",
      profile_image_url: "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
      car_image_url: "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
      car_seats: 4,
      rating: 4.7,
      first_name: "Michael",
      last_name: "Johnson",
      time: 18,
      price: "28.00"
    }
  ] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) =>
    set(() => ({ selectedDriver: driverId })),
  setDrivers: (drivers: MarkerData[]) => {
    if (drivers && Array.isArray(drivers)) {
      set(() => ({ drivers }));
    }
  },
  clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}));

export const useRideStore = create<{
  updatePaymentStatus: (rideId: string, status: "cash_paid" | "cash_cancelled") => Promise<void>;
}>((set) => ({
  updatePaymentStatus: async (rideId: string, status: "cash_paid" | "cash_cancelled") => {
    try {
      const response = await fetch(`/(api)/ride/${rideId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payment_status: status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update payment status");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw error;
    }
  },
}));