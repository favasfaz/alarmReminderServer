import userSchema from "../modal/user-schema.js";
import { createToken } from "../middleware/tokenMiddleware.js";
import { createError } from "../util/error.js";

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email, password });
    if (!user) {
      next(createError(400, "check your password or email"));
    } else {
      const token = createToken(user.email, user._id);
      return res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(201)
        .json({ token, user });
    }
  } catch (error) {
    next(error);
  }
};

export const userDeteils = async (req, res, next) => {
  const { name, phone, project, email } = req.body;
  try {
    const ifExist = await userSchema.findOne({ phone,project });
    console.log(ifExist,'exist');
    if (ifExist)
      return next(
        createError(400, { phone: ifExist.phone, name: ifExist.name })
      );
    await userSchema.findOneAndUpdate(email, {
      $set: { name, phone, project },
    });
    res.status(200).json("success");
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async(req,res,next) =>{
  const users = await userSchema.find({})
  res.status(201).json(users)
}