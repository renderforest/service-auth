const flowRemoveTypes = require('flow-remove-types')
const path = require('path')
const fs = require('fs')

const deleteFileOrFolderRecursive = (path) => {
  if (fs.lstatSync(path).isDirectory() === false) {
    return fs.unlinkSync(path)
  }
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file) {
      const curPath = path + '/' + file
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFileOrFolderRecursive(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

const folderScanner = (tester, transformer) => (src, dist) => {
  const scannerPartial = folderScanner(tester, transformer)
  return fs
    .readdirSync(src)
    .filter(file => (file.indexOf('.') !== 0))
    .forEach(file => {
      const scrPath = path.join(src, file)
      const outPath = path.join(dist, file)

      console.log(scrPath + ' -> ' + outPath)

      // if it's a directory, create directory and run recoursively
      if (fs.lstatSync(scrPath).isDirectory()) {
        if (fs.existsSync(outPath) === false) {
          fs.mkdirSync(outPath)
        }
        return scannerPartial(scrPath, outPath)
      }

      const input = fs.readFileSync(scrPath, 'utf8')
      const output = tester(input) ? transformer(input) : input
      fs.writeFileSync(outPath, output.toString())
    })
}

// /// ///// /// ///// /// ///// /// ///
// /// ///// /// /// START

const src = './src'
const dist = './dist'

const tester = (string) => {
  return string.startsWith('/* @flow */') === true
}

// Empty DIST folder
fs.readdirSync(dist).map(f => deleteFileOrFolderRecursive(path.join(dist, f)))

// Run Flow Remover
folderScanner(tester, input => flowRemoveTypes(input, {pretty: true}))(src, dist)
