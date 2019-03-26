/**
 * Plugin.js file, set configs, routes, hooks and events here
 *
 * see http://wejs.org/docs/we/plugin
 */
module.exports = function loadPlugin(projectPath, Plugin) {
  const plugin = new Plugin(__dirname);

  // set plugin configs
  plugin.setConfigs({
    FB: {
      pixelId: null,
      env: {
        prod: true,
        dev: false,
        test: false
      }
    }
  });

  // set plugin routes
  // plugin.setRoutes({
  // });

  plugin.addFBPixelTag = function (data) {
    let id = plugin.getFBPixelID();

    if (!id) return;

    data.html.text +=  `<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${id}');
  fbq('track', 'PageView');
</script>
<noscript>
  <img height="1" width="1" style="display:none"
       src="https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->`;
  };

  /**
   * Get google analytics id from DB systemSettings or from plugin.we.config.GA.id
   *
   * @return {Number|Null}
   */
  plugin.getFBPixelID = function () {
    if (
      plugin.we.systemSettings &&
      plugin.we.systemSettings.fbPixelID
    ) {
      return plugin.we.systemSettings.fbPixelID;
    }

    if (
      plugin.we.config.FB.env[plugin.we.env] &&
      plugin.we.config.FB.pixelId
    ) {
      return plugin.we.config.FB.pixelId;
    }

    return null;
  };

  plugin.events.on('we-html-head-start', plugin.addFBPixelTag);

  return plugin;
};