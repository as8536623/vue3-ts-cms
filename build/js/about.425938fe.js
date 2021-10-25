;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['about'],
  {
    f820: function (e, t, n) {
      'use strict'
      n.r(t)
      var o = n('7a23'),
        c = { class: 'about' },
        l = Object(o['createTextVNode'])('哈哈'),
        u = { ref: 'inputRef' }
      function r(e, t, n, r, a, i) {
        var b = Object(o['resolveComponent'])('login'),
          d = Object(o['resolveComponent'])('el-button'),
          p = Object(o['resolveComponent'])('el-input')
        return (
          Object(o['openBlock'])(),
          Object(o['createElementBlock'])('div', c, [
            Object(o['createElementVNode'])('h1', null, Object(o['toDisplayString'])(e.count), 1),
            Object(o['createVNode'])(b),
            Object(o['createVNode'])(
              d,
              { onClick: e.btnClick },
              {
                default: Object(o['withCtx'])(function () {
                  return [l]
                }),
                _: 1
              },
              8,
              ['onClick']
            ),
            Object(o['createVNode'])(
              p,
              {
                modelValue: e.input,
                'onUpdate:modelValue':
                  t[0] ||
                  (t[0] = function (t) {
                    return (e.input = t)
                  }),
                placeholder: 'Please input'
              },
              null,
              8,
              ['modelValue']
            ),
            Object(o['createElementVNode'])('div', u, '123', 512)
          ])
        )
      }
      function a(e, t, n, c, l, u) {
        return Object(o['openBlock'])(), Object(o['createElementBlock'])('div', null, 'login')
      }
      var i = { name: 'login' },
        b = n('d959'),
        d = n.n(b)
      const p = d()(i, [['render', a]])
      var j = p,
        O = Object(o['defineComponent'])({
          name: 'Home',
          components: { login: j },
          setup: function () {
            var e = Object(o['ref'])(null),
              t = Object(o['ref'])(0),
              n = Object(o['ref'])('')
            Object(o['onMounted'])(function () {
              console.log(e.value)
            })
            var c = function () {
              t.value++
            }
            return { btnClick: c, count: t, inputRef: e, input: n }
          }
        })
      const f = d()(O, [['render', r]])
      t['default'] = f
    }
  }
])
//# sourceMappingURL=about.425938fe.js.map
