import type { ReactNode } from "react";
import { LockIcon, RefreshIcon, UnlockIcon } from "@/components/icons";

type CharacterFieldProps = {
  label: string;
  children: ReactNode;
  isLocked: boolean;
  onToggleLock: () => void;
  onReroll: () => void;
};

export function CharacterField({ label, children, isLocked, onToggleLock, onReroll }: CharacterFieldProps) {
  return (
    <section className={`field-card ${isLocked ? "field-card--locked" : ""}`}>
      <div className="field-card__heading">
        <h2>{label}</h2>
        {isLocked && <span className="lock-state">固定中</span>}
      </div>
      <div className="field-card__value">{children}</div>
      <div className="field-card__actions">
        <button
          className={`field-button ${isLocked ? "field-button--active" : ""}`}
          type="button"
          onClick={onToggleLock}
          aria-pressed={isLocked}
          aria-label={`${label}を${isLocked ? "ロック解除" : "ロック"}`}
        >
          {isLocked ? <LockIcon /> : <UnlockIcon />}
          {isLocked ? "ロック中" : "ロック"}
        </button>
        <button className="field-button" type="button" onClick={onReroll} disabled={isLocked}>
          <RefreshIcon />
          再抽選
        </button>
      </div>
    </section>
  );
}
