// AUTHENTICATION
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

/*
// @route   GET api/users/test
// @desc    Test the users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users works...' }));
*/
/*
// @route   POST api/users/register
// @desc    Register the user
// @access  Public
router.post(
  '/register',
  // validation
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Enter a password with 6 or more characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check for existing user
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'Email already in use' });
      }
      // create new user
      user = new User({
        email,
        password,
      });
      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // save user
      await user.save();
      // create payload to pass to jwt after registration
      const payload = {
        user: {
          id: user.id,
        },
      };
      // sign jwt token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 604800,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);
*/

// @route   POST api/users/login
// @desc    Login the user / return the JWT
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Enter a valid password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check for existing user
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
      // compare passwords
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid password' });
      }

      // send token
      const payload = {
        user: {
          id: user.id,
        },
      };
      // sign jwt token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 604800,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route   GET api/users/current
// @desc    return logged in user
// @access  Private
router.get('/current', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
