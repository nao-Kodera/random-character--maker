"use client";

import { useState } from "react";
import {
  ageGroups,
  bodyTypes,
  clothes,
  colors,
  features,
  genders,
  hairLengths,
  hairStyles,
  heights,
  keywords,
  occupations,
  races,
  UNSELECTED,
  type Character,
  type CharacterFieldKey,
} from "@/data/characterOptions";
import { createPrompt } from "@/lib/prompt";
import { generateCharacter, rerollCharacterField } from "@/lib/random";
import { CharacterField } from "@/components/CharacterField";
import { PromptOutput } from "@/components/PromptOutput";
import { RandomizeButton } from "@/components/RandomizeButton";

const fieldLabels: Record<CharacterFieldKey, string> = {
  gender: "性別",
  ageGroup: "見た目の年代",
  race: "種族",
  occupation: "職業・外見イメージ",
  height: "身長",
  bodyType: "体つき",
  hairLength: "髪の長さ",
  hairStyle: "髪型",
  clothes: "服装",
  features: "目立つ特徴",
  colors: "イメージカラー",
  keywords: "キーワード",
};

const fieldOrder = Object.keys(fieldLabels) as CharacterFieldKey[];
const scalarOptions = { gender: genders, ageGroup: ageGroups, race: races, occupation: occupations, height: heights, bodyType: bodyTypes, hairLength: hairLengths, hairStyle: hairStyles, clothes } as const;

function withUnselected<T extends string>(options: readonly T[]) {
  return [UNSELECTED, ...options] as const;
}

function makeUnlockedState(): Record<CharacterFieldKey, boolean> {
  return fieldOrder.reduce((locks, key) => ({ ...locks, [key]: false }), {} as Record<CharacterFieldKey, boolean>);
}

export function CharacterGenerator() {
  const [character, setCharacter] = useState<Character>(() => generateCharacter());
  const [locks, setLocks] = useState<Record<CharacterFieldKey, boolean>>(makeUnlockedState);

  const toggleLock = (field: CharacterFieldKey) => {
    setLocks((current) => ({ ...current, [field]: !current[field] }));
  };

  const rerollField = (field: CharacterFieldKey) => {
    if (locks[field]) return;
    setCharacter((current) => rerollCharacterField(current, field));
  };

  const updateField = <Key extends CharacterFieldKey>(field: Key, value: Character[Key]) => {
    setCharacter((current) => ({ ...current, [field]: value }));
  };

  const randomizeUnlocked = () => {
    const nextCharacter = generateCharacter();
    setCharacter((current) => {
      const merged = { ...nextCharacter };
      fieldOrder.forEach((field) => {
        if (locks[field]) merged[field] = current[field] as never;
      });
      return merged;
    });
  };

  const renderSelect = <Value extends string | number>(label: string, value: Value, options: readonly Value[], onChange: (value: Value) => void, isDisabled: boolean) => (
    <label className="select-control">
      <span className="sr-only">{label}</span>
      <select aria-label={label} value={value} disabled={isDisabled} onChange={(event) => onChange(event.target.value as Value)}>
        {options.map((option) => <option value={option} key={option}>{option}</option>)}
      </select>
    </label>
  );

  const valueFor = (field: CharacterFieldKey) => {
    const isLocked = locks[field];
    switch (field) {
      case "features":
        return <div className="select-stack">
          {character.features.map((value, index) => renderSelect(`${fieldLabels.features} ${index + 1}`, value, withUnselected(features).filter((option) => option === UNSELECTED || option !== character.features[1 - index]), (nextValue) => {
            const nextValues = [...character.features] as Character["features"];
            nextValues[index] = nextValue;
            updateField("features", nextValues);
          }, isLocked))}
        </div>;
      case "keywords":
        return <div className="select-stack">
          {character.keywords.map((value, index) => renderSelect(`${fieldLabels.keywords} ${index + 1}`, value, withUnselected(keywords).filter((option) => option === UNSELECTED || option !== character.keywords[1 - index]), (nextValue) => {
            const nextValues = [...character.keywords] as Character["keywords"];
            nextValues[index] = nextValue;
            updateField("keywords", nextValues);
          }, isLocked))}
        </div>;
      case "colors":
        return <div className="select-stack select-stack--colors">
          {character.colors.map((value, index) => <label className="select-control" key={index}><span className="color-select-label"><i className={`color-dot color-${value}`} />{index === 0 ? "メイン" : "サブ"}</span><select aria-label={`${index === 0 ? "メイン" : "サブ"}カラー`} value={value} disabled={isLocked} onChange={(event) => {
            const nextValues = [...character.colors] as Character["colors"];
            nextValues[index] = event.target.value as Character["colors"][number];
            updateField("colors", nextValues);
          }}>{withUnselected(colors).filter((option) => option === UNSELECTED || option !== character.colors[1 - index]).map((option) => <option value={option} key={option}>{option}</option>)}</select></label>)}
        </div>;
      default:
        const options = scalarOptions[field];
        return renderSelect(fieldLabels[field], character[field] as string, withUnselected(options), (value) => updateField(field, value as Character[typeof field]), isLocked);
    }
  };

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">CHARACTER DESIGN TOOL</p>
        <h1>Character Random Maker</h1>
        <p className="hero__description">偶然の組み合わせから、新しいキャラクターの種を見つけよう。</p>
        <RandomizeButton onClick={randomizeUnlocked} />
        <p className="lock-hint">ロックした項目は、ランダムメイク時にも維持されます。</p>
      </header>

      <section className="result-section" aria-label="生成されたキャラクター設定">
        <div className="section-heading"><div><p className="eyebrow">CURRENT CHARACTER</p><h2>キャラクター設定</h2></div><span>{Object.values(locks).filter(Boolean).length} 項目を固定中</span></div>
        <div className="fields-grid">
          {fieldOrder.map((field) => <CharacterField key={field} label={fieldLabels[field]} isLocked={locks[field]} onToggleLock={() => toggleLock(field)} onReroll={() => rerollField(field)}>{valueFor(field)}</CharacterField>)}
        </div>
      </section>

      <PromptOutput prompt={createPrompt(character)} />
    </main>
  );
}
