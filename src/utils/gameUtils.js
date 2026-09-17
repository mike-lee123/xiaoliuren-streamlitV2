export function addItemsToInventory(inventory, items) {
  // 如果items是單個物品，轉換為數組
  const itemsToAdd = Array.isArray(items) ? items : [items];
  
  // 創建新的庫存數組
  const newInventory = [...inventory];
  
  // 對每個要添加的物品
  itemsToAdd.forEach(item => {
    // 檢查庫存中是否已有相同物品
    const existingItem = newInventory.find(i => i.name === item.name);
    
    if (existingItem) {
      // 如果已存在，增加數量
      existingItem.count += item.count || 1;
    } else {
      // 如果不存在，添加新物品
      newInventory.push({
        ...item,
        count: item.count || 1
      });
    }
  });
  
  return newInventory;
} 