import {PROJECT_STATUSES} from "../constants"

export function getStatus(number){
  return PROJECT_STATUSES[number]
}