# Elevator Service

The Elevator Service is a JavaScript service designed to control a single elevator servicing a building with 10 floors.

## Features

- **Real-time Control**: 1 unit of time corresponds to 1 second, ensuring precise control over the elevator's movements.
- **Dynamic Request Handling**: The elevator's `turnOn` function utilizes an interval to continually check for new ride requests in 100 ms intervals, ensuring prompt responses to user demands even while in motion.

- **Fair Queue Management**: The service implements a First In, First Out (FIFO) queue to maintain fairness in handling ride requests. This ensures that users are serviced in the order their requests are received. Respected the order of requests, however, comes with a trade off of an inefficient elevator. Trips could be interrupted, for example, with another passenger joining at a floor along the elevator's path to cut back on energy use of the elevator.

## Future Enhancements

In future iterations, the Elevator Service aims to incorporate the following enhancements:

- **Eco friendly rids**: The elevator can prioritize energy efficiency over expediency of the most recent rider request. The system will analyze patterns of usage and adjust elevator movements to minimize waiting times and energy consumption, providing a more streamlined experience for users.
- **Multi-Elevator Support**: The service will be expanded to support multiple elevators, enabling efficient management of elevator traffic in larger buildings.
- **State-aware Floor Buttons**: Floor buttons will be enhanced to provide visual feedback, indicating the status of the request (on/off), thus improving user experience and interaction.

## How to Run Local Tests

To run the Elevator Service tests, ensure you have a recent version of Node.js installed (16.0 or higher). Then, execute the following command:

```bash
$ node test<test number>.mjs
```

## How to Run Jasmine Tests

Jasmine unit tests are included to make future changes easier without degradation of current behavior.

```bash
$ yarn install
```

```bash
$ yarn test
```

## Expected output

The Elevator produces logs in the folloring format informing the administrator of the location of the elevator, it's destination, trip requested, and remaining pending requests.

```json
{
  "time": 0,
  "direction": "stopped",
  "currentFloor": 1,
  "destination": 1,
  "requests": [
    { "floor": 2, "type": "pick up" },
    { "floor": 5, "type": "drop off" },
    { "floor": 7, "type": "drop off" }
  ],
  "message": "Request(s) made from floor 2 to 5,7 going up"
}
```
