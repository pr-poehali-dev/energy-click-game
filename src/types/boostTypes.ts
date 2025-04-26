import { ReactNode } from 'react';

export interface BoostItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  pointsPerClick: number;
  icon?: ReactNode;
}

export interface BoostState {
  purchased: boolean;
  cost: number;
  pointsPerClick: number;
}

export interface BoostItemWithState extends BoostItem {
  purchased: boolean;
  affordable: boolean;
}
