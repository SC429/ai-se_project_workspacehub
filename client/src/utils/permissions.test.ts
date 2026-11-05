import { UserRole } from "../types/models";
import { User } from "../types/models";
import { describe, it, expect } from "vitest";

export const isPrivilegedRole = (role?: UserRole | null) => {
  return role === "owner" || role === "admin";
};

export const canCreateProjects = (user: User | null) => {
  return isPrivilegedRole(user?.role);
};

// unit test for isPrivilegedRole and canCreateProjects
describe("permissions", () => {
  describe("isPrivilegedRole", () => {
    it.each([
      ["owner", true],
      ["admin", true],
      ["member", false],
      [null, false],
    ])("returns %s for role %s", (role, expected) => {
      expect(isPrivilegedRole(role as UserRole | null | undefined)).toBe(expected);
    });
  });

  describe("canCreateProjects", () => {
    it.each([
      [{ role: "owner" } as User, true],
      [{ role: "admin" } as User, true],
      [{ role: "member" } as User, false],
      [null, false],
    ])("returns %s for user %p", (user, expected) => {
      expect(canCreateProjects(user as User | null)).toBe(expected);
    });
  });
});