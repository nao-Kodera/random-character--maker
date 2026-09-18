import { RefreshIcon } from "@/components/icons";

type RandomizeButtonProps = { onClick: () => void };

export function RandomizeButton({ onClick }: RandomizeButtonProps) {
  return <button className="randomize-button" type="button" onClick={onClick}><RefreshIcon />ランダムメイク</button>;
}
