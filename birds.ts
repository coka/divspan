import { type Bird } from "./types";

export const acornWoodpecker: Bird = {
  name: "Acorn Woodpecker",
  habitats: ["forest"],
  points: 5,
};

export const americanAvocet: Bird = {
  name: "American Avocet",
  habitats: ["wetland"],
  points: 6,
};

export const americanBittern: Bird = {
  name: "American Bittern",
  habitats: ["wetland"],
  points: 7,
};

const birds: readonly Bird[] = [
  acornWoodpecker,
  americanAvocet,
  americanBittern,
  {
    name: "American Coot",
    habitats: ["wetland"],
    points: 3,
  },
  {
    name: "American Crow",
    habitats: ["forest", "grassland", "wetland"],
    points: 4,
  },
  {
    name: "American Goldfinch",
    habitats: ["grassland"],
    points: 3,
  },
  {
    name: "American Kestrel",
    habitats: ["grassland"],
    points: 5,
  },
  {
    name: "American Oystercatcher",
    habitats: ["wetland"],
    points: 5,
  },
  {
    name: "American Redstart",
    habitats: ["forest"],
    points: 4,
  },
  {
    name: "American Robin",
    habitats: ["forest", "grassland"],
    points: 1,
  },
  {
    name: "American White Pelican",
    habitats: ["wetland"],
    points: 5,
  },
  {
    name: "American Woodcock",
    habitats: ["forest", "grassland"],
    points: 9,
  },
  {
    name: "Anhinga",
    habitats: ["wetland"],
    points: 6,
  },
  {
    name: "Anna's Hummingbird",
    habitats: ["forest", "grassland", "wetland"],
    points: 4,
  },
  {
    name: "Ash-Throated Flycatcher",
    habitats: ["grassland"],
    points: 4,
  },
  {
    name: "Atlantic Puffin",
    habitats: ["wetland"],
    points: 8,
  },
  {
    name: "Baird's Sparrow",
    habitats: ["grassland"],
    points: 3,
  },
  {
    name: "Bald Eagle",
    habitats: ["wetland"],
    points: 9,
  },
  {
    name: "Baltimore Oriole",
    habitats: ["forest"],
    points: 9,
  },
  {
    name: "Barn Owl",
    habitats: ["forest", "grassland", "wetland"],
    points: 5,
  },
  {
    name: "Barn Swallow",
    habitats: ["grassland", "wetland"],
    points: 1,
  },
  {
    name: "Barred Owl",
    habitats: ["forest"],
    points: 3,
  },
  {
    name: "Barrow's Goldeneye",
    habitats: ["wetland"],
    points: 5,
  },
  {
    name: "Bell's Vireo",
    habitats: ["forest", "grassland"],
    points: 4,
  },
  {
    name: "Belted Kingfisher",
    habitats: ["wetland"],
    points: 4,
  },
  {
    name: "Bewick's Wren",
    habitats: ["forest", "grassland", "wetland"],
    points: 4,
  },
  {
    name: "Black Skimmer",
    habitats: ["wetland"],
    points: 6,
  },
  {
    name: "Black Tern",
    habitats: ["wetland"],
    points: 4,
  },
  {
    name: "Black Vulture",
    habitats: ["forest"],
    points: 2,
  },
  {
    name: "Black-Bellied Whistling-Duck",
    habitats: ["wetland"],
    points: 2,
  },
  {
    name: "Black-Billed Magpie",
    habitats: ["grassland"],
    points: 3,
  },
  {
    name: "Black-Chinned Hummingbird",
    habitats: ["forest", "grassland", "wetland"],
    points: 4,
  },
  {
    name: "Black-Crowned Night-Heron",
    habitats: ["wetland"],
    points: 9,
  },
  {
    name: "Black-Necked Stilt",
    habitats: ["wetland"],
    points: 4,
  },
  {
    name: "Blue Grosbeak",
    habitats: ["forest", "grassland", "wetland"],
    points: 4,
  },
  {
    name: "Blue Jay",
    habitats: ["forest"],
    points: 3,
  },
  {
    name: "Blue-Gray Gnatcatcher",
    habitats: ["forest"],
    points: 1,
  },
  {
    name: "Blue-Winged Warbler",
    habitats: ["forest", "grassland"],
    points: 8,
  },
  {
    name: "Bobolink",
    habitats: ["grassland"],
    points: 4,
  },
  {
    name: "Brant",
    habitats: ["wetland"],
    points: 3,
  },
  {
    name: "Brewer's Blackbird",
    habitats: ["grassland"],
    points: 3,
  },
  {
    name: "Broad-Winged Hawk",
    habitats: ["forest"],
    points: 4,
  },
  {
    name: "Bronzed Cowbird",
    habitats: ["grassland"],
    points: 5,
  },
  {
    name: "Brown Pelican",
    habitats: ["wetland"],
    points: 4,
  },
  {
    name: "Brown-Headed Cowbird",
    habitats: ["grassland"],
    points: 3,
  },
  {
    name: "Burrowing Owl",
    habitats: ["grassland"],
    points: 5,
  },
  {
    name: "Bushtit",
    habitats: ["forest", "grassland", "wetland"],
    points: 2,
  },
  {
    name: "California Condor",
    habitats: ["forest", "grassland", "wetland"],
    points: 1,
  },
  {
    name: "California Quail",
    habitats: ["forest", "grassland"],
    points: 3,
  },
  {
    name: "Canada Goose",
    habitats: ["grassland", "wetland"],
    points: 3,
  },
  {
    name: "Canvasback",
    habitats: ["wetland"],
    points: 4,
  },
  {
    name: "Carolina Chickadee",
    habitats: ["forest"],
    points: 2,
  },
  {
    name: "Carolina Wren",
    habitats: ["forest"],
    points: 1,
  },
  {
    name: "Cassin's Finch",
    habitats: ["forest"],
    points: 4,
  },
  {
    name: "Cassin's Sparrow",
    habitats: ["grassland"],
    points: 3,
  },
  {
    name: "Cedar Waxwing",
    habitats: ["forest", "grassland"],
    points: 3,
  },
  {
    name: "Cerulean Warbler",
    habitats: ["forest"],
    points: 4,
  },
  {
    name: "Chestnut-Collared Longspur",
    habitats: ["grassland"],
    points: 5,
  },
  {
    name: "Chihuahuan Raven",
    habitats: ["grassland"],
    points: 4,
  },
  {
    name: "Chimney Swift",
    habitats: ["forest", "grassland", "wetland"],
    points: 3,
  },
  {
    name: "Chipping Sparrow",
    habitats: ["forest", "grassland"],
    points: 1,
  },
  {
    name: "Clark's Grebe",
    habitats: ["wetland"],
    points: 5,
  },
  {
    name: "Clark's Nutcracker",
    habitats: ["forest"],
    points: 5,
  },
  {
    name: "Common Grackle",
    habitats: ["forest", "grassland", "wetland"],
    points: 3,
  },
  {
    name: "Common Loon",
    habitats: ["wetland"],
    points: 6,
  },
  {
    name: "Common Merganser",
    habitats: ["wetland"],
    points: 5,
  },
  {
    name: "Common Nighthawk",
    habitats: ["forest", "grassland", "wetland"],
    points: 3,
  },
  {
    name: "Common Raven",
    habitats: ["forest", "grassland", "wetland"],
    points: 5,
  },
  {
    name: "Common Yellowthroat",
    habitats: ["wetland"],
    points: 1,
  },
  {
    name: "Cooper's Hawk",
    habitats: ["forest"],
    points: 3,
  },
  {
    name: "Dark-Eyed Junco",
    habitats: ["forest", "grassland"],
    points: 3,
  },
  {
    name: "Dickcissel",
    habitats: ["grassland"],
    points: 4,
  },
  {
    name: "Double-Crested Cormorant",
    habitats: ["wetland"],
    points: 3,
  },
  {
    name: "Downy Woodpecker",
    habitats: ["forest"],
    points: 3,
  },
  {
    name: "Eastern Bluebird",
    habitats: ["grassland"],
    points: 4,
  },
  {
    name: "Eastern Kingbird",
    habitats: ["forest", "grassland", "wetland"],
    points: 2,
  },
  {
    name: "Eastern Phoebe",
    habitats: ["forest", "grassland", "wetland"],
    points: 3,
  },
  {
    name: "Eastern Screech-Owl",
    habitats: ["forest"],
    points: 4,
  },
  {
    name: "Ferruginous Hawk",
    habitats: ["grassland"],
    points: 6,
  },
  {
    name: "Fish Crow",
    habitats: ["forest", "grassland", "wetland"],
    points: 6,
  },
  {
    name: "Forster's Tern",
    habitats: ["wetland"],
    points: 4,
  },
  {
    name: "Franklin's Gull",
    habitats: ["grassland", "wetland"],
    points: 3,
  },
  {
    name: "Golden Eagle",
    habitats: ["grassland", "wetland"],
    points: 8,
  },
  {
    name: "Grasshopper Sparrow",
    habitats: ["grassland"],
    points: 2,
  },
  {
    name: "Gray Catbird",
    habitats: ["forest", "grassland", "wetland"],
    points: 5,
  },
  {
    name: "Great Blue Heron",
    habitats: ["wetland"],
    points: 5,
  },
  {
    name: "Great Crested Flycatcher",
    habitats: ["forest"],
    points: 5,
  },
  {
    name: "Great Egret",
    habitats: ["wetland"],
    points: 7,
  },
  {
    name: "Great Horned Owl",
    habitats: ["forest"],
    points: 8,
  },
  {
    name: "Greater Prairie-Chicken",
    habitats: ["grassland"],
    points: 5,
  },
  {
    name: "Greater Roadrunner",
    habitats: ["grassland"],
    points: 7,
  },
  {
    name: "Green Heron",
    habitats: ["wetland"],
    points: 4,
  },
  {
    name: "Hermit Thrush",
    habitats: ["forest"],
    points: 7,
  },
  {
    name: "Hooded Merganser",
    habitats: ["wetland"],
    points: 5,
  },
  {
    name: "Hooded Warbler",
    habitats: ["forest"],
    points: 7,
  },
  {
    name: "Horned Lark",
    habitats: ["grassland"],
    points: 5,
  },
  {
    name: "House Finch",
    habitats: ["forest", "grassland", "wetland"],
    points: 3,
  },
  {
    name: "House Wren",
    habitats: ["forest", "grassland"],
    points: 1,
  },
  {
    name: "Inca Dove",
    habitats: ["grassland"],
    points: 2,
  },
  {
    name: "Indigo Bunting",
    habitats: ["forest", "grassland"],
    points: 5,
  },
  {
    name: "Juniper Titmouse",
    habitats: ["forest"],
    points: 4,
  },
  {
    name: "Killdeer",
    habitats: ["grassland", "wetland"],
    points: 1,
  },
  {
    name: "King Rail",
    habitats: ["wetland"],
    points: 4,
  },
  {
    name: "Lazuli Bunting",
    habitats: ["grassland"],
    points: 4,
  },
  {
    name: "Lincoln's Sparrow",
    habitats: ["forest", "grassland", "wetland"],
    points: 3,
  },
  {
    name: "Loggerhead Shrike",
    habitats: ["grassland", "wetland"],
    points: 3,
  },
  {
    name: "Mallard",
    habitats: ["wetland"],
    points: 0,
  },
  {
    name: "Mississippi Kite",
    habitats: ["forest", "grassland"],
    points: 4,
  },
  {
    name: "Mountain Bluebird",
    habitats: ["grassland"],
    points: 4,
  },
  {
    name: "Mountain Chickadee",
    habitats: ["forest"],
    points: 2,
  },
  {
    name: "Mourning Dove",
    habitats: ["forest", "grassland", "wetland"],
    points: 0,
  },
  {
    name: "Northern Bobwhite",
    habitats: ["grassland"],
    points: 5,
  },
  {
    name: "Northern Cardinal",
    habitats: ["forest"],
    points: 3,
  },
  {
    name: "Northern Flicker",
    habitats: ["forest", "grassland"],
    points: 2,
  },
  {
    name: "Northern Harrier",
    habitats: ["grassland", "wetland"],
    points: 3,
  },
  {
    name: "Northern Mockingbird",
    habitats: ["forest", "grassland", "wetland"],
    points: 2,
  },
  {
    name: "Northern Shoveler",
    habitats: ["wetland"],
    points: 7,
  },
  {
    name: "Osprey",
    habitats: ["wetland"],
    points: 5,
  },
  {
    name: "Painted Bunting",
    habitats: ["grassland"],
    points: 5,
  },
  {
    name: "Painted Whitestart",
    habitats: ["forest"],
    points: 1,
  },
  {
    name: "Peregrine Falcon",
    habitats: ["grassland", "wetland"],
    points: 5,
  },
  {
    name: "Pied-Billed Grebe",
    habitats: ["wetland"],
    points: 0,
  },
  {
    name: "Pileated Woodpecker",
    habitats: ["forest"],
    points: 4,
  },
  {
    name: "Pine Siskin",
    habitats: ["forest"],
    points: 3,
  },
  {
    name: "Prothonotary Warbler",
    habitats: ["forest", "wetland"],
    points: 8,
  },
  {
    name: "Purple Gallinule",
    habitats: ["wetland"],
    points: 7,
  },
  {
    name: "Purple Martin",
    habitats: ["grassland", "wetland"],
    points: 2,
  },
  {
    name: "Pygmy Nuthatch",
    habitats: ["forest"],
    points: 2,
  },
  {
    name: "Red Crossbill",
    habitats: ["forest"],
    points: 6,
  },
  {
    name: "Red-Bellied Woodpecker",
    habitats: ["forest"],
    points: 1,
  },
  {
    name: "Red-Breasted Grosebeak",
    habitats: ["forest"],
    points: 6,
  },
  {
    name: "Red-Breasted Merganser",
    habitats: ["wetland"],
    points: 3,
  },
  {
    name: "Red-Breasted Nuthatch",
    habitats: ["forest"],
    points: 2,
  },
  {
    name: "Red-Cockaded Woodpecker",
    habitats: ["forest"],
    points: 4,
  },
  {
    name: "Red-Eyed Vireo",
    habitats: ["forest"],
    points: 3,
  },
  {
    name: "Red-Headed Woodpecker",
    habitats: ["forest", "grassland", "wetland"],
    points: 4,
  },
  {
    name: "Red-Shouldered Hawk",
    habitats: ["forest"],
    points: 3,
  },
  {
    name: "Red-Tailed Hawk",
    habitats: ["forest", "grassland", "wetland"],
    points: 5,
  },
  {
    name: "Red-Winged Blackbird",
    habitats: ["grassland", "wetland"],
    points: 2,
  },
  {
    name: "Ring-Billed Gull",
    habitats: ["wetland"],
    points: 4,
  },
  {
    name: "Roseate Spoonbill",
    habitats: ["wetland"],
    points: 6,
  },
  {
    name: "Ruby-Crowned Kinglet",
    habitats: ["forest"],
    points: 2,
  },
  {
    name: "Ruby-Throated Hummingbird",
    habitats: ["forest", "grassland", "wetland"],
    points: 4,
  },
  {
    name: "Ruddy Duck",
    habitats: ["wetland"],
    points: 0,
  },
  {
    name: "Sandhill Crane",
    habitats: ["grassland", "wetland"],
    points: 5,
  },
  {
    name: "Savannah Sparrow",
    habitats: ["grassland"],
    points: 2,
  },
  {
    name: "Say's Phoebe",
    habitats: ["grassland"],
    points: 5,
  },
  {
    name: "Scaled Quail",
    habitats: ["grassland"],
    points: 0,
  },
  {
    name: "Scissor-Tailed Flycatcher",
    habitats: ["grassland"],
    points: 8,
  },
  {
    name: "Snowy Egret",
    habitats: ["wetland"],
    points: 4,
  },
  {
    name: "Song Sparrow",
    habitats: ["forest", "grassland", "wetland"],
    points: 0,
  },
  {
    name: "Spotted Owl",
    habitats: ["forest"],
    points: 5,
  },
  {
    name: "Spotted Sandpiper",
    habitats: ["wetland"],
    points: 5,
  },
  {
    name: "Spotted Towhee",
    habitats: ["forest", "grassland"],
    points: 0,
  },
  {
    name: "Sprague's Pipit",
    habitats: ["grassland"],
    points: 3,
  },
  {
    name: "Steller's Jay",
    habitats: ["forest"],
    points: 5,
  },
  {
    name: "Swainson's Hawk",
    habitats: ["grassland"],
    points: 5,
  },
  {
    name: "Tree Swallow",
    habitats: ["wetland"],
    points: 3,
  },
  {
    name: "Trumpeter Swan",
    habitats: ["wetland"],
    points: 9,
  },
  {
    name: "Tufted Titmouse",
    habitats: ["forest"],
    points: 2,
  },
  {
    name: "Turkey Vulture",
    habitats: ["forest", "grassland", "wetland"],
    points: 1,
  },
  {
    name: "Vaux's Swift",
    habitats: ["forest"],
    points: 2,
  },
  {
    name: "Violet-Green Swallow",
    habitats: ["forest", "grassland", "wetland"],
    points: 3,
  },
  {
    name: "Western Meadowlark",
    habitats: ["grassland"],
    points: 2,
  },
  {
    name: "Western Tanager",
    habitats: ["forest"],
    points: 6,
  },
  {
    name: "White-Breasted Nuthatch",
    habitats: ["forest"],
    points: 2,
  },
  {
    name: "White-Crowned Sparrow",
    habitats: ["forest", "grassland", "wetland"],
    points: 2,
  },
  {
    name: "White-Faced Ibis",
    habitats: ["wetland"],
    points: 8,
  },
  {
    name: "White-Throated Swift",
    habitats: ["grassland"],
    points: 2,
  },
  {
    name: "Whooping Crane",
    habitats: ["wetland"],
    points: 6,
  },
  {
    name: "Wild Turkey",
    habitats: ["forest", "grassland"],
    points: 8,
  },
  {
    name: "Willet",
    habitats: ["wetland"],
    points: 4,
  },
  {
    name: "Wilson's Snipe",
    habitats: ["wetland"],
    points: 5,
  },
  {
    name: "Wood Duck",
    habitats: ["forest", "wetland"],
    points: 4,
  },
  {
    name: "Wood Stork",
    habitats: ["wetland"],
    points: 6,
  },
  {
    name: "Yellow-Bellied Sapsucker",
    habitats: ["forest"],
    points: 3,
  },
  {
    name: "Yellow-Billed Cuckoo",
    habitats: ["forest"],
    points: 5,
  },
  {
    name: "Yellow-Breasted Chat",
    habitats: ["forest", "grassland", "wetland"],
    points: 5,
  },
  {
    name: "Yellow-Headed Blackbird",
    habitats: ["wetland"],
    points: 4,
  },
  {
    name: "Yellow-Rumped Warbler",
    habitats: ["forest"],
    points: 1,
  },
] as const;

export default birds;
