const SignupForm = ({onSignUp}) => {

  const handleSubmit = () => {
    let fakeData = {
      username: "fakeuser1",
      email: "fake1@mail.com",
      password: "password1"
    }
    onSignUp(fakeData)
  }
  return (
  <>
    <h1>Signup Form</h1>
    <button onClick={handleSubmit}>
      Submit
    </button>
  </>)

}

export default SignupForm;
