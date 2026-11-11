const fs = require('fs');
const path = require('path');

const categoriesData = [
  {
    name: "Men's Perfumes",
    slug: "mens-perfumes",
    description: "Bold, charismatic, and magnetic fragrances crafted for the modern gentleman.",
    image_url: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Women's Perfumes",
    slug: "womens-perfumes",
    description: "Sophisticated, enchanting, and radiant bouquets of couture florals and sweet amber.",
    image_url: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Unisex Perfumes",
    slug: "unisex-perfumes",
    description: "Boundary-defying niche creations celebrated by all connoisseurs of fine fragrance.",
    image_url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Luxury Perfumes",
    slug: "luxury-perfumes",
    description: "Ultra-concentrated Extraits and private reserve blends using the rarest world essences.",
    image_url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Arabic Perfumes",
    slug: "arabic-perfumes",
    description: "Opulent Middle Eastern fragrances rich in amber, warm spices, saffron, and sweet musks.",
    image_url: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Floral Fragrances",
    slug: "floral-fragrances",
    description: "Timeless blossoming petals of Grasse rose, nocturnal jasmine, peony, and white flowers.",
    image_url: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Oud Collection",
    slug: "oud-collection",
    description: "Smoky, hypnotic, and resinous agarwood elixirs embodying true luxury and depth.",
    image_url: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Body Mists",
    slug: "body-mists",
    description: "Light, refreshing all-day fragrance sprays infused with gourmand vanilla and fresh fruits.",
    image_url: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "The latest prestige releases, seasonal extraits, and limited edition perfume drops.",
    image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Best Sellers",
    slug: "best-sellers",
    description: "The world's most sought-after, critically acclaimed fragrances and iconic signatures.",
    image_url: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80"
  }
];

const brandsData = [
  {
    name: "Dior",
    slug: "dior",
    description: "French luxury fashion house renowned for iconic fragrances including Sauvage, J'adore, and Dior Homme.",
    logo_url: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Chanel",
    slug: "chanel",
    description: "Legendary Parisian perfumer behind Chanel No. 5, Bleu de Chanel, and Coco Mademoiselle.",
    logo_url: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Gucci",
    slug: "gucci",
    description: "Italian haute couture master known for Gucci Bloom, Gucci Guilty, and Intense Oud.",
    logo_url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Versace",
    slug: "versace",
    description: "Bold Italian glamour featuring Eros, Dylan Blue, Bright Crystal, and Oud Noir.",
    logo_url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Giorgio Armani",
    slug: "armani",
    description: "Timeless Italian elegance embodied by Acqua Di Gio, Armani Code, and Armani Prive.",
    logo_url: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Yves Saint Laurent",
    slug: "ysl",
    description: "Sensual avant-garde luxury behind Black Opium, Libre, Y Eau de Parfum, and La Nuit de L'Homme.",
    logo_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Davidoff",
    slug: "davidoff",
    description: "Pioneers of oceanic aquatic freshness famous for Cool Water Man and Cool Water Woman.",
    logo_url: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Tom Ford",
    slug: "tom-ford",
    description: "Provocative private blends including Tobacco Vanille, Oud Wood, and Lost Cherry.",
    logo_url: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Creed",
    slug: "creed",
    description: "Historic Anglo-French dynasty celebrated for Aventus, Green Irish Tweed, and Silver Mountain Water.",
    logo_url: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Maison Francis Kurkdjian",
    slug: "mfk",
    description: "Sublime Parisian niche perfumery creating Baccarat Rouge 540 and Grand Soir.",
    logo_url: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Lattafa",
    slug: "lattafa",
    description: "World-leading Dubai perfumer renowned for Khamrah, Asad, Bade'e Al Oud, and Yara.",
    logo_url: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Victoria's Secret",
    slug: "victorias-secret",
    description: "Iconic fragrance mists including Bare Vanilla, Pure Seduction, Velvet Petals, and Love Spell.",
    logo_url: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Sol de Janeiro",
    slug: "sol-de-janeiro",
    description: "Viral Brazilian body and hair mists inspired by the vibrant warmth of Rio de Janeiro.",
    logo_url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=300&q=80"
  }
];

// Curated high quality authentic images
const IMAGES = {
  mens_blue: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
  mens_dark: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
  mens_amber: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
  mens_gold: "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
  womens_pink: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
  womens_crystal: "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
  womens_rose: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80",
  womens_gold: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
  unisex_niche: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
  unisex_minimal: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
  unisex_marble: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
  luxury_gold: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
  luxury_black: "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80",
  arabic_oud: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
  arabic_royal: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&w=800&q=80",
  oud_smoky: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
  oud_amber: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
  floral_bouquet: "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80",
  floral_chanel: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
  mist_spray: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80",
  mist_pastel: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
};

// 20 products for each category
const RAW_CATALOG = {
  "mens-perfumes": [
    { name: "Dior Sauvage Eau de Parfum", brand: "dior", gender: "Men", price: 9800, discount: 7990, vol: 100, conc: "Eau De Parfum", top: ["Calabrian Bergamot", "Sichuan Pepper"], heart: ["Star Anise", "Nutmeg", "Lavender"], base: ["Papua Vanilla", "Ambroxan"], img: IMAGES.mens_blue },
    { name: "Bleu de Chanel Eau de Parfum", brand: "chanel", gender: "Men", price: 11500, discount: 9900, vol: 100, conc: "Eau De Parfum", top: ["Grapefruit", "Lemon", "Mint"], heart: ["Ginger", "Iso E Super", "Nutmeg"], base: ["Incense", "Vetiver", "Cedarwood"], img: IMAGES.mens_dark },
    { name: "Giorgio Armani Acqua Di Gio Profondo", brand: "armani", gender: "Men", price: 8900, discount: 7450, vol: 75, conc: "Eau De Parfum", top: ["Marine Notes", "Green Mandarin"], heart: ["Rosemary", "Lavender", "Cypress"], base: ["Mineral Amber", "Patchouli", "Musk"], img: IMAGES.mens_blue },
    { name: "Versace Eros Eau de Toilette", brand: "versace", gender: "Men", price: 6800, discount: 5499, vol: 100, conc: "Eau De Toilette", top: ["Mint Leaves", "Italian Lemon", "Green Apple"], heart: ["Tonka Bean", "Ambroxan", "Geranium"], base: ["Madagascar Vanilla", "Cedarwood", "Oakmoss"], img: IMAGES.mens_dark },
    { name: "Yves Saint Laurent Y Eau de Parfum", brand: "ysl", gender: "Men", price: 8900, discount: 7200, vol: 100, conc: "Eau De Parfum", top: ["Apple", "Ginger", "Bergamot"], heart: ["Sage", "Juniper Berries", "Geranium"], base: ["Amberwood", "Tonka Bean", "Cedar"], img: IMAGES.mens_blue },
    { name: "Davidoff Cool Water Eau de Toilette", brand: "davidoff", gender: "Men", price: 4200, discount: 2999, vol: 125, conc: "Eau De Toilette", top: ["Sea Water", "Mint", "Green Notes"], heart: ["Sandalwood", "Jasmine", "Neroli"], base: ["Tobacco", "Oakmoss", "Cedarwood"], img: IMAGES.mens_dark },
    { name: "Creed Aventus Extrait de Parfum", brand: "creed", gender: "Men", price: 28500, discount: 24900, vol: 100, conc: "Extrait De Parfum (Luxury)", top: ["Blackcurrant", "Italian Bergamot", "French Apple"], heart: ["Birch", "Patchouli", "Moroccan Jasmine"], base: ["Musk", "Oakmoss", "Ambergris"], img: IMAGES.mens_gold },
    { name: "Tom Ford Noir Extreme", brand: "tom-ford", gender: "Men", price: 16500, discount: 13900, vol: 100, conc: "Eau De Parfum", top: ["Cardamom", "Nutmeg", "Saffron"], heart: ["Kulfi Accord", "Rose", "Orange Blossom"], base: ["Vanilla", "Amber", "Sandalwood"], img: IMAGES.mens_amber },
    { name: "Gucci Guilty Pour Homme", brand: "gucci", gender: "Men", price: 7900, discount: 6499, vol: 90, conc: "Eau De Parfum", top: ["French Lavender", "Amalfi Lemon"], heart: ["Orange Blossom", "Neroli"], base: ["Cedarwood", "Patchouli"], img: IMAGES.mens_dark },
    { name: "Dior Fahrenheit Eau de Toilette", brand: "dior", gender: "Men", price: 8200, discount: 6999, vol: 100, conc: "Eau De Toilette", top: ["Nutmeg Flower", "Lavender", "Cedar"], heart: ["Violet Leaf", "Nutmeg", "Carnation"], base: ["Leather", "Vetiver", "Tonka Bean"], img: IMAGES.mens_amber },
    { name: "Versace Dylan Blue Pour Homme", brand: "versace", gender: "Men", price: 6900, discount: 5599, vol: 100, conc: "Eau De Toilette", top: ["Calabrian Bergamot", "Grapefruit", "Fig Leaf"], heart: ["Violet Leaf", "Papyrus Wood", "Patchouli"], base: ["Mineral Musk", "Tonka Bean", "Saffron"], img: IMAGES.mens_blue },
    { name: "Giorgio Armani Code Parfum", brand: "armani", gender: "Men", price: 9200, discount: 7800, vol: 75, conc: "Eau De Parfum", top: ["Bergamot Leaf", "Green Mandarin"], heart: ["Clary Sage", "Iris Root"], base: ["Tonka Bean", "Cedarwood"], img: IMAGES.mens_dark },
    { name: "Yves Saint Laurent La Nuit de L'Homme", brand: "ysl", gender: "Men", price: 8400, discount: 6890, vol: 100, conc: "Eau De Toilette", top: ["Cardamom"], heart: ["Lavender", "Virginia Cedar", "Bergamot"], base: ["Caraway", "Vetiver"], img: IMAGES.mens_amber },
    { name: "Chanel Allure Homme Sport", brand: "chanel", gender: "Men", price: 10800, discount: 9200, vol: 100, conc: "Eau De Toilette", top: ["Orange", "Sea Notes", "Aldehydes"], heart: ["Pepper", "Neroli", "Cedar"], base: ["Tonka Bean", "Vanilla", "White Musk"], img: IMAGES.mens_blue },
    { name: "Davidoff Cool Water Reborn", brand: "davidoff", gender: "Men", price: 4600, discount: 3499, vol: 100, conc: "Eau De Parfum", top: ["Galbanum", "Rosemary"], heart: ["Bourbon Vetiver"], base: ["Haitian Vetiver", "Amber"], img: IMAGES.mens_dark },
    { name: "Dior Homme Intense", brand: "dior", gender: "Men", price: 10500, discount: 8900, vol: 100, conc: "Eau De Parfum", top: ["Tuscan Iris", "Lavender"], heart: ["Ambrette Seed", "Pear"], base: ["Virginia Cedar", "Vetiver"], img: IMAGES.mens_amber },
    { name: "Versace Eros Flame", brand: "versace", gender: "Men", price: 7200, discount: 5800, vol: 100, conc: "Eau De Parfum", top: ["Chinotto", "Madagascar Black Pepper"], heart: ["Wild Mountain Rosemary", "Rose"], base: ["Texas Cedar", "Haitian Vetiver", "Vanilla"], img: IMAGES.mens_gold },
    { name: "Lattafa Asad Pour Homme", brand: "lattafa", gender: "Men", price: 2999, discount: 1999, vol: 100, conc: "Eau De Parfum", top: ["Black Pepper", "Pineapple", "Tobacco"], heart: ["Coffee", "Patchouli", "Iris"], base: ["Amber", "Vanilla", "Dry Woods"], img: IMAGES.mens_dark },
    { name: "Giorgio Armani Stronger With You Intensely", brand: "armani", gender: "Men", price: 7800, discount: 6490, vol: 100, conc: "Eau De Parfum", top: ["Pink Pepper", "Juniper"], heart: ["Lavender", "Sage", "Toffee"], base: ["Vanilla", "Amber", "Suede"], img: IMAGES.mens_amber },
    { name: "Davidoff Horizon Extreme", brand: "davidoff", gender: "Men", price: 4800, discount: 3600, vol: 125, conc: "Eau De Parfum", top: ["Grapefruit", "Ginger", "Rosemary"], heart: ["Cedarwood", "Nutmeg", "Cypriol"], base: ["Amber", "Sandalwood"], img: IMAGES.mens_blue }
  ],

  "womens-perfumes": [
    { name: "Chanel Coco Mademoiselle", brand: "chanel", gender: "Women", price: 12500, discount: 10800, vol: 100, conc: "Eau De Parfum", top: ["Orange", "Mandarin", "Bergamot"], heart: ["Turkish Rose", "Jasmine", "Mimosa"], base: ["Patchouli", "White Musk", "Vanilla"], img: IMAGES.womens_pink },
    { name: "Dior J'adore Eau de Parfum", brand: "dior", gender: "Women", price: 11800, discount: 9990, vol: 100, conc: "Eau De Parfum", top: ["Pear", "Melon", "Magnolia"], heart: ["Jasmine", "Lily-of-the-Valley", "Tuberose"], base: ["Musk", "Vanilla", "Cedar"], img: IMAGES.womens_gold },
    { name: "Yves Saint Laurent Libre Eau de Parfum", brand: "ysl", gender: "Women", price: 9800, discount: 8200, vol: 90, conc: "Eau De Parfum", top: ["Lavender", "Mandarin Orange", "Blackcurrant"], heart: ["Orange Blossom", "Jasmine"], base: ["Madagascar Vanilla", "Cedar", "Ambergris"], img: IMAGES.womens_gold },
    { name: "Gucci Bloom Eau de Parfum", brand: "gucci", gender: "Women", price: 9200, discount: 7600, vol: 100, conc: "Eau De Parfum", top: ["Rangoon Creeper"], heart: ["Tuberose", "Jasmine Bud"], base: ["Sandalwood", "Vanilla"], img: IMAGES.womens_pink },
    { name: "Versace Bright Crystal Absolu", brand: "versace", gender: "Women", price: 6900, discount: 5490, vol: 90, conc: "Eau De Parfum", top: ["Pomegranate", "Yuzu", "Iced Accord"], heart: ["Peony", "Magnolia", "Lotus Flower", "Raspberry"], base: ["Amber", "Musk", "Mahogany"], img: IMAGES.womens_crystal },
    { name: "Giorgio Armani Si Passione", brand: "armani", gender: "Women", price: 8900, discount: 7300, vol: 100, conc: "Eau De Parfum", top: ["Blackcurrant", "Pear", "Pink Pepper"], heart: ["Rose", "Jasmine", "Heliotrope"], base: ["Vanilla", "Cedarwood"], img: IMAGES.womens_rose },
    { name: "Yves Saint Laurent Black Opium", brand: "ysl", gender: "Women", price: 9600, discount: 7990, vol: 90, conc: "Eau De Parfum", top: ["Pear", "Pink Pepper", "Orange Blossom"], heart: ["Coffee", "Jasmine", "Bitter Almond"], base: ["Vanilla", "Patchouli", "Cashmere Wood"], img: IMAGES.womens_crystal },
    { name: "Dior Miss Dior Blooming Bouquet", brand: "dior", gender: "Women", price: 10200, discount: 8600, vol: 100, conc: "Eau De Toilette", top: ["Damascus Rose", "Calabrian Bergamot"], heart: ["Peony", "Apricot", "Peach"], base: ["White Musk"], img: IMAGES.womens_pink },
    { name: "Chanel Chance Eau Tendre", brand: "chanel", gender: "Women", price: 11200, discount: 9600, vol: 100, conc: "Eau De Parfum", top: ["Quince", "Grapefruit"], heart: ["Hyacinth", "Jasmine"], base: ["Musk", "Iris", "Virginia Cedar"], img: IMAGES.womens_crystal },
    { name: "Gucci Flora Gorgeous Gardenia", brand: "gucci", gender: "Women", price: 8800, discount: 7200, vol: 100, conc: "Eau De Parfum", top: ["Pear Blossom", "Italian Mandarin"], heart: ["White Gardenia", "Solar Jasmine"], base: ["Brown Sugar", "Patchouli"], img: IMAGES.womens_rose },
    { name: "Versace Crystal Noir", brand: "versace", gender: "Women", price: 7400, discount: 5990, vol: 90, conc: "Eau De Parfum", top: ["Cardamom", "Ginger", "Pepper"], heart: ["Gardenia", "Coconut", "Peony"], base: ["Amber", "Musk", "Sandalwood"], img: IMAGES.womens_crystal },
    { name: "Giorgio Armani My Way Intense", brand: "armani", gender: "Women", price: 8600, discount: 7100, vol: 90, conc: "Eau De Parfum", top: ["Orange Blossom", "Bitter Orange"], heart: ["Indian Tuberose", "Tuberose"], base: ["Madagascar Vanilla", "Sandalwood"], img: IMAGES.womens_pink },
    { name: "Yves Saint Laurent Mon Paris", brand: "ysl", gender: "Women", price: 8900, discount: 7400, vol: 90, conc: "Eau De Parfum", top: ["Strawberry", "Raspberry", "Bergamot"], heart: ["Datura", "Peony", "Chinese Jasmine"], base: ["Indonesian Patchouli", "White Musk"], img: IMAGES.womens_rose },
    { name: "Dior Poison Girl", brand: "dior", gender: "Women", price: 9400, discount: 7890, vol: 100, conc: "Eau De Parfum", top: ["Bitter Orange", "Lemon"], heart: ["Damask Rose", "Grasse Rose", "Orange Blossom"], base: ["Tonka Bean", "Vanilla", "Almond"], img: IMAGES.womens_pink },
    { name: "Davidoff Cool Water Woman", brand: "davidoff", gender: "Women", price: 4200, discount: 2999, vol: 100, conc: "Eau De Toilette", top: ["Melon", "Lotus", "Lemon", "Pineapple"], heart: ["Water Lily", "Lily-of-the-Valley", "Jasmine"], base: ["Musk", "Vanilla", "Peach"], img: IMAGES.womens_crystal },
    { name: "Lattafa Yara Pink", brand: "lattafa", gender: "Women", price: 2800, discount: 1850, vol: 100, conc: "Eau De Parfum", top: ["Heliotrope", "Orchid", "Tangerine"], heart: ["Gourmand Accord", "Tropical Fruits"], base: ["Vanilla", "Sandalwood", "Musk"], img: IMAGES.womens_pink },
    { name: "Tom Ford Velvet Orchid", brand: "tom-ford", gender: "Women", price: 15500, discount: 12900, vol: 100, conc: "Eau De Parfum", top: ["Rum", "Honey", "Mandarin Orange"], heart: ["Black Orchid", "Rose Oil", "Jasmine"], base: ["Vanilla", "Myrrh", "Sandalwood"], img: IMAGES.womens_crystal },
    { name: "Chanel No. 5 L'Eau", brand: "chanel", gender: "Women", price: 11900, discount: 10200, vol: 100, conc: "Eau De Toilette", top: ["Aldehydes", "Lemon", "Neroli"], heart: ["Ylang-Ylang", "Jasmine", "Rose"], base: ["White Musk", "Cedar", "Vanilla"], img: IMAGES.womens_gold },
    { name: "Gucci Guilty Eau de Parfum Intense", brand: "gucci", gender: "Women", price: 9500, discount: 7800, vol: 90, conc: "Eau De Parfum", top: ["Mandora", "Litchi", "Violet"], heart: ["Ylang-Ylang", "Tuberose", "Plum"], base: ["Patchouli", "Vanilla", "Vetiver"], img: IMAGES.womens_rose },
    { name: "Versace Dylan Purple", brand: "versace", gender: "Women", price: 6800, discount: 5400, vol: 100, conc: "Eau De Parfum", top: ["Pear", "Bitter Orange", "Bergamot"], heart: ["Freesia", "Pomarose", "Mahonial"], base: ["Ambroxan", "Iso E Super", "Virginia Cedar"], img: IMAGES.womens_crystal }
  ],

  "unisex-perfumes": [
    { name: "Maison Francis Kurkdjian Baccarat Rouge 540", brand: "mfk", gender: "Unisex", price: 24500, discount: 21200, vol: 70, conc: "Eau De Parfum", top: ["Jasmine", "Saffron"], heart: ["Amberwood", "Ambergris"], base: ["Fir Resin", "Cedarwood"], img: IMAGES.unisex_niche },
    { name: "Tom Ford Tobacco Vanille", brand: "tom-ford", gender: "Unisex", price: 18500, discount: 15900, vol: 100, conc: "Eau De Parfum", top: ["Tobacco Leaf", "Spicy Notes"], heart: ["Tonka Bean", "Tobacco Blossom", "Vanilla", "Cacao"], base: ["Dried Fruits", "Woody Notes"], img: IMAGES.unisex_niche },
    { name: "Tom Ford Lost Cherry", brand: "tom-ford", gender: "Unisex", price: 22000, discount: 18500, vol: 50, conc: "Eau De Parfum", top: ["Sour Cherry", "Bitter Almond", "Liqueur"], heart: ["Sour Cherry", "Plum", "Turkish Rose"], base: ["Tonka Bean", "Vanilla", "Peru Balsam"], img: IMAGES.unisex_minimal },
    { name: "Creed Silver Mountain Water", brand: "creed", gender: "Unisex", price: 26500, discount: 22800, vol: 100, conc: "Eau De Parfum", top: ["Bergamot", "Mandarin Orange"], heart: ["Green Tea", "Blackcurrant"], base: ["Musk", "Petitgrain", "Sandalwood"], img: IMAGES.unisex_minimal },
    { name: "Maison Francis Kurkdjian Grand Soir", brand: "mfk", gender: "Unisex", price: 19500, discount: 16800, vol: 70, conc: "Eau De Parfum", top: ["Spanish Labdanum"], heart: ["Benzoin of Siam"], base: ["Brazilian Tonka Bean", "Vanilla", "Amber"], img: IMAGES.unisex_marble },
    { name: "Lattafa Khamrah Eau de Parfum", brand: "lattafa", gender: "Unisex", price: 3499, discount: 2399, vol: 100, conc: "Eau De Parfum", top: ["Cinnamon", "Nutmeg", "Bergamot"], heart: ["Dates", "Praline", "Tuberose"], base: ["Vanilla", "Tonka Bean", "Amberwood", "Myrrh"], img: IMAGES.unisex_niche },
    { name: "Dior Gris Dior Private Collection", brand: "dior", gender: "Unisex", price: 21000, discount: 17900, vol: 125, conc: "Extrait De Parfum (Luxury)", top: ["Bergamot", "Grapefruit"], heart: ["Rose", "Jasmine", "Strawberry"], base: ["Patchouli", "Oakmoss", "Amber", "Cedar"], img: IMAGES.unisex_minimal },
    { name: "Chanel Les Exclusifs Sycomore", brand: "chanel", gender: "Unisex", price: 23000, discount: 19800, vol: 75, conc: "Eau De Parfum", top: ["Pink Pepper", "Aldehydes"], heart: ["Vetiver", "Cypress", "Juniper"], base: ["Sandalwood", "Tobacco", "Spices"], img: IMAGES.unisex_marble },
    { name: "Giorgio Armani Prive Rouge Malachite", brand: "armani", gender: "Unisex", price: 22500, discount: 18900, vol: 100, conc: "Eau De Parfum", top: ["Tuberose", "Pink Pepper", "Clary Sage"], heart: ["Tuberose", "Orange Blossom", "Ylang-Ylang"], base: ["Amber", "Benzoin", "Cashmeran"], img: IMAGES.unisex_niche },
    { name: "Gucci Memoire d'une Odeur", brand: "gucci", gender: "Unisex", price: 8200, discount: 6700, vol: 100, conc: "Eau De Parfum", top: ["Roman Chamomile", "Bitter Almond"], heart: ["Indian Coral Jasmine", "Petals", "Musk"], base: ["Vanilla", "Cedarwood", "Sandalwood"], img: IMAGES.unisex_minimal },
    { name: "Yves Saint Laurent Tuxedo Epices", brand: "ysl", gender: "Unisex", price: 19800, discount: 16900, vol: 125, conc: "Eau De Parfum", top: ["Violet Leaf", "Coriander", "Bergamot"], heart: ["Rose", "Black Pepper", "Lily-of-the-Valley"], base: ["Patchouli", "Ambergris", "Bourbon Vanilla"], img: IMAGES.unisex_niche },
    { name: "Versace Atelier Cedrat de Cœur", brand: "versace", gender: "Unisex", price: 18900, discount: 15800, vol: 100, conc: "Eau De Parfum", top: ["Italian Cedrat", "Bergamot"], heart: ["Grapefruit Flower", "Neroli"], base: ["Precious Woods", "Oakmoss"], img: IMAGES.unisex_marble },
    { name: "Tom Ford Soleil Blanc", brand: "tom-ford", gender: "Unisex", price: 17500, discount: 14800, vol: 100, conc: "Eau De Parfum", top: ["Pistachio", "Bergamot", "Cardamom"], heart: ["Tuberose", "Ylang-Ylang", "Jasmine"], base: ["Coconut", "Amber", "Tonka Bean"], img: IMAGES.unisex_minimal },
    { name: "Maison Francis Kurkdjian Aqua Universalis", brand: "mfk", gender: "Unisex", price: 17800, discount: 15200, vol: 70, conc: "Eau De Toilette", top: ["Calabrian Bergamot", "Sicilian Lemon"], heart: ["White Flowers", "Mock Orange"], base: ["Light Musks", "Woody Notes"], img: IMAGES.unisex_minimal },
    { name: "Creed Millesime Imperial", brand: "creed", gender: "Unisex", price: 25000, discount: 21500, vol: 100, conc: "Eau De Parfum", top: ["Fruity Notes", "Sea Salt"], heart: ["Sicilian Lemon", "Bergamot", "Iris"], base: ["Musk", "Woody Notes", "Marine Accord"], img: IMAGES.unisex_marble },
    { name: "Dior Ambre Nuit", brand: "dior", gender: "Unisex", price: 21500, discount: 18200, vol: 125, conc: "Extrait De Parfum (Luxury)", top: ["Bergamot", "Grapefruit"], heart: ["Damask Rose", "Pink Pepper"], base: ["Ambergris", "Cedar", "Guaiac Wood"], img: IMAGES.unisex_niche },
    { name: "Lattafa Bade'e Al Oud (Oud for Glory)", brand: "lattafa", gender: "Unisex", price: 3200, discount: 2199, vol: 100, conc: "Eau De Parfum", top: ["Saffron", "Nutmeg", "Lavender"], heart: ["Agarwood (Oud)", "Patchouli"], base: ["Oud", "Patchouli", "Musk"], img: IMAGES.unisex_niche },
    { name: "Chanel Les Exclusifs Coromandel", brand: "chanel", gender: "Unisex", price: 24000, discount: 20500, vol: 75, conc: "Eau De Parfum", top: ["Bitter Orange", "Neroli", "Citrus"], heart: ["Patchouli", "Orris", "Rose", "Jasmine"], base: ["White Chocolate", "Benzoin", "Amber"], img: IMAGES.unisex_marble },
    { name: "Gucci The Alchemist's Garden The Voice of the Snake", brand: "gucci", gender: "Unisex", price: 26000, discount: 22000, vol: 100, conc: "Eau De Parfum", top: ["Oud"], heart: ["Patchouli"], base: ["Saffron"], img: IMAGES.unisex_niche },
    { name: "Tom Ford Bitter Peach", brand: "tom-ford", gender: "Unisex", price: 23500, discount: 19800, vol: 50, conc: "Eau De Parfum", top: ["Peche de Vigne", "Blood Orange", "Cardamom"], heart: ["Rum", "Cognac", "Davana", "Jasmine"], base: ["Indonesian Patchouli", "Vanilla", "Sandalwood"], img: IMAGES.unisex_minimal }
  ],

  "luxury-perfumes": [
    { name: "Clive Christian No. 1 Imperial", brand: "creed", gender: "Unisex", price: 42000, discount: 36500, vol: 50, conc: "Extrait De Parfum (Luxury)", top: ["Cardamom", "Nutmeg", "Lime", "Mandarin"], heart: ["Ylang-Ylang", "Heliotrope", "Rose", "Jasmine"], base: ["50-Year Sandalwood", "Vanilla", "Cedarwood"], img: IMAGES.luxury_gold },
    { name: "Roja Parfums Elysium Pour Homme Parfum", brand: "creed", gender: "Men", price: 32000, discount: 27900, vol: 100, conc: "Extrait De Parfum (Luxury)", top: ["Grapefruit", "Lemon", "Bergamot", "Lime"], heart: ["Vetiver", "Juniper Berries", "Blackcurrant"], base: ["Ambergris", "Benzoin", "Vanilla", "Leather"], img: IMAGES.luxury_black },
    { name: "Tom Ford Oud Wood Private Blend", brand: "tom-ford", gender: "Unisex", price: 21000, discount: 17900, vol: 100, conc: "Eau De Parfum", top: ["Rare Oud Wood", "Rosewood"], heart: ["Cardamom", "Sichuan Pepper", "Sandalwood"], base: ["Tonka Bean", "Vanilla", "Amber"], img: IMAGES.luxury_black },
    { name: "Creed Royal Oud Millesime", brand: "creed", gender: "Unisex", price: 27500, discount: 23500, vol: 100, conc: "Eau De Parfum", top: ["Pink Berry", "Lemon", "Sicilian Bergamot"], heart: ["Cedar", "Galbanum", "Angelic Root"], base: ["Regal Indian Oud", "Sandalwood", "Tonkin Musk"], img: IMAGES.luxury_gold },
    { name: "Maison Francis Kurkdjian Baccarat Rouge 540 Extrait", brand: "mfk", gender: "Unisex", price: 31000, discount: 26900, vol: 70, conc: "Extrait De Parfum (Luxury)", top: ["Bitter Almond", "Saffron"], heart: ["Egyptian Jasmine Grandiflorum", "Cedarwood"], base: ["Ambergris", "Woody Musk"], img: IMAGES.luxury_gold },
    { name: "Dior Tobacolor Private Blend", brand: "dior", gender: "Unisex", price: 22000, discount: 18900, vol: 125, conc: "Extrait De Parfum (Luxury)", top: ["Tobacco Leaf", "Citrus Notes"], heart: ["Honey", "Plum", "Peach"], base: ["White Tobacco", "Smoke", "Amber"], img: IMAGES.luxury_black },
    { name: "Chanel Les Exclusifs Le Lion", brand: "chanel", gender: "Unisex", price: 24500, discount: 21000, vol: 75, conc: "Eau De Parfum", top: ["Lemon", "Bergamot"], heart: ["Amber", "Labdanum"], base: ["Madagascar Vanilla", "Patchouli", "Sandalwood"], img: IMAGES.luxury_gold },
    { name: "Armani Prive Oud Royal", brand: "armani", gender: "Unisex", price: 23500, discount: 19900, vol: 100, conc: "Extrait De Parfum (Luxury)", top: ["Saffron", "Incense"], heart: ["Agarwood (Oud)", "Rose"], base: ["Amber", "Sandalwood", "Myrrh"], img: IMAGES.luxury_black },
    { name: "Yves Saint Laurent Magnificent Gold", brand: "ysl", gender: "Unisex", price: 21500, discount: 18200, vol: 125, conc: "Eau De Parfum", top: ["Saffron", "Pink Pepper"], heart: ["White Oud", "Sandalwood"], base: ["Vanilla", "Musk"], img: IMAGES.luxury_gold },
    { name: "Gucci The Alchemist's Garden A Midnight Stroll", brand: "gucci", gender: "Unisex", price: 26500, discount: 22500, vol: 100, conc: "Eau De Parfum", top: ["Incense"], heart: ["Cade Wood"], base: ["Cypress"], img: IMAGES.luxury_black },
    { name: "Tom Ford Tuscan Leather Intense", brand: "tom-ford", gender: "Unisex", price: 24000, discount: 20200, vol: 100, conc: "Eau De Parfum", top: ["Davana", "Raspberry", "Saffron", "Thyme"], heart: ["Olibanum", "Night Blooming Jasmine"], base: ["Leather", "Black Suede", "Amberwood"], img: IMAGES.luxury_black },
    { name: "Creed Viking Cologne", brand: "creed", gender: "Men", price: 25500, discount: 21800, vol: 100, conc: "Eau De Parfum", top: ["Mandarin Orange", "Lemon", "Pink Pepper"], heart: ["Lavender", "Geranium", "Nutmeg", "Sage"], base: ["Sandalwood", "Frankincense", "Patchouli", "Vetiver"], img: IMAGES.luxury_gold },
    { name: "Maison Francis Kurkdjian Oud Silk Mood Extrait", brand: "mfk", gender: "Unisex", price: 29500, discount: 25000, vol: 70, conc: "Extrait De Parfum (Luxury)", top: ["Italian Bergamot", "Blue Chamomile"], heart: ["Bulgarian Rose", "Hedione"], base: ["Laotian Oud", "Papyrus"], img: IMAGES.luxury_black },
    { name: "Dior Feve Delicieuse", brand: "dior", gender: "Unisex", price: 21000, discount: 17800, vol: 125, conc: "Eau De Parfum", top: ["Lavender", "Mint", "Calabrian Bergamot"], heart: ["Sour Cherry", "Freesia", "Jasmine"], base: ["Tonka Bean", "Madagascar Vanilla", "Caramel", "Cocoa"], img: IMAGES.luxury_gold },
    { name: "Chanel Les Exclusifs Beige", brand: "chanel", gender: "Women", price: 23500, discount: 19900, vol: 75, conc: "Eau De Parfum", top: ["Hawthorn", "Freesia"], heart: ["Frangipani", "Honey"], base: ["White Musks"], img: IMAGES.luxury_gold },
    { name: "Versace Atelier Santal Boise", brand: "versace", gender: "Unisex", price: 19500, discount: 16500, vol: 100, conc: "Eau De Parfum", top: ["Saffron"], heart: ["Cypriol Oil"], base: ["Sri Lankan Sandalwood", "Gurjun Balsam"], img: IMAGES.luxury_black },
    { name: "Armani Prive Rose d'Arabie", brand: "armani", gender: "Unisex", price: 23000, discount: 19500, vol: 100, conc: "Eau De Parfum", top: ["Damascus Rose"], heart: ["Saffron", "Patchouli"], base: ["Golden Amber", "Dark Woods"], img: IMAGES.luxury_gold },
    { name: "Tom Ford Fabulous", brand: "tom-ford", gender: "Unisex", price: 25000, discount: 21500, vol: 100, conc: "Eau De Parfum", top: ["Clary Sage", "Lavender"], heart: ["Bitter Almond", "Leather", "Vanilla", "Orris"], base: ["Leather", "Tonka Bean", "Cashmeran", "White Woods"], img: IMAGES.luxury_black },
    { name: "Creed Sublime Vanille", brand: "creed", gender: "Unisex", price: 34000, discount: 29500, vol: 75, conc: "Extrait De Parfum (Luxury)", top: ["Bourbon Vanilla", "Vanilla Orchid"], heart: ["Tonka Bean"], base: ["Calabrian Bergamot", "Musk"], img: IMAGES.luxury_gold },
    { name: "Maison Francis Kurkdjian 724", brand: "mfk", gender: "Unisex", price: 18500, discount: 15900, vol: 70, conc: "Eau De Parfum", top: ["Aldehydes", "Calabrian Bergamot"], heart: ["Egyptian Jasmine", "Sweet Pea", "Mock Orange"], base: ["White Musk", "Sandalwood"], img: IMAGES.luxury_gold }
  ],

  "arabic-perfumes": [
    { name: "Lattafa Khamrah Qahwa (Coffee Edition)", brand: "lattafa", gender: "Unisex", price: 3600, discount: 2499, vol: 100, conc: "Eau De Parfum", top: ["Ginger", "Cinnamon", "Cardamom"], heart: ["Praline", "Candied Fruits", "White Flowers"], base: ["Coffee", "Tonka Bean", "Benzoin", "Vanilla"], img: IMAGES.arabic_oud },
    { name: "Lattafa Asad Zanzibar", brand: "lattafa", gender: "Men", price: 2999, discount: 1999, vol: 100, conc: "Eau De Parfum", top: ["Black Pepper", "Sea Lavender"], heart: ["Salted Coconut Water", "Iris"], base: ["Vanilla", "Incense"], img: IMAGES.arabic_royal },
    { name: "Lattafa Eternal Oud Pride", brand: "lattafa", gender: "Unisex", price: 3800, discount: 2690, vol: 100, conc: "Eau De Parfum", top: ["Grapefruit", "Plum"], heart: ["Orchid", "Heliotrope"], base: ["Vanilla", "Amber", "Oud", "Benzoin", "Tonka"], img: IMAGES.arabic_oud },
    { name: "Armani Prive Musc Shamal", brand: "armani", gender: "Unisex", price: 22000, discount: 18500, vol: 100, conc: "Eau De Parfum", top: ["Aldehydes", "Citrus"], heart: ["Musk", "Rose", "Jasmine"], base: ["Amber", "Cedarwood", "Vanilla"], img: IMAGES.arabic_royal },
    { name: "Dior Oud Ispahan", brand: "dior", gender: "Unisex", price: 21500, discount: 18200, vol: 125, conc: "Extrait De Parfum (Luxury)", top: ["Labdanum"], heart: ["Patchouli", "Damask Rose"], base: ["Oud", "Sandalwood", "Cedarwood"], img: IMAGES.arabic_oud },
    { name: "Gucci Intense Oud", brand: "gucci", gender: "Unisex", price: 14500, discount: 11900, vol: 90, conc: "Eau De Parfum", top: ["Pear", "Raspberry", "Saffron"], heart: ["Bulgarian Rose", "Orange Flower"], base: ["Natural Oud Oil", "Patchouli", "Amber"], img: IMAGES.arabic_royal },
    { name: "Versace Pour Homme Oud Noir", brand: "versace", gender: "Men", price: 8200, discount: 6690, vol: 100, conc: "Eau De Parfum", top: ["Bitter Orange", "Neroli", "Black Pepper"], heart: ["Cardamom", "Saffron", "Olibanum"], base: ["Agarwood (Oud)", "Patchouli", "Leatherwood"], img: IMAGES.arabic_oud },
    { name: "Yves Saint Laurent Splendid Wood", brand: "ysl", gender: "Unisex", price: 20500, discount: 17200, vol: 125, conc: "Eau De Parfum", top: ["Incense", "Cardamom"], heart: ["Sambac Jasmine", "Rosewood"], base: ["Cedarwood", "Cypriol", "Oud"], img: IMAGES.arabic_royal },
    { name: "Tom Ford Amber Absolute", brand: "tom-ford", gender: "Unisex", price: 22500, discount: 18900, vol: 100, conc: "Eau De Parfum", top: ["African Incense", "Bay Leaf"], heart: ["Rich Amber Accord", "Sandalwood"], base: ["Madagascar Vanilla", "Labdanum"], img: IMAGES.arabic_oud },
    { name: "Creed Royal Princess Oud", brand: "creed", gender: "Women", price: 26000, discount: 22000, vol: 100, conc: "Eau De Parfum", top: ["Sicilian Bergamot", "Rose", "Sweet Violet"], heart: ["Jasmin", "Vanilla", "Patchouli", "Iris"], base: ["Benzoin of Siam", "Sandalwood", "Styrax", "Oud"], img: IMAGES.arabic_royal },
    { name: "Lattafa Ejaazi Intensive Silver", brand: "lattafa", gender: "Men", price: 2500, discount: 1699, vol: 100, conc: "Eau De Parfum", top: ["Mandarin Orange", "Grapefruit"], heart: ["Cedarwood", "Sea Notes"], base: ["Amber", "Moss"], img: IMAGES.arabic_oud },
    { name: "Lattafa Velvet Rose", brand: "lattafa", gender: "Women", price: 2700, discount: 1799, vol: 100, conc: "Eau De Parfum", top: ["Sweet Rose", "Patchouli"], heart: ["Labdanum", "Musk"], base: ["Amber", "Oud"], img: IMAGES.arabic_royal },
    { name: "Maison Francis Kurkdjian Oud Satin Mood", brand: "mfk", gender: "Unisex", price: 23500, discount: 19800, vol: 70, conc: "Eau De Parfum", top: ["Violet Accord"], heart: ["Bulgarian Damascena Rose", "Turkish Rose"], base: ["Laotian Oud", "Vanilla Amber Accord"], img: IMAGES.arabic_oud },
    { name: "Chanel Les Exclusifs Cuir de Russie", brand: "chanel", gender: "Unisex", price: 24500, discount: 20900, vol: 75, conc: "Eau De Parfum", top: ["Aldehydes", "Orange Blossom", "Bergamot"], heart: ["Ylang-Ylang", "Jasmine", "Rose"], base: ["Birch Tar", "Leather", "Tobacco", "Amber"], img: IMAGES.arabic_royal },
    { name: "Lattafa Bade'e Al Oud Sublime", brand: "lattafa", gender: "Unisex", price: 3200, discount: 2199, vol: 100, conc: "Eau De Parfum", top: ["Apple", "Litchi", "Rose"], heart: ["Plum", "Jasmine"], base: ["Vanilla", "Moss", "Patchouli"], img: IMAGES.arabic_oud },
    { name: "Dior Purple Oud", brand: "dior", gender: "Unisex", price: 21000, discount: 17800, vol: 125, conc: "Extrait De Parfum (Luxury)", top: ["Orange", "Pink Pepper"], heart: ["Saffron"], base: ["Oud", "Precious Woods"], img: IMAGES.arabic_royal },
    { name: "Armani Prive Cuir Zerzura", brand: "armani", gender: "Unisex", price: 22500, discount: 18900, vol: 100, conc: "Eau De Parfum", top: ["Mandarin Oil", "Violet Leaf"], heart: ["Iris Accord", "Rose"], base: ["Leather Accord", "Bourbon Vanilla", "Cedarwood"], img: IMAGES.arabic_oud },
    { name: "Gucci The Voice of the Snake", brand: "gucci", gender: "Unisex", price: 26000, discount: 22000, vol: 100, conc: "Eau De Parfum", top: ["Oud Wood"], heart: ["Dried Patchouli"], base: ["Saffron Leaves"], img: IMAGES.arabic_royal },
    { name: "Lattafa Fakhar Lattafa Men", brand: "lattafa", gender: "Men", price: 2600, discount: 1799, vol: 100, conc: "Eau De Parfum", top: ["Apple", "Ginger", "Bergamot"], heart: ["Sage", "Juniper Berries", "Geranium"], base: ["Amberwood", "Tonka Bean", "Cedar"], img: IMAGES.arabic_oud },
    { name: "Yves Saint Laurent Wild Leather", brand: "ysl", gender: "Unisex", price: 19800, discount: 16800, vol: 125, conc: "Eau De Parfum", top: ["Bergamot", "Black Pepper"], heart: ["Saffron", "Thyme", "Lavender"], base: ["Leather", "Guaiac Wood", "Vanilla"], img: IMAGES.arabic_royal }
  ],

  "floral-fragrances": [
    { name: "Dior Miss Dior Rose N'Roses", brand: "dior", gender: "Women", price: 9200, discount: 7600, vol: 100, conc: "Eau De Toilette", top: ["Italian Mandarin", "Bergamot", "Geranium"], heart: ["Grasse Rose", "Damask Rose"], base: ["White Musk"], img: IMAGES.floral_bouquet },
    { name: "Gucci Bloom Ambrosia di Fiori", brand: "gucci", gender: "Women", price: 9800, discount: 8100, vol: 100, conc: "Eau De Parfum", top: ["Jasmine Bud", "Rangoon Creeper"], heart: ["Indian Tuberose", "Damascena Rose"], base: ["Tuscan Orris"], img: IMAGES.floral_chanel },
    { name: "Chanel No. 5 Eau de Parfum", brand: "chanel", gender: "Women", price: 13500, discount: 11500, vol: 100, conc: "Eau De Parfum", top: ["Aldehydes", "Ylang-Ylang", "Neroli", "Bergamot"], heart: ["May Rose", "Jasmine", "Lily-of-the-Valley", "Iris"], base: ["Bourbon Vanilla", "Sandalwood", "Vetiver", "Amber"], img: IMAGES.floral_chanel },
    { name: "Yves Saint Laurent Mon Paris Floral", brand: "ysl", gender: "Women", price: 9100, discount: 7500, vol: 90, conc: "Eau De Parfum", top: ["Peach", "Pear", "Raspberry"], heart: ["Datura Flower", "White Rose", "Peony", "Magnolia"], base: ["Patchouli", "Cashmeran", "White Musk"], img: IMAGES.floral_bouquet },
    { name: "Giorgio Armani Si Fiori", brand: "armani", gender: "Women", price: 8800, discount: 7200, vol: 100, conc: "Eau De Parfum", top: ["Blackcurrant", "Green Mandarin"], heart: ["Neroli", "Rose", "Patchouli", "Oakmoss"], base: ["Vanilla", "White Musk"], img: IMAGES.floral_bouquet },
    { name: "Versace Pour Femme Dylan Blue", brand: "versace", gender: "Women", price: 7200, discount: 5800, vol: 100, conc: "Eau De Parfum", top: ["Blackcurrant Sorbet", "Granny Smith Apple"], heart: ["Rose", "Petalia", "Jasmine", "Peach"], base: ["Styrax", "White Smooth Woods", "Musk", "Patchouli"], img: IMAGES.floral_chanel },
    { name: "Tom Ford Rose Prick Private Blend", brand: "tom-ford", gender: "Unisex", price: 24000, discount: 20500, vol: 50, conc: "Eau De Parfum", top: ["Sichuan Pepper", "Turmeric"], heart: ["May Rose", "Turkish Rose", "Bulgarian Rose"], base: ["Patchouli", "Tonka Bean"], img: IMAGES.floral_bouquet },
    { name: "Maison Francis Kurkdjian A La Rose", brand: "mfk", gender: "Women", price: 19500, discount: 16800, vol: 70, conc: "Eau De Parfum", top: ["Calabrian Bergamot", "Californian Orange"], heart: ["Damascena Rose", "Grasse Centifolia Rose", "Violet", "Magnolia"], base: ["Cedarwood", "Musk"], img: IMAGES.floral_chanel },
    { name: "Creed Fleurissimo", brand: "creed", gender: "Women", price: 23500, discount: 19900, vol: 75, conc: "Eau De Parfum", top: ["Bergamot", "Violet Leaves"], heart: ["Bulgarian Rose", "Tuberose", "Ylang-Ylang"], base: ["Florentine Iris", "Ambergris"], img: IMAGES.floral_bouquet },
    { name: "Dior Joy by Dior", brand: "dior", gender: "Women", price: 9500, discount: 7900, vol: 90, conc: "Eau De Parfum", top: ["Bergamot", "Mandarin Orange"], heart: ["Grasse Rose", "Jasmine"], base: ["Sandalwood", "White Musk", "Cedar", "Patchouli"], img: IMAGES.floral_chanel },
    { name: "Chanel Gabrielle Essence", brand: "chanel", gender: "Women", price: 12800, discount: 10900, vol: 100, conc: "Eau De Parfum", top: ["Citrus", "Petitgrain", "Blackcurrant"], heart: ["Tuberose", "Ylang-Ylang", "Jasmine", "Orange Blossom"], base: ["Sandalwood", "Vanilla", "White Musk"], img: IMAGES.floral_bouquet },
    { name: "Gucci Bloom Nettare di Fiori", brand: "gucci", gender: "Women", price: 9400, discount: 7800, vol: 100, conc: "Eau De Parfum", top: ["Ginger", "Rose"], heart: ["Tuberose", "Jasmine", "Rangoon Creeper"], base: ["Patchouli", "Musk", "Osmanthus"], img: IMAGES.floral_chanel },
    { name: "Yves Saint Laurent Parisienne", brand: "ysl", gender: "Women", price: 8200, discount: 6800, vol: 90, conc: "Eau De Parfum", top: ["Blackberry", "Cranberry", "Vinyl Accord"], heart: ["Damask Rose", "Violet", "Peony"], base: ["Patchouli", "Vetiver", "Musk", "Sandalwood"], img: IMAGES.floral_bouquet },
    { name: "Versace Woman", brand: "versace", gender: "Women", price: 5400, discount: 4200, vol: 100, conc: "Eau De Parfum", top: ["Jasmine", "Wild Rose", "Frangipani", "Bergamot"], heart: ["Lotus", "Plum", "Raspberry", "Blue Cedar"], base: ["Musk", "Amber", "Inoki Wood"], img: IMAGES.floral_chanel },
    { name: "Giorgio Armani Prive Pivoine Suzhou", brand: "armani", gender: "Women", price: 21500, discount: 18200, vol: 100, conc: "Eau De Parfum", top: ["Mandarin Orange", "Pink Pepper", "Raspberry"], heart: ["Peony", "May Rose", "Rose Oil"], base: ["Amber", "Musk", "Patchouli"], img: IMAGES.floral_bouquet },
    { name: "Davidoff Cool Water Sea Rose", brand: "davidoff", gender: "Women", price: 4400, discount: 3199, vol: 100, conc: "Eau De Toilette", top: ["Japanese Nashi Pear"], heart: ["Pink Peony"], base: ["Musk"], img: IMAGES.floral_chanel },
    { name: "Lattafa Yara Moi (White Edition)", brand: "lattafa", gender: "Women", price: 2800, discount: 1899, vol: 100, conc: "Eau De Parfum", top: ["Jasmine", "Peach"], heart: ["Amber", "Caramel"], base: ["Sandalwood", "Patchouli"], img: IMAGES.floral_bouquet },
    { name: "Tom Ford Cafe Rose", brand: "tom-ford", gender: "Women", price: 14500, discount: 12200, vol: 100, conc: "Eau De Parfum", top: ["Turkish Rose", "Dark Coffee"], heart: ["Bulgarian Rose", "Ylang-Ylang", "Patchouli", "Cardamom"], base: ["Frankincense", "Sandalwood"], img: IMAGES.floral_chanel },
    { name: "Maison Francis Kurkdjian Feminin Pluriel", brand: "mfk", gender: "Women", price: 18900, discount: 15900, vol: 70, conc: "Eau De Parfum", top: ["Iris of Florence", "Violet"], heart: ["Rose of Grasse", "Egyptian Jasmine", "Lily-of-the-Valley", "Orange Blossom"], base: ["Vetiver", "Indonesian Patchouli"], img: IMAGES.floral_bouquet },
    { name: "Dior Pure Poison", brand: "dior", gender: "Women", price: 10800, discount: 9100, vol: 100, conc: "Eau De Parfum", top: ["Jasmine", "Sweet Orange", "Calabrian Bergamot", "Sicilian Mandarin"], heart: ["Orange Blossom", "Gardenia"], base: ["Sandalwood", "White Amber", "Cedarwood"], img: IMAGES.floral_chanel }
  ],

  "oud-collection": [
    { name: "Tom Ford Oud Wood", brand: "tom-ford", gender: "Unisex", price: 19800, discount: 16900, vol: 100, conc: "Eau De Parfum", top: ["Smoky Agarwood", "Rosewood"], heart: ["Cardamom", "Sandalwood", "Vetiver"], base: ["Tonka Bean", "Amber", "Vanilla"], img: IMAGES.oud_smoky },
    { name: "Maison Francis Kurkdjian Oud Satin Mood Extrait", brand: "mfk", gender: "Unisex", price: 29500, discount: 25500, vol: 70, conc: "Extrait De Parfum (Luxury)", top: ["Violet Blossom"], heart: ["Bulgarian Rose", "Turkish Rose Absolute"], base: ["Natural Laotian Oud", "Amber", "Vanilla"], img: IMAGES.oud_amber },
    { name: "Gucci Intense Oud Parfum", brand: "gucci", gender: "Unisex", price: 14200, discount: 11800, vol: 90, conc: "Eau De Parfum", top: ["Pear", "Incense", "Raspberry"], heart: ["Oud Oil", "Bulgarian Rose"], base: ["Amber", "Leather", "Olibanum"], img: IMAGES.oud_smoky },
    { name: "Versace Pour Homme Oud Noir", brand: "versace", gender: "Men", price: 8200, discount: 6690, vol: 100, conc: "Eau De Parfum", top: ["Bitter Orange", "Neroli", "Black Pepper"], heart: ["Cardamom", "Saffron", "Frankincense"], base: ["Precious Oud", "Patchouli", "Leatherwood"], img: IMAGES.oud_amber },
    { name: "Armani Prive Oud Royal", brand: "armani", gender: "Unisex", price: 23500, discount: 19900, vol: 100, conc: "Extrait De Parfum (Luxury)", top: ["Saffron", "Spiced Frankincense"], heart: ["Agarwood Extract", "May Rose"], base: ["Amber", "Sandalwood", "Myrrh"], img: IMAGES.oud_smoky },
    { name: "Dior Oud Ispahan", brand: "dior", gender: "Unisex", price: 21500, discount: 18200, vol: 125, conc: "Extrait De Parfum (Luxury)", top: ["Labdanum Herb"], heart: ["Damask Rose", "Patchouli"], base: ["Smoky Oud", "Sandalwood", "Cedar"], img: IMAGES.oud_amber },
    { name: "Creed Royal Princess Oud", brand: "creed", gender: "Women", price: 26000, discount: 22000, vol: 100, conc: "Eau De Parfum", top: ["Bitter Orange", "Sweet Violet"], heart: ["Iris", "Jasmine", "Vanilla"], base: ["Precious Oud", "Benzoin", "Sandalwood"], img: IMAGES.oud_smoky },
    { name: "Lattafa Bade'e Al Oud (Oud for Glory)", brand: "lattafa", gender: "Unisex", price: 3200, discount: 2199, vol: 100, conc: "Eau De Parfum", top: ["Saffron", "Nutmeg", "Lavender"], heart: ["Smoky Agarwood", "Patchouli"], base: ["Dark Oud", "Patchouli", "Musk"], img: IMAGES.oud_amber },
    { name: "Lattafa Eternal Oud", brand: "lattafa", gender: "Unisex", price: 3800, discount: 2690, vol: 100, conc: "Eau De Parfum", top: ["Plum", "Grapefruit"], heart: ["Orchid", "Benzoin"], base: ["Aged Oud", "Vanilla", "Amber", "Tonka"], img: IMAGES.oud_smoky },
    { name: "Yves Saint Laurent Splendid Wood Oud", brand: "ysl", gender: "Unisex", price: 20500, discount: 17200, vol: 125, conc: "Eau De Parfum", top: ["Incense", "Cardamom"], heart: ["Sambac Jasmine", "Rosewood"], base: ["Precious Oud", "Cypriol Oil", "Cedar"], img: IMAGES.oud_amber },
    { name: "Chanel Les Exclusifs Sycomore Oud Infusion", brand: "chanel", gender: "Unisex", price: 23500, discount: 19900, vol: 75, conc: "Eau De Parfum", top: ["Pink Pepper", "Smoky Aldehydes"], heart: ["Vetiver", "Cypress", "Juniper"], base: ["Oud Accord", "Sandalwood", "Tobacco"], img: IMAGES.oud_smoky },
    { name: "Dior Purple Oud", brand: "dior", gender: "Unisex", price: 21000, discount: 17800, vol: 125, conc: "Extrait De Parfum (Luxury)", top: ["Bitter Orange", "Pink Pepper"], heart: ["Saffron"], base: ["Intense Oud Wood", "Amber"], img: IMAGES.oud_amber },
    { name: "Tom Ford Oud Fleur", brand: "tom-ford", gender: "Unisex", price: 21500, discount: 18200, vol: 100, conc: "Eau De Parfum", top: ["Cardamom", "Rosewood"], heart: ["Turkish Rose", "Damask Rose", "Osmanthus"], base: ["Agarwood", "Patchouli", "Sandalwood", "Castoreum"], img: IMAGES.oud_smoky },
    { name: "Maison Francis Kurkdjian Oud Mood", brand: "mfk", gender: "Unisex", price: 22500, discount: 18900, vol: 70, conc: "Eau De Parfum", top: ["Saffron", "Elemi Gum"], heart: ["Ambrette Seed", "Cedarwood"], base: ["Laotian Oud", "Patchouli"], img: IMAGES.oud_amber },
    { name: "Lattafa Opulent Oud", brand: "lattafa", gender: "Unisex", price: 2600, discount: 1750, vol: 100, conc: "Eau De Parfum", top: ["Floral Notes", "Saffron", "Citrus"], heart: ["Amber", "Oud", "Caramel"], base: ["Resins", "Musk", "Woody Notes", "Patchouli"], img: IMAGES.oud_smoky },
    { name: "Gucci The Voice of the Snake Oud", brand: "gucci", gender: "Unisex", price: 26000, discount: 22000, vol: 100, conc: "Eau De Parfum", top: ["Noble Oud"], heart: ["Dark Patchouli"], base: ["Black Saffron"], img: IMAGES.oud_amber },
    { name: "Armani Prive Cuir Majeste Oud", brand: "armani", gender: "Unisex", price: 24000, discount: 20500, vol: 100, conc: "Eau De Parfum", top: ["Dried Fruits", "Incense", "Osmanthus"], heart: ["Leather", "May Rose", "Tobacco"], base: ["Agarwood", "Vanilla", "Oud Extract"], img: IMAGES.oud_smoky },
    { name: "Versace Atelier Encens Suprême Oud", brand: "versace", gender: "Unisex", price: 19500, discount: 16500, vol: 100, conc: "Eau De Parfum", top: ["Somali Frankincense"], heart: ["Spanish Cistus"], base: ["Natural Oud", "Amber"], img: IMAGES.oud_amber },
    { name: "Lattafa Velvet Oud", brand: "lattafa", gender: "Unisex", price: 2800, discount: 1899, vol: 100, conc: "Eau De Parfum", top: ["Cardamom", "Bergamot"], heart: ["Violet Leaf", "Patchouli"], base: ["Suede", "Oud", "Amber", "Oakmoss"], img: IMAGES.oud_smoky },
    { name: "Tom Ford Tobacco Oud", brand: "tom-ford", gender: "Unisex", price: 22000, discount: 18800, vol: 100, conc: "Eau De Parfum", top: ["Whiskey Accord"], heart: ["Spicy Notes", "Coriander", "Cinnamon"], base: ["Arabic Tobacco", "Oud Wood", "Sandalwood", "Incense"], img: IMAGES.oud_amber }
  ],

  "body-mists": [
    { name: "Victoria's Secret Bare Vanilla Body Mist", brand: "victorias-secret", gender: "Women", price: 2499, discount: 1699, vol: 250, conc: "Fragrance Body Mist", top: ["Whipped Vanilla"], heart: ["Soft Cashmere"], base: ["Skin Musk"], img: IMAGES.mist_spray },
    { name: "Sol de Janeiro Brazilian Crush Cheirosa 68", brand: "sol-de-janeiro", gender: "Women", price: 3200, discount: 2499, vol: 240, conc: "Fragrance Body Mist", top: ["Pink Dragonfruit", "Lychee Essence"], heart: ["Brazilian Jasmine", "Ocean Air", "Hibiscus"], base: ["Sheer Vanilla", "Sun Musk"], img: IMAGES.mist_pastel },
    { name: "Victoria's Secret Pure Seduction Mist", brand: "victorias-secret", gender: "Women", price: 2499, discount: 1699, vol: 250, conc: "Fragrance Body Mist", top: ["Red Plum"], heart: ["Sweet Freesia"], base: ["Chamomile Mist"], img: IMAGES.mist_spray },
    { name: "Sol de Janeiro Brazilian Crush Cheirosa 62", brand: "sol-de-janeiro", gender: "Women", price: 3200, discount: 2499, vol: 240, conc: "Fragrance Body Mist", top: ["Pistachio", "Almond"], heart: ["Heliotrope", "Jasmine Petals"], base: ["Salted Caramel", "Vanilla", "Sandalwood"], img: IMAGES.mist_pastel },
    { name: "Victoria's Secret Velvet Petals Shimmer Mist", brand: "victorias-secret", gender: "Women", price: 2699, discount: 1799, vol: 250, conc: "Fragrance Body Mist", top: ["Lush Floral Blooms"], heart: ["Almond Glaze"], base: ["Velvet Musk"], img: IMAGES.mist_spray },
    { name: "Sol de Janeiro Cheirosa 59 Delicia Drench", brand: "sol-de-janeiro", gender: "Women", price: 3200, discount: 2499, vol: 240, conc: "Fragrance Body Mist", top: ["Velvet Plum", "Sugared Violet"], heart: ["Vanilla Orchid", "Whipped Amber"], base: ["Sheer Sandalwood", "Fresh Vetiver"], img: IMAGES.mist_pastel },
    { name: "Victoria's Secret Love Spell Fragrance Mist", brand: "victorias-secret", gender: "Women", price: 2499, discount: 1699, vol: 250, conc: "Fragrance Body Mist", top: ["Cherry Blossom"], heart: ["Fresh Peach"], base: ["Aloe Vera Infusion"], img: IMAGES.mist_spray },
    { name: "Sol de Janeiro Cheirosa 40 Bom Dia Bright", brand: "sol-de-janeiro", gender: "Women", price: 3200, discount: 2499, vol: 240, conc: "Fragrance Body Mist", top: ["Black Amber Plum", "Creme de Cassis"], heart: ["Jasmine Blooms", "Brazilian Orchid"], base: ["Vanilla Woods", "Warm Musk"], img: IMAGES.mist_pastel },
    { name: "Victoria's Secret Coconut Passion Mist", brand: "victorias-secret", gender: "Women", price: 2499, discount: 1699, vol: 250, conc: "Fragrance Body Mist", top: ["Island Coconut"], heart: ["Warm Vanilla"], base: ["Soothing Aloe"], img: IMAGES.mist_spray },
    { name: "Sol de Janeiro Cheirosa 71 Caramelized Vanilla", brand: "sol-de-janeiro", gender: "Women", price: 3200, discount: 2499, vol: 240, conc: "Fragrance Body Mist", top: ["Caramelized Vanilla", "Sea Salt"], heart: ["Toasted Macadamia Nut", "White Chocolate"], base: ["Tonka Bean", "Coconut Blossom"], img: IMAGES.mist_pastel },
    { name: "Victoria's Secret Aqua Kiss Body Mist", brand: "victorias-secret", gender: "Women", price: 2499, discount: 1699, vol: 250, conc: "Fragrance Body Mist", top: ["Cool Waters"], heart: ["Bright Daisy"], base: ["Aloe Vera Accord"], img: IMAGES.mist_spray },
    { name: "Sol de Janeiro Cheirosa 87 Rio Radiance Mist", brand: "sol-de-janeiro", gender: "Women", price: 3200, discount: 2499, vol: 240, conc: "Fragrance Body Mist", top: ["Solar Tuberose", "Leite de Coco"], heart: ["Warm Sand", "Ylang-Ylang"], base: ["Amber", "Vanilla Essence"], img: IMAGES.mist_pastel },
    { name: "Victoria's Secret Amber Romance Mist", brand: "victorias-secret", gender: "Women", price: 2499, discount: 1699, vol: 250, conc: "Fragrance Body Mist", top: ["Deep Amber"], heart: ["Sugar Kisses"], base: ["Creme Anglaise"], img: IMAGES.mist_spray },
    { name: "Victoria's Secret Romantic Fragrance Mist", brand: "victorias-secret", gender: "Women", price: 2499, discount: 1699, vol: 250, conc: "Fragrance Body Mist", top: ["Pink Petals"], heart: ["Solar Musk"], base: ["Velvet Woods"], img: IMAGES.mist_pastel },
    { name: "Victoria's Secret Temptation Mist", brand: "victorias-secret", gender: "Women", price: 2499, discount: 1699, vol: 250, conc: "Fragrance Body Mist", top: ["Delicious Apple"], heart: ["Desert Flower"], base: ["Fresh Saguaro"], img: IMAGES.mist_spray },
    { name: "Victoria's Secret Midnight Bloom Mist", brand: "victorias-secret", gender: "Women", price: 2499, discount: 1699, vol: 250, conc: "Fragrance Body Mist", top: ["Moon Flower"], heart: ["Creamy Woods"], base: ["Starry Night Musk"], img: IMAGES.mist_pastel },
    { name: "Victoria's Secret Rush Fragrance Mist", brand: "victorias-secret", gender: "Women", price: 2499, discount: 1699, vol: 250, conc: "Fragrance Body Mist", top: ["Sultry Clementine"], heart: ["Crystal Amber"], base: ["Solar Accord"], img: IMAGES.mist_spray },
    { name: "Victoria's Secret Secret Sunrise Mist", brand: "victorias-secret", gender: "Women", price: 2499, discount: 1699, vol: 250, conc: "Fragrance Body Mist", top: ["Sunlit Berries"], heart: ["Pink Hibiscus"], base: ["Golden Amber"], img: IMAGES.mist_pastel },
    { name: "Victoria's Secret Neon Palms Mist", brand: "victorias-secret", gender: "Women", price: 2499, discount: 1699, vol: 250, conc: "Fragrance Body Mist", top: ["Orchid Palms"], heart: ["Coconut Water"], base: ["Warm Sand"], img: IMAGES.mist_spray },
    { name: "Victoria's Secret Island Market Mist", brand: "victorias-secret", gender: "Women", price: 2499, discount: 1699, vol: 250, conc: "Fragrance Body Mist", top: ["Passionfruit Nectar"], heart: ["Tiger Lily"], base: ["Driftwood"], img: IMAGES.mist_pastel }
  ],

  "new-arrivals": [
    { name: "Dior Sauvage Elixir Ultra Intense", brand: "dior", gender: "Men", price: 14500, discount: 12500, vol: 60, conc: "Extrait De Parfum (Luxury)", top: ["Cinnamon", "Nutmeg", "Cardamom", "Grapefruit"], heart: ["Lavender Essence of Nyons"], base: ["Licorice", "Sandalwood", "Amber", "Patchouli"], img: IMAGES.mens_dark },
    { name: "Bleu de Chanel Parfum Edition 2026", brand: "chanel", gender: "Men", price: 13500, discount: 11600, vol: 100, conc: "Extrait De Parfum (Luxury)", top: ["Lemon Zest", "Bergamot", "Mint", "Artemisia"], heart: ["Lavender", "Geranium", "Green Notes", "Pineapple"], base: ["New Caledonian Sandalwood", "Cedar", "Amberwood", "Tonka Bean"], img: IMAGES.mens_blue },
    { name: "Yves Saint Laurent MYSLF Le Parfum", brand: "ysl", gender: "Men", price: 9800, discount: 8200, vol: 100, conc: "Eau De Parfum", top: ["Black Pepper", "Calabrian Bergamot"], heart: ["Orange Blossom Absolute"], base: ["Bourbon Vanilla", "Amber", "Patchouli", "Woody Notes"], img: IMAGES.mens_dark },
    { name: "Gucci Flora Gorgeous Orchid", brand: "gucci", gender: "Women", price: 9200, discount: 7600, vol: 100, conc: "Eau De Parfum", top: ["Vanilla Duo"], heart: ["Vanilla Orchid"], base: ["Ozonic Notes"], img: IMAGES.womens_pink },
    { name: "Versace Eros Energy Eau de Parfum", brand: "versace", gender: "Men", price: 7800, discount: 6400, vol: 100, conc: "Eau De Parfum", top: ["Blood Orange", "Lime", "Grapefruit", "Mandarin"], heart: ["Pink Pepper", "White Amber", "Blackcurrant"], base: ["Patchouli", "Musk", "Oakmoss"], img: IMAGES.mens_gold },
    { name: "Giorgio Armani Acqua Di Gio Elixir", brand: "armani", gender: "Men", price: 10500, discount: 8900, vol: 50, conc: "Extrait De Parfum (Luxury)", top: ["Bergamot", "Spiced Nutmeg"], heart: ["Marine Accord", "Violet Leaf"], base: ["Patchouli", "Frankincense"], img: IMAGES.mens_blue },
    { name: "Chanel Chance Eau Fraiche Eau de Parfum", brand: "chanel", gender: "Women", price: 11500, discount: 9900, vol: 100, conc: "Eau De Parfum", top: ["Citron", "Aldehydes"], heart: ["Jasmine"], base: ["Teak Wood Accord", "Amber"], img: IMAGES.womens_crystal },
    { name: "Tom Ford Cafe Rose Private Edition", brand: "tom-ford", gender: "Women", price: 14800, discount: 12500, vol: 100, conc: "Eau De Parfum", top: ["Turkish Rose", "Dark Roasted Coffee"], heart: ["Bulgarian Rose", "Ylang-Ylang", "Coriander", "Patchouli"], base: ["Frankincense", "Sandalwood"], img: IMAGES.unisex_niche },
    { name: "Lattafa Khamrah Qahwa Reserve", brand: "lattafa", gender: "Unisex", price: 3800, discount: 2599, vol: 100, conc: "Eau De Parfum", top: ["Cardamom", "Ginger", "Cinnamon"], heart: ["Candied Fruits", "White Flowers", "Praline"], base: ["Arabian Coffee", "Vanilla", "Tonka Bean", "Benzoin"], img: IMAGES.arabic_oud },
    { name: "Maison Francis Kurkdjian Aqua Media Cologne Forte", brand: "mfk", gender: "Unisex", price: 17900, discount: 15400, vol: 70, conc: "Eau De Parfum", top: ["Verbena Accord", "Bergamot of Calabria"], heart: ["Sweet Fennel", "Hedione"], base: ["Woody Musks", "Patchouli"], img: IMAGES.unisex_minimal },
    { name: "Creed Queen of Silk", brand: "creed", gender: "Women", price: 27500, discount: 23900, vol: 75, conc: "Eau De Parfum", top: ["Chinese Osmanthus", "Magnolia", "Saffron"], heart: ["Passionfruit", "Tuberose", "Patchouli"], base: ["Madagascar Vanilla", "Incense", "Myrrh", "Cedarwood"], img: IMAGES.luxury_gold },
    { name: "Dior Miss Dior Parfum 2026", brand: "dior", gender: "Women", price: 11900, discount: 9990, vol: 80, conc: "Extrait De Parfum (Luxury)", top: ["Mandarin", "Wild Strawberry", "Apricot", "Peach"], heart: ["Jasmine", "Wild Rose"], base: ["Amber", "Patchouli", "Moss", "Atlas Cedar"], img: IMAGES.womens_pink },
    { name: "Davidoff Cool Water Intense Man", brand: "davidoff", gender: "Men", price: 4900, discount: 3700, vol: 125, conc: "Eau De Parfum", top: ["Green Mandarin"], heart: ["Coconut Water"], base: ["Amber Accord"], img: IMAGES.mens_dark },
    { name: "Yves Saint Laurent Libre Flowers & Flames", brand: "ysl", gender: "Women", price: 10500, discount: 8900, vol: 90, conc: "Eau De Parfum", top: ["Lavender", "Bergamot"], heart: ["Desert Lily", "Palm Tree Blossom", "Orange Blossom"], base: ["Vanilla Infusion"], img: IMAGES.womens_gold },
    { name: "Versace Dylan Blue Gold Edition", brand: "versace", gender: "Men", price: 7900, discount: 6400, vol: 100, conc: "Eau De Parfum", top: ["Aquatic Notes", "Calabrian Bergamot", "Grapefruit"], heart: ["Violet Leaf", "Black Pepper", "Papyrus"], base: ["Incense", "Mineral Musk", "Tonka Bean"], img: IMAGES.mens_blue },
    { name: "Gucci Guilty Elixir de Parfum Pour Homme", brand: "gucci", gender: "Men", price: 12500, discount: 10400, vol: 60, conc: "Extrait De Parfum (Luxury)", top: ["Orange Blossom", "Nutmeg", "Pimento Seeds"], heart: ["Orris Butter", "Orange Flower", "Osmanthus"], base: ["Ambrofix", "Benzoin", "Vanilla", "Patchouli"], img: IMAGES.mens_dark },
    { name: "Giorgio Armani Blanc Kogane", brand: "armani", gender: "Unisex", price: 24000, discount: 20500, vol: 100, conc: "Eau De Parfum", top: ["Aldehydes", "Pink Pepper"], heart: ["White Jasmine", "Lily"], base: ["White Musk", "Vetiver", "Patchouli"], img: IMAGES.unisex_marble },
    { name: "Lattafa Asad Sunset", brand: "lattafa", gender: "Men", price: 3100, discount: 2099, vol: 100, conc: "Eau De Parfum", top: ["Spicy Pink Pepper", "Pineapple"], heart: ["Coffee Bean", "Dry Iris"], base: ["Amber", "Vanilla", "Precious Woods"], img: IMAGES.arabic_royal },
    { name: "Tom Ford Vanilla Sex Private Blend", brand: "tom-ford", gender: "Unisex", price: 25000, discount: 21500, vol: 50, conc: "Eau De Parfum", top: ["Bitter Almond"], heart: ["Floral Notes", "Vanilla Absolute"], base: ["Ultravanil", "Tonka Bean", "Sandalwood"], img: IMAGES.unisex_minimal },
    { name: "Sol de Janeiro Cheirosa 59 Body Mist", brand: "sol-de-janeiro", gender: "Women", price: 3200, discount: 2499, vol: 240, conc: "Fragrance Body Mist", top: ["Velvet Plum", "Sugared Violet"], heart: ["Vanilla Orchid", "Whipped Amber"], base: ["Sheer Sandalwood", "Fresh Vetiver"], img: IMAGES.mist_pastel }
  ],

  "best-sellers": [
    { name: "Dior Sauvage Eau de Toilette", brand: "dior", gender: "Men", price: 8900, discount: 7200, vol: 100, conc: "Eau De Toilette", top: ["Calabrian Bergamot", "Pepper"], heart: ["Sichuan Pepper", "Lavender", "Pink Pepper", "Vetiver"], base: ["Ambroxan", "Cedar", "Labdanum"], img: IMAGES.mens_blue },
    { name: "Chanel Bleu de Chanel Eau de Parfum", brand: "chanel", gender: "Men", price: 11500, discount: 9900, vol: 100, conc: "Eau De Parfum", top: ["Grapefruit", "Lemon", "Mint"], heart: ["Ginger", "Nutmeg", "Jasmine"], base: ["Incense", "Amber", "Cedarwood", "Patchouli"], img: IMAGES.mens_dark },
    { name: "Yves Saint Laurent Black Opium", brand: "ysl", gender: "Women", price: 9600, discount: 7990, vol: 90, conc: "Eau De Parfum", top: ["Pear", "Pink Pepper", "Orange Blossom"], heart: ["Coffee", "Jasmine", "Bitter Almond", "Licorice"], base: ["Vanilla", "Patchouli", "Cedar", "Cashmere Wood"], img: IMAGES.womens_crystal },
    { name: "Giorgio Armani Acqua Di Gio Pour Homme", brand: "armani", gender: "Men", price: 7900, discount: 6490, vol: 100, conc: "Eau De Toilette", top: ["Lime", "Lemon", "Bergamot", "Jasmine", "Orange"], heart: ["Sea Notes", "Peach", "Freesia", "Cyclamen"], base: ["White Musk", "Cedar", "Oakmoss", "Patchouli"], img: IMAGES.mens_blue },
    { name: "Creed Aventus Eau de Parfum", brand: "creed", gender: "Men", price: 28500, discount: 24900, vol: 100, conc: "Extrait De Parfum (Luxury)", top: ["Pineapple", "Bergamot", "Blackcurrant", "Apple"], heart: ["Birch", "Patchouli", "Moroccan Jasmine", "Rose"], base: ["Musk", "Oakmoss", "Ambergris", "Vanille"], img: IMAGES.mens_gold },
    { name: "Tom Ford Tobacco Vanille", brand: "tom-ford", gender: "Unisex", price: 18500, discount: 15900, vol: 100, conc: "Eau De Parfum", top: ["Tobacco Leaf", "Spicy Notes"], heart: ["Tonka Bean", "Tobacco Blossom", "Vanilla", "Cacao"], base: ["Dried Fruit Accord", "Woody Notes"], img: IMAGES.unisex_niche },
    { name: "Maison Francis Kurkdjian Baccarat Rouge 540", brand: "mfk", gender: "Unisex", price: 24500, discount: 21200, vol: 70, conc: "Eau De Parfum", top: ["Blood Orange", "Saffron"], heart: ["Hedione", "Ambergris"], base: ["Cedarwood", "Oakmoss"], img: IMAGES.unisex_niche },
    { name: "Versace Eros Pour Homme", brand: "versace", gender: "Men", price: 6800, discount: 5499, vol: 100, conc: "Eau De Toilette", top: ["Mint Leaves", "Italian Lemon Zest", "Green Apple"], heart: ["Tonka Bean", "Amber", "Geranium Flower"], base: ["Vanilla", "Cedarwood from Atlas and Virginia", "Vetiver"], img: IMAGES.mens_dark },
    { name: "Chanel Coco Mademoiselle", brand: "chanel", gender: "Women", price: 12500, discount: 10800, vol: 100, conc: "Eau De Parfum", top: ["Orange", "Mandarin", "Orange Blossom", "Bergamot"], heart: ["Mimosa", "Jasmine", "Turkish Rose", "Ylang-Ylang"], base: ["Tonka Bean", "Patchouli", "Opoponax", "Vanilla"], img: IMAGES.womens_pink },
    { name: "Dior J'adore Eau de Parfum", brand: "dior", gender: "Women", price: 11800, discount: 9990, vol: 100, conc: "Eau De Parfum", top: ["Pear", "Melon", "Magnolia", "Peach", "Mandarin"], heart: ["Jasmine", "Lily-of-the-Valley", "Tuberose", "Freesia"], base: ["Musk", "Vanilla", "Blackberry", "Cedar"], img: IMAGES.womens_gold },
    { name: "Yves Saint Laurent Libre", brand: "ysl", gender: "Women", price: 9800, discount: 8200, vol: 90, conc: "Eau De Parfum", top: ["French Lavender", "Mandarin Orange", "Blackcurrant"], heart: ["Orange Blossom", "Sambac Jasmine"], base: ["Madagascar Vanilla", "Ambergris", "Cedar"], img: IMAGES.womens_gold },
    { name: "Davidoff Cool Water Man", brand: "davidoff", gender: "Men", price: 4200, discount: 2999, vol: 125, conc: "Eau De Toilette", top: ["Sea Water", "Mint", "Lavender", "Coriander"], heart: ["Sandalwood", "Jasmine", "Neroli", "Geranium"], base: ["Musk", "Oakmoss", "Cedar", "Tobacco", "Amber"], img: IMAGES.mens_dark },
    { name: "Gucci Bloom", brand: "gucci", gender: "Women", price: 9200, discount: 7600, vol: 100, conc: "Eau De Parfum", top: ["Rangoon Creeper"], heart: ["Tuberose Bud"], base: ["Jasmine Extract"], img: IMAGES.womens_pink },
    { name: "Lattafa Khamrah", brand: "lattafa", gender: "Unisex", price: 3499, discount: 2399, vol: 100, conc: "Eau De Parfum", top: ["Cinnamon", "Nutmeg", "Bergamot"], heart: ["Dates", "Praline", "Tuberose", "Mahonial"], base: ["Vanilla", "Tonka Bean", "Benzoin", "Myrrh", "Amberwood"], img: IMAGES.unisex_niche },
    { name: "Versace Bright Crystal", brand: "versace", gender: "Women", price: 6500, discount: 5190, vol: 90, conc: "Eau De Toilette", top: ["Yuzu", "Pomegranate", "Ice Accord"], heart: ["Peony", "Lotus", "Magnolia"], base: ["Musk", "Mahogany", "Amber"], img: IMAGES.womens_crystal },
    { name: "Tom Ford Oud Wood", brand: "tom-ford", gender: "Unisex", price: 19800, discount: 16900, vol: 100, conc: "Eau De Parfum", top: ["Rosewood", "Cardamom"], heart: ["Oud Wood", "Sandalwood", "Vetiver"], base: ["Tonka Bean", "Vanilla", "Amber"], img: IMAGES.luxury_black },
    { name: "Victoria's Secret Bare Vanilla", brand: "victorias-secret", gender: "Women", price: 2499, discount: 1699, vol: 250, conc: "Fragrance Body Mist", top: ["Whipped Vanilla"], heart: ["Soft Cashmere"], base: ["Skin Musk"], img: IMAGES.mist_spray },
    { name: "Sol de Janeiro Cheirosa 62", brand: "sol-de-janeiro", gender: "Women", price: 3200, discount: 2499, vol: 240, conc: "Fragrance Body Mist", top: ["Pistachio", "Almond"], heart: ["Heliotrope", "Jasmine Petals"], base: ["Salted Caramel", "Vanilla", "Sandalwood"], img: IMAGES.mist_pastel },
    { name: "Giorgio Armani Code Pour Homme", brand: "armani", gender: "Men", price: 8600, discount: 7100, vol: 75, conc: "Eau De Toilette", top: ["Bergamot", "Lemon"], heart: ["Star Anise", "Olive Blossom", "Guaiac Wood"], base: ["Leather", "Tobacco", "Tonka Bean"], img: IMAGES.mens_dark },
    { name: "Lattafa Asad", brand: "lattafa", gender: "Men", price: 2999, discount: 1999, vol: 100, conc: "Eau De Parfum", top: ["Black Pepper", "Pineapple", "Tobacco"], heart: ["Coffee", "Patchouli", "Iris"], base: ["Amber", "Vanilla", "Dry Woods", "Benzoin", "Labdanum"], img: IMAGES.mens_dark }
  ]
};

// Generate products array with unique slugs
const productsData = [];
let globalIndex = 0;

for (const [catSlug, items] of Object.entries(RAW_CATALOG)) {
  items.forEach((p, idx) => {
    globalIndex++;
    const slugBase = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = `${slugBase}-${catSlug}`;
    
    productsData.push({
      name: p.name,
      slug: slug,
      brandSlug: p.brand,
      categorySlug: catSlug,
      gender: p.gender,
      short_description: `${p.conc} featuring notes of ${p.top.join(', ')}.`,
      description: `${p.name} by ${p.brand.toUpperCase()} is an exquisite ${p.conc} crafted for discerning fragrance lovers. Opening with luminous ${p.top.join(', ')}, moving into a seductive heart of ${p.heart.join(', ')}, and resting upon a long-lasting base of ${p.base.join(', ')}.`,
      price: p.price,
      discount_price: p.discount,
      stock: 25 + ((globalIndex * 7) % 55),
      volume_ml: p.vol,
      concentration: p.conc,
      top_notes: p.top,
      heart_notes: p.heart,
      base_notes: p.base,
      image_url: p.img,
      gallery_urls: [p.img, IMAGES.mens_amber, IMAGES.womens_crystal],
      is_featured: idx < 6,
      rating: parseFloat((4.6 + ((globalIndex * 13) % 4) * 0.1).toFixed(1)),
      review_count: 65 + ((globalIndex * 29) % 240)
    });
  });
}

console.log(`Generated ${categoriesData.length} categories.`);
console.log(`Generated ${brandsData.length} brands.`);
console.log(`Generated ${productsData.length} products.`);

const fileContent = `const bcrypt = require('bcryptjs');

const categoriesData = ${JSON.stringify(categoriesData, null, 2)};

const brandsData = ${JSON.stringify(brandsData, null, 2)};

const productsData = ${JSON.stringify(productsData, null, 2)};

module.exports = {
  categoriesData,
  brandsData,
  productsData
};
`;

fs.writeFileSync(path.join(__dirname, '../backend/src/db/seedData.js'), fileContent, 'utf8');
console.log('Successfully wrote to backend/src/db/seedData.js');

