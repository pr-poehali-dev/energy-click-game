import { BoostItem } from '@/types/boostTypes';
import { Zap, Star, Rocket, Flame, Diamond } from 'lucide-react';
import React from 'react';

export const BASIC_BOOSTS: BoostItem[] = [
  { 
    id: 'boost1', 
    name: 'Злой Смайл', 
    description: 'Двойная энергия', 
    icon: <Zap size={20} />,
    cost: 100,
    pointsPerClick: 5,
  },
  { 
    id: 'boost2', 
    name: 'Неоновый Призрак', 
    description: 'Тройная энергия', 
    icon: <Flame size={20} />,
    cost: 500,
    pointsPerClick: 10,
  },
  { 
    id: 'boost3', 
    name: 'Тёмный Дух', 
    description: 'Мощь тьмы', 
    icon: <Rocket size={20} />,
    cost: 1500,
    pointsPerClick: 50,
  },
];

export const PREMIUM_BOOSTS: BoostItem[] = [
  { 
    id: 'boost4', 
    name: 'Ночной Кошмар', 
    description: 'Страх приносит силу', 
    icon: <Star size={20} />,
    cost: 5000,
    pointsPerClick: 100,
  },
  { 
    id: 'boost5', 
    name: 'Эфирный Террор', 
    description: 'Ужас из бездны', 
    icon: <Diamond size={20} />,
    cost: 15000,
    pointsPerClick: 500,
  },
  { 
    id: 'boost6', 
    name: 'Кровавая Луна', 
    description: 'Тёмная энергия', 
    icon: <Zap size={20} />,
    cost: 50000,
    pointsPerClick: 2000,
  },
  { 
    id: 'boost7', 
    name: 'Бездна Отчаяния', 
    description: 'Пожиратель душ', 
    icon: <Star size={20} />,
    cost: 200000,
    pointsPerClick: 10000,
  },
  { 
    id: 'boost8', 
    name: 'Пустота Хаоса', 
    description: 'Разрушение реальности', 
    icon: <Rocket size={20} />,
    cost: 1000000,
    pointsPerClick: 50000,
  },
];
