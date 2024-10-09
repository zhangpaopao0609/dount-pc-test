<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const { t } = useI18n()

function sendTimeToMP() {
  // @ts-ignore
  WeixinJSBridge.invoke(
    'invokeMiniProgramAPI',
    {

      name: '发送 时间',
      arg: {
        time: Date.now(),
        text: '测试发送 时间 给小程序',
      },
    },
    (res) => {
      alert('发送成功')
    },
  )
}

function sendUAToMP() {
  // @ts-ignore
  WeixinJSBridge.invoke(
    'invokeMiniProgramAPI',
    {
      name: '发送 UA',
      arg: {
        time: Date.now(),
        text: '测试发送 UA给小程序',
        userAgent: window.navigator.userAgent,
      },
    },
    (res) => {
      alert('发送成功')
    },
  )
  WeixinJSBridge.publish('webviewHtmlLoaded', { projectId: '121' })
  WeixinJSBridge.invoke('webviewHtmlLoaded', { projectId: '121' })
  console.log(WeixinJSBridge, WeixinJSBridge.sendDataToMiniProgram, 'paopao')
}

const multiple = ref(1)

const content = ref({})

watch(multiple, () => {
  const html = document.documentElement.innerHTML.repeat(multiple.value)
  const blob = new Blob([html], { type: 'text/html' })

  content.value = {
    html,
    blob,
  }
}, { immediate: true })

function sendStringToMP() {
  // @ts-ignore
  WeixinJSBridge.invoke(
    'invokeMiniProgramAPI',
    {
      name: '发送字符串',
      arg: {
        time: Date.now(),
        text: '测试发送字符串给小程序',
        userAgent: window.navigator.userAgent,
        document: content.value.html,
        sizeBytes: `${content.value.blob.size} 字节`,
        sizeMegabytes: `${content.value.blob.size / 1024 / 1024} M`,
      },
    },
    (res) => {
      alert('发送成功')
    },
  )
}

const times = ref(1)

function sendMangTimesToMP() {
  const sendNum = (num: number) => {
  // @ts-ignore
    WeixinJSBridge.invoke(
      'invokeMiniProgramAPI',
      {

        name: '同一时间多次发送',
        arg: {
          time: Date.now(),
          text: '同一时间多次发送',
          num,
        },
      },
      (res) => {
        if (num === times.value) {
          alert('发送成功')
        }
      },
    )
  }

  for (let i = 0; i < times.value; i++) {
    sendNum(i + 1)
  }
}
</script>

<template>
  <div>
    <h1>这里是张跑跑的测试 PC 网站</h1>

    <div>
      <button m-3 text-sm btn @click="sendUAToMP">
        点击发送 UA 给小程序
      </button>
    </div>

    <div>
      <button m-3 text-sm btn @click="sendTimeToMP">
        点击发送 时间 给小程序
      </button>
    </div>

    <div>
      <div>
        输入发送的字符串倍数： <input type="text" :value="multiple" placeholder="输入框" @input="(e) => multiple = Number(e.target.value)">
      </div>

      <button m-3 text-sm btn @click="sendStringToMP">
        点击发送 document 字符串给小程序
      </button>
    </div>

    <div>
      <div>
        同时发送多少个： <input type="text" :value="times" placeholder="输入框" @input="(e) => times = Number(e.target.value)">
      </div>

      <button m-3 text-sm btn @click="sendMangTimesToMP">
        点击发送同时发送 {{ times }} 个
      </button>
    </div>

    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Vitesse
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />

    <TheInput v-model="name" :placeholder="t('intro.whats-your-name')" autocomplete="false" @keydown.enter="go" />
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button m-3 text-sm btn :disabled="!name" @click="go">
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
