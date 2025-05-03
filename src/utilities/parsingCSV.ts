export interface DriverInfo {
    driver_id: string;
    driver_name: string;
    license_number: string;
    region: string;
  }
  
  export interface DriverSafetyScore {
    driver_id: string;
    safety_score: number;
    last_updated: string; // ISO date
  }
  
  export interface Vehicle {
    vehicle_id: string;
    make: string;
    model: string;
    year: number;
  }
  
  export interface Trip {
    trip_id: string;
    driver_id: string;
    vehicle_id: string;
    start_time: string;
    end_time: string;
    distance_km: number;
    trip_status: string;
  }
  
  export interface IncidentReport {
    incident_id: string;
    driver_id: string;
    timestamp: string;
    description: string;
    severity: string;
  }
  
  export interface EventLog {
    event_id: string;
    driver_id: string;
    event_type: string;
    timestamp: string;
    details: string;
  }
  
  export interface Route {
    route_id: string;
    start_location: string;
    end_location: string;
    estimated_time_min: number;
  }
  