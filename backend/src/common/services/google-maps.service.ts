import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GoogleMapsService {
  private baseUrl = 'https://maps.googleapis.com/maps/api';
  private apiKey = process.env.GOOGLE_MAPS_API_KEY;

  async getDistance(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
  ): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/distancematrix/json`,
        {
          params: {
            origins: `${origin.lat},${origin.lng}`,
            destinations: `${destination.lat},${destination.lng}`,
            key: this.apiKey,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error('Error fetching distance from Google Maps');
    }
  }

  async getDirections(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
  ): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/directions/json`, {
        params: {
          origin: `${origin.lat},${origin.lng}`,
          destination: `${destination.lat},${destination.lng}`,
          key: this.apiKey,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error fetching directions from Google Maps');
    }
  }
}
