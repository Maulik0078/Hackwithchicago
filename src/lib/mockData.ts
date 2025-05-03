
// Mock data types matching our database schema
export interface DriverData {
  trip_id: string;
  driver_id: string;
  vehicle_id: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
  acceleration: number;
  steering_angle: number;
  heading: number;
  trip_duration: number;
  trip_distance: number;
  fuel_consumption: number;
  rpm: number;
  brake_usage: number;
  lane_deviation: number;
  weather_conditions: string;
  road_type: string;
  traffic_condition: string;
  stop_events: number;
  geofencing_violation: boolean;
  anomalous_event: boolean;
  route_anomaly: boolean;
  route_deviation_score: number;
  acceleration_variation: number;
  behavioral_consistency_index: number;
  region: string;
  driver_name: string;
}

// Regions for filtering
export const regions = [
  "All Regions",
  "North",
  "South",
  "East",
  "West",
  "Central"
];

// Generate driver names
const driverNames = [
  "John Smith", "Sarah Johnson", "Michael Brown", "Emma Davis", 
  "David Wilson", "Olivia Martinez", "James Taylor", "Sophia Anderson",
  "Robert Thomas", "Ava Jackson", "William White", "Isabella Harris",
  "Joseph Martin", "Mia Thompson", "Charles Garcia", "Charlotte Lewis"
];

// Generate random driver data
const generateRandomData = (driverId: number, region: string): DriverData => {
  const now = new Date();
  const timestamp = new Date(now.getTime() - Math.random() * 3600000).toISOString();
  
  // Base coordinates per region
  let baseLat = 37.7749;
  let baseLng = -122.4194;
  
  switch(region) {
    case "North": 
      baseLat = 40.7128; 
      baseLng = -74.0060;
      break;
    case "South": 
      baseLat = 29.7604; 
      baseLng = -95.3698;
      break;
    case "East": 
      baseLat = 42.3601; 
      baseLng = -71.0589;
      break;
    case "West": 
      baseLat = 34.0522; 
      baseLng = -118.2437;
      break;
    case "Central": 
      baseLat = 39.7392; 
      baseLng = -104.9903;
      break;
  }

  // Randomize coordinates slightly
  const lat = baseLat + (Math.random() - 0.5) * 0.5;
  const lng = baseLng + (Math.random() - 0.5) * 0.5;
  
  const weatherConditions = ["Clear", "Rainy", "Cloudy", "Snowy", "Foggy"];
  const roadTypes = ["Highway", "Urban", "Residential", "Rural"];
  const trafficConditions = ["Light", "Moderate", "Heavy", "Congested"];
  
  return {
    trip_id: `T-${driverId}-${Math.floor(Math.random() * 1000)}`,
    driver_id: `D-${driverId}`,
    driver_name: driverNames[driverId % driverNames.length],
    vehicle_id: `V-${100 + driverId}`,
    timestamp,
    latitude: lat,
    longitude: lng,
    speed: Math.random() * 75,
    acceleration: (Math.random() - 0.5) * 5,
    steering_angle: (Math.random() - 0.5) * 30,
    heading: Math.random() * 360,
    trip_duration: Math.random() * 120,
    trip_distance: Math.random() * 50,
    fuel_consumption: Math.random() * 15,
    rpm: 1000 + Math.random() * 4000,
    brake_usage: Math.random() * 100,
    lane_deviation: Math.random() * 2,
    weather_conditions: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
    road_type: roadTypes[Math.floor(Math.random() * roadTypes.length)],
    traffic_condition: trafficConditions[Math.floor(Math.random() * trafficConditions.length)],
    stop_events: Math.floor(Math.random() * 5),
    geofencing_violation: Math.random() > 0.9,
    anomalous_event: Math.random() > 0.9,
    route_anomaly: Math.random() > 0.95,
    route_deviation_score: Math.random() * 10,
    acceleration_variation: Math.random() * 3,
    behavioral_consistency_index: Math.random() * 100,
    region
  };
};

// Generate initial dataset with drivers spread across regions
export const generateMockDriverData = (count: number = 50): DriverData[] => {
  const data: DriverData[] = [];
  const regionsWithoutAll = regions.filter(r => r !== "All Regions");
  
  for (let i = 0; i < count; i++) {
    const region = regionsWithoutAll[i % regionsWithoutAll.length];
    data.push(generateRandomData(i, region));
  }
  
  return data;
};

// Update a subset of the data to simulate real-time updates
export const updateMockData = (data: DriverData[]): DriverData[] => {
  return data.map(driver => {
    // Only update some of the drivers (30% chance)
    if (Math.random() > 0.7) {
      return generateRandomData(parseInt(driver.driver_id.split('-')[1]), driver.region);
    }
    return driver;
  });
};
