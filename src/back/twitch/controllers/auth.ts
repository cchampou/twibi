import User from '../models/User';

// eslint-disable-next-line import/prefer-default-export
export const login = (req, res) => {
  console.log(req.param);

  return res.redirect('/dashboard');
};
