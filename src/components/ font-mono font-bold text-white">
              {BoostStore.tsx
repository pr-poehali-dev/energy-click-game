
import { ButtontoString().padStart(6 } from '@/components/, '0')}ui/button';
            </div>
          </div>
        </div>
import { useState } from 'react
      </div>';
import { Ch
      
      {evronLeft, ChevronRight/* Анимация очков */}
      , Zap,{showAnimation && (
        <PointsAnimation 
          value={clickState.point Star, Rocket, FlamesPerClick} 
          x={animationPosition., Diamond, Coffee, Lightningx} 
          y={animationPosition, Power } from 'luc.y}
        />
      ide-react';

interface BoostProps)}
      
      {/* {
  id: string;
  name: string;
  description: string; Основная кнопка для
  cost: number;
  points клика */}
      <divPerClick: number;
  purchased: boolean;
  affordable className="flex-1 flex items: boolean;
  onPurchase:-center justify-center z (id: string) => void;
  -10">
        <Button 
          onClick={handleClick}
          className="bordericon?: React.ReactNode;-0 bg-transparent hover
}

const Boost: React.FC<BoostProps:bg-transparent p> = ({ 
  id,-0 transition transform hover:scale-105 name, description, cost, pointsPerClick, active:scale-95  purchased, affordable, onPurchase, icon
}) => {
  relative group"
        return (
    <div>
          {/* Не className={`p-3оновая обводка */} rounded-lg border
          <div className="absolute inset-0 ${purchased 
      ? ' w-full h-full rounded-full border border-white opacitybg-black border-blue-30 group-hover:opacity-80 transition-opacity"-400/30' 
      :
            style={{
              boxShadow: ' affordable 
        ? 0 0 15px 5px rgba(255,255,255,'bg-black border-white/50 0.3)',
            hover:border-white}}
          ></div>
          ' 
        : 'bg-black
          {/* Изображение эн border-white/20ергетика */}
          <div className'
      } transition="w-48 h-64-all duration-300  flex items-center justify-center relative">
            <imgmb-2`} 
              src="https://cdn.po
    >
      <div className="flexehali.dev/files/f2f justify-between items-center7d2db-">
        <div2634-42ab-a32d- className="flex gap-3 f897d13aeitems-center">5ce.jpg"
          <div className={
              alt="Energy Drink"
              className="w-full`${affordable && !purchased ? ' h-full object-contain transitiontext-white' : 'text-white-all"
            />
          /50'} opacity</div>
        </Button>
      -80`}>
            {icon</div>
      
      {/* || <Zap size={ Кнопка магазина б20} />}
          устов */}
      </div>
          <div><div 
        className="mb
            <h3 className={-10 z-10`text-lg font-bold ${affordable && !purchase"
        style={{
          transform: `translate(${moved ? 'text-white' : 'text-white/50Offset.x * '}`}>{name}</h3>0.5}px, ${move
            <p className="Offset.y * text-sm text-white/700.3}px)`,">{description}</p
          transition: 'transform 0.2>
            <ps ease-out'
        }}
       className="text-xs>
        <Button 
          onClick={() => setStoreOpen text-white/80 mt-1">(true)}
          +{pointsPerClickvariant="outline"
          className="px} за клик</p>
          </div>-6 py-3
        </div> bg-transparent border border-white/50 
        <Button
          onClick={() => onhover:border-whitePurchase(id)}
          disable text-white rounded-full shadow-[0_d={purchased || !affordable}
          0_15px_rgba(255,255variant="outline"
          className={`ml,255,0.2)] hover:shadow-4 ${purchased -[0_0
            ? '_20px_rgbaborder-blue-400/(255,255,255,0.330 bg-blue-900)] hover:bg-white/10 /10 text-whitefont-bold text-lg transition/50 cursor-not-allowed'-all"
        > 
            : affordable 
              ? 
          <span className="mr-'border-white bg-black2">⚡</span> Магазин text-white hover:bg-white/10' Бустов
        </Button>
       
              : 'border-white/30</div>
      
      {/* Магазин бустов text-red-300 */}
      <Dialog open={store cursor-not-allowed'Open} onOpenChange={setStore
            }`}
        >Open}>
        <DialogContent className
          {purchased ?="bg-black border 'Куплено' : `-white/20 text${cost.toLoc-white shadow-[0_0aleString()} очк_25px_rgba(255.`}
        ,255,255,0.2)]"></Button>
      </div>
    
          <DialogHeader>
            <Dialog</div>
  );
};

interface Title className="text-centerBoostStoreProps {
  boosts: {
    [ text-2xl font-key: string]: {
      purchased: booleanbold text-white">;
      cost:
              Магазин Бустов number;
      pointsPerClick: number
            </DialogTitle>
            <DialogDescription;
    }
  };
   className="text-centerpoints: number;
  onPurchase text-white/70">
              Пок: (id: string) => void;
}

const BoostStore:упай бусты, React.FC чтобы получ<BoostStoreProps> = ({ boostsать больше очков за кл, points, onPик!
            urchase }) => {</DialogDescription>
          </DialogHeader>
  const [page, setPage] = useState(0);
          
          <BoostStore 
            boosts={clickState.
  
  //boosts} 
            points={clickState.points Страница обычных бустов} 
            onPurchase={purch
  const basicBoostaseBoost} 
          />
          
          {Items = [
    { 
      id: errorMessage && (
            <div className="mt-4 p-2'boost1', 
      name: 'Энергет border border-whiteический гель', 
      /30 rounded-mdescription: 'Базовое улучшение клd text-center text-white/80ика', 
      icon: <Coffee size={20} / animate-pulse">
              {error>,
      cost: 100,
      Message}
            </div>
          )}pointsPerClick:
        </DialogContent> 5,
      purchased: boosts.
      </Dialog>

      {/* Диboost1?.purchased || false
    },
    { 
      id:алог настроек */} 'boost2', 
      name:
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
         'Двойной за<DialogContent className="ряд', 
      description: 'Умbg-black border-white/20 textножает энергию x-white shadow-[0_0_25px_rgba(2552', 
      icon: <Lightning size,255,255,0.2)]">={20} />,
      cost: 
          <DialogHeader>
            <Dialog500,
      pointsPerClick: Title className="text-center text-2xl10,
      purchased: boosts.boost font-bold text-white">
              2?.purchased || false
    },
    Настройки
            { 
      i</DialogTitle>d: 'boost3', 
      name
          </DialogHeader>
          
          <div: 'Тройной э className="py-4 textффект', 
      description: '-center">
            <p className="text-whiteМощное /70 mb-ускорение x3', 
      4">
              Здicon: <Flame size={20}есь будут настройки в />,
      cost: 1500,
      pointsPer будущих обновленияхClick: 50,
      purchased: bo
            </p>
            osts.boost3?.<div className="p-3purchased || false
    },
    { 
      id:  rounded-lg border border-white/30'boost4', 
      name:  bg-black/50">'Экстра конц
              <p className="text-whiteентрат', 
      description: 'Особая формула x/80 font-medium5', 
      icon">
                Разработчик: тел: <Zap size={20} />,
      costеграмм @origcrime
              </p>: 5000,
      pointsPer
            </div>Click: 100,
      purchased: boosts.boost4?.purchased || false
          </div>
        </DialogContent
    },
    { 
      id: 'boost5',>
      </Dialog>
    </div 
      name:>
  );
};

export default Game 'Энергетический ш;
</pp-contentторм', 
      >
</pp-description: 'code>

<pp-code>
<pp-filepathМаксимальная эн>src/components/BoostStore.ергия x10', 
      icon:tsx</pp-filepath>
<pp- <Power size={20} /content>
import {>,
      cost: Button } from '@/components/ 15000,
      pointui/button';sPerClick: 500,
      purchase
import { useState } from 'reactd: boosts.boost5?.purchased || false';
import { ChevronLeft
    },
  , ChevronRight];
  
  // Страница премиум бустов
  const premiumBoostItems = [
    , Zap, Star{ 
      id: 'boost6', 
      name, Rocket, Flame: 'Ат, Diamond } from 'lucомный заряд', 
      description: 'ide-react';

interface BoostProps {
  id: string;
  Ядерная энергия x20name: string;
  description: string;', 
      icon
  cost: number;
  points: <Star size={20} /PerClick: number;>,
      cost: 50000,
  purchased: boolean;
  affordable
      pointsPerClick: boolean;
  onPurchase:: 2000,
      purchased: boosts.boost6?. (id: string) => voipurchased || false
    },
    { 
      id: 'boost7', d;
  icon?: React.ReactNode;
}

const
      name: 'Кв Boost: React.FC<BoostProps> = ({ 
  id,антовый ускоритель', name, description, cost, 
      description: 'Эн pointsPerClick, purchased, affordable, onPurchase, iconергия будущего x50', 
      icon: <Diamond size={20} />,
      cost:
}) => {
   200000,
      pointsPerClickreturn (
    <div: 10000,
      purchased: boosts.boost7?.purchased || false
     className={`p-3 rounded-lg border},
    { 
      id: 'boost8', 
      name:  ${purchased 
      ? ''Космический импульс', 
      description:bg-black border-white/30' 'Межгалактическая 
      : affordable 
        ?  мощь x100', 
      icon:'bg-black border <Rocket size={20} />,-white/50 
      cost: 1hover:border-white000000,
      ' 
        :pointsPerClick: 'bg-black border 50000,
      purchased: boosts-white/20'.boost8?.purchased || false
    },
    { 
      id: '
      } transition-allboost9', 
      name: 'Сверхновая энергия', duration-300 mb-3 
      description:`}
    >
       'Сила<div className="flex justify-between items-center звёздного взры">
        <div className="flex gapва x500', 
      icon-3 items-center">
          <div className={: <Star size={20} />,
      cost: 5000000,
      pointsPerClick: 200000,
      purchased: boosts.boost9`${affordable && !purchased ? 'text?.purchased || false
    },
    {-white' : 'text- 
      id: 'boost10',white/50'} opacity 
      name: 'Чё-80`}>рная дыра', 
      description
            {icon || <Zap size={20: 'Бесконечная эн} />}
          </div>
          ергия x1000', 
      icon<div>
            <h3: <Power size={20} / className={`text>,
      cost: 20000000,
      pointsPerClick:-lg font-bold ${affordable && !purchase 1000000,
      purchased: bod ? 'text-white' : 'text-white/50osts.boost10?.purchased || false
    },
  ];'}`}>{name}</h3>
  
  const currentBoosts = page ===
            <p className="text-sm 0 ? basic text-white/70">{description}</pBoostItems : premiumBoostItems;
  
  return (
    >
            <p className="text-xs<div className="space text-white/80 mt-1">-y-4 mt+{pointsPerClick} за клик</p>-2">
      <div
          </div>
        </div> className="space-y-1 max-h-[
        <Button
          onClick={() => onPurch400px] overflow-yase(id)}-auto pr-2">
        {currentBoosts.map((boost) =>
          disabled={purchased || !affordable}
           (
          <Boost
            key={boost.variant="outline"
          classNameid}
            id={boost.id}
            name={boost={`ml-4 ${purchased 
            ? '.name}
            description={boost.description}
            cost={boost.cost}border-white/30 text-white/
            pointsPerClick={boost.points30 cursor-not-allowed'PerClick}
            purchased={boost.purchase 
            : affordabled}
            affordable={ 
              ? 'border-white textpoints >= boost.cost}
            onP-white hover:bgurchase={onP-white/10'urchase}
            icon={boost.icon 
              : 'border-white/}
          />30 text-white/
        ))}
      </div>
      30 cursor-not-allowed'
            
      <div className="flex justify}`}
        >
          {purchase-between items-center pt-2 border-t border-d ? (
            <span classNamewhite/20">
        <Button="text-white/60 
          onClick={() => setPage(0">Куплено</span>
          )}
          disabled={page === 0}
          variant=") : (
            <span classNameoutline"
          className={`border-white/={affordable ? "text-green50 ${page === 0 -400" : "text-? 'bg-white/5red-400"}> text-white/50
              {cost.toLocaleString' : 'bg-transparent text-white hover()} ₽
            </span>
          )}:bg-white/10'
        </Button>}`}
        >
      </div>
          <Chev
    </div>
  );
};ronLeft className="mr

interface BoostStoreProps {
  boosts: {-1 h-4
    [key: w-4" />
          Об string]: {
      purchased: boolean;
      cost: number;ычные
        </Button>
      pointsPerClick: number;
    }
  };
        
        <div className="text
  points: number;
  onP-xs text-white/80urchase: (id: string) => voi">
          {page +d;
}

const 1}/2
        </div BoostStore: React.FC<BoostStoreProps>
        
        <Button> = ({ boosts, points, onP
          onClick={() => setPage(1)}urchase }) => {
          disabled={page ===
  const [page 1}
          , setPage] =variant="outline" useState(0);
  
          className={`border-white/50 ${page === 1 ? 'bg-white/5 
  // Страница обычных бустовtext-white/50' : 'bg-transparent text-white
  const basicBoost hover:bg-white/10'}`}
        >
          Премиум
          Items = [
    { <ChevronRight
      id: 'boost1',  className="ml-1 h-4 
      name: w-4" />'Пробу
        </Button>
      </div>ждение', 
    </div>
      description: '
  );
};

export default BoПервый глоток энергииostStore;
</pp-content', 
      icon>
</pp-code>

<pp: <Zap size={20}-code>
<pp-filepath>src />,
      cost: 100,
      point/components/PointsAnimation.tsxsPerClick: </pp-filepath>
<pp-content5,
      purchased: boosts.>
import { useEffect, useState } fromboost1?.purchased || 'react';

interface PointsAnim false
    },
    { 
      id:ationProps {
  value: number; 'boost2', 
      name:
  x: number;
  y: number 'Двойной за;
}

const PointsAnimation:ряд', 
      description: ' React.FC<PointsAnimationPropsПрилив сил', > = ({ value, x, y }) =>
      icon:  {
  const [position, setPosition] =<Flame size={20} />,
      cost: 500,
       useState({ top: y, left: x });pointsPerClick: 10,
      
  const [opacitypurchased: boosts., setOpacity] = useState(1);boost2?.purchased || false
    },
    { 
      id: 'boost
  const [scale, setScale] =3', 
      name: 'Тройной удар useState(1);
  
  useEffect', 
      description: 'Б(() => {
    // Начальное положение надодрящий взрыв', 
      icon:  местом клика (<Rocket size={20} />,
      costнад кнопкой): 1500,
      pointsPer
    setPosition({ top: yClick: 50,
      purchased: bo, left: x });
    setosts.boost3?.Opacity(1);purchased || false
    },
    setScale(1);
    
    // Ан
    { 
      id: 'boost4', 
      name: 'имация движения вверх иМощный конц затухания
    const timerентрат', 
      description: 'Нервная = setTimeout(() => {
      setPosition(prev => ({ ...prev, top: система на пределе',  prev.top - 
      icon: 80 }));
      <Star size={20} /setOpacity(0>,
      cost: 5000,
      pointsPerClick);
      setScale(: 100,
      purchased: boosts.boost41.5);
    }, 50);
    
    ?.purchased || false
    },
    { 
      id: 'return () => {
      clearTimeout(boost5', timer);
    };
      name: '
  }, [x, y]);
  Сверх-выносливость', 
      description: '
  return (
    <div 
      className="fixed pointer-events-none z-50 select-none"
      Сердце бьstyle={{
        top: position.top,ётся быстрее
        left: position.left,
        ', 
      icon: <Diamond size={opacity,
        transform: `20} />,
      cost: 15translate(-50%, -50000,
      pointsPerClick: 500,
      purchase%) scale(${scale})`,
        transitiond: boosts.boost5?.purchased || false: 'top 0.7
    },
  ];s ease-out, opacity
  
  // Страница премиум 0.7s ease-out, бустов
  const premiumBoost transform 0.7s ease-out'Items = [
    { 
      i
      }}
    >
      <divd: 'boost6', 
      name: 'Эк className="text-2xl font-bold whitespace-nowrap">стремальная доза', 
      
        <span className="text-description: 'Перblue-400 bg-clipегрузка организма-text drop-shadow-[0', 
      icon: <Zap size={20} /_0_8px_rgba(59>,
      cost: 50000,
      pointsPerClick,130,246,0.9: 2000,
      purchased: bo)]" style={{ textShadow: 'osts.boost6?.purchased || false
    0 0 5},
    { 
      id: px #3b82f6'boost7', 
      name: , 0 0 'Энергетический ш10px #3b82f6'торм', 
       }}>
          +{value}
        </span>
      description: 'Эн</div>
    </div>
  ергия на грани', 
      );
};

export default PointsAnimationicon: <Star size={20} /;
</pp->,
      cost:content>
</pp-code>

 200000,
      pointsPerClick<pp-code>
<pp-filepath>: 10000,
      purchased: bosrc/App.tsx</pp-osts.boost7?.purchased || false
    filepath>
<pp-content>
import},
    { 
      id:  { Route, Routes } from 'boost8', 
      name: 'react-router-dom';
import Game'Адреналиновая from './components/Game';
import буря', 
       NotFound from './pagesdescription: '/NotFound';Невозможно останови
import { Toaster } from './ться', 
      icon: <Rocket size={20} /components/ui/toaster';
import './>,
      cost: 1000000,App.css';

function App() {
      pointsPerClick: 50000,
      purchased: boosts.boost8
  return (
    ?.purchased || false<>
      <Routes>
        <Route path="/" element={
    },
    { 
      i<Game />} />d: 'boost9
        <Route path="*" element={', 
      name: 'Эн<NotFound />} />
      </Routes>
      <Toaster />
    ергетическое безумие', 
      description: '</>
  );
}

export default App;
