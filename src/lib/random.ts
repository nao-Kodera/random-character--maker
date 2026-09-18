import {
  ageGroups,
  bodyTypes,
  colors,
  features,
  genders,
  hairLengths,
  hairStyles,
  heights,
  keywords,
  occupations,
  races,
  type Character,
  type CharacterFieldKey,
} from "@/data/characterOptions";

export function pickRandom<T>(options: readonly T[]): T {
  return options[Math.floor(Math.random() * options.length)]!;
}

export function pickUniqueRandom<T>(options: readonly T[], count: number): T[] {
  if (count > options.length) throw new Error("候補数を超える数は抽選できません。");
  const pool = [...options];
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[randomIndex]] = [pool[randomIndex]!, pool[index]!];
  }
  return pool.slice(0, count);
}

export function rollD6(): number {
  return Math.floor(Math.random() * 6) + 1;
}

export function roll2D6(): [number, number] {
  return [rollD6(), rollD6()];
}

export function generateCharacter(): Character {
  return {
    gender: pickRandom(genders),
    ageGroup: pickRandom(ageGroups),
    race: pickRandom(races),
    occupation: pickRandom(occupations),
    height: pickRandom(heights),
    bodyType: pickRandom(bodyTypes),
    hairLength: pickRandom(hairLengths),
    hairStyle: pickRandom(hairStyles),
    features: pickUniqueRandom(features, 2) as Character["features"],
    colors: pickUniqueRandom(colors, 2) as Character["colors"],
    keywords: pickUniqueRandom(keywords, 2) as Character["keywords"],
    dice: roll2D6(),
  };
}

export function rerollCharacterField(character: Character, field: CharacterFieldKey): Character {
  const next = generateCharacter();
  return { ...character, [field]: next[field] };
}
