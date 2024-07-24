// prettier-ignore
/* eslint-disable */
/* auto-generated by NAPI-RS */

const { readFileSync } = require('fs')

let nativeBinding = null
const loadErrors = []

const isMusl = () => {
  let musl = false
  if (process.platform === 'linux') {
    musl = isMuslFromFilesystem()
    if (musl === null) {
      musl = isMuslFromReport()
    }
    if (musl === null) {
      musl = isMuslFromChildProcess()
    }
  }
  return musl
}

const isFileMusl = (f) => f.includes('libc.musl-') || f.includes('ld-musl-')

const isMuslFromFilesystem = () => {
  try {
    return readFileSync('/usr/bin/ldd', 'utf-8').includes('musl')
  } catch {
    return null
  }
}

const isMuslFromReport = () => {
  const report = typeof process.report.getReport === 'function' ? process.report.getReport() : null
  if (!report) {
    return null
  }
  if (report.header && report.header.glibcVersionRuntime) {
    return false
  }
  if (Array.isArray(report.sharedObjects)) {
    if (report.sharedObjects.some(isFileMusl)) {
      return true
    }
  }
  return false
}

const isMuslFromChildProcess = () => {
  try {
    return require('child_process').execSync('ldd --version', { encoding: 'utf8' }).includes('musl')
  } catch (e) {
    // If we reach this case, we don't know if the system is musl or not, so is better to just fallback to false
    return false
  }
}

function requireNative() {
  if (process.platform === 'android') {
    if (process.arch === 'arm64') {
      try {
        return require('./backend-rs.android-arm64.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-android-arm64')
      } catch (e) {
        loadErrors.push(e)
      }

    } else if (process.arch === 'arm') {
      try {
        return require('./backend-rs.android-arm-eabi.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-android-arm-eabi')
      } catch (e) {
        loadErrors.push(e)
      }

    } else {
      loadErrors.push(new Error(`Unsupported architecture on Android ${process.arch}`))
    }
  } else if (process.platform === 'win32') {
    if (process.arch === 'x64') {
      try {
        return require('./backend-rs.win32-x64-msvc.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-win32-x64-msvc')
      } catch (e) {
        loadErrors.push(e)
      }

    } else if (process.arch === 'ia32') {
      try {
        return require('./backend-rs.win32-ia32-msvc.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-win32-ia32-msvc')
      } catch (e) {
        loadErrors.push(e)
      }

    } else if (process.arch === 'arm64') {
      try {
        return require('./backend-rs.win32-arm64-msvc.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-win32-arm64-msvc')
      } catch (e) {
        loadErrors.push(e)
      }

    } else {
      loadErrors.push(new Error(`Unsupported architecture on Windows: ${process.arch}`))
    }
  } else if (process.platform === 'darwin') {
    try {
        return require('./backend-rs.darwin-universal.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-darwin-universal')
      } catch (e) {
        loadErrors.push(e)
      }

    if (process.arch === 'x64') {
      try {
        return require('./backend-rs.darwin-x64.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-darwin-x64')
      } catch (e) {
        loadErrors.push(e)
      }

    } else if (process.arch === 'arm64') {
      try {
        return require('./backend-rs.darwin-arm64.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-darwin-arm64')
      } catch (e) {
        loadErrors.push(e)
      }

    } else {
      loadErrors.push(new Error(`Unsupported architecture on macOS: ${process.arch}`))
    }
  } else if (process.platform === 'freebsd') {
    if (process.arch === 'x64') {
      try {
        return require('./backend-rs.freebsd-x64.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-freebsd-x64')
      } catch (e) {
        loadErrors.push(e)
      }

    } else if (process.arch === 'arm64') {
      try {
        return require('./backend-rs.freebsd-arm64.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-freebsd-arm64')
      } catch (e) {
        loadErrors.push(e)
      }

    } else {
      loadErrors.push(new Error(`Unsupported architecture on FreeBSD: ${process.arch}`))
    }
  } else if (process.platform === 'linux') {
    if (process.arch === 'x64') {
      if (isMusl()) {
        try {
        return require('./backend-rs.linux-x64-musl.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-linux-x64-musl')
      } catch (e) {
        loadErrors.push(e)
      }

      } else {
        try {
        return require('./backend-rs.linux-x64-gnu.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-linux-x64-gnu')
      } catch (e) {
        loadErrors.push(e)
      }

      }
    } else if (process.arch === 'arm64') {
      if (isMusl()) {
        try {
        return require('./backend-rs.linux-arm64-musl.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-linux-arm64-musl')
      } catch (e) {
        loadErrors.push(e)
      }

      } else {
        try {
        return require('./backend-rs.linux-arm64-gnu.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-linux-arm64-gnu')
      } catch (e) {
        loadErrors.push(e)
      }

      }
    } else if (process.arch === 'arm') {
      if (isMusl()) {
        try {
        return require('./backend-rs.linux-arm-musleabihf.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-linux-arm-musleabihf')
      } catch (e) {
        loadErrors.push(e)
      }

      } else {
        try {
        return require('./backend-rs.linux-arm-gnueabihf.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-linux-arm-gnueabihf')
      } catch (e) {
        loadErrors.push(e)
      }

      }
    } else if (process.arch === 'riscv64') {
      if (isMusl()) {
        try {
        return require('./backend-rs.linux-riscv64-musl.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-linux-riscv64-musl')
      } catch (e) {
        loadErrors.push(e)
      }

      } else {
        try {
        return require('./backend-rs.linux-riscv64-gnu.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-linux-riscv64-gnu')
      } catch (e) {
        loadErrors.push(e)
      }

      }
    } else if (process.arch === 'ppc64') {
      try {
        return require('./backend-rs.linux-ppc64-gnu.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-linux-ppc64-gnu')
      } catch (e) {
        loadErrors.push(e)
      }

    } else if (process.arch === 's390x') {
      try {
        return require('./backend-rs.linux-s390x-gnu.node')
      } catch (e) {
        loadErrors.push(e)
      }
      try {
        return require('backend-rs-linux-s390x-gnu')
      } catch (e) {
        loadErrors.push(e)
      }

    } else {
      loadErrors.push(new Error(`Unsupported architecture on Linux: ${process.arch}`))
    }
  } else {
    loadErrors.push(new Error(`Unsupported OS: ${process.platform}, architecture: ${process.arch}`))
  }
}

nativeBinding = requireNative()

if (!nativeBinding || process.env.NAPI_RS_FORCE_WASI) {
  try {
    nativeBinding = require('./backend-rs.wasi.cjs')
  } catch (err) {
    if (process.env.NAPI_RS_FORCE_WASI) {
      loadErrors.push(err)
    }
  }
  if (!nativeBinding) {
    try {
      nativeBinding = require('backend-rs-wasm32-wasi')
    } catch (err) {
      if (process.env.NAPI_RS_FORCE_WASI) {
        loadErrors.push(err)
      }
    }
  }
}

if (!nativeBinding) {
  if (loadErrors.length > 0) {
    // TODO Link to documentation with potential fixes
    //  - The package owner could build/publish bindings for this arch
    //  - The user may need to bundle the correct files
    //  - The user may need to re-install node_modules to get new packages
    throw new Error('Failed to load native binding', { cause: loadErrors })
  }
  throw new Error(`Failed to load native binding`)
}

module.exports.acctToString = nativeBinding.acctToString
module.exports.AntennaSrc = nativeBinding.AntennaSrc
module.exports.ChatEvent = nativeBinding.ChatEvent
module.exports.ChatIndexEvent = nativeBinding.ChatIndexEvent
module.exports.checkWordMute = nativeBinding.checkWordMute
module.exports.countLocalUsers = nativeBinding.countLocalUsers
module.exports.countReactions = nativeBinding.countReactions
module.exports.cpuInfo = nativeBinding.cpuInfo
module.exports.cpuUsage = nativeBinding.cpuUsage
module.exports.decodeReaction = nativeBinding.decodeReaction
module.exports.DriveFileEvent = nativeBinding.DriveFileEvent
module.exports.DriveFileUsageHint = nativeBinding.DriveFileUsageHint
module.exports.DriveFolderEvent = nativeBinding.DriveFolderEvent
module.exports.extractHashtags = nativeBinding.extractHashtags
module.exports.extractHost = nativeBinding.extractHost
module.exports.fetchMeta = nativeBinding.fetchMeta
module.exports.fetchNodeinfo = nativeBinding.fetchNodeinfo
module.exports.formatMilliseconds = nativeBinding.formatMilliseconds
module.exports.generateSecureRandomString = nativeBinding.generateSecureRandomString
module.exports.generateUserToken = nativeBinding.generateUserToken
module.exports.genId = nativeBinding.genId
module.exports.genIdAt = nativeBinding.genIdAt
module.exports.getFullApAccount = nativeBinding.getFullApAccount
module.exports.getImageSizeFromUrl = nativeBinding.getImageSizeFromUrl
module.exports.getInternalActor = nativeBinding.getInternalActor
module.exports.getNoteSummary = nativeBinding.getNoteSummary
module.exports.getTimestamp = nativeBinding.getTimestamp
module.exports.greet = nativeBinding.greet
module.exports.hashPassword = nativeBinding.hashPassword
module.exports.Inbound = nativeBinding.Inbound
module.exports.initializeRustLogger = nativeBinding.initializeRustLogger
module.exports.InternalActor = nativeBinding.InternalActor
module.exports.isAllowedServer = nativeBinding.isAllowedServer
module.exports.isBlockedServer = nativeBinding.isBlockedServer
module.exports.isOldPasswordAlgorithm = nativeBinding.isOldPasswordAlgorithm
module.exports.isQuote = nativeBinding.isQuote
module.exports.isSafeUrl = nativeBinding.isSafeUrl
module.exports.isSameOrigin = nativeBinding.isSameOrigin
module.exports.isSelfHost = nativeBinding.isSelfHost
module.exports.isSilencedServer = nativeBinding.isSilencedServer
module.exports.isUnicodeEmoji = nativeBinding.isUnicodeEmoji
module.exports.latestVersion = nativeBinding.latestVersion
module.exports.loadConfig = nativeBinding.loadConfig
module.exports.memoryUsage = nativeBinding.memoryUsage
module.exports.metaToPugArgs = nativeBinding.metaToPugArgs
module.exports.MutedNoteReason = nativeBinding.MutedNoteReason
module.exports.nodeinfo_2_0 = nativeBinding.nodeinfo_2_0
module.exports.nodeinfo_2_1 = nativeBinding.nodeinfo_2_1
module.exports.NoteVisibility = nativeBinding.NoteVisibility
module.exports.NotificationType = nativeBinding.NotificationType
module.exports.nyaify = nativeBinding.nyaify
module.exports.Outbound = nativeBinding.Outbound
module.exports.PageVisibility = nativeBinding.PageVisibility
module.exports.PollNoteVisibility = nativeBinding.PollNoteVisibility
module.exports.Protocol = nativeBinding.Protocol
module.exports.publishToBroadcastStream = nativeBinding.publishToBroadcastStream
module.exports.publishToChannelStream = nativeBinding.publishToChannelStream
module.exports.publishToChatIndexStream = nativeBinding.publishToChatIndexStream
module.exports.publishToChatStream = nativeBinding.publishToChatStream
module.exports.publishToDriveFileStream = nativeBinding.publishToDriveFileStream
module.exports.publishToDriveFolderStream = nativeBinding.publishToDriveFolderStream
module.exports.publishToGroupChatStream = nativeBinding.publishToGroupChatStream
module.exports.publishToModerationStream = nativeBinding.publishToModerationStream
module.exports.publishToNotesStream = nativeBinding.publishToNotesStream
module.exports.PushNotificationKind = nativeBinding.PushNotificationKind
module.exports.PushSubscriptionType = nativeBinding.PushSubscriptionType
module.exports.RelayStatus = nativeBinding.RelayStatus
module.exports.removeOldAttestationChallenges = nativeBinding.removeOldAttestationChallenges
module.exports.safeForSql = nativeBinding.safeForSql
module.exports.sendPushNotification = nativeBinding.sendPushNotification
module.exports.shouldNyaify = nativeBinding.shouldNyaify
module.exports.showServerInfo = nativeBinding.showServerInfo
module.exports.sqlLikeEscape = nativeBinding.sqlLikeEscape
module.exports.sqlRegexEscape = nativeBinding.sqlRegexEscape
module.exports.storageUsage = nativeBinding.storageUsage
module.exports.stringToAcct = nativeBinding.stringToAcct
module.exports.toDbReaction = nativeBinding.toDbReaction
module.exports.toPuny = nativeBinding.toPuny
module.exports.translate = nativeBinding.translate
module.exports.unwatchNote = nativeBinding.unwatchNote
module.exports.updateAntennaCache = nativeBinding.updateAntennaCache
module.exports.updateAntennasOnNewNote = nativeBinding.updateAntennasOnNewNote
module.exports.updateMetaCache = nativeBinding.updateMetaCache
module.exports.updateNodeinfoCache = nativeBinding.updateNodeinfoCache
module.exports.UserEmojiModPerm = nativeBinding.UserEmojiModPerm
module.exports.UserProfileFfvisibility = nativeBinding.UserProfileFfvisibility
module.exports.UserProfileMutingNotificationTypes = nativeBinding.UserProfileMutingNotificationTypes
module.exports.verifyPassword = nativeBinding.verifyPassword
module.exports.watchNote = nativeBinding.watchNote
