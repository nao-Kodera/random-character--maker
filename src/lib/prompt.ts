import type { Character } from "@/data/characterOptions";

export function createPrompt(character: Character): string {
  return `【キャラクター設定】

性別：${character.gender}
見た目の年代：${character.ageGroup}
種族：${character.race}
職業イメージ：${character.occupation}
身長：${character.height}
体型：${character.bodyType}
髪：${character.hairLength}
髪型：${character.hairStyle}
特徴：${character.features.join(" / ")}
メインカラー：${character.colors[0]}
サブカラー：${character.colors[1]}
キーワード：${character.keywords.join(" / ")}

【立ち絵指定】

全身が入った2Dキャラクター立ち絵。
完全な真正面。
頭部0度。
首を傾けない。
肩を水平にする。
胸郭を水平にする。
骨盤を水平にする。
背骨を垂直にする。
左右均等荷重。
両膝を伸ばす。
左右の足を平行にする。
左右の腕をほぼ対称にする。
コントラポスト禁止。
S字ポーズ禁止。
カメラ傾斜なし。
パースを極力弱くする。
白背景。
キャラクターデザイン以外の余計な要素なし。`;
}
