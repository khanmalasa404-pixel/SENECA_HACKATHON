export type IncentiveUptakeLikelihood = "low" | "medium" | "high";

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

  // NEW: Renter equity fields from Step 8
  renterPercent: number;
  avgRentMonthly: number;
  rentBurden: number;
  buildingAge: number;
  hasLandlordUpgradeBarrier: boolean;
  renterEnergyBurden: number;
  ownerEnergyBurden: number;
  incentiveUptakeLikelihood: IncentiveUptakeLikelihood;
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
    // Added new fields (estimated based on Step 8's rough data mappings)
    renterPercent: 66,
    avgRentMonthly: 1350,
    rentBurden: 36,
    buildingAge: 1971,
    hasLandlordUpgradeBarrier: true,
    renterEnergyBurden: 10.8,
    ownerEnergyBurden: 4.5,
    incentiveUptakeLikelihood: "low",
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
    // Added new fields
    renterPercent: 58,
    avgRentMonthly: 1420,
    rentBurden: 34,
    buildingAge: 1975,
    hasLandlordUpgradeBarrier: true,
    renterEnergyBurden: 10.1,
    ownerEnergyBurden: 4.2,
    incentiveUptakeLikelihood: "medium",
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
    // Added new fields
    renterPercent: 49,
    avgRentMonthly: 1450,
    rentBurden: 31,
    buildingAge: 1980,
    hasLandlordUpgradeBarrier: false,
    renterEnergyBurden: 8.5,
    ownerEnergyBurden: 4.0,
    incentiveUptakeLikelihood: "medium",
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
    // Added new fields
    renterPercent: 62,
    avgRentMonthly: 1380,
    rentBurden: 35,
    buildingAge: 1968,
    hasLandlordUpgradeBarrier: true,
    renterEnergyBurden: 10.9,
    ownerEnergyBurden: 4.4,
    incentiveUptakeLikelihood: "low",
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
    // Added new fields
    renterPercent: 32,
    avgRentMonthly: 1950,
    rentBurden: 18,
    buildingAge: 1988,
    hasLandlordUpgradeBarrier: false,
    renterEnergyBurden: 5.8,
    ownerEnergyBurden: 3.9,
    incentiveUptakeLikelihood: "high",
  },
];