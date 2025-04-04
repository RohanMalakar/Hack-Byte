import NGO from '../models/ngo.model.js';

// Function to generate a unique user ID without any prefix
async function generateUniqueNGOName(Name) {
  
  let baseName=Name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  baseName = "NGO"+baseName.substring(0, 6);

  let isUnique = false;
  let counter = 0;
  let finalNGOName = baseName;

  // Keep trying until we find a unique user ID
  while (!isUnique) {
    // If counter is greater than 0, append the number to ID
    if (counter > 0) {
      finalNGOName = `${baseName}${counter}`;
    }

    // Check if user ID exists
    const existingNGO = await NGO.findOne({ user_name: finalNGOName });
    if (!existingNGO) {
      isUnique = true;
    } else {
      counter++;
    }
  }

  return finalNGOName;
}

export default generateUniqueNGOName;

 