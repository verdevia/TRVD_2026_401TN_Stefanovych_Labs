const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async signUp({ username, email, password }) {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error("Email already registered");
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      username,
      email,
      password_hash,
    });

    return user;
  }

  async signIn({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new Error("Invalid credentials");

    const token = jwt.sign(
      {
        userId: user.user_id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token };
  }
}

module.exports = AuthService;