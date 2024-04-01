import Elevator from './elevator.mjs'

const elevator = new Elevator(10)
elevator.turnOn()

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Test 0
async function operateElevator() {
  // toFloor is an array because multiple passenger destinations can be requested
  elevator.requestFloor({fromFloor: 3, toFloor: [2], direction: -1})
  await delay(1100)
  elevator.requestFloor({fromFloor: 10, toFloor: [1], direction: -1})
}
/*
Test 0 Expected Output:
{
  time: 0,
  direction: 'stopped',
  currentFloor: 1,
  destination: 1,
  requests: [],
  message: ''
}
{
  time: 0,
  direction: 'stopped',
  currentFloor: 1,
  destination: 1,
  requests: [ { floor: 3, type: 'pick up' }, { floor: 2, type: 'drop off' } ],
  message: 'Request(s) made from floor 3 to 2 going down'
}
{
  time: 1,
  direction: 'up',
  currentFloor: 2,
  destination: 3,
  requests: [ { floor: 2, type: 'drop off' } ],
  message: 'The elevator is moving from 1 to 3 going up to pick up the passenger(s)'
}
{
  time: 1,
  direction: 'up',
  currentFloor: 2,
  destination: 3,
  requests: [
    { floor: 2, type: 'drop off' },
    { floor: 10, type: 'pick up' },
    { floor: 1, type: 'drop off' }
  ],
  message: 'Request(s) made from floor 10 to 1 going down'
}
{
  time: 2,
  direction: 'stopped',
  currentFloor: 3,
  destination: 3,
  requests: [
    { floor: 2, type: 'drop off' },
    { floor: 10, type: 'pick up' },
    { floor: 1, type: 'drop off' }
  ],
  message: 'The elevator reached 3 to pick up the passenger'
}
{
  time: 3,
  direction: 'stopped',
  currentFloor: 2,
  destination: 2,
  requests: [ { floor: 10, type: 'pick up' }, { floor: 1, type: 'drop off' } ],
  message: 'The elevator reached 2 to drop off the passenger'
}
{
  time: 4,
  direction: 'up',
  currentFloor: 3,
  destination: 10,
  requests: [ { floor: 1, type: 'drop off' } ],
  message: 'The elevator is moving from 2 to 10 going up to pick up the passenger(s)'
}
{
  time: 5,
  direction: 'up',
  currentFloor: 4,
  destination: 10,
  requests: [ { floor: 1, type: 'drop off' } ],
  message: 'The elevator is moving from 2 to 10 going up to pick up the passenger(s)'
}
{
  time: 6,
  direction: 'up',
  currentFloor: 5,
  destination: 10,
  requests: [ { floor: 1, type: 'drop off' } ],
  message: 'The elevator is moving from 2 to 10 going up to pick up the passenger(s)'
}
{
  time: 7,
  direction: 'up',
  currentFloor: 6,
  destination: 10,
  requests: [ { floor: 1, type: 'drop off' } ],
  message: 'The elevator is moving from 2 to 10 going up to pick up the passenger(s)'
}
{
  time: 8,
  direction: 'up',
  currentFloor: 7,
  destination: 10,
  requests: [ { floor: 1, type: 'drop off' } ],
  message: 'The elevator is moving from 2 to 10 going up to pick up the passenger(s)'
}
{
  time: 9,
  direction: 'up',
  currentFloor: 8,
  destination: 10,
  requests: [ { floor: 1, type: 'drop off' } ],
  message: 'The elevator is moving from 2 to 10 going up to pick up the passenger(s)'
}
{
  time: 10,
  direction: 'up',
  currentFloor: 9,
  destination: 10,
  requests: [ { floor: 1, type: 'drop off' } ],
  message: 'The elevator is moving from 2 to 10 going up to pick up the passenger(s)'
}
{
  time: 11,
  direction: 'stopped',
  currentFloor: 10,
  destination: 10,
  requests: [ { floor: 1, type: 'drop off' } ],
  message: 'The elevator reached 10 to pick up the passenger'
}
{
  time: 12,
  direction: 'down',
  currentFloor: 9,
  destination: 1,
  requests: [],
  message: 'The elevator is moving from 10 to 1 going down to drop off the passenger(s)'
}
{
  time: 13,
  direction: 'down',
  currentFloor: 8,
  destination: 1,
  requests: [],
  message: 'The elevator is moving from 10 to 1 going down to drop off the passenger(s)'
}
{
  time: 14,
  direction: 'down',
  currentFloor: 7,
  destination: 1,
  requests: [],
  message: 'The elevator is moving from 10 to 1 going down to drop off the passenger(s)'
}
{
  time: 15,
  direction: 'down',
  currentFloor: 6,
  destination: 1,
  requests: [],
  message: 'The elevator is moving from 10 to 1 going down to drop off the passenger(s)'
}
{
  time: 16,
  direction: 'down',
  currentFloor: 5,
  destination: 1,
  requests: [],
  message: 'The elevator is moving from 10 to 1 going down to drop off the passenger(s)'
}
{
  time: 17,
  direction: 'down',
  currentFloor: 4,
  destination: 1,
  requests: [],
  message: 'The elevator is moving from 10 to 1 going down to drop off the passenger(s)'
}
{
  time: 18,
  direction: 'down',
  currentFloor: 3,
  destination: 1,
  requests: [],
  message: 'The elevator is moving from 10 to 1 going down to drop off the passenger(s)'
}
{
  time: 19,
  direction: 'down',
  currentFloor: 2,
  destination: 1,
  requests: [],
  message: 'The elevator is moving from 10 to 1 going down to drop off the passenger(s)'
}
{
  time: 20,
  direction: 'stopped',
  currentFloor: 1,
  destination: 1,
  requests: [],
  message: 'The elevator reached 1 to drop off the passenger'
}
*/
operateElevator()
