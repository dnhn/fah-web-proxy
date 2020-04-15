# Folding@home web proxy
When [Folding@home](https://foldingathome.org) is running, its web client is also available at http://127.0.0.1:7396. This client makes API calls to server on intervals to update client status and ongoing work progress then receive status data and display to user.

This proxy is a wrapper on the web client to watch for its API calls and capture response data to use it for your own purposes.

## Response format
```
{
  id: '00',
  status: 'READY' | 'RUNNING' | 'STOPPING' | 'PAUSED',
  description: 'cpu:5' | 'cpu:11' | 'cpu:12',
  options: { idle: 'true', paused: 'true' },
  reason: 'waiting for idle' | 'on battery',
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
  nextattempt: '0.00 secs',
  timeremaining: '7 days' | 'unknown time'
}
```
