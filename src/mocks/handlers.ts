import { http, HttpResponse } from 'msw';

// Define the shape of tracking event
interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  details: string;
  completed: boolean;
}

interface TrackingData {
  trackingId: string;
  status: 'delivered' | 'in_transit' | 'pending' | 'failed';
  shipper: string;
  recipient: string;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  currentStep: number;
  steps: TrackingEvent[];
}

export const handlers = [
  // Mock tracking parcel api
  http.get('/api/track/:id', ({ params }) => {
    const { id } = params;

    if (id === 'FAS-ERROR') {
      return HttpResponse.json({ error: 'Tracking number not found. Please verify the code and try again.' }, { status: 404 });
    }

    const mockDelivered: TrackingData = {
      trackingId: id as string,
      status: 'delivered',
      shipper: 'Global Tech Corp',
      recipient: 'Fascord Office',
      origin: 'New York, USA',
      destination: 'London, UK',
      estimatedDelivery: '2026-05-18T14:30:00Z',
      currentStep: 4,
      steps: [
        { status: 'Shipment Picked Up', location: 'New York (JFK)', timestamp: '2026-05-15T09:00:00Z', details: 'Shipment has been picked up by the courier.', completed: true },
        { status: 'Processed at Origin Facility', location: 'New York (JFK)', timestamp: '2026-05-15T22:30:00Z', details: 'Shipment processed and prepared for transit.', completed: true },
        { status: 'In Transit', location: 'Atlantic Ocean Crossing', timestamp: '2026-05-16T12:00:00Z', details: 'En route to destination country.', completed: true },
        { status: 'Arrived at Sort Facility', location: 'London (LHR)', timestamp: '2026-05-17T06:15:00Z', details: 'Customs cleared. Sorting in progress.', completed: true },
        { status: 'Delivered', location: 'London, UK', timestamp: '2026-05-18T14:15:00Z', details: 'Delivered and signed by: A. Carter.', completed: true },
      ]
    };

    const mockInTransit: TrackingData = {
      trackingId: id as string,
      status: 'in_transit',
      shipper: 'Fascord Limited HQ',
      recipient: 'Chidi Logistics',
      origin: 'Manchester, UK',
      destination: 'Birmingham, UK',
      estimatedDelivery: '2026-05-21T18:00:00Z',
      currentStep: 2,
      steps: [
        { status: 'Shipment Picked Up', location: 'Manchester Depot', timestamp: '2026-05-19T10:00:00Z', details: 'Shipment has been picked up by the courier.', completed: true },
        { status: 'Processed at Facility', location: 'Manchester Sort Centre', timestamp: '2026-05-19T20:00:00Z', details: 'Sorted and loaded onto linehaul vehicle.', completed: true },
        { status: 'Departed Facility', location: 'Manchester Sort Centre', timestamp: '2026-05-20T04:00:00Z', details: 'Vehicle en route to Birmingham depot.', completed: true },
        { status: 'Arrived at Delivery Depot', location: 'Birmingham East Depot', timestamp: '2026-05-20T11:30:00Z', details: 'Received at delivery facility. Sorting to local courier.', completed: false },
        { status: 'Out for Delivery', location: 'Birmingham, UK', timestamp: 'Pending', details: 'Courier assignment in progress.', completed: false },
      ]
    };

    // Return in_transit as default, unless it starts with "FAS-DEL"
    if (typeof id === 'string' && id.toUpperCase().startsWith('FAS-DEL')) {
      return HttpResponse.json(mockDelivered);
    }

    return HttpResponse.json(mockInTransit);
  }),

  // Mock quote generation api
  http.post('/api/quote', async ({ request }) => {
    interface QuoteRequestBody {
      originCountry?: string;
      destinationCountry?: string;
      weight?: number | string;
    }
    const data = await request.json() as QuoteRequestBody;
    
    // Simulate slight delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const origin = data.originCountry || 'United Kingdom';
    const destination = data.destinationCountry || 'Germany';
    const weight = Number(data.weight) || 1;

    // Calculate mock rate
    const baseRate = origin === destination ? 12.50 : 35.00;
    const weightRate = weight * 4.50;
    const totalExpress = baseRate + weightRate;
    const totalEconomy = (baseRate + weightRate) * 0.75;

    return HttpResponse.json({
      success: true,
      origin,
      destination,
      weight,
      options: [
        {
          id: 'fascord-express',
          name: 'Fascord Priority Express',
          price: totalExpress.toFixed(2),
          currency: 'GBP',
          deliveryDays: '1-2 Days',
          estimatedDelivery: '2026-05-22',
          description: 'Next day delivery to most major cities. Real-time end-to-end tracking.',
        },
        {
          id: 'fascord-standard',
          name: 'Fascord Standard Cargo',
          price: totalEconomy.toFixed(2),
          currency: 'GBP',
          deliveryDays: '3-5 Days',
          estimatedDelivery: '2026-05-25',
          description: 'Cost-effective logistics for non-urgent shipments. Standard tracking included.',
        }
      ]
    });
  }),

  // Mock contact form submission
  http.post('/api/contact', async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return HttpResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. A Fascord logistics agent will contact you within 2 hours.'
    });
  }),
];
