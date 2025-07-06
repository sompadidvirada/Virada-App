import { Redirect, Slot } from 'expo-router'
import React from 'react'

export default function _layout() {
    const isAuthentication = false

    if(!isAuthentication) return <Redirect href={"/sing-in"} />
  return <Slot />
}