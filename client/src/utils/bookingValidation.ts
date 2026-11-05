import { BookingFormState } from "../pages/BookingsPage";

export const getBookingFormErrors = (
  formState: BookingFormState,
): Partial<Record<keyof BookingFormState, string>> => {
  const errors: Partial<Record<keyof BookingFormState, string>> = {};

  if (!formState.title.trim()) {
    errors.title = "Booking title is required.";
  }

  if (!formState.description.trim()) {
    errors.description = "Booking description is required.";
  }

  if (!formState.startsAt) {
    errors.startsAt = "Start time is required.";
  }

  if (!formState.endsAt) {
    errors.endsAt = "End time is required.";
  }

  if (
    formState.startsAt &&
    formState.endsAt &&
    !Number.isNaN(new Date(formState.startsAt).getTime()) &&
    !Number.isNaN(new Date(formState.endsAt).getTime()) &&
    new Date(formState.endsAt).getTime() <=
      new Date(formState.startsAt).getTime()
  ) {
    errors.endsAt = "End time must be after start time.";
  }

  if (
    (formState.startsAt &&
      Number.isNaN(new Date(formState.startsAt).getTime())) ||
    (formState.endsAt && Number.isNaN(new Date(formState.endsAt).getTime()))
  ) {
    errors.startsAt = "Please enter valid start and end times.";
    errors.endsAt = "Please enter valid start and end times.";
  }

  return errors;
};