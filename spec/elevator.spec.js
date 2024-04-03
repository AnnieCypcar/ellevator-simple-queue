import Elevator from '../elevator.mjs'

jasmine.clock().install()

describe('Elevator', () => {
    let elevator;

    beforeEach(() => {
        elevator = new Elevator(10);
    });

    afterEach(() => {
        clearInterval(elevator.intervalId);
    });

    it('requestFloor() adds the request to queue', () => {
        elevator.requestFloor({ fromFloor: 2, toFloor: [5, 7], direction: 1 });
        expect(elevator.requests).toEqual([{ floor: 2, type: 'pick up' }, { floor: 5, type: 'drop off' }, { floor: 7, type: 'drop off' }]);
    });

    it('turnOn() moves the elevator and logs info', () => {
        const consoleSpy = spyOn(console, 'log');

        elevator.requestFloor({ fromFloor: 2, toFloor: [5, 7], direction: 1 });
        elevator.turnOn();

        jasmine.clock().tick(7000); // Move elevator for 7 seconds

        expect(consoleSpy.calls.count()).toBe(8); // Logs every second plus info log
        expect(consoleSpy.calls.argsFor(0)[0]).toEqual(
            { time: 0, 
                direction: 'stopped', 
                currentFloor: 1, 
                destination: 1, 
                requests: [  ], 
                message: 'Request(s) made from floor 2 to 5,7 going up' 
            }
        );
        expect(consoleSpy.calls.argsFor(1)[0]).toEqual(
            { time: 1, 
                direction: 'stopped', 
                currentFloor: 2, 
                destination: 2, 
                requests: [  ], 
                message: 'The elevator reached 2 to pick up the passenger' 
            }
        );
        expect(consoleSpy.calls.argsFor(7)[0]).toEqual(
            { time: 7, 
                direction: 'stopped', 
                currentFloor: 7, 
                destination: 7, 
                requests: [  ], 
                message: 'The elevator reached 7 to drop off the passenger' 
            }
        );

        consoleSpy.calls.reset();
    });

    it('moveElevator() moves the elevator to destination floor', () => {
        elevator.destination = 5;
        elevator.direction = 1;
        elevator.moveElevator();
        expect(elevator.currentFloor).toBe(2); // Elevator moves up by 1 floor

        elevator.destination = 3;
        elevator.direction = -1;
        elevator.moveElevator();
        expect(elevator.currentFloor).toBe(1); // Elevator moves down by 1 floor
    });

    it('translateDirection() should return correct direction string', () => {
        expect(elevator.translateDirection(1)).toBe('up');
        expect(elevator.translateDirection(-1)).toBe('down');
        expect(elevator.translateDirection(0)).toBe('stopped');
    });
});
