export const solarConfig = {
  sunHoursPerDay: 5,
  performanceRatio: 0.8,
  panelWatt: 550,
  roofSqftPerKw: 100,
  tariffPerUnit: 45, // PKR per unit, placeholder. Update with the current tariff.
  daysPerMonth: 30,
};

export const cities = [
  'Faisalabad', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan',
  'Gujranwala', 'Sialkot', 'Peshawar', 'Quetta', 'Hyderabad', 'Sargodha',
  'Bahawalpur', 'Sahiwal', 'Sukkur', 'Other',
];

export const customerTypes = ['Residential', 'Commercial', 'Industrial'];
export const propertyTypes = ['House', 'Factory roof', 'Shop/Office', 'Farm'];
export const systemTypes = ['On-grid', 'Off-grid', 'Hybrid'];
export const sizeUnits = ['marla', 'kanal'];
export const contactMethods = ['Phone call', 'WhatsApp', 'Email'];