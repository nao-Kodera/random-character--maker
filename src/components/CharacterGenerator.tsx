"use client";

import { useState } from "react";
import type { Character, CharacterFieldKey } from "@/data/characterOptions";
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
  features: "目立つ特徴",
  colors: "イメージカラー",
  keywords: "キーワード",
  dice: "2D6",
};

const fieldOrder = Object.keys(fieldLabels) as CharacterFieldKey[];

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

  const valueFor = (field: CharacterFieldKey) => {
    switch (field) {
      case "features":
      case "keywords":
        return <div className="tag-list">{character[field].map((value) => <span className="tag" key={value}>{value}</span>)}</div>;
      case "colors":
        return <div className="color-list"><span><i className={`color-dot color-${character.colors[0]}`} />メイン：{character.colors[0]}</span><span><i className={`color-dot color-${character.colors[1]}`} />サブ：{character.colors[1]}</span></div>;
      case "dice":
        return <div className="dice-list">{character.dice.map((value, index) => <span className="die" key={index}>{value}</span>)}</div>;
      default:
        return character[field];
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
