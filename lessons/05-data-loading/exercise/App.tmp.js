import React, { useState, useEffect } from 'react'

import { onAuthStateChanged } from 'app/utils'
import LoggedIn from 'app/LoggedIn'
import LoggedOut from 'app/LoggedOut'

export default function App() {
  const [authAttempted, setAuthAttempted] = useState(false)
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    return onAuthStateChanged(auth => {
        setAuthAttempted(true)
        setAuth(auth)
    })
  }, [auth])

  // if (!authAttempted) {
  //   return <p>Authenticating...</p>
  // }

  return (
    <div className="Layout">
      {auth ? <LoggedIn auth={auth} /> : <LoggedOut />}
    </div>
  )
}
