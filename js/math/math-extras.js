/*
 * Math Extras
 */
 
// Returns clamped [num] between [min] and [max]
function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}
