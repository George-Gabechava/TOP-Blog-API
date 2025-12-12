import "./CreateUser.css";

function CreateUser() {
  return (
    <div id="LogInContainer">
      <form id="CreateUserForm">
        <label for="username">
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
        />

        <label for="email">
          <b>Email</b>
        </label>
        <input type="email" placeholder="Enter Email" name="email" required />

        <label for="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        />

        <label for="confirmPassword">
          <b>Confirm Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="confirmPassword"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateUser;
