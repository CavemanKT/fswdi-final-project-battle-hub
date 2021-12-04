const bcrypt = require('bcrypt')

const { Faker } = require('fakergem')
const { User, Profile, Invitation, History } = require('../models')

const weapons = ['Rusted Hatchet', 'Jade Hatchet', 'Boarding Axe', 'Cleaver', 'Broad Axe', 'Arming Axe', 'Decorative Axe', 'Maltreatment Axe', 'Spectral Axe', 'Etched Hatchet', 'Jasper Axe', 'Tomahawk', 'Wrist Chopper', 'War Axe', 'Chest Splitter', 'Disapprobation Axe', 'Ceremonial Axe', 'Wraith Axe', 'Engraved Hatchet', 'Karui Axe', 'Siege Axe', 'Reaver Axe', 'Butcher Axe', 'Vaal Hatchet', 'Royal Axe', 'Infernal Axe', 'Psychotic Axe', 'Runic Hatchet', 'Stone Axe', 'Jade Chopper', 'Woodsplitter', 'Poleaxe', 'Double Axe', 'Gilded Axe', 'Prime Cleaver', 'Shadow Axe', 'Dagger Axe', 'Jasper Chopper', 'Timber Axe', 'Headsman Axe', 'Labrys', 'Honed Cleaver', 'Noble Axe', 'Abyssal Axe', 'Karui Chopper', 'Talon Axe', 'Sundering Axe', 'Ezomyte Axe', 'Vaal Axe', 'Despot Axe', 'Void Axe', 'Apex Cleaver', 'Fleshripper', 'The Screaming Eagle', 'Dreadarc', 'Relentless Fury', 'The Gryphon', "Moonbender's Wing", 'Replica Soul Taker', 'Soul Taker', 'Dreadsurge', 'Actum', 'Jack, the Axe', "Rigwald's Savagery", 'Dyadus', 'Limbsplit', 'Wideswing', "Reaper's Pursuit", 'Replica Harvest', 'The Harvest', 'The Cauteriser', 'The Blood Reaper', "Uul-Netol's Kiss", "Ngamahu's Flame", "Kaom's Primacy", 'Replica Wings of Entropy', "Sinvicta's Mettle", 'Wings of Entropy', "Hezmana's Bloodlust", "Uul-Netol's Embrace", "Debeon's Dirge", 'Kingmaker', "Kitava's Feast", "Atziri's Disfavour"]

const amulets = ['Coral Amulet', 'Paua Amulet', 'Amber Amulet', 'Jade Amulet', 'Lapis Amulet', 'Gold Amulet', 'Agate Amulet', 'Citrine Amulet', 'Turquoise Amulet', 'Onyx Amulet', 'Simplex Amulet', 'Astrolabe Amulet', 'Marble Amulet', 'Seaglass Amulet', 'Blue Pearl Amulet', 'Ashscale Talisman', 'Avian Twins Talisman', 'Avian Twins Talisman', 'Avian Twins Talisman', 'Avian Twins Talisman', 'Avian Twins Talisman', 'Avian Twins Talisman', 'Black Maw Talisman', 'Bonespire Talisman', 'Breakrib Talisman', 'Chrysalis Talisman', 'Clutching Talisman', 'Deadhand Talisman', 'Deep One Talisman', 'Fangjaw Talisman', 'Hexclaw Talisman', 'Horned Talisman', 'Lone Antler Talisman', 'Longtooth Talisman', 'Mandible Talisman', 'Monkey Paw Talisman', 'Monkey Paw Talisman', 'Monkey Paw Talisman', 'Monkey Twins Talisman', 'Primal Skull Talisman', 'Rot Head Talisman', 'Rotfeather Talisman', 'Spinefuse Talisman', 'Splitnewt Talisman', 'Three Hands Talisman', 'Three Rat Talisman', 'Undying Flesh Talisman', 'Wereclaw Talisman', 'Writhing Talisman', 'Jet Amulet', 'Greatwolf Talisman', 'Ruby Amulet', 'Araku Tiki', 'Sidhebreath', 'Karui Ward', 'Replica Karui Ward', 'Stone of Lazhwar', 'The Ascetic', 'The Ignomon', "Night's Hold", "Atziri's Foible", "Daresso's Salute", 'Extractor Mentis', "Replica Atziri's Foible", "Shaper's Seed", "Victario's Acuity", 'Astramentis', 'Blood of Corruption', 'Carnage Heart', 'Eye of Chayula', "Hinekora's Sight", "Maligaro's Cruelty", 'Tear of Purity', "Ungil's Harmony", 'Karui Charge', 'Blightwell', "Rigwald's Curse", 'Star of Wraeclast', "Perquil's Toe", "Bisco's Collar", 'Retaliation Charm', 'Sacrificial Heart', 'The Aylardex', "Voll's Devotion", 'The Primordial Chain', 'The Halcyon', "Xoph's Heart", 'Ngamahu Tiki', 'Fury Valve', "Marylene's Fallacy", 'Voice of the Storm', 'Replica Winterheart', 'Winterheart', 'Natural Hierarchy', 'The Anvil', 'The Jinxed Juju', 'Warped Timepiece', 'Eyes of the Greatwolf', 'Willowgift', 'Tavukai']

const armours = ['Plate Vest', 'Chestplate', 'Copper Plate', 'War Plate', 'Full Plate', 'Arena Plate', 'Lordly Plate', 'Bronze Plate', 'Battle Plate', 'Sun Plate', 'Colosseum Plate', 'Majestic Plate', 'Golden Plate', 'Crusader Plate', 'Astral Plate', 'Gladiator Plate', 'Glorious Plate', 'Shabby Jerkin', 'Strapped Leather', 'Buckskin Tunic', 'Wild Leather', 'Full Leather', 'Sun Leather', "Thief's Garb", 'Eelskin Tunic', 'Frontier Leather', 'Glorious Leather', 'Coronal Leather', "Cutthroat's Garb", 'Sharkskin Tunic', 'Destiny Leather', 'Exquisite Leather', 'Zodiac Leather', "Assassin's Garb", 'Simple Robe', 'Silken Vest', "Scholar's Robe", 'Silken Garb', "Mage's Vestment", 'Silk Robe', 'Cabalist Regalia', "Sage's Robe", 'Silken Wrap', "Conjurer's Vestment", 'Spidersilk Robe', 'Destroyer Regalia', "Savant's Robe", 'Necromancer Silks', "Occultist's Vestment", 'Widowsilk Robe', 'Vaal Regalia', 'Scale Vest', 'Light Brigandine', 'Scale Doublet', 'Infantry Brigandine', 'Full Scale Armour', "Soldier's Brigandine", 'Field Lamellar', 'Wyrmscale Doublet', 'Hussar Brigandine', 'Full Wyrmscale', "Commander's Brigandine", 'Battle Lamellar', 'Dragonscale Doublet', 'Desert Brigandine', 'Full Dragonscale', "General's Brigandine", 'Triumphant Lamellar', 'Chainmail Vest', 'Chainmail Tunic', 'Ringmail Coat', 'Chainmail Doublet', 'Full Ringmail', 'Full Chainmail', 'Holy Chainmail', 'Latticed Ringmail', 'Crusader Chainmail', 'Ornate Ringmail', 'Chain Hauberk', 'Devout Chainmail', 'Loricated Ringmail', 'Conquest Chainmail', 'Elegant Ringmail', "Saint's Hauberk", 'Saintly Chainmail', 'Padded Vest', 'Oiled Vest', 'Padded Jacket', 'Oiled Coat', 'Scarlet Raiment', 'Waxed Garb', 'Bone Armour', 'Quilted Jacket', 'Sleek Coat', 'Crimson Raiment', 'Lacquered Garb', 'Crypt Armour', 'Sentinel Jacket', 'Varnished Coat', 'Blood Raiment']

const boots = ['Iron Greaves', 'Steel Greaves', 'Basemetal Treads', 'Plated Greaves', 'Reinforced Greaves', 'Antique Greaves', 'Ancient Greaves', 'Darksteel Treads', 'Goliath Greaves', 'Vaal Greaves', 'Titan Greaves', 'Brimstone Treads', 'Rawhide Boots', 'Goathide Boots', 'Cloudwhisper Boots', 'Deerskin Boots', 'Nubuck Boots', 'Eelskin Boots', 'Sharkskin Boots', 'Windbreak Boots', 'Shagreen Boots', 'Stealth Boots', 'Slink Boots', 'Stormrider Boots', 'Wool Shoes', 'Velvet Slippers', 'Duskwalk Slippers', 'Silk Slippers', 'Scholar Boots', 'Satin Slippers', 'Samite Slippers', 'Nightwind Slippers', 'Conjurer Boots', 'Arcanist Slippers', 'Sorcerer Boots', 'Dreamquest Slippers', 'Leatherscale Boots', 'Ironscale Boots', 'Bronzescale Boots', 'Steelscale Boots', 'Serpentscale Boots', 'Wyrmscale Boots', 'Hydrascale Boots', 'Dragonscale Boots', 'Two-Toned Boots', 'Chain Boots', 'Ringmail Boots', 'Mesh Boots', 'Riveted Boots', 'Zealot Boots', 'Soldier Boots', 'Legion Boots', 'Crusader Boots', 'Two-Toned Boots', 'Wrapped Boots', 'Strapped Boots', 'Clasped Boots', 'Shackled Boots', 'Trapper Boots', 'Ambush Boots', 'Carnal Boots', "Assassin's Boots", 'Murder Boots', 'Fugitive Boots', 'Two-Toned Boots']

const genRandProfileId = (i, maxi) => {
  const randProfileId = Math.floor(Math.random() * maxi)
  if (randProfileId === 0) {
    return genRandProfileId(i, maxi)
  }
  return randProfileId
}

const genRandNum = (i) => {
  const randNum = Math.floor(Math.random() * 30)
  if (randNum === i && randNum === 0) {
    return genRandNum(i)
  }
  return randNum
}

const genRandResult = () => {
  const num = Math.floor(Math.random() * 33)
  // eslint-disable-next-line no-nested-ternary
  const randResult = num < 12 ? 'won' : num < 23 ? 'lost' : 'draw'
  return randResult
}

// generate a time stamp for createdAt
const genRandDay = () => {
  const randDay = Math.floor(Math.random() * 27) + 1
  return randDay
}

const genRandMonth = () => {
  const randMonth = Math.floor(Math.random() * 12) + 1
  if (randMonth > 12) {
    return genRandMonth()
  }
  return randMonth
}

const genRandYear = () => {
  const randYear = 2010
  return randYear
}

const genRandDate = () => {
  const randDay = genRandDay()
  const randMonth = genRandMonth()
  const randYear = genRandYear()

  const randDate = `${randYear}-${randMonth}-${randDay} 13:29:29.516+08`
  return randDate
}

module.exports = {
  up: async () => {
    await User.destroy({ truncate: true })
    await Profile.destroy({ truncate: true })
    await Invitation.destroy({ truncate: true })
    await History.destroy({ truncate: true })

    const passwordHash = await bcrypt.hash('123123', 10)

    // create User-candidate
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 31; i++) {
      await User.create({
        name: `${Faker.Name.firstName()} ${Faker.Name.lastName()}`,
        email: `${i}@test.com`,
        passwordHash,
        registrationType: 'email',
        type: 'candidate'
      })
    }

    // create User-inspector
    await User.create({
      name: 'Inspector',
      email: '1@inspector.com',
      passwordHash,
      registrationType: 'email',
      type: 'inspector'
    })

    for (let i = 1; i <= 30; i++) {
      await Profile.create({
        characterName: Faker.Internet.userName(),
        gameTitle: 'Path of Exile',
        weapon: weapons[i],
        amulet: amulets[i],
        armour: armours[i],
        boots: boots[i],
        UserId: i
      })
      await Invitation.create({
        profile1: genRandNum(i),
        profile2: genRandNum(i),
        status: 'pending'
      })
    }
    for (let i = 1; i <= 200; i++) {
      await History.create({
        ProfileId: genRandProfileId(1, 20),
        result: genRandResult(),
        createdAt: genRandDate()
      })
    }
  }

}
