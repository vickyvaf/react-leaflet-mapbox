function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number) {
  return (radians * 180) / Math.PI;
}

export function calculateBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  // Convert latitude and longitude from degrees to radians
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const λ1 = toRadians(lon1);
  const λ2 = toRadians(lon2);

  // Calculate the difference in longitude
  const Δλ = λ2 - λ1;

  // Calculate the components of the bearing angle
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  // Calculate the initial bearing in radians
  let θ = Math.atan2(y, x);

  // Convert the bearing from radians to degrees
  θ = toDegrees(θ);

  // Normalize the bearing to be within the range 0 to 360 degrees
  return (θ + 360) % 360;
}

// Example usage:
const lat1 = 34.0522; // Latitude of the first point
const lon1 = -118.2437; // Longitude of the first point
const lat2 = 40.7128; // Latitude of the second point
const lon2 = -74.006; // Longitude of the second point

// const bearing = calculateBearing(lat1, lon1, lat2, lon2);
// console.log(`The bearing from point 1 to point 2 is: ${bearing} degrees`);
