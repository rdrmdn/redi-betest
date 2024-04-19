import KSUID from "ksuid";

export function ksuidSync(): string {
  return KSUID.randomSync().string;
}
