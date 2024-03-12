const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    console.log(error);
    res.status.json({ msg: "validation failed" });
  }
};

module.exports = validate