export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const sortList = list => {
  return list.sort((dragonA, dragonB)=> {
      let currentDragon = (dragonA.name).toUpperCase();
      let nextDragon = (dragonB.name).toUpperCase();
    
      return currentDragon === nextDragon ? 0 : currentDragon > nextDragon ? 1 : -1;
  })
}