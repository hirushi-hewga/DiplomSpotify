

export function colorSelector(str: string): string {
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ("00" + value.toString(16)).slice(-2);
  }

  return color;
}

export function colorSelectorDark(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    // Отримуємо значення компоненти RGB
    let value = (hash >> (i * 8)) & 0xFF;
    
    // Обмежуємо компоненту до максимуму 180 для уникнення надмірної яскравості
    const maxBrightness = 170;
    value = Math.min(value, maxBrightness);
    
    // Додаємо до кольору компоненту, відформатовану до двох знаків
    color += ("00" + value.toString(16)).slice(-2);
  }

  return color;
}