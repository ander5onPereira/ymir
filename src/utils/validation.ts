export const validateCPF = (value:string) => {
  if (!value) return false
  value = value.replace(/\D/g, '')
  let sum = 0
  let rest = 0

  if (
    value === '00000000000' ||
    value === '11111111111' ||
    value === '22222222222' ||
    value === '33333333333' ||
    value === '44444444444' ||
    value === '55555555555' ||
    value === '66666666666' ||
    value === '77777777777' ||
    value === '88888888888' ||
    value === '99999999999'
  ) {
    return false
  }

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(value.substring(i - 1, i)) * (11 - i)
  }
  rest = (sum * 10) % 11

  if (rest === 10 || rest === 11) rest = 0

  if (rest !== parseInt(value.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++)
    sum += parseInt(value.substring(i - 1, i)) * (12 - i)

  rest = (sum * 10) % 11

  if (rest === 10 || rest === 11) rest = 0

  if (rest !== parseInt(value.substring(10, 11))) return false

  return true
}