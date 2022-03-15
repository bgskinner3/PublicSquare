// const loginRouter = require('express').Router();
// const User = require('../db/models/User');
// const Order = require('../db/models/Order');

// loginRouter.post('/login', async (req, res, next) => {
//   try {
//     res.send({ token: await User.authenticate(req.body) });
//   } catch (err) {
//     next(err);
//   }
// });
// loginRouter.post('/signup', async (req, res, next) => {
//   try {
//     // const user = await User.create(req.body);

//     // we trust that our users will only pass in a username and password AND our
//     //browser only allows is to form inputs so it shouldnt matter what
//     //we do in the backend becsue we are protected ...right?
//     const { email, password } = req.body;

//     // destructuring both of these helps prevent injection attacks
//     // by way of making the user an admin.
//     const user = await User.create({ email, password });
//     // console.log('user', user)
//     const cart = await Order.create({ status: 'Pending' });
//     user.addOrder(cart.id);
//     res.send({ token: await user.generateToken() });
//   } catch (err) {
//     if (err.name === 'SequelizeUniqueConstraintError') {
//       res.status(401).send('User already exists');
//     } else {
//       next(err);
//     }
//   }
// });

// loginRouter.get('/me', async (req, res, next) => {
//   try {
//     res.send(await User.findByToken(req.headers.authorization));
//   } catch (ex) {
//     next(ex);
//   }
// });

// loginRouter.get('/thisUser', (req, res, next) => {
//   try {
//     res.json(req.user);
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = loginRouter;

// const { User } = require('../db/models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const authResolver = {
//   Mutation: {
//     LoginUser: async (parent, args, context) => {
//       const user = await User.findOne({
//         where: {
//           username: args.username,
//         },
//       });
//     },
//   },
// };


