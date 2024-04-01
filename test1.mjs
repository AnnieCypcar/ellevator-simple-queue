import Elevator from './elevator.mjs'

const elevator = new Elevator(10)
elevator.turnOn()

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Test 1
async function operateElevator() {
  elevator.requestFloor({fromFloor: 3, toFloor: [9,10], direction: 1})
  await delay(1100)
  elevator.requestFloor({fromFloor: 10, toFloor: [1,9], direction: -1})
  await delay(2000)
  elevator.requestFloor({fromFloor: 7, toFloor: [2,3], direction: -1})
}
/*
Test 1 Expected Output:
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
  requests: [
    { floor: 3, type: 'pick up' },
    { floor: 9, type: 'drop off' },
    { floor: 10, type: 'drop off' }
  ],
  message: 'Request(s) made from floor 3 to 9,10 going up'
}
{
  time: 1,
  direction: 'up',
  currentFloor: 2,
  destination: 3,
  requests: [ { floor: 9, type: 'drop off' }, { floor: 10, type: 'drop off' } ],
  message: 'The elevator is moving from 1 to 3 going up to pick up the passenger(s)'
}
{
  time: 1,
  direction: 'up',
  currentFloor: 2,
  destination: 3,
  requests: [
    { floor: 9, type: 'drop off' },
    { floor: 10, type: 'drop off' },
    { floor: 10, type: 'pick up' },
    { floor: 9, type: 'drop off' },
    { floor: 1, type: 'drop off' }
  ],
  message: 'Request(s) made from floor 10 to 9,1 going down'
}
{
  time: 2,
  direction: 'stopped',
  currentFloor: 3,
  destination: 3,
  requests: [
    { floor: 9, type: 'drop off' },
    { floor: 10, type: 'drop off' },
    { floor: 10, type: 'pick up' },
    { floor: 9, type: 'drop off' },
    { floor: 1, type: 'drop off' }
  ],
  message: 'The elevator reached 3 to pick up the passenger'
}
{
  time: 3,
  direction: 'up',
  currentFloor: 4,
  destination: 9,
  requests: [
    { floor: 10, type: 'drop off' },
    { floor: 10, type: 'pick up' },
    { floor: 9, type: 'drop off' },
    { floor: 1, type: 'drop off' }
  ],
  message: 'The elevator is moving from 3 to 9 going up to drop off the passenger(s)'
}
{
  time: 3,
  direction: 'up',
  currentFloor: 4,
  destination: 9,
  requests: [
    { floor: 10, type: 'drop off' },
    { floor: 10, type: 'pick up' },
    { floor: 9, type: 'drop off' },
    { floor: 1, type: 'drop off' },
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'Request(s) made from floor 7 to 3,2 going down'
}
{
  time: 4,
  direction: 'up',
  currentFloor: 5,
  destination: 9,
  requests: [
    { floor: 10, type: 'drop off' },
    { floor: 10, type: 'pick up' },
    { floor: 9, type: 'drop off' },
    { floor: 1, type: 'drop off' },
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'The elevator is moving from 3 to 9 going up to drop off the passenger(s)'
}
{
  time: 5,
  direction: 'up',
  currentFloor: 6,
  destination: 9,
  requests: [
    { floor: 10, type: 'drop off' },
    { floor: 10, type: 'pick up' },
    { floor: 9, type: 'drop off' },
    { floor: 1, type: 'drop off' },
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'The elevator is moving from 3 to 9 going up to drop off the passenger(s)'
}
{
  time: 6,
  direction: 'up',
  currentFloor: 7,
  destination: 9,
  requests: [
    { floor: 10, type: 'drop off' },
    { floor: 10, type: 'pick up' },
    { floor: 9, type: 'drop off' },
    { floor: 1, type: 'drop off' },
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'The elevator is moving from 3 to 9 going up to drop off the passenger(s)'
}
{
  time: 7,
  direction: 'up',
  currentFloor: 8,
  destination: 9,
  requests: [
    { floor: 10, type: 'drop off' },
    { floor: 10, type: 'pick up' },
    { floor: 9, type: 'drop off' },
    { floor: 1, type: 'drop off' },
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'The elevator is moving from 3 to 9 going up to drop off the passenger(s)'
}
{
  time: 8,
  direction: 'stopped',
  currentFloor: 9,
  destination: 9,
  requests: [
    { floor: 10, type: 'drop off' },
    { floor: 10, type: 'pick up' },
    { floor: 9, type: 'drop off' },
    { floor: 1, type: 'drop off' },
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'The elevator reached 9 to drop off the passenger'
}
{
  time: 9,
  direction: 'stopped',
  currentFloor: 10,
  destination: 10,
  requests: [
    { floor: 10, type: 'pick up' },
    { floor: 9, type: 'drop off' },
    { floor: 1, type: 'drop off' },
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'The elevator reached 10 to drop off the passenger'
}
{
  time: 9.1,
  direction: 'stopped',
  currentFloor: 10,
  destination: 10,
  requests: [
    { floor: 9, type: 'drop off' },
    { floor: 1, type: 'drop off' },
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'On the same floor 10 there was a passenger pick up'
}
{
  time: 10,
  direction: 'stopped',
  currentFloor: 9,
  destination: 9,
  requests: [
    { floor: 1, type: 'drop off' },
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'The elevator reached 9 to drop off the passenger'
}
{
  time: 11,
  direction: 'down',
  currentFloor: 8,
  destination: 1,
  requests: [
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'The elevator is moving from 9 to 1 going down to drop off the passenger(s)'
}
{
  time: 12,
  direction: 'down',
  currentFloor: 7,
  destination: 1,
  requests: [
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'The elevator is moving from 9 to 1 going down to drop off the passenger(s)'
}
{
  time: 13,
  direction: 'down',
  currentFloor: 6,
  destination: 1,
  requests: [
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'The elevator is moving from 9 to 1 going down to drop off the passenger(s)'
}
{
  time: 14,
  direction: 'down',
  currentFloor: 5,
  destination: 1,
  requests: [
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'The elevator is moving from 9 to 1 going down to drop off the passenger(s)'
}
{
  time: 15,
  direction: 'down',
  currentFloor: 4,
  destination: 1,
  requests: [
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'The elevator is moving from 9 to 1 going down to drop off the passenger(s)'
}
{
  time: 16,
  direction: 'down',
  currentFloor: 3,
  destination: 1,
  requests: [
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'The elevator is moving from 9 to 1 going down to drop off the passenger(s)'
}
{
  time: 17,
  direction: 'down',
  currentFloor: 2,
  destination: 1,
  requests: [
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'The elevator is moving from 9 to 1 going down to drop off the passenger(s)'
}
{
  time: 18,
  direction: 'stopped',
  currentFloor: 1,
  destination: 1,
  requests: [
    { floor: 7, type: 'pick up' },
    { floor: 3, type: 'drop off' },
    { floor: 2, type: 'drop off' }
  ],
  message: 'The elevator reached 1 to drop off the passenger'
}
{
  time: 19,
  direction: 'up',
  currentFloor: 2,
  destination: 7,
  requests: [ { floor: 3, type: 'drop off' }, { floor: 2, type: 'drop off' } ],
  message: 'The elevator is moving from 1 to 7 going up to pick up the passenger(s)'
}
{
  time: 20,
  direction: 'up',
  currentFloor: 3,
  destination: 7,
  requests: [ { floor: 3, type: 'drop off' }, { floor: 2, type: 'drop off' } ],
  message: 'The elevator is moving from 1 to 7 going up to pick up the passenger(s)'
}
{
  time: 21,
  direction: 'up',
  currentFloor: 4,
  destination: 7,
  requests: [ { floor: 3, type: 'drop off' }, { floor: 2, type: 'drop off' } ],
  message: 'The elevator is moving from 1 to 7 going up to pick up the passenger(s)'
}
{
  time: 22,
  direction: 'up',
  currentFloor: 5,
  destination: 7,
  requests: [ { floor: 3, type: 'drop off' }, { floor: 2, type: 'drop off' } ],
  message: 'The elevator is moving from 1 to 7 going up to pick up the passenger(s)'
}
{
  time: 23,
  direction: 'up',
  currentFloor: 6,
  destination: 7,
  requests: [ { floor: 3, type: 'drop off' }, { floor: 2, type: 'drop off' } ],
  message: 'The elevator is moving from 1 to 7 going up to pick up the passenger(s)'
}
{
  time: 24,
  direction: 'stopped',
  currentFloor: 7,
  destination: 7,
  requests: [ { floor: 3, type: 'drop off' }, { floor: 2, type: 'drop off' } ],
  message: 'The elevator reached 7 to pick up the passenger'
}
{
  time: 25,
  direction: 'down',
  currentFloor: 6,
  destination: 3,
  requests: [ { floor: 2, type: 'drop off' } ],
  message: 'The elevator is moving from 7 to 3 going down to drop off the passenger(s)'
}
{
  time: 26,
  direction: 'down',
  currentFloor: 5,
  destination: 3,
  requests: [ { floor: 2, type: 'drop off' } ],
  message: 'The elevator is moving from 7 to 3 going down to drop off the passenger(s)'
}
{
  time: 27,
  direction: 'down',
  currentFloor: 4,
  destination: 3,
  requests: [ { floor: 2, type: 'drop off' } ],
  message: 'The elevator is moving from 7 to 3 going down to drop off the passenger(s)'
}
{
  time: 28,
  direction: 'stopped',
  currentFloor: 3,
  destination: 3,
  requests: [ { floor: 2, type: 'drop off' } ],
  message: 'The elevator reached 3 to drop off the passenger'
}
{
  time: 29,
  direction: 'stopped',
  currentFloor: 2,
  destination: 2,
  requests: [],
  message: 'The elevator reached 2 to drop off the passenger'
}
*/
operateElevator()
