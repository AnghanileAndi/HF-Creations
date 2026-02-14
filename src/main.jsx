import React from 'react'
import { ViteSSG } from 'vite-ssg/react'
import App from './App'
import './index.css'

export const createApp = ViteSSG(
  App,
  { routes: [] }
)
