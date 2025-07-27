import { jwtDecode } from 'jwt-decode'

export const handleDecode = async (authToken) => {
  if (authToken) {
    const decodedToken = await jwtDecode(authToken);
    return decodedToken;
  }
};
