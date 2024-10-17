(function () {
    'use strict';

    const SCRIPT_URLs = [
        'https://mock.qq.com/index.dev.web.js',
        'https://dldir1.qq.com/WechatWebDev/devPlatform/px.min.js',
        'https://dev.weixin.qq.com/platform-console/proxy/assets/tel/px.min.js',
    ];
    const param = {
        maskMode: 'all-mask',
        recordCanvas: false,
        projectId: 'PROJECT_ID',
        attrs: {},
    };
    function loadScript(url) {
        return new Promise((resolve, reject) => {
            const scriptEle = document.createElement('script');
            scriptEle.type = 'text/javascript';
            scriptEle.async = true;
            scriptEle.src = url;
            scriptEle.onload = () => {
                resolve(url);
            };
            scriptEle.onerror = () => {
                reject(new Error(`Script load error for ${url}`));
            };
            document.head.appendChild(scriptEle);
        });
    }
    async function main() {
        try {
            sessionStorage.setItem('wxobs_start_timestamp', String(Date.now()));
            await Promise.race(SCRIPT_URLs.map(url => loadScript(url)));
            window.__startPX && window.__startPX(param);
        }
        catch (error) {
            console.error('Error loading scripts:', error);
        }
    }
    main();

})();
