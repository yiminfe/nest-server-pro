import { isPrd, isTest, noPrd } from './env.util'
import { getFormatTime } from './date.util'
import dracula from 'dracula-console'

const startTime = Symbol()

function getUrl(req) {
  return {
    api: req.path,
    url: `${req.protocol}://${req.hostname}${req.url}`,
    timestamp: getFormatTime()
  }
}

function getRequest(req) {
  return {
    url: req.url,
    method: req.method,
    hostname: req.hostname,
    ip: req.ip,
    params: req.params,
    query: req.query,
    body: req.body,
    headers: req.headers,
    session: req.session
  }
}

function replaceColor(str: string) {
  if (isPrd) {
    console.info(str)
    return
  }
  str = str.replace(/("[\w-]+")(:)/g, (...args: string[]) => {
    return `${dracula.cyan(args[1])}${dracula.pink(args[2])}`
  })
  str = str.replace(/(\s"[^\n]+")(,?)/g, (...args: string[]) => {
    return `${dracula.yellow(args[1])}${dracula.foreground(args[2])}`
  })
  str = str.replace(/(\s-?[\w]+)(,?\n)/g, (...args: string[]) => {
    return `${dracula.purple(args[1])}${dracula.foreground(args[2])}`
  })

  console.info(str)
}

function getTitle(title: string) {
  return `---------------------------------------- ${title} ----------------------------------------`
}

function getSplitLine() {
  return `----------------------------------------------------------------------------------------------`
}

export enum ApiStatusType {
  SUCCESSFUL = 'successful',
  SERVER_EXCEPTION = 'serverException',
  TIMEOUT = 'timeout',
  BUSINESS_EXCEPTION = 'businessException',
  CLIENT_EXCEPTION = 'clientException'
}

const apiStatusMessage = {
  successful: 'api 请求成功',
  serverException: 'server 端异常',
  timeout: 'api 请求超时',
  businessException: 'api 业务异常',
  clientException: 'client 端异常'
}

const draculaColor = {
  successful: 'purple',
  serverException: 'red',
  timeout: 'red',
  businessException: 'yellow',
  clientException: 'orange'
}

function getError(error: Error) {
  return {
    name: error.name,
    message: error.message,
    stack: error.stack
  }
}

function logUtilApi(title: string, data: any) {
  console.info(title)
  replaceColor(JSON.stringify(data, null, 4))
}

export function logUtilInfo(info: string) {
  if (isPrd) return
  console.info(dracula.purple(info))
}

export function logUtilHttpStart(request) {
  Promise.resolve().then(() => {
    if (isTest) return
    request.session[startTime] = Date.now()
    const data: any = getUrl(request)
    data.request = getRequest(request)
    logUtilApi(dracula.purple(getTitle('api 开始请求')), data)
    console.info(dracula.purple(getSplitLine()))
  })
}

export function logUtilHttpEnd(
  request,
  response: any,
  statusCode: number,
  apiStatus: ApiStatusType,
  error?: Error
) {
  Promise.resolve().then(() => {
    if (isTest) {
      error && console.log(error)
      return
    }
    const delay = request.session[startTime]
      ? Date.now() - request.session[startTime]
      : 0
    const apiStatusTitle = apiStatusMessage[apiStatus]
    const data: any = getUrl(request)
    if (isPrd) {
      data.request = getRequest(request)
    }
    data.response = response
    data.statusCode = statusCode
    data.message = `状态: ${apiStatusTitle}`
    data.duration = `耗时: ${delay} 毫秒`
    if (isPrd && error) {
      data.error = getError(error)
    }
    const color = draculaColor[apiStatus]
    logUtilApi(dracula[color](getTitle(apiStatusTitle)), data)
    if (noPrd && error) {
      console.info(dracula[color](getTitle('stack info')))
      console.error(error)
    }
    console.info(dracula[color](getSplitLine()))
  })
}

export function logUtilSystemError(error: Error) {
  Promise.resolve().then(() => {
    const data = getError(error)
    logUtilApi(dracula.red(getTitle('未捕获到的 system 异常日志')), data)
    if (noPrd) {
      console.info(dracula.red(getTitle('stack info')))
      console.error(error)
    }
    console.info(dracula.red(getSplitLine()))
  })
}
