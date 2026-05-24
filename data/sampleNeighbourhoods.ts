export type Neighbourhood = {
  name: string;
  city: string;
  avgMonthlyBill: number;
  medianIncome: number;
  outageCount: number;
  buildingAgeScore: number;
  heatRiskScore: number;
  programAccessScore: number;
  lowIncomeHouseholdPercent: number;
  seniorPopulationPercent: number;
  evChargerAccessScore: number;
  solarPotentialScore: number;
  coolingCentreAccessScore: number;
};

export const sampleNeighbourhoods: Neighbourhood[] = [
  {
    name: "Jane-Finch",
    city: "Toronto",
    avgMonthlyBill: 178,
    medianIncome: 42000,
    outageCount: 7,
    buildingAgeScore: 8,
    heatRiskScore: 9,
    programAccessScore: 3,
    lowIncomeHouseholdPercent: 38,
    seniorPopulationPercent: 17,
    evChargerAccessScore: 2,
    solarPotentialScore: 7,
    coolingCentreAccessScore: 3,
  },
  {
    name: "Malton",
    city: "Mississauga",
    avgMonthlyBill: 165,
    medianIncome: 48000,
    outageCount: 5,
    buildingAgeScore: 7,
    heatRiskScore: 7,
    programAccessScore: 4,
    lowIncomeHouseholdPercent: 31,
    seniorPopulationPercent: 14,
    evChargerAccessScore: 3,
    solarPotentialScore: 8,
    coolingCentreAccessScore: 4,
  },
  {
    name: "Downtown Brampton",
    city: "Brampton",
    avgMonthlyBill: 152,
    medianIncome: 52000,
    outageCount: 4,
    buildingAgeScore: 6,
    heatRiskScore: 6,
    programAccessScore: 5,
    lowIncomeHouseholdPercent: 27,
    seniorPopulationPercent: 12,
    evChargerAccessScore: 4,
    solarPotentialScore: 7,
    coolingCentreAccessScore: 5,
  },
  {
    name: "Rexdale",
    city: "Toronto",
    avgMonthlyBill: 171,
    medianIncome: 45000,
    outageCount: 6,
    buildingAgeScore: 8,
    heatRiskScore: 8,
    programAccessScore: 3,
    lowIncomeHouseholdPercent: 35,
    seniorPopulationPercent: 16,
    evChargerAccessScore: 2,
    solarPotentialScore: 6,
    coolingCentreAccessScore: 3,
  },
  {
    name: "Port Credit",
    city: "Mississauga",
    avgMonthlyBill: 139,
    medianIncome: 79000,
    outageCount: 2,
    buildingAgeScore: 4,
    heatRiskScore: 4,
    programAccessScore: 7,
    lowIncomeHouseholdPercent: 13,
    seniorPopulationPercent: 19,
    evChargerAccessScore: 7,
    solarPotentialScore: 6,
    coolingCentreAccessScore: 8,
  },
];