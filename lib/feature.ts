import { notFound } from "next/navigation";
import { FLAGS } from "./flags";

export function withFeature(feature: keyof typeof FLAGS) {
  if (!FLAGS[feature]) {
    notFound();
  }
}

export function notFoundOr<T>(feature: keyof typeof FLAGS, value: T): T | never {
  if (!FLAGS[feature]) {
    notFound();
  }
  return value;
}
