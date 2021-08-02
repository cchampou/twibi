// eslint-disable-next-line import/prefer-default-export
export const login = (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.param);

  return res.redirect('/dashboard');
};
