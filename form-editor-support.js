function getAuthoringAssistantUrl() {
  const LOCAL_URL = 'https://localhost.corp.adobe.com:8014/dist/universal_editor.html';
  const PROD_URL = 'https://experience.adobe.com/solutions/livecycle-authoring-assistant-spa/static-assets/universal_editor.html';
  const STAGE_URL = 'https://experience-stage.adobe.com/solutions/livecycle-authoring-assistant-spa/static-assets/universal_editor.html';

  const params = new URLSearchParams(window.location.search);
  const version = params.get('livecycle-authoring-assistant-spa_version');
  const endpoint = params.get('endpoint');

  console.log('AEM Forms Authoring Assistant extension version:', version);

  // Determine base URL based on version
  let baseUrl;
  if (version === 'local') {
    baseUrl = LOCAL_URL;
  } else {
    baseUrl = version ? PROD_URL : STAGE_URL;
  }

  // Construct URL with parameters
  const url = new URL(baseUrl);
  if (version) {
    url.searchParams.append('livecycle-authoring-assistant-spa_version', version);
  }
  if (endpoint) {
    url.searchParams.append('endpoint', endpoint);
  }

  return url.toString();
}

function enableAuthoringAssistantExtension() {
  const meta = document.createElement('meta');
  meta.name = 'urn:adobe:aue:config:extensions';
  meta.content = getAuthoringAssistantUrl();

  console.log('Adding meta tag for aem forms authoring assistant extension:', meta.content);
  document.head.appendChild(meta);
}
enableAuthoringAssistantExtension();
