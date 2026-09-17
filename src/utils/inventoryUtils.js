// 道具欄位相關的工具函數
import itemsData from '../assets/item.json'

/**
 * 刷新道具欄位
 * @param {Array} inventory - 當前道具欄
 * @returns {Array} - 刷新後的道具欄
 */
export const refreshInventory = (inventory) => {
  // 清空道具欄並清除 localStorage 中的遊戲道具欄
  localStorage.removeItem('gameInventory');
  // 返回一個新的空道具欄，只保留靈石
  return [
    {
      code: 'LS001',
      name: '靈石',
      image: 'https://i.imgur.com/a79JRqm.jpeg',
      count: 0
    }
  ];
};

/**
 * 根據家世增加初始道具
 * @param {string} birthTitle - 家世標題
 * @returns {Array} - 初始道具列表
 */
export const getStartingItems = (birthTitle) => {
  const startingItemsMap = {
    '修仙世家': [
      { name: '基礎修煉功法', image: 'https://i.imgur.com/example1.jpg', count: 1 },
      { name: '靈石', image: 'https://i.imgur.com/a79JRqm.jpeg', count: 100 },
      { name: '護身符', image: 'https://i.imgur.com/example3.jpg', count: 1 }
    ],
    '普通凡人': [
      { name: '殘破的修煉手冊', image: 'https://i.imgur.com/example4.jpg', count: 1 },
      { name: '靈石', image: 'https://i.imgur.com/a79JRqm.jpeg', count: 10 }
    ],
    '神秘身世': [
      { name: '神秘玉佩', image: 'https://i.imgur.com/example6.jpg', count: 1 },
      { name: '破舊的修煉筆記', image: 'https://i.imgur.com/example7.jpg', count: 1 }
    ]
  };

  const items = startingItemsMap[birthTitle] || [];
  
  // 為每個物品添加對應的code
  return items.map(item => {
    const itemData = itemsData.find(i => i.name === item.name);
    return {
      ...item,
      code: itemData ? itemData.code : 'UNKNOWN'
    };
  });
}; 