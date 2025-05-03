
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DriverData } from '@/lib/mockData';

interface StatCardsProps {
  driverData: DriverData[];
}

const StatCards: React.FC<StatCardsProps> = ({ driverData }) => {
  // Calculate stats
  const activeDrivers = driverData.length;
  const avgSpeed = driverData.length > 0 
    ? Math.round(driverData.reduce((sum, driver) => sum + driver.speed, 0) / driverData.length) 
    : 0;
  const totalDistance = Math.round(driverData.reduce((sum, driver) => sum + driver.trip_distance, 0));
  const alertCount = driverData.filter(
    driver => driver.geofencing_violation || driver.anomalous_event || driver.route_anomaly
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="hover-scale">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Drivers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeDrivers}</div>
          <p className="text-xs text-muted-foreground mt-1">Drivers on the road</p>
        </CardContent>
      </Card>

      <Card className="hover-scale">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Average Speed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgSpeed}<span className="text-sm ml-1">mph</span></div>
          <p className="text-xs text-muted-foreground mt-1">Current fleet average</p>
        </CardContent>
      </Card>

      <Card className="hover-scale">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Distance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDistance}<span className="text-sm ml-1">mi</span></div>
          <p className="text-xs text-muted-foreground mt-1">Traveled today</p>
        </CardContent>
      </Card>

      <Card className="hover-scale">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{alertCount}</div>
          <p className="text-xs text-muted-foreground mt-1">Requiring attention</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
