
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DriverData } from '@/lib/mockData';

interface DriversTableProps {
  driverData: DriverData[];
}

const DriversTable: React.FC<DriversTableProps> = ({ driverData }) => {
  // Sort drivers by speed for this example
  const sortedDrivers = [...driverData].sort((a, b) => b.speed - a.speed);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Drivers</CardTitle>
        <CardDescription>Driver details and current status</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Speed</TableHead>
              <TableHead>Trip Distance</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDrivers.slice(0, 5).map((driver) => (
              <TableRow key={driver.driver_id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{driver.driver_name}</TableCell>
                <TableCell>{driver.vehicle_id}</TableCell>
                <TableCell>{driver.region}</TableCell>
                <TableCell>{Math.round(driver.speed)} mph</TableCell>
                <TableCell>{Math.round(driver.trip_distance)} mi</TableCell>
                <TableCell>
                  {driver.anomalous_event || driver.geofencing_violation ? (
                    <span className="text-destructive font-medium">Alert</span>
                  ) : (
                    <span className="text-green-500 font-medium">Normal</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DriversTable;
