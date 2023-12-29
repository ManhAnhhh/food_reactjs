const Login = () => {
  return (
    <>
      <div className="login">
        <div className="login__container">
          <h1>Đăng Nhập</h1>
          <form>
            <h5>Email</h5>
            <input type="text" className="input-login-username" />
            <h5>Password</h5>
            <input type="password" className="input-login-password" />
            <button type="submit" className="login__signInButton">Đăng Nhập</button>
          </form>
          <a href="./signup.html" className="login__registerButton">Tạo tài khoản mới</a>
        </div>
      </div>

    </>
  )
}
export default Login;