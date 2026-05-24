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

  // Problem Statement 01 fields
  renterHouseholdPercent: number;
  ownerOccupiedPercent: number;
  retrofitEligibilityGapScore: number;
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
    renterHouseholdPercent: 66,
    ownerOccupiedPercent: 34,
    retrofitEligibilityGapScore: 82,
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
    renterHouseholdPercent: 58,
    ownerOccupiedPercent: 42,
    retrofitEligibilityGapScore: 74,
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
    renterHouseholdPercent: 49,
    ownerOccupiedPercent: 51,
    retrofitEligibilityGapScore: 63,
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
    renterHouseholdPercent: 62,
    ownerOccupiedPercent: 38,
    retrofitEligibilityGapScore: 79,
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
    renterHouseholdPercent: 32,
    ownerOccupiedPercent: 68,
    retrofitEligibilityGapScore: 38,
  },
];