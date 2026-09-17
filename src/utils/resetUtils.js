export const resetGameState = () => {
  // Reset inventory to default state
  const defaultInventory = [
    {
      code: 'LS001',
      name: '靈石',
      image: 'https://i.imgur.com/a79JRqm.jpeg',
      count: 0
    }
  ];

  // Reset attributes to default state
  const defaultAttributes = {
    spiritualRoot: 5,
    talent: 5,
    luck: 5,
    wealth: 5,
    lifespan: 100,
    spiritualPower: 10,
    age: 18,
    level: 1
  };

  // Save default states to localStorage
  localStorage.setItem('gameInventory', JSON.stringify(defaultInventory));
  localStorage.setItem('characterAttributes', JSON.stringify(defaultAttributes));

  return {
    defaultInventory,
    defaultAttributes
  };
}; 