const bcrypt = require('bcrypt');
const { signup, login } = require('./auth');
const { User } = require('./models');
const { createToken } = require('../helpers/tokens');
const { mockReq, mockRes } = require('./testHelpers');



describe('Auth Tests', () => {
  describe('signup', () => {
    it('should create a new user and return a token', async () => {
      const req = mockReq({ username: 'testuser', password: 'password123' });
      const res = mockRes();

      await signup(req, res);

      expect(res.statusCode).toEqual(201);
      expect(res.body.message).toEqual(201);
      expect(res.body.token).toBeDefined();

      const user = await User.findOne({ where: { username: 'testuser' } });
      expect(user).toBeDefined();
      const validPassword = await bcrypt.compare('password123', user.password);
      expect(validPassword).toEqual(true);
    });

    it('should return an error if username already exists', async () => {
      // First, create the user
      const reqCreate = mockReq({ username: 'existinguser', password: 'password123' });
      const resCreate = mockRes();
      await signup(reqCreate, resCreate);

      // Now try to create a user with the same username
      const reqDuplicate = mockReq({ username: 'existinguser', password: 'newpassword123' });
      const resDuplicate = mockRes();
      await signup(reqDuplicate, resDuplicate);

      expect(resDuplicate.statusCode).toBe(400);
      expect(resDuplicate.body.error).toBe('Username already exists');
    });

    it('should return an error if password is missing', async () => {
      const req = mockReq({ username: 'testuser' });
      const res = mockRes();
      await signup(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Password is required');
    });
  });

  describe('login', () => {
    it('should log in an existing user and return a token', async () => {
      // First, create the user
      const reqCreate = mockReq({ username: 'testuser', password: 'password123' });
      const resCreate = mockRes();
      await signup(reqCreate, resCreate);

      // Now log in
      const reqLogin = mockReq({ username: 'testuser', password: 'password123' });
      const resLogin = mockRes();
      await login(reqLogin, resLogin);

      expect(resLogin.statusCode).toBe(200);
      expect(resLogin.body.token).toBeDefined();
    });

    it('should return an error if username is incorrect', async () => {
      const req = mockReq({ username: 'wronguser', password: 'password123' });
      const res = mockRes();
      await login(req, res);

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Invalid username or password');
    });

    it('should return an error if password is incorrect', async () => {
      // First, create the user
      const reqCreate = mockReq({ username: 'testuser', password: 'password123' });
      const resCreate = mockRes();
      await signup(reqCreate, resCreate);

      // Now log in with incorrect password
      const reqLogin = mockReq({ username: 'testuser', password: 'wrongpassword' });
      const resLogin = mockRes();
      await login(reqLogin, resLogin);

      expect(resLogin.statusCode).toBe(401);
      expect(resLogin.body.error).toBe('Invalid username or password');
    });
  });
});
