import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  const [showChecked, setShowChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit (event) {
    setLoading(true);
    event.preventDefault();
    const [emailNode, passwordNode] = event.target.elements
    const email = emailNode.value
    const pass = passwordNode.value

    login(email, pass)
      .then(() => {
        console.log("success")
        setLoading(false);
      })
      .catch(() => {
        console.log("failure")
        setLoading(false);
      })

  }

  return (
    <div>{loading && <div>loading..</div>}
    <form onSubmit={handleSubmit}>
      <VisuallyHidden>
        <label htmlFor="login:email">Email:</label>
      </VisuallyHidden>
      <input
        type="text"
        id="login:email"
        className="inputField"
        placeholder="you@example.com"
      />

      <VisuallyHidden>
        <label htmlFor="login:password">Password:</label>
      </VisuallyHidden>
      <input
        id="login:password"
        type={showChecked ? "text" : "password"}
        className="inputField"
        placeholder="Password"
      />

      <div>
        <label>
          <input
            className="passwordCheckbox"
            type="checkbox"
            defaultChecked={showChecked}
            onChange={() => setShowChecked(!showChecked)}
          />{" "}
          show password
        </label>
      </div>

      <TabsButton>
        <FaSignInAlt />
        <span>Login</span>
      </TabsButton>
    </form>
    </div>
  )
}
