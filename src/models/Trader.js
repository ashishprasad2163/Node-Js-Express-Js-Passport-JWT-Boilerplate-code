import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';

const TraderSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      validate: {
        validator: (username) => Trader.dontExist({ username }),
        message: ({ value }) => `Username ${value} has been already taken.`,
      },
    },
    password: {
      index: true,
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

TraderSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 12);
  }
});

TraderSchema.statics.dontExist = async function (options) {
  return (await this.where(options).countDocuments()) === 0;
};

TraderSchema.methods.isMatch = async function (password) {
  return await compare(password, this.password);
};

const Trader = model('traders', TraderSchema);
export default Trader;
