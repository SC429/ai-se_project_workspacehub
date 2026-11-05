import type { Booking, Project, Task, User } from "../types/models";
import { isPrivilegedRole } from "./permissions.test";

export const canEditProject = (user: User | null, project: Project) => {
  if (!user) {
    return false;
  }

  return isPrivilegedRole(user.role) || user._id === project.createdBy;
};

export const canEditTask = (user: User | null, task: Task) => {
  if (!user) {
    return false;
  }

  return isPrivilegedRole(user.role) || user._id === task.assignedTo;
};

export const canEditBooking = (user: User | null, booking: Booking) => {
  if (!user) {
    return false;
  }

  return isPrivilegedRole(user.role) || user._id === booking.createdBy;
};

export const canDeleteResources = (user: User | null) => {
  return isPrivilegedRole(user?.role);
};
