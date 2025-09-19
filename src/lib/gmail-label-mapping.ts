import { Label } from "~/types/label";

/**
 * Maps our Label enum values to Gmail labels
 */
export function getGmailCategoryLabel(label: Label): string {
  switch (label) {
    case Label.PRIMARY:
      return "CATEGORY_PERSONAL";
    case Label.PROMOTIONS:
      return "CATEGORY_PROMOTIONS";
    case Label.SOCIAL:
      return "CATEGORY_SOCIAL";
    case Label.TRASH:
      return "TRASH";
    case Label.DRAFTS:
      return "DRAFT";
    case Label.SENT:
      return "SENT";
    case Label.STARRED:
      return "STARRED";
    default:
      return "CATEGORY_PERSONAL";
  }
}
