import store from '@/store'

const filterPermission = function(permission, permisPage) {
  return permission.some(permis => {
    if (permisPage.includes(permis.name)) {
      return true
    } else if (permis.children) {
      return filterPermission(permis.children, permisPage)
    } else {
      return false
    }
  })
}

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const permission = store.getters && store.getters.permission
    const permisPage = value

    const hasPermission = filterPermission(permission, permisPage)
    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need permission! Like v-permission="['admin','editor']"`)
    return false
  }
}
