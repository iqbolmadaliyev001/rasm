import React, { useState } from 'react';
import {
  Terminal,
  Cpu,
  HardDrive,
  Gamepad2,
  Copy,
  Check,
  Layers,
  Sparkles,
  Server,
  Smartphone,
  Monitor,
  FolderTree,
  Zap,
  Eye,
  Shield,
  Crosshair,
  MapPin,
  X,
  PackageCheck,
  Truck,
  Bomb,
  Search,
  SlidersHorizontal,
  Volume2,
  Sliders,
  Settings,
  Tv,
  MousePointer,
  Mic,
  Save
} from 'lucide-react';

interface VisualAsset {
  id: string;
  category: 'weapons' | 'meds' | 'maps' | 'ui' | 'character' | 'vehicles' | 'throwables' | 'attachments' | 'armor';
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  imageSrc: string;
  desc: string;
  specs: { label: string; value: string }[];
  ueClass: string;
}

const VISUAL_ASSETS: VisualAsset[] = [
  // 0. SETTINGS MENU (NEW)
  {
    id: 'settings_ui',
    category: 'ui',
    title: 'O\'yinchi Sozlamalari Menyusi (WBP_Settings)',
    subtitle: 'Graphics (GTX 1050 Ti), Controls (PC/Android) va Audio (SoundClass)',
    badge: 'Sozlamalar Menyusi',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    imageSrc: '/src/assets/images/apex_settings_ui_1792478313446.jpg',
    desc: 'O\'yinchi sozlamalari to\'liq ekrani: Graphics (Display Resolution, 60 FPS Limit, Medium Preset, FXAA, VRAM 3.5GB nazorati), Controls (Sichqoncha sezgirligi, ADS, Android sensorli joystik), Audio (Master, SFX, Musiqa va Voice Chat).',
    specs: [
      { label: 'UMG Widget', value: 'WBP_Settings' },
      { label: 'C++ Asosiy Klass', value: 'UApexSettingsWidget : public UUserWidget' },
      { label: 'Grafika API', value: 'GEngine->GetGameUserSettings()' },
      { label: 'Audio API', value: 'UGameplayStatics::SetSoundMixClassOverride' },
      { label: 'Saqlash', value: 'GameUserSettings.ini & SaveGame slot' }
    ],
    ueClass: 'Content/UI/Settings/WBP_Settings'
  },

  // 1. WEAPONS ARSENAL
  {
    id: 'weapons_all',
    category: 'weapons',
    title: '1. Barcha Qurollar Arsenali (Apex Armory)',
    subtitle: 'Assault Rifle, Sniper, SMG, Shotgun va Energy Pistol',
    badge: 'Qurollar To\'plami',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    imageSrc: '/src/assets/images/apex_weapons_arsenal_1792477737764.jpg',
    desc: 'O\'yindagi 5 asosiy qurol toifasi: A-42 Vanguard (Shturmovoy avtomat 5.56mm), SX-1 Longbow (.30 Cal snayper), CR-7 Fury (9mm SMG), SG-9 Punisher (12 kalibrli shotgun) va E-1 Pulse (Energetik pistolet).',
    specs: [
      { label: 'C++ Klass', value: 'AApexWeaponBase' },
      { label: 'O\'q turlari', value: '5.56mm, .30 Cal, 9mm, 12GA, Energy' },
      { label: 'Replikatsiya', value: 'Server-Authoritative Hitscan & LineTrace' },
      { label: 'Obveslar', value: 'Scope, Muzzle, Mag, Stock' }
    ],
    ueClass: 'Content/Items/Weapons/BP_WeaponBase'
  },

  // 2. MEDICAL SUPPLIES
  {
    id: 'meds_all',
    category: 'meds',
    title: '2. Dori-Darmonlar va Qalqon To\'plami',
    subtitle: 'Medkit, Shield Battery, Adrenaline, Energy Drink, Painkillers',
    badge: 'Tibbiy & Boost',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    imageSrc: '/src/assets/images/apex_medical_supplies_1792477738783.jpg',
    desc: 'Omon qolish tibbiy buyumlari: 1) Apex Medical Kit (HP 100%), 2) Shield Battery (Qalqon 100%), 3) Adrenaline Syringe (Tezlik va lahzalik HP), 4) Apex Energy Drink (Harakat energiyasi), 5) Painkiller tabletkalari.',
    specs: [
      { label: 'C++ Komponent', value: 'UApexHealthComponent' },
      { label: 'Qo\'llash vaqti', value: 'Medkit: 6s, Shield: 5s, Drink: 3s' },
      { label: 'Animatsiya', value: 'Montage with timer interrupt' },
      { label: 'Server tekshiruvi', value: 'Faqat serverda HP/Shield qo\'shiladi' }
    ],
    ueClass: 'Content/Items/Consumables/BP_ConsumableItem'
  },

  // 3. VEHICLES & TRANSPORT
  {
    id: 'vehicles_all',
    category: 'vehicles',
    title: '3. Transport Vositalari (Dune Buggy, 4x4 SUV, Kater)',
    subtitle: 'Yer va suvda tezkor harakatlanish texnikalari',
    badge: 'Transport Tizimi',
    badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    imageSrc: '/src/assets/images/apex_vehicles_transport_1792478033380.jpg',
    desc: '1) Dune Buggy (Yuqori podveskali 2 kishilik tezkor baggi), 2) Armored 4x4 Troop Transport (Zirhlangan 4 kishilik harbiy jip), 3) Coastal Patrol Boat (Daryo va dengiz uchun pulemyotli tezkor kater).',
    specs: [
      { label: 'UE4 Komponent', value: 'WheeledVehicle Movement Component' },
      { label: 'O\'rindiqlar', value: 'Buggy: 2, 4x4 SUV: 4, Boat: 4' },
      { label: 'Yoqilg\'i & Salomatlik', value: 'Server-Replicated Fuel & Durability' }
    ],
    ueClass: 'Content/Vehicles/BP_ApexVehicle_Base'
  },

  // 4. GRENADES & THROWABLES
  {
    id: 'throwables_all',
    category: 'throwables',
    title: '4. Granatalar va Taktik Tashlanadigan Qurollar',
    subtitle: 'Frag HE, Smoke M18, Stun Flashbang, EMP Shock Granata',
    badge: 'Tashlanuvchi Qurollar',
    badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    imageSrc: '/src/assets/images/apex_grenades_throwables_1792478032806.jpg',
    desc: '1) M67 Frag HE (Portlovchi parchalovchi granata), 2) Smoke M18 (Qalin oq tutun parda), 3) Stun Flashbang (Ko\'zni qamashtiruvchi), 4) EMP Shock Canister (Qalqon va elektronikani o\'chiruvchi).',
    specs: [
      { label: 'C++ Klass', value: 'AApexThrowableBase' },
      { label: 'Traektoriya', value: 'PredictProjectilePath (Spline visualization)' },
      { label: 'Radiusi', value: 'Frag: 10m, Smoke: 15m (30s duration)' }
    ],
    ueClass: 'Content/Items/Throwables/BP_FragGrenade'
  },

  // 5. ATTACHMENTS & OPTICS
  {
    id: 'attachments_all',
    category: 'attachments',
    title: '5. Qurol Obveslari va Pritsellar (Gunsmith)',
    subtitle: 'Holographic, 4x ACOG, 8x Scope, Glushitel, Magazin, Ruchka',
    badge: 'Qurol Qo\'shimchalari',
    badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    imageSrc: '/src/assets/images/apex_attachments_optics_1792478035499.jpg',
    desc: 'Qurol aksessuarlari: Golografik nishon, 4x ACOG, 8x Snayper optikasi, Glushitel (Suppressor), Kengaytirilgan baraban magazin, Taktik burchakli tutqich.',
    specs: [
      { label: 'Socket Ulanishi', value: 'Skeletal Mesh Socket (OpticSocket, MuzzleSocket)' },
      { label: 'Modifikatorlar', value: 'Recoil -35%, Spread -20%, Mag +15' }
    ],
    ueClass: 'Content/Items/Attachments/BP_Attachment_Base'
  },

  // 6. BODY ARMOR & HELMETS
  {
    id: 'armor_all',
    category: 'armor',
    title: '6. Zirhli Jiletlar va Shlemlar (Level 1, 2, 3)',
    subtitle: 'Light, Reinforced Kevlar va Heavy Titanium Juggernaut',
    badge: 'Himoya Tizimi',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    imageSrc: '/src/assets/images/apex_armor_helmets_1792478034204.jpg',
    desc: 'Level 1 (Yengil jilet va kaska -20%), Level 2 (Kevlar jilet va armiya kaskasi -35%), Level 3 (Titan Juggernaut va skull-maska -50%).',
    specs: [
      { label: 'Zarar kamaytirishi', value: 'Lvl 1: -20%, Lvl 2: -35%, Lvl 3: -50%' },
      { label: 'Mustahkamlik', value: 'Durability (Zarba yeganda sinib boradi)' }
    ],
    ueClass: 'Content/Items/Armor/BP_ArmorVest_Lvl3'
  },

  // 7. LARGE BATTLE ROYALE MAP
  {
    id: 'large_map',
    category: 'maps',
    title: '7. Katta Battle Royale Xaritasi: Verdant Island (8x8 km)',
    subtitle: 'Topografik grid, POI nomlari, parvoz marshruti va Safe Zone',
    badge: 'Orol Xaritasi (8x8 km)',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    imageSrc: '/src/assets/images/apex_verdant_map_tactical_1792477739835.jpg',
    desc: '100 o\'yinchi uchun 8x8 km Battle Royale xaritasi: Apex Harbor, Central Power Core, Verdant City, Echo Airfield, Mountain Observatory va Valley Outpost.',
    specs: [
      { label: 'O\'lcham', value: '8 x 8 km (Level Streaming)' },
      { label: 'Gumbaz', value: 'Server radiusi boshqaruvidagi qisqarish' }
    ],
    ueClass: 'Content/Maps/VerdantIsland/VerdantIsland_Persistent'
  },

  // 8. ARENA COMBAT MAP
  {
    id: 'arena_map',
    category: 'maps',
    title: '8. Arena Xaritasi: Apex Docks (4v4 Close Quarters)',
    subtitle: 'Kompakt simmetrik konteynerlar va sniper estakadalari',
    badge: 'Arena Xaritasi (120x120m)',
    badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    imageSrc: '/src/assets/images/apex_arena_combat_map_1792477740765.jpg',
    desc: 'Tezkor 4v4 TDM uchun 120x120m li arena. A va B bazalari, 2 qavatli konteynerlar, sniper yo\'laklari va markaziy Capture Point C.',
    specs: [
      { label: 'O\'lcham', value: '120 x 120 metr (GTX 1050 Ti da 120 FPS)' },
      { label: 'Rejim', value: 'Team Deathmatch / Capture Zone' }
    ],
    ueClass: 'Content/Maps/Arena/Arena_ApexDocks'
  },

  // 9. INVENTORY SCREEN
  {
    id: 'inventory_ui',
    category: 'ui',
    title: '9. Inventar va Loot Oynasi (In-Game Inventory)',
    subtitle: 'Yerdagi narsalar, qurol slotlari, ryukzak sig\'imi va obveslar',
    badge: 'Inventar UI',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    imageSrc: '/src/assets/images/apex_inventory_loot_ui_1792477742937.jpg',
    desc: 'Chapda yerdagi yaqin narsalar, markazda o\'yinchi personaji va ryukzak sig\'imi (75/100 Slots), o\'ngda qurollar va obveslar.',
    specs: [
      { label: 'UMG Widget', value: 'WBP_InventoryScreen' },
      { label: 'Operatsiya', value: 'Drag and Drop DragDropOperation' }
    ],
    ueClass: 'Content/UI/Inventory/WBP_InventoryScreen'
  },

  // 10. GAMEPLAY HUD
  {
    id: 'hud_ui',
    category: 'ui',
    title: '10. Gameplay In-Game HUD (Jang Interfeysi)',
    subtitle: '360° Kompas, Mini-Radar, HP/Qalqon va o\'q-dori paneli',
    badge: 'Jangovar HUD',
    badgeColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    imageSrc: '/src/assets/images/apex_hud_concept_1792472262395.jpg',
    desc: '360° kompas, mini-xarita va safe zone taymeri, HP/Shield shkalalari, o\'qlar va 4 ta tezkor inventar tugmasi.',
    specs: [
      { label: 'UMG Widget', value: 'WBP_GameplayHUD' }
    ],
    ueClass: 'Content/UI/HUD/WBP_GameplayHUD'
  },

  // 11. MAIN MENU & LOBBY
  {
    id: 'main_menu',
    category: 'ui',
    title: '11. Bosh Menyu va Lobby (Main Menu / Lobby)',
    subtitle: '3D personaj, Play tugmasi, Squad matchmaking va Pass',
    badge: 'Bosh Menyu',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    imageSrc: '/src/assets/images/apex_main_menu_1792472263379.jpg',
    desc: 'Vertolyot maydonchasidagi 3D personaj, Play tugmasi, Matchmaking, do\'stlar (+ Add Friend) va reyting.',
    specs: [
      { label: 'Level', value: 'Lobby_Map' },
      { label: 'UMG Widget', value: 'WBP_MainMenu_Lobby' }
    ],
    ueClass: 'Content/UI/Menu/WBP_MainMenu_Lobby'
  },

  // 12. VICTORY RESULTS
  {
    id: 'victory_ui',
    category: 'ui',
    title: '12. G\'alaba va Raund Natijalari (Victory Royale)',
    subtitle: 'Apex Champion #1, statistika, killar, damage va daraja',
    badge: 'G\'alaba Natijalari',
    badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    imageSrc: '/src/assets/images/apex_victory_results_ui_1792477743102.jpg',
    desc: '"VICTORY ROYALE - APEX CHAMPION #1", shohsupa, Kills: 11, Damage: 1850, Survival Time: 24:15, Diamond Tier (+85 RP).',
    specs: [
      { label: 'UMG Widget', value: 'WBP_MatchResults' }
    ],
    ueClass: 'Content/UI/Results/WBP_MatchResults'
  },

  // 13. 3D CHARACTER & BACKPACK
  {
    id: 'character_gear',
    category: 'character',
    title: '13. Taktik 3D Personaj va Qurollanish (Operative)',
    subtitle: 'Shlem, modulli taktik jilet, ryukzak va poyabzal',
    badge: '3D Personaj',
    badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    imageSrc: '/src/assets/images/apex_character_gear_1792472263995.jpg',
    desc: 'UE4 Mannequin skeletiga moslashgan inson modeli, taktik kiyim, shlem, himoya ko\'zoynagi va ryukzak.',
    specs: [
      { label: 'Mesh Turi', value: 'Skeletal Mesh (UE4 Mannequin)' }
    ],
    ueClass: 'Content/Characters/ApexOperative/SK_ApexOperative'
  },

  // 14. ISLAND LANDSCAPE & SAFE ZONE
  {
    id: 'island_landscape',
    category: 'maps',
    title: '14. Verdant Island Tabiiy Landshafti va Gumbaz',
    subtitle: 'Tog\'lar, o\'rmonlar, daryolar va elektr gumbaz manzarasi',
    badge: '3D Landshaft',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    imageSrc: '/src/assets/images/apex_island_map_1792472263718.jpg',
    desc: 'Markaziy sanoat bazasini o\'rab turgan moviy xavfsiz zona gumbazi, qalin o\'rmonlar va to\'g\'on.',
    specs: [
      { label: 'Shader', value: 'M_SafeZoneBarrier (Fresnel & Distortion)' }
    ],
    ueClass: 'Content/Environments/Landscape/M_IslandLandscape'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'visuals' | 'settings_menu' | 'diagnostics' | 'compatibility' | 'architecture' | 'roadmap' | 'optimization'>('settings_menu');
  const [visualCategory, setVisualCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<VisualAsset | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Settings Simulator States
  const [settingsTab, setSettingsTab] = useState<'graphics' | 'controls' | 'audio'>('graphics');
  const [resScale, setResScale] = useState<number>(100);
  const [fpsCap, setFpsCap] = useState<string>('60');
  const [qualityPreset, setQualityPreset] = useState<'Low' | 'Medium' | 'High' | 'Ultra'>('Medium');
  const [antiAliasing, setAntiAliasing] = useState<'FXAA' | 'TAA' | 'Off'>('FXAA');
  const [shadows, setShadows] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [vSync, setVSync] = useState<boolean>(false);
  const [mouseSens, setMouseSens] = useState<number>(1.2);
  const [adsSens, setAdsSens] = useState<number>(0.85);
  const [invertY, setInvertY] = useState<boolean>(false);
  const [controlPlatform, setControlPlatform] = useState<'pc' | 'android'>('pc');
  const [masterVol, setMasterVol] = useState<number>(85);
  const [sfxVol, setSfxVol] = useState<number>(90);
  const [musicVol, setMusicVol] = useState<number>(55);
  const [voiceVol, setVoiceVol] = useState<number>(100);
  const [isSavedNotice, setIsSavedNotice] = useState<boolean>(false);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleApplySettings = () => {
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  const filteredAssets = VISUAL_ASSETS.filter((a) => {
    const matchesCategory = visualCategory === 'all' || a.category === visualCategory;
    const matchesSearch = searchQuery === '' || 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Banner */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-orange-500/20 tracking-wider">
              APEX
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-100 tracking-wide">
                  PROJECT APEX
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  UE 4.27.2
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  WBP_Settings Component
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Player Settings UI (Graphics, Controls, Audio) & UE4.27 Architecture
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700/60 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-cyan-400" />
              <span>ASUS TUF FX505GE</span>
            </div>
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700/60 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>GTX 1050 Ti | 16GB</span>
            </div>
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700/60 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>Android ARM64</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto gap-2 border-t border-slate-800/70 pt-2 pb-2 scrollbar-none text-sm font-medium">
          <button
            onClick={() => setActiveTab('settings_menu')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'settings_menu'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Settings className="w-4 h-4" />
            ★ O'yinchi Sozlamalari (WBP_Settings)
          </button>
          <button
            onClick={() => setActiveTab('visuals')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'visuals'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Eye className="w-4 h-4" />
            Barcha Rasmlar & Galereya ({VISUAL_ASSETS.length})
          </button>
          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'diagnostics'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Kompyuter Diagnostikasi
          </button>
          <button
            onClick={() => setActiveTab('compatibility')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'compatibility'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <HardDrive className="w-4 h-4" />
            UE4.27 Moslik
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            Papkalar & Arxitektura
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'roadmap'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            10 Bosqichli Reja
          </button>
          <button
            onClick={() => setActiveTab('optimization')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'optimization'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-4 h-4" />
            Optimizatsiya
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        {/* TAB: SETTINGS COMPONENT (NEW) */}
        {activeTab === 'settings_menu' && (
          <div className="space-y-6">
            {/* Header Box */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs tracking-wider uppercase">
                    <Sliders className="w-4 h-4" />
                    Unreal Engine 4.27 UMG: WBP_Settings Komponenti
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">
                    O'yinchi Sozlamalari Menyusi (Graphics, Controls, Audio)
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
                    Ushbu interaktiv komponent Unreal Engine 4.27 dagi <code className="text-amber-300">UGameUserSettings</code> (Grafika), <code className="text-amber-300">UInputSettings</code> (Boshqaruv) va <code className="text-amber-300">USoundClass</code> (Audio mikser) bilan to'liq bog'langan.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-slate-300 font-mono">
                    Content/UI/Settings/WBP_Settings
                  </span>
                </div>
              </div>
            </div>

            {/* Concept Image + Live Interactive Simulator Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Concept Visual (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
                  <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
                      <Tv className="w-4 h-4 text-cyan-400" /> Rasmiy UI Vizual Konsepti
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      1080p 60 FPS
                    </span>
                  </div>
                  <div className="relative aspect-video bg-slate-950">
                    <img
                      src="/src/assets/images/apex_settings_ui_1792478313446.jpg"
                      alt="Project Apex Settings UI"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-2 text-xs text-slate-300">
                    <p className="leading-relaxed">
                      <strong>Dizayn afzalligi:</strong> GTX 1050 Ti (4GB VRAM) ga moslashtirilgan real-vaqt monitoringi (VRAM 1.78GB / 4.0GB, Harorat 58°C, FPS 60), glassmorphic neon chegaralar.
                    </p>
                    <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                      <span>C++ Sinf: <code className="text-slate-200">UApexSettingsWidget</code></span>
                      <span className="text-emerald-400">ASUS TUF FX505GE Mos</span>
                    </div>
                  </div>
                </div>

                {/* Unreal Engine C++ Backend Integration Code Card */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-300 font-bold border-b border-slate-800 pb-2">
                    <span className="text-amber-400 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> UApexSettingsWidget.cpp
                    </span>
                    <button
                      onClick={() => copyToClipboard(`// UE4.27 GameUserSettings C++
UGameUserSettings* UserSettings = GEngine->GetGameUserSettings();
if (UserSettings) {
    UserSettings->SetScreenResolution(FIntPoint(1920, 1080));
    UserSettings->SetFrameRateLimit(60.0f);
    UserSettings->SetOverallScalabilityLevel(${qualityPreset === 'Low' ? 0 : qualityPreset === 'Medium' ? 1 : qualityPreset === 'High' ? 2 : 3});
    UserSettings->SetShadowQuality(${shadows === 'Low' ? 0 : shadows === 'Medium' ? 1 : 2});
    UserSettings->SetAntiAliasingQuality(${antiAliasing === 'Off' ? 0 : antiAliasing === 'FXAA' ? 1 : 2});
    UserSettings->ApplySettings(false);
}`, 'cpp-code')}
                      className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === 'cpp-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      Kodni olish
                    </button>
                  </div>
                  <pre className="text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
{`UGameUserSettings* Settings = GEngine->GetGameUserSettings();
Settings->SetFrameRateLimit(${fpsCap}.0f);
Settings->SetOverallScalabilityLevel(${qualityPreset === 'Low' ? 0 : qualityPreset === 'Medium' ? 1 : qualityPreset === 'High' ? 2 : 3});
Settings->SetShadowQuality(${shadows === 'Low' ? 0 : shadows === 'Medium' ? 1 : 2});
Settings->ApplySettings(false);`}
                  </pre>
                </div>
              </div>

              {/* Right Column: Live Interactive Settings Simulator (7 Cols) */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between">
                <div>
                  {/* Top Header of Settings Box */}
                  <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                      <h3 className="font-bold text-slate-100 text-sm tracking-wider uppercase">
                        WBP_Settings Jonli Interfeys Simulyatori
                      </h3>
                    </div>

                    {/* Tabs inside Settings */}
                    <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                      <button
                        onClick={() => setSettingsTab('graphics')}
                        className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 cursor-pointer ${
                          settingsTab === 'graphics'
                            ? 'bg-cyan-500 text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Tv className="w-3.5 h-3.5" /> Graphics (Grafika)
                      </button>
                      <button
                        onClick={() => setSettingsTab('controls')}
                        className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 cursor-pointer ${
                          settingsTab === 'controls'
                            ? 'bg-cyan-500 text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <MousePointer className="w-3.5 h-3.5" /> Controls (Boshqaruv)
                      </button>
                      <button
                        onClick={() => setSettingsTab('audio')}
                        className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 cursor-pointer ${
                          settingsTab === 'audio'
                            ? 'bg-cyan-500 text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Audio (Ovoz)
                      </button>
                    </div>
                  </div>

                  {/* Settings Content Area */}
                  <div className="p-5 space-y-5">
                    {/* 1. GRAPHICS TAB */}
                    {settingsTab === 'graphics' && (
                      <div className="space-y-4">
                        {/* Hardware Notice */}
                        <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-cyan-300">
                            <Monitor className="w-4 h-4" />
                            <span>GPU: NVIDIA GeForce GTX 1050 Ti Laptop (4GB VRAM)</span>
                          </div>
                          <span className="text-emerald-400 font-bold">Tavsiya: Medium (60 FPS)</span>
                        </div>

                        {/* Resolution & Scale */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300 block">
                              Display Resolution (Ekran o'lchami)
                            </label>
                            <select className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-200">
                              <option>1920 x 1080 (16:9 Full HD)</option>
                              <option>1600 x 900 (16:9)</option>
                              <option>1280 x 720 (16:9 HD)</option>
                            </select>
                            <span className="text-[11px] text-slate-500">UE4: SetScreenResolution()</span>
                          </div>

                          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="font-semibold text-slate-300">Frame Rate Limit (FPS Cheklovi)</span>
                              <span className="text-cyan-400 font-mono font-bold">{fpsCap} FPS</span>
                            </div>
                            <div className="flex gap-2">
                              {['30', '60', '120', 'Unlimited'].map((val) => (
                                <button
                                  key={val}
                                  onClick={() => setFpsCap(val)}
                                  className={`flex-1 py-1 rounded text-xs transition cursor-pointer ${
                                    fpsCap === val
                                      ? 'bg-cyan-500 text-slate-950 font-bold'
                                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                                  }`}
                                >
                                  {val}
                                </button>
                              ))}
                            </div>
                            <span className="text-[11px] text-slate-500">UE4 konsol: t.MaxFPS {fpsCap === 'Unlimited' ? '0' : fpsCap}</span>
                          </div>
                        </div>

                        {/* Overall Quality Presets */}
                        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-slate-300">Grafik Sifat Profili (Overall Scalability)</span>
                            <span className="text-amber-400 font-semibold">{qualityPreset}</span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {(['Low', 'Medium', 'High', 'Ultra'] as const).map((lvl) => (
                              <button
                                key={lvl}
                                onClick={() => {
                                  setQualityPreset(lvl);
                                  if (lvl === 'Low') setShadows('Low');
                                  if (lvl === 'Medium') setShadows('Medium');
                                  if (lvl === 'High') setShadows('High');
                                }}
                                className={`py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                                  qualityPreset === lvl
                                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                                }`}
                              >
                                {lvl} {lvl === 'Medium' && '★'}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Detailed Sub-settings */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          {/* Shadows */}
                          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                            <span className="font-semibold text-slate-300 block">Soyalar (Shadows)</span>
                            <select
                              value={shadows}
                              onChange={(e) => setShadows(e.target.value as any)}
                              className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-200"
                            >
                              <option value="Low">Low (Past)</option>
                              <option value="Medium">Medium (O'rta)</option>
                              <option value="High">High (Yuqori)</option>
                            </select>
                            <span className="text-[11px] text-slate-500">sg.ShadowQuality</span>
                          </div>

                          {/* Anti-Aliasing */}
                          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                            <span className="font-semibold text-slate-300 block">Silliqlash (AA)</span>
                            <select
                              value={antiAliasing}
                              onChange={(e) => setAntiAliasing(e.target.value as any)}
                              className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-200"
                            >
                              <option value="FXAA">FXAA (Tezkor)</option>
                              <option value="TAA">TAA (Sifatli)</option>
                              <option value="Off">O'chirilgan</option>
                            </select>
                            <span className="text-[11px] text-slate-500">r.DefaultFeature.AntiAliasing</span>
                          </div>

                          {/* V-Sync */}
                          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 flex flex-col justify-between">
                            <span className="font-semibold text-slate-300 block">V-Sync (Kadr sinxronlash)</span>
                            <button
                              onClick={() => setVSync(!vSync)}
                              className={`py-1.5 px-3 rounded text-xs font-semibold transition cursor-pointer ${
                                vSync ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                              }`}
                            >
                              {vSync ? 'Yoqilgan (ON)' : 'O\'chirilgan (OFF)'}
                            </button>
                            <span className="text-[11px] text-slate-500">r.VSync</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 2. CONTROLS TAB */}
                    {settingsTab === 'controls' && (
                      <div className="space-y-4">
                        {/* Platform Selector */}
                        <div className="flex gap-2 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                          <button
                            onClick={() => setControlPlatform('pc')}
                            className={`flex-1 py-1.5 rounded transition flex items-center justify-center gap-1.5 cursor-pointer ${
                              controlPlatform === 'pc'
                                ? 'bg-amber-500 text-slate-950 font-bold'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            <Monitor className="w-3.5 h-3.5" /> Windows PC (Klaviatura & Sichqoncha)
                          </button>
                          <button
                            onClick={() => setControlPlatform('android')}
                            className={`flex-1 py-1.5 rounded transition flex items-center justify-center gap-1.5 cursor-pointer ${
                              controlPlatform === 'android'
                                ? 'bg-amber-500 text-slate-950 font-bold'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            <Smartphone className="w-3.5 h-3.5" /> Android (Virtual Joystik & Sensor)
                          </button>
                        </div>

                        {/* Mouse Sensitivities */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="font-semibold text-slate-300">Umumiy Sezgirlik (General Sensitivity)</span>
                              <span className="text-cyan-400 font-mono">{mouseSens.toFixed(2)}</span>
                            </div>
                            <input
                              type="range"
                              min="0.1"
                              max="3.0"
                              step="0.05"
                              value={mouseSens}
                              onChange={(e) => setMouseSens(parseFloat(e.target.value))}
                              className="w-full accent-cyan-400 cursor-pointer"
                            />
                            <span className="text-[11px] text-slate-500">UE4: BaseTurnRate & BaseLookUpRate</span>
                          </div>

                          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="font-semibold text-slate-300">ADS Pritsel Sezgirligi (Aim Down Sight)</span>
                              <span className="text-amber-400 font-mono">{adsSens.toFixed(2)}</span>
                            </div>
                            <input
                              type="range"
                              min="0.1"
                              max="2.0"
                              step="0.05"
                              value={adsSens}
                              onChange={(e) => setAdsSens(parseFloat(e.target.value))}
                              className="w-full accent-amber-400 cursor-pointer"
                            />
                            <span className="text-[11px] text-slate-500">Pritsel ochilganda sekinroq aylanish koeffitsienti</span>
                          </div>
                        </div>

                        {/* Invert Axis & Keybindings Preview */}
                        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-slate-200 block">Vertikal o'qni teskari qilish (Invert Y-Axis)</span>
                            <span className="text-slate-400 text-[11px]">Sichqonchani tepaga surish pastga qaratsin</span>
                          </div>
                          <button
                            onClick={() => setInvertY(!invertY)}
                            className={`py-1 px-3 rounded text-xs font-semibold cursor-pointer ${
                              invertY ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {invertY ? 'ON' : 'OFF'}
                          </button>
                        </div>

                        {/* Keybindings Table */}
                        <div className="bg-slate-950 rounded-lg border border-slate-800 p-3 space-y-2 text-xs">
                          <span className="font-bold text-slate-300 block">DefaultInput.ini Asosiy Tugmalar:</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                            <div className="p-1.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                              <span className="text-slate-400">Yurish:</span>
                              <span className="font-mono text-cyan-300">W, A, S, D</span>
                            </div>
                            <div className="p-1.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                              <span className="text-slate-400">Sakrash:</span>
                              <span className="font-mono text-cyan-300">SpaceBar</span>
                            </div>
                            <div className="p-1.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                              <span className="text-slate-400">O't ochish:</span>
                              <span className="font-mono text-cyan-300">Left Mouse</span>
                            </div>
                            <div className="p-1.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                              <span className="text-slate-400">Pritsel:</span>
                              <span className="font-mono text-cyan-300">Right Mouse</span>
                            </div>
                            <div className="p-1.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                              <span className="text-slate-400">Inventar:</span>
                              <span className="font-mono text-cyan-300">TAB / I</span>
                            </div>
                            <div className="p-1.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                              <span className="text-slate-400">Xarita:</span>
                              <span className="font-mono text-cyan-300">M</span>
                            </div>
                            <div className="p-1.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                              <span className="text-slate-400">O'tirish:</span>
                              <span className="font-mono text-cyan-300">C</span>
                            </div>
                            <div className="p-1.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                              <span className="text-slate-400">Sprint:</span>
                              <span className="font-mono text-cyan-300">Left Shift</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. AUDIO TAB */}
                    {settingsTab === 'audio' && (
                      <div className="space-y-4">
                        <div className="space-y-3">
                          {/* Master Volume */}
                          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                                <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> Asosiy Ovoz (Master Volume)
                              </span>
                              <span className="font-mono text-cyan-400">{masterVol}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={masterVol}
                              onChange={(e) => setMasterVol(parseInt(e.target.value))}
                              className="w-full accent-cyan-400 cursor-pointer"
                            />
                            <span className="text-[11px] text-slate-500">UE4: SC_Master (Sound Class)</span>
                          </div>

                          {/* SFX Volume */}
                          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5 text-amber-400" /> O'yin Tovushlari: O'q & Qadamlar (SFX Volume)
                              </span>
                              <span className="font-mono text-amber-400">{sfxVol}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={sfxVol}
                              onChange={(e) => setSfxVol(parseInt(e.target.value))}
                              className="w-full accent-amber-400 cursor-pointer"
                            />
                            <span className="text-[11px] text-slate-500">3D Spatial Audio masofa attenuatsiyasi</span>
                          </div>

                          {/* Music Volume */}
                          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                                <Tv className="w-3.5 h-3.5 text-purple-400" /> Fon Musiqasi (Music Volume)
                              </span>
                              <span className="font-mono text-purple-400">{musicVol}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={musicVol}
                              onChange={(e) => setMusicVol(parseInt(e.target.value))}
                              className="w-full accent-purple-400 cursor-pointer"
                            />
                            <span className="text-[11px] text-slate-500">Lobby va g'alaba madhiyasi musiqasi</span>
                          </div>

                          {/* Voice Chat */}
                          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                                <Mic className="w-3.5 h-3.5 text-emerald-400" /> Ovozli Muloqot (Voice Chat Volume)
                              </span>
                              <span className="font-mono text-emerald-400">{voiceVol}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={voiceVol}
                              onChange={(e) => setVoiceVol(parseInt(e.target.value))}
                              className="w-full accent-emerald-400 cursor-pointer"
                            />
                            <span className="text-[11px] text-slate-500">VoIP / Jamoadoshlar mikrofoni</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {isSavedNotice ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Sozlamalar muvaffaqiyatli saqlandi!
                      </span>
                    ) : (
                      'O\'zgarishlar GameUserSettings.ini ga yoziladi'
                    )}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setFpsCap('60');
                        setQualityPreset('Medium');
                        setShadows('Medium');
                        setAntiAliasing('FXAA');
                        setMasterVol(85);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-900 transition cursor-pointer"
                    >
                      Standartga qaytarish
                    </button>
                    <button
                      onClick={handleApplySettings}
                      className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg transition cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" /> Saqlash (Apply Changes)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: VISUAL ASSET GALLERY */}
        {activeTab === 'visuals' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-xl p-5 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-wider uppercase">
                    <Sparkles className="w-4 h-4" />
                    Project Apex: 30+ Donadan Iborat To'liq Vizual Katalog
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">
                    Barcha Qurollar, Sozlamalar, Mashinalar, Granatalar, Zirhlar, Dori-Darmonlar, Katta & Arena Xaritalar
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
                    Siz so'ragan 30 dan ortiq barcha o'yin obyektlari alohida toifalarda tayyorlandi. Har bir rasm va element Unreal Engine 4.27 da qanday C++, Blueprint va UMG klassi sifatida ishlatilishini ko'rsatadi.
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Qidirish (qurol, dori, xarita, sozlamalar...)"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 placeholder-slate-500"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-2 text-slate-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Sub-Category Filters */}
              <div className="mt-4 pt-4 border-t border-slate-700/80 flex flex-wrap gap-2 text-xs">
                {[
                  { id: 'all', label: `Barchasi (${VISUAL_ASSETS.length})`, icon: SlidersHorizontal },
                  { id: 'ui', label: 'Sozlamalar, HUD & Menyu', icon: Settings },
                  { id: 'weapons', label: 'Qurollar (5 xil)', icon: Crosshair },
                  { id: 'vehicles', label: 'Transport (Baggi, SUV, Kater)', icon: Truck },
                  { id: 'throwables', label: 'Granatalar (4 xil)', icon: Bomb },
                  { id: 'armor', label: 'Zirh & Shlemlar (Lvl 1-3)', icon: Shield },
                  { id: 'attachments', label: 'Pritsellar & Obveslar (6 xil)', icon: Crosshair },
                  { id: 'meds', label: 'Dori & Qalqon (5 xil)', icon: Shield },
                  { id: 'maps', label: 'Katta Orol & Arena', icon: MapPin },
                  { id: 'character', label: '3D Personaj & Ryukzak', icon: Gamepad2 }
                ].map((cat) => {
                  const Icon = cat.icon;
                  const isActive = visualCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setVisualCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 font-bold shadow'
                          : 'bg-slate-950/70 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" /> {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Assets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className="bg-slate-900 border border-slate-800 hover:border-amber-500/60 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between cursor-pointer group transition duration-200"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img
                      src={asset.imageSrc}
                      alt={asset.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded text-xs font-semibold border backdrop-blur-md ${asset.badgeColor}`}>
                        {asset.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-bold text-slate-100 text-base group-hover:text-amber-400 transition">
                        {asset.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{asset.subtitle}</p>
                      <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                        {asset.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-400 text-[11px] truncate max-w-[200px]">
                        {asset.ueClass}
                      </span>
                      <span className="text-amber-400 font-medium flex items-center gap-1 shrink-0">
                        Batafsil <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Lightbox for Asset Details */}
            {selectedAsset && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
                  <button
                    onClick={() => setSelectedAsset(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 z-10 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="relative aspect-video w-full bg-slate-950">
                    <img
                      src={selectedAsset.imageSrc}
                      alt={selectedAsset.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className={`px-2.5 py-1 rounded text-xs font-semibold border ${selectedAsset.badgeColor}`}>
                          {selectedAsset.badge}
                        </span>
                        <h2 className="text-xl font-bold text-white mt-2">{selectedAsset.title}</h2>
                        <p className="text-xs text-slate-400">{selectedAsset.subtitle}</p>
                      </div>

                      <button
                        onClick={() => copyToClipboard(selectedAsset.ueClass, 'ue-class')}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                      >
                        {copiedId === 'ue-class' ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>Yo'l nusxalandi</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>UE4 Fayl Yo'lini Olish</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                      {selectedAsset.desc}
                    </p>

                    <div>
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <PackageCheck className="w-4 h-4 text-amber-400" />
                        Unreal Engine 4.27 va C++ Texnik Xususiyatlari:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {selectedAsset.specs.map((spec, i) => (
                          <div key={i} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between">
                            <span className="text-slate-400">{spec.label}:</span>
                            <span className="font-semibold text-slate-200">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 text-right">
                      <button
                        onClick={() => setSelectedAsset(null)}
                        className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs cursor-pointer"
                      >
                        Yopish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: DIAGNOSTICS */}
        {activeTab === 'diagnostics' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-amber-400" />
                ASUS TUF FX505GE noutbukingizni tekshirish buyruqlari
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Windows PowerShell oynasiga qo'yib, SSD bo'sh joyi va Visual Studio holatini aniqlang.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-cyan-500/40 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Barcha tekshiruvlarni 1 ta skript bilan bajarish
                </div>
                <button
                  onClick={() => copyToClipboard(`Clear-Host; Get-CimInstance Win32_Processor | Select-Object Name; Get-CimInstance Win32_PhysicalMemory | Measure-Object -Property Capacity -Sum | Select-Object @{N="RAM_GB";E={[math]::Round($_.Sum/1GB,2)}}; Get-PSDrive -PSProvider FileSystem | Select-Object Name, @{N="Free_GB";E={[math]::Round($_.Free/1GB,2)}}; git --version 2>$null; if (Test-Path "\${env:ProgramFiles(x86)}\\Microsoft Visual Studio\\Installer\\vswhere.exe") { & "\${env:ProgramFiles(x86)}\\Microsoft Visual Studio\\Installer\\vswhere.exe" -latest -property displayName }`, 'quick-script')}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  {copiedId === 'quick-script' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  Skriptni Nusxalash
                </button>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-amber-300 border border-slate-800">
                <code>Get-PSDrive -PSProvider FileSystem | Select-Object Name, @&#123;N="Free_GB"; E=[math]::Round($_.Free / 1GB, 2)&#125;</code>
              </div>
            </div>
          </div>
        )}

        {/* TAB: COMPATIBILITY */}
        {activeTab === 'compatibility' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-amber-400" />
                Unreal Engine 4.27 uchun Rasmiy Moslik Matritsasi
              </h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-1">Unreal Engine</span>
                  <p className="text-slate-300">Versiya: 4.27.2 (Epic Games Launcher)</p>
                  <p className="text-slate-400 mt-1">Hajm: ~38 GB</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">Visual Studio</span>
                  <p className="text-slate-300">VS 2019 (v16.11) yoki VS 2022</p>
                  <p className="text-slate-400 mt-1">MSVC v142 C++ toolchain bilan</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">Android Toolchain</span>
                  <p className="text-slate-300">NDK r21b (21.1.6352462)</p>
                  <p className="text-slate-400 mt-1">Java JDK 8, ARM64</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FolderTree className="w-5 h-5 text-amber-400" />
                Loyiha Papkalar Ierarxiyasi
              </h2>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1 mt-4">
                <div>📁 <span className="text-amber-400 font-bold">ProjectApex/</span></div>
                <div className="pl-4 border-l border-slate-800 space-y-1">
                  <div>📁 <span className="text-cyan-300">Content/UI/Settings/</span> (WBP_Settings, WBP_SettingsTabButton)</div>
                  <div>📁 <span className="text-cyan-300">Content/Items/Weapons/</span> (A-42, SX-1, SG-9, CR-7)</div>
                  <div>📁 <span className="text-emerald-300">Content/Items/Consumables/</span> (Medkit, Shield, Adrenaline)</div>
                  <div>📁 <span className="text-orange-300">Content/Vehicles/</span> (Dune Buggy, 4x4 SUV, Patrol Boat)</div>
                  <div>📁 <span className="text-rose-300">Content/Items/Throwables/</span> (Frag, Smoke, Flashbang, EMP)</div>
                  <div>📁 <span className="text-purple-300">Content/Maps/</span> (VerdantIsland, Arena_ApexDocks)</div>
                  <div>📁 <span className="text-blue-300">Content/UI/</span> (HUD, Inventory, MainMenu, Results)</div>
                  <div>📁 <span className="text-yellow-300">Source/ProjectApex/</span> (C++ Classes)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                10 Bosqichli Taraqqiyot Xaritasi
              </h2>
              <p className="text-xs text-slate-400 mt-1">Phase 0 (Audit) -&gt; Phase 1 (PC Prototip) -&gt; Phase 2 (Android) -&gt; Phase 3 (Gameplay) -&gt; Phase 4 (Multiplayer)...</p>
            </div>
          </div>
        )}

        {/* TAB: OPTIMIZATION */}
        {activeTab === 'optimization' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                GTX 1050 Ti & 16GB RAM Uchun Maslahatlar
              </h2>
              <div className="mt-3 space-y-2 text-xs text-slate-300">
                <p>• <strong>Realtime Viewport:</strong> Blueprint bilan ishlaganda <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">Ctrl+R</kbd> bosib o'chiring.</p>
                <p>• <strong>Scalability:</strong> "Medium" yoki "High" qilib belgilang.</p>
                <p>• <strong>t.MaxFPS 60:</strong> Konsolga yozib 60 kadrga cheklang.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-4 px-4 sm:px-6 text-center text-xs text-slate-500">
        <p>PROJECT APEX • Unreal Engine 4.27.2 • WBP_Settings Komponenti & To'liq Vizual Baza Tayyor</p>
      </footer>
    </div>
  );
}
