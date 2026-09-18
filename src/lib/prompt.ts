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

Live2Dモデル化とパーツ分けを前提にした、全身が入った2Dキャラクター立ち絵。
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
両腕は胴体から少し離し、手と指が見えるようにする。
髪は前髪・左右のサイド髪・後ろ髪を分けやすくし、目・眉・顔の輪郭を隠さない。
左右の目、眉、口、顔、胴体、左右の腕と手、衣装の輪郭が明確に見えるようにする。
髪・手・衣装・装飾が重要な顔パーツや身体パーツに大きく重ならないようにする。
後工程で各パーツをPSDレイヤーへ分離できるよう、パーツの境界と隠れ部分を想定して描写する。
複雑すぎる背景、エフェクト、持ち物は入れない。
コントラポスト禁止。
S字ポーズ禁止。
カメラ傾斜なし。
パースを極力弱くする。
完全な透明背景（アルファ付きの透過PNGを想定）。
キャラクターデザイン以外の余計な要素なし。`;
}
