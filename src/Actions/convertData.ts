export const getJson = (data: any) => {
  return {
    routes: data.routes.map((route: any) => {
      return getRoute(route);
    }),
    globalConfiguration: getGlobal(data.globalConfiguration)
  }
}
export const getRoute = (route: any) => {
  let newRoute: any = {};
  newRoute.downstreamPathTemplate = route.downstreamPathTemplate;
  newRoute.upstreamPathTemplate = route.upstreamPathTemplate;
  newRoute.upstreamHttpMethod = route.upstreamHttpMethod;
  newRoute.isTest = route.isTest;
  newRoute.serviceType = route.serviceType;
  if (route.downstreamHttpMethod)
    newRoute.downstreamHttpMethod = route.downstreamHttpMethod;

  if (route.addHeadersToRequest)
    newRoute.addHeadersToRequest = route.addHeadersToRequest;

  if (route.upstreamHeaderTransform)
    newRoute.upstreamHeaderTransform = route.upstreamHeaderTransform;

  if (route.upstreamHeaderTransform)
    newRoute.upstreamHeaderTransform = route.upstreamHeaderTransform;

  if (route.downstreamHeaderTransform)
    newRoute.downstreamHeaderTransform = route.downstreamHeaderTransform;

  if (route.addClaimsToRequest)
    newRoute.addClaimsToRequest = route.addClaimsToRequest;

  if (route.routeClaimsRequirement)
    newRoute.routeClaimsRequirement = route.routeClaimsRequirement;

  if (route.addQueriesToRequest)
    newRoute.addQueriesToRequest = route.addQueriesToRequest;

  if (route.changeDownstreamPathTemplate)
    newRoute.changeDownstreamPathTemplate = route.changeDownstreamPathTemplate;

  if (route.requestIdKey)
    newRoute.requestIdKey = route.requestIdKey;

  if (route.fileCacheOptions && route.fileCacheOptions.ttlSeconds && route.fileCacheOptions.region)
    newRoute.fileCacheOptions = route.fileCacheOptions;

  if (route.routeIsCaseSensitive)
    newRoute.routeIsCaseSensitive = route.routeIsCaseSensitive;

  if (route.serviceTitle)
    newRoute.serviceTitle = route.serviceTitle;

  if (route.serviceName)
    newRoute.serviceName = route.serviceName;

  if (route.serviceNamespace)
    newRoute.serviceNamespace = route.serviceNamespace;

  newRoute.downstreamScheme = route.downstreamScheme;
  if (route.qoSOptions && route.qoSOptions.exceptionsAllowedBeforeBreaking && route.qoSOptions.durationOfBreak && route.qoSOptions.timeoutValue)
    newRoute.qoSOptions = route.qoSOptions;

  if (route.loadBalancerOptions && route.loadBalancerOptions.type && route.loadBalancerOptions.key && route.loadBalancerOptions.expiry)
    newRoute.loadBalancerOptions = route.loadBalancerOptions;

  if (route.rateLimitOptions)
    newRoute.rateLimitOptions = route.rateLimitOptions;

  if (route.authenticationOptions && route.authenticationOptions.authenticationProviderKey)
    newRoute.authenticationOptions = route.authenticationOptions;

  newRoute.httpHandlerOptions = route.httpHandlerOptions;
  newRoute.preAuthenticationParty = route.preAuthenticationParty;
  newRoute.downstreamHostAndPorts = route.downstreamHostAndPorts;

  if (route.upstreamHost)
    newRoute.upstreamHost = route.upstreamHost;

  if (route.key)
    newRoute.key = route.key;

  if (route.delegatingHandlers.length > 0)
    newRoute.delegatingHandlers = route.delegatingHandlers;

  if (route.priority)
    newRoute.priority = route.priority;
  if (route.timeout)
    newRoute.timeout = route.timeout;
  if (route.dangerousAcceptAnyServerCertificateValidator)
    newRoute.dangerousAcceptAnyServerCertificateValidator = route.dangerousAcceptAnyServerCertificateValidator;
  if (route.securityOptions && (route.securityOptions.ipAllowedList.length > 0 || route.securityOptions.ipBlockedList.length > 0))
    newRoute.securityOptions = route.securityOptions;
  if (route.downstreamHttpVersion)
    newRoute.downstreamHttpVersion = route.downstreamHttpVersion;

  return newRoute;
}
export const getGlobal = (global: any) => {
  let newGlobal: any = {};
  newGlobal.administrationPath = global.administrationPath;
  if (global.requestIdKey)
    newGlobal.requestIdKey = global.requestIdKey;
  if (global.serviceDiscoveryProvider && global.serviceDiscoveryProvider.scheme && global.serviceDiscoveryProvider.host && global.serviceDiscoveryProvider.port && global.serviceDiscoveryProvider.type && global.serviceDiscoveryProvider.token && global.serviceDiscoveryProvider.configurationKey && global.serviceDiscoveryProvider.pollingInterval && global.serviceDiscoveryProvider.namespace)
    newGlobal.serviceDiscoveryProvider = global.serviceDiscoveryProvider;
  if (global.rateLimitOptions && global.rateLimitOptions.clientIdHeader && global.rateLimitOptions.quotaExceededMessage && global.rateLimitOptions.rateLimitCounterPrefix && global.rateLimitOptions.httpStatusCode)
    newGlobal.rateLimitOptions = global.rateLimitOptions;
  if (global.qoSOptions && global.qoSOptions.exceptionsAllowedBeforeBreaking && global.qoSOptions.quotaExceededMessage && global.qoSOptions.timeoutValue)
    newGlobal.qoSOptions = global.qoSOptions;
  newGlobal.baseUrl = global.baseUrl;
  if (global.loadBalancerOptions && global.loadBalancerOptions.type && global.loadBalancerOptions.key && global.loadBalancerOptions.expiry)
    newGlobal.loadBalancerOptions = global.loadBalancerOptions;
  if (global.downstreamScheme)
    newGlobal.downstreamScheme = global.downstreamScheme;
  if (global.downstreamHttpVersion)
    newGlobal.downstreamHttpVersion = global.downstreamHttpVersion;
  return newGlobal;
}
