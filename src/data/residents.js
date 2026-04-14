export const RESIDENT_TYPES = {
  fox:   { emoji: '🦊', color: '#e8824a', label: 'Urban Fox' },
  bee:   { emoji: '🐝', color: '#f5c840', label: 'Solitary Bee' },
  bird:  { emoji: '🐦', color: '#6ab4f0', label: 'Migratory Bird' },
  tree:  { emoji: '🌳', color: '#4ad4a0', label: 'Linden Tree' },
  boar:  { emoji: '🐗', color: '#b08055', label: 'Wild Boar' },
  spree: { emoji: '🌊', color: '#4ac8e8', label: 'Spree River' },
}

export const RESIDENTS = [
  // ── Foxes ─────────────────────────────────────────────────────────
  {
    id: 1, type: 'fox', lng: 13.421, lat: 52.537,
    kiez: 'Prenzlauer Berg', stress: 'Light Pollution',
    detail: 'Ground-level lighting disrupts hunting between 2–4am.',
    dispatch: "It's 2:47am on Schönhauser Allee and I cannot hunt. Every lamp is still lit. My eyes are made for darkness — for the exact moment a mouse stops moving and thinks it's safe. Tonight there are no such moments. I've gone home hungry three nights running.",
    action: 'Turn off your outdoor or porch light tonight between 10pm and sunrise. One dark patch in a Kiez is a hunting ground returned.',
  },
  {
    id: 2, type: 'fox', lng: 13.388, lat: 52.497,
    kiez: 'Kreuzberg', stress: 'Food Conditioning',
    detail: 'Three foxes now rely entirely on restaurant waste bins.',
    dispatch: "I found pasta in a bag outside a restaurant on Oranienstrasse at midnight. I ate it. I know I shouldn't. But it was there and it was easy. My natural food takes hours to find. This took thirty seconds. I am forgetting how to hunt and I don't know how to stop.",
    action: "Check that your building's bins have a secure, latching lid. If not, ask your Hausverwaltung — or buy a clip for your own bin.",
  },
  {
    id: 3, type: 'fox', lng: 13.241, lat: 52.467,
    kiez: 'Grunewald', stress: 'Road Barrier',
    detail: 'AVUS motorway bisects the territory. Two crossings fatal last month.',
    dispatch: "There is a motorway between my family and the forest where we were born. I know a crossing point where the barrier is lower. Last month I tried seventeen times. Two of my family did not come back. I still don't know another way across.",
    action: 'Sign the Berlin wildlife corridor petition at BUND-Berlin.de — it asks the city for underpasses on the AVUS. Takes 30 seconds.',
  },
  {
    id: 4, type: 'fox', lng: 13.350, lat: 52.548,
    kiez: 'Wedding', stress: 'Shrinking Territory',
    detail: 'Construction reduced family range from 4.2km² to 1.8km².',
    dispatch: "My home used to be four square kilometres. I knew every corner of it. Construction has shrunk it to under two. I don't know this smaller version yet. My cubs were born into it. They don't know there was ever more.",
    action: 'Leave a corner of any garden, balcony, or community space uncut and unmowed this month. A patch of long grass is fox habitat.',
  },

  // ── Bees ──────────────────────────────────────────────────────────
  {
    id: 5, type: 'bee', lng: 13.404, lat: 52.523,
    kiez: 'Mitte', stress: 'Floral Desert',
    detail: 'No flowering plant within 500m radius.',
    dispatch: "I have flown half a kilometre in every direction from my nest this morning. I found eight dandelions between paving stones and one geranium on a second-floor balcony. I need twenty kilograms of pollen to get my colony through winter. Right now I have enough for four days.",
    action: 'Plant one pot of lavender, borage, or phacelia on your windowsill or balcony. I will find it within 48 hours.',
  },
  {
    id: 6, type: 'bee', lng: 13.403, lat: 52.479,
    kiez: 'Tempelhof', stress: 'Pesticide Drift',
    detail: 'Glyphosate at 3× safe threshold near allotment gardens.',
    dispatch: "Something is wrong with the pollen near the allotment gardens. It's there, but when my sisters bring it back, the colony reacts badly. Three foragers haven't returned in two days. I don't know what is in the flowers. I just know something is different this year.",
    action: 'If you have a garden or allotment, switch to organic or pesticide-free. The approved list is at bioland.de.',
  },
  {
    id: 7, type: 'bee', lng: 13.352, lat: 52.548,
    kiez: 'Wedding', stress: 'Nesting Sites Lost',
    detail: 'Freshly paved path covered 40 ground-nesting burrows.',
    dispatch: "My nest was a tunnel in a path on Koloniestrasse — 18 centimetres deep, lined with petals. It took three weeks to build. Last week someone paved over it. I am still looking for new ground. Most soil here is too hard or covered. I am still looking.",
    action: 'Leave a patch of bare, south-facing, sandy soil undisturbed in your garden or yard. This is exactly what solitary bees need to nest.',
  },
  {
    id: 8, type: 'bee', lng: 13.453, lat: 52.502,
    kiez: 'Lichtenberg', stress: 'Heat Stress',
    detail: 'Asphalt surface 41°C — nectar evaporates before harvest.',
    dispatch: "The flowers here have nectar, but when I arrive it has already evaporated — the asphalt is 41°C. I keep flying but there is nothing to collect. I am burning more energy than I am bringing back. I will try again at dawn, but by then the other bees will already be there.",
    action: 'Move outdoor planters to partial shade during heatwaves. Nectar survives longer in cooler, shadier conditions.',
  },

  // ── Birds ─────────────────────────────────────────────────────────
  {
    id: 9, type: 'bird', lng: 13.376, lat: 52.510,
    kiez: 'Tiergarten', stress: 'Glass Collision',
    detail: '23 bird strikes at Sony Center this migration season.',
    dispatch: "I was flying south. I saw sky in the glass and flew toward it. I don't know what happened next — I was on the ground, unable to move my left wing for an hour. That building has taken seven of us this migration season. I go around it now. The birds arriving this week have not learned yet.",
    action: 'Put vertical strips of tape or UV-reflective stickers on large glass surfaces. 5cm wide, 10cm apart. Birds see the pattern. Takes ten minutes.',
  },
  {
    id: 10, type: 'bird', lng: 13.414, lat: 52.521,
    kiez: 'Mitte', stress: 'Light Trap',
    detail: 'Alexanderplatz glow visible 40km away. Birds circle for hours.',
    dispatch: "I navigate by stars. When I fly over Alexanderplatz, the light below erases them. I circle. Other birds circle. We call to each other — confused, exhausted. Sometimes I lose an hour before I find the darkness again. By then I've spent reserves I need for crossing the Alps.",
    action: 'Switch off non-essential lights between 10pm and 4am tonight. Close blinds. It is peak migration season — September through November.',
  },
  {
    id: 11, type: 'bird', lng: 13.440, lat: 52.483,
    kiez: 'Neukölln', stress: 'Noise Stress',
    detail: 'Night construction drowns dawn chorus. No eggs this season.',
    dispatch: "My dawn chorus starts at 4:30am. Construction on Sonnenallee starts at 6am and drowns everything by 6:15. I call to establish territory, to find my mate, to say I am here. Lately no one answers. I don't know if they can't hear me or if they're no longer there.",
    action: 'Report pre-7am construction noise to your Bezirksamt. Template letters are at berlin.de/laerm — takes five minutes.',
  },
  {
    id: 12, type: 'bird', lng: 13.305, lat: 52.505,
    kiez: 'Charlottenburg', stress: 'Nest Competition',
    detail: 'Escaped parakeets occupy all traditional Swift nesting hollows.',
    dispatch: "I returned in April to find my hollow occupied by a parakeet — a pet species that escaped decades ago. I have nested here for seven years. I tried four times to return. The parakeet is larger than me. I built a new nest on a ledge instead. It's exposed. I'm not sure about the eggs.",
    action: 'Install a Swift nest box on your building\'s south or east wall. Swifts cannot make their own holes — they need yours. Plans at mauersegler.net.',
  },

  // ── Trees ─────────────────────────────────────────────────────────
  {
    id: 13, type: 'tree', lng: 13.382, lat: 52.516,
    kiez: 'Mitte', stress: 'Heat Island +4°C',
    detail: 'Linden runs 4.2°C above rural surroundings. Leaf drop 3 weeks early.',
    dispatch: "I am an eighty-year-old linden on Unter den Linden. In August my surface temperature was 4.2°C above the countryside. I dropped my leaves early to save water — a kind of emergency shutdown. Tourists photographed the bare branches as if they were interesting. They were not interesting. They were distress.",
    action: 'Water the nearest street tree — fifteen litres poured slowly at the drip line. Check if the city\'s Baumtränke watering bag is empty and refill it.',
  },
  {
    id: 14, type: 'tree', lng: 13.450, lat: 52.481,
    kiez: 'Neukölln', stress: 'Soil Compaction',
    detail: 'Root zone paved to 30cm of trunk. 80-year-old tree suffocating.',
    dispatch: "My roots need air as much as water. The paving goes right to my trunk. Soil is compressed to something close to stone. When it rains, the water runs into drains instead of reaching me. I am suffocating slowly. I was planted in 1943. I have perhaps eight years left.",
    action: 'Adopt a street tree at baumscheibe.org — the city lets you loosen soil and add mulch around the base. It takes twenty minutes.',
  },
  {
    id: 15, type: 'tree', lng: 13.308, lat: 52.506,
    kiez: 'Charlottenburg', stress: 'Drought',
    detail: '47 dry days. Weekly water allowance 18L against a need of 150L.',
    dispatch: "47 days without significant rain. My city water allowance is 18 litres per week. I need 150. I am doing what I can — closing stomata, slowing growth, rerouting sugars. Last summer I lost three large branches. This summer the stress is worse. I don't know what comes after the branches.",
    action: 'Fill a watering can and water the nearest street tree. Look for dry cracked soil or early yellowing as signs of stress. Once a week makes a difference.',
  },
  {
    id: 16, type: 'tree', lng: 13.470, lat: 52.540,
    kiez: 'Pankow', stress: 'Salt Damage',
    detail: 'Road salt accumulated in root zone for 12 consecutive winters.',
    dispatch: "Road salt is spread near me every winter. Year after year it builds up in the soil. Salt pulls water out of my root cells through osmosis — the same process that kills plants in the sea. My leaves show it: brown tips, scorched edges, early drop. Twelve winters. It's getting harder to reverse.",
    action: 'Use sand or grit instead of salt on icy paths near trees in winter. Buy a small bag from a hardware store. Ask your Hausmeister to switch too.',
  },

  // ── Boar ──────────────────────────────────────────────────────────
  {
    id: 17, type: 'boar', lng: 13.220, lat: 52.470,
    kiez: 'Grunewald', stress: 'Habitat Fragmentation',
    detail: 'Sounder of 11 enclosed by three roads. No corridor to Spandau Forest.',
    dispatch: "There are eleven of us. The motorway to the west and three roads to the east have made this forest an island. We can smell the Spandau forest — we know there is food and space there — but there is no crossing that doesn't kill. Our range shrinks with each generation.",
    action: 'Support the Berlin wildlife corridor project at BUND Berlin. Sign the petition — it asks for underpasses on the AVUS. Takes 30 seconds.',
  },
  {
    id: 18, type: 'boar', lng: 13.396, lat: 52.471,
    kiez: 'Tempelhof', stress: 'Urban Dependency',
    detail: 'Family crosses to Tempelhof Feld nightly. Wild foraging forgotten.',
    dispatch: "There is food on Tempelhof Feld every evening — bread, fruit, picnic leftovers. My family has been coming here for two years. It used to take six hours to forage in the forest. This takes twenty minutes. I'm not sure we still remember the long way.",
    action: "Don't leave food out in parks. Pack out all scraps, including organic waste. Feeding urban boar is illegal in Berlin and creates exactly this dependence.",
  },
  {
    id: 19, type: 'boar', lng: 13.332, lat: 52.567,
    kiez: 'Reinickendorf', stress: 'Feeding Ban',
    detail: 'Ban cut caloric intake 40% entering winter. Piglets underweight.',
    dispatch: "The neighbourhood voted to stop feeding us last spring. I understand — we were becoming too bold. But I hadn't prepared for winter expecting the food to continue. My family has lost fifteen percent of body weight entering the cold months. The piglets are thin.",
    action: 'Plant a native crabapple, hawthorn, or rowan in your garden. These feed foxes, boar, and birds without direct contact or habituation.',
  },

  // ── Spree ─────────────────────────────────────────────────────────
  {
    id: 20, type: 'spree', lng: 13.457, lat: 52.488,
    kiez: 'Treptow', stress: 'Warming +2°C',
    detail: 'Water 2.1°C above 1990 average. Oxygen drops. Pike cannot spawn.',
    dispatch: "The water here runs 2.1°C above its 1990 average. That sounds small. But I am a cold-water system — the pike, the crayfish, the aquatic plants are calibrated for a range I no longer reliably stay within. Oxygen drops as temperature rises. Some species have already left. Others are arriving who shouldn't be here.",
    action: 'Install a water butt to collect roof water from your building. It reduces the heat-loaded stormwater that drains into the Spree during storms.',
  },
  {
    id: 21, type: 'spree', lng: 13.395, lat: 52.515,
    kiez: 'Mitte', stress: 'Microplastics',
    detail: '4,200 microplastic particles per litre at this point.',
    dispatch: "4,200 microplastic particles per litre. That is 4,200 fragments of someone's forgotten film wrap, fleece jacket, cigarette filter, tyre rubber. I carry what the city discards. The particles enter the food chain here and travel — into fish, birds, sediment, and eventually far beyond Berlin.",
    action: 'Replace one single-use plastic item with a reusable this week. Start with whatever you use most. One less piece entering the watershed.',
  },
  {
    id: 22, type: 'spree', lng: 13.448, lat: 52.505,
    kiez: 'Friedrichshain', stress: 'Sewage Overflow',
    detail: '15,000m³ of untreated sewage after rain. Happened 8 times this year.',
    dispatch: "After the storm on June 14th, 15,000 cubic metres of mixed stormwater and untreated sewage entered me in six hours. Oxygen dropped below survival threshold for most fish. I recovered in four days. This has happened eight times this year. Before 2018, it happened twice.",
    action: 'Even a small planted container on a balcony or roof reduces stormwater runoff. Green surfaces absorb rain instead of sending it straight to the drain.',
  },
  {
    id: 23, type: 'spree', lng: 13.490, lat: 52.455,
    kiez: 'Köpenick', stress: 'Algae Bloom',
    detail: 'Phosphate runoff triggers toxic bloom. Swimming banned. Heron gone.',
    dispatch: "Phosphate from fertilisers accumulates in the slow water here each summer. When it warms, cyanobacteria blooms — toxic, green, the swimming beach closed. The heron that fished this section every morning has moved upstream. I am not the problem. I am the record of the problem.",
    action: "Switch to phosphate-free fertiliser for your garden or balcony. Look for 'phosphatfrei' on the packaging — most standard products contain phosphates.",
  },
]
