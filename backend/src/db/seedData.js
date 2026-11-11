// Real-world luxury perfume catalog seed data
const categoriesData = [
  {
    "name": "Men's Perfumes",
    "slug": "mens-perfumes",
    "description": "Bold, charismatic, and magnetic fragrances crafted for the modern gentleman.",
    "image_url": "/images/categories/mens-perfumes.jpg"
  },
  {
    "name": "Women's Perfumes",
    "slug": "womens-perfumes",
    "description": "Sophisticated, enchanting, and radiant bouquets of couture florals and sweet amber.",
    "image_url": "/images/categories/womens-perfumes.jpg"
  },
  {
    "name": "Unisex Perfumes",
    "slug": "unisex-perfumes",
    "description": "Boundary-defying niche creations celebrated by all connoisseurs of fine fragrance.",
    "image_url": "/images/categories/unisex-perfumes.jpg"
  },
  {
    "name": "Luxury Perfumes",
    "slug": "luxury-perfumes",
    "description": "Ultra-concentrated Extraits and private reserve blends using the rarest world essences.",
    "image_url": "/images/categories/luxury-perfumes.jpg"
  },
  {
    "name": "Arabic Perfumes",
    "slug": "arabic-perfumes",
    "description": "Opulent Middle Eastern fragrances rich in amber, warm spices, saffron, and sweet musks.",
    "image_url": "/images/categories/arabic-perfumes.jpg"
  },
  {
    "name": "Floral Fragrances",
    "slug": "floral-fragrances",
    "description": "Timeless blossoming petals of Grasse rose, nocturnal jasmine, peony, and white flowers.",
    "image_url": "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "name": "Oud Collection",
    "slug": "oud-collection",
    "description": "Smoky, hypnotic, and resinous agarwood elixirs embodying true luxury and depth.",
    "image_url": "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=600&q=80"
  },
  {
    "name": "Body Mists",
    "slug": "body-mists",
    "description": "Light, refreshing all-day fragrance sprays infused with gourmand vanilla and fresh fruits.",
    "image_url": "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    "name": "New Arrivals",
    "slug": "new-arrivals",
    "description": "The latest prestige releases, seasonal extraits, and limited edition perfume drops.",
    "image_url": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80"
  },
  {
    "name": "Best Sellers",
    "slug": "best-sellers",
    "description": "The world's most sought-after, critically acclaimed fragrances and iconic signatures.",
    "image_url": "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80"
  }
];

const brandsData = [
  {
    "name": "Dior",
    "slug": "dior",
    "description": "French luxury fashion house renowned for iconic fragrances including Sauvage, J'adore, and Dior Homme.",
    "logo_url": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=300&q=80"
  },
  {
    "name": "Chanel",
    "slug": "chanel",
    "description": "Legendary Parisian perfumer behind Chanel No. 5, Bleu de Chanel, and Coco Mademoiselle.",
    "logo_url": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=300&q=80"
  },
  {
    "name": "Gucci",
    "slug": "gucci",
    "description": "Italian haute couture master known for Gucci Bloom, Gucci Guilty, and Intense Oud.",
    "logo_url": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=300&q=80"
  },
  {
    "name": "Versace",
    "slug": "versace",
    "description": "Bold Italian glamour featuring Eros, Dylan Blue, Bright Crystal, and Oud Noir.",
    "logo_url": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=300&q=80"
  },
  {
    "name": "Giorgio Armani",
    "slug": "armani",
    "description": "Timeless Italian elegance embodied by Acqua Di Gio, Armani Code, and Armani Prive.",
    "logo_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=300&q=80"
  },
  {
    "name": "Yves Saint Laurent",
    "slug": "ysl",
    "description": "Sensual avant-garde luxury behind Black Opium, Libre, Y Eau de Parfum, and La Nuit de L'Homme.",
    "logo_url": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=300&q=80"
  },
  {
    "name": "Davidoff",
    "slug": "davidoff",
    "description": "Pioneers of oceanic aquatic freshness famous for Cool Water Man and Cool Water Woman.",
    "logo_url": "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=300&q=80"
  },
  {
    "name": "Tom Ford",
    "slug": "tom-ford",
    "description": "Provocative private blends including Tobacco Vanille, Oud Wood, and Lost Cherry.",
    "logo_url": "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=300&q=80"
  },
  {
    "name": "Creed",
    "slug": "creed",
    "description": "Historic Anglo-French dynasty celebrated for Aventus, Green Irish Tweed, and Silver Mountain Water.",
    "logo_url": "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=300&q=80"
  },
  {
    "name": "Maison Francis Kurkdjian",
    "slug": "mfk",
    "description": "Sublime Parisian niche perfumery creating Baccarat Rouge 540 and Grand Soir.",
    "logo_url": "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=300&q=80"
  },
  {
    "name": "Lattafa",
    "slug": "lattafa",
    "description": "World-leading Dubai perfumer renowned for Khamrah, Asad, Bade'e Al Oud, and Yara.",
    "logo_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=300&q=80"
  },
  {
    "name": "Victoria's Secret",
    "slug": "victorias-secret",
    "description": "Iconic fragrance mists including Bare Vanilla, Pure Seduction, Velvet Petals, and Love Spell.",
    "logo_url": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=300&q=80"
  },
  {
    "name": "Sol de Janeiro",
    "slug": "sol-de-janeiro",
    "description": "Viral Brazilian body and hair mists inspired by the vibrant warmth of Rio de Janeiro.",
    "logo_url": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=300&q=80"
  }
];

const productsData = [
  {
    "name": "Dior Sauvage Eau de Parfum",
    "slug": "dior-sauvage-eau-de-parfum-mens-perfumes",
    "brandSlug": "dior",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Calabrian Bergamot, Sichuan Pepper.",
    "description": "Dior Sauvage Eau de Parfum by DIOR is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Calabrian Bergamot, Sichuan Pepper, moving into a seductive heart of Star Anise, Nutmeg, Lavender, and resting upon a long-lasting base of Papua Vanilla, Ambroxan.",
    "price": 9800,
    "discount_price": 7990,
    "stock": 32,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Calabrian Bergamot",
      "Sichuan Pepper"
    ],
    "heart_notes": [
      "Star Anise",
      "Nutmeg",
      "Lavender"
    ],
    "base_notes": [
      "Papua Vanilla",
      "Ambroxan"
    ],
    "image_url": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 94
  },
  {
    "name": "Bleu de Chanel Eau de Parfum",
    "slug": "bleu-de-chanel-eau-de-parfum-mens-perfumes",
    "brandSlug": "chanel",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Grapefruit, Lemon, Mint.",
    "description": "Bleu de Chanel Eau de Parfum by CHANEL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Grapefruit, Lemon, Mint, moving into a seductive heart of Ginger, Iso E Super, Nutmeg, and resting upon a long-lasting base of Incense, Vetiver, Cedarwood.",
    "price": 11500,
    "discount_price": 9900,
    "stock": 39,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Grapefruit",
      "Lemon",
      "Mint"
    ],
    "heart_notes": [
      "Ginger",
      "Iso E Super",
      "Nutmeg"
    ],
    "base_notes": [
      "Incense",
      "Vetiver",
      "Cedarwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 123
  },
  {
    "name": "Giorgio Armani Acqua Di Gio Profondo",
    "slug": "giorgio-armani-acqua-di-gio-profondo-mens-perfumes",
    "brandSlug": "armani",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Marine Notes, Green Mandarin.",
    "description": "Giorgio Armani Acqua Di Gio Profondo by ARMANI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Marine Notes, Green Mandarin, moving into a seductive heart of Rosemary, Lavender, Cypress, and resting upon a long-lasting base of Mineral Amber, Patchouli, Musk.",
    "price": 8900,
    "discount_price": 7450,
    "stock": 46,
    "volume_ml": 75,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Marine Notes",
      "Green Mandarin"
    ],
    "heart_notes": [
      "Rosemary",
      "Lavender",
      "Cypress"
    ],
    "base_notes": [
      "Mineral Amber",
      "Patchouli",
      "Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.9,
    "review_count": 152
  },
  {
    "name": "Versace Eros Eau de Toilette",
    "slug": "versace-eros-eau-de-toilette-mens-perfumes",
    "brandSlug": "versace",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Toilette featuring notes of Mint Leaves, Italian Lemon, Green Apple.",
    "description": "Versace Eros Eau de Toilette by VERSACE is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Mint Leaves, Italian Lemon, Green Apple, moving into a seductive heart of Tonka Bean, Ambroxan, Geranium, and resting upon a long-lasting base of Madagascar Vanilla, Cedarwood, Oakmoss.",
    "price": 6800,
    "discount_price": 5499,
    "stock": 53,
    "volume_ml": 100,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Mint Leaves",
      "Italian Lemon",
      "Green Apple"
    ],
    "heart_notes": [
      "Tonka Bean",
      "Ambroxan",
      "Geranium"
    ],
    "base_notes": [
      "Madagascar Vanilla",
      "Cedarwood",
      "Oakmoss"
    ],
    "image_url": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.6,
    "review_count": 181
  },
  {
    "name": "Yves Saint Laurent Y Eau de Parfum",
    "slug": "yves-saint-laurent-y-eau-de-parfum-mens-perfumes",
    "brandSlug": "ysl",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Apple, Ginger, Bergamot.",
    "description": "Yves Saint Laurent Y Eau de Parfum by YSL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Apple, Ginger, Bergamot, moving into a seductive heart of Sage, Juniper Berries, Geranium, and resting upon a long-lasting base of Amberwood, Tonka Bean, Cedar.",
    "price": 8900,
    "discount_price": 7200,
    "stock": 60,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Apple",
      "Ginger",
      "Bergamot"
    ],
    "heart_notes": [
      "Sage",
      "Juniper Berries",
      "Geranium"
    ],
    "base_notes": [
      "Amberwood",
      "Tonka Bean",
      "Cedar"
    ],
    "image_url": "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1691043809859-01b4f03c7a8e?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 210
  },
  {
    "name": "Davidoff Cool Water Eau de Toilette",
    "slug": "davidoff-cool-water-eau-de-toilette-mens-perfumes",
    "brandSlug": "davidoff",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Toilette featuring notes of Sea Water, Mint, Green Notes.",
    "description": "Davidoff Cool Water Eau de Toilette by DAVIDOFF is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Sea Water, Mint, Green Notes, moving into a seductive heart of Sandalwood, Jasmine, Neroli, and resting upon a long-lasting base of Tobacco, Oakmoss, Cedarwood.",
    "price": 4200,
    "discount_price": 2999,
    "stock": 67,
    "volume_ml": 125,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Sea Water",
      "Mint",
      "Green Notes"
    ],
    "heart_notes": [
      "Sandalwood",
      "Jasmine",
      "Neroli"
    ],
    "base_notes": [
      "Tobacco",
      "Oakmoss",
      "Cedarwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1691043809859-01b4f03c7a8e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 239
  },
  {
    "name": "Creed Aventus Extrait de Parfum",
    "slug": "creed-aventus-extrait-de-parfum-mens-perfumes",
    "brandSlug": "creed",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Blackcurrant, Italian Bergamot, French Apple.",
    "description": "Creed Aventus Extrait de Parfum by CREED is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Blackcurrant, Italian Bergamot, French Apple, moving into a seductive heart of Birch, Patchouli, Moroccan Jasmine, and resting upon a long-lasting base of Musk, Oakmoss, Ambergris.",
    "price": 28500,
    "discount_price": 24900,
    "stock": 74,
    "volume_ml": 100,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Blackcurrant",
      "Italian Bergamot",
      "French Apple"
    ],
    "heart_notes": [
      "Birch",
      "Patchouli",
      "Moroccan Jasmine"
    ],
    "base_notes": [
      "Musk",
      "Oakmoss",
      "Ambergris"
    ],
    "image_url": "https://images.unsplash.com/photo-1691043809859-01b4f03c7a8e?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1691043809859-01b4f03c7a8e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1747916148863-7164d8920b57?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 268
  },
  {
    "name": "Tom Ford Noir Extreme",
    "slug": "tom-ford-noir-extreme-mens-perfumes",
    "brandSlug": "tom-ford",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Cardamom, Nutmeg, Saffron.",
    "description": "Tom Ford Noir Extreme by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Cardamom, Nutmeg, Saffron, moving into a seductive heart of Kulfi Accord, Rose, Orange Blossom, and resting upon a long-lasting base of Vanilla, Amber, Sandalwood.",
    "price": 16500,
    "discount_price": 13900,
    "stock": 26,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Cardamom",
      "Nutmeg",
      "Saffron"
    ],
    "heart_notes": [
      "Kulfi Accord",
      "Rose",
      "Orange Blossom"
    ],
    "base_notes": [
      "Vanilla",
      "Amber",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1747916148863-7164d8920b57?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1753389665531-668543c597cc?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 297
  },
  {
    "name": "Gucci Guilty Pour Homme",
    "slug": "gucci-guilty-pour-homme-mens-perfumes",
    "brandSlug": "gucci",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of French Lavender, Amalfi Lemon.",
    "description": "Gucci Guilty Pour Homme by GUCCI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous French Lavender, Amalfi Lemon, moving into a seductive heart of Orange Blossom, Neroli, and resting upon a long-lasting base of Cedarwood, Patchouli.",
    "price": 7900,
    "discount_price": 6499,
    "stock": 33,
    "volume_ml": 90,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "French Lavender",
      "Amalfi Lemon"
    ],
    "heart_notes": [
      "Orange Blossom",
      "Neroli"
    ],
    "base_notes": [
      "Cedarwood",
      "Patchouli"
    ],
    "image_url": "https://images.unsplash.com/photo-1747916148863-7164d8920b57?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1747916148863-7164d8920b57?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1753389665531-668543c597cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1698877360256-bc45ef15e072?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 86
  },
  {
    "name": "Dior Fahrenheit Eau de Toilette",
    "slug": "dior-fahrenheit-eau-de-toilette-mens-perfumes",
    "brandSlug": "dior",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Toilette featuring notes of Nutmeg Flower, Lavender, Cedar.",
    "description": "Dior Fahrenheit Eau de Toilette by DIOR is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Nutmeg Flower, Lavender, Cedar, moving into a seductive heart of Violet Leaf, Nutmeg, Carnation, and resting upon a long-lasting base of Leather, Vetiver, Tonka Bean.",
    "price": 8200,
    "discount_price": 6999,
    "stock": 40,
    "volume_ml": 100,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Nutmeg Flower",
      "Lavender",
      "Cedar"
    ],
    "heart_notes": [
      "Violet Leaf",
      "Nutmeg",
      "Carnation"
    ],
    "base_notes": [
      "Leather",
      "Vetiver",
      "Tonka Bean"
    ],
    "image_url": "https://images.unsplash.com/photo-1753389665531-668543c597cc?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1753389665531-668543c597cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1698877360256-bc45ef15e072?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595389294696-ae969ff733a8?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 115
  },
  {
    "name": "Versace Dylan Blue Pour Homme",
    "slug": "versace-dylan-blue-pour-homme-mens-perfumes",
    "brandSlug": "versace",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Toilette featuring notes of Calabrian Bergamot, Grapefruit, Fig Leaf.",
    "description": "Versace Dylan Blue Pour Homme by VERSACE is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Calabrian Bergamot, Grapefruit, Fig Leaf, moving into a seductive heart of Violet Leaf, Papyrus Wood, Patchouli, and resting upon a long-lasting base of Mineral Musk, Tonka Bean, Saffron.",
    "price": 6900,
    "discount_price": 5599,
    "stock": 47,
    "volume_ml": 100,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Calabrian Bergamot",
      "Grapefruit",
      "Fig Leaf"
    ],
    "heart_notes": [
      "Violet Leaf",
      "Papyrus Wood",
      "Patchouli"
    ],
    "base_notes": [
      "Mineral Musk",
      "Tonka Bean",
      "Saffron"
    ],
    "image_url": "https://images.unsplash.com/photo-1698877360256-bc45ef15e072?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1698877360256-bc45ef15e072?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595389294696-ae969ff733a8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1747916147834-afe35b0d95ac?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 144
  },
  {
    "name": "Giorgio Armani Code Parfum",
    "slug": "giorgio-armani-code-parfum-mens-perfumes",
    "brandSlug": "armani",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Bergamot Leaf, Green Mandarin.",
    "description": "Giorgio Armani Code Parfum by ARMANI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Bergamot Leaf, Green Mandarin, moving into a seductive heart of Clary Sage, Iris Root, and resting upon a long-lasting base of Tonka Bean, Cedarwood.",
    "price": 9200,
    "discount_price": 7800,
    "stock": 54,
    "volume_ml": 75,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Bergamot Leaf",
      "Green Mandarin"
    ],
    "heart_notes": [
      "Clary Sage",
      "Iris Root"
    ],
    "base_notes": [
      "Tonka Bean",
      "Cedarwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1595389294696-ae969ff733a8?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1595389294696-ae969ff733a8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1747916147834-afe35b0d95ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 173
  },
  {
    "name": "Yves Saint Laurent La Nuit de L'Homme",
    "slug": "yves-saint-laurent-la-nuit-de-l-homme-mens-perfumes",
    "brandSlug": "ysl",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Toilette featuring notes of Cardamom.",
    "description": "Yves Saint Laurent La Nuit de L'Homme by YSL is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Cardamom, moving into a seductive heart of Lavender, Virginia Cedar, Bergamot, and resting upon a long-lasting base of Caraway, Vetiver.",
    "price": 8400,
    "discount_price": 6890,
    "stock": 61,
    "volume_ml": 100,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Cardamom"
    ],
    "heart_notes": [
      "Lavender",
      "Virginia Cedar",
      "Bergamot"
    ],
    "base_notes": [
      "Caraway",
      "Vetiver"
    ],
    "image_url": "https://images.unsplash.com/photo-1747916147834-afe35b0d95ac?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1747916147834-afe35b0d95ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 202
  },
  {
    "name": "Chanel Allure Homme Sport",
    "slug": "chanel-allure-homme-sport-mens-perfumes",
    "brandSlug": "chanel",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Toilette featuring notes of Orange, Sea Notes, Aldehydes.",
    "description": "Chanel Allure Homme Sport by CHANEL is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Orange, Sea Notes, Aldehydes, moving into a seductive heart of Pepper, Neroli, Cedar, and resting upon a long-lasting base of Tonka Bean, Vanilla, White Musk.",
    "price": 10800,
    "discount_price": 9200,
    "stock": 68,
    "volume_ml": 100,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Orange",
      "Sea Notes",
      "Aldehydes"
    ],
    "heart_notes": [
      "Pepper",
      "Neroli",
      "Cedar"
    ],
    "base_notes": [
      "Tonka Bean",
      "Vanilla",
      "White Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 231
  },
  {
    "name": "Davidoff Cool Water Reborn",
    "slug": "davidoff-cool-water-reborn-mens-perfumes",
    "brandSlug": "davidoff",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Galbanum, Rosemary.",
    "description": "Davidoff Cool Water Reborn by DAVIDOFF is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Galbanum, Rosemary, moving into a seductive heart of Bourbon Vetiver, and resting upon a long-lasting base of Haitian Vetiver, Amber.",
    "price": 4600,
    "discount_price": 3499,
    "stock": 75,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Galbanum",
      "Rosemary"
    ],
    "heart_notes": [
      "Bourbon Vetiver"
    ],
    "base_notes": [
      "Haitian Vetiver",
      "Amber"
    ],
    "image_url": "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 260
  },
  {
    "name": "Dior Homme Intense",
    "slug": "dior-homme-intense-mens-perfumes",
    "brandSlug": "dior",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Tuscan Iris, Lavender.",
    "description": "Dior Homme Intense by DIOR is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Tuscan Iris, Lavender, moving into a seductive heart of Ambrette Seed, Pear, and resting upon a long-lasting base of Virginia Cedar, Vetiver.",
    "price": 10500,
    "discount_price": 8900,
    "stock": 27,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Tuscan Iris",
      "Lavender"
    ],
    "heart_notes": [
      "Ambrette Seed",
      "Pear"
    ],
    "base_notes": [
      "Virginia Cedar",
      "Vetiver"
    ],
    "image_url": "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 289
  },
  {
    "name": "Versace Eros Flame",
    "slug": "versace-eros-flame-mens-perfumes",
    "brandSlug": "versace",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Chinotto, Madagascar Black Pepper.",
    "description": "Versace Eros Flame by VERSACE is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Chinotto, Madagascar Black Pepper, moving into a seductive heart of Wild Mountain Rosemary, Rose, and resting upon a long-lasting base of Texas Cedar, Haitian Vetiver, Vanilla.",
    "price": 7200,
    "discount_price": 5800,
    "stock": 34,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Chinotto",
      "Madagascar Black Pepper"
    ],
    "heart_notes": [
      "Wild Mountain Rosemary",
      "Rose"
    ],
    "base_notes": [
      "Texas Cedar",
      "Haitian Vetiver",
      "Vanilla"
    ],
    "image_url": "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 78
  },
  {
    "name": "Lattafa Asad Pour Homme",
    "slug": "lattafa-asad-pour-homme-mens-perfumes",
    "brandSlug": "lattafa",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Black Pepper, Pineapple, Tobacco.",
    "description": "Lattafa Asad Pour Homme by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Black Pepper, Pineapple, Tobacco, moving into a seductive heart of Coffee, Patchouli, Iris, and resting upon a long-lasting base of Amber, Vanilla, Dry Woods.",
    "price": 2999,
    "discount_price": 1999,
    "stock": 41,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Black Pepper",
      "Pineapple",
      "Tobacco"
    ],
    "heart_notes": [
      "Coffee",
      "Patchouli",
      "Iris"
    ],
    "base_notes": [
      "Amber",
      "Vanilla",
      "Dry Woods"
    ],
    "image_url": "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 107
  },
  {
    "name": "Giorgio Armani Stronger With You Intensely",
    "slug": "giorgio-armani-stronger-with-you-intensely-mens-perfumes",
    "brandSlug": "armani",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Pink Pepper, Juniper.",
    "description": "Giorgio Armani Stronger With You Intensely by ARMANI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Pink Pepper, Juniper, moving into a seductive heart of Lavender, Sage, Toffee, and resting upon a long-lasting base of Vanilla, Amber, Suede.",
    "price": 7800,
    "discount_price": 6490,
    "stock": 48,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Pink Pepper",
      "Juniper"
    ],
    "heart_notes": [
      "Lavender",
      "Sage",
      "Toffee"
    ],
    "base_notes": [
      "Vanilla",
      "Amber",
      "Suede"
    ],
    "image_url": "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 136
  },
  {
    "name": "Davidoff Horizon Extreme",
    "slug": "davidoff-horizon-extreme-mens-perfumes",
    "brandSlug": "davidoff",
    "categorySlug": "mens-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Grapefruit, Ginger, Rosemary.",
    "description": "Davidoff Horizon Extreme by DAVIDOFF is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Grapefruit, Ginger, Rosemary, moving into a seductive heart of Cedarwood, Nutmeg, Cypriol, and resting upon a long-lasting base of Amber, Sandalwood.",
    "price": 4800,
    "discount_price": 3600,
    "stock": 55,
    "volume_ml": 125,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Grapefruit",
      "Ginger",
      "Rosemary"
    ],
    "heart_notes": [
      "Cedarwood",
      "Nutmeg",
      "Cypriol"
    ],
    "base_notes": [
      "Amber",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 165
  },
  {
    "name": "Chanel Coco Mademoiselle",
    "slug": "chanel-coco-mademoiselle-womens-perfumes",
    "brandSlug": "chanel",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Orange, Mandarin, Bergamot.",
    "description": "Chanel Coco Mademoiselle by CHANEL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Orange, Mandarin, Bergamot, moving into a seductive heart of Turkish Rose, Jasmine, Mimosa, and resting upon a long-lasting base of Patchouli, White Musk, Vanilla.",
    "price": 12500,
    "discount_price": 10800,
    "stock": 62,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Orange",
      "Mandarin",
      "Bergamot"
    ],
    "heart_notes": [
      "Turkish Rose",
      "Jasmine",
      "Mimosa"
    ],
    "base_notes": [
      "Patchouli",
      "White Musk",
      "Vanilla"
    ],
    "image_url": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 194
  },
  {
    "name": "Dior J'adore Eau de Parfum",
    "slug": "dior-j-adore-eau-de-parfum-womens-perfumes",
    "brandSlug": "dior",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Pear, Melon, Magnolia.",
    "description": "Dior J'adore Eau de Parfum by DIOR is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Pear, Melon, Magnolia, moving into a seductive heart of Jasmine, Lily-of-the-Valley, Tuberose, and resting upon a long-lasting base of Musk, Vanilla, Cedar.",
    "price": 11800,
    "discount_price": 9990,
    "stock": 69,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Pear",
      "Melon",
      "Magnolia"
    ],
    "heart_notes": [
      "Jasmine",
      "Lily-of-the-Valley",
      "Tuberose"
    ],
    "base_notes": [
      "Musk",
      "Vanilla",
      "Cedar"
    ],
    "image_url": "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 223
  },
  {
    "name": "Yves Saint Laurent Libre Eau de Parfum",
    "slug": "yves-saint-laurent-libre-eau-de-parfum-womens-perfumes",
    "brandSlug": "ysl",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Lavender, Mandarin Orange, Blackcurrant.",
    "description": "Yves Saint Laurent Libre Eau de Parfum by YSL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Lavender, Mandarin Orange, Blackcurrant, moving into a seductive heart of Orange Blossom, Jasmine, and resting upon a long-lasting base of Madagascar Vanilla, Cedar, Ambergris.",
    "price": 9800,
    "discount_price": 8200,
    "stock": 76,
    "volume_ml": 90,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Lavender",
      "Mandarin Orange",
      "Blackcurrant"
    ],
    "heart_notes": [
      "Orange Blossom",
      "Jasmine"
    ],
    "base_notes": [
      "Madagascar Vanilla",
      "Cedar",
      "Ambergris"
    ],
    "image_url": "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.9,
    "review_count": 252
  },
  {
    "name": "Gucci Bloom Eau de Parfum",
    "slug": "gucci-bloom-eau-de-parfum-womens-perfumes",
    "brandSlug": "gucci",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Rangoon Creeper.",
    "description": "Gucci Bloom Eau de Parfum by GUCCI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Rangoon Creeper, moving into a seductive heart of Tuberose, Jasmine Bud, and resting upon a long-lasting base of Sandalwood, Vanilla.",
    "price": 9200,
    "discount_price": 7600,
    "stock": 28,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Rangoon Creeper"
    ],
    "heart_notes": [
      "Tuberose",
      "Jasmine Bud"
    ],
    "base_notes": [
      "Sandalwood",
      "Vanilla"
    ],
    "image_url": "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.6,
    "review_count": 281
  },
  {
    "name": "Versace Bright Crystal Absolu",
    "slug": "versace-bright-crystal-absolu-womens-perfumes",
    "brandSlug": "versace",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Pomegranate, Yuzu, Iced Accord.",
    "description": "Versace Bright Crystal Absolu by VERSACE is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Pomegranate, Yuzu, Iced Accord, moving into a seductive heart of Peony, Magnolia, Lotus Flower, Raspberry, and resting upon a long-lasting base of Amber, Musk, Mahogany.",
    "price": 6900,
    "discount_price": 5490,
    "stock": 35,
    "volume_ml": 90,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Pomegranate",
      "Yuzu",
      "Iced Accord"
    ],
    "heart_notes": [
      "Peony",
      "Magnolia",
      "Lotus Flower",
      "Raspberry"
    ],
    "base_notes": [
      "Amber",
      "Musk",
      "Mahogany"
    ],
    "image_url": "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 70
  },
  {
    "name": "Giorgio Armani Si Passione",
    "slug": "giorgio-armani-si-passione-womens-perfumes",
    "brandSlug": "armani",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Blackcurrant, Pear, Pink Pepper.",
    "description": "Giorgio Armani Si Passione by ARMANI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Blackcurrant, Pear, Pink Pepper, moving into a seductive heart of Rose, Jasmine, Heliotrope, and resting upon a long-lasting base of Vanilla, Cedarwood.",
    "price": 8900,
    "discount_price": 7300,
    "stock": 42,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Blackcurrant",
      "Pear",
      "Pink Pepper"
    ],
    "heart_notes": [
      "Rose",
      "Jasmine",
      "Heliotrope"
    ],
    "base_notes": [
      "Vanilla",
      "Cedarwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1708733145706-82da0d0596e9?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 99
  },
  {
    "name": "Yves Saint Laurent Black Opium",
    "slug": "yves-saint-laurent-black-opium-womens-perfumes",
    "brandSlug": "ysl",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Pear, Pink Pepper, Orange Blossom.",
    "description": "Yves Saint Laurent Black Opium by YSL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Pear, Pink Pepper, Orange Blossom, moving into a seductive heart of Coffee, Jasmine, Bitter Almond, and resting upon a long-lasting base of Vanilla, Patchouli, Cashmere Wood.",
    "price": 9600,
    "discount_price": 7990,
    "stock": 49,
    "volume_ml": 90,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Pear",
      "Pink Pepper",
      "Orange Blossom"
    ],
    "heart_notes": [
      "Coffee",
      "Jasmine",
      "Bitter Almond"
    ],
    "base_notes": [
      "Vanilla",
      "Patchouli",
      "Cashmere Wood"
    ],
    "image_url": "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1708733145706-82da0d0596e9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1623072042391-46d461773e03?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 128
  },
  {
    "name": "Dior Miss Dior Blooming Bouquet",
    "slug": "dior-miss-dior-blooming-bouquet-womens-perfumes",
    "brandSlug": "dior",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Toilette featuring notes of Damascus Rose, Calabrian Bergamot.",
    "description": "Dior Miss Dior Blooming Bouquet by DIOR is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Damascus Rose, Calabrian Bergamot, moving into a seductive heart of Peony, Apricot, Peach, and resting upon a long-lasting base of White Musk.",
    "price": 10200,
    "discount_price": 8600,
    "stock": 56,
    "volume_ml": 100,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Damascus Rose",
      "Calabrian Bergamot"
    ],
    "heart_notes": [
      "Peony",
      "Apricot",
      "Peach"
    ],
    "base_notes": [
      "White Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1708733145706-82da0d0596e9?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1708733145706-82da0d0596e9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1623072042391-46d461773e03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 157
  },
  {
    "name": "Chanel Chance Eau Tendre",
    "slug": "chanel-chance-eau-tendre-womens-perfumes",
    "brandSlug": "chanel",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Quince, Grapefruit.",
    "description": "Chanel Chance Eau Tendre by CHANEL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Quince, Grapefruit, moving into a seductive heart of Hyacinth, Jasmine, and resting upon a long-lasting base of Musk, Iris, Virginia Cedar.",
    "price": 11200,
    "discount_price": 9600,
    "stock": 63,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Quince",
      "Grapefruit"
    ],
    "heart_notes": [
      "Hyacinth",
      "Jasmine"
    ],
    "base_notes": [
      "Musk",
      "Iris",
      "Virginia Cedar"
    ],
    "image_url": "https://images.unsplash.com/photo-1623072042391-46d461773e03?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1623072042391-46d461773e03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514348871858-1d3c20902571?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 186
  },
  {
    "name": "Gucci Flora Gorgeous Gardenia",
    "slug": "gucci-flora-gorgeous-gardenia-womens-perfumes",
    "brandSlug": "gucci",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Pear Blossom, Italian Mandarin.",
    "description": "Gucci Flora Gorgeous Gardenia by GUCCI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Pear Blossom, Italian Mandarin, moving into a seductive heart of White Gardenia, Solar Jasmine, and resting upon a long-lasting base of Brown Sugar, Patchouli.",
    "price": 8800,
    "discount_price": 7200,
    "stock": 70,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Pear Blossom",
      "Italian Mandarin"
    ],
    "heart_notes": [
      "White Gardenia",
      "Solar Jasmine"
    ],
    "base_notes": [
      "Brown Sugar",
      "Patchouli"
    ],
    "image_url": "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514348871858-1d3c20902571?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 215
  },
  {
    "name": "Versace Crystal Noir",
    "slug": "versace-crystal-noir-womens-perfumes",
    "brandSlug": "versace",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Cardamom, Ginger, Pepper.",
    "description": "Versace Crystal Noir by VERSACE is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Cardamom, Ginger, Pepper, moving into a seductive heart of Gardenia, Coconut, Peony, and resting upon a long-lasting base of Amber, Musk, Sandalwood.",
    "price": 7400,
    "discount_price": 5990,
    "stock": 77,
    "volume_ml": 90,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Cardamom",
      "Ginger",
      "Pepper"
    ],
    "heart_notes": [
      "Gardenia",
      "Coconut",
      "Peony"
    ],
    "base_notes": [
      "Amber",
      "Musk",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1514348871858-1d3c20902571?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1514348871858-1d3c20902571?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572533177115-5bea803c0f49?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 244
  },
  {
    "name": "Giorgio Armani My Way Intense",
    "slug": "giorgio-armani-my-way-intense-womens-perfumes",
    "brandSlug": "armani",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Orange Blossom, Bitter Orange.",
    "description": "Giorgio Armani My Way Intense by ARMANI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Orange Blossom, Bitter Orange, moving into a seductive heart of Indian Tuberose, Tuberose, and resting upon a long-lasting base of Madagascar Vanilla, Sandalwood.",
    "price": 8600,
    "discount_price": 7100,
    "stock": 29,
    "volume_ml": 90,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Orange Blossom",
      "Bitter Orange"
    ],
    "heart_notes": [
      "Indian Tuberose",
      "Tuberose"
    ],
    "base_notes": [
      "Madagascar Vanilla",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572533177115-5bea803c0f49?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533017568856-f6085fef5f1f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 273
  },
  {
    "name": "Yves Saint Laurent Mon Paris",
    "slug": "yves-saint-laurent-mon-paris-womens-perfumes",
    "brandSlug": "ysl",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Strawberry, Raspberry, Bergamot.",
    "description": "Yves Saint Laurent Mon Paris by YSL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Strawberry, Raspberry, Bergamot, moving into a seductive heart of Datura, Peony, Chinese Jasmine, and resting upon a long-lasting base of Indonesian Patchouli, White Musk.",
    "price": 8900,
    "discount_price": 7400,
    "stock": 36,
    "volume_ml": 90,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Strawberry",
      "Raspberry",
      "Bergamot"
    ],
    "heart_notes": [
      "Datura",
      "Peony",
      "Chinese Jasmine"
    ],
    "base_notes": [
      "Indonesian Patchouli",
      "White Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1572533177115-5bea803c0f49?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1572533177115-5bea803c0f49?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533017568856-f6085fef5f1f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 302
  },
  {
    "name": "Dior Poison Girl",
    "slug": "dior-poison-girl-womens-perfumes",
    "brandSlug": "dior",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Bitter Orange, Lemon.",
    "description": "Dior Poison Girl by DIOR is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Bitter Orange, Lemon, moving into a seductive heart of Damask Rose, Grasse Rose, Orange Blossom, and resting upon a long-lasting base of Tonka Bean, Vanilla, Almond.",
    "price": 9400,
    "discount_price": 7890,
    "stock": 43,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Bitter Orange",
      "Lemon"
    ],
    "heart_notes": [
      "Damask Rose",
      "Grasse Rose",
      "Orange Blossom"
    ],
    "base_notes": [
      "Tonka Bean",
      "Vanilla",
      "Almond"
    ],
    "image_url": "https://images.unsplash.com/photo-1533017568856-f6085fef5f1f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1533017568856-f6085fef5f1f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 91
  },
  {
    "name": "Davidoff Cool Water Woman",
    "slug": "davidoff-cool-water-woman-womens-perfumes",
    "brandSlug": "davidoff",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Toilette featuring notes of Melon, Lotus, Lemon, Pineapple.",
    "description": "Davidoff Cool Water Woman by DAVIDOFF is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Melon, Lotus, Lemon, Pineapple, moving into a seductive heart of Water Lily, Lily-of-the-Valley, Jasmine, and resting upon a long-lasting base of Musk, Vanilla, Peach.",
    "price": 4200,
    "discount_price": 2999,
    "stock": 50,
    "volume_ml": 100,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Melon",
      "Lotus",
      "Lemon",
      "Pineapple"
    ],
    "heart_notes": [
      "Water Lily",
      "Lily-of-the-Valley",
      "Jasmine"
    ],
    "base_notes": [
      "Musk",
      "Vanilla",
      "Peach"
    ],
    "image_url": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 120
  },
  {
    "name": "Lattafa Yara Pink",
    "slug": "lattafa-yara-pink-womens-perfumes",
    "brandSlug": "lattafa",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Heliotrope, Orchid, Tangerine.",
    "description": "Lattafa Yara Pink by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Heliotrope, Orchid, Tangerine, moving into a seductive heart of Gourmand Accord, Tropical Fruits, and resting upon a long-lasting base of Vanilla, Sandalwood, Musk.",
    "price": 2800,
    "discount_price": 1850,
    "stock": 57,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Heliotrope",
      "Orchid",
      "Tangerine"
    ],
    "heart_notes": [
      "Gourmand Accord",
      "Tropical Fruits"
    ],
    "base_notes": [
      "Vanilla",
      "Sandalwood",
      "Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 149
  },
  {
    "name": "Tom Ford Velvet Orchid",
    "slug": "tom-ford-velvet-orchid-womens-perfumes",
    "brandSlug": "tom-ford",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Rum, Honey, Mandarin Orange.",
    "description": "Tom Ford Velvet Orchid by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Rum, Honey, Mandarin Orange, moving into a seductive heart of Black Orchid, Rose Oil, Jasmine, and resting upon a long-lasting base of Vanilla, Myrrh, Sandalwood.",
    "price": 15500,
    "discount_price": 12900,
    "stock": 64,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Rum",
      "Honey",
      "Mandarin Orange"
    ],
    "heart_notes": [
      "Black Orchid",
      "Rose Oil",
      "Jasmine"
    ],
    "base_notes": [
      "Vanilla",
      "Myrrh",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 178
  },
  {
    "name": "Chanel No. 5 L'Eau",
    "slug": "chanel-no-5-l-eau-womens-perfumes",
    "brandSlug": "chanel",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Toilette featuring notes of Aldehydes, Lemon, Neroli.",
    "description": "Chanel No. 5 L'Eau by CHANEL is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Aldehydes, Lemon, Neroli, moving into a seductive heart of Ylang-Ylang, Jasmine, Rose, and resting upon a long-lasting base of White Musk, Cedar, Vanilla.",
    "price": 11900,
    "discount_price": 10200,
    "stock": 71,
    "volume_ml": 100,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Aldehydes",
      "Lemon",
      "Neroli"
    ],
    "heart_notes": [
      "Ylang-Ylang",
      "Jasmine",
      "Rose"
    ],
    "base_notes": [
      "White Musk",
      "Cedar",
      "Vanilla"
    ],
    "image_url": "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 207
  },
  {
    "name": "Gucci Guilty Eau de Parfum Intense",
    "slug": "gucci-guilty-eau-de-parfum-intense-womens-perfumes",
    "brandSlug": "gucci",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Mandora, Litchi, Violet.",
    "description": "Gucci Guilty Eau de Parfum Intense by GUCCI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Mandora, Litchi, Violet, moving into a seductive heart of Ylang-Ylang, Tuberose, Plum, and resting upon a long-lasting base of Patchouli, Vanilla, Vetiver.",
    "price": 9500,
    "discount_price": 7800,
    "stock": 78,
    "volume_ml": 90,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Mandora",
      "Litchi",
      "Violet"
    ],
    "heart_notes": [
      "Ylang-Ylang",
      "Tuberose",
      "Plum"
    ],
    "base_notes": [
      "Patchouli",
      "Vanilla",
      "Vetiver"
    ],
    "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 236
  },
  {
    "name": "Versace Dylan Purple",
    "slug": "versace-dylan-purple-womens-perfumes",
    "brandSlug": "versace",
    "categorySlug": "womens-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Pear, Bitter Orange, Bergamot.",
    "description": "Versace Dylan Purple by VERSACE is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Pear, Bitter Orange, Bergamot, moving into a seductive heart of Freesia, Pomarose, Mahonial, and resting upon a long-lasting base of Ambroxan, Iso E Super, Virginia Cedar.",
    "price": 6800,
    "discount_price": 5400,
    "stock": 30,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Pear",
      "Bitter Orange",
      "Bergamot"
    ],
    "heart_notes": [
      "Freesia",
      "Pomarose",
      "Mahonial"
    ],
    "base_notes": [
      "Ambroxan",
      "Iso E Super",
      "Virginia Cedar"
    ],
    "image_url": "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 265
  },
  {
    "name": "Maison Francis Kurkdjian Baccarat Rouge 540",
    "slug": "maison-francis-kurkdjian-baccarat-rouge-540-unisex-perfumes",
    "brandSlug": "mfk",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Jasmine, Saffron.",
    "description": "Maison Francis Kurkdjian Baccarat Rouge 540 by MFK is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Jasmine, Saffron, moving into a seductive heart of Amberwood, Ambergris, and resting upon a long-lasting base of Fir Resin, Cedarwood.",
    "price": 24500,
    "discount_price": 21200,
    "stock": 37,
    "volume_ml": 70,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Jasmine",
      "Saffron"
    ],
    "heart_notes": [
      "Amberwood",
      "Ambergris"
    ],
    "base_notes": [
      "Fir Resin",
      "Cedarwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 294
  },
  {
    "name": "Tom Ford Tobacco Vanille",
    "slug": "tom-ford-tobacco-vanille-unisex-perfumes",
    "brandSlug": "tom-ford",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Tobacco Leaf, Spicy Notes.",
    "description": "Tom Ford Tobacco Vanille by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Tobacco Leaf, Spicy Notes, moving into a seductive heart of Tonka Bean, Tobacco Blossom, Vanilla, Cacao, and resting upon a long-lasting base of Dried Fruits, Woody Notes.",
    "price": 18500,
    "discount_price": 15900,
    "stock": 44,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Tobacco Leaf",
      "Spicy Notes"
    ],
    "heart_notes": [
      "Tonka Bean",
      "Tobacco Blossom",
      "Vanilla",
      "Cacao"
    ],
    "base_notes": [
      "Dried Fruits",
      "Woody Notes"
    ],
    "image_url": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 83
  },
  {
    "name": "Tom Ford Lost Cherry",
    "slug": "tom-ford-lost-cherry-unisex-perfumes",
    "brandSlug": "tom-ford",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Sour Cherry, Bitter Almond, Liqueur.",
    "description": "Tom Ford Lost Cherry by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Sour Cherry, Bitter Almond, Liqueur, moving into a seductive heart of Sour Cherry, Plum, Turkish Rose, and resting upon a long-lasting base of Tonka Bean, Vanilla, Peru Balsam.",
    "price": 22000,
    "discount_price": 18500,
    "stock": 51,
    "volume_ml": 50,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Sour Cherry",
      "Bitter Almond",
      "Liqueur"
    ],
    "heart_notes": [
      "Sour Cherry",
      "Plum",
      "Turkish Rose"
    ],
    "base_notes": [
      "Tonka Bean",
      "Vanilla",
      "Peru Balsam"
    ],
    "image_url": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.9,
    "review_count": 112
  },
  {
    "name": "Creed Silver Mountain Water",
    "slug": "creed-silver-mountain-water-unisex-perfumes",
    "brandSlug": "creed",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Bergamot, Mandarin Orange.",
    "description": "Creed Silver Mountain Water by CREED is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Bergamot, Mandarin Orange, moving into a seductive heart of Green Tea, Blackcurrant, and resting upon a long-lasting base of Musk, Petitgrain, Sandalwood.",
    "price": 26500,
    "discount_price": 22800,
    "stock": 58,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Bergamot",
      "Mandarin Orange"
    ],
    "heart_notes": [
      "Green Tea",
      "Blackcurrant"
    ],
    "base_notes": [
      "Musk",
      "Petitgrain",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.6,
    "review_count": 141
  },
  {
    "name": "Maison Francis Kurkdjian Grand Soir",
    "slug": "maison-francis-kurkdjian-grand-soir-unisex-perfumes",
    "brandSlug": "mfk",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Spanish Labdanum.",
    "description": "Maison Francis Kurkdjian Grand Soir by MFK is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Spanish Labdanum, moving into a seductive heart of Benzoin of Siam, and resting upon a long-lasting base of Brazilian Tonka Bean, Vanilla, Amber.",
    "price": 19500,
    "discount_price": 16800,
    "stock": 65,
    "volume_ml": 70,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Spanish Labdanum"
    ],
    "heart_notes": [
      "Benzoin of Siam"
    ],
    "base_notes": [
      "Brazilian Tonka Bean",
      "Vanilla",
      "Amber"
    ],
    "image_url": "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 170
  },
  {
    "name": "Lattafa Khamrah Eau de Parfum",
    "slug": "lattafa-khamrah-eau-de-parfum-unisex-perfumes",
    "brandSlug": "lattafa",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Cinnamon, Nutmeg, Bergamot.",
    "description": "Lattafa Khamrah Eau de Parfum by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Cinnamon, Nutmeg, Bergamot, moving into a seductive heart of Dates, Praline, Tuberose, and resting upon a long-lasting base of Vanilla, Tonka Bean, Amberwood, Myrrh.",
    "price": 3499,
    "discount_price": 2399,
    "stock": 72,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Cinnamon",
      "Nutmeg",
      "Bergamot"
    ],
    "heart_notes": [
      "Dates",
      "Praline",
      "Tuberose"
    ],
    "base_notes": [
      "Vanilla",
      "Tonka Bean",
      "Amberwood",
      "Myrrh"
    ],
    "image_url": "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 199
  },
  {
    "name": "Dior Gris Dior Private Collection",
    "slug": "dior-gris-dior-private-collection-unisex-perfumes",
    "brandSlug": "dior",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Bergamot, Grapefruit.",
    "description": "Dior Gris Dior Private Collection by DIOR is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Bergamot, Grapefruit, moving into a seductive heart of Rose, Jasmine, Strawberry, and resting upon a long-lasting base of Patchouli, Oakmoss, Amber, Cedar.",
    "price": 21000,
    "discount_price": 17900,
    "stock": 79,
    "volume_ml": 125,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Bergamot",
      "Grapefruit"
    ],
    "heart_notes": [
      "Rose",
      "Jasmine",
      "Strawberry"
    ],
    "base_notes": [
      "Patchouli",
      "Oakmoss",
      "Amber",
      "Cedar"
    ],
    "image_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 228
  },
  {
    "name": "Chanel Les Exclusifs Sycomore",
    "slug": "chanel-les-exclusifs-sycomore-unisex-perfumes",
    "brandSlug": "chanel",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Pink Pepper, Aldehydes.",
    "description": "Chanel Les Exclusifs Sycomore by CHANEL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Pink Pepper, Aldehydes, moving into a seductive heart of Vetiver, Cypress, Juniper, and resting upon a long-lasting base of Sandalwood, Tobacco, Spices.",
    "price": 23000,
    "discount_price": 19800,
    "stock": 31,
    "volume_ml": 75,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Pink Pepper",
      "Aldehydes"
    ],
    "heart_notes": [
      "Vetiver",
      "Cypress",
      "Juniper"
    ],
    "base_notes": [
      "Sandalwood",
      "Tobacco",
      "Spices"
    ],
    "image_url": "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 257
  },
  {
    "name": "Giorgio Armani Prive Rouge Malachite",
    "slug": "giorgio-armani-prive-rouge-malachite-unisex-perfumes",
    "brandSlug": "armani",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Tuberose, Pink Pepper, Clary Sage.",
    "description": "Giorgio Armani Prive Rouge Malachite by ARMANI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Tuberose, Pink Pepper, Clary Sage, moving into a seductive heart of Tuberose, Orange Blossom, Ylang-Ylang, and resting upon a long-lasting base of Amber, Benzoin, Cashmeran.",
    "price": 22500,
    "discount_price": 18900,
    "stock": 38,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Tuberose",
      "Pink Pepper",
      "Clary Sage"
    ],
    "heart_notes": [
      "Tuberose",
      "Orange Blossom",
      "Ylang-Ylang"
    ],
    "base_notes": [
      "Amber",
      "Benzoin",
      "Cashmeran"
    ],
    "image_url": "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 286
  },
  {
    "name": "Gucci Memoire d'une Odeur",
    "slug": "gucci-memoire-d-une-odeur-unisex-perfumes",
    "brandSlug": "gucci",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Roman Chamomile, Bitter Almond.",
    "description": "Gucci Memoire d'une Odeur by GUCCI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Roman Chamomile, Bitter Almond, moving into a seductive heart of Indian Coral Jasmine, Petals, Musk, and resting upon a long-lasting base of Vanilla, Cedarwood, Sandalwood.",
    "price": 8200,
    "discount_price": 6700,
    "stock": 45,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Roman Chamomile",
      "Bitter Almond"
    ],
    "heart_notes": [
      "Indian Coral Jasmine",
      "Petals",
      "Musk"
    ],
    "base_notes": [
      "Vanilla",
      "Cedarwood",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 75
  },
  {
    "name": "Yves Saint Laurent Tuxedo Epices",
    "slug": "yves-saint-laurent-tuxedo-epices-unisex-perfumes",
    "brandSlug": "ysl",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Violet Leaf, Coriander, Bergamot.",
    "description": "Yves Saint Laurent Tuxedo Epices by YSL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Violet Leaf, Coriander, Bergamot, moving into a seductive heart of Rose, Black Pepper, Lily-of-the-Valley, and resting upon a long-lasting base of Patchouli, Ambergris, Bourbon Vanilla.",
    "price": 19800,
    "discount_price": 16900,
    "stock": 52,
    "volume_ml": 125,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Violet Leaf",
      "Coriander",
      "Bergamot"
    ],
    "heart_notes": [
      "Rose",
      "Black Pepper",
      "Lily-of-the-Valley"
    ],
    "base_notes": [
      "Patchouli",
      "Ambergris",
      "Bourbon Vanilla"
    ],
    "image_url": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 104
  },
  {
    "name": "Versace Atelier Cedrat de Cœur",
    "slug": "versace-atelier-cedrat-de-c-ur-unisex-perfumes",
    "brandSlug": "versace",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Italian Cedrat, Bergamot.",
    "description": "Versace Atelier Cedrat de Cœur by VERSACE is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Italian Cedrat, Bergamot, moving into a seductive heart of Grapefruit Flower, Neroli, and resting upon a long-lasting base of Precious Woods, Oakmoss.",
    "price": 18900,
    "discount_price": 15800,
    "stock": 59,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Italian Cedrat",
      "Bergamot"
    ],
    "heart_notes": [
      "Grapefruit Flower",
      "Neroli"
    ],
    "base_notes": [
      "Precious Woods",
      "Oakmoss"
    ],
    "image_url": "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 133
  },
  {
    "name": "Tom Ford Soleil Blanc",
    "slug": "tom-ford-soleil-blanc-unisex-perfumes",
    "brandSlug": "tom-ford",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Pistachio, Bergamot, Cardamom.",
    "description": "Tom Ford Soleil Blanc by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Pistachio, Bergamot, Cardamom, moving into a seductive heart of Tuberose, Ylang-Ylang, Jasmine, and resting upon a long-lasting base of Coconut, Amber, Tonka Bean.",
    "price": 17500,
    "discount_price": 14800,
    "stock": 66,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Pistachio",
      "Bergamot",
      "Cardamom"
    ],
    "heart_notes": [
      "Tuberose",
      "Ylang-Ylang",
      "Jasmine"
    ],
    "base_notes": [
      "Coconut",
      "Amber",
      "Tonka Bean"
    ],
    "image_url": "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 162
  },
  {
    "name": "Maison Francis Kurkdjian Aqua Universalis",
    "slug": "maison-francis-kurkdjian-aqua-universalis-unisex-perfumes",
    "brandSlug": "mfk",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Toilette featuring notes of Calabrian Bergamot, Sicilian Lemon.",
    "description": "Maison Francis Kurkdjian Aqua Universalis by MFK is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Calabrian Bergamot, Sicilian Lemon, moving into a seductive heart of White Flowers, Mock Orange, and resting upon a long-lasting base of Light Musks, Woody Notes.",
    "price": 17800,
    "discount_price": 15200,
    "stock": 73,
    "volume_ml": 70,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Calabrian Bergamot",
      "Sicilian Lemon"
    ],
    "heart_notes": [
      "White Flowers",
      "Mock Orange"
    ],
    "base_notes": [
      "Light Musks",
      "Woody Notes"
    ],
    "image_url": "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 191
  },
  {
    "name": "Creed Millesime Imperial",
    "slug": "creed-millesime-imperial-unisex-perfumes",
    "brandSlug": "creed",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Fruity Notes, Sea Salt.",
    "description": "Creed Millesime Imperial by CREED is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Fruity Notes, Sea Salt, moving into a seductive heart of Sicilian Lemon, Bergamot, Iris, and resting upon a long-lasting base of Musk, Woody Notes, Marine Accord.",
    "price": 25000,
    "discount_price": 21500,
    "stock": 25,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Fruity Notes",
      "Sea Salt"
    ],
    "heart_notes": [
      "Sicilian Lemon",
      "Bergamot",
      "Iris"
    ],
    "base_notes": [
      "Musk",
      "Woody Notes",
      "Marine Accord"
    ],
    "image_url": "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1691043809859-01b4f03c7a8e?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 220
  },
  {
    "name": "Dior Ambre Nuit",
    "slug": "dior-ambre-nuit-unisex-perfumes",
    "brandSlug": "dior",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Bergamot, Grapefruit.",
    "description": "Dior Ambre Nuit by DIOR is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Bergamot, Grapefruit, moving into a seductive heart of Damask Rose, Pink Pepper, and resting upon a long-lasting base of Ambergris, Cedar, Guaiac Wood.",
    "price": 21500,
    "discount_price": 18200,
    "stock": 32,
    "volume_ml": 125,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Bergamot",
      "Grapefruit"
    ],
    "heart_notes": [
      "Damask Rose",
      "Pink Pepper"
    ],
    "base_notes": [
      "Ambergris",
      "Cedar",
      "Guaiac Wood"
    ],
    "image_url": "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1691043809859-01b4f03c7a8e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 249
  },
  {
    "name": "Lattafa Bade'e Al Oud (Oud for Glory)",
    "slug": "lattafa-bade-e-al-oud-oud-for-glory-unisex-perfumes",
    "brandSlug": "lattafa",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Saffron, Nutmeg, Lavender.",
    "description": "Lattafa Bade'e Al Oud (Oud for Glory) by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Saffron, Nutmeg, Lavender, moving into a seductive heart of Agarwood (Oud), Patchouli, and resting upon a long-lasting base of Oud, Patchouli, Musk.",
    "price": 3200,
    "discount_price": 2199,
    "stock": 39,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Saffron",
      "Nutmeg",
      "Lavender"
    ],
    "heart_notes": [
      "Agarwood (Oud)",
      "Patchouli"
    ],
    "base_notes": [
      "Oud",
      "Patchouli",
      "Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1691043809859-01b4f03c7a8e?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1691043809859-01b4f03c7a8e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 278
  },
  {
    "name": "Chanel Les Exclusifs Coromandel",
    "slug": "chanel-les-exclusifs-coromandel-unisex-perfumes",
    "brandSlug": "chanel",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Bitter Orange, Neroli, Citrus.",
    "description": "Chanel Les Exclusifs Coromandel by CHANEL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Bitter Orange, Neroli, Citrus, moving into a seductive heart of Patchouli, Orris, Rose, Jasmine, and resting upon a long-lasting base of White Chocolate, Benzoin, Amber.",
    "price": 24000,
    "discount_price": 20500,
    "stock": 46,
    "volume_ml": 75,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Bitter Orange",
      "Neroli",
      "Citrus"
    ],
    "heart_notes": [
      "Patchouli",
      "Orris",
      "Rose",
      "Jasmine"
    ],
    "base_notes": [
      "White Chocolate",
      "Benzoin",
      "Amber"
    ],
    "image_url": "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 67
  },
  {
    "name": "Gucci The Alchemist's Garden The Voice of the Snake",
    "slug": "gucci-the-alchemist-s-garden-the-voice-of-the-snake-unisex-perfumes",
    "brandSlug": "gucci",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Oud.",
    "description": "Gucci The Alchemist's Garden The Voice of the Snake by GUCCI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Oud, moving into a seductive heart of Patchouli, and resting upon a long-lasting base of Saffron.",
    "price": 26000,
    "discount_price": 22000,
    "stock": 53,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Oud"
    ],
    "heart_notes": [
      "Patchouli"
    ],
    "base_notes": [
      "Saffron"
    ],
    "image_url": "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 96
  },
  {
    "name": "Tom Ford Bitter Peach",
    "slug": "tom-ford-bitter-peach-unisex-perfumes",
    "brandSlug": "tom-ford",
    "categorySlug": "unisex-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Peche de Vigne, Blood Orange, Cardamom.",
    "description": "Tom Ford Bitter Peach by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Peche de Vigne, Blood Orange, Cardamom, moving into a seductive heart of Rum, Cognac, Davana, Jasmine, and resting upon a long-lasting base of Indonesian Patchouli, Vanilla, Sandalwood.",
    "price": 23500,
    "discount_price": 19800,
    "stock": 60,
    "volume_ml": 50,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Peche de Vigne",
      "Blood Orange",
      "Cardamom"
    ],
    "heart_notes": [
      "Rum",
      "Cognac",
      "Davana",
      "Jasmine"
    ],
    "base_notes": [
      "Indonesian Patchouli",
      "Vanilla",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 125
  },
  {
    "name": "Clive Christian No. 1 Imperial",
    "slug": "clive-christian-no-1-imperial-luxury-perfumes",
    "brandSlug": "creed",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Cardamom, Nutmeg, Lime, Mandarin.",
    "description": "Clive Christian No. 1 Imperial by CREED is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Cardamom, Nutmeg, Lime, Mandarin, moving into a seductive heart of Ylang-Ylang, Heliotrope, Rose, Jasmine, and resting upon a long-lasting base of 50-Year Sandalwood, Vanilla, Cedarwood.",
    "price": 42000,
    "discount_price": 36500,
    "stock": 67,
    "volume_ml": 50,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Cardamom",
      "Nutmeg",
      "Lime",
      "Mandarin"
    ],
    "heart_notes": [
      "Ylang-Ylang",
      "Heliotrope",
      "Rose",
      "Jasmine"
    ],
    "base_notes": [
      "50-Year Sandalwood",
      "Vanilla",
      "Cedarwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 154
  },
  {
    "name": "Roja Parfums Elysium Pour Homme Parfum",
    "slug": "roja-parfums-elysium-pour-homme-parfum-luxury-perfumes",
    "brandSlug": "creed",
    "categorySlug": "luxury-perfumes",
    "gender": "Men",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Grapefruit, Lemon, Bergamot, Lime.",
    "description": "Roja Parfums Elysium Pour Homme Parfum by CREED is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Grapefruit, Lemon, Bergamot, Lime, moving into a seductive heart of Vetiver, Juniper Berries, Blackcurrant, and resting upon a long-lasting base of Ambergris, Benzoin, Vanilla, Leather.",
    "price": 32000,
    "discount_price": 27900,
    "stock": 74,
    "volume_ml": 100,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Grapefruit",
      "Lemon",
      "Bergamot",
      "Lime"
    ],
    "heart_notes": [
      "Vetiver",
      "Juniper Berries",
      "Blackcurrant"
    ],
    "base_notes": [
      "Ambergris",
      "Benzoin",
      "Vanilla",
      "Leather"
    ],
    "image_url": "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 183
  },
  {
    "name": "Tom Ford Oud Wood Private Blend",
    "slug": "tom-ford-oud-wood-private-blend-luxury-perfumes",
    "brandSlug": "tom-ford",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Rare Oud Wood, Rosewood.",
    "description": "Tom Ford Oud Wood Private Blend by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Rare Oud Wood, Rosewood, moving into a seductive heart of Cardamom, Sichuan Pepper, Sandalwood, and resting upon a long-lasting base of Tonka Bean, Vanilla, Amber.",
    "price": 21000,
    "discount_price": 17900,
    "stock": 26,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Rare Oud Wood",
      "Rosewood"
    ],
    "heart_notes": [
      "Cardamom",
      "Sichuan Pepper",
      "Sandalwood"
    ],
    "base_notes": [
      "Tonka Bean",
      "Vanilla",
      "Amber"
    ],
    "image_url": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.9,
    "review_count": 212
  },
  {
    "name": "Creed Royal Oud Millesime",
    "slug": "creed-royal-oud-millesime-luxury-perfumes",
    "brandSlug": "creed",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Pink Berry, Lemon, Sicilian Bergamot.",
    "description": "Creed Royal Oud Millesime by CREED is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Pink Berry, Lemon, Sicilian Bergamot, moving into a seductive heart of Cedar, Galbanum, Angelic Root, and resting upon a long-lasting base of Regal Indian Oud, Sandalwood, Tonkin Musk.",
    "price": 27500,
    "discount_price": 23500,
    "stock": 33,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Pink Berry",
      "Lemon",
      "Sicilian Bergamot"
    ],
    "heart_notes": [
      "Cedar",
      "Galbanum",
      "Angelic Root"
    ],
    "base_notes": [
      "Regal Indian Oud",
      "Sandalwood",
      "Tonkin Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.6,
    "review_count": 241
  },
  {
    "name": "Maison Francis Kurkdjian Baccarat Rouge 540 Extrait",
    "slug": "maison-francis-kurkdjian-baccarat-rouge-540-extrait-luxury-perfumes",
    "brandSlug": "mfk",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Bitter Almond, Saffron.",
    "description": "Maison Francis Kurkdjian Baccarat Rouge 540 Extrait by MFK is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Bitter Almond, Saffron, moving into a seductive heart of Egyptian Jasmine Grandiflorum, Cedarwood, and resting upon a long-lasting base of Ambergris, Woody Musk.",
    "price": 31000,
    "discount_price": 26900,
    "stock": 40,
    "volume_ml": 70,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Bitter Almond",
      "Saffron"
    ],
    "heart_notes": [
      "Egyptian Jasmine Grandiflorum",
      "Cedarwood"
    ],
    "base_notes": [
      "Ambergris",
      "Woody Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 270
  },
  {
    "name": "Dior Tobacolor Private Blend",
    "slug": "dior-tobacolor-private-blend-luxury-perfumes",
    "brandSlug": "dior",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Tobacco Leaf, Citrus Notes.",
    "description": "Dior Tobacolor Private Blend by DIOR is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Tobacco Leaf, Citrus Notes, moving into a seductive heart of Honey, Plum, Peach, and resting upon a long-lasting base of White Tobacco, Smoke, Amber.",
    "price": 22000,
    "discount_price": 18900,
    "stock": 47,
    "volume_ml": 125,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Tobacco Leaf",
      "Citrus Notes"
    ],
    "heart_notes": [
      "Honey",
      "Plum",
      "Peach"
    ],
    "base_notes": [
      "White Tobacco",
      "Smoke",
      "Amber"
    ],
    "image_url": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 299
  },
  {
    "name": "Chanel Les Exclusifs Le Lion",
    "slug": "chanel-les-exclusifs-le-lion-luxury-perfumes",
    "brandSlug": "chanel",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Lemon, Bergamot.",
    "description": "Chanel Les Exclusifs Le Lion by CHANEL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Lemon, Bergamot, moving into a seductive heart of Amber, Labdanum, and resting upon a long-lasting base of Madagascar Vanilla, Patchouli, Sandalwood.",
    "price": 24500,
    "discount_price": 21000,
    "stock": 54,
    "volume_ml": 75,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Lemon",
      "Bergamot"
    ],
    "heart_notes": [
      "Amber",
      "Labdanum"
    ],
    "base_notes": [
      "Madagascar Vanilla",
      "Patchouli",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 88
  },
  {
    "name": "Armani Prive Oud Royal",
    "slug": "armani-prive-oud-royal-luxury-perfumes",
    "brandSlug": "armani",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Saffron, Incense.",
    "description": "Armani Prive Oud Royal by ARMANI is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Saffron, Incense, moving into a seductive heart of Agarwood (Oud), Rose, and resting upon a long-lasting base of Amber, Sandalwood, Myrrh.",
    "price": 23500,
    "discount_price": 19900,
    "stock": 61,
    "volume_ml": 100,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Saffron",
      "Incense"
    ],
    "heart_notes": [
      "Agarwood (Oud)",
      "Rose"
    ],
    "base_notes": [
      "Amber",
      "Sandalwood",
      "Myrrh"
    ],
    "image_url": "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 117
  },
  {
    "name": "Yves Saint Laurent Magnificent Gold",
    "slug": "yves-saint-laurent-magnificent-gold-luxury-perfumes",
    "brandSlug": "ysl",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Saffron, Pink Pepper.",
    "description": "Yves Saint Laurent Magnificent Gold by YSL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Saffron, Pink Pepper, moving into a seductive heart of White Oud, Sandalwood, and resting upon a long-lasting base of Vanilla, Musk.",
    "price": 21500,
    "discount_price": 18200,
    "stock": 68,
    "volume_ml": 125,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Saffron",
      "Pink Pepper"
    ],
    "heart_notes": [
      "White Oud",
      "Sandalwood"
    ],
    "base_notes": [
      "Vanilla",
      "Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 146
  },
  {
    "name": "Gucci The Alchemist's Garden A Midnight Stroll",
    "slug": "gucci-the-alchemist-s-garden-a-midnight-stroll-luxury-perfumes",
    "brandSlug": "gucci",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Incense.",
    "description": "Gucci The Alchemist's Garden A Midnight Stroll by GUCCI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Incense, moving into a seductive heart of Cade Wood, and resting upon a long-lasting base of Cypress.",
    "price": 26500,
    "discount_price": 22500,
    "stock": 75,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Incense"
    ],
    "heart_notes": [
      "Cade Wood"
    ],
    "base_notes": [
      "Cypress"
    ],
    "image_url": "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 175
  },
  {
    "name": "Tom Ford Tuscan Leather Intense",
    "slug": "tom-ford-tuscan-leather-intense-luxury-perfumes",
    "brandSlug": "tom-ford",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Davana, Raspberry, Saffron, Thyme.",
    "description": "Tom Ford Tuscan Leather Intense by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Davana, Raspberry, Saffron, Thyme, moving into a seductive heart of Olibanum, Night Blooming Jasmine, and resting upon a long-lasting base of Leather, Black Suede, Amberwood.",
    "price": 24000,
    "discount_price": 20200,
    "stock": 27,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Davana",
      "Raspberry",
      "Saffron",
      "Thyme"
    ],
    "heart_notes": [
      "Olibanum",
      "Night Blooming Jasmine"
    ],
    "base_notes": [
      "Leather",
      "Black Suede",
      "Amberwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 204
  },
  {
    "name": "Creed Viking Cologne",
    "slug": "creed-viking-cologne-luxury-perfumes",
    "brandSlug": "creed",
    "categorySlug": "luxury-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Mandarin Orange, Lemon, Pink Pepper.",
    "description": "Creed Viking Cologne by CREED is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Mandarin Orange, Lemon, Pink Pepper, moving into a seductive heart of Lavender, Geranium, Nutmeg, Sage, and resting upon a long-lasting base of Sandalwood, Frankincense, Patchouli, Vetiver.",
    "price": 25500,
    "discount_price": 21800,
    "stock": 34,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Mandarin Orange",
      "Lemon",
      "Pink Pepper"
    ],
    "heart_notes": [
      "Lavender",
      "Geranium",
      "Nutmeg",
      "Sage"
    ],
    "base_notes": [
      "Sandalwood",
      "Frankincense",
      "Patchouli",
      "Vetiver"
    ],
    "image_url": "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 233
  },
  {
    "name": "Maison Francis Kurkdjian Oud Silk Mood Extrait",
    "slug": "maison-francis-kurkdjian-oud-silk-mood-extrait-luxury-perfumes",
    "brandSlug": "mfk",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Italian Bergamot, Blue Chamomile.",
    "description": "Maison Francis Kurkdjian Oud Silk Mood Extrait by MFK is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Italian Bergamot, Blue Chamomile, moving into a seductive heart of Bulgarian Rose, Hedione, and resting upon a long-lasting base of Laotian Oud, Papyrus.",
    "price": 29500,
    "discount_price": 25000,
    "stock": 41,
    "volume_ml": 70,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Italian Bergamot",
      "Blue Chamomile"
    ],
    "heart_notes": [
      "Bulgarian Rose",
      "Hedione"
    ],
    "base_notes": [
      "Laotian Oud",
      "Papyrus"
    ],
    "image_url": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 262
  },
  {
    "name": "Dior Feve Delicieuse",
    "slug": "dior-feve-delicieuse-luxury-perfumes",
    "brandSlug": "dior",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Lavender, Mint, Calabrian Bergamot.",
    "description": "Dior Feve Delicieuse by DIOR is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Lavender, Mint, Calabrian Bergamot, moving into a seductive heart of Sour Cherry, Freesia, Jasmine, and resting upon a long-lasting base of Tonka Bean, Madagascar Vanilla, Caramel, Cocoa.",
    "price": 21000,
    "discount_price": 17800,
    "stock": 48,
    "volume_ml": 125,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Lavender",
      "Mint",
      "Calabrian Bergamot"
    ],
    "heart_notes": [
      "Sour Cherry",
      "Freesia",
      "Jasmine"
    ],
    "base_notes": [
      "Tonka Bean",
      "Madagascar Vanilla",
      "Caramel",
      "Cocoa"
    ],
    "image_url": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 291
  },
  {
    "name": "Chanel Les Exclusifs Beige",
    "slug": "chanel-les-exclusifs-beige-luxury-perfumes",
    "brandSlug": "chanel",
    "categorySlug": "luxury-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Hawthorn, Freesia.",
    "description": "Chanel Les Exclusifs Beige by CHANEL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Hawthorn, Freesia, moving into a seductive heart of Frangipani, Honey, and resting upon a long-lasting base of White Musks.",
    "price": 23500,
    "discount_price": 19900,
    "stock": 55,
    "volume_ml": 75,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Hawthorn",
      "Freesia"
    ],
    "heart_notes": [
      "Frangipani",
      "Honey"
    ],
    "base_notes": [
      "White Musks"
    ],
    "image_url": "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 80
  },
  {
    "name": "Versace Atelier Santal Boise",
    "slug": "versace-atelier-santal-boise-luxury-perfumes",
    "brandSlug": "versace",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Saffron.",
    "description": "Versace Atelier Santal Boise by VERSACE is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Saffron, moving into a seductive heart of Cypriol Oil, and resting upon a long-lasting base of Sri Lankan Sandalwood, Gurjun Balsam.",
    "price": 19500,
    "discount_price": 16500,
    "stock": 62,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Saffron"
    ],
    "heart_notes": [
      "Cypriol Oil"
    ],
    "base_notes": [
      "Sri Lankan Sandalwood",
      "Gurjun Balsam"
    ],
    "image_url": "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 109
  },
  {
    "name": "Armani Prive Rose d'Arabie",
    "slug": "armani-prive-rose-d-arabie-luxury-perfumes",
    "brandSlug": "armani",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Damascus Rose.",
    "description": "Armani Prive Rose d'Arabie by ARMANI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Damascus Rose, moving into a seductive heart of Saffron, Patchouli, and resting upon a long-lasting base of Golden Amber, Dark Woods.",
    "price": 23000,
    "discount_price": 19500,
    "stock": 69,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Damascus Rose"
    ],
    "heart_notes": [
      "Saffron",
      "Patchouli"
    ],
    "base_notes": [
      "Golden Amber",
      "Dark Woods"
    ],
    "image_url": "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 138
  },
  {
    "name": "Tom Ford Fabulous",
    "slug": "tom-ford-fabulous-luxury-perfumes",
    "brandSlug": "tom-ford",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Clary Sage, Lavender.",
    "description": "Tom Ford Fabulous by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Clary Sage, Lavender, moving into a seductive heart of Bitter Almond, Leather, Vanilla, Orris, and resting upon a long-lasting base of Leather, Tonka Bean, Cashmeran, White Woods.",
    "price": 25000,
    "discount_price": 21500,
    "stock": 76,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Clary Sage",
      "Lavender"
    ],
    "heart_notes": [
      "Bitter Almond",
      "Leather",
      "Vanilla",
      "Orris"
    ],
    "base_notes": [
      "Leather",
      "Tonka Bean",
      "Cashmeran",
      "White Woods"
    ],
    "image_url": "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 167
  },
  {
    "name": "Creed Sublime Vanille",
    "slug": "creed-sublime-vanille-luxury-perfumes",
    "brandSlug": "creed",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Bourbon Vanilla, Vanilla Orchid.",
    "description": "Creed Sublime Vanille by CREED is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Bourbon Vanilla, Vanilla Orchid, moving into a seductive heart of Tonka Bean, and resting upon a long-lasting base of Calabrian Bergamot, Musk.",
    "price": 34000,
    "discount_price": 29500,
    "stock": 28,
    "volume_ml": 75,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Bourbon Vanilla",
      "Vanilla Orchid"
    ],
    "heart_notes": [
      "Tonka Bean"
    ],
    "base_notes": [
      "Calabrian Bergamot",
      "Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 196
  },
  {
    "name": "Maison Francis Kurkdjian 724",
    "slug": "maison-francis-kurkdjian-724-luxury-perfumes",
    "brandSlug": "mfk",
    "categorySlug": "luxury-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Aldehydes, Calabrian Bergamot.",
    "description": "Maison Francis Kurkdjian 724 by MFK is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Aldehydes, Calabrian Bergamot, moving into a seductive heart of Egyptian Jasmine, Sweet Pea, Mock Orange, and resting upon a long-lasting base of White Musk, Sandalwood.",
    "price": 18500,
    "discount_price": 15900,
    "stock": 35,
    "volume_ml": 70,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Aldehydes",
      "Calabrian Bergamot"
    ],
    "heart_notes": [
      "Egyptian Jasmine",
      "Sweet Pea",
      "Mock Orange"
    ],
    "base_notes": [
      "White Musk",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 225
  },
  {
    "name": "Lattafa Khamrah Qahwa (Coffee Edition)",
    "slug": "lattafa-khamrah-qahwa-coffee-edition-arabic-perfumes",
    "brandSlug": "lattafa",
    "categorySlug": "arabic-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Ginger, Cinnamon, Cardamom.",
    "description": "Lattafa Khamrah Qahwa (Coffee Edition) by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Ginger, Cinnamon, Cardamom, moving into a seductive heart of Praline, Candied Fruits, White Flowers, and resting upon a long-lasting base of Coffee, Tonka Bean, Benzoin, Vanilla.",
    "price": 3600,
    "discount_price": 2499,
    "stock": 42,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Ginger",
      "Cinnamon",
      "Cardamom"
    ],
    "heart_notes": [
      "Praline",
      "Candied Fruits",
      "White Flowers"
    ],
    "base_notes": [
      "Coffee",
      "Tonka Bean",
      "Benzoin",
      "Vanilla"
    ],
    "image_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 254
  },
  {
    "name": "Lattafa Asad Zanzibar",
    "slug": "lattafa-asad-zanzibar-arabic-perfumes",
    "brandSlug": "lattafa",
    "categorySlug": "arabic-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Black Pepper, Sea Lavender.",
    "description": "Lattafa Asad Zanzibar by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Black Pepper, Sea Lavender, moving into a seductive heart of Salted Coconut Water, Iris, and resting upon a long-lasting base of Vanilla, Incense.",
    "price": 2999,
    "discount_price": 1999,
    "stock": 49,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Black Pepper",
      "Sea Lavender"
    ],
    "heart_notes": [
      "Salted Coconut Water",
      "Iris"
    ],
    "base_notes": [
      "Vanilla",
      "Incense"
    ],
    "image_url": "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 283
  },
  {
    "name": "Lattafa Eternal Oud Pride",
    "slug": "lattafa-eternal-oud-pride-arabic-perfumes",
    "brandSlug": "lattafa",
    "categorySlug": "arabic-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Grapefruit, Plum.",
    "description": "Lattafa Eternal Oud Pride by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Grapefruit, Plum, moving into a seductive heart of Orchid, Heliotrope, and resting upon a long-lasting base of Vanilla, Amber, Oud, Benzoin, Tonka.",
    "price": 3800,
    "discount_price": 2690,
    "stock": 56,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Grapefruit",
      "Plum"
    ],
    "heart_notes": [
      "Orchid",
      "Heliotrope"
    ],
    "base_notes": [
      "Vanilla",
      "Amber",
      "Oud",
      "Benzoin",
      "Tonka"
    ],
    "image_url": "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.9,
    "review_count": 72
  },
  {
    "name": "Armani Prive Musc Shamal",
    "slug": "armani-prive-musc-shamal-arabic-perfumes",
    "brandSlug": "armani",
    "categorySlug": "arabic-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Aldehydes, Citrus.",
    "description": "Armani Prive Musc Shamal by ARMANI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Aldehydes, Citrus, moving into a seductive heart of Musk, Rose, Jasmine, and resting upon a long-lasting base of Amber, Cedarwood, Vanilla.",
    "price": 22000,
    "discount_price": 18500,
    "stock": 63,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Aldehydes",
      "Citrus"
    ],
    "heart_notes": [
      "Musk",
      "Rose",
      "Jasmine"
    ],
    "base_notes": [
      "Amber",
      "Cedarwood",
      "Vanilla"
    ],
    "image_url": "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.6,
    "review_count": 101
  },
  {
    "name": "Dior Oud Ispahan",
    "slug": "dior-oud-ispahan-arabic-perfumes",
    "brandSlug": "dior",
    "categorySlug": "arabic-perfumes",
    "gender": "Unisex",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Labdanum.",
    "description": "Dior Oud Ispahan by DIOR is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Labdanum, moving into a seductive heart of Patchouli, Damask Rose, and resting upon a long-lasting base of Oud, Sandalwood, Cedarwood.",
    "price": 21500,
    "discount_price": 18200,
    "stock": 70,
    "volume_ml": 125,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Labdanum"
    ],
    "heart_notes": [
      "Patchouli",
      "Damask Rose"
    ],
    "base_notes": [
      "Oud",
      "Sandalwood",
      "Cedarwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 130
  },
  {
    "name": "Gucci Intense Oud",
    "slug": "gucci-intense-oud-arabic-perfumes",
    "brandSlug": "gucci",
    "categorySlug": "arabic-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Pear, Raspberry, Saffron.",
    "description": "Gucci Intense Oud by GUCCI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Pear, Raspberry, Saffron, moving into a seductive heart of Bulgarian Rose, Orange Flower, and resting upon a long-lasting base of Natural Oud Oil, Patchouli, Amber.",
    "price": 14500,
    "discount_price": 11900,
    "stock": 77,
    "volume_ml": 90,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Pear",
      "Raspberry",
      "Saffron"
    ],
    "heart_notes": [
      "Bulgarian Rose",
      "Orange Flower"
    ],
    "base_notes": [
      "Natural Oud Oil",
      "Patchouli",
      "Amber"
    ],
    "image_url": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 159
  },
  {
    "name": "Versace Pour Homme Oud Noir",
    "slug": "versace-pour-homme-oud-noir-arabic-perfumes",
    "brandSlug": "versace",
    "categorySlug": "arabic-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Bitter Orange, Neroli, Black Pepper.",
    "description": "Versace Pour Homme Oud Noir by VERSACE is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Bitter Orange, Neroli, Black Pepper, moving into a seductive heart of Cardamom, Saffron, Olibanum, and resting upon a long-lasting base of Agarwood (Oud), Patchouli, Leatherwood.",
    "price": 8200,
    "discount_price": 6690,
    "stock": 29,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Bitter Orange",
      "Neroli",
      "Black Pepper"
    ],
    "heart_notes": [
      "Cardamom",
      "Saffron",
      "Olibanum"
    ],
    "base_notes": [
      "Agarwood (Oud)",
      "Patchouli",
      "Leatherwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 188
  },
  {
    "name": "Yves Saint Laurent Splendid Wood",
    "slug": "yves-saint-laurent-splendid-wood-arabic-perfumes",
    "brandSlug": "ysl",
    "categorySlug": "arabic-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Incense, Cardamom.",
    "description": "Yves Saint Laurent Splendid Wood by YSL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Incense, Cardamom, moving into a seductive heart of Sambac Jasmine, Rosewood, and resting upon a long-lasting base of Cedarwood, Cypriol, Oud.",
    "price": 20500,
    "discount_price": 17200,
    "stock": 36,
    "volume_ml": 125,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Incense",
      "Cardamom"
    ],
    "heart_notes": [
      "Sambac Jasmine",
      "Rosewood"
    ],
    "base_notes": [
      "Cedarwood",
      "Cypriol",
      "Oud"
    ],
    "image_url": "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 217
  },
  {
    "name": "Tom Ford Amber Absolute",
    "slug": "tom-ford-amber-absolute-arabic-perfumes",
    "brandSlug": "tom-ford",
    "categorySlug": "arabic-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of African Incense, Bay Leaf.",
    "description": "Tom Ford Amber Absolute by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous African Incense, Bay Leaf, moving into a seductive heart of Rich Amber Accord, Sandalwood, and resting upon a long-lasting base of Madagascar Vanilla, Labdanum.",
    "price": 22500,
    "discount_price": 18900,
    "stock": 43,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "African Incense",
      "Bay Leaf"
    ],
    "heart_notes": [
      "Rich Amber Accord",
      "Sandalwood"
    ],
    "base_notes": [
      "Madagascar Vanilla",
      "Labdanum"
    ],
    "image_url": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 246
  },
  {
    "name": "Creed Royal Princess Oud",
    "slug": "creed-royal-princess-oud-arabic-perfumes",
    "brandSlug": "creed",
    "categorySlug": "arabic-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Sicilian Bergamot, Rose, Sweet Violet.",
    "description": "Creed Royal Princess Oud by CREED is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Sicilian Bergamot, Rose, Sweet Violet, moving into a seductive heart of Jasmin, Vanilla, Patchouli, Iris, and resting upon a long-lasting base of Benzoin of Siam, Sandalwood, Styrax, Oud.",
    "price": 26000,
    "discount_price": 22000,
    "stock": 50,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Sicilian Bergamot",
      "Rose",
      "Sweet Violet"
    ],
    "heart_notes": [
      "Jasmin",
      "Vanilla",
      "Patchouli",
      "Iris"
    ],
    "base_notes": [
      "Benzoin of Siam",
      "Sandalwood",
      "Styrax",
      "Oud"
    ],
    "image_url": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 275
  },
  {
    "name": "Lattafa Ejaazi Intensive Silver",
    "slug": "lattafa-ejaazi-intensive-silver-arabic-perfumes",
    "brandSlug": "lattafa",
    "categorySlug": "arabic-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Mandarin Orange, Grapefruit.",
    "description": "Lattafa Ejaazi Intensive Silver by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Mandarin Orange, Grapefruit, moving into a seductive heart of Cedarwood, Sea Notes, and resting upon a long-lasting base of Amber, Moss.",
    "price": 2500,
    "discount_price": 1699,
    "stock": 57,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Mandarin Orange",
      "Grapefruit"
    ],
    "heart_notes": [
      "Cedarwood",
      "Sea Notes"
    ],
    "base_notes": [
      "Amber",
      "Moss"
    ],
    "image_url": "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 304
  },
  {
    "name": "Lattafa Velvet Rose",
    "slug": "lattafa-velvet-rose-arabic-perfumes",
    "brandSlug": "lattafa",
    "categorySlug": "arabic-perfumes",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Sweet Rose, Patchouli.",
    "description": "Lattafa Velvet Rose by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Sweet Rose, Patchouli, moving into a seductive heart of Labdanum, Musk, and resting upon a long-lasting base of Amber, Oud.",
    "price": 2700,
    "discount_price": 1799,
    "stock": 64,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Sweet Rose",
      "Patchouli"
    ],
    "heart_notes": [
      "Labdanum",
      "Musk"
    ],
    "base_notes": [
      "Amber",
      "Oud"
    ],
    "image_url": "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1747916147834-afe35b0d95ac?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 93
  },
  {
    "name": "Maison Francis Kurkdjian Oud Satin Mood",
    "slug": "maison-francis-kurkdjian-oud-satin-mood-arabic-perfumes",
    "brandSlug": "mfk",
    "categorySlug": "arabic-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Violet Accord.",
    "description": "Maison Francis Kurkdjian Oud Satin Mood by MFK is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Violet Accord, moving into a seductive heart of Bulgarian Damascena Rose, Turkish Rose, and resting upon a long-lasting base of Laotian Oud, Vanilla Amber Accord.",
    "price": 23500,
    "discount_price": 19800,
    "stock": 71,
    "volume_ml": 70,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Violet Accord"
    ],
    "heart_notes": [
      "Bulgarian Damascena Rose",
      "Turkish Rose"
    ],
    "base_notes": [
      "Laotian Oud",
      "Vanilla Amber Accord"
    ],
    "image_url": "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1747916147834-afe35b0d95ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 122
  },
  {
    "name": "Chanel Les Exclusifs Cuir de Russie",
    "slug": "chanel-les-exclusifs-cuir-de-russie-arabic-perfumes",
    "brandSlug": "chanel",
    "categorySlug": "arabic-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Aldehydes, Orange Blossom, Bergamot.",
    "description": "Chanel Les Exclusifs Cuir de Russie by CHANEL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Aldehydes, Orange Blossom, Bergamot, moving into a seductive heart of Ylang-Ylang, Jasmine, Rose, and resting upon a long-lasting base of Birch Tar, Leather, Tobacco, Amber.",
    "price": 24500,
    "discount_price": 20900,
    "stock": 78,
    "volume_ml": 75,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Aldehydes",
      "Orange Blossom",
      "Bergamot"
    ],
    "heart_notes": [
      "Ylang-Ylang",
      "Jasmine",
      "Rose"
    ],
    "base_notes": [
      "Birch Tar",
      "Leather",
      "Tobacco",
      "Amber"
    ],
    "image_url": "https://images.unsplash.com/photo-1747916147834-afe35b0d95ac?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1747916147834-afe35b0d95ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 151
  },
  {
    "name": "Lattafa Bade'e Al Oud Sublime",
    "slug": "lattafa-bade-e-al-oud-sublime-arabic-perfumes",
    "brandSlug": "lattafa",
    "categorySlug": "arabic-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Apple, Litchi, Rose.",
    "description": "Lattafa Bade'e Al Oud Sublime by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Apple, Litchi, Rose, moving into a seductive heart of Plum, Jasmine, and resting upon a long-lasting base of Vanilla, Moss, Patchouli.",
    "price": 3200,
    "discount_price": 2199,
    "stock": 30,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Apple",
      "Litchi",
      "Rose"
    ],
    "heart_notes": [
      "Plum",
      "Jasmine"
    ],
    "base_notes": [
      "Vanilla",
      "Moss",
      "Patchouli"
    ],
    "image_url": "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 180
  },
  {
    "name": "Dior Purple Oud",
    "slug": "dior-purple-oud-arabic-perfumes",
    "brandSlug": "dior",
    "categorySlug": "arabic-perfumes",
    "gender": "Unisex",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Orange, Pink Pepper.",
    "description": "Dior Purple Oud by DIOR is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Orange, Pink Pepper, moving into a seductive heart of Saffron, and resting upon a long-lasting base of Oud, Precious Woods.",
    "price": 21000,
    "discount_price": 17800,
    "stock": 37,
    "volume_ml": 125,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Orange",
      "Pink Pepper"
    ],
    "heart_notes": [
      "Saffron"
    ],
    "base_notes": [
      "Oud",
      "Precious Woods"
    ],
    "image_url": "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 209
  },
  {
    "name": "Armani Prive Cuir Zerzura",
    "slug": "armani-prive-cuir-zerzura-arabic-perfumes",
    "brandSlug": "armani",
    "categorySlug": "arabic-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Mandarin Oil, Violet Leaf.",
    "description": "Armani Prive Cuir Zerzura by ARMANI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Mandarin Oil, Violet Leaf, moving into a seductive heart of Iris Accord, Rose, and resting upon a long-lasting base of Leather Accord, Bourbon Vanilla, Cedarwood.",
    "price": 22500,
    "discount_price": 18900,
    "stock": 44,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Mandarin Oil",
      "Violet Leaf"
    ],
    "heart_notes": [
      "Iris Accord",
      "Rose"
    ],
    "base_notes": [
      "Leather Accord",
      "Bourbon Vanilla",
      "Cedarwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 238
  },
  {
    "name": "Gucci The Voice of the Snake",
    "slug": "gucci-the-voice-of-the-snake-arabic-perfumes",
    "brandSlug": "gucci",
    "categorySlug": "arabic-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Oud Wood.",
    "description": "Gucci The Voice of the Snake by GUCCI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Oud Wood, moving into a seductive heart of Dried Patchouli, and resting upon a long-lasting base of Saffron Leaves.",
    "price": 26000,
    "discount_price": 22000,
    "stock": 51,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Oud Wood"
    ],
    "heart_notes": [
      "Dried Patchouli"
    ],
    "base_notes": [
      "Saffron Leaves"
    ],
    "image_url": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 267
  },
  {
    "name": "Lattafa Fakhar Lattafa Men",
    "slug": "lattafa-fakhar-lattafa-men-arabic-perfumes",
    "brandSlug": "lattafa",
    "categorySlug": "arabic-perfumes",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Apple, Ginger, Bergamot.",
    "description": "Lattafa Fakhar Lattafa Men by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Apple, Ginger, Bergamot, moving into a seductive heart of Sage, Juniper Berries, Geranium, and resting upon a long-lasting base of Amberwood, Tonka Bean, Cedar.",
    "price": 2600,
    "discount_price": 1799,
    "stock": 58,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Apple",
      "Ginger",
      "Bergamot"
    ],
    "heart_notes": [
      "Sage",
      "Juniper Berries",
      "Geranium"
    ],
    "base_notes": [
      "Amberwood",
      "Tonka Bean",
      "Cedar"
    ],
    "image_url": "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 296
  },
  {
    "name": "Yves Saint Laurent Wild Leather",
    "slug": "yves-saint-laurent-wild-leather-arabic-perfumes",
    "brandSlug": "ysl",
    "categorySlug": "arabic-perfumes",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Bergamot, Black Pepper.",
    "description": "Yves Saint Laurent Wild Leather by YSL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Bergamot, Black Pepper, moving into a seductive heart of Saffron, Thyme, Lavender, and resting upon a long-lasting base of Leather, Guaiac Wood, Vanilla.",
    "price": 19800,
    "discount_price": 16800,
    "stock": 65,
    "volume_ml": 125,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Bergamot",
      "Black Pepper"
    ],
    "heart_notes": [
      "Saffron",
      "Thyme",
      "Lavender"
    ],
    "base_notes": [
      "Leather",
      "Guaiac Wood",
      "Vanilla"
    ],
    "image_url": "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 85
  },
  {
    "name": "Dior Miss Dior Rose N'Roses",
    "slug": "dior-miss-dior-rose-n-roses-floral-fragrances",
    "brandSlug": "dior",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Toilette featuring notes of Italian Mandarin, Bergamot, Geranium.",
    "description": "Dior Miss Dior Rose N'Roses by DIOR is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Italian Mandarin, Bergamot, Geranium, moving into a seductive heart of Grasse Rose, Damask Rose, and resting upon a long-lasting base of White Musk.",
    "price": 9200,
    "discount_price": 7600,
    "stock": 72,
    "volume_ml": 100,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Italian Mandarin",
      "Bergamot",
      "Geranium"
    ],
    "heart_notes": [
      "Grasse Rose",
      "Damask Rose"
    ],
    "base_notes": [
      "White Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 114
  },
  {
    "name": "Gucci Bloom Ambrosia di Fiori",
    "slug": "gucci-bloom-ambrosia-di-fiori-floral-fragrances",
    "brandSlug": "gucci",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Jasmine Bud, Rangoon Creeper.",
    "description": "Gucci Bloom Ambrosia di Fiori by GUCCI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Jasmine Bud, Rangoon Creeper, moving into a seductive heart of Indian Tuberose, Damascena Rose, and resting upon a long-lasting base of Tuscan Orris.",
    "price": 9800,
    "discount_price": 8100,
    "stock": 79,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Jasmine Bud",
      "Rangoon Creeper"
    ],
    "heart_notes": [
      "Indian Tuberose",
      "Damascena Rose"
    ],
    "base_notes": [
      "Tuscan Orris"
    ],
    "image_url": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 143
  },
  {
    "name": "Chanel No. 5 Eau de Parfum",
    "slug": "chanel-no-5-eau-de-parfum-floral-fragrances",
    "brandSlug": "chanel",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Aldehydes, Ylang-Ylang, Neroli, Bergamot.",
    "description": "Chanel No. 5 Eau de Parfum by CHANEL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Aldehydes, Ylang-Ylang, Neroli, Bergamot, moving into a seductive heart of May Rose, Jasmine, Lily-of-the-Valley, Iris, and resting upon a long-lasting base of Bourbon Vanilla, Sandalwood, Vetiver, Amber.",
    "price": 13500,
    "discount_price": 11500,
    "stock": 31,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Aldehydes",
      "Ylang-Ylang",
      "Neroli",
      "Bergamot"
    ],
    "heart_notes": [
      "May Rose",
      "Jasmine",
      "Lily-of-the-Valley",
      "Iris"
    ],
    "base_notes": [
      "Bourbon Vanilla",
      "Sandalwood",
      "Vetiver",
      "Amber"
    ],
    "image_url": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.9,
    "review_count": 172
  },
  {
    "name": "Yves Saint Laurent Mon Paris Floral",
    "slug": "yves-saint-laurent-mon-paris-floral-floral-fragrances",
    "brandSlug": "ysl",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Peach, Pear, Raspberry.",
    "description": "Yves Saint Laurent Mon Paris Floral by YSL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Peach, Pear, Raspberry, moving into a seductive heart of Datura Flower, White Rose, Peony, Magnolia, and resting upon a long-lasting base of Patchouli, Cashmeran, White Musk.",
    "price": 9100,
    "discount_price": 7500,
    "stock": 38,
    "volume_ml": 90,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Peach",
      "Pear",
      "Raspberry"
    ],
    "heart_notes": [
      "Datura Flower",
      "White Rose",
      "Peony",
      "Magnolia"
    ],
    "base_notes": [
      "Patchouli",
      "Cashmeran",
      "White Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.6,
    "review_count": 201
  },
  {
    "name": "Giorgio Armani Si Fiori",
    "slug": "giorgio-armani-si-fiori-floral-fragrances",
    "brandSlug": "armani",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Blackcurrant, Green Mandarin.",
    "description": "Giorgio Armani Si Fiori by ARMANI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Blackcurrant, Green Mandarin, moving into a seductive heart of Neroli, Rose, Patchouli, Oakmoss, and resting upon a long-lasting base of Vanilla, White Musk.",
    "price": 8800,
    "discount_price": 7200,
    "stock": 45,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Blackcurrant",
      "Green Mandarin"
    ],
    "heart_notes": [
      "Neroli",
      "Rose",
      "Patchouli",
      "Oakmoss"
    ],
    "base_notes": [
      "Vanilla",
      "White Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533017568856-f6085fef5f1f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 230
  },
  {
    "name": "Versace Pour Femme Dylan Blue",
    "slug": "versace-pour-femme-dylan-blue-floral-fragrances",
    "brandSlug": "versace",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Blackcurrant Sorbet, Granny Smith Apple.",
    "description": "Versace Pour Femme Dylan Blue by VERSACE is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Blackcurrant Sorbet, Granny Smith Apple, moving into a seductive heart of Rose, Petalia, Jasmine, Peach, and resting upon a long-lasting base of Styrax, White Smooth Woods, Musk, Patchouli.",
    "price": 7200,
    "discount_price": 5800,
    "stock": 52,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Blackcurrant Sorbet",
      "Granny Smith Apple"
    ],
    "heart_notes": [
      "Rose",
      "Petalia",
      "Jasmine",
      "Peach"
    ],
    "base_notes": [
      "Styrax",
      "White Smooth Woods",
      "Musk",
      "Patchouli"
    ],
    "image_url": "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533017568856-f6085fef5f1f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1708733145706-82da0d0596e9?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 259
  },
  {
    "name": "Tom Ford Rose Prick Private Blend",
    "slug": "tom-ford-rose-prick-private-blend-floral-fragrances",
    "brandSlug": "tom-ford",
    "categorySlug": "floral-fragrances",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Sichuan Pepper, Turmeric.",
    "description": "Tom Ford Rose Prick Private Blend by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Sichuan Pepper, Turmeric, moving into a seductive heart of May Rose, Turkish Rose, Bulgarian Rose, and resting upon a long-lasting base of Patchouli, Tonka Bean.",
    "price": 24000,
    "discount_price": 20500,
    "stock": 59,
    "volume_ml": 50,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Sichuan Pepper",
      "Turmeric"
    ],
    "heart_notes": [
      "May Rose",
      "Turkish Rose",
      "Bulgarian Rose"
    ],
    "base_notes": [
      "Patchouli",
      "Tonka Bean"
    ],
    "image_url": "https://images.unsplash.com/photo-1533017568856-f6085fef5f1f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1533017568856-f6085fef5f1f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1708733145706-82da0d0596e9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514348871858-1d3c20902571?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 288
  },
  {
    "name": "Maison Francis Kurkdjian A La Rose",
    "slug": "maison-francis-kurkdjian-a-la-rose-floral-fragrances",
    "brandSlug": "mfk",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Calabrian Bergamot, Californian Orange.",
    "description": "Maison Francis Kurkdjian A La Rose by MFK is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Calabrian Bergamot, Californian Orange, moving into a seductive heart of Damascena Rose, Grasse Centifolia Rose, Violet, Magnolia, and resting upon a long-lasting base of Cedarwood, Musk.",
    "price": 19500,
    "discount_price": 16800,
    "stock": 66,
    "volume_ml": 70,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Calabrian Bergamot",
      "Californian Orange"
    ],
    "heart_notes": [
      "Damascena Rose",
      "Grasse Centifolia Rose",
      "Violet",
      "Magnolia"
    ],
    "base_notes": [
      "Cedarwood",
      "Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1708733145706-82da0d0596e9?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1708733145706-82da0d0596e9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514348871858-1d3c20902571?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 77
  },
  {
    "name": "Creed Fleurissimo",
    "slug": "creed-fleurissimo-floral-fragrances",
    "brandSlug": "creed",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Bergamot, Violet Leaves.",
    "description": "Creed Fleurissimo by CREED is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Bergamot, Violet Leaves, moving into a seductive heart of Bulgarian Rose, Tuberose, Ylang-Ylang, and resting upon a long-lasting base of Florentine Iris, Ambergris.",
    "price": 23500,
    "discount_price": 19900,
    "stock": 73,
    "volume_ml": 75,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Bergamot",
      "Violet Leaves"
    ],
    "heart_notes": [
      "Bulgarian Rose",
      "Tuberose",
      "Ylang-Ylang"
    ],
    "base_notes": [
      "Florentine Iris",
      "Ambergris"
    ],
    "image_url": "https://images.unsplash.com/photo-1514348871858-1d3c20902571?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1514348871858-1d3c20902571?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572533177115-5bea803c0f49?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 106
  },
  {
    "name": "Dior Joy by Dior",
    "slug": "dior-joy-by-dior-floral-fragrances",
    "brandSlug": "dior",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Bergamot, Mandarin Orange.",
    "description": "Dior Joy by Dior by DIOR is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Bergamot, Mandarin Orange, moving into a seductive heart of Grasse Rose, Jasmine, and resting upon a long-lasting base of Sandalwood, White Musk, Cedar, Patchouli.",
    "price": 9500,
    "discount_price": 7900,
    "stock": 25,
    "volume_ml": 90,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Bergamot",
      "Mandarin Orange"
    ],
    "heart_notes": [
      "Grasse Rose",
      "Jasmine"
    ],
    "base_notes": [
      "Sandalwood",
      "White Musk",
      "Cedar",
      "Patchouli"
    ],
    "image_url": "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572533177115-5bea803c0f49?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 135
  },
  {
    "name": "Chanel Gabrielle Essence",
    "slug": "chanel-gabrielle-essence-floral-fragrances",
    "brandSlug": "chanel",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Citrus, Petitgrain, Blackcurrant.",
    "description": "Chanel Gabrielle Essence by CHANEL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Citrus, Petitgrain, Blackcurrant, moving into a seductive heart of Tuberose, Ylang-Ylang, Jasmine, Orange Blossom, and resting upon a long-lasting base of Sandalwood, Vanilla, White Musk.",
    "price": 12800,
    "discount_price": 10900,
    "stock": 32,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Citrus",
      "Petitgrain",
      "Blackcurrant"
    ],
    "heart_notes": [
      "Tuberose",
      "Ylang-Ylang",
      "Jasmine",
      "Orange Blossom"
    ],
    "base_notes": [
      "Sandalwood",
      "Vanilla",
      "White Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1572533177115-5bea803c0f49?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1572533177115-5bea803c0f49?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 164
  },
  {
    "name": "Gucci Bloom Nettare di Fiori",
    "slug": "gucci-bloom-nettare-di-fiori-floral-fragrances",
    "brandSlug": "gucci",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Ginger, Rose.",
    "description": "Gucci Bloom Nettare di Fiori by GUCCI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Ginger, Rose, moving into a seductive heart of Tuberose, Jasmine, Rangoon Creeper, and resting upon a long-lasting base of Patchouli, Musk, Osmanthus.",
    "price": 9400,
    "discount_price": 7800,
    "stock": 39,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Ginger",
      "Rose"
    ],
    "heart_notes": [
      "Tuberose",
      "Jasmine",
      "Rangoon Creeper"
    ],
    "base_notes": [
      "Patchouli",
      "Musk",
      "Osmanthus"
    ],
    "image_url": "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 193
  },
  {
    "name": "Yves Saint Laurent Parisienne",
    "slug": "yves-saint-laurent-parisienne-floral-fragrances",
    "brandSlug": "ysl",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Blackberry, Cranberry, Vinyl Accord.",
    "description": "Yves Saint Laurent Parisienne by YSL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Blackberry, Cranberry, Vinyl Accord, moving into a seductive heart of Damask Rose, Violet, Peony, and resting upon a long-lasting base of Patchouli, Vetiver, Musk, Sandalwood.",
    "price": 8200,
    "discount_price": 6800,
    "stock": 46,
    "volume_ml": 90,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Blackberry",
      "Cranberry",
      "Vinyl Accord"
    ],
    "heart_notes": [
      "Damask Rose",
      "Violet",
      "Peony"
    ],
    "base_notes": [
      "Patchouli",
      "Vetiver",
      "Musk",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1623072042391-46d461773e03?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 222
  },
  {
    "name": "Versace Woman",
    "slug": "versace-woman-floral-fragrances",
    "brandSlug": "versace",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Jasmine, Wild Rose, Frangipani, Bergamot.",
    "description": "Versace Woman by VERSACE is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Jasmine, Wild Rose, Frangipani, Bergamot, moving into a seductive heart of Lotus, Plum, Raspberry, Blue Cedar, and resting upon a long-lasting base of Musk, Amber, Inoki Wood.",
    "price": 5400,
    "discount_price": 4200,
    "stock": 53,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Jasmine",
      "Wild Rose",
      "Frangipani",
      "Bergamot"
    ],
    "heart_notes": [
      "Lotus",
      "Plum",
      "Raspberry",
      "Blue Cedar"
    ],
    "base_notes": [
      "Musk",
      "Amber",
      "Inoki Wood"
    ],
    "image_url": "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1623072042391-46d461773e03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 251
  },
  {
    "name": "Giorgio Armani Prive Pivoine Suzhou",
    "slug": "giorgio-armani-prive-pivoine-suzhou-floral-fragrances",
    "brandSlug": "armani",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Mandarin Orange, Pink Pepper, Raspberry.",
    "description": "Giorgio Armani Prive Pivoine Suzhou by ARMANI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Mandarin Orange, Pink Pepper, Raspberry, moving into a seductive heart of Peony, May Rose, Rose Oil, and resting upon a long-lasting base of Amber, Musk, Patchouli.",
    "price": 21500,
    "discount_price": 18200,
    "stock": 60,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Mandarin Orange",
      "Pink Pepper",
      "Raspberry"
    ],
    "heart_notes": [
      "Peony",
      "May Rose",
      "Rose Oil"
    ],
    "base_notes": [
      "Amber",
      "Musk",
      "Patchouli"
    ],
    "image_url": "https://images.unsplash.com/photo-1623072042391-46d461773e03?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1623072042391-46d461773e03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 280
  },
  {
    "name": "Davidoff Cool Water Sea Rose",
    "slug": "davidoff-cool-water-sea-rose-floral-fragrances",
    "brandSlug": "davidoff",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Toilette featuring notes of Japanese Nashi Pear.",
    "description": "Davidoff Cool Water Sea Rose by DAVIDOFF is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Japanese Nashi Pear, moving into a seductive heart of Pink Peony, and resting upon a long-lasting base of Musk.",
    "price": 4400,
    "discount_price": 3199,
    "stock": 67,
    "volume_ml": 100,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Japanese Nashi Pear"
    ],
    "heart_notes": [
      "Pink Peony"
    ],
    "base_notes": [
      "Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 69
  },
  {
    "name": "Lattafa Yara Moi (White Edition)",
    "slug": "lattafa-yara-moi-white-edition-floral-fragrances",
    "brandSlug": "lattafa",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Jasmine, Peach.",
    "description": "Lattafa Yara Moi (White Edition) by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Jasmine, Peach, moving into a seductive heart of Amber, Caramel, and resting upon a long-lasting base of Sandalwood, Patchouli.",
    "price": 2800,
    "discount_price": 1899,
    "stock": 74,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Jasmine",
      "Peach"
    ],
    "heart_notes": [
      "Amber",
      "Caramel"
    ],
    "base_notes": [
      "Sandalwood",
      "Patchouli"
    ],
    "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 98
  },
  {
    "name": "Tom Ford Cafe Rose",
    "slug": "tom-ford-cafe-rose-floral-fragrances",
    "brandSlug": "tom-ford",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Turkish Rose, Dark Coffee.",
    "description": "Tom Ford Cafe Rose by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Turkish Rose, Dark Coffee, moving into a seductive heart of Bulgarian Rose, Ylang-Ylang, Patchouli, Cardamom, and resting upon a long-lasting base of Frankincense, Sandalwood.",
    "price": 14500,
    "discount_price": 12200,
    "stock": 26,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Turkish Rose",
      "Dark Coffee"
    ],
    "heart_notes": [
      "Bulgarian Rose",
      "Ylang-Ylang",
      "Patchouli",
      "Cardamom"
    ],
    "base_notes": [
      "Frankincense",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 127
  },
  {
    "name": "Maison Francis Kurkdjian Feminin Pluriel",
    "slug": "maison-francis-kurkdjian-feminin-pluriel-floral-fragrances",
    "brandSlug": "mfk",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Iris of Florence, Violet.",
    "description": "Maison Francis Kurkdjian Feminin Pluriel by MFK is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Iris of Florence, Violet, moving into a seductive heart of Rose of Grasse, Egyptian Jasmine, Lily-of-the-Valley, Orange Blossom, and resting upon a long-lasting base of Vetiver, Indonesian Patchouli.",
    "price": 18900,
    "discount_price": 15900,
    "stock": 33,
    "volume_ml": 70,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Iris of Florence",
      "Violet"
    ],
    "heart_notes": [
      "Rose of Grasse",
      "Egyptian Jasmine",
      "Lily-of-the-Valley",
      "Orange Blossom"
    ],
    "base_notes": [
      "Vetiver",
      "Indonesian Patchouli"
    ],
    "image_url": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 156
  },
  {
    "name": "Dior Pure Poison",
    "slug": "dior-pure-poison-floral-fragrances",
    "brandSlug": "dior",
    "categorySlug": "floral-fragrances",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Jasmine, Sweet Orange, Calabrian Bergamot, Sicilian Mandarin.",
    "description": "Dior Pure Poison by DIOR is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Jasmine, Sweet Orange, Calabrian Bergamot, Sicilian Mandarin, moving into a seductive heart of Orange Blossom, Gardenia, and resting upon a long-lasting base of Sandalwood, White Amber, Cedarwood.",
    "price": 10800,
    "discount_price": 9100,
    "stock": 40,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Jasmine",
      "Sweet Orange",
      "Calabrian Bergamot",
      "Sicilian Mandarin"
    ],
    "heart_notes": [
      "Orange Blossom",
      "Gardenia"
    ],
    "base_notes": [
      "Sandalwood",
      "White Amber",
      "Cedarwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 185
  },
  {
    "name": "Tom Ford Oud Wood",
    "slug": "tom-ford-oud-wood-oud-collection",
    "brandSlug": "tom-ford",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Smoky Agarwood, Rosewood.",
    "description": "Tom Ford Oud Wood by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Smoky Agarwood, Rosewood, moving into a seductive heart of Cardamom, Sandalwood, Vetiver, and resting upon a long-lasting base of Tonka Bean, Amber, Vanilla.",
    "price": 19800,
    "discount_price": 16900,
    "stock": 47,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Smoky Agarwood",
      "Rosewood"
    ],
    "heart_notes": [
      "Cardamom",
      "Sandalwood",
      "Vetiver"
    ],
    "base_notes": [
      "Tonka Bean",
      "Amber",
      "Vanilla"
    ],
    "image_url": "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 214
  },
  {
    "name": "Maison Francis Kurkdjian Oud Satin Mood Extrait",
    "slug": "maison-francis-kurkdjian-oud-satin-mood-extrait-oud-collection",
    "brandSlug": "mfk",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Violet Blossom.",
    "description": "Maison Francis Kurkdjian Oud Satin Mood Extrait by MFK is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Violet Blossom, moving into a seductive heart of Bulgarian Rose, Turkish Rose Absolute, and resting upon a long-lasting base of Natural Laotian Oud, Amber, Vanilla.",
    "price": 29500,
    "discount_price": 25500,
    "stock": 54,
    "volume_ml": 70,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Violet Blossom"
    ],
    "heart_notes": [
      "Bulgarian Rose",
      "Turkish Rose Absolute"
    ],
    "base_notes": [
      "Natural Laotian Oud",
      "Amber",
      "Vanilla"
    ],
    "image_url": "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 243
  },
  {
    "name": "Gucci Intense Oud Parfum",
    "slug": "gucci-intense-oud-parfum-oud-collection",
    "brandSlug": "gucci",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Pear, Incense, Raspberry.",
    "description": "Gucci Intense Oud Parfum by GUCCI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Pear, Incense, Raspberry, moving into a seductive heart of Oud Oil, Bulgarian Rose, and resting upon a long-lasting base of Amber, Leather, Olibanum.",
    "price": 14200,
    "discount_price": 11800,
    "stock": 61,
    "volume_ml": 90,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Pear",
      "Incense",
      "Raspberry"
    ],
    "heart_notes": [
      "Oud Oil",
      "Bulgarian Rose"
    ],
    "base_notes": [
      "Amber",
      "Leather",
      "Olibanum"
    ],
    "image_url": "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.9,
    "review_count": 272
  },
  {
    "name": "Versace Pour Homme Oud Noir",
    "slug": "versace-pour-homme-oud-noir-oud-collection",
    "brandSlug": "versace",
    "categorySlug": "oud-collection",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Bitter Orange, Neroli, Black Pepper.",
    "description": "Versace Pour Homme Oud Noir by VERSACE is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Bitter Orange, Neroli, Black Pepper, moving into a seductive heart of Cardamom, Saffron, Frankincense, and resting upon a long-lasting base of Precious Oud, Patchouli, Leatherwood.",
    "price": 8200,
    "discount_price": 6690,
    "stock": 68,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Bitter Orange",
      "Neroli",
      "Black Pepper"
    ],
    "heart_notes": [
      "Cardamom",
      "Saffron",
      "Frankincense"
    ],
    "base_notes": [
      "Precious Oud",
      "Patchouli",
      "Leatherwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.6,
    "review_count": 301
  },
  {
    "name": "Armani Prive Oud Royal",
    "slug": "armani-prive-oud-royal-oud-collection",
    "brandSlug": "armani",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Saffron, Spiced Frankincense.",
    "description": "Armani Prive Oud Royal by ARMANI is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Saffron, Spiced Frankincense, moving into a seductive heart of Agarwood Extract, May Rose, and resting upon a long-lasting base of Amber, Sandalwood, Myrrh.",
    "price": 23500,
    "discount_price": 19900,
    "stock": 75,
    "volume_ml": 100,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Saffron",
      "Spiced Frankincense"
    ],
    "heart_notes": [
      "Agarwood Extract",
      "May Rose"
    ],
    "base_notes": [
      "Amber",
      "Sandalwood",
      "Myrrh"
    ],
    "image_url": "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 90
  },
  {
    "name": "Dior Oud Ispahan",
    "slug": "dior-oud-ispahan-oud-collection",
    "brandSlug": "dior",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Labdanum Herb.",
    "description": "Dior Oud Ispahan by DIOR is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Labdanum Herb, moving into a seductive heart of Damask Rose, Patchouli, and resting upon a long-lasting base of Smoky Oud, Sandalwood, Cedar.",
    "price": 21500,
    "discount_price": 18200,
    "stock": 27,
    "volume_ml": 125,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Labdanum Herb"
    ],
    "heart_notes": [
      "Damask Rose",
      "Patchouli"
    ],
    "base_notes": [
      "Smoky Oud",
      "Sandalwood",
      "Cedar"
    ],
    "image_url": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 119
  },
  {
    "name": "Creed Royal Princess Oud",
    "slug": "creed-royal-princess-oud-oud-collection",
    "brandSlug": "creed",
    "categorySlug": "oud-collection",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Bitter Orange, Sweet Violet.",
    "description": "Creed Royal Princess Oud by CREED is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Bitter Orange, Sweet Violet, moving into a seductive heart of Iris, Jasmine, Vanilla, and resting upon a long-lasting base of Precious Oud, Benzoin, Sandalwood.",
    "price": 26000,
    "discount_price": 22000,
    "stock": 34,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Bitter Orange",
      "Sweet Violet"
    ],
    "heart_notes": [
      "Iris",
      "Jasmine",
      "Vanilla"
    ],
    "base_notes": [
      "Precious Oud",
      "Benzoin",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 148
  },
  {
    "name": "Lattafa Bade'e Al Oud (Oud for Glory)",
    "slug": "lattafa-bade-e-al-oud-oud-for-glory-oud-collection",
    "brandSlug": "lattafa",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Saffron, Nutmeg, Lavender.",
    "description": "Lattafa Bade'e Al Oud (Oud for Glory) by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Saffron, Nutmeg, Lavender, moving into a seductive heart of Smoky Agarwood, Patchouli, and resting upon a long-lasting base of Dark Oud, Patchouli, Musk.",
    "price": 3200,
    "discount_price": 2199,
    "stock": 41,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Saffron",
      "Nutmeg",
      "Lavender"
    ],
    "heart_notes": [
      "Smoky Agarwood",
      "Patchouli"
    ],
    "base_notes": [
      "Dark Oud",
      "Patchouli",
      "Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 177
  },
  {
    "name": "Lattafa Eternal Oud",
    "slug": "lattafa-eternal-oud-oud-collection",
    "brandSlug": "lattafa",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Plum, Grapefruit.",
    "description": "Lattafa Eternal Oud by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Plum, Grapefruit, moving into a seductive heart of Orchid, Benzoin, and resting upon a long-lasting base of Aged Oud, Vanilla, Amber, Tonka.",
    "price": 3800,
    "discount_price": 2690,
    "stock": 48,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Plum",
      "Grapefruit"
    ],
    "heart_notes": [
      "Orchid",
      "Benzoin"
    ],
    "base_notes": [
      "Aged Oud",
      "Vanilla",
      "Amber",
      "Tonka"
    ],
    "image_url": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 206
  },
  {
    "name": "Yves Saint Laurent Splendid Wood Oud",
    "slug": "yves-saint-laurent-splendid-wood-oud-oud-collection",
    "brandSlug": "ysl",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Incense, Cardamom.",
    "description": "Yves Saint Laurent Splendid Wood Oud by YSL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Incense, Cardamom, moving into a seductive heart of Sambac Jasmine, Rosewood, and resting upon a long-lasting base of Precious Oud, Cypriol Oil, Cedar.",
    "price": 20500,
    "discount_price": 17200,
    "stock": 55,
    "volume_ml": 125,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Incense",
      "Cardamom"
    ],
    "heart_notes": [
      "Sambac Jasmine",
      "Rosewood"
    ],
    "base_notes": [
      "Precious Oud",
      "Cypriol Oil",
      "Cedar"
    ],
    "image_url": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 235
  },
  {
    "name": "Chanel Les Exclusifs Sycomore Oud Infusion",
    "slug": "chanel-les-exclusifs-sycomore-oud-infusion-oud-collection",
    "brandSlug": "chanel",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Pink Pepper, Smoky Aldehydes.",
    "description": "Chanel Les Exclusifs Sycomore Oud Infusion by CHANEL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Pink Pepper, Smoky Aldehydes, moving into a seductive heart of Vetiver, Cypress, Juniper, and resting upon a long-lasting base of Oud Accord, Sandalwood, Tobacco.",
    "price": 23500,
    "discount_price": 19900,
    "stock": 62,
    "volume_ml": 75,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Pink Pepper",
      "Smoky Aldehydes"
    ],
    "heart_notes": [
      "Vetiver",
      "Cypress",
      "Juniper"
    ],
    "base_notes": [
      "Oud Accord",
      "Sandalwood",
      "Tobacco"
    ],
    "image_url": "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 264
  },
  {
    "name": "Dior Purple Oud",
    "slug": "dior-purple-oud-oud-collection",
    "brandSlug": "dior",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Bitter Orange, Pink Pepper.",
    "description": "Dior Purple Oud by DIOR is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Bitter Orange, Pink Pepper, moving into a seductive heart of Saffron, and resting upon a long-lasting base of Intense Oud Wood, Amber.",
    "price": 21000,
    "discount_price": 17800,
    "stock": 69,
    "volume_ml": 125,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Bitter Orange",
      "Pink Pepper"
    ],
    "heart_notes": [
      "Saffron"
    ],
    "base_notes": [
      "Intense Oud Wood",
      "Amber"
    ],
    "image_url": "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1747916147834-afe35b0d95ac?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 293
  },
  {
    "name": "Tom Ford Oud Fleur",
    "slug": "tom-ford-oud-fleur-oud-collection",
    "brandSlug": "tom-ford",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Cardamom, Rosewood.",
    "description": "Tom Ford Oud Fleur by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Cardamom, Rosewood, moving into a seductive heart of Turkish Rose, Damask Rose, Osmanthus, and resting upon a long-lasting base of Agarwood, Patchouli, Sandalwood, Castoreum.",
    "price": 21500,
    "discount_price": 18200,
    "stock": 76,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Cardamom",
      "Rosewood"
    ],
    "heart_notes": [
      "Turkish Rose",
      "Damask Rose",
      "Osmanthus"
    ],
    "base_notes": [
      "Agarwood",
      "Patchouli",
      "Sandalwood",
      "Castoreum"
    ],
    "image_url": "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1747916147834-afe35b0d95ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 82
  },
  {
    "name": "Maison Francis Kurkdjian Oud Mood",
    "slug": "maison-francis-kurkdjian-oud-mood-oud-collection",
    "brandSlug": "mfk",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Saffron, Elemi Gum.",
    "description": "Maison Francis Kurkdjian Oud Mood by MFK is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Saffron, Elemi Gum, moving into a seductive heart of Ambrette Seed, Cedarwood, and resting upon a long-lasting base of Laotian Oud, Patchouli.",
    "price": 22500,
    "discount_price": 18900,
    "stock": 28,
    "volume_ml": 70,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Saffron",
      "Elemi Gum"
    ],
    "heart_notes": [
      "Ambrette Seed",
      "Cedarwood"
    ],
    "base_notes": [
      "Laotian Oud",
      "Patchouli"
    ],
    "image_url": "https://images.unsplash.com/photo-1747916147834-afe35b0d95ac?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1747916147834-afe35b0d95ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 111
  },
  {
    "name": "Lattafa Opulent Oud",
    "slug": "lattafa-opulent-oud-oud-collection",
    "brandSlug": "lattafa",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Floral Notes, Saffron, Citrus.",
    "description": "Lattafa Opulent Oud by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Floral Notes, Saffron, Citrus, moving into a seductive heart of Amber, Oud, Caramel, and resting upon a long-lasting base of Resins, Musk, Woody Notes, Patchouli.",
    "price": 2600,
    "discount_price": 1750,
    "stock": 35,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Floral Notes",
      "Saffron",
      "Citrus"
    ],
    "heart_notes": [
      "Amber",
      "Oud",
      "Caramel"
    ],
    "base_notes": [
      "Resins",
      "Musk",
      "Woody Notes",
      "Patchouli"
    ],
    "image_url": "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 140
  },
  {
    "name": "Gucci The Voice of the Snake Oud",
    "slug": "gucci-the-voice-of-the-snake-oud-oud-collection",
    "brandSlug": "gucci",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Noble Oud.",
    "description": "Gucci The Voice of the Snake Oud by GUCCI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Noble Oud, moving into a seductive heart of Dark Patchouli, and resting upon a long-lasting base of Black Saffron.",
    "price": 26000,
    "discount_price": 22000,
    "stock": 42,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Noble Oud"
    ],
    "heart_notes": [
      "Dark Patchouli"
    ],
    "base_notes": [
      "Black Saffron"
    ],
    "image_url": "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 169
  },
  {
    "name": "Armani Prive Cuir Majeste Oud",
    "slug": "armani-prive-cuir-majeste-oud-oud-collection",
    "brandSlug": "armani",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Dried Fruits, Incense, Osmanthus.",
    "description": "Armani Prive Cuir Majeste Oud by ARMANI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Dried Fruits, Incense, Osmanthus, moving into a seductive heart of Leather, May Rose, Tobacco, and resting upon a long-lasting base of Agarwood, Vanilla, Oud Extract.",
    "price": 24000,
    "discount_price": 20500,
    "stock": 49,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Dried Fruits",
      "Incense",
      "Osmanthus"
    ],
    "heart_notes": [
      "Leather",
      "May Rose",
      "Tobacco"
    ],
    "base_notes": [
      "Agarwood",
      "Vanilla",
      "Oud Extract"
    ],
    "image_url": "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 198
  },
  {
    "name": "Versace Atelier Encens Suprême Oud",
    "slug": "versace-atelier-encens-supr-me-oud-oud-collection",
    "brandSlug": "versace",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Somali Frankincense.",
    "description": "Versace Atelier Encens Suprême Oud by VERSACE is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Somali Frankincense, moving into a seductive heart of Spanish Cistus, and resting upon a long-lasting base of Natural Oud, Amber.",
    "price": 19500,
    "discount_price": 16500,
    "stock": 56,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Somali Frankincense"
    ],
    "heart_notes": [
      "Spanish Cistus"
    ],
    "base_notes": [
      "Natural Oud",
      "Amber"
    ],
    "image_url": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 227
  },
  {
    "name": "Lattafa Velvet Oud",
    "slug": "lattafa-velvet-oud-oud-collection",
    "brandSlug": "lattafa",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Cardamom, Bergamot.",
    "description": "Lattafa Velvet Oud by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Cardamom, Bergamot, moving into a seductive heart of Violet Leaf, Patchouli, and resting upon a long-lasting base of Suede, Oud, Amber, Oakmoss.",
    "price": 2800,
    "discount_price": 1899,
    "stock": 63,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Cardamom",
      "Bergamot"
    ],
    "heart_notes": [
      "Violet Leaf",
      "Patchouli"
    ],
    "base_notes": [
      "Suede",
      "Oud",
      "Amber",
      "Oakmoss"
    ],
    "image_url": "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 256
  },
  {
    "name": "Tom Ford Tobacco Oud",
    "slug": "tom-ford-tobacco-oud-oud-collection",
    "brandSlug": "tom-ford",
    "categorySlug": "oud-collection",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Whiskey Accord.",
    "description": "Tom Ford Tobacco Oud by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Whiskey Accord, moving into a seductive heart of Spicy Notes, Coriander, Cinnamon, and resting upon a long-lasting base of Arabic Tobacco, Oud Wood, Sandalwood, Incense.",
    "price": 22000,
    "discount_price": 18800,
    "stock": 70,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Whiskey Accord"
    ],
    "heart_notes": [
      "Spicy Notes",
      "Coriander",
      "Cinnamon"
    ],
    "base_notes": [
      "Arabic Tobacco",
      "Oud Wood",
      "Sandalwood",
      "Incense"
    ],
    "image_url": "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 285
  },
  {
    "name": "Victoria's Secret Bare Vanilla Body Mist",
    "slug": "victoria-s-secret-bare-vanilla-body-mist-body-mists",
    "brandSlug": "victorias-secret",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Whipped Vanilla.",
    "description": "Victoria's Secret Bare Vanilla Body Mist by VICTORIAS-SECRET is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Whipped Vanilla, moving into a seductive heart of Soft Cashmere, and resting upon a long-lasting base of Skin Musk.",
    "price": 2499,
    "discount_price": 1699,
    "stock": 77,
    "volume_ml": 250,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Whipped Vanilla"
    ],
    "heart_notes": [
      "Soft Cashmere"
    ],
    "base_notes": [
      "Skin Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533017568856-f6085fef5f1f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 74
  },
  {
    "name": "Sol de Janeiro Brazilian Crush Cheirosa 68",
    "slug": "sol-de-janeiro-brazilian-crush-cheirosa-68-body-mists",
    "brandSlug": "sol-de-janeiro",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Pink Dragonfruit, Lychee Essence.",
    "description": "Sol de Janeiro Brazilian Crush Cheirosa 68 by SOL-DE-JANEIRO is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Pink Dragonfruit, Lychee Essence, moving into a seductive heart of Brazilian Jasmine, Ocean Air, Hibiscus, and resting upon a long-lasting base of Sheer Vanilla, Sun Musk.",
    "price": 3200,
    "discount_price": 2499,
    "stock": 29,
    "volume_ml": 240,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Pink Dragonfruit",
      "Lychee Essence"
    ],
    "heart_notes": [
      "Brazilian Jasmine",
      "Ocean Air",
      "Hibiscus"
    ],
    "base_notes": [
      "Sheer Vanilla",
      "Sun Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533017568856-f6085fef5f1f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 103
  },
  {
    "name": "Victoria's Secret Pure Seduction Mist",
    "slug": "victoria-s-secret-pure-seduction-mist-body-mists",
    "brandSlug": "victorias-secret",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Red Plum.",
    "description": "Victoria's Secret Pure Seduction Mist by VICTORIAS-SECRET is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Red Plum, moving into a seductive heart of Sweet Freesia, and resting upon a long-lasting base of Chamomile Mist.",
    "price": 2499,
    "discount_price": 1699,
    "stock": 36,
    "volume_ml": 250,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Red Plum"
    ],
    "heart_notes": [
      "Sweet Freesia"
    ],
    "base_notes": [
      "Chamomile Mist"
    ],
    "image_url": "https://images.unsplash.com/photo-1533017568856-f6085fef5f1f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1533017568856-f6085fef5f1f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.9,
    "review_count": 132
  },
  {
    "name": "Sol de Janeiro Brazilian Crush Cheirosa 62",
    "slug": "sol-de-janeiro-brazilian-crush-cheirosa-62-body-mists",
    "brandSlug": "sol-de-janeiro",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Pistachio, Almond.",
    "description": "Sol de Janeiro Brazilian Crush Cheirosa 62 by SOL-DE-JANEIRO is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Pistachio, Almond, moving into a seductive heart of Heliotrope, Jasmine Petals, and resting upon a long-lasting base of Salted Caramel, Vanilla, Sandalwood.",
    "price": 3200,
    "discount_price": 2499,
    "stock": 43,
    "volume_ml": 240,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Pistachio",
      "Almond"
    ],
    "heart_notes": [
      "Heliotrope",
      "Jasmine Petals"
    ],
    "base_notes": [
      "Salted Caramel",
      "Vanilla",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.6,
    "review_count": 161
  },
  {
    "name": "Victoria's Secret Velvet Petals Shimmer Mist",
    "slug": "victoria-s-secret-velvet-petals-shimmer-mist-body-mists",
    "brandSlug": "victorias-secret",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Lush Floral Blooms.",
    "description": "Victoria's Secret Velvet Petals Shimmer Mist by VICTORIAS-SECRET is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Lush Floral Blooms, moving into a seductive heart of Almond Glaze, and resting upon a long-lasting base of Velvet Musk.",
    "price": 2699,
    "discount_price": 1799,
    "stock": 50,
    "volume_ml": 250,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Lush Floral Blooms"
    ],
    "heart_notes": [
      "Almond Glaze"
    ],
    "base_notes": [
      "Velvet Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 190
  },
  {
    "name": "Sol de Janeiro Cheirosa 59 Delicia Drench",
    "slug": "sol-de-janeiro-cheirosa-59-delicia-drench-body-mists",
    "brandSlug": "sol-de-janeiro",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Velvet Plum, Sugared Violet.",
    "description": "Sol de Janeiro Cheirosa 59 Delicia Drench by SOL-DE-JANEIRO is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Velvet Plum, Sugared Violet, moving into a seductive heart of Vanilla Orchid, Whipped Amber, and resting upon a long-lasting base of Sheer Sandalwood, Fresh Vetiver.",
    "price": 3200,
    "discount_price": 2499,
    "stock": 57,
    "volume_ml": 240,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Velvet Plum",
      "Sugared Violet"
    ],
    "heart_notes": [
      "Vanilla Orchid",
      "Whipped Amber"
    ],
    "base_notes": [
      "Sheer Sandalwood",
      "Fresh Vetiver"
    ],
    "image_url": "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 219
  },
  {
    "name": "Victoria's Secret Love Spell Fragrance Mist",
    "slug": "victoria-s-secret-love-spell-fragrance-mist-body-mists",
    "brandSlug": "victorias-secret",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Cherry Blossom.",
    "description": "Victoria's Secret Love Spell Fragrance Mist by VICTORIAS-SECRET is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Cherry Blossom, moving into a seductive heart of Fresh Peach, and resting upon a long-lasting base of Aloe Vera Infusion.",
    "price": 2499,
    "discount_price": 1699,
    "stock": 64,
    "volume_ml": 250,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Cherry Blossom"
    ],
    "heart_notes": [
      "Fresh Peach"
    ],
    "base_notes": [
      "Aloe Vera Infusion"
    ],
    "image_url": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 248
  },
  {
    "name": "Sol de Janeiro Cheirosa 40 Bom Dia Bright",
    "slug": "sol-de-janeiro-cheirosa-40-bom-dia-bright-body-mists",
    "brandSlug": "sol-de-janeiro",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Black Amber Plum, Creme de Cassis.",
    "description": "Sol de Janeiro Cheirosa 40 Bom Dia Bright by SOL-DE-JANEIRO is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Black Amber Plum, Creme de Cassis, moving into a seductive heart of Jasmine Blooms, Brazilian Orchid, and resting upon a long-lasting base of Vanilla Woods, Warm Musk.",
    "price": 3200,
    "discount_price": 2499,
    "stock": 71,
    "volume_ml": 240,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Black Amber Plum",
      "Creme de Cassis"
    ],
    "heart_notes": [
      "Jasmine Blooms",
      "Brazilian Orchid"
    ],
    "base_notes": [
      "Vanilla Woods",
      "Warm Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 277
  },
  {
    "name": "Victoria's Secret Coconut Passion Mist",
    "slug": "victoria-s-secret-coconut-passion-mist-body-mists",
    "brandSlug": "victorias-secret",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Island Coconut.",
    "description": "Victoria's Secret Coconut Passion Mist by VICTORIAS-SECRET is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Island Coconut, moving into a seductive heart of Warm Vanilla, and resting upon a long-lasting base of Soothing Aloe.",
    "price": 2499,
    "discount_price": 1699,
    "stock": 78,
    "volume_ml": 250,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Island Coconut"
    ],
    "heart_notes": [
      "Warm Vanilla"
    ],
    "base_notes": [
      "Soothing Aloe"
    ],
    "image_url": "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 66
  },
  {
    "name": "Sol de Janeiro Cheirosa 71 Caramelized Vanilla",
    "slug": "sol-de-janeiro-cheirosa-71-caramelized-vanilla-body-mists",
    "brandSlug": "sol-de-janeiro",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Caramelized Vanilla, Sea Salt.",
    "description": "Sol de Janeiro Cheirosa 71 Caramelized Vanilla by SOL-DE-JANEIRO is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Caramelized Vanilla, Sea Salt, moving into a seductive heart of Toasted Macadamia Nut, White Chocolate, and resting upon a long-lasting base of Tonka Bean, Coconut Blossom.",
    "price": 3200,
    "discount_price": 2499,
    "stock": 30,
    "volume_ml": 240,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Caramelized Vanilla",
      "Sea Salt"
    ],
    "heart_notes": [
      "Toasted Macadamia Nut",
      "White Chocolate"
    ],
    "base_notes": [
      "Tonka Bean",
      "Coconut Blossom"
    ],
    "image_url": "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 95
  },
  {
    "name": "Victoria's Secret Aqua Kiss Body Mist",
    "slug": "victoria-s-secret-aqua-kiss-body-mist-body-mists",
    "brandSlug": "victorias-secret",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Cool Waters.",
    "description": "Victoria's Secret Aqua Kiss Body Mist by VICTORIAS-SECRET is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Cool Waters, moving into a seductive heart of Bright Daisy, and resting upon a long-lasting base of Aloe Vera Accord.",
    "price": 2499,
    "discount_price": 1699,
    "stock": 37,
    "volume_ml": 250,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Cool Waters"
    ],
    "heart_notes": [
      "Bright Daisy"
    ],
    "base_notes": [
      "Aloe Vera Accord"
    ],
    "image_url": "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1708733145706-82da0d0596e9?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 124
  },
  {
    "name": "Sol de Janeiro Cheirosa 87 Rio Radiance Mist",
    "slug": "sol-de-janeiro-cheirosa-87-rio-radiance-mist-body-mists",
    "brandSlug": "sol-de-janeiro",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Solar Tuberose, Leite de Coco.",
    "description": "Sol de Janeiro Cheirosa 87 Rio Radiance Mist by SOL-DE-JANEIRO is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Solar Tuberose, Leite de Coco, moving into a seductive heart of Warm Sand, Ylang-Ylang, and resting upon a long-lasting base of Amber, Vanilla Essence.",
    "price": 3200,
    "discount_price": 2499,
    "stock": 44,
    "volume_ml": 240,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Solar Tuberose",
      "Leite de Coco"
    ],
    "heart_notes": [
      "Warm Sand",
      "Ylang-Ylang"
    ],
    "base_notes": [
      "Amber",
      "Vanilla Essence"
    ],
    "image_url": "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1708733145706-82da0d0596e9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 153
  },
  {
    "name": "Victoria's Secret Amber Romance Mist",
    "slug": "victoria-s-secret-amber-romance-mist-body-mists",
    "brandSlug": "victorias-secret",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Deep Amber.",
    "description": "Victoria's Secret Amber Romance Mist by VICTORIAS-SECRET is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Deep Amber, moving into a seductive heart of Sugar Kisses, and resting upon a long-lasting base of Creme Anglaise.",
    "price": 2499,
    "discount_price": 1699,
    "stock": 51,
    "volume_ml": 250,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Deep Amber"
    ],
    "heart_notes": [
      "Sugar Kisses"
    ],
    "base_notes": [
      "Creme Anglaise"
    ],
    "image_url": "https://images.unsplash.com/photo-1708733145706-82da0d0596e9?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1708733145706-82da0d0596e9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 182
  },
  {
    "name": "Victoria's Secret Romantic Fragrance Mist",
    "slug": "victoria-s-secret-romantic-fragrance-mist-body-mists",
    "brandSlug": "victorias-secret",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Pink Petals.",
    "description": "Victoria's Secret Romantic Fragrance Mist by VICTORIAS-SECRET is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Pink Petals, moving into a seductive heart of Solar Musk, and resting upon a long-lasting base of Velvet Woods.",
    "price": 2499,
    "discount_price": 1699,
    "stock": 58,
    "volume_ml": 250,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Pink Petals"
    ],
    "heart_notes": [
      "Solar Musk"
    ],
    "base_notes": [
      "Velvet Woods"
    ],
    "image_url": "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 211
  },
  {
    "name": "Victoria's Secret Temptation Mist",
    "slug": "victoria-s-secret-temptation-mist-body-mists",
    "brandSlug": "victorias-secret",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Delicious Apple.",
    "description": "Victoria's Secret Temptation Mist by VICTORIAS-SECRET is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Delicious Apple, moving into a seductive heart of Desert Flower, and resting upon a long-lasting base of Fresh Saguaro.",
    "price": 2499,
    "discount_price": 1699,
    "stock": 65,
    "volume_ml": 250,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Delicious Apple"
    ],
    "heart_notes": [
      "Desert Flower"
    ],
    "base_notes": [
      "Fresh Saguaro"
    ],
    "image_url": "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 240
  },
  {
    "name": "Victoria's Secret Midnight Bloom Mist",
    "slug": "victoria-s-secret-midnight-bloom-mist-body-mists",
    "brandSlug": "victorias-secret",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Moon Flower.",
    "description": "Victoria's Secret Midnight Bloom Mist by VICTORIAS-SECRET is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Moon Flower, moving into a seductive heart of Creamy Woods, and resting upon a long-lasting base of Starry Night Musk.",
    "price": 2499,
    "discount_price": 1699,
    "stock": 72,
    "volume_ml": 250,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Moon Flower"
    ],
    "heart_notes": [
      "Creamy Woods"
    ],
    "base_notes": [
      "Starry Night Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 269
  },
  {
    "name": "Victoria's Secret Rush Fragrance Mist",
    "slug": "victoria-s-secret-rush-fragrance-mist-body-mists",
    "brandSlug": "victorias-secret",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Sultry Clementine.",
    "description": "Victoria's Secret Rush Fragrance Mist by VICTORIAS-SECRET is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Sultry Clementine, moving into a seductive heart of Crystal Amber, and resting upon a long-lasting base of Solar Accord.",
    "price": 2499,
    "discount_price": 1699,
    "stock": 79,
    "volume_ml": 250,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Sultry Clementine"
    ],
    "heart_notes": [
      "Crystal Amber"
    ],
    "base_notes": [
      "Solar Accord"
    ],
    "image_url": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 298
  },
  {
    "name": "Victoria's Secret Secret Sunrise Mist",
    "slug": "victoria-s-secret-secret-sunrise-mist-body-mists",
    "brandSlug": "victorias-secret",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Sunlit Berries.",
    "description": "Victoria's Secret Secret Sunrise Mist by VICTORIAS-SECRET is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Sunlit Berries, moving into a seductive heart of Pink Hibiscus, and resting upon a long-lasting base of Golden Amber.",
    "price": 2499,
    "discount_price": 1699,
    "stock": 31,
    "volume_ml": 250,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Sunlit Berries"
    ],
    "heart_notes": [
      "Pink Hibiscus"
    ],
    "base_notes": [
      "Golden Amber"
    ],
    "image_url": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 87
  },
  {
    "name": "Victoria's Secret Neon Palms Mist",
    "slug": "victoria-s-secret-neon-palms-mist-body-mists",
    "brandSlug": "victorias-secret",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Orchid Palms.",
    "description": "Victoria's Secret Neon Palms Mist by VICTORIAS-SECRET is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Orchid Palms, moving into a seductive heart of Coconut Water, and resting upon a long-lasting base of Warm Sand.",
    "price": 2499,
    "discount_price": 1699,
    "stock": 38,
    "volume_ml": 250,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Orchid Palms"
    ],
    "heart_notes": [
      "Coconut Water"
    ],
    "base_notes": [
      "Warm Sand"
    ],
    "image_url": "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 116
  },
  {
    "name": "Victoria's Secret Island Market Mist",
    "slug": "victoria-s-secret-island-market-mist-body-mists",
    "brandSlug": "victorias-secret",
    "categorySlug": "body-mists",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Passionfruit Nectar.",
    "description": "Victoria's Secret Island Market Mist by VICTORIAS-SECRET is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Passionfruit Nectar, moving into a seductive heart of Tiger Lily, and resting upon a long-lasting base of Driftwood.",
    "price": 2499,
    "discount_price": 1699,
    "stock": 45,
    "volume_ml": 250,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Passionfruit Nectar"
    ],
    "heart_notes": [
      "Tiger Lily"
    ],
    "base_notes": [
      "Driftwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 145
  },
  {
    "name": "Dior Sauvage Elixir Ultra Intense",
    "slug": "dior-sauvage-elixir-ultra-intense-new-arrivals",
    "brandSlug": "dior",
    "categorySlug": "new-arrivals",
    "gender": "Men",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Cinnamon, Nutmeg, Cardamom, Grapefruit.",
    "description": "Dior Sauvage Elixir Ultra Intense by DIOR is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Cinnamon, Nutmeg, Cardamom, Grapefruit, moving into a seductive heart of Lavender Essence of Nyons, and resting upon a long-lasting base of Licorice, Sandalwood, Amber, Patchouli.",
    "price": 14500,
    "discount_price": 12500,
    "stock": 52,
    "volume_ml": 60,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Cinnamon",
      "Nutmeg",
      "Cardamom",
      "Grapefruit"
    ],
    "heart_notes": [
      "Lavender Essence of Nyons"
    ],
    "base_notes": [
      "Licorice",
      "Sandalwood",
      "Amber",
      "Patchouli"
    ],
    "image_url": "https://images.unsplash.com/photo-1747916148863-7164d8920b57?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1747916148863-7164d8920b57?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1753389665531-668543c597cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 174
  },
  {
    "name": "Bleu de Chanel Parfum Edition 2026",
    "slug": "bleu-de-chanel-parfum-edition-2026-new-arrivals",
    "brandSlug": "chanel",
    "categorySlug": "new-arrivals",
    "gender": "Men",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Lemon Zest, Bergamot, Mint, Artemisia.",
    "description": "Bleu de Chanel Parfum Edition 2026 by CHANEL is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Lemon Zest, Bergamot, Mint, Artemisia, moving into a seductive heart of Lavender, Geranium, Green Notes, Pineapple, and resting upon a long-lasting base of New Caledonian Sandalwood, Cedar, Amberwood, Tonka Bean.",
    "price": 13500,
    "discount_price": 11600,
    "stock": 59,
    "volume_ml": 100,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Lemon Zest",
      "Bergamot",
      "Mint",
      "Artemisia"
    ],
    "heart_notes": [
      "Lavender",
      "Geranium",
      "Green Notes",
      "Pineapple"
    ],
    "base_notes": [
      "New Caledonian Sandalwood",
      "Cedar",
      "Amberwood",
      "Tonka Bean"
    ],
    "image_url": "https://images.unsplash.com/photo-1753389665531-668543c597cc?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1753389665531-668543c597cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 203
  },
  {
    "name": "Yves Saint Laurent MYSLF Le Parfum",
    "slug": "yves-saint-laurent-myslf-le-parfum-new-arrivals",
    "brandSlug": "ysl",
    "categorySlug": "new-arrivals",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Black Pepper, Calabrian Bergamot.",
    "description": "Yves Saint Laurent MYSLF Le Parfum by YSL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Black Pepper, Calabrian Bergamot, moving into a seductive heart of Orange Blossom Absolute, and resting upon a long-lasting base of Bourbon Vanilla, Amber, Patchouli, Woody Notes.",
    "price": 9800,
    "discount_price": 8200,
    "stock": 66,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Black Pepper",
      "Calabrian Bergamot"
    ],
    "heart_notes": [
      "Orange Blossom Absolute"
    ],
    "base_notes": [
      "Bourbon Vanilla",
      "Amber",
      "Patchouli",
      "Woody Notes"
    ],
    "image_url": "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595389294696-ae969ff733a8?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.9,
    "review_count": 232
  },
  {
    "name": "Gucci Flora Gorgeous Orchid",
    "slug": "gucci-flora-gorgeous-orchid-new-arrivals",
    "brandSlug": "gucci",
    "categorySlug": "new-arrivals",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Vanilla Duo.",
    "description": "Gucci Flora Gorgeous Orchid by GUCCI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Vanilla Duo, moving into a seductive heart of Vanilla Orchid, and resting upon a long-lasting base of Ozonic Notes.",
    "price": 9200,
    "discount_price": 7600,
    "stock": 73,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Vanilla Duo"
    ],
    "heart_notes": [
      "Vanilla Orchid"
    ],
    "base_notes": [
      "Ozonic Notes"
    ],
    "image_url": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595389294696-ae969ff733a8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.6,
    "review_count": 261
  },
  {
    "name": "Versace Eros Energy Eau de Parfum",
    "slug": "versace-eros-energy-eau-de-parfum-new-arrivals",
    "brandSlug": "versace",
    "categorySlug": "new-arrivals",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Blood Orange, Lime, Grapefruit, Mandarin.",
    "description": "Versace Eros Energy Eau de Parfum by VERSACE is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Blood Orange, Lime, Grapefruit, Mandarin, moving into a seductive heart of Pink Pepper, White Amber, Blackcurrant, and resting upon a long-lasting base of Patchouli, Musk, Oakmoss.",
    "price": 7800,
    "discount_price": 6400,
    "stock": 25,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Blood Orange",
      "Lime",
      "Grapefruit",
      "Mandarin"
    ],
    "heart_notes": [
      "Pink Pepper",
      "White Amber",
      "Blackcurrant"
    ],
    "base_notes": [
      "Patchouli",
      "Musk",
      "Oakmoss"
    ],
    "image_url": "https://images.unsplash.com/photo-1595389294696-ae969ff733a8?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1595389294696-ae969ff733a8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 290
  },
  {
    "name": "Giorgio Armani Acqua Di Gio Elixir",
    "slug": "giorgio-armani-acqua-di-gio-elixir-new-arrivals",
    "brandSlug": "armani",
    "categorySlug": "new-arrivals",
    "gender": "Men",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Bergamot, Spiced Nutmeg.",
    "description": "Giorgio Armani Acqua Di Gio Elixir by ARMANI is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Bergamot, Spiced Nutmeg, moving into a seductive heart of Marine Accord, Violet Leaf, and resting upon a long-lasting base of Patchouli, Frankincense.",
    "price": 10500,
    "discount_price": 8900,
    "stock": 32,
    "volume_ml": 50,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Bergamot",
      "Spiced Nutmeg"
    ],
    "heart_notes": [
      "Marine Accord",
      "Violet Leaf"
    ],
    "base_notes": [
      "Patchouli",
      "Frankincense"
    ],
    "image_url": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 79
  },
  {
    "name": "Chanel Chance Eau Fraiche Eau de Parfum",
    "slug": "chanel-chance-eau-fraiche-eau-de-parfum-new-arrivals",
    "brandSlug": "chanel",
    "categorySlug": "new-arrivals",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Citron, Aldehydes.",
    "description": "Chanel Chance Eau Fraiche Eau de Parfum by CHANEL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Citron, Aldehydes, moving into a seductive heart of Jasmine, and resting upon a long-lasting base of Teak Wood Accord, Amber.",
    "price": 11500,
    "discount_price": 9900,
    "stock": 39,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Citron",
      "Aldehydes"
    ],
    "heart_notes": [
      "Jasmine"
    ],
    "base_notes": [
      "Teak Wood Accord",
      "Amber"
    ],
    "image_url": "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 108
  },
  {
    "name": "Tom Ford Cafe Rose Private Edition",
    "slug": "tom-ford-cafe-rose-private-edition-new-arrivals",
    "brandSlug": "tom-ford",
    "categorySlug": "new-arrivals",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Turkish Rose, Dark Roasted Coffee.",
    "description": "Tom Ford Cafe Rose Private Edition by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Turkish Rose, Dark Roasted Coffee, moving into a seductive heart of Bulgarian Rose, Ylang-Ylang, Coriander, Patchouli, and resting upon a long-lasting base of Frankincense, Sandalwood.",
    "price": 14800,
    "discount_price": 12500,
    "stock": 46,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Turkish Rose",
      "Dark Roasted Coffee"
    ],
    "heart_notes": [
      "Bulgarian Rose",
      "Ylang-Ylang",
      "Coriander",
      "Patchouli"
    ],
    "base_notes": [
      "Frankincense",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 137
  },
  {
    "name": "Lattafa Khamrah Qahwa Reserve",
    "slug": "lattafa-khamrah-qahwa-reserve-new-arrivals",
    "brandSlug": "lattafa",
    "categorySlug": "new-arrivals",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Cardamom, Ginger, Cinnamon.",
    "description": "Lattafa Khamrah Qahwa Reserve by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Cardamom, Ginger, Cinnamon, moving into a seductive heart of Candied Fruits, White Flowers, Praline, and resting upon a long-lasting base of Arabian Coffee, Vanilla, Tonka Bean, Benzoin.",
    "price": 3800,
    "discount_price": 2599,
    "stock": 53,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Cardamom",
      "Ginger",
      "Cinnamon"
    ],
    "heart_notes": [
      "Candied Fruits",
      "White Flowers",
      "Praline"
    ],
    "base_notes": [
      "Arabian Coffee",
      "Vanilla",
      "Tonka Bean",
      "Benzoin"
    ],
    "image_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 166
  },
  {
    "name": "Maison Francis Kurkdjian Aqua Media Cologne Forte",
    "slug": "maison-francis-kurkdjian-aqua-media-cologne-forte-new-arrivals",
    "brandSlug": "mfk",
    "categorySlug": "new-arrivals",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Verbena Accord, Bergamot of Calabria.",
    "description": "Maison Francis Kurkdjian Aqua Media Cologne Forte by MFK is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Verbena Accord, Bergamot of Calabria, moving into a seductive heart of Sweet Fennel, Hedione, and resting upon a long-lasting base of Woody Musks, Patchouli.",
    "price": 17900,
    "discount_price": 15400,
    "stock": 60,
    "volume_ml": 70,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Verbena Accord",
      "Bergamot of Calabria"
    ],
    "heart_notes": [
      "Sweet Fennel",
      "Hedione"
    ],
    "base_notes": [
      "Woody Musks",
      "Patchouli"
    ],
    "image_url": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 195
  },
  {
    "name": "Creed Queen of Silk",
    "slug": "creed-queen-of-silk-new-arrivals",
    "brandSlug": "creed",
    "categorySlug": "new-arrivals",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Chinese Osmanthus, Magnolia, Saffron.",
    "description": "Creed Queen of Silk by CREED is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Chinese Osmanthus, Magnolia, Saffron, moving into a seductive heart of Passionfruit, Tuberose, Patchouli, and resting upon a long-lasting base of Madagascar Vanilla, Incense, Myrrh, Cedarwood.",
    "price": 27500,
    "discount_price": 23900,
    "stock": 67,
    "volume_ml": 75,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Chinese Osmanthus",
      "Magnolia",
      "Saffron"
    ],
    "heart_notes": [
      "Passionfruit",
      "Tuberose",
      "Patchouli"
    ],
    "base_notes": [
      "Madagascar Vanilla",
      "Incense",
      "Myrrh",
      "Cedarwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 224
  },
  {
    "name": "Dior Miss Dior Parfum 2026",
    "slug": "dior-miss-dior-parfum-2026-new-arrivals",
    "brandSlug": "dior",
    "categorySlug": "new-arrivals",
    "gender": "Women",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Mandarin, Wild Strawberry, Apricot, Peach.",
    "description": "Dior Miss Dior Parfum 2026 by DIOR is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Mandarin, Wild Strawberry, Apricot, Peach, moving into a seductive heart of Jasmine, Wild Rose, and resting upon a long-lasting base of Amber, Patchouli, Moss, Atlas Cedar.",
    "price": 11900,
    "discount_price": 9990,
    "stock": 74,
    "volume_ml": 80,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Mandarin",
      "Wild Strawberry",
      "Apricot",
      "Peach"
    ],
    "heart_notes": [
      "Jasmine",
      "Wild Rose"
    ],
    "base_notes": [
      "Amber",
      "Patchouli",
      "Moss",
      "Atlas Cedar"
    ],
    "image_url": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 253
  },
  {
    "name": "Davidoff Cool Water Intense Man",
    "slug": "davidoff-cool-water-intense-man-new-arrivals",
    "brandSlug": "davidoff",
    "categorySlug": "new-arrivals",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Green Mandarin.",
    "description": "Davidoff Cool Water Intense Man by DAVIDOFF is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Green Mandarin, moving into a seductive heart of Coconut Water, and resting upon a long-lasting base of Amber Accord.",
    "price": 4900,
    "discount_price": 3700,
    "stock": 26,
    "volume_ml": 125,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Green Mandarin"
    ],
    "heart_notes": [
      "Coconut Water"
    ],
    "base_notes": [
      "Amber Accord"
    ],
    "image_url": "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 282
  },
  {
    "name": "Yves Saint Laurent Libre Flowers & Flames",
    "slug": "yves-saint-laurent-libre-flowers-flames-new-arrivals",
    "brandSlug": "ysl",
    "categorySlug": "new-arrivals",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Lavender, Bergamot.",
    "description": "Yves Saint Laurent Libre Flowers & Flames by YSL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Lavender, Bergamot, moving into a seductive heart of Desert Lily, Palm Tree Blossom, Orange Blossom, and resting upon a long-lasting base of Vanilla Infusion.",
    "price": 10500,
    "discount_price": 8900,
    "stock": 33,
    "volume_ml": 90,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Lavender",
      "Bergamot"
    ],
    "heart_notes": [
      "Desert Lily",
      "Palm Tree Blossom",
      "Orange Blossom"
    ],
    "base_notes": [
      "Vanilla Infusion"
    ],
    "image_url": "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 71
  },
  {
    "name": "Versace Dylan Blue Gold Edition",
    "slug": "versace-dylan-blue-gold-edition-new-arrivals",
    "brandSlug": "versace",
    "categorySlug": "new-arrivals",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Aquatic Notes, Calabrian Bergamot, Grapefruit.",
    "description": "Versace Dylan Blue Gold Edition by VERSACE is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Aquatic Notes, Calabrian Bergamot, Grapefruit, moving into a seductive heart of Violet Leaf, Black Pepper, Papyrus, and resting upon a long-lasting base of Incense, Mineral Musk, Tonka Bean.",
    "price": 7900,
    "discount_price": 6400,
    "stock": 40,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Aquatic Notes",
      "Calabrian Bergamot",
      "Grapefruit"
    ],
    "heart_notes": [
      "Violet Leaf",
      "Black Pepper",
      "Papyrus"
    ],
    "base_notes": [
      "Incense",
      "Mineral Musk",
      "Tonka Bean"
    ],
    "image_url": "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 100
  },
  {
    "name": "Gucci Guilty Elixir de Parfum Pour Homme",
    "slug": "gucci-guilty-elixir-de-parfum-pour-homme-new-arrivals",
    "brandSlug": "gucci",
    "categorySlug": "new-arrivals",
    "gender": "Men",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Orange Blossom, Nutmeg, Pimento Seeds.",
    "description": "Gucci Guilty Elixir de Parfum Pour Homme by GUCCI is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Orange Blossom, Nutmeg, Pimento Seeds, moving into a seductive heart of Orris Butter, Orange Flower, Osmanthus, and resting upon a long-lasting base of Ambrofix, Benzoin, Vanilla, Patchouli.",
    "price": 12500,
    "discount_price": 10400,
    "stock": 47,
    "volume_ml": 60,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Orange Blossom",
      "Nutmeg",
      "Pimento Seeds"
    ],
    "heart_notes": [
      "Orris Butter",
      "Orange Flower",
      "Osmanthus"
    ],
    "base_notes": [
      "Ambrofix",
      "Benzoin",
      "Vanilla",
      "Patchouli"
    ],
    "image_url": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 129
  },
  {
    "name": "Giorgio Armani Blanc Kogane",
    "slug": "giorgio-armani-blanc-kogane-new-arrivals",
    "brandSlug": "armani",
    "categorySlug": "new-arrivals",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Aldehydes, Pink Pepper.",
    "description": "Giorgio Armani Blanc Kogane by ARMANI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Aldehydes, Pink Pepper, moving into a seductive heart of White Jasmine, Lily, and resting upon a long-lasting base of White Musk, Vetiver, Patchouli.",
    "price": 24000,
    "discount_price": 20500,
    "stock": 54,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Aldehydes",
      "Pink Pepper"
    ],
    "heart_notes": [
      "White Jasmine",
      "Lily"
    ],
    "base_notes": [
      "White Musk",
      "Vetiver",
      "Patchouli"
    ],
    "image_url": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 158
  },
  {
    "name": "Lattafa Asad Sunset",
    "slug": "lattafa-asad-sunset-new-arrivals",
    "brandSlug": "lattafa",
    "categorySlug": "new-arrivals",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Spicy Pink Pepper, Pineapple.",
    "description": "Lattafa Asad Sunset by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Spicy Pink Pepper, Pineapple, moving into a seductive heart of Coffee Bean, Dry Iris, and resting upon a long-lasting base of Amber, Vanilla, Precious Woods.",
    "price": 3100,
    "discount_price": 2099,
    "stock": 61,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Spicy Pink Pepper",
      "Pineapple"
    ],
    "heart_notes": [
      "Coffee Bean",
      "Dry Iris"
    ],
    "base_notes": [
      "Amber",
      "Vanilla",
      "Precious Woods"
    ],
    "image_url": "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 187
  },
  {
    "name": "Tom Ford Vanilla Sex Private Blend",
    "slug": "tom-ford-vanilla-sex-private-blend-new-arrivals",
    "brandSlug": "tom-ford",
    "categorySlug": "new-arrivals",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Bitter Almond.",
    "description": "Tom Ford Vanilla Sex Private Blend by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Bitter Almond, moving into a seductive heart of Floral Notes, Vanilla Absolute, and resting upon a long-lasting base of Ultravanil, Tonka Bean, Sandalwood.",
    "price": 25000,
    "discount_price": 21500,
    "stock": 68,
    "volume_ml": 50,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Bitter Almond"
    ],
    "heart_notes": [
      "Floral Notes",
      "Vanilla Absolute"
    ],
    "base_notes": [
      "Ultravanil",
      "Tonka Bean",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1747916148863-7164d8920b57?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 216
  },
  {
    "name": "Sol de Janeiro Cheirosa 59 Body Mist",
    "slug": "sol-de-janeiro-cheirosa-59-body-mist-new-arrivals",
    "brandSlug": "sol-de-janeiro",
    "categorySlug": "new-arrivals",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Velvet Plum, Sugared Violet.",
    "description": "Sol de Janeiro Cheirosa 59 Body Mist by SOL-DE-JANEIRO is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Velvet Plum, Sugared Violet, moving into a seductive heart of Vanilla Orchid, Whipped Amber, and resting upon a long-lasting base of Sheer Sandalwood, Fresh Vetiver.",
    "price": 3200,
    "discount_price": 2499,
    "stock": 75,
    "volume_ml": 240,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Velvet Plum",
      "Sugared Violet"
    ],
    "heart_notes": [
      "Vanilla Orchid",
      "Whipped Amber"
    ],
    "base_notes": [
      "Sheer Sandalwood",
      "Fresh Vetiver"
    ],
    "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1747916148863-7164d8920b57?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1753389665531-668543c597cc?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 245
  },
  {
    "name": "Dior Sauvage Eau de Toilette",
    "slug": "dior-sauvage-eau-de-toilette-best-sellers",
    "brandSlug": "dior",
    "categorySlug": "best-sellers",
    "gender": "Men",
    "short_description": "Eau De Toilette featuring notes of Calabrian Bergamot, Pepper.",
    "description": "Dior Sauvage Eau de Toilette by DIOR is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Calabrian Bergamot, Pepper, moving into a seductive heart of Sichuan Pepper, Lavender, Pink Pepper, Vetiver, and resting upon a long-lasting base of Ambroxan, Cedar, Labdanum.",
    "price": 8900,
    "discount_price": 7200,
    "stock": 27,
    "volume_ml": 100,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Calabrian Bergamot",
      "Pepper"
    ],
    "heart_notes": [
      "Sichuan Pepper",
      "Lavender",
      "Pink Pepper",
      "Vetiver"
    ],
    "base_notes": [
      "Ambroxan",
      "Cedar",
      "Labdanum"
    ],
    "image_url": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 274
  },
  {
    "name": "Chanel Bleu de Chanel Eau de Parfum",
    "slug": "chanel-bleu-de-chanel-eau-de-parfum-best-sellers",
    "brandSlug": "chanel",
    "categorySlug": "best-sellers",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Grapefruit, Lemon, Mint.",
    "description": "Chanel Bleu de Chanel Eau de Parfum by CHANEL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Grapefruit, Lemon, Mint, moving into a seductive heart of Ginger, Nutmeg, Jasmine, and resting upon a long-lasting base of Incense, Amber, Cedarwood, Patchouli.",
    "price": 11500,
    "discount_price": 9900,
    "stock": 34,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Grapefruit",
      "Lemon",
      "Mint"
    ],
    "heart_notes": [
      "Ginger",
      "Nutmeg",
      "Jasmine"
    ],
    "base_notes": [
      "Incense",
      "Amber",
      "Cedarwood",
      "Patchouli"
    ],
    "image_url": "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 303
  },
  {
    "name": "Yves Saint Laurent Black Opium",
    "slug": "yves-saint-laurent-black-opium-best-sellers",
    "brandSlug": "ysl",
    "categorySlug": "best-sellers",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Pear, Pink Pepper, Orange Blossom.",
    "description": "Yves Saint Laurent Black Opium by YSL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Pear, Pink Pepper, Orange Blossom, moving into a seductive heart of Coffee, Jasmine, Bitter Almond, Licorice, and resting upon a long-lasting base of Vanilla, Patchouli, Cedar, Cashmere Wood.",
    "price": 9600,
    "discount_price": 7990,
    "stock": 41,
    "volume_ml": 90,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Pear",
      "Pink Pepper",
      "Orange Blossom"
    ],
    "heart_notes": [
      "Coffee",
      "Jasmine",
      "Bitter Almond",
      "Licorice"
    ],
    "base_notes": [
      "Vanilla",
      "Patchouli",
      "Cedar",
      "Cashmere Wood"
    ],
    "image_url": "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.9,
    "review_count": 92
  },
  {
    "name": "Giorgio Armani Acqua Di Gio Pour Homme",
    "slug": "giorgio-armani-acqua-di-gio-pour-homme-best-sellers",
    "brandSlug": "armani",
    "categorySlug": "best-sellers",
    "gender": "Men",
    "short_description": "Eau De Toilette featuring notes of Lime, Lemon, Bergamot, Jasmine, Orange.",
    "description": "Giorgio Armani Acqua Di Gio Pour Homme by ARMANI is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Lime, Lemon, Bergamot, Jasmine, Orange, moving into a seductive heart of Sea Notes, Peach, Freesia, Cyclamen, and resting upon a long-lasting base of White Musk, Cedar, Oakmoss, Patchouli.",
    "price": 7900,
    "discount_price": 6490,
    "stock": 48,
    "volume_ml": 100,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Lime",
      "Lemon",
      "Bergamot",
      "Jasmine",
      "Orange"
    ],
    "heart_notes": [
      "Sea Notes",
      "Peach",
      "Freesia",
      "Cyclamen"
    ],
    "base_notes": [
      "White Musk",
      "Cedar",
      "Oakmoss",
      "Patchouli"
    ],
    "image_url": "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.6,
    "review_count": 121
  },
  {
    "name": "Creed Aventus Eau de Parfum",
    "slug": "creed-aventus-eau-de-parfum-best-sellers",
    "brandSlug": "creed",
    "categorySlug": "best-sellers",
    "gender": "Men",
    "short_description": "Extrait De Parfum (Luxury) featuring notes of Pineapple, Bergamot, Blackcurrant, Apple.",
    "description": "Creed Aventus Eau de Parfum by CREED is an exquisite Extrait De Parfum (Luxury) crafted for discerning fragrance lovers. Opening with luminous Pineapple, Bergamot, Blackcurrant, Apple, moving into a seductive heart of Birch, Patchouli, Moroccan Jasmine, Rose, and resting upon a long-lasting base of Musk, Oakmoss, Ambergris, Vanille.",
    "price": 28500,
    "discount_price": 24900,
    "stock": 55,
    "volume_ml": 100,
    "concentration": "Extrait De Parfum (Luxury)",
    "top_notes": [
      "Pineapple",
      "Bergamot",
      "Blackcurrant",
      "Apple"
    ],
    "heart_notes": [
      "Birch",
      "Patchouli",
      "Moroccan Jasmine",
      "Rose"
    ],
    "base_notes": [
      "Musk",
      "Oakmoss",
      "Ambergris",
      "Vanille"
    ],
    "image_url": "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.7,
    "review_count": 150
  },
  {
    "name": "Tom Ford Tobacco Vanille",
    "slug": "tom-ford-tobacco-vanille-best-sellers",
    "brandSlug": "tom-ford",
    "categorySlug": "best-sellers",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Tobacco Leaf, Spicy Notes.",
    "description": "Tom Ford Tobacco Vanille by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Tobacco Leaf, Spicy Notes, moving into a seductive heart of Tonka Bean, Tobacco Blossom, Vanilla, Cacao, and resting upon a long-lasting base of Dried Fruit Accord, Woody Notes.",
    "price": 18500,
    "discount_price": 15900,
    "stock": 62,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Tobacco Leaf",
      "Spicy Notes"
    ],
    "heart_notes": [
      "Tonka Bean",
      "Tobacco Blossom",
      "Vanilla",
      "Cacao"
    ],
    "base_notes": [
      "Dried Fruit Accord",
      "Woody Notes"
    ],
    "image_url": "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595389294696-ae969ff733a8?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": true,
    "rating": 4.8,
    "review_count": 179
  },
  {
    "name": "Maison Francis Kurkdjian Baccarat Rouge 540",
    "slug": "maison-francis-kurkdjian-baccarat-rouge-540-best-sellers",
    "brandSlug": "mfk",
    "categorySlug": "best-sellers",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Blood Orange, Saffron.",
    "description": "Maison Francis Kurkdjian Baccarat Rouge 540 by MFK is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Blood Orange, Saffron, moving into a seductive heart of Hedione, Ambergris, and resting upon a long-lasting base of Cedarwood, Oakmoss.",
    "price": 24500,
    "discount_price": 21200,
    "stock": 69,
    "volume_ml": 70,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Blood Orange",
      "Saffron"
    ],
    "heart_notes": [
      "Hedione",
      "Ambergris"
    ],
    "base_notes": [
      "Cedarwood",
      "Oakmoss"
    ],
    "image_url": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595389294696-ae969ff733a8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 208
  },
  {
    "name": "Versace Eros Pour Homme",
    "slug": "versace-eros-pour-homme-best-sellers",
    "brandSlug": "versace",
    "categorySlug": "best-sellers",
    "gender": "Men",
    "short_description": "Eau De Toilette featuring notes of Mint Leaves, Italian Lemon Zest, Green Apple.",
    "description": "Versace Eros Pour Homme by VERSACE is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Mint Leaves, Italian Lemon Zest, Green Apple, moving into a seductive heart of Tonka Bean, Amber, Geranium Flower, and resting upon a long-lasting base of Vanilla, Cedarwood from Atlas and Virginia, Vetiver.",
    "price": 6800,
    "discount_price": 5499,
    "stock": 76,
    "volume_ml": 100,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Mint Leaves",
      "Italian Lemon Zest",
      "Green Apple"
    ],
    "heart_notes": [
      "Tonka Bean",
      "Amber",
      "Geranium Flower"
    ],
    "base_notes": [
      "Vanilla",
      "Cedarwood from Atlas and Virginia",
      "Vetiver"
    ],
    "image_url": "https://images.unsplash.com/photo-1595389294696-ae969ff733a8?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1595389294696-ae969ff733a8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 237
  },
  {
    "name": "Chanel Coco Mademoiselle",
    "slug": "chanel-coco-mademoiselle-best-sellers",
    "brandSlug": "chanel",
    "categorySlug": "best-sellers",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Orange, Mandarin, Orange Blossom, Bergamot.",
    "description": "Chanel Coco Mademoiselle by CHANEL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Orange, Mandarin, Orange Blossom, Bergamot, moving into a seductive heart of Mimosa, Jasmine, Turkish Rose, Ylang-Ylang, and resting upon a long-lasting base of Tonka Bean, Patchouli, Opoponax, Vanilla.",
    "price": 12500,
    "discount_price": 10800,
    "stock": 28,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Orange",
      "Mandarin",
      "Orange Blossom",
      "Bergamot"
    ],
    "heart_notes": [
      "Mimosa",
      "Jasmine",
      "Turkish Rose",
      "Ylang-Ylang"
    ],
    "base_notes": [
      "Tonka Bean",
      "Patchouli",
      "Opoponax",
      "Vanilla"
    ],
    "image_url": "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 266
  },
  {
    "name": "Dior J'adore Eau de Parfum",
    "slug": "dior-j-adore-eau-de-parfum-best-sellers",
    "brandSlug": "dior",
    "categorySlug": "best-sellers",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Pear, Melon, Magnolia, Peach, Mandarin.",
    "description": "Dior J'adore Eau de Parfum by DIOR is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Pear, Melon, Magnolia, Peach, Mandarin, moving into a seductive heart of Jasmine, Lily-of-the-Valley, Tuberose, Freesia, and resting upon a long-lasting base of Musk, Vanilla, Blackberry, Cedar.",
    "price": 11800,
    "discount_price": 9990,
    "stock": 35,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Pear",
      "Melon",
      "Magnolia",
      "Peach",
      "Mandarin"
    ],
    "heart_notes": [
      "Jasmine",
      "Lily-of-the-Valley",
      "Tuberose",
      "Freesia"
    ],
    "base_notes": [
      "Musk",
      "Vanilla",
      "Blackberry",
      "Cedar"
    ],
    "image_url": "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 295
  },
  {
    "name": "Yves Saint Laurent Libre",
    "slug": "yves-saint-laurent-libre-best-sellers",
    "brandSlug": "ysl",
    "categorySlug": "best-sellers",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of French Lavender, Mandarin Orange, Blackcurrant.",
    "description": "Yves Saint Laurent Libre by YSL is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous French Lavender, Mandarin Orange, Blackcurrant, moving into a seductive heart of Orange Blossom, Sambac Jasmine, and resting upon a long-lasting base of Madagascar Vanilla, Ambergris, Cedar.",
    "price": 9800,
    "discount_price": 8200,
    "stock": 42,
    "volume_ml": 90,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "French Lavender",
      "Mandarin Orange",
      "Blackcurrant"
    ],
    "heart_notes": [
      "Orange Blossom",
      "Sambac Jasmine"
    ],
    "base_notes": [
      "Madagascar Vanilla",
      "Ambergris",
      "Cedar"
    ],
    "image_url": "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 84
  },
  {
    "name": "Davidoff Cool Water Man",
    "slug": "davidoff-cool-water-man-best-sellers",
    "brandSlug": "davidoff",
    "categorySlug": "best-sellers",
    "gender": "Men",
    "short_description": "Eau De Toilette featuring notes of Sea Water, Mint, Lavender, Coriander.",
    "description": "Davidoff Cool Water Man by DAVIDOFF is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Sea Water, Mint, Lavender, Coriander, moving into a seductive heart of Sandalwood, Jasmine, Neroli, Geranium, and resting upon a long-lasting base of Musk, Oakmoss, Cedar, Tobacco, Amber.",
    "price": 4200,
    "discount_price": 2999,
    "stock": 49,
    "volume_ml": 125,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Sea Water",
      "Mint",
      "Lavender",
      "Coriander"
    ],
    "heart_notes": [
      "Sandalwood",
      "Jasmine",
      "Neroli",
      "Geranium"
    ],
    "base_notes": [
      "Musk",
      "Oakmoss",
      "Cedar",
      "Tobacco",
      "Amber"
    ],
    "image_url": "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 113
  },
  {
    "name": "Gucci Bloom",
    "slug": "gucci-bloom-best-sellers",
    "brandSlug": "gucci",
    "categorySlug": "best-sellers",
    "gender": "Women",
    "short_description": "Eau De Parfum featuring notes of Rangoon Creeper.",
    "description": "Gucci Bloom by GUCCI is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Rangoon Creeper, moving into a seductive heart of Tuberose Bud, and resting upon a long-lasting base of Jasmine Extract.",
    "price": 9200,
    "discount_price": 7600,
    "stock": 56,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Rangoon Creeper"
    ],
    "heart_notes": [
      "Tuberose Bud"
    ],
    "base_notes": [
      "Jasmine Extract"
    ],
    "image_url": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 142
  },
  {
    "name": "Lattafa Khamrah",
    "slug": "lattafa-khamrah-best-sellers",
    "brandSlug": "lattafa",
    "categorySlug": "best-sellers",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Cinnamon, Nutmeg, Bergamot.",
    "description": "Lattafa Khamrah by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Cinnamon, Nutmeg, Bergamot, moving into a seductive heart of Dates, Praline, Tuberose, Mahonial, and resting upon a long-lasting base of Vanilla, Tonka Bean, Benzoin, Myrrh, Amberwood.",
    "price": 3499,
    "discount_price": 2399,
    "stock": 63,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Cinnamon",
      "Nutmeg",
      "Bergamot"
    ],
    "heart_notes": [
      "Dates",
      "Praline",
      "Tuberose",
      "Mahonial"
    ],
    "base_notes": [
      "Vanilla",
      "Tonka Bean",
      "Benzoin",
      "Myrrh",
      "Amberwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 171
  },
  {
    "name": "Versace Bright Crystal",
    "slug": "versace-bright-crystal-best-sellers",
    "brandSlug": "versace",
    "categorySlug": "best-sellers",
    "gender": "Women",
    "short_description": "Eau De Toilette featuring notes of Yuzu, Pomegranate, Ice Accord.",
    "description": "Versace Bright Crystal by VERSACE is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Yuzu, Pomegranate, Ice Accord, moving into a seductive heart of Peony, Lotus, Magnolia, and resting upon a long-lasting base of Musk, Mahogany, Amber.",
    "price": 6500,
    "discount_price": 5190,
    "stock": 70,
    "volume_ml": 90,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Yuzu",
      "Pomegranate",
      "Ice Accord"
    ],
    "heart_notes": [
      "Peony",
      "Lotus",
      "Magnolia"
    ],
    "base_notes": [
      "Musk",
      "Mahogany",
      "Amber"
    ],
    "image_url": "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 200
  },
  {
    "name": "Tom Ford Oud Wood",
    "slug": "tom-ford-oud-wood-best-sellers",
    "brandSlug": "tom-ford",
    "categorySlug": "best-sellers",
    "gender": "Unisex",
    "short_description": "Eau De Parfum featuring notes of Rosewood, Cardamom.",
    "description": "Tom Ford Oud Wood by TOM-FORD is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Rosewood, Cardamom, moving into a seductive heart of Oud Wood, Sandalwood, Vetiver, and resting upon a long-lasting base of Tonka Bean, Vanilla, Amber.",
    "price": 19800,
    "discount_price": 16900,
    "stock": 77,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Rosewood",
      "Cardamom"
    ],
    "heart_notes": [
      "Oud Wood",
      "Sandalwood",
      "Vetiver"
    ],
    "base_notes": [
      "Tonka Bean",
      "Vanilla",
      "Amber"
    ],
    "image_url": "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 229
  },
  {
    "name": "Victoria's Secret Bare Vanilla",
    "slug": "victoria-s-secret-bare-vanilla-best-sellers",
    "brandSlug": "victorias-secret",
    "categorySlug": "best-sellers",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Whipped Vanilla.",
    "description": "Victoria's Secret Bare Vanilla by VICTORIAS-SECRET is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Whipped Vanilla, moving into a seductive heart of Soft Cashmere, and resting upon a long-lasting base of Skin Musk.",
    "price": 2499,
    "discount_price": 1699,
    "stock": 29,
    "volume_ml": 250,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Whipped Vanilla"
    ],
    "heart_notes": [
      "Soft Cashmere"
    ],
    "base_notes": [
      "Skin Musk"
    ],
    "image_url": "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.7,
    "review_count": 258
  },
  {
    "name": "Sol de Janeiro Cheirosa 62",
    "slug": "sol-de-janeiro-cheirosa-62-best-sellers",
    "brandSlug": "sol-de-janeiro",
    "categorySlug": "best-sellers",
    "gender": "Women",
    "short_description": "Fragrance Body Mist featuring notes of Pistachio, Almond.",
    "description": "Sol de Janeiro Cheirosa 62 by SOL-DE-JANEIRO is an exquisite Fragrance Body Mist crafted for discerning fragrance lovers. Opening with luminous Pistachio, Almond, moving into a seductive heart of Heliotrope, Jasmine Petals, and resting upon a long-lasting base of Salted Caramel, Vanilla, Sandalwood.",
    "price": 3200,
    "discount_price": 2499,
    "stock": 36,
    "volume_ml": 240,
    "concentration": "Fragrance Body Mist",
    "top_notes": [
      "Pistachio",
      "Almond"
    ],
    "heart_notes": [
      "Heliotrope",
      "Jasmine Petals"
    ],
    "base_notes": [
      "Salted Caramel",
      "Vanilla",
      "Sandalwood"
    ],
    "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.8,
    "review_count": 287
  },
  {
    "name": "Giorgio Armani Code Pour Homme",
    "slug": "giorgio-armani-code-pour-homme-best-sellers",
    "brandSlug": "armani",
    "categorySlug": "best-sellers",
    "gender": "Men",
    "short_description": "Eau De Toilette featuring notes of Bergamot, Lemon.",
    "description": "Giorgio Armani Code Pour Homme by ARMANI is an exquisite Eau De Toilette crafted for discerning fragrance lovers. Opening with luminous Bergamot, Lemon, moving into a seductive heart of Star Anise, Olive Blossom, Guaiac Wood, and resting upon a long-lasting base of Leather, Tobacco, Tonka Bean.",
    "price": 8600,
    "discount_price": 7100,
    "stock": 43,
    "volume_ml": 75,
    "concentration": "Eau De Toilette",
    "top_notes": [
      "Bergamot",
      "Lemon"
    ],
    "heart_notes": [
      "Star Anise",
      "Olive Blossom",
      "Guaiac Wood"
    ],
    "base_notes": [
      "Leather",
      "Tobacco",
      "Tonka Bean"
    ],
    "image_url": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.9,
    "review_count": 76
  },
  {
    "name": "Lattafa Asad",
    "slug": "lattafa-asad-best-sellers",
    "brandSlug": "lattafa",
    "categorySlug": "best-sellers",
    "gender": "Men",
    "short_description": "Eau De Parfum featuring notes of Black Pepper, Pineapple, Tobacco.",
    "description": "Lattafa Asad by LATTAFA is an exquisite Eau De Parfum crafted for discerning fragrance lovers. Opening with luminous Black Pepper, Pineapple, Tobacco, moving into a seductive heart of Coffee, Patchouli, Iris, and resting upon a long-lasting base of Amber, Vanilla, Dry Woods, Benzoin, Labdanum.",
    "price": 2999,
    "discount_price": 1999,
    "stock": 50,
    "volume_ml": 100,
    "concentration": "Eau De Parfum",
    "top_notes": [
      "Black Pepper",
      "Pineapple",
      "Tobacco"
    ],
    "heart_notes": [
      "Coffee",
      "Patchouli",
      "Iris"
    ],
    "base_notes": [
      "Amber",
      "Vanilla",
      "Dry Woods",
      "Benzoin",
      "Labdanum"
    ],
    "image_url": "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
    "gallery_urls": [
      "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80"
    ],
    "is_featured": false,
    "rating": 4.6,
    "review_count": 105
  }
];

module.exports = {
  categoriesData,
  brandsData,
  productsData
};
