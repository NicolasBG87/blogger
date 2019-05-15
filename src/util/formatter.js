import moment from "moment";
import "moment-duration-format";

export const DATE = {
  /**
   * Calculate time from now
   *
   * @param {Date} value - date object for the comparisson
   * @returns {String} - e.g. 3 hours ago
   */
  timeAgo: value => {
    return moment(value).fromNow();
  },
  /**
   * Format the date
   * @param {Date} value - date object to be formatted
   * @returns {String} - e.g. Feb 14, 2019
   */
  format: value => {
    return moment(value).format("MMM D, YYYY");
  }
};
