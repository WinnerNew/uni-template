import dev from './dev.json'
import prod from './prod.json'

const envMap = {
  production: prod,
  development: dev
}
export default envMap[process.env.NODE_ENV]
