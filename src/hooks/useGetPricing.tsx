import { IPricing } from '../interfaces/pricing';

export function useGetPricing(): IPricing[] {
  return [
    {
      title: 'personnel',
      price: 100,
      diskSpace: 1,
      monthlyBandwith: 10,
      accounts: 2,
      subdomainsLimit: true,
      freeSupport: false
    },
    {
      title: 'Developers',
      price: 150,
      diskSpace: 5,
      monthlyBandwith: 25,
      accounts: 5,
      subdomainsLimit: true,
      freeSupport: false
    },
    {
      title: 'Premium',
      price: 200,
      diskSpace: 10,
      monthlyBandwith: 100,
      accounts: 20,
      subdomainsLimit: true,
      freeSupport: true
    }
  ];
}
