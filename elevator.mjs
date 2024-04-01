/*
The Elevator class utilizes a simple request queue to manage the next requested destination:

- When a rider requests a ride, the rider's current floor and destination floor are added to the queue.
- An interval runs continuously once the Elevator's `turnOn` function is invoked.
- The 100 ms interval ensures optimal user experience by providing responsive behavior for the elevator.
- Every 100 ms:
  - checks if the elevator has reached its destination and if new rides have been requested
  - also checks if the next request is another passenger entering or leaving the elevator
- Every 1 second:
  - The elevator moves to the next floor.
  - If the elevator reaches its destination, its direction is halted.
  - The current time and the elevator's status are logged.
*/

const INTERVAL_100_MS = 100
const INTERVAL_10_MS = 10
const INTERVAL = 1
const TRIP_TYPE = {
    pickUp: 'pick up',
    dropOff: 'drop off'
}

const DIRECTION = {
    up: 1,
    down: -1,
    stopped: 0
}

export default class Elevator {
    constructor(totalFloors) {
        this.totalFloors = totalFloors
        this.time = 0
        this.tripType = ''
        this.currentFloor = 1
        this.destination = 1
        this.direction = DIRECTION.stopped // 0 = stopped, 1 = up, -1 = down
        this.requests = []
        this.intervalId = null
        this.message = ''
        // log at zero time
        this.logElevatorInfo()
    }
    // The elevator is ready after a passenger has entered
    // or it has dropped off a passenger and a new request is in the queue
    isElevatorReadyForNextRequest() {
        return this.direction === DIRECTION.stopped && this.requests.length
    }
    // Add the location of the passenger(s) on the floor to the request queue
    // followed by the destination requested for the passenger(s)
    requestFloor(request) {
        const { fromFloor, toFloor, direction } = request
        // Validate floors
        if (fromFloor < 1 || fromFloor > this.totalFloors || toFloor.some(floor => floor < 1 || floor > this.totalFloors)) {
            throw new Error('Invalid floor number.');
        }
        // Sort requested destinations based on direction
        toFloor.sort((a, b) => (direction === DIRECTION.up) ? a - b : b - a);
        // Add the floor to pick up the passenger(s) first
        this.requests.push({floor: fromFloor, type: TRIP_TYPE.pickUp})
        // Add the destination(s) of the passenger(s)
        for (const floor of toFloor) {
            this.requests.push({floor, type: TRIP_TYPE.dropOff})
        }
        const message = `Request(s) made from floor ${fromFloor} to ${toFloor} going ${this.translateDirection(direction)}`
        this.logElevatorInfo(message)
    }
    // prepares the elevator to move at the next interval and logs the appropriate message
    prepareToMoveElevator(nextFloor) {
        // Set the direction and destination
        this.destination = nextFloor.floor;
        this.tripType = nextFloor.type;
        this.setDirection();
    
        // Generate common phrase for logging
        const commonPhrase = `The elevator is moving from ${this.currentFloor} to ${this.destination} going ${this.translateDirection(this.direction)}`
        
        // Log the elevator's movement and purpose
        if (this.tripType === TRIP_TYPE.pickUp) {
            this.message = `${commonPhrase} to pick up the passenger(s)`
        } else if (this.tripType === TRIP_TYPE.dropOff) {
            this.message = `${commonPhrase} to drop off the passenger(s)`
        }
    }
    // updates the current floor of the elevator
    moveElevator() {
        if (this.destination !== this.currentFloor) {
            this.currentFloor += this.direction;
            // the elevator may be stopped if it reached it's destination 
            this.setDirection()
            // if the elevator is in the stopped state, it has reached it's destination
            // log the type of trip performed
            if (this.direction === DIRECTION.stopped) {
                // this.logElevatorInfo(`The elevator reached ${this.currentFloor} to ${this.tripType} the passenger`)
                this.message = `The elevator reached ${this.currentFloor} to ${this.tripType} the passenger`
                this.tripType = ''
            }
        }
    }
    // The direction of the elevator is determined by the current location in relation to the destination
    setDirection() {
        this.direction = Math.sign(this.destination - this.currentFloor);
    }
    // The `turnOn` function simulates the process of "turning on the elevator," with an interval running every 100 milliseconds. 
    // During each request, the time is incremented, and the elevator's readiness for the next destination and direction is checked. 
    // At every one-second interval, the elevator moves floors, updates its direction, and logs its status.
    turnOn() {
        this.intervalId = setInterval(() => {
            // increment time every 100 ms
            this.time += INTERVAL
            // move to the next request if the countdown has completed
            if (this.isElevatorReadyForNextRequest()) {
                if (this.requests.length) {
                    const nextFloor = this.requests.shift()
                    // No new next floor was found, but a passenger was either picked up or dropped off
                    // continue to the next interval / floor request
                    if (nextFloor.floor === this.currentFloor && this.currentFloor === this.destination) {
                        this.logElevatorInfo(`On the same floor ${this.currentFloor} there was a passenger ${nextFloor.type}`)
                    } else {
                        // prepare the elevator's next move and log the next move type
                        this.prepareToMoveElevator(nextFloor)
                    }
                }
            }
            
            // every one second, move the elevator one floor, and log the elevator stats
            if (this.time % INTERVAL_10_MS === 0) {
                // move the elevator
                this.moveElevator()
                // log the current state of the elevator
                this.logElevatorInfo('')
            }
        }, INTERVAL_100_MS) // 100 ms interval that checks and moves the elevator
    }
    // helper function to make the direction easier to read in the logs
    translateDirection(direction) {
        return direction === DIRECTION.up ? 'up' : direction === DIRECTION.down ? 'down' : 'stopped'
    }
    // log the current floor, pending requests, and direction in human readable terms
    logElevatorInfo(message) {
        console.log(
            {
                time: this.time/10, 
                direction: this.translateDirection(this.direction), 
                currentFloor: this.currentFloor, 
                destination: this.destination,
                requests: this.requests,
                message: message || this.message,
            })
        }
    }
    
    
    