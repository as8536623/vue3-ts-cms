import dsRequest from '@/service'
import { mapResult, mapResultType } from './type'
export function mapCountList() {
  return dsRequest.get<mapResultType<mapResult>>({
    url: '/goods/category/count'
  })
}
export function mapSaleList() {
  return dsRequest.get<mapResultType<mapResult>>({
    url: '/goods/category/sale'
  })
}

export function mapFavorList() {
  return dsRequest.get<mapResultType<mapResult>>({
    url: '/goods/category/favor'
  })
}

export function mapAddreeSaleList() {
  return dsRequest.get<mapResultType<mapResult>>({
    url: '/goods/address/sale'
  })
}
