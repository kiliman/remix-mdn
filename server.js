import { createEventHandler } from '@remix-run/cloudflare-workers'
import * as build from '@remix-run/dev/server-build'
console.log('server')
addEventListener(
  'fetch',
  createEventHandler({ build, mode: process.env.NODE_ENV }),
)
