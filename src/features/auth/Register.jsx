export default function Register() {
    return (
      <div>
        <h2>Register</h2>
        <form>
            <input type="email" placeholder="Email" /><br />
            <input type="text" placeholder="Full Name" /><br />
            <input type="password" placeholder="Password" /><br />
            <select defaultValue="">
                <option value="" disabled>Pilih Role</option>
                <option value="kasir">Kasir</option>
                <option value="admin">Admin</option>
            </select><br />
            <button type="submit">Register</button>
        </form>
      </div>
    )
  }
  