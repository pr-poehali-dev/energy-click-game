
export type BoostType = {
  id: string;
  name: string;
  description: string;
  cost: number;
  power: number;
  purchased: boolean;
  type: 'click' | 'auto';
};

export type ClickAnimationType = {
  x: number;
  y: number;
  value: number;
  type: 'click' | 'auto';
};

export type AnimationItem = ClickAnimationType & {
  id: number;
};
