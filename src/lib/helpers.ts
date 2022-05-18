export const alphabetAsString = 'abcdefghijklmnopqrstuvwxyz'
export const alphabetAsArray: string[] = [...alphabetAsString]

export const isSingleLetter = (string: string): boolean => {
  return alphabetAsArray.includes(string)
}

export const arrayContainsLetter = (arr: string[]): boolean => {
  return arr.some(el => alphabetAsArray.includes(el.toLowerCase()))
}