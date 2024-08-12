const mongoose = require("mongoose");

const STATUSES = ["todo", "doing", "done"];

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    status: { type: String, enum: STATUSES, default: "todo" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

taskSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("Task", taskSchema);
module.exports.STATUSES = STATUSES;
