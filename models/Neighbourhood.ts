import mongoose, { Schema } from "mongoose";

const NeighbourhoodSchema = new Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    avgMonthlyBill: { type: Number, required: true },
    medianIncome: { type: Number, required: true },
    outageCount: { type: Number, required: true },
    buildingAgeScore: { type: Number, required: true },
    heatRiskScore: { type: Number, required: true },
    programAccessScore: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Neighbourhood ||
  mongoose.model("Neighbourhood", NeighbourhoodSchema);
