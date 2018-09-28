/**
 * Config
 */
const qiniu = require('qiniu')

const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z0
config.useHttpsDomain = true
config.useCdnDomain = true

const { ACCESS_KEY, SECRET_KEY, BUCKET } = process.env
const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY)
const getUploadToken = key => {
  const overwrite = 'react-impression/index.html'
  const scope = `${BUCKET}${key === overwrite ? `:${overwrite}` : ''}`

  return new qiniu.rs.PutPolicy({ scope }).uploadToken(mac)
}

/**
 * Upload
 */
const formUploader = new qiniu.form_up.FormUploader(config)
const putExtra = new qiniu.form_up.PutExtra()

const upload = file =>
  formUploader.putFile(
    getUploadToken(file.key),
    file.key,
    file.localFile,
    putExtra,
    (err, body, info) => {
      if (err) {
        console.error(err)
        return
      }

      if (info.statusCode === 200) {
        console.log('Upload success: ', file.key)
      } else {
        console.log('Upload failure: ', file.key)
        console.log('                ', `${info.statusCode} ${body.error}`)
      }
    }
  )

/**
 * Files
 */
const path = require('path')
const glob = require('glob')

const BASE = 'packages/react-impression-website/dist'

glob(`${BASE}/**/*.*`, (err, files) => {
  if (err) {
    console.error(err)
    return
  }

  const transform = file => ({
    localFile: file,
    key: `react-impression/${path.relative(BASE, file)}`,
  })

  files.map(transform).forEach(upload)
})

/**
 * Log
 */
const { execSync } = require('child_process')

execSync('cat packages/react-impression-website/dist/index.html', {
  stdio: 'inherit',
})
