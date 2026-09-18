export const genders = ["男", "女", "中性的/不明", "無性/両性"] as const;
export const ageGroups = ["幼児", "少年・少女", "青年", "壮年", "老年"] as const;
export const races = [
  "人間",
  "エルフ",
  "ドワーフ",
  "ハーフリング",
  "獣人",
  "悪魔",
  "天使",
  "神",
  "人魚",
  "アンデッド",
  "機械生命体",
  "妖精",
  "竜人",
  "ゴブリン",
  "吸血鬼",
  "オーク",
  "巨人族",
  "スライム族",
  "ゴーレム",
  "精霊",
  "幽霊",
  "狼男",
  "ラミア",
  "ケンタウロス",
  "ハーピー",
  "狐人",
  "妖怪",
  "植物人",
  "宇宙人",
  "キメラ",
] as const;
export const occupations = [
  "学生・一般職",
  "聖職者",
  "回復職",
  "狩人",
  "騎士",
  "魔術師",
  "芸術家",
  "研究者",
  "商人",
  "サムライ",
  "旅人",
  "冒険者",
  "貴族",
  "軍人",
  "暗殺者",
  "吟遊詩人",
  "盗賊",
  "鍛冶師",
  "錬金術師",
  "海賊",
  "船乗り",
  "料理人",
  "執事・メイド",
  "探偵",
  "パイロット",
  "ダンサー",
  "アイドル",
  "占い師",
  "祓い屋",
  "忍者",
  "召喚士",
  "魔物使い",
  "司書",
  "教師",
  "スパイ",
  "護衛",
  "農家",
] as const;
export const heights = ["低い", "普通", "高い"] as const;
export const bodyTypes = ["もやし", "細い", "普通", "ナイスバディ", "筋肉質", "がっしり"] as const;
export const hairLengths = ["ベリーショート", "ショート", "セミロング", "ロング", "超ロング"] as const;
export const hairStyles = [
  "ストレート",
  "編んでいる",
  "結い上げている",
  "ウェーブ・巻き",
  "寝癖",
  "盛っている",
  "ツインテール",
  "ポニーテール",
  "姫カット",
  "ボブ",
  "ウルフカット",
  "ツーブロック",
  "アシンメトリー",
  "センター分け",
  "オールバック",
  "前髪ぱっつん",
  "かき上げ前髪",
  "お団子ヘア",
  "サイドテール",
  "ハーフアップ",
  "三つ編み",
  "フィッシュボーン",
  "縦ロール",
  "マッシュ",
  "外ハネ",
  "内巻き",
] as const;
export const features = [
  "三白眼",
  "タレ目",
  "つり目",
  "切れ長の目",
  "黒目がち",
  "どんぐり目",
  "ほくろ",
  "獣耳",
  "尻尾",
  "メッシュ",
  "エクステ",
  "マフラー",
  "マント",
  "眼鏡",
  "星モチーフ",
  "傷跡",
  "角",
  "翼",
  "オッドアイ",
  "眼帯",
  "仮面",
  "タトゥー",
  "義手・義足",
  "アホ毛",
  "泣きぼくろ",
  "八重歯",
  "そばかす",
  "片目隠れ",
  "長いまつ毛",
  "牙",
  "尖り耳",
  "花飾り",
  "ヘッドホン",
  "和傘",
  "リボン",
  "フード",
  "首輪",
  "光輪",
  "発光する瞳",
  "異形の瞳孔",
  "義眼",
  "包帯",
  "手袋",
  "ピアス",
  "チョーカー",
  "魔法陣の紋様",
] as const;
export const colors = ["黒", "白", "赤", "青", "緑", "黄", "紫", "ピンク", "橙", "金", "銀", "水色", "紺", "藍", "茶", "灰", "ベージュ", "エメラルド", "クリーム"] as const;
export const keywords = [
  "知性派",
  "毒舌",
  "ダウナー",
  "おしとやか",
  "ヤンデレ",
  "リーダータイプ",
  "アウトドア系",
  "動物好き",
  "天使系",
  "無口",
  "好戦的",
  "臆病",
  "天然",
  "真面目",
  "無邪気",
  "ミステリアス",
  "世話焼き",
  "カタコトで話す",
  "ツンデレ",
  "クーデレ",
  "元気印",
  "負けず嫌い",
  "人見知り",
  "寂しがり屋",
  "自由人",
  "努力家",
  "完璧主義",
  "楽天家",
  "心配性",
  "潔癖症",
  "ロマンチスト",
  "現実主義",
  "博愛主義",
  "反骨精神",
  "マイペース",
  "敬語キャラ",
  "お祭り好き",
  "甘党",
  "方向音痴",
  "収集癖",
  "変わり者",
  "ギャップ持ち",
  "正義感が強い",
] as const;

export type Gender = (typeof genders)[number];
export type AgeGroup = (typeof ageGroups)[number];
export type Race = (typeof races)[number];
export type Occupation = (typeof occupations)[number];
export type Height = (typeof heights)[number];
export type BodyType = (typeof bodyTypes)[number];
export type HairLength = (typeof hairLengths)[number];
export type HairStyle = (typeof hairStyles)[number];
export type Feature = (typeof features)[number];
export type Color = (typeof colors)[number];
export type Keyword = (typeof keywords)[number];

export type Character = {
  gender: Gender;
  ageGroup: AgeGroup;
  race: Race;
  occupation: Occupation;
  height: Height;
  bodyType: BodyType;
  hairLength: HairLength;
  hairStyle: HairStyle;
  features: [Feature, Feature];
  colors: [Color, Color];
  keywords: [Keyword, Keyword];
  dice: [number, number];
};

export type CharacterFieldKey = keyof Character;
