import User from '../models/user.model.js';

// Function to generate a unique user ID without any prefix
async function generateUniqueUserName(Name) {
  // Remove spaces and special characters, convert to lowercase
  let baseName = Name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  
  // Limit the base ID to first 6 characters
  baseName = baseName.substring(0, 6);

  let isUnique = false;
  let counter = 0;
  let finalUserName = baseName;

  // Keep trying until we find a unique user ID
  while (!isUnique) {
    // If counter is greater than 0, append the number to ID
    if (counter > 0) {
      finalUserName = `${baseName}${counter}`;
    }

    // Check if user ID exists
    const existingUser = await User.findOne({ user_name: finalUserName });
    if (!existingUser) {
      isUnique = true;
    } else {
      counter++;
    }
  }

  return finalUserName;
}

export default generateUniqueUserName;
