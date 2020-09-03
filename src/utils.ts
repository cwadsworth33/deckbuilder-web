export const classNameUtil = (staticClasses: string, dynamicClasses?: any): string => {
  const appliedDynamicClassList = Object.keys(dynamicClasses).filter(key => dynamicClasses[key]);
  const additionalClasses = appliedDynamicClassList.join(' ');
  return additionalClasses ? staticClasses + ' ' + additionalClasses : staticClasses;
}