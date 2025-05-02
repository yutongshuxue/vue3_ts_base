import { http } from '../../api'

export const getProductions = async (id?: string) => {
  const url = id ? `/products/${id}` : '/products'
  const res = await http.get(url)
  return res
}
export const postProductions = async (id?: string) => {
  const url = id ? `/products/${id}` : '/products'
  const res = await http.post(url)
  return res
}
