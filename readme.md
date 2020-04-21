# Folding@home web proxy
When [Folding@home](https://foldingathome.org) operates, its web client is also available at http://127.0.0.1:7396. This client makes API calls to server on intervals to update client status and ongoing work progress then receive status data and display to user.

This proxy is a wrapper on the web client to watch for its API calls and capture response data to use it for your own purposes.

## Response format
### Attributes and their values
```
{
  id: '00',
  status: 'READY' | 'RUNNING' | 'STOPPING' | 'PAUSED',
  description: 'cpu:5' | 'cpu:11' | 'cpu:12',
  options: { idle: 'true', paused: 'true' },
  reason: 'by user' | 'waiting for idle' | 'on battery',
  idle: true,
  unit_id: 0,
  project: 16384,
  run: 96,
  clone: 8,
  gen: 384,
  percentdone: '50.00%',
  eta: '1 hours 50 mins',
  ppd: '65536',
  creditestimate: '9216',
  waitingon: 'unit download' | 'WS Assignment',
  nextattempt: '10.24 secs' | '20 mins 48 secs',
  timeremaining: '7 days' | 'unknown time'
}
```

### `READY` state
#### Wait for new work unit
```
{
  ...
  status: 'READY',
  ...
  waitingon: 'WS Assignment',
  nextattempt: '2 hours 1 mins 21 secs',
  timeremaining: 'unknown time'
}
```

### `RUNNING` state
```
{
  ...
  status: 'RUNNING',
  ...
  project: 14400,
  run: 0,
  clone: 1920,
  gen: 56,
  percentdone: '9.01%',
  eta: '1 hours 55 mins',
  ppd: '69651',
  creditestimate: '6127',
  ...
  timeremaining: '6.99 days'
}
```

### `STOPPING` state
#### By user
```
{
  ...
  status: 'STOPPING',
  ...
  options: { paused: 'true' },
  reason: 'by user',
  ...
}
```

#### Wait for idle
```
{
  ...
  status: 'STOPPING',
  ...
  options: { idle: 'true', paused: 'false' },
  reason: 'waiting for idle',
  idle: true,
  ...
}
```

### `PAUSED` state
#### By user
```
{
  ...
  status: 'PAUSED',
  ...
  options: { paused: 'true' },
  reason: 'by user',
  ...
}
```

#### Wait for idle
```
{
  ...
  status: 'PAUSED',
  ...
  options: { idle: 'true', paused: 'false' },
  reason: 'waiting for idle',
  idle: true,
  ...
}
```

#### On battery
```
{
  ...
  status: 'PAUSED',
  ...
  reason: 'on battery',
  ...
}
```
