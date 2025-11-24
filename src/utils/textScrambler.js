export const shuffle = (str) => {
  const arr = str.split('')
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.join('')
}

export const randomText = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 '
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return shuffle(result)
}

export const randomNumber = (length) => {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10)
  }
  return shuffle(result)
}

export const randomWordLike = (text) => {
  const consonants = 'bcdfghjklmnpqrstvwxyz'
  const vowels = 'aeiou'
  const words = text.split(' ')

  return words.map(word => {
    let result = ''
    for (let i = 0; i < word.length; i++) {
      if (i % 2 === 0) {
        result += consonants.charAt(Math.floor(Math.random() * consonants.length))
      } else {
        result += vowels.charAt(Math.floor(Math.random() * vowels.length))
      }
    }
    return shuffle(result)
  }).join(' ')
}
