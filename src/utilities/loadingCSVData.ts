// src/utilities/loadingCSVData.ts
import Papa from 'papaparse';

// Import CSV files as raw text (Vite “?raw” loader)
import driverCsv          from '../lib/dataTables/driver_table.csv?raw';
import driverSafetyCsv    from '../lib/dataTables/driver_safety_score_table.csv?raw';
import vehicleCsv         from '../lib/dataTables/vehicle_table.csv?raw';
// ← replace <YOUR-TRIP-FILE-HERE> with the exact filename you see under src/lib/dataTables
import tripCsv            from '../lib/dataTables/final_trip_table_with_region_and_status.csv?raw';
import incidentReportCsv  from '../lib/dataTables/incident_report_table.csv?raw';
import eventLogCsv        from '../lib/dataTables/event_log_table.csv?raw';
import routeCsv           from '../lib/dataTables/route_table.csv?raw';

import type {
  DriverInfo,
  DriverSafetyScore,
  Vehicle,
  Trip,
  IncidentReport,
  EventLog,
  Route
} from './parsingCSV';

/** Parse a raw CSV string into an array of typed records */
function parseCsv<T>(csvString: string): T[] {
  const { data, errors } = Papa.parse<T>(csvString, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true
  });
  if (errors.length) console.error('CSV parse errors:', errors);
  return data as T[];
}

// exports
export const driverInformation: DriverInfo[]       = parseCsv<DriverInfo>(driverCsv);
export const driverSafetyScores: DriverSafetyScore[] = parseCsv<DriverSafetyScore>(driverSafetyCsv);
export const vehicleTable: Vehicle[]               = parseCsv<Vehicle>(vehicleCsv);
export const tripTable: Trip[]                     = parseCsv<Trip>(tripCsv);
export const incidentReport: IncidentReport[]      = parseCsv<IncidentReport>(incidentReportCsv);
export const eventLog: EventLog[]                  = parseCsv<EventLog>(eventLogCsv);
export const routeTable: Route[]                   = parseCsv<Route>(routeCsv);

/**
 * Returns the number of unique drivers with trips “In Progress.”
 */

export function getActiveDriverCount(): number {
  const inProgress = tripTable.filter(t => t.trip_status === 'In Progress');
  return new Set(inProgress.map(t => t.driver_id)).size;
}

