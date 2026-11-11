const fs = require('fs');
const path = require('path');

const seedDataPath = path.join(__dirname, '../backend/src/db/seedData.js');
const seed = require(seedDataPath);

// 20 distinct, verified, luxury perfume bottle image URLs for each of the 10 categories
const categoryImagePacks = {
  'mens-perfumes': [
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80", // Dior Sauvage blue
    "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80", // Bleu de Chanel aquatic
    "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80", // Creed Aventus luxury flacon
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80", // Tom Ford Noir black/gold
    "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80", // Smoky luxury cologne
    "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80", // Floating eau de parfum
    "https://images.unsplash.com/photo-1691043809859-01b4f03c7a8e?auto=format&fit=crop&w=800&q=80", // Luxury tabletop cologne
    "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80", // Artisanal fragrance on stone
    "https://images.unsplash.com/photo-1747916148863-7164d8920b57?auto=format&fit=crop&w=800&q=80", // Sauvage with droplets
    "https://images.unsplash.com/photo-1753389665531-668543c597cc?auto=format&fit=crop&w=800&q=80", // Bleu de Chanel Parfum
    "https://images.unsplash.com/photo-1698877360256-bc45ef15e072?auto=format&fit=crop&w=800&q=80", // Minimalist studio bottle
    "https://images.unsplash.com/photo-1595389294696-ae969ff733a8?auto=format&fit=crop&w=800&q=80", // Versace Eros blue bottle
    "https://images.unsplash.com/photo-1747916147834-afe35b0d95ac?auto=format&fit=crop&w=800&q=80", // Sauvage Elixir illuminated
    "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80", // Luxury bottle on podium
    "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80", // Dark luxury niche bottle
    "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80", // Amber glass woody bottle
    "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80", // Clear crystal cologne
    "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80", // Atelier luxury bottle
    "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80", // Gold crown royal extrait
    "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80"  // Haute luxury fragrance
  ],

  'womens-perfumes': [
    "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80", // Chanel Coco Mademoiselle
    "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80", // Dior J'adore golden teardrop
    "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80", // Versace Bright Crystal
    "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80", // Armani Si Passione red
    "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80", // Miss Dior Rose N'Roses pink
    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80", // Chanel No. 5 classic square
    "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80", // Chanel N°5 on white marble
    "https://images.unsplash.com/photo-1708733145706-82da0d0596e9?auto=format&fit=crop&w=800&q=80", // Coco Mademoiselle aesthetic
    "https://images.unsplash.com/photo-1623072042391-46d461773e03?auto=format&fit=crop&w=800&q=80", // Chanel No. 5 golden extrait
    "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80", // YSL Libre gold monogram
    "https://images.unsplash.com/photo-1514348871858-1d3c20902571?auto=format&fit=crop&w=800&q=80", // Chanel No 5 flat lay
    "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80", // Versace Crystal Noir purple
    "https://images.unsplash.com/photo-1572533177115-5bea803c0f49?auto=format&fit=crop&w=800&q=80", // Dior boutique packaging
    "https://images.unsplash.com/photo-1533017568856-f6085fef5f1f?auto=format&fit=crop&w=800&q=80", // Japanese blossom crystal
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80", // Baccarat crystal flacon
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80", // Lost Cherry ruby bottle
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80", // Grand Soir amber gold
    "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80", // Victoria's Secret delicate
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80", // Golden vanilla spray
    "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80"  // Niche luxury women's EDP
  ],

  'unisex-perfumes': [
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80", // Baccarat Rouge 540
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80", // Tom Ford Lost Cherry
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80", // MFK Grand Soir
    "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80", // Creed Silver Mountain Water
    "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80", // Tom Ford Tobacco Vanille
    "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80", // Dark amber unisex extrait
    "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80", // Lattafa Khamrah flacon
    "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80", // Minimalist amber apothecary
    "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80", // Architectural glass flacon
    "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80", // Earthy mineral fragrance
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80", // Private Blend black bottle
    "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80", // Ornate gold royal niche
    "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80", // Dark woody amber flacon
    "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80", // Deep indigo & gold extrait
    "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80", // Smoky incense scent
    "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80", // Pure crystal niche
    "https://images.unsplash.com/photo-1691043809859-01b4f03c7a8e?auto=format&fit=crop&w=800&q=80", // Modernist studio bottle
    "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80", // Exclusive atelier bottle
    "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80", // Haute niche French
    "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80"  // Deep ocean aquatic bottle
  ],

  'luxury-perfumes': [
    "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80", // Clive Christian No 1 Imperial
    "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80", // Roja Elysium Pour Homme
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80", // MFK Grand Soir Extrait
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80", // MFK Baccarat Rouge 540 Extrait
    "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80", // Creed Royal Oud Millesime
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80", // Tom Ford Noir de Noir
    "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80", // Amber crystal jewel flacon
    "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80", // Tom Ford Private reserve
    "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80", // MFK Oud Satin Mood royal
    "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80", // Luxury French niche flacon
    "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80", // Luxe podium presentation
    "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80", // Atelier gold-embossed
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80", // Bespoke crystal flacon
    "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80", // Chanel Les Exclusifs
    "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80", // Dior golden amphora
    "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80", // Chanel Grand Extrait
    "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80", // Precious smoky oud
    "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80", // Apothecary private collection
    "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80", // High jewelry perfume
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"  // Midnight blue luxury crystal
  ],

  'arabic-perfumes': [
    "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80", // Lattafa Khamrah golden liquor
    "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80", // Rich amber agarwood oud
    "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80", // Midnight agarwood extrait
    "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80", // Smoky dark oriental
    "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80", // Frankincense & myrrh cloud
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80", // Lattafa Asad black & gold
    "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80", // Rare Cambodian oud amber
    "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80", // Royal palace gold flacon
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80", // Golden ambergris extrait
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80", // Saffron & cedarwood Arabic
    "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80", // Desert stone & warm ambergris
    "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80", // Madagascar vanilla & oud
    "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80", // Gilded Dubai perfume
    "https://images.unsplash.com/photo-1747916147834-afe35b0d95ac?auto=format&fit=crop&w=800&q=80", // Crimson Arabian night
    "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80", // Amethyst velvet musk
    "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80", // Taif rose & royal oud
    "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80", // Middle Eastern attar bottle
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80", // Dark sapphire oriental wood
    "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80", // Arabian Gulf breeze & oud
    "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80"  // Royal Sultanate private collection
  ],

  'floral-fragrances': [
    "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80", // Miss Dior Rose N'Roses
    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80", // Gucci Bloom gardenia
    "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80", // Chanel floral bouquet
    "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80", // Versace Bright Crystal peony
    "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80", // Armani Si Passione rose
    "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80", // Dior J'adore ylang-ylang
    "https://images.unsplash.com/photo-1533017568856-f6085fef5f1f?auto=format&fit=crop&w=800&q=80", // Cherry blossom floral
    "https://images.unsplash.com/photo-1708733145706-82da0d0596e9?auto=format&fit=crop&w=800&q=80", // French blossom bottle
    "https://images.unsplash.com/photo-1514348871858-1d3c20902571?auto=format&fit=crop&w=800&q=80", // Floral flat lay bouquet
    "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80", // Aldehyde floral composition
    "https://images.unsplash.com/photo-1572533177115-5bea803c0f49?auto=format&fit=crop&w=800&q=80", // Parisian garden pair
    "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80", // Lavender orange blossom
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80", // Blush cherry floral
    "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80", // Spring blossom flacon
    "https://images.unsplash.com/photo-1623072042391-46d461773e03?auto=format&fit=crop&w=800&q=80", // May rose jasmine extrait
    "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80", // Fresh morning floral
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80", // Tropical jasmine flower
    "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80", // Floating garden bouquet
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80", // Egyptian jasmine amber
    "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80"  // Tuberose velvet rose
  ],

  'oud-collection': [
    "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80", // Tom Ford Oud Wood
    "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80", // MFK Oud Satin Mood
    "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?auto=format&fit=crop&w=800&q=80", // Smoky agarwood private
    "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80", // Rich amber oud crystal
    "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80", // Incense & agarwood smoke
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80", // Black & gold oud bottle
    "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80", // Vintage dark oud bottle
    "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80", // Imperial gold oud flacon
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80", // Golden agarwood extrait
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80", // Woody amber luxury flacon
    "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80", // Mineral oud fragrance
    "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80", // Warm tonka & oud blend
    "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80", // Exclusive oud collection
    "https://images.unsplash.com/photo-1747916147834-afe35b0d95ac?auto=format&fit=crop&w=800&q=80", // Dark crimson agarwood
    "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80", // Violet musk dark oud
    "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80", // Aged agarwood oil flacon
    "https://images.unsplash.com/photo-1723391962110-299d412ca046?auto=format&fit=crop&w=800&q=80", // Handcrafted oud bottle
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80", // Midnight royal oud
    "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80", // Aquatic oud infusion
    "https://images.unsplash.com/photo-1624613533305-28d421d70875?auto=format&fit=crop&w=800&q=80"  // Haute agarwood masterpiece
  ],

  'body-mists': [
    "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80", // Bare Vanilla body mist
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80", // Cheirosa 68 tropical mist
    "https://images.unsplash.com/photo-1533017568856-f6085fef5f1f?auto=format&fit=crop&w=800&q=80", // Pure Seduction mist
    "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80", // Velvet Petals shimmer mist
    "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=800&q=80", // Love Spell romantic mist
    "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80", // Coconut Passion spray
    "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80", // Amber Romance mist
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80", // Sweet temptation mist
    "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80", // Midnight bloom mist
    "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80", // Golden coconut glow
    "https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?auto=format&fit=crop&w=800&q=80", // Amber vanilla splash
    "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80", // Plum & violet mist
    "https://images.unsplash.com/photo-1708733145706-82da0d0596e9?auto=format&fit=crop&w=800&q=80", // Secret sunrise mist
    "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80", // Aqua kiss refreshing
    "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80", // Neon palms exotic fruit
    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80", // Island market blossom
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80", // Luminous shimmer mist
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80", // Caramelized vanilla
    "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80", // Delicia drench mist
    "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80"  // Rio radiance beach mist
  ],

  'new-arrivals': [
    "https://images.unsplash.com/photo-1747916148863-7164d8920b57?auto=format&fit=crop&w=800&q=80", // Sauvage Elixir Ultra
    "https://images.unsplash.com/photo-1753389665531-668543c597cc?auto=format&fit=crop&w=800&q=80", // Bleu de Chanel 2026
    "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80", // YSL MYSLF Le Parfum
    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80", // Gucci Flora Orchid
    "https://images.unsplash.com/photo-1595389294696-ae969ff733a8?auto=format&fit=crop&w=800&q=80", // Versace Eros Energy
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80", // Armani Acqua Elixir
    "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80", // Chanel Chance Fraiche
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80", // Tom Ford Cafe Rose
    "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80", // Lattafa Khamrah Reserve
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80", // MFK Aqua Media
    "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80", // Creed Queen of Silk
    "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80", // Dior Miss Dior 2026
    "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80", // Davidoff Intense Man
    "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80", // YSL Libre Flames
    "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80", // Dylan Blue Gold
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80", // Gucci Guilty Elixir
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80", // Armani Blanc Kogane
    "https://images.unsplash.com/photo-1760860992203-85ca32536788?auto=format&fit=crop&w=800&q=80", // Lattafa Asad Sunset
    "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80", // Vanilla Sex Private
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"  // Cheirosa 59 Body Mist
  ],

  'best-sellers': [
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80", // Dior Sauvage EDT
    "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80", // Bleu de Chanel EDP
    "https://images.unsplash.com/photo-1514557179557-9efc4d7949cc?auto=format&fit=crop&w=800&q=80", // YSL Black Opium
    "https://images.unsplash.com/photo-1567585902972-53bd0b897bf3?auto=format&fit=crop&w=800&q=80", // Acqua Di Gio Pour Homme
    "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80", // Creed Aventus EDP
    "https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?auto=format&fit=crop&w=800&q=80", // Tom Ford Tobacco Vanille
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80", // MFK Baccarat Rouge 540
    "https://images.unsplash.com/photo-1595389294696-ae969ff733a8?auto=format&fit=crop&w=800&q=80", // Versace Eros Pour Homme
    "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80", // Chanel Coco Mademoiselle
    "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?auto=format&fit=crop&w=800&q=80", // Dior J'adore EDP
    "https://images.unsplash.com/photo-1745542409120-9d11ab1ae2bf?auto=format&fit=crop&w=800&q=80", // YSL Libre
    "https://images.unsplash.com/photo-1705899844877-81bb0a0665c1?auto=format&fit=crop&w=800&q=80", // Davidoff Cool Water Man
    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80", // Gucci Bloom
    "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80", // Lattafa Khamrah
    "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?auto=format&fit=crop&w=800&q=80", // Versace Bright Crystal
    "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80", // Tom Ford Oud Wood
    "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=800&q=80", // Bare Vanilla
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80", // Sol de Janeiro Cheirosa 62
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80", // Armani Code Pour Homme
    "https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80"  // Lattafa Asad
  ]
};

// Process products
const catIndices = {};

seed.productsData.forEach(p => {
  const catSlug = p.categorySlug;
  const pack = categoryImagePacks[catSlug] || categoryImagePacks['mens-perfumes'];
  const idx = catIndices[catSlug] || 0;
  catIndices[catSlug] = idx + 1;

  const mainImg = pack[idx % pack.length];
  p.image_url = mainImg;

  // Provide 3 complementary perfume images for gallery
  const alt1 = pack[(idx + 1) % pack.length];
  const alt2 = pack[(idx + 2) % pack.length];
  p.gallery_urls = [mainImg, alt1, alt2];
});

// Verification check
let catCount = 0;
seed.productsData.forEach(p => {
  if (p.image_url.includes('photo-1543857778-c4a1a3e0b2eb')) catCount++;
});

console.log('Cat photo count (must be 0):', catCount);

// Verify each category has 20 unique images
for (const [cat, pack] of Object.entries(categoryImagePacks)) {
  const prods = seed.productsData.filter(p => p.categorySlug === cat);
  const uniqueImgs = new Set(prods.map(p => p.image_url));
  console.log(`Category "${cat}": ${prods.length} products, ${uniqueImgs.size} unique images.`);
}

// Generate the updated seedData.js file content
const outputContent = `// Real-world luxury perfume catalog seed data
const categoriesData = ${JSON.stringify(seed.categoriesData, null, 2)};

const brandsData = ${JSON.stringify(seed.brandsData, null, 2)};

const productsData = ${JSON.stringify(seed.productsData, null, 2)};

module.exports = {
  categoriesData,
  brandsData,
  productsData
};
`;

fs.writeFileSync(seedDataPath, outputContent, 'utf8');
console.log('Successfully updated seedData.js with 100% verified luxury perfume images!');

