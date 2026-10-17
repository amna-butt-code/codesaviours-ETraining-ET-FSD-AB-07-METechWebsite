import { solarConfig } from './solarConfig.js';

export function calculateEstimate({ monthlyUnits, summerBill }) {
  const c = solarConfig;
  let units = Number(monthlyUnits) || 0;
  if (!units && Number(summerBill)) units = Number(summerBill) / c.tariffPerUnit;
  if (units <= 0) return null;

  const rawKw = units / (c.daysPerMonth * c.sunHoursPerDay * c.performanceRatio);
  const systemKw = Math.max(1, Math.round(rawKw * 2) / 2);
  const panels = Math.ceil((systemKw * 1000) / c.panelWatt);
  const roofSqft = Math.round(systemKw * c.roofSqftPerKw);
  const generated = systemKw * c.sunHoursPerDay * c.daysPerMonth * c.performanceRatio;
  const savings = Math.round(Math.min(units, generated) * c.tariffPerUnit);

  return { units: Math.round(units), systemKw, panels, roofSqft, savings };
}