import "./LogIn.css";

function LogIn() {
  return (
    <div id="LogInContainer">
      <form id="LogInForm">
        <label for="username">
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
        />

        <label for="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LogIn;
