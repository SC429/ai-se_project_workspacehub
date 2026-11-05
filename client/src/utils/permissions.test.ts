import { describe, expect, it } from "vitest";
import type { User, UserRole } from "../types/models";

export const isPrivilegedRole = (role?: UserRole | null) => {
  return role === "owner" || role === "admin";
};

export const canCreateProjects = (user: User | null) => {
  return isPrivilegedRole(user?.role);
};

describe("permissions", () => {
  describe("isPrivilegedRole", () => {
    it.each<[UserRole | null | undefined, boolean]>([
      ["owner", true],
      ["admin", true],
      ["member", false],
      [null, false],
      [undefined, false],
    ])("returns %s for role %s", (role, expected) => {
      expect(isPrivilegedRole(role)).toBe(expected);
    });
  });

  describe("canCreateProjects", () => {
    it.each<[User | null, boolean]>([
      [{ role: "owner" } as User, true],
      [{ role: "admin" } as User, true],
      [{ role: "member" } as User, false],
      [null, false],
    ])("returns %s for user %p", (user, expected) => {
      expect(canCreateProjects(user)).toBe(expected);
    });
  });
});