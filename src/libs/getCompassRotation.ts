export function getCompassRotation(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  // Convert degrees to radians
  const toRadians = (angle: number) => angle * (Math.PI / 180);

  // Calculate differences in coordinates
  const dLon = toRadians(lon2 - lon1);

  // Calculate bearing
  const y = Math.sin(dLon) * Math.cos(toRadians(lat2));
  const x =
    Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
    Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(dLon);
  let bearing = Math.atan2(y, x);

  // Convert bearing from radians to degrees
  bearing = ((bearing * 180) / Math.PI + 360) % 360;

  // Round to 2 decimal places
  bearing = Math.round(bearing * 100) / 100;

  return bearing;
}
